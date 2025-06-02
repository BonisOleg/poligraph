// Додаємо клас для специфічних стилів головної сторінки
document.body.classList.add('home-page');

// Детекція iOS та оптимізація анімацій
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Оптимізація ECG анімації для iOS
function optimizeECGForIOS() {
    if (isIOS() && isSafari()) {
        const ecgPath = document.querySelector('.ecg-path');
        const ecgContainer = document.querySelector('.ecg-container');

        if (ecgPath) {
            // Форсуємо hardware acceleration
            ecgPath.style.webkitTransform = 'translateZ(0)';
            ecgPath.style.transform = 'translateZ(0)';
            ecgPath.style.webkitBackfaceVisibility = 'hidden';
            ecgPath.style.backfaceVisibility = 'hidden';

            // Встановлюємо стабільну анімацію
            ecgPath.style.webkitAnimationTimingFunction = 'linear';
            ecgPath.style.animationTimingFunction = 'linear';
            ecgPath.style.webkitAnimationFillMode = 'forwards';
            ecgPath.style.animationFillMode = 'forwards';
        }

        if (ecgContainer) {
            ecgContainer.style.webkitBackfaceVisibility = 'hidden';
            ecgContainer.style.backfaceVisibility = 'hidden';
            ecgContainer.style.webkitPerspective = '1000px';
            ecgContainer.style.perspective = '1000px';
        }

        // Додаємо клас для iOS специфічних стилів
        document.body.classList.add('ios-device');
    }
}

// Функція для рестарту анімації при переході фокусу
function handleVisibilityChange() {
    if (document.hidden) {
        // Сторінка стала невидимою
        const ecgPath = document.querySelector('.ecg-path');
        if (ecgPath) {
            ecgPath.style.webkitAnimationPlayState = 'paused';
            ecgPath.style.animationPlayState = 'paused';
        }
    } else {
        // Сторінка знову видима
        const ecgPath = document.querySelector('.ecg-path');
        if (ecgPath) {
            ecgPath.style.webkitAnimationPlayState = 'running';
            ecgPath.style.animationPlayState = 'running';
        }
    }
}

// JavaScript для головної сторінки - видалення відступів та адаптивна висота
document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.footer');
    const mainContent = document.querySelector('.main-content');
    const homeContainer = document.querySelector('.home-container');
    const imageSection = document.querySelector('.image-section');
    const body = document.body;

    // Оптимізація для iOS
    optimizeECGForIOS();

    if (footer) {
        footer.style.marginTop = '0';
        footer.style.paddingTop = '0';
        footer.style.transform = 'translateY(0)';
        footer.style.position = 'relative';
        footer.style.top = '0';
    }

    if (mainContent) {
        mainContent.style.marginBottom = '0';
        mainContent.style.paddingBottom = '0';
        mainContent.style.margin = '0';
        mainContent.style.padding = '0';
    }

    if (homeContainer) {
        homeContainer.style.marginBottom = '0';
        homeContainer.style.paddingBottom = '0';

        // Динамічна висота залежно від розміру екрана
        setHomeContainerHeight();
    }

    if (imageSection) {
        imageSection.style.marginBottom = '0';
        imageSection.style.paddingBottom = '0';
    }

    // Додатково прибираємо всі можливі відступи від body
    body.style.margin = '0';
    body.style.padding = '0';

    // Слухач для зміни розміру вікна
    window.addEventListener('resize', setHomeContainerHeight);

    // Слухач для паузи/відновлення анімації
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Обробник для фокусу/втрати фокусу вікна
    window.addEventListener('focus', function () {
        const ecgPath = document.querySelector('.ecg-path');
        if (ecgPath) {
            ecgPath.style.webkitAnimationPlayState = 'running';
            ecgPath.style.animationPlayState = 'running';
        }
    });

    window.addEventListener('blur', function () {
        const ecgPath = document.querySelector('.ecg-path');
        if (ecgPath) {
            ecgPath.style.webkitAnimationPlayState = 'paused';
            ecgPath.style.animationPlayState = 'paused';
        }
    });
});

// Функція для встановлення висоти контейнера
function setHomeContainerHeight() {
    const homeContainer = document.querySelector('.home-container');
    if (!homeContainer) return;

    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
        // Десктоп
        homeContainer.style.height = '75vh';
    } else if (screenWidth >= 768) {
        // Планшет
        homeContainer.style.height = '60vh';
    } else if (screenWidth >= 480) {
        // Великий мобільний
        homeContainer.style.height = '50vh';
    } else {
        // Малий мобільний
        homeContainer.style.height = '45vh';
    }
} 