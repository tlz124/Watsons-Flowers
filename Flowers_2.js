// Petal & Stem — Flowers_2.js (Essential Plus / Tier 2)

// ── Navbar scroll ─────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Hamburger ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Smooth scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Hero slideshow ────────────────────────────────────────
const slides   = document.querySelectorAll('.hero-slide');
const dots     = document.querySelectorAll('.dot');
let current    = 0;
let slideTimer = null;

function goToSlide(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = idx;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function nextSlide() {
  goToSlide((current + 1) % slides.length);
}

function startSlideshow() {
  slideTimer = setInterval(nextSlide, 5000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goToSlide(i);
    startSlideshow();
  });
});

startSlideshow();

// ── Catalog filter ────────────────────────────────────────
const filterBtns = document.querySelectorAll('.cf-btn');
const catalogCards = document.querySelectorAll('.catalog-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    catalogCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'catalogFadeIn 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject catalog fade animation
const style = document.createElement('style');
style.textContent = `
@keyframes catalogFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);

// ── Contact form ──────────────────────────────────────────
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  const invalids = [];
  if (!name)    invalids.push('name');
  if (!email)   invalids.push('email');
  if (!message) invalids.push('message');

  if (invalids.length) {
    invalids.forEach(id => {
      const el = form.querySelector(`#${id}`);
      el.style.borderColor = '#c0574a';
      el.addEventListener('input', () => el.style.borderColor = '', { once: true });
    });
    return;
  }

  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 4500);
  }, 900);
});

// ── Scroll reveal ─────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.about-inner, .catalog-grid, .gallery-grid, .delivery-inner, .testimonials-grid, .contact-inner, .location-inner'
);

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObs.observe(el);
});
