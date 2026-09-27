// Lightweight scroll-reveal engine driven by `data-aos` / `data-aos-delay`
// markup already present in the JSX (mirrors the AOS library API without
// adding a new dependency). A MutationObserver picks up elements that
// render later (fetched lists, tables, etc.) so nothing gets stuck hidden.
let intersectionObserver;
let mutationObserver;

function getIntersectionObserver() {
  if (!intersectionObserver) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
  }
  return intersectionObserver;
}

function scan(root) {
  const elements = root.querySelectorAll('[data-aos]:not(.aos-animate)');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('aos-animate'));
    return;
  }

  const io = getIntersectionObserver();
  elements.forEach((el) => {
    const delay = el.getAttribute('data-aos-delay');
    if (delay) el.style.transitionDelay = `${delay}ms`;
    io.observe(el);
  });
}

export function initScrollReveal(root = document) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  scan(root);

  if (!mutationObserver) {
    mutationObserver = new MutationObserver(() => scan(document));
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}
