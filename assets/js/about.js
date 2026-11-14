
/* =========================================
   THE ART HOME INTERIORS — ABOUT JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".about-hero-image");

  // Subtle hero parallax
  if (
    heroImage &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {
          heroImage.style.backgroundPosition =
            `center ${48 + scrollY * 0.025}%`;
        }

        ticking = false;
      });
    }, { passive: true });
  }

  // Smooth scroll to story section
  document.querySelectorAll('.about-page a[href="#our-story"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector("#our-story");

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Small staggered entrance for values
  const values = document.querySelectorAll(".value-item");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    values.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
    });
  }
});
