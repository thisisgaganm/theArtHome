
/* =========================================
   SERVICES PAGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".services-hero-image");

  // Gentle hero image movement while scrolling
  if (heroImage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  // Smooth scroll for the hero link
  document.querySelectorAll('.services-page a[href="#our-services"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector("#our-services");

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
