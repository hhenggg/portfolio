gsap.registerPlugin(TextPlugin);

/**
 * Boot sequence timeline animation.
 * Animates terminal window in, boot lines, whoami typing, name reveal, and nav.
 */
function createBootTimeline(refs, onComplete) {
    const tl = gsap.timeline({ onComplete });

    // Initial state - everything hidden
    gsap.set([refs.header, refs.nav, refs.content, refs.footer], {
        opacity: 0,
    });

    // Terminal window scales in
    tl.fromTo(refs.terminal,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // Title bar dots animate
    tl.fromTo(".traffic-light",
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" },
        "-=0.2"
    );

    // Boot text lines
    if (refs.bootLines) {
        tl.to(refs.bootLines, { opacity: 1, duration: 0.1 });

        const lines = refs.bootLines.querySelectorAll('.boot-line');
        tl.fromTo(lines,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.08, stagger: 0.12, ease: "none" },
            "+=0.2"
        );

        // Fade out boot lines
        tl.to(refs.bootLines, { opacity: 0, height: 0, duration: 0.4, ease: "power2.in" }, "+=0.5");
    }

    // Typing animation for whoami
    tl.to(refs.header, { opacity: 1, duration: 0.1 });
    tl.fromTo(refs.whoami,
        { text: "" },
        { text: "$ whoami", duration: 0.8, ease: "none" },
        "+=0.1"
    );

    // Cursor blink
    tl.to(refs.cursor, { opacity: 1, duration: 0.1 });

    // Name glitch in
    tl.fromTo(refs.name,
        { opacity: 0, y: 20, skewX: -10 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.5, ease: "power3.out" },
        "+=0.3"
    );

    // Name glow pulse
    tl.fromTo(refs.name,
        { textShadow: "0 0 0px rgba(74, 222, 128, 0)" },
        { textShadow: "0 0 20px rgba(74, 222, 128, 0.6), 0 0 40px rgba(74, 222, 128, 0.3)", duration: 0.6, ease: "power2.out" }
    );
    tl.to(refs.name,
        { textShadow: "0 0 10px rgba(74, 222, 128, 0.3)", duration: 0.4 }
    );

    // Subtitle fade in
    tl.fromTo(refs.subtitle,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
    );

    // Contact links stagger in
    tl.fromTo(".contact-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.15, ease: "power2.out" },
        "-=0.1"
    );

    // Nav buttons slide in
    tl.to(refs.nav, { opacity: 1, duration: 0.1 });
    tl.fromTo(".nav-btn",
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)" },
        "-=0.1"
    );

    // Content area
    tl.to(refs.content, { opacity: 1, duration: 0.3 });

    // Footer
    tl.fromTo(refs.footer,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
    );

    return tl;
}

/**
 * Section transition animation.
 * Animates content cards, skill tags, project bullets, and tech tags.
 */
function createSectionTransition(contentEl) {
    return gsap.context(() => {
        const tl = gsap.timeline();

        // Command line
        tl.fromTo(".section-cmd",
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );

        // Content cards stagger
        tl.fromTo(".content-card",
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" },
            "-=0.2"
        );

        // Skill tags pop in
        tl.fromTo(".skill-tag",
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)" },
            "-=0.3"
        );

        // Project bullets slide in
        tl.fromTo(".project-bullet",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" },
            "-=0.2"
        );

        // Tech tags
        tl.fromTo(".tech-tag",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" },
            "-=0.3"
        );
    }, contentEl);
}

/**
 * Nav button hover animation.
 */
function animateNavHover(element, isEnter) {
    gsap.to(element, {
        scale: isEnter ? 1.05 : 1,
        duration: 0.2,
        ease: "power2.out"
    });
}
