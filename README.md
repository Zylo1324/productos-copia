# Productos

Aplicación de ejemplo para gestionar clientes con autenticación mediante Firebase Authentication,
formulario multipaso y sincronización en tiempo real con Cloud Firestore.

## Requisitos

- Proyecto de Firebase con Authentication (Email/Password + Google) y Cloud Firestore habilitados.
- Firebase CLI (para desplegar reglas) y Node.js 18+ para instalar dependencias opcionales.
- Servir la aplicación desde dominios autorizados en Firebase (por ejemplo `http://localhost` o
  `http://127.0.0.1`).
- Navegador moderno con soporte para módulos ES.

## Configuración

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com) y habilita los
   proveedores **Email/Password** y **Google** en la sección *Authentication*.
2. Habilita Cloud Firestore en modo producción.
3. Descarga la configuración web de tu app Firebase y copia los valores dentro de
   `window.APP_CONFIG.firebaseConfig` en [`index.html`](./index.html). Ejemplo:

   ```html
   <script>
     window.APP_CONFIG = {
       firebaseConfig: {
         apiKey: "...",
         authDomain: "...",
         projectId: "...",
         storageBucket: "...",
         messagingSenderId: "...",
         appId: "..."
       }
     };
   </script>
   ```

4. (Opcional) Define `window.APP_CONFIG.aiEndpoint` si deseas conectar el chat con un endpoint
   propio (por defecto se usa `/api/ai/gemini`).
5. Actualiza los orígenes autorizados en Firebase Authentication para incluir `http://localhost`
   y/o `http://127.0.0.1` según donde sirvas la app.

## Despliegue de reglas de seguridad

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia sesión en Firebase e inicializa el proyecto si aún no lo has hecho:

   ```bash
   npx firebase login
   npx firebase use --add
   ```

3. Publica las reglas incluidas en [`firestore.rules`](./firestore.rules):

   ```bash
   npx firebase deploy --only firestore:rules
   ```

## Ejecución local

1. Sirve el directorio con el servidor de tu preferencia, por ejemplo:

   ```bash
   npm install
   npx firebase emulators:start --only hosting
   ```

   o simplemente:

   ```bash
   python -m http.server 8000
   ```

2. Abre `http://localhost:8000/index.html` o `http://127.0.0.1:8000/index.html` en tu navegador.

## Flujo de uso

1. Inicia sesión o regístrate con correo/contraseña o con Google.
2. Al autenticarse, los clientes se sincronizan en tiempo real desde `users/{uid}/clientes` en
   Cloud Firestore.
3. Los servicios personalizados se guardan bajo `users/{uid}/config/services` y también se
   sincronizan en vivo.
4. Al cerrar sesión se vuelve a la pantalla de aterrizaje; si no hay sesión se usan datos locales
   almacenados en `localStorage`.

## Archivos relevantes

- [`firebaseConfig.js`](./firebaseConfig.js): inicializa Firebase y expone `auth` y `db`.
- [`index.html`](./index.html): lógica principal del SPA y listeners de Firestore.
- [`firestore.rules`](./firestore.rules): reglas recomendadas para proteger los datos por usuario.

## Limitaciones

- No se incluye hosting automático ni backend adicional; debes proporcionar tu propio hosting.
- El chat opcional requiere definir `APP_CONFIG.aiEndpoint` que responda a las peticiones del
  navegador.
- Para usar Google Sign-In debes registrar los dominios locales en la consola de Firebase.
