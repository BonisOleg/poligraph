// Додаємо клас для специфічних стилів головної сторінки
document.body.classList.add('home-page');

// Детекція iOS та оптимізація анімацій
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Спрощена оптимізація для iOS (БЕЗ зміни анімації)
function optimizeECGForIOS() {
    if (isIOS() && isSafari()) {
        const ecgPath = document.querySelector('.ecg-path');
        const ecgContainer = document.querySelector('.ecg-container');

        if (ecgPath) {
            // Тільки hardware acceleration, БЕЗ зміни анімації
            ecgPath.style.webkitTransform = 'translateZ(0)';
            ecgPath.style.transform = 'translateZ(0)';
            ecgPath.style.webkitBackfaceVisibility = 'hidden';
            ecgPath.style.backfaceVisibility = 'hidden';
        }

        if (ecgContainer) {
            ecgContainer.style.webkitBackfaceVisibility = 'hidden';
            ecgContainer.style.backfaceVisibility = 'hidden';
        }

        // Додаємо клас для iOS специфічних стилів
        document.body.classList.add('ios-device');
    }
}

// Функція для рестарту анімації при переході фокусу (спрощена)
function handleVisibilityChange() {
    const ecgPath = document.querySelector('.ecg-path');
    if (ecgPath) {
        if (document.hidden) {
            ecgPath.style.webkitAnimationPlayState = 'paused';
            ecgPath.style.animationPlayState = 'paused';
        } else {
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

    // Оптимізація для iOS (БЕЗ зміни анімації)
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