// animations.js
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os elementos que podem animar
    const animated = document.querySelectorAll(
        ".fade-in, .slide-up, .slide-left, .slide-right, .scale-in"
    );

    // Observer para revelar ao entrar na viewport
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add("visible");
                io.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    animated.forEach((el) => io.observe(el));

    // Stagger automático: aplica delay incremental em filhos de contêiner com data-anim-stagger
    document.querySelectorAll("[data-anim-stagger]").forEach((group) => {
        const children = group.querySelectorAll(
            ".fade-in, .slide-up, .slide-left, .slide-right, .scale-in, > *"
        );
        children.forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i * 80, 600)}ms`;
        });
    });
});
