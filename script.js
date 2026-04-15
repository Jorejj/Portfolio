document.addEventListener("DOMContentLoaded", () => {
    
    //Typed Effect for Professional Summary
    const typedTextSpan = document.getElementById("typed-text");
    const textArray = ["Computer Science student at the University of Caloocan City.", "Full-stack web application developer.", "Mobile app and interactive browser game creator."];
    const typingDelay = 50;
    const erasingDelay = 30;
    const newTextDelay = 2000; 
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }
    
    setTimeout(type, 1000);

    //Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll(".magnetic-btn");
    
    magneticBtns.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move button slightly towards cursor
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            // Reset position on mouse leave
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    //Scroll Reveal using Intersection Observer
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    //HTML5 Canvas Hero - Geometric Chess Web / Particle System
    const canvas = document.getElementById("heroCanvas");
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCanvas();
    });

    class Particle {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = "rgba(0, 112, 243, 0.5)"; // Electric blue particles
            ctx.fill();
        }

        update() {
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;


            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesArray = [];
        
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let dx = (Math.random() - 0.5) * 1;
            let dy = (Math.random() - 0.5) * 1;
            particlesArray.push(new Particle(x, y, dx, dy, size));
        }
    }

    function animateCanvas() {
        requestAnimationFrame(animateCanvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                //Network web connections
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
            
            //Connect to mouse pointer
            if (mouse.x != null && mouse.y != null) {
                let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x)) +
                                    ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
                if (mouseDistance < mouse.radius * mouse.radius) {
                    ctx.strokeStyle = `rgba(0, 112, 243, 0.4)`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    initCanvas();
    animateCanvas();
});