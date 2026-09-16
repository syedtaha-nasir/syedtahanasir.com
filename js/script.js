/* =========================================================
   Taha SEO - Common Site JavaScript
   Shared across all website pages
   ========================================================= */

(function () {
    'use strict';


    /* =====================================================
       MOBILE MENU
       Runs only on pages containing the site navigation
       ===================================================== */

    function initMobileMenu() {

        const navContainer = document.querySelector('.nav-container');
        const mainNav = document.querySelector('.main-nav');
        const triggers = document.querySelectorAll('.mega-trigger');

        // Page does not contain the required navigation
        if (!navContainer || !mainNav || triggers.length === 0) {
            return;
        }

        // Prevent creating the hamburger more than once
        if (navContainer.querySelector('.hamburger-btn')) {
            return;
        }


        /* ---------------------------------------------
           Create Hamburger Button
           --------------------------------------------- */

        const hamburger = document.createElement('button');

        hamburger.className = 'hamburger-btn';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        hamburger.setAttribute('aria-label', 'Toggle Menu');
        hamburger.setAttribute('type', 'button');

        navContainer.appendChild(hamburger);


        /* ---------------------------------------------
           Helper: Close Mobile Menu
           --------------------------------------------- */

        function closeMenu() {

            hamburger.classList.remove('active');

            mainNav.classList.remove('open');
            mainNav.classList.remove('is-submenu-open');

            triggers.forEach(function (trigger) {
                trigger.classList.remove('is-open');
            });

        }


        /* ---------------------------------------------
           Hamburger Click
           --------------------------------------------- */

        hamburger.addEventListener('click', function (e) {

            e.stopPropagation();

            this.classList.toggle('active');
            mainNav.classList.toggle('open');

            // Return to main menu whenever menu opens
            mainNav.classList.remove('is-submenu-open');

            triggers.forEach(function (trigger) {
                trigger.classList.remove('is-open');
            });

        });


        /* ---------------------------------------------
           Mega Menu / Sub-menu Setup
           --------------------------------------------- */

        triggers.forEach(function (trigger) {

            const label = trigger.querySelector('.trigger-label');
            const dropdown = trigger.querySelector('.mega-dropdown');

            if (!label || !dropdown) {
                return;
            }

            const inner = dropdown.querySelector('.mega-inner');


            /* Create Back Button */

            const backBtn = document.createElement('div');

            backBtn.className = 'mobile-back-btn';
            backBtn.innerHTML = '← Back to Main Menu';


            /* Insert Back Button */

            if (inner) {
                inner.insertBefore(backBtn, inner.firstChild);
            } else {
                dropdown.insertBefore(backBtn, dropdown.firstChild);
            }


            /* -----------------------------------------
               Parent Category Click
               ----------------------------------------- */

            label.addEventListener('click', function (e) {

                if (window.matchMedia('(max-width: 992px)').matches) {

                    e.preventDefault();
                    e.stopPropagation();

                    triggers.forEach(function (item) {
                        item.classList.remove('is-open');
                    });

                    trigger.classList.add('is-open');

                    mainNav.classList.add('is-submenu-open');

                    mainNav.scrollTop = 0;

                }

            });


            /* -----------------------------------------
               Back Button
               ----------------------------------------- */

            backBtn.addEventListener('click', function (e) {

                e.preventDefault();
                e.stopPropagation();

                trigger.classList.remove('is-open');

                mainNav.classList.remove('is-submenu-open');

            });

        });


        /* ---------------------------------------------
           Final Link Click
           --------------------------------------------- */

        mainNav.querySelectorAll('a').forEach(function (link) {

            link.addEventListener('click', function () {

                if (window.matchMedia('(max-width: 992px)').matches) {
                    closeMenu();
                }

            });

        });


        /* ---------------------------------------------
           Click Outside Menu
           --------------------------------------------- */

        document.addEventListener('click', function (e) {

            if (
                mainNav.classList.contains('open') &&
                !mainNav.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                closeMenu();
            }

        });


        /* ---------------------------------------------
           Reset Menu When Returning To Desktop
           --------------------------------------------- */

        window.addEventListener('resize', function () {

            if (!window.matchMedia('(max-width: 992px)').matches) {
                closeMenu();
            }

        });

    }


    /* =====================================================
       SITE PRELOADER
       Runs only when #site-preloader exists
       ===================================================== */

    function initPreloader() {

        const loader = document.getElementById('site-preloader');

        if (!loader) {
            return;
        }

        function hideLoader() {

            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';

            setTimeout(function () {
                loader.style.display = 'none';
            }, 500);

        }

        // If page has already finished loading
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader, {
                once: true
            });
        }

    }


    /* =====================================================
       INITIALIZE COMMON SITE FEATURES
       ===================================================== */

    function initCommonScripts() {

        initMobileMenu();
        initPreloader();

    }


    /* =====================================================
       START
       ===================================================== */

    if (document.readyState === 'loading') {

        document.addEventListener(
            'DOMContentLoaded',
            initCommonScripts,
            { once: true }
        );

    } else {

        initCommonScripts();

    }

})();
