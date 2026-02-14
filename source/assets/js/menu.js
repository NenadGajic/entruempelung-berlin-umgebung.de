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
    };

    const SLIDE_DURATION_MS = 300;
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

    document.addEventListener('DOMContentLoaded', function () {
        initializeMobileMenuClone();
        initializeMobileMenuArrows();
        initializeDesktopSubmenuToggle();
        initializeMenuBarPopup();
    });
})();
