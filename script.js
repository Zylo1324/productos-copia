const apps = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "IA conversacional",
    tagline: "Asistente cognitivo",
    description:
      "Consulta ideas, genera contenidos y automatiza reportes con un asistente entrenado para responder en segundos.",
    highlights: [
      "Plugins y navegación avanzada",
      "Memoria compartida con tu equipo",
      "Plantillas para investigación y soporte"
    ],
    link: "https://chat.openai.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    iconBackground: "linear-gradient(135deg, #0ea879, #041f16)",
    iconColor: "#f8fafc"
  },
  {
    id: "sora",
    name: "Sora",
    category: "Video con IA",
    tagline: "Historias en movimiento",
    description:
      "Convierte guiones en videos hiperrealistas con control de cámara, escenas y estilos cinematográficos.",
    highlights: [
      "Edición por instrucciones en texto",
      "Planos multi escena en un solo render",
      "Previsualizaciones en 4K listos para uso comercial"
    ],
    link: "https://openai.com/sora",
    initials: "So",
    iconBackground: "linear-gradient(135deg, #6366f1, #a855f7)",
    iconColor: "#fdf4ff"
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "Suite Google",
    tagline: "Análisis multimodal",
    description:
      "Explora investigaciones, diseña prompts complejos y colabora en tiempo real con la inteligencia de Gemini Advanced.",
    highlights: [
      "Integración con Docs, Sheets y Slides",
      "Modelos de texto e imagen en un mismo flujo",
      "Protección de datos empresariales"
    ],
    link: "https://gemini.google.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/7/70/Google_Gemini_logo.svg",
    iconBackground: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
    iconColor: "#051224"
  },
  {
    id: "veo3",
    name: "Veo 3",
    category: "Generación de video",
    tagline: "Prompts cinematográficos",
    description:
      "Crea secuencias impactantes con control de ritmo, transiciones automáticas y adaptación a formatos sociales.",
    highlights: [
      "Prompts visuales y de audio combinados",
      "Restauración de escenas con IA",
      "Exportación optimizada para redes sociales"
    ],
    link: "https://deepmind.google/technologies/veo/",
    initials: "V3",
    iconBackground: "linear-gradient(135deg, #f97316, #fb7185)",
    iconColor: "#fff8f6"
  },
  {
    id: "turnitin",
    name: "Turnitin",
    category: "Integridad académica",
    tagline: "Originalidad garantizada",
    description:
      "Evalúa trabajos académicos con reportes detallados, detección de IA y retroalimentación personalizada.",
    highlights: [
      "Comparación con bases globales",
      "Indicadores de escritura asistida",
      "Paneles colaborativos para docentes"
    ],
    link: "https://www.turnitin.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Turnitin_logo.svg",
    iconBackground: "linear-gradient(135deg, #ef4444, #f97316)",
    iconColor: "#fff5f5"
  },
  {
    id: "quillbot",
    name: "QuillBot",
    category: "Escritura asistida",
    tagline: "Paráfrasis inteligente",
    description:
      "Refina ensayos, resume artículos extensos y crea citas en segundos con modos creativos y formales.",
    highlights: [
      "Extensiones para Word y Chrome",
      "Detector gramatical contextual",
      "Resumen automático por puntos clave"
    ],
    link: "https://quillbot.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/7/7e/QuillBot_logo.svg",
    iconBackground: "linear-gradient(135deg, #10b981, #059669)",
    iconColor: "#ecfdf5"
  },
  {
    id: "gamma",
    name: "Gamma",
    category: "Presentaciones",
    tagline: "Narrativas interactivas",
    description:
      "Construye presentaciones, micrositios y guiones con plantillas generativas listas para compartir.",
    highlights: [
      "Slides automáticos a partir de prompts",
      "Embeds interactivos y video integrado",
      "Colaboración en tiempo real"
    ],
    link: "https://gamma.app/",
    initials: "Ga",
    iconBackground: "linear-gradient(135deg, #f472b6, #c084fc)",
    iconColor: "#fff1ff"
  },
  {
    id: "capcut",
    name: "CapCut",
    category: "Edición de video",
    tagline: "Contenido viral",
    description:
      "Optimiza clips para redes sociales con plantillas dinámicas, efectos IA y exportación en 4K.",
    highlights: [
      "Sincronización inteligente con música",
      "Remoción de fondo con un clic",
      "Biblioteca de efectos premium"
    ],
    link: "https://www.capcut.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/d/d7/CapCut_Logo.svg",
    iconBackground: "linear-gradient(135deg, #111827, #0f172a)",
    iconColor: "#f1f5f9"
  },
  {
    id: "ytmusic",
    name: "YT Music",
    category: "Streaming",
    tagline: "Sonido ilimitado",
    description:
      "Escucha álbumes, podcasts y playlists personalizadas sin anuncios, incluso sin conexión.",
    highlights: [
      "Modo audio y video en una sola app",
      "Descargas automáticas por gustos",
      "Audio mejorado con ecualizador adaptativo"
    ],
    link: "https://music.youtube.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/0/0b/YouTube_Music_icon.svg",
    iconBackground: "linear-gradient(135deg, #ef4444, #b91c1c)",
    iconColor: "#fff5f5"
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Contenido infinito",
    tagline: "Aprende sin límites",
    description:
      "Explora tutoriales, documentales y cursos completos con recomendaciones impulsadas por IA.",
    highlights: [
      "Listas colaborativas con tu equipo",
      "Modo picture-in-picture en escritorio",
      "Compatibilidad con subtítulos multilínea"
    ],
    link: "https://www.youtube.com/",
    iconImage: "https://upload.wikimedia.org/wikipedia/commons/9/9f/YouTube_Icon_%282013-2017%29.svg",
    iconBackground: "linear-gradient(135deg, #ef4444, #dc2626)",
    iconColor: "#fff5f5"
  }
];

const appGrid = document.getElementById("appGrid");
const panelCard = document.getElementById("panelCard");
const panelPlaceholder = document.getElementById("panelPlaceholder");
const panelTitle = document.getElementById("panelTitle");
const panelCopy = document.getElementById("panelCopy");
const panelHighlights = document.getElementById("panelHighlights");
const panelLink = document.getElementById("panelLink");
const panelTag = document.getElementById("panelTag");

let activeButton;

function createAppItem(app) {
  const item = document.createElement("li");
  item.className = "app-item";

  const button = document.createElement("button");
  button.type = "button";
  button.dataset.app = app.id;

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "app-icon";
  iconWrapper.style.setProperty("--icon-bg", app.iconBackground);
  if (app.iconColor) {
    iconWrapper.style.setProperty("--icon-color", app.iconColor);
  }

  if (app.iconImage) {
    const image = document.createElement("img");
    image.src = app.iconImage;
    image.alt = "";
    image.loading = "lazy";
    iconWrapper.appendChild(image);
  } else if (app.initials) {
    const initials = document.createElement("span");
    initials.textContent = app.initials;
    iconWrapper.appendChild(initials);
  }

  const name = document.createElement("span");
  name.className = "app-name";
  name.textContent = app.name;

  button.append(iconWrapper, name);
  item.append(button);

  button.addEventListener("click", () => selectApp(app, button));

  return item;
}

function selectApp(app, button) {
  if (activeButton) {
    activeButton.classList.remove("is-active");
  }
  activeButton = button;
  activeButton.classList.add("is-active");

  panelPlaceholder.hidden = true;
  panelCard.hidden = false;

  panelTag.textContent = app.tagline;
  panelTitle.textContent = app.name;
  panelCopy.textContent = app.description;
  panelLink.href = app.link;

  panelHighlights.innerHTML = "";
  app.highlights.forEach((highlight) => {
    const li = document.createElement("li");
    li.textContent = highlight;
    panelHighlights.appendChild(li);
  });

  panelTag.style.background = `${app.iconBackground}`;
  panelTag.style.color = app.iconColor || "#0f172a";
}

apps.forEach((app) => {
  const item = createAppItem(app);
  appGrid.appendChild(item);
});

// Selecciona la primera app por defecto para mostrar contenido inicial.
if (apps.length > 0) {
  const firstButton = appGrid.querySelector("button");
  if (firstButton) {
    firstButton.click();
  }
}
