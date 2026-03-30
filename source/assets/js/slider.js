(function () {
    'use strict';

    const SELECTOR = '.banner-slider';

    function initializeBannerSlider() {
        if (typeof window.Swiper === 'undefined') {
            return;
        }

        const sliderElement = document.querySelector(SELECTOR);
        if (!sliderElement) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const slider = new window.Swiper(SELECTOR, {
            loop: true,
            slidesPerView: 1,
            speed: prefersReducedMotion ? 0 : 1000,
            effect: 'fade',
            autoplay: prefersReducedMotion ? false : {
                delay: 5500,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.banner-button-next',
                prevEl: '.banner-button-prev',
            },
            pagination: {
                el: '.banner-pagination',
                clickable: true,
            },
        });

        function runSlideAnimations() {
            const animatedElements = document.querySelectorAll(SELECTOR + ' [data-animation]');
            animatedElements.forEach(function (element) {
                const animation = element.dataset.animation;
                if (!animation) {
                    return;
                }

                const delay = element.dataset.delay || '';
                const duration = element.dataset.duration || '';

                element.classList.remove('anim' + animation);
                element.classList.add(animation, 'animated');
                element.style.webkitAnimationDelay = delay;
                element.style.animationDelay = delay;
                element.style.webkitAnimationDuration = duration;
                element.style.animationDuration = duration;

                element.addEventListener('animationend', function () {
                    element.classList.remove(animation, 'animated');
                }, { once: true });
            });
        }

        runSlideAnimations();

        slider.on('slideChange', function () {
            const animatedElements = document.querySelectorAll(SELECTOR + ' [data-animation]');
            animatedElements.forEach(function (element) {
                element.classList.remove('animated');
            });
            runSlideAnimations();
        });
    }

    document.addEventListener('DOMContentLoaded', initializeBannerSlider);
})();
