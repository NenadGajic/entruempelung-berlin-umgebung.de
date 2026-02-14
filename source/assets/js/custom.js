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
        $('.vertical_menu ul li.menu-item-has-children').each(function() {
            if (!$(this).children('.mobile-arrows').length) {
                $(this).append('<span class="mobile-arrows far fa-plus" aria-hidden="true"></span>');
            }
        });

        $(".vertical_menu .mobile-arrows").on("click",function() {
            const parent = $(this).parent();
            const submenu = parent.find('ul:first');
            submenu.slideToggle(300);
            $(this).toggleClass('is-open');

            const isExpanded = $(this).hasClass('is-open');
            parent.toggleClass('is-open', isExpanded);
            parent.children('.submenu-toggle').attr('aria-expanded', String(isExpanded));
        });
    });

    function submenuToggle() {
        const submenuItems = $('.menu-item-has-children > .submenu-toggle');

        if (!submenuItems.length) {
            return;
        }

        submenuItems.on('click', function(event) {
            event.preventDefault();
            const item = $(this).parent();
            const isOpen = item.hasClass('is-open');

            item.siblings('.menu-item-has-children').removeClass('is-open')
                .children('.submenu-toggle')
                .attr('aria-expanded', 'false');

            item.toggleClass('is-open', !isOpen);
            $(this).attr('aria-expanded', String(!isOpen));
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.menu-item-has-children').length) {
                $('.menu-item-has-children.is-open')
                    .removeClass('is-open')
                    .children('.submenu-toggle')
                    .attr('aria-expanded', 'false');
            }
        });

        $(document).on('keydown', function(event) {
            if (event.key === 'Escape') {
                $('.menu-item-has-children.is-open')
                    .removeClass('is-open')
                    .children('.submenu-toggle')
                    .attr('aria-expanded', 'false');
            }
        });
    }

    ///=============  * Menu Bar Popup Icon  =============\\\
    function menuBarPopup() {
        const menuTrigger = $('.menu__bar-trigger');
        const menuPopup = $('.menu__bar-popup');
        const menuOverlay = $('.menu__bar-popup-overlay');

        function closeMenu() {
            menuTrigger.removeClass('clicked').attr('aria-expanded', 'false');
            menuPopup.removeClass('show');
            menuOverlay.removeClass('show');
        }

        menuTrigger.on("click", function() {
            const isOpen = menuPopup.hasClass('show');

            if (isOpen) {
                closeMenu();
                return;
            }

            menuTrigger.addClass('clicked').attr('aria-expanded', 'true');
            menuPopup.addClass('show');
            menuOverlay.addClass('show');
        });

        $('.menu__bar-popup .close').on("click", function() {
            closeMenu();
        });

        menuOverlay.on('click', function() {
            closeMenu();
        });

        $(document).on('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
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
        const submitButton = document.getElementById('form-submit-button');
        const formError = document.getElementById('form-error');
        const formStatus = document.getElementById('form-status');
        const formSuccess = document.getElementById('form-success');

        if (formError) {
            formError.style.display = 'none';
            formError.textContent = '';
        }

        if (formSuccess) {
            formSuccess.style.display = 'none';
        }

        if (formStatus) {
            formStatus.style.display = 'block';
            formStatus.textContent = 'Ihre Anfrage wird gesendet...';
        }

        let submitButtonHtml = '';
        if (submitButton) {
            submitButtonHtml = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.setAttribute('aria-disabled', 'true');
            submitButton.setAttribute('aria-busy', 'true');
            submitButton.textContent = 'Wird gesendet...';
        }

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
          .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }

            myForm.style.display = 'none';
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.textContent = '';
            }
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
          })
          .catch(() => {
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.textContent = '';
            }
            if (formError) {
                formError.style.display = 'block';
                formError.textContent = 'Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
            }
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-disabled');
                submitButton.removeAttribute('aria-busy');
                submitButton.innerHTML = submitButtonHtml;
            }
          });
    }

    $(document).ready(function () {
        preselectServiceFromQuery();
        $('select#service').on('change', updateServiceDependentFields);
        updateServiceDependentFields();

        $('#contact-form').on('submit', handleContactFormSubmit);

        submenuToggle();
        menuBarPopup();
        bannerSlider();
    });
})(jQuery);
