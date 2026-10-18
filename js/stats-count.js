
const counters = document.querySelectorAll('.count');
let counted = false;
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(eased * target);
          counter.textContent = value.toLocaleString('en-US') + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else counter.textContent = target.toLocaleString('en-US') + suffix;
        };
        requestAnimationFrame(step);
      });
    }
  });
}, { threshold: 0.4 });

if (counters.length) countObs.observe(document.querySelector('.stats'));