
/* =====================================================
   THE ART HOME INTERIORS
   PART 09 — RESPONSIVE & INTERACTION POLISH
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // SCROLL PROGRESS INDICATOR
  const progress = document.createElement("div");

  progress.className = "site-scroll-progress";

  Object.assign(progress.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "0%",
    height: "2px",
    background: "#b49a78",
    zIndex: "10001",
    pointerEvents: "none",
    transition: "width .08s linear"
  });

  document.body.appendChild(progress);

  let ticking = false;

  const updateProgress = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

    progress.style.width = `${Math.min(100, percentage)}%`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();


  // PREVENT EMPTY HASH LINKS FROM JUMPING TO TOP
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
    });
  });


});
