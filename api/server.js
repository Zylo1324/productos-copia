import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  PORT = 3000,
  ALLOWED_ORIGINS,
  GEMINI_API_KEY,
  GEMINI_MODEL
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('[server] Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

function createSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase credentials are not configured');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  if (!token) {
    return null;
  }
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.error('[auth] getUser error', error);
    return null;
  }
  return data?.user || null;
}

function authMiddleware() {
  return async (req, res, next) => {
    try {
      const user = await getUserFromRequest(req);
      if (!user) {
        return res.status(401).json({ error: 'No autorizado' });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('[auth] middleware error', error);
      res.status(401).json({ error: 'No autorizado' });
    }
  };
}

const app = express();

const geminiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});

const corsOrigins = (ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: corsOrigins.length ? corsOrigins : true,
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/sign-in', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }
  try {
    const supabase = createSupabaseClient();
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        return res.status(signUpError.status || 400).json({ error: signUpError.message || 'No se pudo registrar.' });
      }
      if (!signUpData.session) {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
      } else {
        data = signUpData;
        error = null;
      }
    }
    if (error) {
      return res.status(error.status || 400).json({ error: error.message || 'No se pudo acceder.' });
    }
    const session = data.session;
    if (!session) {
      return res.status(400).json({ error: 'No se pudo obtener la sesión.' });
    }
    res.json({ user: data.user, session: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at
    }});
  } catch (error) {
    console.error('[auth] sign-in error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.post('/api/auth/sign-out', authMiddleware(), async (req, res) => {
  try {
    const supabase = createSupabaseClient();
    await supabase.auth.admin.signOutUser(req.user.id);
  } catch (error) {
    console.error('[auth] sign-out error', error);
    // Continue even if revocation fails
  }
  res.json({ ok: true });
});

app.get('/api/auth/session', authMiddleware(), (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { email, redirectTo } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'Correo es obligatorio.' });
  }
  try {
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || SUPABASE_URL
    });
    if (error) {
      return res.status(error.status || 400).json({ error: error.message || 'No se pudo enviar el correo.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('[auth] reset password error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.post('/api/ai/gemini', authMiddleware(), geminiLimiter, async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'El prompt es obligatorio.' });
  }
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY no está configurada.' });
  }

  const model = GEMINI_MODEL || 'gemini-1.5-flash-latest';
  const url = new URL(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`);
  url.searchParams.set('key', GEMINI_API_KEY);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      const message = payload?.error?.message || 'Error al comunicarse con Gemini.';
      const status = response.status >= 400 && response.status < 600 ? response.status : 502;
      return res.status(status).json({ error: message });
    }

    const parts = payload?.candidates?.[0]?.content?.parts ?? [];
    const candidateText = parts
      .map((part) => part?.text)
      .filter(Boolean)
      .join('\n')
      .trim();

    if (!candidateText) {
      return res.status(502).json({ error: 'La respuesta de Gemini no contiene texto.' });
    }

    res.json({ text: candidateText });
  } catch (error) {
    console.error('[gemini] request error', error);
    res.status(502).json({ error: 'No se pudo completar la solicitud a Gemini.' });
  }
});

app.get('/api/clients', authMiddleware(), async (req, res) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', req.user.id)
      .order('nombre', { ascending: true });
    if (error) {
      return res.status(400).json({ error: error.message || 'No se pudieron obtener los clientes.' });
    }
    res.json({ items: data || [] });
  } catch (error) {
    console.error('[clients] list error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.post('/api/clients', authMiddleware(), async (req, res) => {
  try {
    const supabase = createSupabaseClient();
    const payload = { ...req.body, user_id: req.user.id };
    delete payload.id;
    const { data, error } = await supabase
      .from('clients')
      .insert(payload)
      .select()
      .single();
    if (error) {
      return res.status(400).json({ error: error.message || 'No se pudo crear el cliente.' });
    }
    res.json({ item: data });
  } catch (error) {
    console.error('[clients] create error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.put('/api/clients/:id', authMiddleware(), async (req, res) => {
  const { id } = req.params;
  try {
    const supabase = createSupabaseClient();
    const payload = { ...req.body, user_id: req.user.id };
    const { data, error } = await supabase
      .from('clients')
      .update(payload)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();
    if (error) {
      return res.status(400).json({ error: error.message || 'No se pudo actualizar el cliente.' });
    }
    res.json({ item: data });
  } catch (error) {
    console.error('[clients] update error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.put('/api/clients/bulk', authMiddleware(), async (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Se esperaba una lista de clientes.' });
  }
  try {
    const supabase = createSupabaseClient();
    const rows = items.map((item) => ({ ...item, user_id: req.user.id }));
    const { error } = await supabase
      .from('clients')
      .upsert(rows, { onConflict: 'id' });
    if (error) {
      return res.status(400).json({ error: error.message || 'No se pudieron guardar los clientes.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('[clients] bulk error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.delete('/api/clients/:id', authMiddleware(), async (req, res) => {
  const { id } = req.params;
  try {
    const supabase = createSupabaseClient();
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);
    if (error) {
      return res.status(400).json({ error: error.message || 'No se pudo eliminar el cliente.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('[clients] delete error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.get('/api/services', authMiddleware(), async (req, res) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('services')
      .select('name')
      .eq('user_id', req.user.id)
      .order('name');
    if (error) {
      return res.status(400).json({ error: error.message || 'No se pudieron obtener los servicios.' });
    }
    res.json({ items: (data || []).map((row) => row.name) });
  } catch (error) {
    console.error('[services] list error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.put('/api/services', authMiddleware(), async (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Se esperaba una lista de servicios.' });
  }
  const desired = Array.from(new Set(items.filter(Boolean)));
  try {
    const supabase = createSupabaseClient();
    const { data: current, error: currentError } = await supabase
      .from('services')
      .select('name')
      .eq('user_id', req.user.id);
    if (currentError) {
      return res.status(400).json({ error: currentError.message || 'No se pudieron sincronizar los servicios.' });
    }
    const currentSet = new Set((current || []).map((row) => row.name));
    const desiredSet = new Set(desired);

    const toDelete = [...currentSet].filter((name) => !desiredSet.has(name));
    if (toDelete.length) {
      const { error } = await supabase
        .from('services')
        .delete()
        .in('name', toDelete)
        .eq('user_id', req.user.id);
      if (error) {
        return res.status(400).json({ error: error.message || 'No se pudieron eliminar servicios.' });
      }
    }

    const toInsert = [...desiredSet].filter((name) => !currentSet.has(name));
    if (toInsert.length) {
      const { error } = await supabase
        .from('services')
        .insert(toInsert.map((name) => ({ user_id: req.user.id, name })));
      if (error) {
        return res.status(400).json({ error: error.message || 'No se pudieron agregar servicios.' });
      }
    }

    res.json({ items: desired });
  } catch (error) {
    console.error('[services] update error', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'No encontrado' });
});

app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT}`);
});
