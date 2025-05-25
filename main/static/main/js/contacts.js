// Contacts page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // FAQ функціональність
    function setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', function () {
                const isActive = item.classList.contains('active');

                // Закриваємо всі інші FAQ
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Відкриваємо поточний, якщо він не був активним
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Валідація форми
    function validateForm() {
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const privacyCheckbox = document.getElementById('privacy');

        let isValid = true;

        // Валідація імені
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            showError('nameError', 'Ім\'я повинно містити мінімум 2 символи');
            isValid = false;
        } else {
            clearError('nameError');
        }

        // Валідація телефону
        const phoneRegex = /^(\+38)?[\s\-]?\(?0\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
            showError('phoneError', 'Введіть коректний номер телефону');
            isValid = false;
        } else {
            clearError('phoneError');
        }

        // Валідація згоди на обробку даних
        if (!privacyCheckbox.checked) {
            alert('Необхідно дати згоду на обробку персональних даних');
            isValid = false;
        }

        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = '#ff6b6b';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '0.25rem';
        }
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Відправка форми
    function setupFormSubmission() {
        const form = document.getElementById('contactForm');
        const submitButton = form.querySelector('.form-submit');
        const submitText = submitButton.querySelector('.submit-text');
        const submitLoader = submitButton.querySelector('.submit-loader');
        const messageDiv = document.getElementById('formMessage');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            // Показуємо лоадер
            submitText.textContent = 'Відправляємо...';
            submitLoader.style.display = 'inline-block';
            submitButton.disabled = true;

            try {
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    service: formData.get('service'),
                    message: formData.get('message')
                };

                const response = await fetch('/api/send-contact/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    showSuccessMessage('Дякуємо! Ваша заявка успішно відправлена. Ми зв\'яжемося з вами найближчим часом.');
                    form.reset();
                } else {
                    showErrorMessage('Помилка відправки. Спробуйте ще раз або зателефонуйте нам.');
                }

            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Помилка з\'єднання. Перевірте інтернет-з\'єднання та спробуйте ще раз.');
            } finally {
                // Приховуємо лоадер
                submitText.textContent = 'Відправити заявку';
                submitLoader.style.display = 'none';
                submitButton.disabled = false;
            }
        });

        function showSuccessMessage(message) {
            messageDiv.innerHTML = `
                <div style="background: #DFF5E3; color: #22543D; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    ✅ ${message}
                </div>
            `;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        }

        function showErrorMessage(message) {
            messageDiv.innerHTML = `
                <div style="background: #FDEDED; color: #911E1E; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    ❌ ${message}
                </div>
            `;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        }
    }

    // Форматування номера телефону
    function setupPhoneFormatting() {
        const phoneInput = document.getElementById('phone');

        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Видаляємо всі не-цифри

            if (value.startsWith('380')) {
                value = value.substring(3);
            } else if (value.startsWith('38')) {
                value = value.substring(2);
            }

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `+38 (0${value}`;
                } else if (value.length <= 6) {
                    value = `+38 (0${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 8) {
                    value = `+38 (0${value.substring(0, 2)}) ${value.substring(2, 5)}-${value.substring(5)}`;
                } else {
                    value = `+38 (0${value.substring(0, 2)}) ${value.substring(2, 5)}-${value.substring(5, 7)}-${value.substring(7, 9)}`;
                }
            }

            e.target.value = value;
        });

        phoneInput.addEventListener('keydown', function (e) {
            // Дозволяємо backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                // Дозволяємо Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Дозволяємо home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Перевіряємо, що це цифра
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }

    // Анімація появи елементів при скролі
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Спостерігаємо за контактними методами
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach(method => {
            method.style.opacity = '0';
            method.style.transform = 'translateY(30px)';
            method.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(method);
        });
    }

    // Копіювання контактних даних
    function setupCopyToClipboard() {
        const contactLinks = document.querySelectorAll('.contact-link');

        contactLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                // Якщо це телефон або email, дозволяємо копіювання
                if (this.href.startsWith('tel:') || this.href.startsWith('mailto:')) {
                    e.preventDefault();

                    const text = this.textContent;

                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(text).then(() => {
                            showCopyNotification('Скопійовано: ' + text);
                        });
                    } else {
                        // Fallback для старих браузерів
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showCopyNotification('Скопійовано: ' + text);
                    }

                    // Викликаємо дію (телефонування або email)
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 1000);
                }
            });
        });

        function showCopyNotification(text) {
            const notification = document.createElement('div');
            notification.textContent = text;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--purple);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 9999;
                animation: slideInRight 0.3s ease;
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        }
    }

    // Ініціалізація всіх функцій
    setupFAQ();
    setupFormSubmission();
    setupPhoneFormatting();
    setupScrollAnimations();
    setupCopyToClipboard();

    // Додаткові анімації
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-5px); }
            60% { transform: translateY(-3px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .form-error {
            display: block;
            margin-top: 0.25rem;
        }
    `;
    document.head.appendChild(style);
});

// Відстеження виконання
console.log('Contacts page JavaScript loaded successfully'); 