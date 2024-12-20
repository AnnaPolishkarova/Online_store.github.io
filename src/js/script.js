$(document).ready(function () {
    // Инициализация слайдера для блока с акциями.
    // Конфигурация библиотеки Slick для элемента '.promotion__list':
    $('.promotion__list').slick({
        autoplay: true,            // Автопрокрутка
        autoplaySpeed: 2000,       // Скорость смены (в миллисекундах)
        dots: true,                // Навигационные точки
        arrows: false,             // Скрыть стрелки
        infinite: true,            // Бесконечная прокрутка
        slidesToShow: 2,           // Количество отображаемых слайдов
        slidesToScroll: 1          // Количество прокручиваемых слайдов
    });
});
