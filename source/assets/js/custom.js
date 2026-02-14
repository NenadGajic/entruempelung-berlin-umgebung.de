(function () {
    'use strict';

    const SELECTORS = {
        mobileMenu: '#mobilemenu',
        mobileMenuTarget: '.vertical_menu',
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

    const SLIDE_DURATION_MS = 300;
    const FORM_REQUEST_TIMEOUT_MS = 15000;
    const ALLOWED_SERVICES = ['entruempelung', 'entsorgung', 'aufloesung', 'umzug', 'transport'];
    const slideTimers = new WeakMap();

    function clearSlideState(element) {
        const timerId = slideTimers.get(element);
        if (timerId) {
            window.clearTimeout(timerId);
            slideTimers.delete(element);
        }

        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('overflow');
        element.style.removeProperty('height');
        delete element.dataset.sliding;
    }

    function slideDown(element, duration) {
        if (!element) {
            return;
        }

        clearSlideState(element);

        element.dataset.sliding = 'true';
        element.style.removeProperty('display');

        let display = window.getComputedStyle(element).display;
        if (display === 'none') {
            display = 'block';
        }
        element.style.display = display;

        const targetHeight = element.scrollHeight;
        element.style.overflow = 'hidden';
        element.style.height = '0px';
        element.style.transitionProperty = 'height';
        element.style.transitionDuration = duration + 'ms';

        window.requestAnimationFrame(function () {
            element.style.height = targetHeight + 'px';
        });

        const timerId = window.setTimeout(function () {
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-property');
            element.style.removeProperty('transition-duration');
            delete element.dataset.sliding;
            slideTimers.delete(element);
        }, duration);

        slideTimers.set(element, timerId);
    }

    function slideUp(element, duration) {
        if (!element) {
            return;
        }

        clearSlideState(element);

        element.dataset.sliding = 'true';
        const startHeight = element.scrollHeight;

        element.style.overflow = 'hidden';
        element.style.height = startHeight + 'px';
        element.style.transitionProperty = 'height';
        element.style.transitionDuration = duration + 'ms';

        window.requestAnimationFrame(function () {
            element.style.height = '0px';
        });

        const timerId = window.setTimeout(function () {
            element.style.display = 'none';
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition-property');
            element.style.removeProperty('transition-duration');
            delete element.dataset.sliding;
            slideTimers.delete(element);
        }, duration);

        slideTimers.set(element, timerId);
    }

    function slideToggle(element, duration) {
        if (!element) {
            return;
        }

        const isHidden = window.getComputedStyle(element).display === 'none';
        if (isHidden) {
            slideDown(element, duration);
            return;
        }

        slideUp(element, duration);
    }

    function initializeMobileMenuClone() {
        const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
        const target = document.querySelector(SELECTORS.mobileMenuTarget);

        if (!mobileMenu || !target || target.children.length) {
            return;
        }

        const clonedMenu = mobileMenu.cloneNode(true);
        clonedMenu.removeAttribute('id');
        target.appendChild(clonedMenu);
    }

    function initializeMobileMenuArrows() {
        const menuRoot = document.querySelector(SELECTORS.mobileMenuTarget);
        if (!menuRoot) {
            return;
        }

        const menuItems = menuRoot.querySelectorAll('ul li.menu-item-has-children');
        menuItems.forEach(function (item) {
            if (!item.querySelector(':scope > .mobile-arrows')) {
                const arrow = document.createElement('span');
                arrow.className = 'mobile-arrows far fa-plus';
                arrow.setAttribute('aria-hidden', 'true');
                item.appendChild(arrow);
            }
        });

        menuRoot.addEventListener('click', function (event) {
            const arrow = event.target.closest('.mobile-arrows');
            if (!arrow || !menuRoot.contains(arrow)) {
                return;
            }

            const parent = arrow.parentElement;
            if (!parent) {
                return;
            }

            const submenu = parent.querySelector(':scope > ul');
            slideToggle(submenu, SLIDE_DURATION_MS);
            arrow.classList.toggle('is-open');

            const isExpanded = arrow.classList.contains('is-open');
            parent.classList.toggle('is-open', isExpanded);

            const submenuToggle = parent.querySelector(':scope > .submenu-toggle');
            if (submenuToggle) {
                submenuToggle.setAttribute('aria-expanded', String(isExpanded));
            }
        });
    }

    function closeDesktopSubmenus() {
        const openItems = document.querySelectorAll(SELECTORS.menuItemWithChildren + '.is-open');
        openItems.forEach(function (item) {
            item.classList.remove('is-open');
            const toggle = item.querySelector(':scope > .submenu-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initializeDesktopSubmenuToggle() {
        const submenuToggles = document.querySelectorAll(SELECTORS.submenuToggle);
        if (!submenuToggles.length) {
            return;
        }

        submenuToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function (event) {
                event.preventDefault();

                const item = toggle.parentElement;
                if (!item) {
                    return;
                }

                const isOpen = item.classList.contains('is-open');
                const siblingItems = item.parentElement ? item.parentElement.querySelectorAll(':scope > ' + SELECTORS.menuItemWithChildren) : [];

                siblingItems.forEach(function (sibling) {
                    if (sibling === item) {
                        return;
                    }

                    sibling.classList.remove('is-open');
                    const siblingToggle = sibling.querySelector(':scope > .submenu-toggle');
                    if (siblingToggle) {
                        siblingToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                item.classList.toggle('is-open', !isOpen);
                toggle.setAttribute('aria-expanded', String(!isOpen));
            });
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest(SELECTORS.menuItemWithChildren)) {
                closeDesktopSubmenus();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeDesktopSubmenus();
            }
        });
    }

    function initializeMenuBarPopup() {
        const menuTrigger = document.querySelector(SELECTORS.menuTrigger);
        const menuPopup = document.querySelector(SELECTORS.menuPopup);
        const menuOverlay = document.querySelector(SELECTORS.menuOverlay);

        if (!menuTrigger || !menuPopup || !menuOverlay) {
            return;
        }

        function closeMenu() {
            menuTrigger.classList.remove('clicked');
            menuTrigger.setAttribute('aria-expanded', 'false');
            menuPopup.classList.remove('show');
            menuOverlay.classList.remove('show');
        }

        menuTrigger.addEventListener('click', function () {
            if (menuPopup.classList.contains('show')) {
                closeMenu();
                return;
            }

            menuTrigger.classList.add('clicked');
            menuTrigger.setAttribute('aria-expanded', 'true');
            menuPopup.classList.add('show');
            menuOverlay.classList.add('show');
        });

        const closeButton = document.querySelector('.menu__bar-popup .close');
        if (closeButton) {
            closeButton.addEventListener('click', closeMenu);
        }

        menuOverlay.addEventListener('click', closeMenu);

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    function initializeBannerSlider() {
        if (typeof window.Swiper === 'undefined') {
            return;
        }

        const sliderElement = document.querySelector(SELECTORS.slider);
        if (!sliderElement) {
            return;
        }

        const slider = new window.Swiper(SELECTORS.slider, {
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
            const animatedElements = document.querySelectorAll(SELECTORS.slider + ' [data-animation]');
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

                element.addEventListener('animationend', function handleAnimationEnd() {
                    element.classList.remove(animation, 'animated');
                }, { once: true });
            });
        }

        runSlideAnimations();

        slider.on('slideChange', function () {
            const animatedElements = document.querySelectorAll(SELECTORS.slider + ' [data-animation]');
            animatedElements.forEach(function (element) {
                element.classList.remove('animated');
            });
            runSlideAnimations();
        });
    }

    function updateServiceDependentFields() {
        const serviceField = document.querySelector(SELECTORS.serviceField);
        if (!serviceField) {
            return;
        }

        const selectedService = serviceField.value;

        const groups = document.querySelectorAll(SELECTORS.conditionalGroup);
        groups.forEach(function (group) {
            const servicesRaw = group.dataset.service;
            if (!servicesRaw) {
                group.style.display = 'none';
                return;
            }

            const services = String(servicesRaw)
                .split(',')
                .map(function (service) {
                    return service.trim();
                });

            const isVisible = services.includes(selectedService);
            group.style.display = isVisible ? '' : 'none';

            const controls = group.querySelectorAll('input, select, textarea');
            controls.forEach(function (control) {
                control.disabled = !isVisible;
            });
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

    function getFieldDisplayName(field, form) {
        if (!field) {
            return '';
        }

        if (field.id && form) {
            const label = form.querySelector('label[for="' + field.id + '"]');
            if (label) {
                return label.textContent.trim();
            }
        }

        return field.getAttribute('name') || '';
    }

    function getMissingRequiredFieldLabels(form) {
        const requiredFields = form.querySelectorAll('[required][name]');
        const missingLabels = [];

        requiredFields.forEach(function (field) {
            const value = field.value;
            const isMissing = typeof value === 'string' ? value.trim() === '' : !value;

            if (!isMissing) {
                return;
            }

            const label = getFieldDisplayName(field, form);
            if (label && !missingLabels.includes(label)) {
                missingLabels.push(label);
            }
        });

        return missingLabels;
    }

    function fetchWithTimeout(url, options, timeoutMs) {
        if (typeof window.AbortController !== 'function') {
            return window.fetch(url, options);
        }

        const controller = new window.AbortController();
        const timeoutId = window.setTimeout(function () {
            controller.abort();
        }, timeoutMs);

        const requestOptions = Object.assign({}, options, {
            signal: controller.signal,
        });

        return window.fetch(url, requestOptions).finally(function () {
            window.clearTimeout(timeoutId);
        });
    }

    function buildEncodedFormPayload(form) {
        const formData = new FormData(form);

        if (!formData.get('form-name')) {
            formData.set('form-name', form.getAttribute('name') || 'contact');
        }

        const filteredEntries = Array.from(formData.entries()).filter(function (entry) {
            const key = entry[0];
            const value = entry[1];

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

        if (submitButton && submitButton.disabled) {
            return;
        }

        setMessage(formError, '');
        if (formSuccess) {
            formSuccess.style.display = 'none';
        }

        if (!form.checkValidity()) {
            const missingRequiredFields = getMissingRequiredFieldLabels(form);
            const messageBase = 'Bitte füllen Sie alle Pflichtfelder aus.';
            const message = missingRequiredFields.length
                ? messageBase + ' Fehlend: ' + missingRequiredFields.join(', ') + '.'
                : messageBase;

            setMessage(formStatus, '');
            setMessage(formError, message);

            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid && typeof firstInvalid.focus === 'function') {
                firstInvalid.focus();
            }

            form.reportValidity();
            return;
        }

        setMessage(formStatus, 'Ihre Anfrage wird gesendet...');
        setSubmitButtonLoadingState(submitButton, true, submitButtonHtml);

        const payload = buildEncodedFormPayload(form);

        fetchWithTimeout('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload,
        }, FORM_REQUEST_TIMEOUT_MS)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Request failed');
                }

                form.style.display = 'none';
                setMessage(formStatus, '');

                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
            })
            .catch(function (error) {
                setMessage(formStatus, '');
                const message = error && error.name === 'AbortError'
                    ? 'Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.'
                    : 'Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
                setMessage(formError, message);
                setSubmitButtonLoadingState(submitButton, false, submitButtonHtml);
            });
    }

    function initializeContactForm() {
        const serviceField = document.querySelector(SELECTORS.serviceField);
        if (serviceField) {
            serviceField.addEventListener('change', updateServiceDependentFields);
            preselectServiceFromQuery();
            updateServiceDependentFields();
        }

        const contactForm = document.querySelector(SELECTORS.contactForm);
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        initializeMobileMenuClone();
        initializeMobileMenuArrows();
        initializeDesktopSubmenuToggle();
        initializeMenuBarPopup();
        initializeBannerSlider();
        initializeContactForm();
    });
})();
