
/* =========================================
   THE ART HOME INTERIORS — GALLERY JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------
  // CATEGORY FILTERS
  // -------------------------------------

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      portfolioCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        card.classList.toggle("hidden", !shouldShow);
        card.classList.remove("filtered-out");
      });
    });
  });

  // -------------------------------------
  // LIGHTBOX
  // -------------------------------------

  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");

  if (!lightbox || !lightboxImage) return;

  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");

  let currentImages = [];
  let currentIndex = 0;
  let previouslyFocused = null;

  function collectVisibleImages() {
    return [...document.querySelectorAll(".portfolio-card:not(.hidden) .portfolio-image")]
      .filter(button => button.dataset.full);
  }

  function showImage(index) {
    if (!currentImages.length) return;

    currentIndex =
      (index + currentImages.length) % currentImages.length;

    const selectedButton = currentImages[currentIndex];
    const image = selectedButton.querySelector("img");

    lightboxImage.src = selectedButton.dataset.full;
    lightboxImage.alt = image ? image.alt : "Portfolio image";

    lightboxCounter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ${String(currentImages.length).padStart(2, "0")}`;
  }

  function openLightbox(button) {
    currentImages = collectVisibleImages();

    currentIndex = currentImages.indexOf(button);

    if (currentIndex < 0) return;

    previouslyFocused = document.activeElement;

    showImage(currentIndex);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    lightboxImage.removeAttribute("src");

    if (previouslyFocused) {
      previouslyFocused.focus();
    }
  }

  document.querySelectorAll(".portfolio-image").forEach(button => {
    button.addEventListener("click", () => {
      openLightbox(button);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  // Close when clicking the dark background
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard controls
  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });

  // -------------------------------------
  // SMOOTH SCROLL
  // -------------------------------------

  document.querySelectorAll('.gallery-page a[href="#portfolio"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector("#portfolio");

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

});
