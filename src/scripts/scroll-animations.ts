// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const delay = parseInt(el.dataset.delay ?? '0', 10);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
);

document.querySelectorAll<HTMLElement>('.animate-in').forEach((el, i) => {
  el.dataset.delay = String((i % 4) * 100);
  observer.observe(el);
});

// Animate language bars on scroll
const langObserver = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll<HTMLElement>('.lang-bar-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = (fill.dataset.width ?? '0') + '%';
          }, i * 300);
        });
        langObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

document.querySelectorAll('.languages-block').forEach((el) => langObserver.observe(el));

// Smooth scroll for nav links
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e: Event) {
    e.preventDefault();
    const href = (this as HTMLAnchorElement).getAttribute('href');
    if (!href) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
