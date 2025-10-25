const categories = [
  { label: "Wearables", icon: "⌚" },
  { label: "Audio", icon: "🎧" },
  { label: "Gaming", icon: "🎮" },
  { label: "Accesorios", icon: "🧰" },
  { label: "Smart Home", icon: "🏠" },
  { label: "Oficina", icon: "💼" }
];

const catalog = {
  "hot-deals": [
    {
      name: "Smart Watch Pro",
      category: "Wearables",
      price: 199,
      originalPrice: 259,
      badge: "-25%",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
      description: "Seguimiento de salud 24/7, carga inalámbrica y GPS de precisión.",
      tags: ["watch", "wearable", "fitness"]
    },
    {
      name: "Game Pad Elite",
      category: "Gaming",
      price: 149,
      originalPrice: 199,
      badge: "Hot",
      image:
        "https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=600&q=80",
      description: "Mando inalámbrico con respuesta háptica y gatillos inteligentes.",
      tags: ["gaming", "console", "controller"]
    },
    {
      name: "Teclado Mecánico Aurora",
      category: "Gaming",
      price: 129,
      originalPrice: 169,
      badge: "Combo",
      image:
        "https://images.unsplash.com/photo-1595224525940-2056af85d0cc?auto=format&fit=crop&w=600&q=80",
      description: "Switches ópticos, iluminación RGB dinámica y reposamuñecas magnético.",
      tags: ["gaming", "keyboard", "pc"]
    },
    {
      name: "Auriculares Studio X",
      category: "Audio",
      price: 179,
      originalPrice: 229,
      badge: "-22%",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      description: "Cancelación activa de ruido y batería de 35h con carga rápida.",
      tags: ["audio", "headphones", "music"]
    }
  ],
  discounts: [
    {
      name: "Combo productividad",
      description: "Monitor 4K + Dock USB-C + Lámpara inteligente",
      highlight: "Ahorra 35%",
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80",
      tags: ["office", "workspace", "monitor"]
    },
    {
      name: "Set creativo",
      description: "iPad Pro + Pencil + Funda magnética",
      highlight: "12 cuotas sin interés",
      image:
        "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=700&q=80",
      tags: ["tablet", "creative", "office"]
    },
    {
      name: "Smart Home essentials",
      description: "Parlante inteligente + Iluminación RGB + Sensor de clima",
      highlight: "Instalación incluida",
      image:
        "https://images.unsplash.com/photo-1582719478248-4c01e3931b4d?auto=format&fit=crop&w=700&q=80",
      tags: ["home", "smart", "assistant"]
    }
  ],
  "new-arrivals": [
    {
      name: "Cargador MagSafe Air",
      category: "Accesorios",
      price: 59,
      image:
        "https://images.unsplash.com/photo-1622023539844-a266ebf66f6d?auto=format&fit=crop&w=500&q=80",
      tags: ["accessory", "charging", "phone"]
    },
    {
      name: "Speaker Mini Pixel",
      category: "Audio",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
      tags: ["audio", "speaker", "home"]
    },
    {
      name: "Anillo Fitness Orbit",
      category: "Wearables",
      price: 139,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
      tags: ["wearable", "fitness", "health"]
    },
    {
      name: "Soporte ergonómico Flux",
      category: "Accesorios",
      price: 74,
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=500&q=80",
      tags: ["accessory", "office", "stand"]
    },
    {
      name: "Control Smart Hue",
      category: "Smart Home",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1582719478181-2cf4e2fe3f89?auto=format&fit=crop&w=500&q=80",
      tags: ["smart", "home", "assistant"]
    },
    {
      name: "Micrófono StreamCast",
      category: "Audio",
      price: 169,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
      tags: ["audio", "microphone", "stream"]
    }
  ],
  reviews: [
    {
      name: "Gabriel",
      rating: 5,
      headline: "Totalmente worth it!",
      copy:
        "Las ofertas flash no fallan, llegó en 48 horas y el monitor vino impecable. La atención al cliente fue rapidísima.",
      role: "Product designer"
    },
    {
      name: "Anya",
      rating: 5,
      headline: "No me arrepiento",
      copy:
        "La instalación del set smart home fue sencilla y el equipo de soporte superó mis expectativas. Recomendado al 100%.",
      role: "Fotógrafa freelance"
    },
    {
      name: "Luke",
      rating: 4,
      headline: "Amando el setup",
      copy:
        "El teclado y la silla ergonómica hicieron la diferencia. Procesos de compra claros y seguimiento constante.",
      role: "Frontend developer"
    },
    {
      name: "Kim",
      rating: 5,
      headline: "Mi tienda de confianza",
      copy:
        "Siempre hay gadgets nuevos. El cashback es real y el programa de fidelidad suma bastante.",
      role: "Streamer"
    }
  ]
};

const searchInput = document.querySelector("[data-search]");
const categoryStrip = document.querySelector("[data-category-strip]");
const resetButtons = document.querySelectorAll('[data-action="reset"]');

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.productCard = "";
  card.dataset.title = product.name.toLowerCase();
  card.dataset.category = product.category?.toLowerCase() ?? "";
  card.dataset.tags = (product.tags ?? []).join(" ").toLowerCase();

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
  price.innerHTML = `US$${product.price.toFixed(0)}${
    product.originalPrice ? ` <del>US$${product.originalPrice.toFixed(0)}</del>` : ""
  }`;

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

  const badge = document.createElement("span");
  badge.textContent = "Nuevo";

  const image = document.createElement("img");
  image.src = arrival.image;
  image.alt = arrival.name;
  image.loading = "lazy";

  const title = document.createElement("strong");
  title.textContent = arrival.name;

  const footer = document.createElement("footer");
  footer.innerHTML = `<span>${arrival.category}</span><strong>US$${arrival.price.toFixed(0)}</strong>`;

  card.append(badge, image, title, footer);
  return card;
}

function createReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card";

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
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-pill";
    button.dataset.categoryFilter = category.label.toLowerCase();
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
  items.forEach((item) => {
    grid.appendChild(renderer(item));
  });
}

function renderReviews() {
  const grid = document.querySelector('[data-grid="reviews"]');
  if (!grid) return;
  grid.innerHTML = "";
  catalog.reviews.forEach((review) => grid.appendChild(createReviewCard(review)));
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
}

document.addEventListener("DOMContentLoaded", initialize);
