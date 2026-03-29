// ── NAV: scroll effect + mobile toggle ──
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SMOOTH ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ── SCROLL-IN ANIMATIONS ──
const animateEls = document.querySelectorAll(
  '.character-card, .quote-card, .radio-card, .mission-item, .trivia-card, .gallery-item, .stat'
);

const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animateEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .5s ease ${i * 0.04}s, transform .5s ease ${i * 0.04}s`;
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible, .character-card, .quote-card').forEach(el => {
    // already visible items near top
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
});

// Add the class that triggers the transition
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .nav-links a.active { color: var(--pink) !important; }
  </style>
`);

// ── NEON GRID BACKGROUND for hero ──
(function addHeroGrid() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const grid = document.createElement('div');
  grid.style.cssText = `
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,45,120,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,45,120,.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 100%, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 100%, black 0%, transparent 70%);
  `;
  hero.insertBefore(grid, hero.firstChild);
})();

// ── TYPING EFFECT for hero tagline ──
(function heroTyping() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.visibility = 'visible';
  let i = 0;
  const timer = setInterval(() => {
    tagline.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, 28);
})();
