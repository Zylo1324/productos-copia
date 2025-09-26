const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px',
  }
);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
  observer.observe(element);
});

const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('#primary-navigation');

if (navToggle && primaryNav) {
  const supportsInert = 'inert' in HTMLElement.prototype;
  const navLinks = Array.from(primaryNav.querySelectorAll('a'));

  const syncNavState = (isOpen) => {
    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('open');
      primaryNav.removeAttribute('aria-hidden');
      if (supportsInert) {
        primaryNav.inert = false;
      }
      navLinks.forEach((link) => {
        link.removeAttribute('tabindex');
      });
      return;
    }

    navToggle.setAttribute('aria-expanded', String(isOpen));
    primaryNav.classList.toggle('open', isOpen);
    primaryNav.setAttribute('aria-hidden', String(!isOpen));
    if (supportsInert) {
      primaryNav.inert = !isOpen;
    }
    navLinks.forEach((link) => {
      link.tabIndex = isOpen ? 0 : -1;
    });
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    syncNavState(!expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        syncNavState(false);
      }
    });
  });

  window.addEventListener('resize', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    syncNavState(expanded);
  });

  syncNavState(false);
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}
