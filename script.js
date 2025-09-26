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
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('open');
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('open');
      }
    });
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}
