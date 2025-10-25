const categories = [
  { label: "IA", icon: "🤖" },
  { label: "Diseño", icon: "🎨" },
  { label: "Streaming", icon: "📺" },
  { label: "Lectura", icon: "📚" },
  { label: "Educación", icon: "🎓" },
  { label: "Productividad", icon: "⚡" }
];

const catalog = {
  "hot-deals": [
    {
      name: "ChatGPT 5 Plus",
      category: "IA",
      price: 65,
      originalPrice: 85,
      currencySymbol: "S/",
      badge: "Top",
      image:
        "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=600&q=80",
      description: "Acceso prioritario al modelo GPT-5 con respuestas más rápidas y plugins ilimitados.",
      billingCycle: "Plan mensual",
      tags: ["chatgpt", "ia", "productividad"]
    },
    {
      name: "Canva Pro",
      category: "Diseño",
      price: 40,
      originalPrice: 55,
      currencySymbol: "S/",
      badge: "-27%",
      image:
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=600&q=80",
      description: "Biblioteca premium, fondos transparentes y colaboraciones en tiempo real.",
      billingCycle: "Plan mensual",
      tags: ["canva", "diseño", "creatividad"]
    },
    {
      name: "Scribd Premium",
      category: "Lectura",
      price: 30,
      originalPrice: 40,
      currencySymbol: "S/",
      badge: "-25%",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
      description: "Acceso ilimitado a libros, audiolibros y documentos profesionales.",
      billingCycle: "Plan mensual",
      tags: ["lectura", "libros", "suscripción"]
    },
    {
      name: "DIRECTV GO",
      category: "Streaming",
      price: 45,
      originalPrice: 60,
      currencySymbol: "S/",
      badge: "TV en vivo",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80",
      description: "Canales en vivo, deportes y contenido on demand sin decos adicionales.",
      billingCycle: "Plan mensual",
      tags: ["streaming", "televisión", "series"]
    },
    {
      name: "Turnitin Feedback Studio",
      category: "Educación",
      price: 90,
      originalPrice: 120,
      currencySymbol: "S/",
      badge: "-30%",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      description: "Detección de similitud y reportes detallados para entregas académicas.",
      billingCycle: "Licencia anual",
      tags: ["academia", "originalidad", "educación"]
    },
    {
      name: "Sora Creative Suite",
      category: "IA",
      price: 120,
      originalPrice: 160,
      currencySymbol: "S/",
      badge: "Video IA",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
      description: "Generación de video narrativa con plantillas y estilos cinematográficos.",
      billingCycle: "Plan mensual",
      tags: ["sora", "video", "ia"]
    },
    {
      name: "Gemini + Veo 3",
      category: "IA",
      price: 110,
      originalPrice: 150,
      currencySymbol: "S/",
      badge: "Bundle IA",
      image:
        "https://images.unsplash.com/photo-1523475472560-6c16f0c8884f?auto=format&fit=crop&w=600&q=80",
      description: "Modelos multimodales para crear imágenes y videos con prompts avanzados.",
      billingCycle: "Plan mensual",
      tags: ["gemini", "veo", "bundle"]
    },
    {
      name: "Perplexity Pro",
      category: "Productividad",
      price: 35,
      originalPrice: 45,
      currencySymbol: "S/",
      badge: "IA citada",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
      description: "Respuestas en tiempo real con citaciones y análisis de investigación.",
      billingCycle: "Plan mensual",
      tags: ["perplexity", "ia", "investigación"]
    },
    {
      name: "CapCut Pro",
      category: "Diseño",
      price: 28,
      originalPrice: 36,
      currencySymbol: "S/",
      badge: "-22%",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      description: "Efectos premium, recorte automático y exportaciones 4K sin marca de agua.",
      billingCycle: "Plan mensual",
      tags: ["capcut", "edición", "video"]
    },
    {
      name: "YouTube Premium",
      category: "Streaming",
      price: 32,
      originalPrice: 40,
      currencySymbol: "S/",
      badge: "Sin anuncios",
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=600&q=80",
      description: "Videos sin anuncios, descargas offline y acceso a YouTube Music.",
      billingCycle: "Plan familiar",
      tags: ["youtube", "streaming", "música"]
    },
    {
      name: "Disney+",
      category: "Streaming",
      price: 29,
      originalPrice: 38,
      currencySymbol: "S/",
      badge: "Combo Star",
      image:
        "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=600&q=80",
      description: "Películas y series exclusivas de Disney, Pixar, Marvel y Star Wars.",
      billingCycle: "Plan anual",
      tags: ["disney", "streaming", "series"]
    }
  ],
  discounts: [
    {
      name: "Pack IA Total",
      description: "ChatGPT Plus + Gemini Advanced + Perplexity Pro",
      highlight: "Ahorra 25%",
      image:
        "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=700&q=80",
      tags: ["ia", "bundle", "productividad"]
    },
    {
      name: "Kit Diseño Pro",
      description: "Canva Pro + CapCut Pro + Biblioteca de mockups",
      highlight: "12 meses a precio especial",
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80",
      tags: ["diseño", "creatividad", "video"]
    },
    {
      name: "Streaming Total",
      description: "Disney+ + DIRECTV GO + YouTube Premium",
      highlight: "Incluye perfiles familiares",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=700&q=80",
      tags: ["streaming", "entretenimiento", "series"]
    }
  ],
  "new-arrivals": [
    {
      name: "Sora Story Pack",
      category: "IA",
      price: 140,
      currencySymbol: "S/",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      tags: ["sora", "video", "story"]
    },
    {
      name: "Gemini Workspace",
      category: "Productividad",
      price: 95,
      currencySymbol: "S/",
      image:
        "https://images.unsplash.com/photo-1523475472560-6c16f0c8884f?auto=format&fit=crop&w=500&q=80",
      tags: ["gemini", "productividad", "workspace"]
    },
    {
      name: "Turnitin Classroom",
      category: "Educación",
      price: 180,
      currencySymbol: "S/",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
      tags: ["turnitin", "educación", "clase"]
    },
    {
      name: "Perplexity Research Kit",
      category: "IA",
      price: 52,
      currencySymbol: "S/",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=500&q=80",
      tags: ["perplexity", "ia", "research"]
    },
    {
      name: "CapCut Motion FX",
      category: "Diseño",
      price: 34,
      currencySymbol: "S/",
      image:
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=500&q=80",
      tags: ["capcut", "motion", "efectos"]
    },
    {
      name: "DIRECTV Deportes Max",
      category: "Streaming",
      price: 58,
      currencySymbol: "S/",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
      tags: ["directv", "deportes", "streaming"]
    }
  ],
  reviews: [
    {
      name: "Gabriel",
      rating: 5,
      headline: "Accesos al instante",
      copy:
        "Activaron mi plan de YouTube Premium en minutos y el soporte me ayudó a vincular Disney+ con toda la familia.",
      role: "Product designer"
    },
    {
      name: "Anya",
      rating: 5,
      headline: "Creatividad desbloqueada",
      copy:
        "El combo Canva + CapCut viene con recursos exclusivos y workshops. Perfecto para mis entregas de diseño.",
      role: "Fotógrafa freelance"
    },
    {
      name: "Luke",
      rating: 4,
      headline: "IA con soporte real",
      copy:
        "Compré el pack IA Total y recibí onboarding guiado. Las respuestas de Perplexity con citas son una locura.",
      role: "Frontend developer"
    },
    {
      name: "Kim",
      rating: 5,
      headline: "Streaming sin estrés",
      copy:
        "Gestionaron mis cuentas de Disney+ y DIRECTV GO. Todo sincronizado con recordatorios de renovación.",
      role: "Streamer"
    }
  ]
};

const searchInput = document.querySelector("[data-search]");
const categoryStrip = document.querySelector("[data-category-strip]");
const resetButtons = document.querySelectorAll('[data-action="reset"]');
let animationObserver;

function formatCurrency(amount, currencySymbol = "US$") {
  if (typeof amount !== "number") return "";
  const formatter = new Intl.NumberFormat("es-PE", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2
  });
  return `${currencySymbol}${formatter.format(amount)}`;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.productCard = "";
  card.dataset.title = product.name.toLowerCase();
  card.dataset.category = product.category?.toLowerCase() ?? "";
  card.dataset.tags = (product.tags ?? []).join(" ").toLowerCase();
  card.dataset.animate = "fade-up";

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  figure.appendChild(image);

  if (product.badge) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = product.badge;
    figure.appendChild(badge);
  }

  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = product.description ?? product.category;
  description.className = "copy";

  const price = document.createElement("div");
  price.className = "price";
  const currencySymbol = product.currencySymbol ?? "US$";
  const formattedPrice = formatCurrency(product.price, currencySymbol);
  const formattedOriginal = formatCurrency(
    product.originalPrice,
    product.originalCurrencySymbol ?? currencySymbol
  );
  price.innerHTML = `${formattedPrice || ""}${
    formattedOriginal ? ` <del>${formattedOriginal}</del>` : ""
  }`;

  if (product.billingCycle) {
    const billing = document.createElement("span");
    billing.className = "billing";
    billing.textContent = product.billingCycle;
    price.appendChild(billing);
  }

  const footer = document.createElement("footer");
  const category = document.createElement("span");
  category.textContent = product.category;
  const cta = document.createElement("button");
  cta.type = "button";
  cta.textContent = "Añadir";
  footer.append(category, cta);

  card.append(figure, title, description, price, footer);
  return card;
}

function createDiscountCard(bundle) {
  const card = document.createElement("article");
  card.className = "discount-card";
  card.dataset.productCard = "";
  card.dataset.title = bundle.name.toLowerCase();
  card.dataset.tags = (bundle.tags ?? []).join(" ").toLowerCase();
  card.dataset.animate = "fade-up";

  const copyWrapper = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = bundle.name;
  const highlight = document.createElement("p");
  highlight.textContent = bundle.highlight;
  const details = document.createElement("span");
  details.className = "details";
  details.textContent = bundle.description;

  copyWrapper.append(title, highlight, details);

  const image = document.createElement("img");
  image.src = bundle.image;
  image.alt = bundle.name;
  image.loading = "lazy";

  card.append(copyWrapper, image);
  return card;
}

function createArrivalCard(arrival) {
  const card = document.createElement("article");
  card.className = "arrival-card";
  card.dataset.productCard = "";
  card.dataset.title = arrival.name.toLowerCase();
  card.dataset.category = arrival.category.toLowerCase();
  card.dataset.tags = (arrival.tags ?? []).join(" ").toLowerCase();
  card.dataset.animate = "fade-up";

  const badge = document.createElement("span");
  badge.textContent = "Nuevo";

  const image = document.createElement("img");
  image.src = arrival.image;
  image.alt = arrival.name;
  image.loading = "lazy";

  const title = document.createElement("strong");
  title.textContent = arrival.name;

  const footer = document.createElement("footer");
  const currencySymbol = arrival.currencySymbol ?? "US$";
  footer.innerHTML = `<span>${arrival.category}</span><strong>${formatCurrency(
    arrival.price,
    currencySymbol
  )}</strong>`;

  card.append(badge, image, title, footer);
  return card;
}

function createReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card";
  card.dataset.animate = "fade-up";

  const stars = document.createElement("div");
  stars.className = "stars";
  stars.textContent = "★".repeat(review.rating).padEnd(5, "☆");

  const headline = document.createElement("strong");
  headline.textContent = review.headline;

  const copy = document.createElement("p");
  copy.textContent = review.copy;

  const author = document.createElement("span");
  author.textContent = `${review.name} • ${review.role}`;

  card.append(stars, headline, copy, author);
  return card;
}

function renderCategories() {
  if (!categoryStrip) return;
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-pill";
    button.dataset.categoryFilter = category.label.toLowerCase();
    button.dataset.animate = "fade-up";
    button.style.setProperty("--stagger", index + 1);
    button.innerHTML = `<span class="icon">${category.icon}</span><span>${category.label}</span>`;
    button.addEventListener("click", () => {
      setActiveCategory(button);
      searchInput.value = category.label;
      filterProducts();
    });
    categoryStrip.appendChild(button);
  });
}

function setActiveCategory(activeButton) {
  document.querySelectorAll(".category-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill === activeButton);
  });
}

function renderSection(sectionKey, renderer) {
  const grid = document.querySelector(`[data-grid="${sectionKey}"]`);
  if (!grid) return;
  const items = catalog[sectionKey];
  grid.innerHTML = "";
  items.forEach((item, index) => {
    const element = renderer(item, index);
    if (!element) return;
    element.style.setProperty("--stagger", index + 1);
    grid.appendChild(element);
  });
}

function renderReviews() {
  const grid = document.querySelector('[data-grid="reviews"]');
  if (!grid) return;
  grid.innerHTML = "";
  catalog.reviews.forEach((review, index) => {
    const card = createReviewCard(review, index);
    card.style.setProperty("--stagger", index + 1);
    grid.appendChild(card);
  });
}

function setupAnimations() {
  const animatedItems = document.querySelectorAll("[data-animate]");
  if (!animatedItems.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    animatedItems.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  animatedItems.forEach((element, index) => {
    if (!element.style.getPropertyValue("--stagger")) {
      element.style.setProperty("--stagger", index % 8);
    }
    animationObserver.observe(element);
  });
}

function filterProducts() {
  const query = searchInput?.value.trim().toLowerCase() ?? "";
  const cards = document.querySelectorAll("[data-product-card]");

  cards.forEach((card) => {
    const haystack = [card.dataset.title, card.dataset.category, card.dataset.tags]
      .filter(Boolean)
      .join(" ");
    card.hidden = Boolean(query) && !haystack.includes(query);
  });

  document.querySelectorAll("[data-section-wrapper]").forEach((section) => {
    const visible = Array.from(section.querySelectorAll("[data-product-card]"))
      .filter((card) => !card.hidden).length;
    const emptyMessage = section.querySelector("[data-empty-message]");
    section.classList.toggle("is-empty", Boolean(query) && visible === 0);
    if (emptyMessage) {
      emptyMessage.hidden = !(Boolean(query) && visible === 0);
    }
  });
}

function resetFilters() {
  searchInput.value = "";
  document.querySelectorAll(".category-pill").forEach((pill) => pill.classList.remove("is-active"));
  filterProducts();
}

function initialize() {
  renderCategories();
  renderSection("hot-deals", createProductCard);
  renderSection("discounts", createDiscountCard);
  renderSection("new-arrivals", createArrivalCard);
  renderReviews();
  filterProducts();

  searchInput?.addEventListener("input", () => {
    document
      .querySelectorAll(".category-pill")
      .forEach((pill) => pill.classList.remove("is-active"));
    filterProducts();
  });

  resetButtons.forEach((button) => {
    button.addEventListener("click", resetFilters);
  });

  setupAnimations();
}

document.addEventListener("DOMContentLoaded", initialize);
