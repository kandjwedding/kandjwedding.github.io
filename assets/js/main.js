document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Scroll-to-top on first load if no hash
  if (!window.location.hash) window.scrollTo(0, 0);

  // ===== Scroll reveal =====
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const items = document.querySelectorAll('[data-anim]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target); // reveal once
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    items.forEach(el => io.observe(el));
  }

  // ===== Subtle hero parallax (optional) =====
  const heroText = document.querySelector('.hero-text.parallax');
  if (heroText && !reduce) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          // Move hero text up to ~18px as you scroll
          const offset = Math.min(y * 0.08, 18);
          heroText.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});

const plusoneSelect = document.getElementById('plusone');
const plusoneSection = document.getElementById('plusone-section');

plusoneSelect.addEventListener('change', function() {
  if (this.value === 'Yes') {
    plusoneSection.style.display = 'block';
  } else {
    plusoneSection.style.display = 'none';
  }
});

