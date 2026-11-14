
/* =========================================
   THE ART HOME INTERIORS — CONTACT JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for contact page anchor links
  document.querySelectorAll('.contact-page a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Small interaction for form fields
  document.querySelectorAll(".contact-form .form-field input, .contact-form .form-field textarea, .contact-form .form-field select")
    .forEach(field => {
      field.addEventListener("focus", () => {
        field.closest(".form-field")?.classList.add("field-focused");
      });

      field.addEventListener("blur", () => {
        field.closest(".form-field")?.classList.remove("field-focused");
      });
    });
});
