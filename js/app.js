/* AW Web Services — Premium Interactions */
(function () {
    'use strict';

    const PAGES = [
        'home', 'services', 'portfolio', 'about', 'contact',
        'project-vortex-rings', 'project-attireburg', 'project-zn-enterprises',
        'project-css-kro', 'project-swift-logistics', 'project-apex-consulting'
    ];
    let currentPage = 'home';
    let lenis = null;
    let isTransitioning = false;
    let countersDone = new Set();

    /* ── Preloader ── */
    function runPreloader() {
        const preloader = document.getElementById('preloader');
        const fill = document.getElementById('preloaderFill');
        const pct = document.getElementById('preloaderPct');
        let progress = 0;

        const tick = () => {
            progress += Math.random() * 12 + 4;
            if (progress > 100) progress = 100;
            fill.style.width = progress + '%';
            pct.textContent = Math.floor(progress) + '%';
            if (progress < 100) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(finishPreloader, 400);
            }
        };
        requestAnimationFrame(tick);
    }

    function checkInitialHash() {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;
        let targetPage = hash;
        if (hash === 'vortex-rings') targetPage = 'project-vortex-rings';
        if (hash === 'attireburg') targetPage = 'project-attireburg';
        if (hash === 'zn-enterprises') targetPage = 'project-zn-enterprises';
        if (hash === 'css-kro') targetPage = 'project-css-kro';
        if (hash === 'swift-logistics') targetPage = 'project-swift-logistics';
        if (hash === 'apex-consulting') targetPage = 'project-apex-consulting';

        if (PAGES.includes(targetPage) && targetPage !== 'home') {
            const homeEl = document.getElementById('page-home');
            const nextEl = document.getElementById('page-' + targetPage);
            if (homeEl && nextEl) {
                homeEl.classList.remove('is-active');
                nextEl.classList.add('is-active');
                currentPage = targetPage;
                updateNavActive(targetPage);
            }
        }
    }

    function finishPreloader() {
        const preloader = document.getElementById('preloader');
        document.body.classList.remove('is-loading');

        checkInitialHash();

        gsap.to(preloader, {
            opacity: 0, duration: 0.8, ease: 'power3.inOut',
            onComplete: () => {
                preloader.classList.add('is-done');
                const activeEl = document.getElementById('page-' + currentPage) || document.getElementById('page-home');
                initHeroAnimation();
                initScrollAnimations(activeEl);
                if (currentPage === 'home' || currentPage === 'about') animateCounters(activeEl);
            }
        });
    }

    /* ── Lenis Smooth Scroll ── */
    function initLenis() {
        lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        lenis.on('scroll', (e) => {
            ScrollTrigger.update();
            updateScrollProgress(e.scroll);
        });

        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    function updateScrollProgress(scroll) {
        const el = document.getElementById('scrollProgress');
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (scroll / max) * 100 : 0;
        el.style.width = pct + '%';
    }

    /* ── Header scroll state ── */
    function initHeader() {
        const header = document.getElementById('header');
        ScrollTrigger.create({
            start: 80,
            onUpdate: (self) => header.classList.toggle('is-scrolled', self.scroll() > 80)
        });
    }

    /* ── Custom Cursor ── */
    function initCursor() {
        if (window.matchMedia('(max-width: 768px)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const cursor = document.getElementById('cursor');
        const dot = cursor.querySelector('.cursor__dot');
        const ring = cursor.querySelector('.cursor__ring');
        document.body.classList.add('no-cursor');

        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        });

        function animateRing() {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(animateRing);
        }
        animateRing();

        document.querySelectorAll('a, button, [data-magnetic], input, textarea, select').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('is-hover');
                if (el.dataset.cursor === 'link' || el.tagName === 'A') cursor.classList.add('is-link');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-hover', 'is-link');
            });
        });
    }

    /* ── Magnetic Buttons ── */
    function initMagnetic() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
            });
        });
    }

    /* ── 3D Tilt ── */
    function initTilt() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(card, {
                    rotateY: x * 8, rotateX: -y * 8,
                    transformPerspective: 800, duration: 0.4, ease: 'power2.out'
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
            });
        });
    }

    /* ── Hero Animation ── */
    function initHeroAnimation() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8 })
          .to('.hero__title .word', {
              opacity: 1, y: 0, duration: 0.9, stagger: 0.06
          }, '-=0.4')
          .to('.hero__desc', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
          .to('.hero__actions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
          .to('.stat-card', {
              opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)'
          }, '-=0.4')
          .to('.hero__scroll', { opacity: 1, duration: 0.6 }, '-=0.3');

        gsap.fromTo('.hero__video-block', 
            { opacity: 0, scale: 0.92, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
    }

    /* ── Scroll Reveals ── */
    function initScrollAnimations(container) {
        if (!container) return;

        container.querySelectorAll('.gs-reveal').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        ScrollTrigger.refresh();
    }

    /* ── Counters ── */
    function animateCounters(container) {
        if (!container || countersDone.has(container.id)) return;

        container.querySelectorAll('[data-count]').forEach(el => {
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const decimals = parseInt(el.dataset.decimals) || 0;

            ScrollTrigger.create({
                trigger: el,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: target, duration: 2.2, ease: 'power2.out',
                        onUpdate: function () {
                            const v = this.targets()[0].val;
                            el.textContent = (decimals ? v.toFixed(decimals) : Math.floor(v)) + suffix;
                        }
                    });
                }
            });
        });

        countersDone.add(container.id);
    }

    /* ── Page Navigation ── */
    window.navigate = function (page, skipHashUpdate) {
        if (!document.getElementById('page-' + page)) return;
        if (page === currentPage || isTransitioning) return;
        isTransitioning = true;

        if (!skipHashUpdate) {
            if (history.pushState) {
                history.pushState(null, null, '#' + page);
            } else {
                location.hash = '#' + page;
            }
        }

        const curtain = document.getElementById('pageCurtain');
        const currentEl = document.getElementById('page-' + currentPage);
        const nextEl = document.getElementById('page-' + page);

        closeMobileMenu();
        updateNavActive(page);

        const tl = gsap.timeline({
            onComplete: () => { isTransitioning = false; }
        });

        tl.to(curtain, {
            scaleY: 1, transformOrigin: 'bottom', duration: 0.5, ease: 'power4.inOut'
        })
        .add(() => {
            if (currentEl) currentEl.classList.remove('is-active');
            nextEl.classList.add('is-active');
            currentPage = page;

            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger && currentEl && currentEl.contains(st.trigger)) st.kill();
            });

            if (lenis) lenis.scrollTo(0, { immediate: true });

            initScrollAnimations(nextEl);
            if (page === 'about') animateCounters(nextEl);

            gsap.set(nextEl.querySelectorAll('.page-hero__title, .page-hero__desc, .eyebrow, .cs-hero__title, .cs-hero__tagline'), {
                opacity: 0, y: 30
            });
        })
        .to(curtain, {
            scaleY: 0, transformOrigin: 'top', duration: 0.5, ease: 'power4.inOut'
        })
        .to(nextEl.querySelectorAll('.eyebrow, .page-hero__title, .page-hero__desc, .cs-hero__title, .cs-hero__tagline'), {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
        }, '-=0.2');
    };

    function updateNavActive(page) {
        const activeTarget = page.startsWith('project-') ? 'portfolio' : page;
        document.querySelectorAll('.header__nav a[data-page]').forEach(a => {
            a.classList.toggle('is-active', a.dataset.page === activeTarget);
        });
    }

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '') || 'home';
        let targetPage = hash;
        if (hash === 'vortex-rings') targetPage = 'project-vortex-rings';
        if (hash === 'attireburg') targetPage = 'project-attireburg';
        if (hash === 'zn-enterprises') targetPage = 'project-zn-enterprises';
        if (hash === 'css-kro') targetPage = 'project-css-kro';
        if (hash === 'swift-logistics') targetPage = 'project-swift-logistics';
        if (hash === 'apex-consulting') targetPage = 'project-apex-consulting';
        if (PAGES.includes(targetPage) && targetPage !== currentPage) {
            window.navigate(targetPage, true);
        }
    });

    /* ── Mobile Menu ── */
    function initMobileMenu() {
        const burger = document.getElementById('burger');
        const menu = document.getElementById('mobileMenu');

        burger.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            burger.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
    }

    function closeMobileMenu() {
        document.getElementById('mobileMenu').classList.remove('is-open');
        document.getElementById('burger').classList.remove('is-open');
        document.body.style.overflow = '';
    }

    /* ── Contact Form ── */
    window.handleSubmit = function (e) {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('button[type="submit"]');
        const span = btn ? btn.querySelector('span') : null;
        const orig = span ? span.textContent : 'Send Message';

        const data = Object.fromEntries(new FormData(form));
        if (span) span.textContent = 'Generating Quote Request...';

        let bodyText = `Name: ${data.name || ''}\nEmail: ${data.email || ''}\n`;
        if (data.phone) bodyText += `Phone: ${data.phone}\n`;
        if (data.service) bodyText += `Service Requested: ${data.service}\n`;
        if (data.budget) bodyText += `Estimated Budget: ${data.budget}\n`;
        bodyText += `\nProject Details:\n${data.message || ''}`;

        const subject = `Quote Request: ${data.service || 'New Project'} (${data.name || 'Client'})`;
        const mailtoUrl = `mailto:bakarwebservices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

        // Synchronous trigger to preserve browser user activation
        window.location.href = mailtoUrl;

        // Render on-page UI feedback box
        let feedback = document.getElementById('formFeedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'formFeedback';
            feedback.className = 'form-feedback';
            form.appendChild(feedback);
        }

        feedback.innerHTML = `
            <div class="form-feedback__inner">
                <span class="form-feedback__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                <div>
                    <strong>Quote Request Generated!</strong>
                    <p>Thank you! Your project details have been formatted for instant submission.</p>
                </div>
            </div>
        `;

        setTimeout(() => {
            if (span) span.textContent = orig;
            form.reset();
        }, 1000);
    };

    /* ── Work Scroll Drag ── */
    function initWorkScroll() {
        const track = document.querySelector('.work-scroll__track');
        const container = document.getElementById('workScroll');
        if (!track || !container) return;

        let isDown = false, startX, scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.style.cursor = 'grabbing';
        });
        container.addEventListener('mouseleave', () => { isDown = false; container.style.cursor = ''; });
        container.addEventListener('mouseup', () => { isDown = false; container.style.cursor = ''; });
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            container.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });
    }

    /* ── Theme Toggle ── */
    function initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        });
    }

    /* ── Init ── */
    document.body.classList.add('is-loading');
    gsap.registerPlugin(ScrollTrigger);

    initThemeToggle();
    runPreloader();
    initLenis();
    initHeader();
    initCursor();
    initMagnetic();
    initTilt();
    initMobileMenu();
    initWorkScroll();

    window.addEventListener('resize', () => ScrollTrigger.refresh());

})();
