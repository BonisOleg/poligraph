// Equipment page JavaScript - Part 1

document.addEventListener('DOMContentLoaded', function () {

    // Анімація характеристик поліграфа
    function animateSpecifications() {
        const specItems = document.querySelectorAll('.spec-item');

        specItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }

    // Симуляція роботи поліграфа
    function setupPolygraphSimulation() {
        const simulation = document.querySelector('.polygraph-simulation');
        if (!simulation) return;

        // Генерування динамічної SVG хвилі
        function generateWavePath(width, height, frequency = 0.02, amplitude = 30) {
            const time = Date.now() * 0.005;
            let path = `M 0 ${height / 2}`;

            for (let x = 0; x <= width; x += 5) {
                const y = height / 2 + Math.sin(x * frequency + time) * amplitude * (0.5 + 0.5 * Math.sin(x * 0.01 + time * 0.5));
                path += ` L ${x} ${y}`;
            }

            return path;
        }

        // Оновлення SVG хвилі
        function updateWave() {
            const waveElement = document.querySelector('.wave-path');
            if (waveElement) {
                const svg = waveElement.closest('svg');
                const width = svg.clientWidth;
                const height = svg.clientHeight;
                waveElement.setAttribute('d', generateWavePath(width, height));
            }
        }

        // Анімація даних вимірювання
        function animateMeasurementData() {
            const dataValues = document.querySelectorAll('.data-value');

            dataValues.forEach(value => {
                const originalText = value.textContent;

                if (originalText.includes('BPM')) {
                    const baseValue = 72;
                    const variation = Math.floor(Math.random() * 20) - 10;
                    value.textContent = `${baseValue + variation} BPM`;
                } else if (originalText.includes('GSR')) {
                    const baseValue = 2.3;
                    const variation = (Math.random() * 0.8) - 0.4;
                    value.textContent = `${(baseValue + variation).toFixed(1)} GSR`;
                } else if (originalText.includes('%')) {
                    const baseValue = 94;
                    const variation = Math.floor(Math.random() * 8) - 4;
                    value.textContent = `${baseValue + variation}%`;
                }
            });
        }

        // Запуск анімацій
        setInterval(updateWave, 100);
        setInterval(animateMeasurementData, 3000);

        // Ініціальне оновлення
        updateWave();
    }

    // Інтерактивність порівняльної таблиці
    function setupComparisonTable() {
        const tableRows = document.querySelectorAll('.table-row');

        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.01)';
                this.style.zIndex = '10';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });

            row.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Анімація лічильників характеристик
    function animateSpecCounters() {
        const counters = document.querySelectorAll('.spec-value');

        counters.forEach(counter => {
            const finalValue = counter.textContent;
            const isPercentage = finalValue.includes('%');
            const isDecimal = finalValue.includes('.');
            const hasChannel = finalValue.includes('+');

            if (!isNaN(parseFloat(finalValue))) {
                const numericValue = parseFloat(finalValue);
                let currentValue = 0;
                const increment = numericValue / 50;

                const timer = setInterval(() => {
                    currentValue += increment;

                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }

                    let displayValue;
                    if (isDecimal) {
                        displayValue = currentValue.toFixed(1);
                    } else {
                        displayValue = Math.floor(currentValue);
                    }

                    if (isPercentage) {
                        displayValue += '%';
                    } else if (hasChannel) {
                        displayValue += '+';
                    }

                    counter.textContent = displayValue;
                }, 30);
            }
        });
    }

    // Intersection Observer для анімації лічильників
    const specsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSpecCounters();
                specsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const specsSection = document.querySelector('.specifications');
    if (specsSection) {
        specsObserver.observe(specsSection);
    }

    // Parallax ефект для hero секції
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.equipment-hero');
        const deviceImage = document.querySelector('.device-image');

        if (heroSection) {
            const parallax = scrolled * 0.1;
            heroSection.style.transform = `translateY(${parallax}px)`;
        }

        if (deviceImage) {
            const imageParallax = scrolled * 0.05;
            deviceImage.style.transform = `translateY(${imageParallax}px) scale(1.02)`;
        }
    }

    // Hover ефекти для карток обладнання
    function setupEquipmentCardEffects() {
        const equipmentCards = document.querySelectorAll('.equipment-card');

        equipmentCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                const icon = this.querySelector('.equipment-icon');
                if (icon) {
                    icon.style.animation = 'bounce 0.6s ease';
                    icon.style.background = 'linear-gradient(135deg, var(--purple), var(--purple-dark))';
                }
            });

            card.addEventListener('mouseleave', function () {
                const icon = this.querySelector('.equipment-icon');
                if (icon) {
                    icon.style.animation = 'bounce 3s infinite';
                    icon.style.background = 'var(--purple)';
                }
            });
        });
    }

    // Анімація переваг при скролінгу
    function setupAdvantageAnimations() {
        const advantageItems = document.querySelectorAll('.advantage-item');

        const advantageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3
        });

        advantageItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            advantageObserver.observe(item);
        });
    }

    // Інтерактивність сертифікатів (БЕЗ модального вікна)
    function setupCertificateInteractions() {
        const certificateItems = document.querySelectorAll('.certificate-item');

        certificateItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(188, 169, 224, 0.4)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Оптимізація анімацій для мобільних пристроїв
    function optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Відключаємо складні анімації на мобільних
            const complexAnimations = document.querySelectorAll('[style*="animation"]');
            complexAnimations.forEach(element => {
                if (element.style.animationDuration && parseFloat(element.style.animationDuration) > 1) {
                    element.style.animationDuration = '1s';
                }
            });
        }
    }

    // Touch improvements для мобільних пристроїв
    if ('ontouchstart' in window) {
        const interactiveElements = document.querySelectorAll('.spec-item, .equipment-card, .advantage-item');

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function () {
                this.style.transform += ' scale(0.98)';
            });

            element.addEventListener('touchend', function () {
                this.style.transform = this.style.transform.replace(' scale(0.98)', '');
            });
        });
    }

    // Performance optimization
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // Ініціалізація всіх функцій
    try {
        animateSpecifications();
        setupPolygraphSimulation();
        setupComparisonTable();
        setupEquipmentCardEffects();
        setupAdvantageAnimations();
        setupCertificateInteractions();
        optimizeForMobile();
    } catch (error) {
        console.warn('Some animations failed to initialize:', error);
    }

    // Keyboard navigation покращення
    function enhanceAccessibility() {
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

    enhanceAccessibility();

    // Responsive table для мобільних пристроїв
    function makeTableResponsive() {
        const table = document.querySelector('.comparison-table');
        if (!table || window.innerWidth > 768) return;

        const headers = table.querySelectorAll('.header-item');
        const rows = table.querySelectorAll('.table-row');

        rows.forEach(row => {
            const items = row.querySelectorAll('.row-item');
            items.forEach((item, index) => {
                if (index > 0 && headers[index]) {
                    const header = headers[index].textContent;
                    item.setAttribute('data-label', header);
                }
            });
        });
    }

    window.addEventListener('resize', makeTableResponsive);
    makeTableResponsive();
}); 