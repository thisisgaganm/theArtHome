
const renderSharedHeader = () => {
    const mount = document.getElementById('site-header');

    if (!mount) return null;

    const currentPage =
        window.location.pathname.split('/').pop()?.toLowerCase() ||
        'index.html';
    const activePage = [
        'design-gallery.html',
        'execution-gallery.html'
    ].includes(currentPage)
        ? 'gallery.html'
        : currentPage;

    const links = [
        { href: 'index.html', label: 'Home' },
        { href: 'services.html', label: 'Services' },
        { href: 'about.html', label: 'About Us' },
        { href: 'gallery.html', label: 'Gallery' },
        { href: 'contact.html', label: 'Contact' }
    ].map(({ href, label }) => {
        const current = href === activePage;

        return `
            <a href="${href}"${current ? ' class="active" aria-current="page"' : ''}>
                ${label}
            </a>
        `;
    }).join('');

    mount.innerHTML = `
        <header class="site-header" aria-label="Site header">
            <a class="brand" href="index.html" aria-label="The Art Home Interiors home">
                <img
                    src="assets/images/logo.png"
                    alt="The Art Home Interiors"
                    width="424"
                    height="589"
                    fetchpriority="high"
                >
            </a>

            <button
                class="menu-toggle"
                type="button"
                aria-label="Open navigation"
                aria-expanded="false"
                aria-controls="primary-navigation"
            >
                <span></span>
                <span></span>
            </button>

            <div class="header-menu">
                <nav class="main-nav" id="primary-navigation" aria-label="Main navigation">
                    <div class="nav-links">${links}</div>
                </nav>
                <a class="header-cta" href="contact.html">
                    Let's Talk <span aria-hidden="true">↗</span>
                </a>
            </div>
        </header>
    `;

    const header = mount.querySelector('.site-header');
    const menuButton = header.querySelector('.menu-toggle');
    const menu = header.querySelector('.header-menu');

    const setMenuOpen = (open, restoreFocus = false) => {
        header.classList.toggle('menu-open', open);
        menu.classList.toggle('open', open);
        document.body.classList.toggle('nav-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute(
            'aria-label',
            open ? 'Close navigation' : 'Open navigation'
        );

        if (restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
        setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    header.addEventListener('click', event => {
        if (
            event.target instanceof Element &&
            event.target.closest('a[href]')
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('click', event => {
        if (
            header.classList.contains('menu-open') &&
            !header.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && header.classList.contains('menu-open')) {
            setMenuOpen(false, true);
        }
    });

    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 1025px)').matches) {
            setMenuOpen(false);
        }
    }, { passive: true });

    return header;
};

const header = renderSharedHeader();

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================
       1. SCROLL HEADER EFFECT
    ===================================== */

    const updateHeader = () => {
        header?.classList.toggle(
            'is-scrolled',
            window.scrollY > 24
        );
    };

    updateHeader();

    window.addEventListener(
        'scroll',
        updateHeader,
        { passive: true }
    );


    /* =====================================
       2. STAGGERED REVEAL ANIMATION
    ===================================== */

    document.querySelectorAll('.reveal').forEach((el, index) => {

        el.style.setProperty(
            '--reveal-delay',
            `${Math.min(index % 4, 3) * 85}ms`
        );

    });


    /* =====================================
       3. PAGE LOADER
    ===================================== */

    const loader = document.querySelector('.page-loader');

    window.addEventListener('load', () => {

        setTimeout(() => {
            loader?.classList.add('is-hidden');
        }, 250);

    });

    setTimeout(() => {
        loader?.classList.add('is-hidden');
    }, 1800);


    /* =====================================
       4. SCROLL REVEAL OBSERVER
    ===================================== */

    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }


    /* =====================================
       5. AUTOMATIC LOCAL IMAGE LOADING
    ===================================== */

    document.querySelectorAll('[data-image]').forEach(el => {

        const filename = el.dataset.image;

        const image = new Image();

        image.onload = () => {

            el.style.backgroundImage =
                `url("assets/images/${filename}")`;

            el.dataset.loaded = 'true';

        };

        image.onerror = () => {
            console.warn(`Image not found: ${filename}`);
        };

        image.src = `assets/images/${filename}`;

    });


    /* =====================================
       6. SHARED FOOTER
    ===================================== */

    const footer = document.getElementById('site-footer');

    if (footer) {

        footer.innerHTML = `

            <footer class="site-footer" aria-label="Site footer">
                <div class="footer-inner">
                    <div class="footer-top">
                        <section class="footer-brand" aria-label="The Art Home Interiors">
                            <a class="footer-brand-link" href="index.html" aria-label="The Art Home Interiors home">
                                <img
                                    class="footer-logo"
                                    src="assets/images/logo.png"
                                    alt="The Art Home Interiors"
                                    width="660"
                                    height="916"
                                    loading="lazy"
                                    decoding="async"
                                >
                            </a>
                            <p class="footer-description">Thoughtful interiors for the way you live.</p>
                            <p class="footer-tagline">Designed with intention.</p>
                        </section>

                        <nav class="footer-col" aria-labelledby="footer-links-heading">
                            <h2 class="footer-heading" id="footer-links-heading">Quick links</h2>
                            <ul class="footer-link-list">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="gallery.html">Gallery</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>

                        <section class="footer-col footer-contact" aria-labelledby="footer-contact-heading">
                            <h2 class="footer-heading" id="footer-contact-heading">Get in touch</h2>
                            <address class="footer-contact-details">
                                <p>
                                    <span class="footer-detail-label">Email</span>
                                    <a href="mailto:hello@thearthomeinteriors.com">hello@thearthomeinteriors.com</a>
                                </p>
                            </address>
                        </section>
                    </div>

                    <div class="footer-bottom">
                        <p>© ${new Date().getFullYear()} THE ART HOME INTERIORS. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

        `;

    }


    /* =====================================
       7. CONTACT FORM
    ===================================== */

    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', event => {

        event.preventDefault();

        const data = new FormData(form);

        const getValue = name => {
            const value = data.get(name);

            return typeof value === 'string' && value.trim()
                ? value.trim()
                : 'Not provided';
        };

        const subject = encodeURIComponent(
            'Website enquiry — The Art Home Interiors'
        );

        const body = encodeURIComponent([
            `Name: ${getValue('name')}`,
            `Phone: ${getValue('phone')}`,
            `Email: ${getValue('email')}`,
            `Service: ${getValue('projectType')}`,
            `Project location: ${getValue('location')}`,
            `Referral: ${getValue('referral')}`,
            '',
            'Project details:',
            getValue('message')
        ].join('\n'));

        const recipient = 'hello@thearthomeinteriors.com';

        const note = form.querySelector('.form-note');

        if (note) {
            note.textContent =
                'Your email app should open with your enquiry. Sending the email is a separate step.';
        }

        window.location.href =
            `mailto:${recipient}?subject=${subject}&body=${body}`;

    });

});
