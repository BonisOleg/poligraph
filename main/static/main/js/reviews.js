// Reviews page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Анімація лічильників статистики
    function animateStatsCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const finalValue = parseFloat(stat.textContent);
            const isDecimal = stat.textContent.includes('.');
            const hasPercent = stat.textContent.includes('%');
            const hasPlus = stat.textContent.includes('+');
            const hasSlash = stat.textContent.includes('/');

            let currentValue = 0;
            let increment;

            if (hasSlash) {
                // Для рейтингу типу "4.9"
                increment = finalValue / 50;
            } else if (hasPercent || hasPlus) {
                increment = finalValue / 60;
            } else {
                increment = finalValue / 40;
            }

            const timer = setInterval(() => {
                currentValue += increment;

                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }

                let displayValue;
                if (isDecimal) {
                    displayValue = currentValue.toFixed(1);
                } else {
                    displayValue = Math.floor(currentValue);
                }

                if (hasPercent) {
                    displayValue += '%';
                } else if (hasPlus) {
                    displayValue += '+';
                } else if (hasSlash) {
                    // Для "24/7" відображаємо як є
                    if (stat.textContent === '24/7') {
                        displayValue = '24/7';
                    }
                }

                stat.textContent = displayValue;
            }, 30);
        });
    }

    // Intersection Observer для лічильників
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const statsSection = document.querySelector('.reviews-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Анімація появи відгуків
    function animateReviewCards() {
        const cards = document.querySelectorAll('.review-card');

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Інтерактивність рейтингу у формі
    function setupRatingInteraction() {
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        const starLabels = document.querySelectorAll('.star-label');

        starLabels.forEach((label, index) => {
            label.addEventListener('mouseenter', function () {
                // Підсвічуємо зірки до поточної
                starLabels.forEach((otherLabel, otherIndex) => {
                    if (otherIndex >= index) {
                        otherLabel.style.color = '#ffd700';
                        otherLabel.style.transform = 'scale(1.1)';
                    } else {
                        otherLabel.style.color = 'var(--gray-light)';
                        otherLabel.style.transform = 'scale(1)';
                    }
                });
            });

            label.addEventListener('click', function () {
                // Встановлюємо рейтинг
                const ratingValue = 5 - index; // Зірки йдуть у зворотному порядку
                ratingInputs[index].checked = true;

                // Оновлюємо візуальний стан
                updateRatingVisual(ratingValue);
            });
        });

        // При виході з області рейтингу повертаємо до вибраного стану
        const ratingContainer = document.querySelector('.rating-input');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', function () {
                const checkedInput = document.querySelector('input[name="rating"]:checked');
                if (checkedInput) {
                    const ratingValue = parseInt(checkedInput.value);
                    updateRatingVisual(ratingValue);
                } else {
                    resetRatingVisual();
                }
            });
        }

        function updateRatingVisual(rating) {
            starLabels.forEach((label, index) => {
                const starRating = 5 - index;
                if (starRating <= rating) {
                    label.style.color = '#ffd700';
                    label.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                } else {
                    label.style.color = 'var(--gray-light)';
                    label.style.textShadow = 'none';
                }
                label.style.transform = 'scale(1)';
            });
        }

        function resetRatingVisual() {
            starLabels.forEach(label => {
                label.style.color = 'var(--gray-light)';
                label.style.transform = 'scale(1)';
                label.style.textShadow = 'none';
            });
        }
    }

    // Валідація форми відгуку
    function validateReviewForm() {
        const form = document.getElementById('reviewForm');
        const nameInput = document.getElementById('reviewerName');
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        const reviewTextarea = document.getElementById('reviewText');
        const privacyCheckbox = document.getElementById('reviewPrivacy');

        let isValid = true;

        // Валідація імені
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            showFieldError(nameInput, 'Ім\'я повинно містити мінімум 2 символи');
            isValid = false;
        } else {
            clearFieldError(nameInput);
        }

        // Валідація рейтингу
        const isRatingSelected = Array.from(ratingInputs).some(input => input.checked);
        if (!isRatingSelected) {
            showRatingError('Оберіть рейтинг');
            isValid = false;
        } else {
            clearRatingError();
        }

        // Валідація тексту відгуку
        if (!reviewTextarea.value.trim() || reviewTextarea.value.trim().length < 10) {
            showFieldError(reviewTextarea, 'Відгук повинен містити мінімум 10 символів');
            isValid = false;
        } else {
            clearFieldError(reviewTextarea);
        }

        // Валідація згоди
        if (!privacyCheckbox.checked) {
            alert('Необхідно дати згоду на публікацію відгуку');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        field.style.borderColor = '#ff6b6b';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.25rem';

        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.style.borderColor = 'var(--gray-light)';
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function showRatingError(message) {
        clearRatingError();
        const ratingContainer = document.querySelector('.rating-input');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'rating-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.25rem';

        ratingContainer.parentNode.appendChild(errorDiv);
    }

    function clearRatingError() {
        const existingError = document.querySelector('.rating-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Відправка форми відгуку
    function setupReviewFormSubmission() {
        const form = document.getElementById('reviewForm');
        const submitButton = form.querySelector('.form-submit');
        const submitText = submitButton.querySelector('.submit-text');
        const submitLoader = submitButton.querySelector('.submit-loader');
        const messageDiv = document.getElementById('reviewMessage');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!validateReviewForm()) {
                return;
            }

            // Показуємо лоадер
            submitText.textContent = 'Публікуємо...';
            submitLoader.style.display = 'inline-block';
            submitButton.disabled = true;

            try {
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    service: formData.get('service'),
                    rating: formData.get('rating'),
                    review: formData.get('review')
                };

                // Симуляція відправки (замінити на реальний API)
                await new Promise(resolve => setTimeout(resolve, 2000));

                showSuccessMessage('Дякуємо за відгук! Він буде опублікований після модерації.');
                form.reset();
                resetRatingVisual();

            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Помилка публікації відгуку. Спробуйте ще раз пізніше.');
            } finally {
                // Приховуємо лоадер
                submitText.textContent = 'Опублікувати відгук';
                submitLoader.style.display = 'none';
                submitButton.disabled = false;
            }
        });

        function showSuccessMessage(message) {
            messageDiv.innerHTML = `
                <div style="background: #DFF5E3; color: #22543D; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
                    ✅ ${message}
                </div>
            `;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 6000);
        }

        function showErrorMessage(message) {
            messageDiv.innerHTML = `
                <div style="background: #FDEDED; color: #911E1E; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
                    ❌ ${message}
                </div>
            `;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        }

        function resetRatingVisual() {
            const starLabels = document.querySelectorAll('.star-label');
            starLabels.forEach(label => {
                label.style.color = 'var(--gray-light)';
                label.style.transform = 'scale(1)';
                label.style.textShadow = 'none';
            });
        }
    }

    // Parallax ефект для hero секції
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.reviews-hero');

        if (heroSection) {
            const parallax = scrolled * 0.1;
            heroSection.style.transform = `translateY(${parallax}px)`;
        }
    }

    // Додавання hover ефектів до карток відгуків
    function setupReviewCardEffects() {
        const reviewCards = document.querySelectorAll('.review-card');

        reviewCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                const stars = this.querySelectorAll('.star.filled');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.animation = 'starGlow 0.3s ease';
                    }, index * 50);
                });
            });

            card.addEventListener('mouseleave', function () {
                const stars = this.querySelectorAll('.star.filled');
                stars.forEach(star => {
                    star.style.animation = '';
                });
            });
        });
    }

    // Анімація довірчих значків
    function animateTrustBadges() {
        const trustItems = document.querySelectorAll('.trust-item');

        trustItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }

    // Lazy loading для покращення продуктивності
    function setupLazyAnimations() {
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

    // Touch improvements для мобільних пристроїв
    if ('ontouchstart' in window) {
        const interactiveElements = document.querySelectorAll('.review-card, .stat-card, .trust-item');

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
        animateReviewCards();
        setupRatingInteraction();
        setupReviewFormSubmission();
        setupReviewCardEffects();
        animateTrustBadges();
        setupLazyAnimations();
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
});

// Додаткові CSS анімації
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes starGlow {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); text-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
        100% { transform: scale(1); }
    }
    
    .field-error, .rating-error {
        animation: fadeInUp 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .review-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .trust-item {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
`;
document.head.appendChild(additionalStyles);

// Відстеження завантаження
console.log('Reviews page JavaScript loaded successfully'); 