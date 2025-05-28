// Універсальна система модальних вікон
class ModalSystem {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        this.createModalContainer();
        this.setupEventListeners();
    }

    createModalContainer() {
        // Перевіряємо чи контейнер вже існує
        if (document.getElementById('modal-system-container')) {
            return;
        }

        const container = document.createElement('div');
        container.id = 'modal-system-container';
        document.body.appendChild(container);
    }

    setupEventListeners() {
        // Закриття модального вікна клавішею Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });

        // Попереджуємо скролінг body коли модальне вікно відкрите
        document.addEventListener('touchmove', (e) => {
            if (this.activeModal) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    openContactModal() {
        const modalHTML = `
            <div class="modal-overlay" id="contactModal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title">Зв'язатися з нами</h2>
                        <p class="modal-subtitle">Залишіть заявку і ми зв'яжемося з вами протягом 15 хвилин</p>
                        <button class="modal-close" onclick="modalSystem.closeModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form" id="contactModalForm">
                            <div class="modal-form-group">
                                <label class="modal-form-label">Ім'я *</label>
                                <input type="text" name="name" class="modal-form-input" required 
                                       placeholder="Ваше ім'я">
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Телефон *</label>
                                <input type="tel" name="phone" class="modal-form-input" required 
                                       placeholder="+38 (0XX) XXX-XX-XX">
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Послуга</label>
                                <select name="service" class="modal-form-select">
                                    <option value="">Оберіть послугу</option>
                                    <option value="Перевірка на зраду">Перевірка на зраду (5000 грн)</option>
                                    <option value="Скринінг персоналу">Скринінг персоналу (2500 грн)</option>
                                    <option value="Розширений скринінг">Розширений скринінг (4000 грн)</option>
                                    <option value="Приватні питання">Приватні питання (5000 грн)</option>
                                    <option value="Розслідування крадіжок">Розслідування крадіжок (5000 грн)</option>
                                    <option value="Пошуки доказів">Пошуки доказів (5000 грн)</option>
                                </select>
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Повідомлення</label>
                                <textarea name="message" class="modal-form-textarea" 
                                          placeholder="Опишіть детальніше вашу ситуацію (необов'язково)"></textarea>
                            </div>
                            
                            <div class="modal-checkbox-group">
                                <input type="checkbox" id="contactPrivacy" class="modal-checkbox-input" required>
                                <div class="modal-checkbox-custom"></div>
                                <div class="modal-checkbox-text">
                                    Згоден з <a href="#" onclick="modalSystem.showPrivacyPolicy()">обробкою персональних даних</a> та умовами конфіденційності
                                </div>
                            </div>
                            
                            <button type="submit" class="modal-form-submit">
                                <span class="modal-submit-text">Відправити заявку</span>
                                <div class="modal-submit-loader"></div>
                            </button>
                        </form>
                        
                        <div class="modal-message" id="contactModalMessage"></div>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modalHTML);
        this.setupContactForm();
    }

    openQuickOrderModal() {
        const modalHTML = `
            <div class="modal-overlay" id="quickOrderModal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title">Швидке замовлення</h2>
                        <p class="modal-subtitle">Передзвонимо протягом 15 хвилин і проконсультуємо безкоштовно</p>
                        <button class="modal-close" onclick="modalSystem.closeModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form" id="quickOrderModalForm">
                            <div class="modal-form-group">
                                <label class="modal-form-label">Ім'я *</label>
                                <input type="text" name="name" class="modal-form-input" required 
                                       placeholder="Ваше ім'я">
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Телефон *</label>
                                <input type="tel" name="phone" class="modal-form-input" required 
                                       placeholder="+38 (0XX) XXX-XX-XX">
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Послуга *</label>
                                <select name="service" class="modal-form-select" required>
                                    <option value="">Оберіть послугу</option>
                                    <option value="Перевірка на зраду">Перевірка на зраду (5000 грн)</option>
                                    <option value="Скринінг персоналу">Скринінг персоналу (2500 грн)</option>
                                    <option value="Розширений скринінг">Розширений скринінг (4000 грн)</option>
                                    <option value="Приватні питання">Приватні питання (5000 грн)</option>
                                    <option value="Розслідування крадіжок">Розслідування крадіжок (5000 грн)</option>
                                    <option value="Пошуки доказів">Пошуки доказів (5000 грн)</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="modal-form-submit">
                                <span class="modal-submit-text">Замовити дзвінок</span>
                                <div class="modal-submit-loader"></div>
                            </button>
                        </form>
                        
                        <div class="modal-message" id="quickOrderModalMessage"></div>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modalHTML);
        this.setupQuickOrderForm();
    }

    openReviewModal() {
        const modalHTML = `
            <div class="modal-overlay" id="reviewModal">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2 class="modal-title">Залишити відгук</h2>
                        <p class="modal-subtitle">Поділіться вашим досвідом співпраці з нами</p>
                        <button class="modal-close" onclick="modalSystem.closeModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form" id="reviewModalForm">
                            <div class="modal-form-group">
                                <label class="modal-form-label">Ім'я *</label>
                                <input type="text" name="name" class="modal-form-input" required 
                                       placeholder="Ваше ім'я">
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Послуга</label>
                                <select name="service" class="modal-form-select">
                                    <option value="">Оберіть послугу</option>
                                    <option value="Перевірка на зраду">Перевірка на зраду</option>
                                    <option value="Скринінг персоналу">Скринінг персоналу</option>
                                    <option value="Розширений скринінг">Розширений скринінг</option>
                                    <option value="Приватні питання">Приватні питання</option>
                                    <option value="Розслідування крадіжок">Розслідування крадіжок</option>
                                    <option value="Пошуки доказів">Пошуки доказів</option>
                                </select>
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Оцінка *</label>
                                <div class="rating-input" id="modalRatingInput">
                                    <input type="radio" name="rating" value="5" id="modalStar5" required>
                                    <label for="modalStar5" class="star-label">⭐</label>
                                    <input type="radio" name="rating" value="4" id="modalStar4">
                                    <label for="modalStar4" class="star-label">⭐</label>
                                    <input type="radio" name="rating" value="3" id="modalStar3">
                                    <label for="modalStar3" class="star-label">⭐</label>
                                    <input type="radio" name="rating" value="2" id="modalStar2">
                                    <label for="modalStar2" class="star-label">⭐</label>
                                    <input type="radio" name="rating" value="1" id="modalStar1">
                                    <label for="modalStar1" class="star-label">⭐</label>
                                </div>
                            </div>
                            
                            <div class="modal-form-group">
                                <label class="modal-form-label">Ваш відгук *</label>
                                <textarea name="review" class="modal-form-textarea" required
                                          placeholder="Поділіться вашим досвідом співпраці з нами..."></textarea>
                            </div>
                            
                            <div class="modal-checkbox-group">
                                <input type="checkbox" id="reviewPrivacy" class="modal-checkbox-input" required>
                                <div class="modal-checkbox-custom"></div>
                                <div class="modal-checkbox-text">
                                    Згоден з публікацією відгуку та <a href="#" onclick="modalSystem.showPrivacyPolicy()">обробкою персональних даних</a>
                                </div>
                            </div>
                            
                            <button type="submit" class="modal-form-submit">
                                <span class="modal-submit-text">Опублікувати відгук</span>
                                <div class="modal-submit-loader"></div>
                            </button>
                        </form>
                        
                        <div class="modal-message" id="reviewModalMessage"></div>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modalHTML);
        this.setupReviewForm();
        this.setupRatingInput();
    }

    showModal(modalHTML) {
        const container = document.getElementById('modal-system-container');
        container.innerHTML = modalHTML;

        this.activeModal = container.querySelector('.modal-overlay');

        // Блокуємо скролінг body
        document.body.style.overflow = 'hidden';

        // Анімація появи
        setTimeout(() => {
            this.activeModal.classList.add('active');
        }, 10);

        // Клік поза модальним вікном
        this.activeModal.addEventListener('click', (e) => {
            if (e.target === this.activeModal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        if (!this.activeModal) return;

        this.activeModal.classList.remove('active');

        setTimeout(() => {
            const container = document.getElementById('modal-system-container');
            container.innerHTML = '';
            this.activeModal = null;

            // Відновлюємо скролінг body
            document.body.style.overflow = '';
        }, 300);
    }

    setupContactForm() {
        const form = document.getElementById('contactModalForm');
        const submitButton = form.querySelector('.modal-form-submit');
        const messageDiv = document.getElementById('contactModalMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!this.validateContactForm(form)) {
                return;
            }

            this.setLoading(submitButton, true);

            try {
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    service: formData.get('service') || 'Не вказано',
                    message: formData.get('message') || ''
                };

                const response = await fetch('/api/send-contact/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    this.showMessage(messageDiv, result.message, 'success');
                    form.reset();
                    setTimeout(() => this.closeModal(), 3000);
                } else {
                    this.showMessage(messageDiv, result.message, 'error');
                }

            } catch (error) {
                console.error('Error:', error);
                this.showMessage(messageDiv, 'Помилка з\'єднання. Перевірте інтернет та спробуйте ще раз.', 'error');
            } finally {
                this.setLoading(submitButton, false);
            }
        });

        // Форматування телефону
        const phoneInput = form.querySelector('input[name="phone"]');
        phoneInput.addEventListener('input', this.formatPhoneNumber);
    }

    setupQuickOrderForm() {
        const form = document.getElementById('quickOrderModalForm');
        const submitButton = form.querySelector('.modal-form-submit');
        const messageDiv = document.getElementById('quickOrderModalMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!this.validateQuickOrderForm(form)) {
                return;
            }

            this.setLoading(submitButton, true);

            try {
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    service: formData.get('service')
                };

                const response = await fetch('/api/quick-order/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    this.showMessage(messageDiv, result.message, 'success');
                    form.reset();
                    setTimeout(() => this.closeModal(), 4000);
                } else {
                    this.showMessage(messageDiv, result.message, 'error');
                }

            } catch (error) {
                console.error('Error:', error);
                this.showMessage(messageDiv, 'Помилка з\'єднання. Зателефонуйте нам напряму.', 'error');
            } finally {
                this.setLoading(submitButton, false);
            }
        });

        // Форматування телефону
        const phoneInput = form.querySelector('input[name="phone"]');
        phoneInput.addEventListener('input', this.formatPhoneNumber);
    }

    setupReviewForm() {
        const form = document.getElementById('reviewModalForm');
        const submitButton = form.querySelector('.modal-form-submit');
        const messageDiv = document.getElementById('reviewModalMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!this.validateReviewForm(form)) {
                return;
            }

            this.setLoading(submitButton, true);

            try {
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    service: formData.get('service') || 'Не вказано',
                    rating: formData.get('rating'),
                    review: formData.get('review')
                };

                const response = await fetch('/api/send-review/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    this.showMessage(messageDiv, result.message, 'success');
                    form.reset();
                    this.resetStars();
                    setTimeout(() => this.closeModal(), 4000);
                } else {
                    this.showMessage(messageDiv, result.message, 'error');
                }

            } catch (error) {
                console.error('Error:', error);
                this.showMessage(messageDiv, 'Помилка публікації відгуку. Спробуйте пізніше.', 'error');
            } finally {
                this.setLoading(submitButton, false);
            }
        });
    }

    setupRatingInput() {
        const ratingInputs = document.querySelectorAll('#modalRatingInput input[type="radio"]');
        const starLabels = document.querySelectorAll('#modalRatingInput .star-label');

        starLabels.forEach((label, index) => {
            label.addEventListener('click', () => {
                const rating = 5 - index;
                ratingInputs[index].checked = true;
                this.updateStars(rating);
            });

            label.addEventListener('mouseenter', () => {
                const rating = 5 - index;
                this.highlightStars(rating);
            });
        });

        document.getElementById('modalRatingInput').addEventListener('mouseleave', () => {
            const checkedInput = document.querySelector('#modalRatingInput input:checked');
            if (checkedInput) {
                this.updateStars(parseInt(checkedInput.value));
            } else {
                this.resetStars();
            }
        });
    }

    updateStars(rating) {
        const starLabels = document.querySelectorAll('#modalRatingInput .star-label');
        starLabels.forEach((label, index) => {
            if (5 - index <= rating) {
                label.style.color = '#FFD700';
                label.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                label.style.transform = 'scale(1.1)';
            } else {
                label.style.color = 'var(--gray-light)';
                label.style.textShadow = 'none';
                label.style.transform = 'scale(1)';
            }
        });
    }

    highlightStars(rating) {
        const starLabels = document.querySelectorAll('#modalRatingInput .star-label');
        starLabels.forEach((label, index) => {
            if (5 - index <= rating) {
                label.style.color = '#FFD700';
                label.style.transform = 'scale(1.15)';
            } else {
                label.style.color = 'var(--gray-light)';
                label.style.transform = 'scale(1)';
            }
        });
    }

    resetStars() {
        const starLabels = document.querySelectorAll('#modalRatingInput .star-label');
        starLabels.forEach(label => {
            label.style.color = 'var(--gray-light)';
            label.style.textShadow = 'none';
            label.style.transform = 'scale(1)';
        });
    }

    // Валідація форм
    validateContactForm(form) {
        const name = form.querySelector('input[name="name"]').value.trim();
        const phone = form.querySelector('input[name="phone"]').value.trim();
        const privacy = form.querySelector('#contactPrivacy').checked;

        if (!name || name.length < 2) {
            alert('Ім\'я повинно містити мінімум 2 символи');
            return false;
        }

        if (!phone || !this.isValidPhone(phone)) {
            alert('Введіть коректний номер телефону');
            return false;
        }

        if (!privacy) {
            alert('Необхідно дати згоду на обробку персональних даних');
            return false;
        }

        return true;
    }

    validateQuickOrderForm(form) {
        const name = form.querySelector('input[name="name"]').value.trim();
        const phone = form.querySelector('input[name="phone"]').value.trim();
        const service = form.querySelector('select[name="service"]').value;

        if (!name || name.length < 2) {
            alert('Ім\'я повинно містити мінімум 2 символи');
            return false;
        }

        if (!phone || !this.isValidPhone(phone)) {
            alert('Введіть коректний номер телефону');
            return false;
        }

        if (!service) {
            alert('Оберіть послугу');
            return false;
        }

        return true;
    }

    validateReviewForm(form) {
        const name = form.querySelector('input[name="name"]').value.trim();
        const rating = form.querySelector('input[name="rating"]:checked');
        const review = form.querySelector('textarea[name="review"]').value.trim();
        const privacy = form.querySelector('#reviewPrivacy').checked;

        if (!name || name.length < 2) {
            alert('Ім\'я повинно містити мінімум 2 символи');
            return false;
        }

        if (!rating) {
            alert('Оберіть рейтинг');
            return false;
        }

        if (!review || review.length < 10) {
            alert('Відгук повинен містити мінімум 10 символів');
            return false;
        }

        if (!privacy) {
            alert('Необхідно дати згоду на публікацію відгуку');
            return false;
        }

        return true;
    }

    // Допоміжні методи
    isValidPhone(phone) {
        const phoneRegex = /^(\+38)?[\s\-]?\(?0\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        return phoneRegex.test(phone);
    }

    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.startsWith('38')) {
            value = value.substring(2);
        }

        if (value.length > 0 && !value.startsWith('0')) {
            value = '0' + value;
        }

        if (value.length >= 10) {
            value = value.substring(0, 10);
            value = `+38 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
        } else if (value.length >= 6) {
            value = `+38 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 3) {
            value = `+38 (${value.substring(0, 3)}) ${value.substring(3)}`;
        } else if (value.length > 0) {
            value = `+38 (${value}`;
        }

        e.target.value = value;
    }

    setLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showMessage(messageDiv, text, type) {
        messageDiv.className = `modal-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.classList.add('show');

        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }

    getCSRFToken() {
        const name = 'csrftoken';
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    showPrivacyPolicy() {
        alert('Політика конфіденційності:\n\nМи гарантуємо повну конфіденційність ваших персональних даних. Інформація використовується виключно для зв\'язку з вами та не передається третім особам.');
    }
}

// Ініціалізація системи
const modalSystem = new ModalSystem();

// Експорт для використання в інших файлах
window.modalSystem = modalSystem; 