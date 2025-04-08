(function ($) {
    "use strict";

    ///=============  * Theme Loader  =============\\\
    function themeLoader() {
        $('.theme-loader').hide();
    }

    ///=============  * Mobile Menu  =============\\\
    document.addEventListener("DOMContentLoaded", function() {
        var mobileMenu = document.getElementById("mobilemenu");
        var mainMenu = document.querySelector(".vertical_menu");
        var clonedMenu = mobileMenu.cloneNode(true);
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

    ///=============  * Search Icon Popup  =============\\\
    function searchIconPopup() {
        $(".header__area-menubar-center-search-icon.open, .header__area-menubar-right-search-icon.open").on("click", function () {
            $(".header__area-menubar-center-search-box, .header__area-menubar-right-search-box")
                .fadeIn()
                .addClass("active");
        });

        $(".header__area-menubar-center-search-box-icon, .header__area-menubar-right-search-box-icon").on("click", function () {
            $(this).fadeIn().removeClass("active");
        });

        $(".header__area-menubar-center-search-box-icon i, .header__area-menubar-right-search-box-icon i").on("click", function () {
            $(".header__area-menubar-center-search-box, .header__area-menubar-right-search-box")
                .fadeOut()
                .removeClass("active");
        });
    }

    ///=============  * Sidebar Popup  =============\\\
    function sidebarPopup() {
        $(document).on("click", ".header__area-menubar-right-sidebar-icon", function () {
            $('.header__area-menubar-right-sidebar-popup').addClass('active');
            $('.sidebar-overlay').addClass('show');
        });

        $(document).on("click", ".header__area-menubar-right-sidebar-popup .sidebar-close-btn", function () {
            $('.header__area-menubar-right-sidebar-popup').removeClass('active');
            $('.sidebar-overlay').removeClass('show');
        });
    }

    ///=============  * CounterUp  =============\\\
    function counterUp() {
        var counter = $('.counter');
        counter.counterUp({
            time: 2500,
            delay: 100
        });
    }

    ///============= * Skill Bar  =============\\\
    function skillBar() {
        if($('.skill__area-item-bar').length) {
            $('.skill__area-item-bar').appear(function() {
                var el = $(this);
                var percent = el.data('width');
                $(el).css('width', percent + '%');
            }, {
                accY: 0
            });
        }
    }

    ///=============  * Video Popup  =============\\\
    function videoPopup() {
        $('.video-popup').magnificPopup({
            type: 'iframe'
        });
    }

    ///=============  * Banner Slider  =============\\\
    function bannerSlider() {
        let sliderActive1 = '.banner-slider';
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

    ///=============  * Blog Slider  =============\\\
    function blogSlider() {
        var swiper = new Swiper(".blog_slider", {
            loop: true,
            spaceBetween: 25,
            speed: 800,
            autoplay: {
                delay: 4000,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".blog-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
                1600: {
                    slidesPerView: 3,
                },
            },
        });
    }

    ///=============  * Portfolio Slider  =============\\\
    function portfolioTwoSlider() {
        var swiper = new Swiper(".portfolio_two_slider", {
            loop: true,
            spaceBetween: 25,
            centeredSlides: "true",
            speed: 800,
            autoplay: {
                delay: 4000,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: '.portfolio-button-prev',
                nextEl: '.portfolio-button-next',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 2,
                },
                1600: {
                    slidesPerView: 4,
                },
            },
        });
    }

    ///=============  * Pricing Plan  =============\\\
    function pricingPlan() {
        $(document).ready(function(){
            $('.pricing__plan-btn-item, .features__area-btn-item').on("click", function(){
                $('.pricing__plan-btn-item, .features__area-btn-item').removeClass('active');
                $(this).addClass('active');
                var tabId = $(this).data('tag');
                $('.pricing__plan-content-item, .features__area-content-item').removeClass('active').addClass('d-none');
                $('#'+tabId).addClass('active').removeClass('d-none');
            });
        });
    }

    ///=============  * Achievements  =============\\\
    function achievements() {
        $(document).ready(function () {
            $('.award_item').mouseenter(function() {
                $('.award_item').removeClass('active');
                $(this).addClass('active');
            });
        });
    }

    ///=============  * Testimonial Slider  =============\\\
    function testimonialSlider() {
        var swiper = new Swiper(".testimonial_slide", {
            spaceBetween: 25,
            centeredSlides: true,
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 4000,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.testimonial_next',
                prevEl: '.testimonial_prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1.4,
                },
                1025: {
                    slidesPerView: 2.4,
                },
                1600: {
                    slidesPerView: 2.5,
                },
            },
        });
    }

    ///=============  * Team Slider  =============\\\
    function teamSlider() {
        var swiper = new Swiper(".team_slider", {
            loop: true,
            spaceBetween: 25,
            speed: 800,
            autoplay: {
                delay: 4000,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                700: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            },
        });
    }

    ///=============  * Portfolio Filter  =============\\\
    function portfolioFilter() {
        $(window).on('load', function(){
            var $grid = $('.gallery__area-active').isotope();
            $('.gallery__area-button').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            $('.gallery__area-button').on('click', 'button', function () {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
    }

    ///=============  * Dark & Light Switch  =============\\\
    function darkLightSwitch() {
        $('.switch__tab-open').on('click', function () {
            $(this).hide();
            $('.switch__tab-close').show();
            $('.switch__tab-icon').css('right', '260px');
            $('.switch__tab-area').css({
                'right': '0',
            });
        });
        $('.switch__tab-close').on('click', function () {
            $(this).hide();
            $('.switch__tab-open').show();
            $('.switch__tab-icon').css('right', '0');
            $('.switch__tab-area').css({
                'right': '-260px',
            });
        });
        $('.type-dark-mode button').on('click', function (e) {
            $(this).addClass('active').siblings().removeClass('active');
            var themeDark = $('.type-dark-mode button.active').attr('data-mode');
            if (themeDark == 'dark-mode') {
                $('body').addClass('dark-mode');
            } else {
                $('body').removeClass('dark-mode');
            }
        });
    }

    ///=============  * Custom Cursor  =============\\\
    function customCursor() {
        var ball = document.getElementById("cursor-ball");
        var cursorText = document.getElementById("cursor-text");
        var hoverAreas = document.querySelectorAll('.data_cursor');
        var lastHoveredElement = null;
        var mouseX = 0, mouseY = 0;
        var ballX = 0, ballY = 0;
        var speed = 0.1;
        function updateCursor() {
            ballX += (mouseX - ballX) * speed;
            ballY += (mouseY - ballY) * speed;
            ball.style.left = ballX + "px";
            ball.style.top = ballY + "px";
            cursorText.style.left = ballX + "px";
            cursorText.style.top = ballY + "px";
            if (lastHoveredElement === null) {
                ball.style.display = 'block';
                ball.style.height = "12px";
                ball.style.width = "12px";
                cursorText.style.opacity = '0';
            }
            requestAnimationFrame(updateCursor);
        }
        function handleMouseMove(e) {
            var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            mouseX = e.clientX + scrollX;
            mouseY = e.clientY + scrollY;
        }
        function handleHoverEnter(e) {
            cursorText.innerHTML = e.target.getAttribute('data-cursor-text');
            cursorText.style.opacity = '1';
            ball.style.height = "90px";
            ball.style.width = "90px";
            lastHoveredElement = e.target;
        }
        function handleHoverLeave(e) {
            cursorText.style.opacity = '0';
            ball.style.display = 'block';
            lastHoveredElement = null;
        }
        document.addEventListener('mousemove', handleMouseMove);
        hoverAreas.forEach(function (elem) {
            elem.addEventListener('mouseenter', handleHoverEnter);
            elem.addEventListener('mouseleave', handleHoverLeave);
        });
        updateCursor();
        $(document).ready(function () {
            toggleCursor($('#cursor_style button.active').data('cursor'));
            $('#cursor_style button').on('click', function () {
                $('#cursor_style button').removeClass('active');
                $(this).addClass('active');
                toggleCursor($(this).data('cursor'));
            });
            function toggleCursor(value) {
                if (value == 2) {
                    $('.hide').fadeOut();
                    $('.cursor').removeClass('yes').addClass('no');
                } else {
                    $('.hide').fadeIn();
                    $('.cursor').removeClass('no').addClass('yes');
                }
            }
        });
    }

    ///=============  * Scroll To Top  =============\\\
    function scrollToTop() {
        var scrollPath = document.querySelector('.scroll-up path');
        var pathLength = scrollPath.getTotalLength();
        scrollPath.style.transition = scrollPath.style.WebkitTransition = 'none';
        scrollPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        scrollPath.style.strokeDashoffset = pathLength;
        scrollPath.getBoundingClientRect();
        scrollPath.style.transition = scrollPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updatescroll = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var scroll = pathLength - (scroll * pathLength / height);
            scrollPath.style.strokeDashoffset = scroll;
        }
        updatescroll();
        $(window).scroll(updatescroll);
        var offset = 50;
        var duration = 950;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.scroll-up').addClass('active-scroll');
            } else {
                jQuery('.scroll-up').removeClass('active-scroll');
            }
        });
        jQuery('.scroll-up').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }
    
    $(document).ready(function () {
        themeLoader();
        menuBarPopup();
        searchIconPopup();
        sidebarPopup();
        counterUp();
        skillBar();
        videoPopup();
        bannerSlider();
        blogSlider();
        portfolioTwoSlider();
        pricingPlan();
        achievements();
        teamSlider();
        testimonialSlider();
        portfolioFilter();
        darkLightSwitch();
        customCursor();
        scrollToTop();
    });
})(jQuery);