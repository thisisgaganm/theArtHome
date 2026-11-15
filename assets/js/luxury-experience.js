
/* ==================================================
   THE ART HOME INTERIORS
   PART 11 — LUXURY INTERACTIONS
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* --------------------------------
     1. PAGE TRANSITIONS
  -------------------------------- */

  const transition = document.createElement("div");

  transition.className = "luxury-page-transition";
  transition.setAttribute("aria-hidden", "true");

  transition.innerHTML = `
    <div class="luxury-transition-content">
      <span class="luxury-transition-title">THE ART HOME</span>
      <div class="luxury-transition-line"></div>
    </div>
  `;

  document.body.appendChild(transition);

  // Reveal the page after navigation.
  if (!reducedMotion) {
    requestAnimationFrame(() => {
      transition.classList.remove("is-active");
    });
  }

  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");

    if (!link) return;

    // Ignore modified clicks and non-navigation links.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === "_blank" ||
      link.hasAttribute("download")
    ) {
      return;
    }

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    let destination;

    try {
      destination = new URL(href, window.location.href);
    } catch {
      return;
    }

    // Only handle pages on the same origin.
    if (destination.origin !== window.location.origin) return;

    if (destination.pathname === window.location.pathname &&
        destination.search === window.location.search) {
      return;
    }

    // Only animate HTML page navigation.
    if (!/\.html?$/i.test(destination.pathname)) return;

    event.preventDefault();

    if (reducedMotion) {
      window.location.href = destination.href;
      return;
    }

    transition.classList.add("is-active");

    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 450);
  });


  /* --------------------------------
     2. EXTRA REVEAL ANIMATIONS
  -------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right"
  );

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }


  /* --------------------------------
     3. IMAGE CLASS ENHANCEMENT
  -------------------------------- */

  document.querySelectorAll(
    ".project-card img, .gallery-card img, .execution-card img"
  ).forEach(image => {
    const wrapper = image.parentElement;

    if (wrapper && !wrapper.classList.contains("luxury-image")) {
      wrapper.classList.add("luxury-image");
    }
  });

});
