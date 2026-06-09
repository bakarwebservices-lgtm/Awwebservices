/* AW Web Services — Premium Interactions */
(function () {
    'use strict';

    const PAGES = ['home', 'services', 'portfolio', 'about', 'contact'];
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

    function finishPreloader() {
        const preloader = document.getElementById('preloader');
        document.body.classList.remove('is-loading');

        gsap.to(preloader, {
            opacity: 0, duration: 0.8, ease: 'power3.inOut',
            onComplete: () => {
                preloader.classList.add('is-done');
                initHeroAnimation();
                initScrollAnimations(document.getElementById('page-home'));
                animateCounters(document.getElementById('page-home'));
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
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        });

        function animateRing() {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
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

        gsap.to('.hero__img', {
            scale: 1, duration: 2, ease: 'power2.out'
        });
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
    window.navigate = function (page) {
        if (page === currentPage || isTransitioning) return;
        isTransitioning = true;

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
            currentEl.classList.remove('is-active');
            nextEl.classList.add('is-active');
            currentPage = page;

            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger && currentEl.contains(st.trigger)) st.kill();
            });

            if (lenis) lenis.scrollTo(0, { immediate: true });

            initScrollAnimations(nextEl);
            if (page === 'about') animateCounters(nextEl);

            gsap.set(nextEl.querySelectorAll('.page-hero__title, .page-hero__desc, .eyebrow'), {
                opacity: 0, y: 30
            });
        })
        .to(curtain, {
            scaleY: 0, transformOrigin: 'top', duration: 0.5, ease: 'power4.inOut'
        })
        .to(nextEl.querySelectorAll('.eyebrow, .page-hero__title, .page-hero__desc'), {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
        }, '-=0.2');
    };

    function updateNavActive(page) {
        document.querySelectorAll('.header__nav a[data-page]').forEach(a => {
            a.classList.toggle('is-active', a.dataset.page === page);
        });
    }

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
        const span = btn.querySelector('span');
        const orig = span.textContent;

        const data = Object.fromEntries(new FormData(form));
        span.textContent = 'Sending...';

        let body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0A`;
        if (data.phone) body += `Phone: ${data.phone}%0D%0A`;
        body += `Service: ${data.service}%0D%0A`;
        if (data.budget) body += `Budget: ${data.budget}%0D%0A`;
        body += `%0D%0AMessage:%0D%0A${data.message}`;

        setTimeout(() => {
            window.location.href = `mailto:bakarwebservices@gmail.com?subject=${encodeURIComponent('Quote Request: ' + data.service)}&body=${body}`;
            span.textContent = orig;
        }, 800);
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

    /* ── Init ── */
    document.body.classList.add('is-loading');
    gsap.registerPlugin(ScrollTrigger);

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
