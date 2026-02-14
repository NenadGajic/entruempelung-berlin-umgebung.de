(function ($) {
    "use strict";

    const SELECTORS = {
        mobileMenu: '#mobilemenu',
        verticalMenu: '.vertical_menu',
        menuItemWithChildren: '.menu-item-has-children',
        submenuToggle: '.menu-item-has-children > .submenu-toggle',
        menuTrigger: '.menu__bar-trigger',
        menuPopup: '.menu__bar-popup',
        menuOverlay: '.menu__bar-popup-overlay',
        slider: '.banner-slider',
        serviceField: '#service',
        conditionalGroup: '.conditional-group',
        contactForm: '#contact-form',
    };

    const ALLOWED_SERVICES = ['entruempelung', 'entsorgung', 'aufloesung', 'umzug', 'transport'];

    function initializeMobileMenuClone() {
        const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
        const mainMenu = document.querySelector(SELECTORS.verticalMenu);

        if (!mobileMenu || !mainMenu || mainMenu.children.length) {
            return;
        }

        const clonedMenu = mobileMenu.cloneNode(true);
        clonedMenu.removeAttribute('id');
        mainMenu.appendChild(clonedMenu);
    }

    function initializeMobileMenuArrows() {
        const $verticalMenu = $(SELECTORS.verticalMenu);

        if (!$verticalMenu.length) {
            return;
        }

        $verticalMenu.find('ul li.menu-item-has-children').each(function () {
            const $item = $(this);
            if (!$item.children('.mobile-arrows').length) {
                $item.append('<span class="mobile-arrows far fa-plus" aria-hidden="true"></span>');
            }
        });

        $verticalMenu.on('click', '.mobile-arrows', function () {
            const $arrow = $(this);
            const $parent = $arrow.parent();
            const $submenu = $parent.find('ul:first');

            $submenu.slideToggle(300);
            $arrow.toggleClass('is-open');

            const isExpanded = $arrow.hasClass('is-open');
            $parent.toggleClass('is-open', isExpanded);
            $parent.children('.submenu-toggle').attr('aria-expanded', String(isExpanded));
        });
    }

    function closeDesktopSubmenus() {
        $(SELECTORS.menuItemWithChildren + '.is-open')
            .removeClass('is-open')
            .children('.submenu-toggle')
            .attr('aria-expanded', 'false');
    }

    function initializeDesktopSubmenuToggle() {
        const $submenuItems = $(SELECTORS.submenuToggle);

        if (!$submenuItems.length) {
            return;
        }

        $submenuItems.on('click', function (event) {
            event.preventDefault();

            const $toggle = $(this);
            const $item = $toggle.parent();
            const isOpen = $item.hasClass('is-open');

            $item.siblings(SELECTORS.menuItemWithChildren)
                .removeClass('is-open')
                .children('.submenu-toggle')
                .attr('aria-expanded', 'false');

            $item.toggleClass('is-open', !isOpen);
            $toggle.attr('aria-expanded', String(!isOpen));
        });

        $(document).on('click', function (event) {
            if (!$(event.target).closest(SELECTORS.menuItemWithChildren).length) {
                closeDesktopSubmenus();
            }
        });

        $(document).on('keydown', function (event) {
            if (event.key === 'Escape') {
                closeDesktopSubmenus();
            }
        });
    }

    function initializeMenuBarPopup() {
        const $menuTrigger = $(SELECTORS.menuTrigger);
        const $menuPopup = $(SELECTORS.menuPopup);
        const $menuOverlay = $(SELECTORS.menuOverlay);

        if (!$menuTrigger.length || !$menuPopup.length || !$menuOverlay.length) {
            return;
        }

        function closeMenu() {
            $menuTrigger.removeClass('clicked').attr('aria-expanded', 'false');
            $menuPopup.removeClass('show');
            $menuOverlay.removeClass('show');
        }

        $menuTrigger.on('click', function () {
            if ($menuPopup.hasClass('show')) {
                closeMenu();
                return;
            }

            $menuTrigger.addClass('clicked').attr('aria-expanded', 'true');
            $menuPopup.addClass('show');
            $menuOverlay.addClass('show');
        });

        $('.menu__bar-popup .close').on('click', closeMenu);
        $menuOverlay.on('click', closeMenu);

        $(document).on('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    function initializeBannerSlider() {
        const sliderSelector = SELECTORS.slider;

        if (!document.querySelector(sliderSelector)) {
            return;
        }

        const slider = new Swiper(sliderSelector, {
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
                el: '.banner-pagination',
                clickable: true,
            },
        });

        function runSlideAnimations() {
            $(sliderSelector + ' [data-animation]').each(function () {
                const $element = $(this);
                const animation = $element.data('animation');
                const delay = $element.data('delay');
                const duration = $element.data('duration');

                $element
                    .removeClass('anim' + animation)
                    .addClass(animation + ' animated')
                    .css({
                        webkitAnimationDelay: delay,
                        animationDelay: delay,
                        webkitAnimationDuration: duration,
                        animationDuration: duration,
                    })
                    .one('animationend', function () {
                        $(this).removeClass(animation + ' animated');
                    });
            });
        }

        runSlideAnimations();

        slider.on('slideChange', function () {
            $(sliderSelector + ' [data-animation]').removeClass('animated');
            runSlideAnimations();
        });
    }

    function updateServiceDependentFields() {
        const $serviceField = $(SELECTORS.serviceField);

        if (!$serviceField.length) {
            return;
        }

        const selectedService = $serviceField.val();

        $(SELECTORS.conditionalGroup).each(function () {
            const $group = $(this);
            const servicesRaw = $group.data('service');

            if (!servicesRaw) {
                $group.hide();
                return;
            }

            const services = String(servicesRaw)
                .split(',')
                .map((service) => service.trim());

            $group.toggle(services.includes(selectedService));
        });
    }

    function preselectServiceFromQuery() {
        const serviceField = document.querySelector(SELECTORS.serviceField);

        if (!serviceField) {
            return;
        }

        const selectedService = new URLSearchParams(window.location.search).get('service');

        if (selectedService && ALLOWED_SERVICES.includes(selectedService)) {
            serviceField.value = selectedService;
        }
    }

    function setMessage(element, message) {
        if (!element) {
            return;
        }

        if (!message) {
            element.style.display = 'none';
            element.textContent = '';
            return;
        }

        element.style.display = 'block';
        element.textContent = message;
    }

    function setSubmitButtonLoadingState(button, isLoading, defaultHtml) {
        if (!button) {
            return;
        }

        button.disabled = isLoading;

        if (isLoading) {
            button.setAttribute('aria-disabled', 'true');
            button.setAttribute('aria-busy', 'true');
            button.textContent = 'Wird gesendet...';
            return;
        }

        button.removeAttribute('aria-disabled');
        button.removeAttribute('aria-busy');
        button.innerHTML = defaultHtml;
    }

    function buildEncodedFormPayload(form) {
        const formData = new FormData(form);

        if (!formData.get('form-name')) {
            formData.set('form-name', form.getAttribute('name') || 'contact');
        }

        const filteredEntries = Array.from(formData.entries()).filter(([key, value]) => {
            if (key === 'form-name') {
                return true;
            }

            if (typeof value !== 'string') {
                return true;
            }

            return value.trim() !== '';
        });

        return new URLSearchParams(filteredEntries).toString();
    }

    function handleContactFormSubmit(event) {
        if (typeof window.fetch !== 'function') {
            return;
        }

        event.preventDefault();

        const form = event.target;
        const submitButton = document.getElementById('form-submit-button');
        const formError = document.getElementById('form-error');
        const formStatus = document.getElementById('form-status');
        const formSuccess = document.getElementById('form-success');
        const submitButtonHtml = submitButton ? submitButton.innerHTML : '';

        setMessage(formError, '');

        if (formSuccess) {
            formSuccess.style.display = 'none';
        }

        setMessage(formStatus, 'Ihre Anfrage wird gesendet...');
        setSubmitButtonLoadingState(submitButton, true, submitButtonHtml);

        const payload = buildEncodedFormPayload(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }

                form.style.display = 'none';
                setMessage(formStatus, '');

                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
            })
            .catch(() => {
                setMessage(formStatus, '');
                setMessage(formError, 'Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
                setSubmitButtonLoadingState(submitButton, false, submitButtonHtml);
            });
    }

    document.addEventListener('DOMContentLoaded', initializeMobileMenuClone);

    $(function () {
        initializeMobileMenuArrows();
        initializeDesktopSubmenuToggle();
        initializeMenuBarPopup();
        initializeBannerSlider();

        preselectServiceFromQuery();
        $(SELECTORS.serviceField).on('change', updateServiceDependentFields);
        updateServiceDependentFields();

        $(SELECTORS.contactForm).on('submit', handleContactFormSubmit);
    });
})(jQuery);
