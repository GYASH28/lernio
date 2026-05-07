/* ============================================================
   INTRO — Cinematic Opening Splash Screen Animation
   ============================================================ */
const IntroAnimation = {
    play() {
        const splash = document.getElementById('splash-screen');
        if (!splash) return;
        const finish = () => {
            splash.style.pointerEvents = 'none';
            splash.style.display = 'none';
            const particles = document.getElementById('splash-particles');
            if (particles) particles.innerHTML = '';
        };

        // Respect reduced motion setting
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
            (window.Store && Store.getSettings && Store.getSettings().reducedMotion) ||
            !window.gsap) {
            finish();
            return;
        }
        const safetyTimer = setTimeout(finish, 4500);

        const tl = gsap.timeline({
            onComplete: () => {
                clearTimeout(safetyTimer);
                finish();
            }
        });

        // Generate Particles dynamically based on screen size
        this.generateParticles();

        // 1. Initial Reset
        gsap.set('.splash-glow', { opacity: 0, scale: 0.8 });
        gsap.set('.splash-logo-container', { scale: 0.85, opacity: 0 });
        gsap.set('.splash-text', { y: 20, opacity: 0, scale: 0.95 });
        gsap.set('.splash-subtext', { y: 10, opacity: 0 });
        gsap.set('.splash-progress', { opacity: 0 });
        gsap.set('.splash-particle', { opacity: 0, y: window.innerHeight });

        // 2. ENTRY (0s - 0.6s)
        tl.to('.splash-glow', { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0);
        
        // 3. LOGO REVEAL (0.2s - 1.2s)
        tl.to('.splash-logo-container', { scale: 1, opacity: 1, duration: 1, ease: 'expo.out' }, 0.2);
        
        // Continuous subtle float on logo (Parallax effect)
        gsap.to('.splash-logo-container', { y: -8, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        // 4. IMMERSION (0.8s - 2.8s)
        tl.to('.splash-text', { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }, 0.6)
          .to('.splash-subtext', { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.8)
          .to('.splash-progress', { opacity: 1, duration: 0.3 }, 0.9)
          .to('.splash-progress-bar', { width: '100%', duration: 1.5, ease: 'power1.inOut' }, 0.9);
        
        // Animate particles shooting up
        tl.to('.splash-particle', {
            y: -150, 
            opacity: (i, el) => parseFloat(el.dataset.opacity),
            duration: (i, el) => parseFloat(el.dataset.duration),
            ease: 'power1.out',
            stagger: 0.03
        }, 0.8);

        // 5. TRANSITION (2.5s - 3.2s)
        // Zoom-fade cinematic transition out of the splash screen
        tl.to('.splash-content', { scale: 1.15, opacity: 0, duration: 0.7, ease: 'power3.inOut' }, 2.5)
          .to('.splash-glow', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 2.5)
          .to(splash, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 2.7);

        // Skip logic
        let skipped = false;
        splash.addEventListener('click', () => {
            if (skipped) return;
            skipped = true;
            // Fast fade out transition
            gsap.to(splash, { opacity: 0, duration: 0.25, ease: 'power2.out', onComplete: () => {
                tl.progress(1); // Force timeline to completion
            }});
        });
    },

    generateParticles() {
        const container = document.getElementById('splash-particles');
        if (!container) return;
        
        // Mobile optimization: Less particles on smaller screens
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 12 : 30;
        
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'splash-particle';
            
            // Random properties for natural feel
            const left = Math.random() * 100;
            const duration = 1.8 + Math.random() * 2; // Slow elegant movement
            const opacity = 0.2 + Math.random() * 0.4;
            
            p.style.left = `${left}%`;
            p.dataset.duration = duration;
            p.dataset.opacity = opacity;
            
            // Add subtle blur/scale for depth
            if (Math.random() > 0.5) {
                p.style.filter = `blur(${Math.random() * 2}px)`;
                p.style.transform = `scale(${0.6 + Math.random()})`;
            }
            
            container.appendChild(p);
        }
    }
};

window.IntroAnimation = IntroAnimation;
