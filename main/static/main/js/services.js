// Services page JavaScript

document.addEventListener('DOMContentLoaded', function () {



    // Анімація статистики з лічильниками
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            const isPercentage = stat.textContent.includes('%');
            const isPlus = stat.textContent.includes('+');

            let currentValue = 0;
            const increment = finalValue / 50; // Розбиваємо на 50 кроків

            const timer = setInterval(() => {
                currentValue += increment;

                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }

                let displayValue = Math.floor(currentValue);
                if (isPercentage) {
                    displayValue += '%';
                } else if (isPlus) {
                    displayValue += '+';
                }

                stat.textContent = displayValue;
            }, 50);
        });
    }

    // Запускаємо анімацію статистики при скролі
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Parallax ефект для ECG анімації
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const ecgLine = document.querySelector('.ecg-line');

        if (ecgLine) {
            const parallax = scrolled * 0.2;
            ecgLine.style.transform = `translateY(-50%) translateX(${parallax}px)`;
        }
    }

    // Додаємо parallax ефект при скролі
    window.addEventListener('scroll', handleParallax);

    // Анімація появи карток послуг
    function animateServiceCards() {
        const cards = document.querySelectorAll('.service-card');

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Smooth hover effects для кнопок
    const buttons = document.querySelectorAll('.service-button, .contact-btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function (e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Анімація advantages при скролі
    const advantageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.advantage-item').forEach(item => {
        advantageObserver.observe(item);
    });

    // Floating анімація для іконок послуг
    function createFloatingAnimation() {
        const icons = document.querySelectorAll('.service-icon');

        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function () {
                this.style.animation = 'float 1s ease-in-out infinite';
            });

            icon.addEventListener('mouseleave', function () {
                this.style.animation = 'float 3s ease-in-out infinite';
            });
        });
    }

    createFloatingAnimation();

    // Тематичні кольори для різних послуг
    const serviceColors = [
        '#ff6b6b', // Перевірка зради - червоний
        '#4ecdc4', // Скринінг - м'ятний
        '#45b7d1', // Персонал - синій
        '#96ceb4', // Приватні питання - зелений
        '#ffa726', // Крадіжки - помаранчевий
        '#ab47bc'  // Матеріальні докази - фіолетовий
    ];

    // Додаємо тематичні кольори до карток
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const color = serviceColors[index % serviceColors.length];
        const icon = card.querySelector('.service-icon');
        const button = card.querySelector('.service-button');

        if (icon) {
            icon.style.filter = `drop-shadow(0 0 10px ${color}40)`;
        }

        if (button) {
            button.addEventListener('mouseenter', function () {
                this.style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;
            });

            button.addEventListener('mouseleave', function () {
                this.style.background = 'linear-gradient(135deg, var(--purple), var(--purple-dark))';
            });
        }
    });

    // Keyboard navigation покращення
    function enhanceKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', function () {
                this.style.outline = `3px solid ${getComputedStyle(document.documentElement).getPropertyValue('--purple')}`;
                this.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', function () {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }

    enhanceKeyboardNavigation();

    // Lazy loading для покращення продуктивності
    function setupLazyLoading() {
        const lazyElements = document.querySelectorAll('[data-aos]');

        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyElements.forEach(el => {
            lazyObserver.observe(el);
        });
    }

    setupLazyLoading();

    // Mobile touch improvements
    if ('ontouchstart' in window) {
        // Додаємо touch-friendly взаємодію для карток
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function () {
                this.style.transform = '';
            });
        });
    }

    // Performance optimization для анімацій
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        // Оптимізовані анімації тут
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);

    // Error handling for animations
    try {
        // Ініціалізуємо всі анімації
        animateServiceCards();
    } catch (error) {
        console.warn('Animation initialization failed:', error);
    }

    // Затримка для кращої продуктивності на мобільних
    setTimeout(() => {
        new ParallaxEffect();
        new IOSAnimations();
        new StatsAnimation();
        new InteractiveEffects();
    }, 100);
});

// CSS для ripple ефекту
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Паралакс ефект оптимізований для мобільних пристроїв, включаючи iPhone
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.parallax-logo');
        this.ticking = false;
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (this.elements.length > 0) {
            this.init();
        }
    }

    init() {
        // Використовуємо пасивні слухачі для кращої продуктивності на iOS
        const options = { passive: true };

        if (this.isMobile) {
            // Для мобільних пристроїв використовуємо touch події
            window.addEventListener('touchmove', this.handleScroll.bind(this), options);
            window.addEventListener('scroll', this.handleScroll.bind(this), options);
        } else {
            window.addEventListener('scroll', this.handleScroll.bind(this), options);
        }

        // Початкова анімація
        this.updateParallax();
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateParallax.bind(this));
            this.ticking = true;
        }
    }

    updateParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        this.elements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const rect = element.getBoundingClientRect();

            // Перевіряємо чи елемент видимий
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                // Розраховуємо зміщення з урахуванням швидкості
                const yPos = -(scrollTop * speed);

                // Для iPhone використовуємо translate3d для кращої продуктивності
                if (this.isMobile) {
                    element.style.transform = `translate3d(0, ${yPos}px, 0) ${element.style.transform.replace(/translate3d\([^)]*\)\s*/, '')}`;
                } else {
                    element.style.transform = `translateY(${yPos}px) ${element.style.transform.replace(/translateY\([^)]*\)\s*/, '')}`;
                }
            }
        });

        this.ticking = false;
    }
}

// Додаткові анімації для iOS Safari
class IOSAnimations {
    constructor() {
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (this.isIOS) {
            this.initIOSOptimizations();
        }
    }

    initIOSOptimizations() {
        // Покращуємо плавність прокрутки
        document.body.style.webkitOverflowScrolling = 'touch';

        // Додаємо Hardware Acceleration для паралакс елементів
        const parallaxElements = document.querySelectorAll('.parallax-logo');
        parallaxElements.forEach(element => {
            element.style.webkitTransform = 'translateZ(0)';
            element.style.webkitBackfaceVisibility = 'hidden';
            element.style.webkitPerspective = '1000px';
        });

        // Покращуємо анімації статистики для iOS
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.style.webkitTransform = 'translateZ(0)';
        });
    }
}

// Анімації статистики
class StatsAnimation {
    constructor() {
        this.statsElements = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;

        if (this.statsElements.length > 0) {
            this.init();
        }
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateStats();
                    this.hasAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });

        this.statsElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateStats() {
        this.statsElements.forEach((element, index) => {
            const finalValue = element.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));

            let currentValue = 0;
            const increment = numericValue / 60; // 60 кадрів анімації

            const animation = setInterval(() => {
                currentValue += increment;

                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(animation);
                }

                element.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '+');
            }, 1000 / 60); // 60 FPS
        });
    }
}

// Додаткові ефекти для кнопок та карток
class InteractiveEffects {
    constructor() {
        this.initButtonEffects();
        this.initCardHovers();
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.service-button, .contact-btn');

        buttons.forEach(button => {
            button.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });

            button.addEventListener('touchend', function () {
                this.style.transform = 'scale(1)';
            }, { passive: true });
        });
    }

    initCardHovers() {
        const cards = document.querySelectorAll('.service-card');

        cards.forEach(card => {
            card.addEventListener('touchstart', function () {
                this.style.transform = 'translateY(-2px)';
            }, { passive: true });

            card.addEventListener('touchend', function () {
                this.style.transform = 'translateY(0)';
            }, { passive: true });
        });
    }
}

// Експорт для можливого використання в інших файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParallaxEffect,
        IOSAnimations,
        StatsAnimation,
        InteractiveEffects
    };
} 