
/* ==========================================
   THE ART HOME — EXECUTION GALLERY JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // PROJECT FILTERS
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".execution-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      projectCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = selected === "all" || category === selected;

        card.classList.toggle("is-filtered", !shouldShow);
      });
    });
  });


  // BEFORE / AFTER COMPARISON
  const comparison = document.querySelector("[data-comparison]");

  if (comparison) {
    const range = comparison.querySelector(".comparison-range");
    const before = comparison.querySelector(".comparison-before");
    const divider = comparison.querySelector(".comparison-divider");

    const updateComparison = () => {
      const value = range.value;

      before.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      divider.style.left = `${value}%`;
    };

    range.addEventListener("input", updateComparison);
    updateComparison();
  }


  // LIGHTBOX
  const lightbox = document.querySelector(".execution-lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const fallback = lightbox?.querySelector(".lightbox-fallback");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const previousButton = lightbox?.querySelector(".lightbox-prev");
  const nextButton = lightbox?.querySelector(".lightbox-next");
  const counter = lightbox?.querySelector(".lightbox-counter");

  const imageButtons = [...document.querySelectorAll(".execution-image")];

  let currentIndex = 0;
  let previouslyFocused = null;
  let previousBodyOverflow = "";
  let imageRequestId = 0;

  const getImage = index => {
    const button = imageButtons[index];
    const thumbnail = button?.querySelector("img");
    return button?.dataset.full || thumbnail?.currentSrc || thumbnail?.src;
  };

  const showImage = index => {
    if (!imageButtons.length || !lightboxImage) return;

    currentIndex = (index + imageButtons.length) % imageButtons.length;

    const selectedButton = imageButtons[currentIndex];
    const imagePath = getImage(currentIndex);
    const requestId = ++imageRequestId;

    lightboxImage.alt =
      selectedButton.querySelector("img")?.alt || "Project image";
    lightboxImage.hidden = false;
    lightboxImage.classList.add("is-loading");

    if (fallback) fallback.hidden = true;

    lightboxImage.onload = () => {
      if (requestId !== imageRequestId) return;
      lightboxImage.classList.remove("is-loading");
      lightboxImage.hidden = false;
      if (fallback) fallback.hidden = true;
    };

    lightboxImage.onerror = () => {
      if (requestId !== imageRequestId) return;
      lightboxImage.classList.remove("is-loading");
      lightboxImage.hidden = true;
      if (fallback) fallback.hidden = false;
      console.error(`Execution gallery image failed to load: ${imagePath || "(missing image source)"}`);
    };

    if (!imagePath) {
      lightboxImage.classList.remove("is-loading");
      lightboxImage.hidden = true;
      if (fallback) fallback.hidden = false;
      console.error("Execution gallery image has no full-size or thumbnail source.");
      return;
    }

    lightboxImage.src = imagePath;

    if (counter) {
      counter.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(imageButtons.length).padStart(2, "0")}`;
    }

    if (lightboxImage.complete) {
      if (lightboxImage.naturalWidth > 0) {
        lightboxImage.onload();
      } else {
        lightboxImage.onerror();
      }
    }
  };

  const openLightbox = index => {
    if (!lightbox) return;

    previouslyFocused = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;

    imageRequestId += 1;
    if (lightboxImage) {
      lightboxImage.onload = null;
      lightboxImage.onerror = null;
      lightboxImage.removeAttribute("src");
      lightboxImage.classList.remove("is-loading");
      lightboxImage.hidden = true;
    }
    if (fallback) fallback.hidden = true;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousBodyOverflow;
    previousBodyOverflow = "";
    previouslyFocused?.focus();
    previouslyFocused = null;
  };

  imageButtons.forEach((button, index) => {
    button.addEventListener("click", () => openLightbox(index));
  });

  closeButton?.addEventListener("click", closeLightbox);

  previousButton?.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (!lightbox?.classList.contains("open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });

});
