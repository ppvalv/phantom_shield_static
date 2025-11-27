// ===== PHANTOM SHIELD - CYBERPUNK EFFECTS =====

// === MATRIX RAIN EFFECT ===
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        this.fontSize = 14;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = [];

        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }

        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00f0ff';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// === PARTICLE SYSTEM ===
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }

    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = (Math.random() - 0.5) * 200;
        const endY = (Math.random() - 0.5) * 200;
        const delay = Math.random() * 3;
        const duration = 3 + Math.random() * 2;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.setProperty('--tx', endX + 'px');
        particle.style.setProperty('--ty', endY + 'px');
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';

        // Random color
        const colors = ['#00f0ff', '#ff00ff', '#00ff41', '#b400ff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove and recreate after animation
        setTimeout(() => {
            particle.remove();
            this.createParticle();
        }, (delay + duration) * 1000);
    }
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cyber-card, .phase-card, .service-card, .threat-card').forEach(el => {
        observer.observe(el);
    });
}

// === GLITCH TEXT EFFECT ===
function glitchText(element) {
    const text = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iterations = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
        element.textContent = text
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        iterations += 1 / 3;

        if (iterations >= maxIterations) {
            clearInterval(interval);
            element.textContent = text;
        }
    }, 30);
}

// === CURSOR GLOW EFFECT ===
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 240, 255, 0.6), transparent);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// === CARD HOVER 3D EFFECT ===
function init3DCardEffect() {
    document.querySelectorAll('.cyber-card, .level-card, .phase-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// === TYPING EFFECT ===
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// === RANDOM GLITCH TRIGGER ===
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');

    setInterval(() => {
        if (Math.random() > 0.7) {
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            if (randomElement) {
                randomElement.style.animation = 'none';
                setTimeout(() => {
                    randomElement.style.animation = '';
                }, 10);
            }
        }
    }, 3000);
}

// === NEON FLICKER ===
function neonFlicker(element) {
    const flicker = () => {
        element.style.opacity = Math.random() > 0.9 ? '0.5' : '1';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    };

    setInterval(flicker, 2000 + Math.random() * 3000);
}

// === INITIALIZE ALL EFFECTS ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix rain
    new MatrixRain();

    // Initialize particle system on hero sections
    const heroSections = document.querySelectorAll('.hero-section, .section-header');
    heroSections.forEach(section => {
        new ParticleSystem(section);
    });

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize cursor glow
    initCursorGlow();

    // Initialize 3D card effects
    init3DCardEffect();

    // Random glitch effects
    randomGlitch();

    // Neon flicker on specific elements
    document.querySelectorAll('.neon-text').forEach(el => {
        if (Math.random() > 0.7) {
            neonFlicker(el);
        }
    });

    // Glitch effect on hover for titles
    document.querySelectorAll('h1, h2').forEach(title => {
        title.addEventListener('mouseenter', () => {
            glitchText(title);
        });
    });
});

// === EXPORT FOR USE IN OTHER SCRIPTS ===
window.PhantomShield = {
    MatrixRain,
    ParticleSystem,
    glitchText,
    typeWriter,
    neonFlicker
};
