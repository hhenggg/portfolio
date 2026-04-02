gsap.registerPlugin(ScrollTrigger);

/* ─── Reduced Motion Check ──────────────────────────────────────────── */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(100);
}

/* ─── Smooth Scroll (Lenis-lite via GSAP) ───────────────────────────── */

// Sync ScrollTrigger with native scroll
ScrollTrigger.defaults({
    toggleActions: 'play none none none',
});

/* ─── Nav Scroll Effect ─────────────────────────────────────────────── */

function initNavScroll() {
    const nav = document.querySelector('.nav-fixed');
    if (!nav) return;

    ScrollTrigger.create({
        start: 80,
        onUpdate: (self) => {
            nav.classList.toggle('scrolled', self.scroll() > 80);
        }
    });

    // Active link tracking
    const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveNav(id),
            onEnterBack: () => setActiveNav(id),
        });
    });
}

function setActiveNav(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
    });
}

/* ─── Hero Animations ───────────────────────────────────────────────── */

function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.hero-greeting',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );

    tl.fromTo('.hero-name .line',
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
    );

    tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
    );

    tl.fromTo('.hero-link',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
    );

    tl.fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.1'
    );

    // Parallax on hero text as user scrolls down
    if (!prefersReducedMotion) {
        gsap.to('.hero-content', {
            y: -80,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
            }
        });
    }
}

/* ─── Scroll Reveal ─────────────────────────────────────────────────── */

function initScrollReveals() {
    // Generic reveal up
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                }
            }
        );
    });

    // Reveal from left
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                }
            }
        );
    });

    // Reveal with scale
    gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1, scale: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                }
            }
        );
    });
}

/* ─── Staggered Children ────────────────────────────────────────────── */

function initStaggerReveals() {
    // Skill cards
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        gsap.fromTo(skillsGrid.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: skillsGrid,
                    start: 'top 80%',
                    once: true,
                }
            }
        );
    }

    // Project cards
    gsap.utils.toArray('.project-card').forEach(card => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                once: true,
            }
        });

        tl.fromTo(card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        tl.fromTo(card.querySelectorAll('.tech-tag'),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(1.5)' },
            '-=0.3'
        );

        tl.fromTo(card.querySelectorAll('.project-bullet'),
            { opacity: 0, x: -12 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
            '-=0.2'
        );
    });

    // Education items
    gsap.utils.toArray('.edu-item').forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, x: -20 },
            {
                opacity: 1, x: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    once: true,
                },
                delay: i * 0.1
            }
        );
    });

    // Footer
    const footerCta = document.querySelector('.footer-cta');
    if (footerCta) {
        gsap.fromTo(footerCta,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: footerCta,
                    start: 'top 85%',
                    once: true,
                }
            }
        );
    }
}

/* ─── Smooth scroll for nav links ───────────────────────────────────── */

function initSmoothNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.section);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ─── Init All ──────────────────────────────────────────────────────── */

function initAnimations() {
    initNavScroll();
    initHeroAnimations();
    initScrollReveals();
    initStaggerReveals();
    initSmoothNav();
}
