(function ($) {
    "use strict";

    ///=============  * Mobile Menu  =============\\\
    document.addEventListener("DOMContentLoaded", function() {
        var mobileMenu = document.getElementById("mobilemenu");
        var mainMenu = document.querySelector(".vertical_menu");
        if (!mobileMenu || !mainMenu || mainMenu.children.length) {
            return;
        }
        var clonedMenu = mobileMenu.cloneNode(true);
        clonedMenu.removeAttribute("id");
        mainMenu.appendChild(clonedMenu);
    });
    jQuery(document).ready(function($) {
        $('.vertical_menu ul li.menu-item-has-children').append('<span class="mobile-arrows far fa-plus"></span>');
        $(".vertical_menu .mobile-arrows").on("click",function() {
            $(this).parent().find('ul:first').slideToggle(300);
            $(this).toggleClass('is-open');
        });
    });

    ///=============  * Menu Bar Popup Icon  =============\\\
    function menuBarPopup() {
        $('.menu__bar i').on("click", function() {
            $(this).toggleClass('clicked');
            $('.menu__bar-popup').toggleClass('show');
            $('.menu__bar-popup-overlay').addClass('show');
        });

        $('.menu__bar-popup .close').on("click", function() {
            $('.menu__bar i').removeClass('clicked');
            $('.menu__bar-popup').removeClass('show');
            $('.menu__bar-popup-overlay').removeClass('show');
        });
    }

    ///=============  * Banner Slider  =============\\\
    function bannerSlider() {
        let sliderActive1 = '.banner-slider';
        if (!document.querySelector(sliderActive1)) {
            return;
        }

        let sliderInit1 = new Swiper(sliderActive1, {
            loop: true,
            slidesPerView: 1,
            speed: 1000,
            effect: 'fade',
            autoplay: {
                delay: 5500,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.banner-button-next',
                prevEl: '.banner-button-prev',
            },		
            pagination: {
                el: ".banner-pagination",
                clickable: true,
            },
        });
        function animated_swiper(selector, init) {
            let animated = function animated() {
                $(selector + ' [data-animation]').each(function() {
                    let anim = $(this).data('animation');
                    let delay = $(this).data('delay');
                    let duration = $(this).data('duration');
                    $(this).removeClass('anim' + anim).addClass(anim + ' animated').css({
                        webkitAnimationDelay: delay,
                        animationDelay: delay,
                        webkitAnimationDuration: duration,
                        animationDuration: duration
                    }).one('animationend', function() {
                        $(this).removeClass(anim + ' animated');
                    });
                });
            };
            animated();
            init.on('slideChange', function() {
                $(sliderActive1 + ' [data-animation]').removeClass('animated');
            });
            init.on('slideChange', animated);
        }
        animated_swiper(sliderActive1, sliderInit1);
    }

    ///=============  Toggle contact fields based on selected service  =============\\\
    function updateServiceDependentFields() {
        let serviceField = $('#service');
        if (!serviceField.length) {
            return;
        }

        let selectedService = serviceField.val();

        $('.conditional-group').hide();

        $('.conditional-group').each(function() {
            let servicesRaw = $(this).data('service');
            if (!servicesRaw) {
                return;
            }

            let services = servicesRaw.split(',').map(s => s.trim());

            services.includes(selectedService) ? $(this).show() : $(this).hide();
        });
    }

    function preselectServiceFromQuery() {
        let serviceField = document.getElementById('service');
        if (!serviceField) {
            return;
        }

        let selectedService = new URLSearchParams(window.location.search).get('service');
        let allowedServices = ['entruempelung', 'entsorgung', 'aufloesung', 'umzug', 'transport'];

        if (selectedService && allowedServices.includes(selectedService)) {
            serviceField.value = selectedService;
        }
    }


    function handleContactFormSubmit(event) {
        if (typeof window.fetch !== 'function') {
            return;
        }

        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);
        if (!formData.get('form-name')) {
            formData.set('form-name', myForm.getAttribute('name') || 'contact');
        }

        const filteredEntries = Array.from(formData.entries())
        .filter(([key, value]) => {
            if (key === 'form-name') {
                return true;
            }

            if (typeof value !== 'string') {
                return true;
            }

            return value.trim() !== "";
        }); // only keep filled fields
    
        const cleanedFormData = new URLSearchParams(filteredEntries).toString();
      
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: cleanedFormData
        })
          .then(() => {
            myForm.style.display = 'none';           // Hide the form
            document.getElementById('form-success').style.display = 'block'; // Show success message
          })
          .catch(() => alert('Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'));
    }

    $(document).ready(function () {
        preselectServiceFromQuery();
        $('select#service').on('change', updateServiceDependentFields);
        updateServiceDependentFields();

        $('#contact-form').on('submit', handleContactFormSubmit);

        menuBarPopup();
        bannerSlider();
    });
})(jQuery);
