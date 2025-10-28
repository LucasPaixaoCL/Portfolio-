// animations.js
document.addEventListener("DOMContentLoaded", () => {
    // Elementos que podem animar
    const animated = document.querySelectorAll(
        ".fade-in, .slide-up, .slide-left, .slide-right, .scale-in"
    );

    // Observer: adiciona .visible quando entra na viewport
    const io = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add("visible");
                    io.unobserve(el);
                }
            }
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    animated.forEach((el) => io.observe(el));

    // Stagger automático nos filhos de containers com data-anim-stagger
    document.querySelectorAll("[data-anim-stagger]").forEach((group) => {
        // 1) filhos que já têm classes de animação
        const animatedChildren = group.querySelectorAll(
            ".fade-in, .slide-up, .slide-left, .slide-right, .scale-in"
        );

        // 2) filhos diretos do container
        let directChildren;
        try {
            // :scope é o seletor correto para filhos diretos via querySelectorAll
            directChildren = group.querySelectorAll(":scope > *");
        } catch {
            // Fallback para navegadores sem :scope
            directChildren = group.children; // HTMLCollection
        }

        // Unir sem duplicar
        const set = new Set();
        animatedChildren.forEach((el) => set.add(el));
        Array.from(directChildren).forEach((el) => set.add(el));

        // Aplicar delays
        let i = 0;
        set.forEach((el) => {
            el.style.transitionDelay = `${Math.min(i * 80, 600)}ms`;
            i++;
        });
    });
});
