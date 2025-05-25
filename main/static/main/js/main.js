document.addEventListener('DOMContentLoaded', function () {
    // Мобільне меню
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            // Анімація іконки
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                mobileMenuToggle.setAttribute('aria-label', 'Закрити меню');
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                mobileMenuToggle.setAttribute('aria-label', 'Відкрити меню');
            }
        });

        // Закриття меню при кліку на посилання
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-cta-button');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                mobileMenuToggle.setAttribute('aria-label', 'Відкрити меню');
            });
        });

        // Закриття меню при кліку поза ним
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                mobileMenuToggle.setAttribute('aria-label', 'Відкрити меню');
            }
        });

        // Закриття меню при натисканні Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                mobileMenuToggle.setAttribute('aria-label', 'Відкрити меню');
            }
        });
    }

    // Smooth scroll для якорних посилань
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Додавання активного класу до поточної сторінки
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        try {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        } catch (e) {
            // Ігноруємо помилки для якорних посилань
        }
    });

    // Анімація появи елементів при скролі
    const observeElements = document.querySelectorAll('.footer-section, .nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Додавання hover ефектів для посилань
    const allLinks = document.querySelectorAll('a:not(.logo-link)');
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Анімація кнопок при натисканні
    const buttons = document.querySelectorAll('.cta-button, .footer-cta-button, .mobile-cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Створюємо ripple ефект
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Показ повідомлення при кліку на телефон (для демонстрації)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Можна додати аналітику або повідомлення
            console.log('Дзвінок: ' + this.href);
        });
    });

    // Анімація header при скролі
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(247, 247, 247, 0.95))';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--white), var(--white-soft))';
            header.style.backdropFilter = 'blur(10px)';
        }

        lastScroll = currentScroll;
    });

    // Підсвічування активного розділу при скролі
    const sections = ['home', 'services', 'pricing', 'about', 'equipment', 'contacts'];
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = 'home';

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100) {
                    current = section;
                }
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}` ||
                (current === 'home' && item.getAttribute('href') === '/')) {
                item.classList.add('active');
            }
        });
    });
});

// CSS для ripple ефекту
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
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
    
    button, .cta-button, .footer-cta-button, .mobile-cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style); 