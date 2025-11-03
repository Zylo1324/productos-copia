// Mapa de apps -> contenido del panel
const APPS = {
  chatgpt: {
    title: "ChatGPT",
    icon: "assets/icon-chatgpt.png",
    desc: "Asistente cognitivo para ideas, contenidos y automatizaciones.",
    bullets: ["Plugins y navegación", "Memoria compartida", "Plantillas y soporte"],
    url: "#"
  },
  sora: {
    title: "Sora",
    icon: "assets/icon-sora.png",
    desc: "Generación de video a partir de texto con control creativo.",
    bullets: ["Efectos y estilos", "Guiones visuales", "Exportaciones HD"],
    url: "#"
  },
  gemini: {
    title: "Gemini",
    icon: "assets/icon-gemini.png",
    desc: "Modelo multimodal para búsqueda, análisis y creación.",
    bullets: ["Imágenes y texto", "Citas y fuentes", "Integraciones Google"],
    url: "#"
  },
  capcut: {
    title: "CapCut",
    icon: "assets/icon-capcut.png",
    desc: "Edición de video rápida y plantillas listas.",
    bullets: ["Filtros y transiciones", "Subtítulos automáticos", "Exportaciones sociales"],
    url: "#"
  },
  hbo: {
    title: "HBO Max",
    icon: "assets/icon-hbo.png",
    desc: "Series y películas exclusivas con estrenos simultáneos.",
    bullets: ["Catálogo premium", "Perfiles personalizados", "Descargas offline"],
    url: "#"
  },
  prime: {
    title: "Prime Video",
    icon: "assets/icon-prime.png",
    desc: "Streaming global con producciones originales y canales extra.",
    bullets: ["Amazon Originals", "Control parental", "X-Ray para escenas"],
    url: "#"
  },
  youtube: {
    title: "YouTube",
    icon: "assets/icon-youtube.png",
    desc: "Contenido infinito de creadores, música y transmisiones en vivo.",
    bullets: ["Listas inteligentes", "Música sin anuncios", "Streaming en directo"],
    url: "#"
  },
  canva: {
    title: "Canva",
    icon: "assets/icon-canva.png",
    desc: "Diseño colaborativo con plantillas para todo tipo de proyectos.",
    bullets: ["Editor drag & drop", "Brand Kits", "Exportaciones multiformato"],
    url: "#"
  },
  turnitin: {
    title: "Turnitin",
    icon: "assets/icon-turnitin.png",
    desc: "Detección de similitud y retroalimentación académica.",
    bullets: ["Reportes detallados", "Integración LMS", "Herramientas de evaluación"],
    url: "#"
  },
  scribd: {
    title: "Scribd",
    icon: "assets/icon-scribd.png",
    desc: "Biblioteca digital con libros, audiolibros y documentos.",
    bullets: ["Lectura sin límites", "Listas curadas", "Sincronización entre dispositivos"],
    url: "#"
  }
};

// Referencias al panel
const $card   = document.getElementById("info-card");
const $icon   = document.getElementById("info-icon");
const $title  = document.getElementById("info-title");
const $desc   = document.getElementById("info-desc");
const $bul    = document.getElementById("info-bullets");
const $cta    = document.getElementById("info-cta");

// Utilidad para actualizar el panel
function showApp(key){
  const app = APPS[key];
  if(!app) return;
  $card.classList.add("is-hidden");
  // pequeña pausa para la transición
  setTimeout(() => {
    $icon.src = app.icon;
    $icon.alt = app.title;
    $title.textContent = app.title;
    $desc.textContent = app.desc;
    $bul.innerHTML = app.bullets.map(t => `<li>${t}</li>`).join("");
    $cta.href = app.url || "#";
    $cta.textContent = "Abrir app";
    $card.classList.remove("is-hidden");
  }, 120);
}

// Listeners a cada icono
document.querySelectorAll(".app[data-app]").forEach(el => {
  const key = el.getAttribute("data-app");

  // Click / Enter / Espacio
  el.addEventListener("click", () => showApp(key));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showApp(key);
    }
  });

  // Efecto “presionado” robusto (además del :active CSS)
  el.addEventListener("pointerdown", () => el.classList.add("is-pressed"));
  ["pointerup","pointercancel","pointerleave"].forEach(ev =>
    el.addEventListener(ev, () => el.classList.remove("is-pressed"))
  );
});

// Estado inicial
showApp("chatgpt");

// Controles móviles para ajustar el título
const controls = document.getElementById("title-controls");

if (controls) {
  const root = document.documentElement;
  const rootStyle = root.style;
  const mq = window.matchMedia("(max-width: 900px)");
  const inputX = controls.querySelector("#title-control-x");
  const inputY = controls.querySelector("#title-control-y");
  const inputScale = controls.querySelector("#title-control-scale");

  const outputX = controls.querySelector("#title-control-x-value");
  const outputY = controls.querySelector("#title-control-y-value");
  const outputScale = controls.querySelector("#title-control-scale-value");

  const computedRoot = getComputedStyle(root);
  const parseOr = (value, fallback) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const defaultTitle = {
    x: parseOr(computedRoot.getPropertyValue("--title-mobile-x"), -13),
    y: parseOr(computedRoot.getPropertyValue("--title-mobile-y"), -74),
    scale: parseOr(computedRoot.getPropertyValue("--title-mobile-scale"), 0.89)
  };

  inputX.value = String(defaultTitle.x);
  inputY.value = String(defaultTitle.y);
  inputScale.value = String(defaultTitle.scale);

  const formatOutputs = () => {
    if (outputX) {
      const value = Number.parseFloat(inputX.value);
      outputX.textContent = `${Number.isFinite(value) ? value : defaultTitle.x}px`;
    }
    if (outputY) {
      const value = Number.parseFloat(inputY.value);
      outputY.textContent = `${Number.isFinite(value) ? value : defaultTitle.y}px`;
    }
    if (outputScale) {
      const value = Number.parseFloat(inputScale.value);
      const percentage = Number.isFinite(value)
        ? Math.round(value * 100)
        : Math.round(defaultTitle.scale * 100);
      outputScale.textContent = `${percentage}%`;
    }
  };

  const applyValues = () => {
    const x = Number.parseFloat(inputX.value);
    const y = Number.parseFloat(inputY.value);
    const scale = Number.parseFloat(inputScale.value);

    rootStyle.setProperty(
      "--title-mobile-x",
      `${Number.isFinite(x) ? x : defaultTitle.x}px`
    );
    rootStyle.setProperty(
      "--title-mobile-y",
      `${Number.isFinite(y) ? y : defaultTitle.y}px`
    );
    rootStyle.setProperty(
      "--title-mobile-scale",
      `${Number.isFinite(scale) ? scale : defaultTitle.scale}`
    );
    formatOutputs();
  };

  const resetValues = () => {
    rootStyle.setProperty("--title-mobile-x", `${defaultTitle.x}px`);
    rootStyle.setProperty("--title-mobile-y", `${defaultTitle.y}px`);
    rootStyle.setProperty("--title-mobile-scale", `${defaultTitle.scale}`);
    inputX.value = String(defaultTitle.x);
    inputY.value = String(defaultTitle.y);
    inputScale.value = String(defaultTitle.scale);
    formatOutputs();
  };

  const syncVisibility = () => {
    if (mq.matches) {
      controls.hidden = false;
      applyValues();
    } else {
      controls.hidden = true;
      resetValues();
    }
  };

  [inputX, inputY, inputScale].forEach((input) => {
    input.addEventListener("input", () => {
      if (mq.matches) {
        applyValues();
      } else {
        formatOutputs();
      }
    });
  });

  mq.addEventListener("change", syncVisibility);
  resetValues();
  syncVisibility();
}

// La posición del teléfono se mantiene fija mediante la variable CSS `--phone-shift`.
