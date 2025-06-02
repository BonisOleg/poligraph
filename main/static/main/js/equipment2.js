// Equipment page JavaScript - Part 2

document.addEventListener('DOMContentLoaded', function () {

    // Додаткові анімації та покращення UX
    function setupAdvancedAnimations() {
        // Smooth scroll для внутрішніх посилань
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

        // Анімація появи елементів
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Застосування observer до елементів
        document.querySelectorAll('.spec-item, .equipment-card, .advantage-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    }

    // Оптимізація продуктивності
    function optimizePerformance() {
        // Відкладене завантаження зображень
        const lazyImages = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // Throttling для scroll events
        let scrollThrottle = false;

        window.addEventListener('scroll', () => {
            if (!scrollThrottle) {
                requestAnimationFrame(() => {
                    // Scroll handling логіка тут
                    scrollThrottle = false;
                });
                scrollThrottle = true;
            }
        });
    }

    // Адаптивність та мобільні покращення
    function enhanceMobileExperience() {
        // Покращена взаємодія для тач-пристроїв
        const touchElements = document.querySelectorAll('.equipment-card, .certificate-item, .advantage-item');

        touchElements.forEach(element => {
            element.addEventListener('touchstart', function () {
                this.style.transition = 'transform 0.1s ease';
                this.style.transform = 'scale(0.98)';
            });

            element.addEventListener('touchend', function () {
                this.style.transition = 'transform 0.3s ease';
                this.style.transform = 'scale(1)';
            });
        });

        // Оптимізація таблиці для мобільних
        const comparisonTable = document.querySelector('.comparison-table');
        if (comparisonTable && window.innerWidth < 768) {
            comparisonTable.style.fontSize = '0.9rem';
            comparisonTable.style.overflow = 'auto';
        }
    }

    // Accessibility покращення
    function improveAccessibility() {
        // Додавання ARIA labels
        const interactiveElements = document.querySelectorAll('.equipment-card, .certificate-item');

        interactiveElements.forEach((element, index) => {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            element.setAttribute('aria-label', `Інтерактивний елемент ${index + 1}`);
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            const focusedElement = document.activeElement;

            if (e.key === 'Enter' || e.key === ' ') {
                if (focusedElement.classList.contains('equipment-card') ||
                    focusedElement.classList.contains('certificate-item')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });
    }

    // Ініціалізація всіх функцій
    setupAdvancedAnimations();
    optimizePerformance();
    enhanceMobileExperience();
    improveAccessibility();

    // Responsive design adjustments
    function handleResize() {
        const screenWidth = window.innerWidth;
        const heroSection = document.querySelector('.equipment-hero');

        if (screenWidth < 768) {
            if (heroSection) {
                heroSection.style.minHeight = '60vh';
            }
        } else {
            if (heroSection) {
                heroSection.style.minHeight = '80vh';
            }
        }
    }

    // Event listeners
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

}); 