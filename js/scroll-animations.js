/* ============================================================
   SCROLL ANIMATIONS — Native Intersection Observer System
   ============================================================
   PERFORMANCE TUNING:
   - Increase threshold (line ~20) for later triggers
   - Increase stagger delay for fewer concurrent animations
   - Disable parallax on low-end by setting PARALLAX_ENABLED=false
   ============================================================ */

const ScrollFX = {
    PARALLAX_ENABLED: true,
    reducedMotion: false,
    observer: null,
    progressBar: null,

    init() {
        this.reducedMotion =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            (window.Store && Store.getSettings && Store.getSettings().reducedMotion);

        this.createProgressBar();
        if (this.reducedMotion) {
            // Force-remove any scroll-hidden classes that were added before this init
            document.querySelectorAll('.scroll-hidden').forEach(el => {
                el.classList.remove('scroll-hidden');
                el.classList.add('scroll-visible');
            });
            return;
        }

        this.setupScrollReveal();
        this.setupProgressBar();
        if (this.PARALLAX_ENABLED && !this.isMobile()) this.setupParallax();
    },

    isMobile() { return window.innerWidth < 768; },

    /* ----- Scroll Progress Bar (top of viewport) ----- */
    createProgressBar() {
        if (document.getElementById('scroll-progress-bar')) return;
        const bar = document.createElement('div');
        bar.id = 'scroll-progress-bar';
        bar.setAttribute('aria-hidden', 'true');
        document.body.prepend(bar);
        this.progressBar = bar;
    },

    setupProgressBar() {
        const bar = this.progressBar;
        if (!bar) return;
        const update = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    },

    /* ----- Global Scroll Reveal ----- */
    setupScrollReveal() {
        // Mark all elements with data-animate as hidden initially
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('scroll-hidden');
        });

        // Also mark dynamically added elements (via MutationObserver)
        this._mutObs = new MutationObserver(muts => {
            muts.forEach(m => m.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;
                if (node.hasAttribute && node.hasAttribute('data-animate')) {
                    node.classList.add('scroll-hidden');
                    this.observer.observe(node);
                }
                // Also check children
                if (node.querySelectorAll) {
                    node.querySelectorAll('[data-animate]').forEach(child => {
                        child.classList.add('scroll-hidden');
                        this.observer.observe(child);
                    });
                }
            }));
        });
        this._mutObs.observe(document.body, { childList: true, subtree: true });

        // Create Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const animType = el.getAttribute('data-animate');

                if (animType === 'stagger') {
                    // Stagger children
                    const children = el.children;
                    Array.from(children).forEach((child, i) => {
                        child.style.transitionDelay = (i * 100) + 'ms';
                        child.classList.add('scroll-visible');
                    });
                    el.classList.add('scroll-visible');
                } else {
                    el.classList.add('scroll-visible');
                }

                this.observer.unobserve(el); // once
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

        // Observe all existing [data-animate] elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    },

    /* ----- Counter Animation (count up from 0) ----- */
    animateCounter(el, target, duration = 1500) {
        if (this.reducedMotion) { el.textContent = target; return; }
        const start = performance.now();
        const easeOutQuad = t => t * (2 - t);

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.round(easeOutQuad(progress) * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    },

    /* ----- Progress Bar Width Animation ----- */
    animateProgressBar(el) {
        if (this.reducedMotion) return;
        const target = el.style.width || el.getAttribute('data-width');
        el.style.width = '0%';
        el.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
        requestAnimationFrame(() => { el.style.width = target; });
    },

    /* ----- Parallax Sections ----- */
    setupParallax() {
        const parallaxEls = document.querySelectorAll('[data-parallax]');
        if (!parallaxEls.length) return;

        const onScroll = () => {
            const scrollY = window.scrollY;
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.4;
                const rect = el.getBoundingClientRect();
                const offset = (rect.top + scrollY) * speed;
                el.style.backgroundPositionY = -(scrollY - offset) * 0.3 + 'px';
            });
            requestAnimationFrame(onScroll);
        };
        requestAnimationFrame(onScroll);
    },

    /* ----- Re-scan (call after dynamic content renders) ----- */
    refresh() {
        if (this.reducedMotion) {
            // In reduced motion mode, ensure any dynamically added data-animate elements are visible
            document.querySelectorAll('[data-animate].scroll-hidden').forEach(el => {
                el.classList.remove('scroll-hidden');
                el.classList.add('scroll-visible');
            });
            return;
        }
        if (!this.observer) return;
        document.querySelectorAll('[data-animate]:not(.scroll-visible)').forEach(el => {
            if (!el.classList.contains('scroll-hidden')) el.classList.add('scroll-hidden');
            this.observer.observe(el);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => { ScrollFX.init(); });
window.ScrollFX = ScrollFX;
