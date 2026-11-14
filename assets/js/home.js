
document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       1. SHRINKING HEADER
    ================================= */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        const currentScroll = window.scrollY;

        if (currentScroll > 70) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =================================
       2. SUBTLE IMAGE PARALLAX
    ================================= */

    const heroImage = document.querySelector(
        ".hero-background img"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (heroImage && !reducedMotion) {

        let ticking = false;

        window.addEventListener("scroll", () => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {

                const scroll = window.scrollY;

                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `translateY(${scroll * 0.12}px) scale(1)`;

                }

                ticking = false;

            });

        }, { passive: true });

    }


});
