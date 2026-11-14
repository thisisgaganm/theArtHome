
/* ==============================================
   THE ART HOME INTERIORS
   PART 10 — SITE AUDIT & FINAL CHECKS
============================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. PAGE LOADER SAFETY
  const loader = document.querySelector(".page-loader");

  if (loader) {
    window.addEventListener("load", () => {
      loader.classList.add("loader-hidden");

      window.setTimeout(() => {
        loader.style.display = "none";
      }, 750);
    });

    // Fallback in case another script fails.
    window.setTimeout(() => {
      loader.classList.add("loader-hidden");

      window.setTimeout(() => {
        loader.style.display = "none";
      }, 750);
    }, 5000);
  }


  // 2. CHECK IMAGE FILES
  document.querySelectorAll("img").forEach(img => {
    if (!img.getAttribute("src")?.trim()) return;

    const reportMissing = () => {
      if (img.naturalWidth > 0) return;

      console.warn("[THE ART HOME] Missing image:", img.currentSrc || img.src);
      img.classList.add("image-not-found");
    };

    if (img.complete) {
      if (img.naturalWidth === 0 && img.loading !== "lazy") {
        reportMissing();
      } else if (img.naturalWidth === 0) {
        img.addEventListener("error", reportMissing, { once: true });
      }
    } else {
      img.addEventListener("error", reportMissing, { once: true });
    }

  });


  // 3. CHECK INTERNAL LINKS
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("https://") ||
      href.startsWith("http://") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    if (href.startsWith("assets/")) return;

    const target = href.split("#")[0];

    if (!target) return;

    // Report suspicious empty links.
    if (target.trim() === "") {
      console.warn("[THE ART HOME] Empty internal link:", link);
    }
  });


  // 4. MOBILE MENU ACCESSIBILITY
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuToggle && navigation) {
    menuToggle.setAttribute("aria-controls", "primary-navigation");
    navigation.id = "primary-navigation";

    if (!menuToggle.hasAttribute("aria-expanded")) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

    const observer = new MutationObserver(() => {
      const isOpen =
        navigation.classList.contains("open") ||
        navigation.classList.contains("active") ||
        navigation.classList.contains("show");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    observer.observe(navigation, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }


  // 5. ADD LAZY LOADING TO NON-HERO IMAGES
  document.querySelectorAll("img").forEach(img => {
    const isHero = img.closest(
      ".hero, .execution-hero, .page-hero, .home-hero"
    );

    if (!isHero && !img.hasAttribute("loading")) {
      img.loading = "lazy";
    }

    if (!img.hasAttribute("decoding")) {
      img.decoding = "async";
    }
  });


  // 6. CURRENT YEAR
  document.querySelectorAll("[data-current-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  // 7. BASIC PAGE REPORT
  console.info(
    "%c THE ART HOME INTERIORS ",
    "background:#292722;color:#f5f1eb;padding:8px 12px;font-size:13px;"
  );

  console.info("Current page:", window.location.pathname);
  console.info("Images detected:", document.images.length);
  console.info("Internal links detected:",
    document.querySelectorAll('a[href]').length
  );

});
