document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-up, .slide-left, .slide-right, .scale-in"
    ); 


    const observer = new IntersectionObserver(
        (entries) => { 
            entries.forEach((entry) => { 
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible"); 
                    observer.unobserve(entry.target);
                } 
            });
        }, 
        {   threshold: 0.1,
            rootMargin: "0px 0px -50px 0px", 
        }
    );
        animatedElements.forEach((el) => observer.observe(el));
    });