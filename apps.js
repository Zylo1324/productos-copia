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

// Posiciona el título de manera fija sin controles interactivos
const titleImage = document.querySelector(".hero-title");

if (titleImage) {
  titleImage.style.transform = "translateX(-10%)";
}

// Control deslizante para mover el teléfono en vista móvil
const phoneElement = document.querySelector(".phone");
const phoneSlider = document.getElementById("phone-shift");
const phoneSliderValue = document.getElementById("phone-shift-value");
const MOBILE_QUERY = window.matchMedia("(max-width: 900px)");

if (phoneElement && phoneSlider) {
  const updateShift = (value) => {
    const numericValue = Number(value) || 0;
    const offset = numericValue - 50; // -50% (izquierda) a +50% (derecha)
    phoneElement.style.setProperty("--phone-shift", `${offset}%`);
    if (phoneSliderValue) {
      phoneSliderValue.textContent = `${numericValue}%`;
    }
  };

  const handleViewportChange = () => {
    if (!MOBILE_QUERY.matches) {
      // En escritorio, reseteamos al centro y ocultamos desplazamiento
      phoneElement.style.setProperty("--phone-shift", "0%");
      phoneSlider.value = "50";
      if (phoneSliderValue) {
        phoneSliderValue.textContent = "50%";
      }
    } else {
      updateShift(phoneSlider.value);
    }
  };

  updateShift(phoneSlider.value);
  phoneSlider.addEventListener("input", (event) => {
    updateShift(event.target.value);
  });

  MOBILE_QUERY.addEventListener("change", handleViewportChange);
  handleViewportChange();
}
