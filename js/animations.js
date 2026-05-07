/* ============================================================
   GSAP Animations System
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// 14. REDUCED MOTION SAFETY NET
// Respect prefers-reduced-motion at OS level
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(20); // Run all animations near-instantly
}

// Also respect the app's own setting
const _origInit = App.init.bind(App);
App.init = function() {
    _origInit();
    if (Store.getSettings().reducedMotion) {
        gsap.globalTimeline.timeScale(20);
    }
};

// 2. PAGE TRANSITION SYSTEM
const AnimationSystem = {
    pageTransition(pageId) {
        const el = document.getElementById('page-' + pageId);
        if (!el) return;
        
        if (Store.getSettings().reducedMotion) {
            // Ensure the page is fully visible even without animation
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
            return;
        }
        
        // Kill existing scroll triggers before entering a new page
        ScrollTrigger.getAll().forEach(t => t.kill());
        
        gsap.fromTo(el,
            { opacity: 0, y: 24, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'expo.out', clearProps: 'filter' }
        );
    }
};
window.AnimationSystem = AnimationSystem;

document.addEventListener('DOMContentLoaded', () => {
    if (Store.getSettings().reducedMotion) {
        // Ensure all initial elements are visible immediately
        document.querySelectorAll('.app-header, .header-logo, .header-subject-pill, .nav-btn, .nav-mobile-btn, #page-dashboard, .ambient-bg, .ambient-blob-3').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // 1. APP BOOT SEQUENCE
    // 1a. Ambient background entrance
    gsap.fromTo('.ambient-bg', 
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }
    );
    gsap.fromTo('.ambient-blob-3', 
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out', delay: 0.4 }
    );

    // 1b. Header entrance
    const headerTl = gsap.timeline({ delay: 0.1 });
    headerTl
        .fromTo('.app-header', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' })
        .fromTo('.header-logo', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.4')
        .fromTo('.header-subject-pill', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.2')
        .fromTo('.nav-btn, .nav-mobile-btn', { y: -20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, ease: 'power3.out' }, '-=0.3');

    // 1c. Page container first render (default dashboard)
    gsap.fromTo('#page-dashboard',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.5 }
    );

    // 11. NAVIGATION BUTTON INTERACTIONS (Once on boot)
    document.querySelectorAll('.nav-btn, .nav-mobile-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gsap.fromTo(btn, { scale: 0.88 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
        });
    });

    // 12. SCROLL-BASED EFFECTS (Global setup)
    // 12a. Stat cards and chart cards scroll entrance
    ScrollTrigger.batch('.stat-card, .chart-card, .glass-card:not(.notes-content-card)', {
        onEnter: batch => gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'expo.out', clearProps: 'transform' }
        ),
        once: true,
        start: 'top 90%'
    });

    // 12b. Section headers
    ScrollTrigger.batch('.section-header', {
        onEnter: batch => gsap.fromTo(batch,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' }
        ),
        once: true
    });

    // 13a. Loading spinner rotation override
    const spinnerObserver = new MutationObserver(mutations => {
        mutations.forEach(m => m.addedNodes.forEach(node => {
            if (node.classList?.contains('loading-spinner')) {
                gsap.to(node, { rotation: 360, duration: 0.6, repeat: -1, ease: 'linear' });
            }
        }));
    });
    spinnerObserver.observe(document.body, { childList: true, subtree: true });

    // 13b. Accordion interaction
    document.addEventListener('click', e => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;
        const item = header.closest('.accordion-item');
        const body = item.querySelector('.accordion-body');
        
        if (Store.getSettings().reducedMotion) {
            item.classList.toggle('open');
            return;
        }

        if (item.classList.contains('open')) {
            gsap.to(body, { height: 0, padding: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => item.classList.remove('open') });
        } else {
            item.classList.add('open');
            gsap.fromTo(body, { height: 0 }, { height: 'auto', paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-4)', duration: 0.35, ease: 'expo.out' });
        }
    });
});
