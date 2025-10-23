const existingEmails = new Set(["sofia@example.com", "usuario@productos.io", "cliente@correo.com"]);

const THEME_STORAGE_KEY = "theme-mode";
const VALID_THEME_MODES = new Set(["system", "light", "dark"]);

function setThemeMode(mode) {
  if (!VALID_THEME_MODES.has(mode)) {
    console.warn(`Modo de tema desconocido: ${mode}`);
    return;
  }

  const root = document.documentElement;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    console.warn("No se pudo guardar el modo de tema en localStorage.", error);
  }

  if (mode === "system") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = mode;
  }
}

function initializeThemeMode() {
  let storedMode = null;
  try {
    storedMode = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn("No se pudo leer el modo de tema almacenado.", error);
  }

  if (storedMode && VALID_THEME_MODES.has(storedMode)) {
    setThemeMode(storedMode);
  }
}

initializeThemeMode();
window.setThemeMode = setThemeMode;
window.initializeThemeMode = initializeThemeMode;

const SESSION_STORAGE_KEY = "zyl0:lastSession";

function persistSession(email) {
  if (!email) return;
  const payload = {
    email,
    timestamp: Date.now()
  };

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("No se pudo guardar la sesión local.", error);
  }
}

function readPersistedSession() {
  try {
    const rawValue = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawValue) return null;
    const parsed = JSON.parse(rawValue);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.email) return null;
    return parsed;
  } catch (error) {
    console.warn("No se pudo leer la sesión almacenada.", error);
    return null;
  }
}

function clearPersistedSession() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.warn("No se pudo limpiar la sesión local.", error);
  }
}

function resumeSessionIfAvailable() {
  const stored = readPersistedSession();
  if (!stored?.email) return false;

  state.email = stored.email;
  state.isExistingUser = true;
  updateEmailCopies(stored.email);
  showDashboard();
  return true;
}

const state = {
  currentStep: "email",
  email: "",
  password: "",
  isExistingUser: false,
  verificationCode: "",
  resendTimer: null,
  resendSeconds: 0
};

const selectors = {
  stepper: document.querySelector("[data-stepper]"),
  steps: document.querySelectorAll("[data-step]"),
  emailForm: document.getElementById("email-form"),
  emailInput: document.getElementById("email"),
  passwordForm: document.getElementById("password-form"),
  passwordInput: document.getElementById("password"),
  verificationForm: document.getElementById("verification-form"),
  verificationInput: document.getElementById("verification-code"),
  resendButton: document.querySelector('[data-action="resend"]'),
  feedback: {
    email: document.querySelector('[data-feedback="email"]'),
    password: document.querySelector('[data-feedback="password"]'),
    verification: document.querySelector('[data-feedback="verification"]'),
    verificationSuccess: document.querySelector('[data-feedback="verification-success"]'),
    google: document.querySelector('[data-google-feedback]')
  },
  passwordTitle: document.getElementById("password-title"),
  passwordDescription: document.getElementById("password-description"),
  currentEmail: document.querySelectorAll(".current-email"),
  actionButtons: document.querySelectorAll('[data-action="back"]'),
  dashboard: document.querySelector("[data-dashboard]"),
  dashboardFrame: document.querySelector("[data-dashboard-frame]")
};

function showStep(stepName) {
  state.currentStep = stepName;

  if (selectors.stepper) {
    selectors.stepper.hidden = false;
  }

  if (selectors.dashboard) {
    selectors.dashboard.hidden = true;
  }

  selectors.steps.forEach((step) => {
    const isActive = step.dataset.step === stepName;
    step.classList.toggle("is-active", isActive);
    step.setAttribute("aria-hidden", String(!isActive));
  });

  if (stepName === "email") {
    clearPersistedSession();
  }

  if (stepName === "password") {
    selectors.passwordInput.focus({ preventScroll: true });
  }
  if (stepName === "verification") {
    selectors.verificationInput.focus({ preventScroll: true });
  }
}

function showDashboard() {
  const stepper = document.querySelector("[data-stepper]");
  if (stepper) {
    stepper.hidden = true;
  }

  if (selectors.dashboard) {
    selectors.dashboard.hidden = false;
  }

  if (selectors.dashboardFrame && !selectors.dashboardFrame.src) {
    selectors.dashboardFrame.src =
      "https://raw.githubusercontent.com/iamwrely/Admin-Clientes/refs/heads/main/index.html";
  }

  if (state.email) {
    persistSession(state.email);
  }
}

function updateEmailCopies(email) {
  selectors.currentEmail.forEach((node) => {
    node.textContent = email;
  });
}

function setFeedback(element, message = "", type = "info") {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("is-error");
  if (type === "error") {
    element.classList.add("is-error");
  }
  if (type === "success" && element.classList.contains("feedback--success")) {
    element.textContent = message;
  }
}

function maskEmail(email) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(local.length - 2, 0))}@${domain}`;
}

async function checkEmailExists(email) {
  const config = window.APP_CONFIG || {};
  if (config.checkEmailEndpoint) {
    try {
      const response = await fetch(`${config.checkEmailEndpoint}?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error("Error consultando el correo");
      const payload = await response.json();
      return Boolean(payload.exists);
    } catch (error) {
      console.error(error);
      setFeedback(selectors.feedback.email, "No pudimos validar el correo en este momento. Intenta más tarde.", "error");
      throw error;
    }
  }
  return existingEmails.has(email.toLowerCase());
}

async function handleEmailSubmit(event) {
  event.preventDefault();
  const email = selectors.emailInput.value.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFeedback(selectors.feedback.email, "Ingresa un correo válido.", "error");
    selectors.emailInput.focus();
    return;
  }

  setFeedback(selectors.feedback.email);

  let exists = false;
  try {
    exists = await checkEmailExists(email);
  } catch (error) {
    return;
  }

  state.email = email;
  state.isExistingUser = exists;
  updateEmailCopies(email);

  selectors.passwordTitle.textContent = exists
    ? "Introduce tu contraseña"
    : "Crea una contraseña segura";
  selectors.passwordDescription.textContent = exists
    ? `Introduce tu contraseña para continuar con ${email}`
    : `Estás creando una cuenta nueva para ${email}. Elige una contraseña única.`;

  selectors.passwordInput.value = "";
  setFeedback(selectors.feedback.password, "");
  showStep("password");
}

async function handlePasswordSubmit(event) {
  event.preventDefault();
  const password = selectors.passwordInput.value.trim();

  if (password.length < 8) {
    setFeedback(selectors.feedback.password, "La contraseña debe tener al menos 8 caracteres.", "error");
    return;
  }

  setFeedback(selectors.feedback.password, "");
  state.password = password;

  const sent = await sendVerificationCode(state.email, state.isExistingUser ? "login" : "register");
  if (sent) {
    selectors.verificationInput.value = "";
    setFeedback(selectors.feedback.verification, "");
    setFeedback(selectors.feedback.verificationSuccess, "");
    showStep("verification");
    startResendCountdown(60);
  }
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationCode(email, reason = "register") {
  const config = window.APP_CONFIG || {};
  const masked = maskEmail(email);

  if (config.mailEndpoint) {
    try {
      const response = await fetch(config.mailEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, reason })
      });

      if (!response.ok) throw new Error("Fallo el envío del código");
      const payload = await response.json();
      state.verificationCode = payload.code || "";
      if (!state.verificationCode) {
        console.warn("El endpoint no devolvió un código. Usaremos uno temporal para completar la verificación en esta demo.");
        state.verificationCode = generateVerificationCode();
      }
      setFeedback(
        selectors.feedback.verificationSuccess,
        `Código enviado correctamente a ${masked}.`,
        "success"
      );
      return true;
    } catch (error) {
      console.error(error);
      setFeedback(
        selectors.feedback.verification,
        "No pudimos enviar el código de verificación. Reintenta en unos minutos.",
        "error"
      );
      return false;
    }
  }

  state.verificationCode = generateVerificationCode();
  setFeedback(
    selectors.feedback.verificationSuccess,
    `Código temporal ${state.verificationCode} enviado a ${masked} (simulado).`,
    "success"
  );
  return true;
}

function startResendCountdown(seconds) {
  clearInterval(state.resendTimer);
  state.resendSeconds = seconds;
  updateResendButton();
  selectors.resendButton.disabled = true;

  state.resendTimer = setInterval(() => {
    state.resendSeconds -= 1;
    updateResendButton();
    if (state.resendSeconds <= 0) {
      clearInterval(state.resendTimer);
      selectors.resendButton.disabled = false;
      selectors.resendButton.textContent = "Reenviar código";
    }
  }, 1000);
}

function updateResendButton() {
  selectors.resendButton.textContent = `Reenviar código (${state.resendSeconds}s)`;
}

async function handleVerificationSubmit(event) {
  event.preventDefault();
  const code = selectors.verificationInput.value.trim();

  if (!/^[0-9]{6}$/.test(code)) {
    setFeedback(selectors.feedback.verification, "Introduce un código de 6 dígitos.", "error");
    return;
  }

  if (!state.verificationCode) {
    setFeedback(selectors.feedback.verification, "Aún no hemos enviado un código. Usa el botón de reenvío.", "error");
    return;
  }

  if (code !== state.verificationCode) {
    setFeedback(selectors.feedback.verification, "El código no coincide. Verifica tu bandeja de entrada.", "error");
    return;
  }

  setFeedback(selectors.feedback.verification, "");
  setFeedback(selectors.feedback.verificationSuccess, "¡Listo! Tu identidad ha sido verificada.", "success");
  showDashboard();
  selectors.verificationForm.querySelector("button[type='submit']").disabled = true;
  selectors.resendButton.disabled = true;
  clearInterval(state.resendTimer);
}

async function handleResendClick() {
  if (selectors.resendButton.disabled) return;
  const sent = await sendVerificationCode(state.email, state.isExistingUser ? "login" : "register");
  if (sent) {
    startResendCountdown(60);
  }
}

function registerEvents() {
  selectors.emailForm?.addEventListener("submit", handleEmailSubmit);
  selectors.passwordForm?.addEventListener("submit", handlePasswordSubmit);
  selectors.verificationForm?.addEventListener("submit", handleVerificationSubmit);
  selectors.resendButton?.addEventListener("click", handleResendClick);
  selectors.actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.target;
      if (target === "email") {
        state.email = "";
        selectors.emailInput.focus({ preventScroll: true });
      }
      showStep(target);
    });
  });
}

async function forwardGoogleCredential(credential) {
  const config = window.APP_CONFIG || {};
  if (!config.googleCallbackEndpoint) {
    console.info("Token de Google recibido. Configura 'googleCallbackEndpoint' para enviarlo al backend.");
    return;
  }

  try {
    const response = await fetch(config.googleCallbackEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ credential })
    });
    if (!response.ok) throw new Error("Error enviando el token de Google");
  } catch (error) {
    console.error(error);
    setFeedback(selectors.feedback.google, "No pudimos validar el inicio de sesión con Google.", "error");
  }
}

function handleGoogleCredentialResponse(response) {
  setFeedback(selectors.feedback.google, "Sesión con Google lista para continuar en tu backend.");
  forwardGoogleCredential(response.credential);
}

window.initializeGoogleSignIn = function initializeGoogleSignIn() {
  const config = window.APP_CONFIG || {};
  const clientId = config.googleClientId;
  const googleContainer = document.getElementById("googleButton");

  if (!googleContainer) return;

  if (!clientId) {
    setFeedback(selectors.feedback.google, "Añade tu Client ID para mostrar el botón de Google.", "error");
    return;
  }

  setFeedback(selectors.feedback.google, "");

  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleGoogleCredentialResponse
  });
  google.accounts.id.renderButton(googleContainer, {
    theme: "outline",
    size: "large",
    shape: "pill",
    width: "100%"
  });
};

if (!resumeSessionIfAvailable()) {
  showStep(state.currentStep);
}

registerEvents();
