// About page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Анімація лічильників досягнень
    function animateCounters() {
        const achievements = document.querySelectorAll('.achievement-item');

        achievements.forEach(achievement => {
            const numberElement = achievement.querySelector('.achievement-number');
            const targetValue = parseInt(achievement.dataset.count);
            const isPercentage = numberElement.textContent.includes('%');
            const isPlus = numberElement.textContent.includes('+');

            let currentValue = 0;
            const increment = targetValue / 60; // 60 кроків анімації

            const timer = setInterval(() => {
                currentValue += increment;

                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(timer);
                }

                let displayValue = Math.floor(currentValue);
                if (isPercentage) {
                    displayValue += '%';
                } else if (isPlus) {
                    displayValue += '+';
                }

                numberElement.textContent = displayValue;
            }, 30);
        });
    }

    // Intersection Observer для лічильників
    const achievementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                achievementsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
        achievementsObserver.observe(achievementsSection);
    }

    // Анімація timeline елементів
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach((item, index) => {
            const content = item.querySelector('.timeline-content');
            const marker = item.querySelector('.timeline-marker');

            setTimeout(() => {
                marker.style.animation = 'scaleIn 0.5s ease forwards';
                content.style.animation = 'slideIn 0.6s ease forwards';
            }, index * 200);
        });
    }

    // Observer для timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const timeline = document.querySelector('.certifications-timeline');
    if (timeline) {
        timelineObserver.observe(timeline);
    }

    // Додавання paralax ефекту до hero секції
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroDecoration = document.querySelector('.about-hero::before');
        const imageDecoration = document.querySelector('.image-decoration');

        if (imageDecoration) {
            const parallax = scrolled * 0.1;
            imageDecoration.style.transform = `rotate(${parallax}deg)`;
        }
    }

    window.addEventListener('scroll', handleParallax);

    // Інтерактивність карток переваг
    const reasonCards = document.querySelectorAll('.reason-card');

    reasonCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.reason-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.reason-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Анімація появи step елементів
    function animateSteps() {
        const steps = document.querySelectorAll('.step-item');

        steps.forEach((step, index) => {
            const stepNumber = step.querySelector('.step-number');
            const stepContent = step.querySelector('.step-content');

            setTimeout(() => {
                stepNumber.style.animation = 'bounceIn 0.6s ease forwards';
                stepContent.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 150);
        });
    }

    // Observer для process steps
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSteps();
                stepsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    const processSection = document.querySelector('.work-process');
    if (processSection) {
        stepsObserver.observe(processSection);
    }

    // Додавання hover ефектів до принципів
    const principleItems = document.querySelectorAll('.principle-item');


    // Smooth scroll для CTA кнопок
    const ctaButtons = document.querySelectorAll('.cta-btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
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

    // Додавання dynamic gradient до hero секції
    function updateHeroGradient() {
        const hero = document.querySelector('.about-hero');
        const scrollPercent = window.pageYOffset / window.innerHeight;

        if (hero && scrollPercent < 1) {
            const opacity = Math.max(0.1, 1 - scrollPercent);
            hero.style.background = `linear-gradient(135deg, 
                rgba(245, 237, 228, ${opacity}), 
                rgba(255, 255, 255, ${opacity * 0.8}))`;
        }
    }

    window.addEventListener('scroll', updateHeroGradient);

    // Lazy loading optimization
    function setupLazyEffects() {
        const elements = document.querySelectorAll('[data-aos]');

        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '20px'
        });

        elements.forEach(el => {
            lazyObserver.observe(el);
        });
    }

    setupLazyEffects();

    // Touch improvements для мобільних пристроїв
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.achievement-item, .reason-card, .timeline-content');

        cards.forEach(card => {
            card.addEventListener('touchstart', function () {
                this.style.transform += ' scale(0.98)';
            });

            card.addEventListener('touchend', function () {
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
                updateHeroGradient();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // Intersection Observer polyfill fallback
    if (!window.IntersectionObserver) {
        // Fallback для старих браузерів
        setTimeout(() => {
            animateCounters();
            animateTimeline();
            animateSteps();
        }, 1000);
    }
});

// Додаткові CSS анімації
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes scaleIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        0% {
            transform: translateY(30px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        0% {
            transform: translateY(20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
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
`;
document.head.appendChild(additionalStyles); 