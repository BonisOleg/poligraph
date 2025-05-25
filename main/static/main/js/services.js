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