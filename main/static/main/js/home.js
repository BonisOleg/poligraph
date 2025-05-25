// Додаємо клас для специфічних стилів головної сторінки
document.body.classList.add('home-page');

// JavaScript для головної сторінки - видалення відступів та адаптивна висота
document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.footer');
    const mainContent = document.querySelector('.main-content');
    const homeContainer = document.querySelector('.home-container');
    const imageSection = document.querySelector('.image-section');
    const body = document.body;

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