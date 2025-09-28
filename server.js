'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const RATE_LIMIT = Number(process.env.GEMINI_RATE_LIMIT || 10);
const RATE_WINDOW_MS = Number(process.env.GEMINI_RATE_WINDOW_MS || 60_000);
const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'sessionToken';
const VALID_SESSION_TOKENS = (process.env.VALID_SESSION_TOKENS || '')
  .split(',')
  .map((token) => token.trim())
  .filter(Boolean);

if (!GEMINI_API_KEY) {
  console.warn('[server] GEMINI_API_KEY no está configurada. El proxy no podrá responder.');
}

const app = express();
app.use(express.json({ limit: '1mb' }));

function extractSessionToken(req) {
  const headerToken = req.get('x-session-token');
  if (headerToken && typeof headerToken === 'string') {
    return headerToken.trim();
  }

  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [rawName, ...rawValue] = cookie.trim().split('=');
    if (!rawName) continue;
    if (rawName === SESSION_COOKIE_NAME || rawName === 'sessionId' || rawName === 'session-token') {
      return decodeURIComponent(rawValue.join('=') || '');
    }
  }
  return null;
}

const activeBuckets = new Map();

function requireSession(req, res, next) {
  const token = extractSessionToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Sesión no válida o expirada.' });
  }

  if (VALID_SESSION_TOKENS.length > 0 && !VALID_SESSION_TOKENS.includes(token)) {
    return res.status(403).json({ error: 'Sesión no autorizada.' });
  }

  req.sessionToken = token;
  next();
}

function applyRateLimit(req, res, next) {
  const key = req.sessionToken || req.ip;
  const now = Date.now();
  let bucket = activeBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + RATE_WINDOW_MS };
  }

  if (bucket.count >= RATE_LIMIT) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Demasiadas solicitudes, intenta de nuevo en unos segundos.' });
  }

  bucket.count += 1;
  activeBuckets.set(key, bucket);
  next();
}

async function callGeminiAPI({ prompt, model }) {
  if (!GEMINI_API_KEY) {
    throw new Error('Falta la API key de Gemini en el servidor');
  }

  const url = new URL(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`);
  url.searchParams.set('key', GEMINI_API_KEY);

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = payload?.error?.message || `Error ${response.status} al invocar Gemini`;
    const err = new Error(errorMessage);
    err.status = response.status;
    err.details = payload;
    throw err;
  }

  const reply = payload?.candidates?.flatMap((candidate) => {
    return candidate?.content?.parts?.map((part) => part?.text).filter(Boolean) || [];
  });

  return {
    reply: reply && reply.length ? reply.join('\n').trim() : '(sin respuesta)',
    raw: payload,
  };
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post('/api/gemini', requireSession, applyRateLimit, async (req, res, next) => {
  try {
    const { prompt, model } = req.body || {};

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'El prompt es obligatorio.' });
    }

    const selectedModel = typeof model === 'string' && model.trim() ? model.trim() : DEFAULT_MODEL;
    const result = await callGeminiAPI({ prompt: prompt.trim(), model: selectedModel });

    res.json({ reply: result.reply, model: selectedModel, usage: result.raw?.usageMetadata || null });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message, details: error.details || null });
    }
    next(error);
  }
});

// Limpieza periódica de buckets para evitar crecimiento infinito
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of activeBuckets.entries()) {
    if (now >= bucket.resetAt) {
      activeBuckets.delete(key);
    }
  }
}, Math.max(RATE_WINDOW_MS, 15_000)).unref();

app.use((err, _req, res, _next) => {
  console.error('[server] Error inesperado:', err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[server] Escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;
