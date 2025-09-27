# Productos

Flujo de autenticación inspirado en las capturas proporcionadas con múltiples pasos (correo,
contraseña y verificación) y compatibilidad con acceso mediante Google Identity Services.

## Requisitos

- Navegador moderno con soporte para ES2018 o superior.
- Conexión a Internet para cargar Google Identity Services y la tipografía "Inter" desde
  Google Fonts (opcional si se autohospeda).
- Endpoint propio para validación/envío de correos electrónicos si se desea integración real.

## Configuración

Todos los valores configurables se definen en `window.APP_CONFIG` dentro de
[`index.html`](./index.html). Actualiza los siguientes campos según tu entorno:

- `googleClientId`: Client ID generado en Google Cloud Console para Google Identity Services.
- `googleCallbackEndpoint`: Endpoint en tu backend que recibirá el `credential` devuelto por
  Google. Debe validar y crear/iniciar sesión en la cuenta.
- `checkEmailEndpoint`: Servicio REST (GET) que verifique si un correo existe. Debe aceptar el
  parámetro `email` y responder un JSON con la forma `{ "exists": true/false }`.
- `mailEndpoint`: Servicio (POST) que envíe el código de verificación al correo indicado. Debe
  responder un JSON que incluya al menos la propiedad `code` con los 6 dígitos generados.

> **Nota:** Si no defines los endpoints anteriores, la aplicación utilizará datos simulados en
> memoria para validar correos y generará códigos de verificación ficticios solo con fines de
> demostración.

## Cómo ejecutar la página

1. Clona este repositorio o descarga el código.
2. Coloca tus valores reales dentro del bloque `window.APP_CONFIG` de `index.html`.
3. (Opcional) Sirve el contenido con un servidor local, por ejemplo:

   ```bash
   python -m http.server 8000
   ```

4. Abre [`http://localhost:8000/index.html`](http://localhost:8000/index.html) o el archivo
   `index.html` directamente en tu navegador.

## Flujo de uso

1. Ingresa el correo electrónico. El sistema consultará el endpoint configurado (o los datos
   simulados) para determinar si la cuenta existe.
2. Introduce o crea la contraseña según corresponda.
3. Recibirás un código de verificación por correo. Puedes reenviarlo desde la misma pantalla.
4. Alternativamente, utiliza el botón "Continuar con Google" para completar el proceso mediante
   Google Identity Services.

## Recursos

- Estilos principales en [`styles.css`](./styles.css) con gradientes suaves y transiciones entre
  pantallas.
- Lógica de interacción en [`script.js`](./script.js) para manejar navegación, validaciones y
  comunicación con endpoints externos.
- Activos gráficos opcionales en [`assets/`](./assets/).

## Limitaciones

- La validación de correo, el envío de códigos y el manejo del token de Google requieren
  endpoints propios; el repositorio sólo provee la estructura y llamadas necesarias.
- Google Identity Services exige que la página se sirva desde un origen autorizado configurado en
  la consola de Google Cloud.
