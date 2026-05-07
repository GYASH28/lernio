/* ============================================================
   INTERACTIONS — Cursor, Magnetic Buttons, Particles, Glow, Ripple
   ============================================================
   PERFORMANCE TUNING:
   - Disable custom cursor: set ENABLE_CURSOR = false
   - Reduce click particle count: lower BURST_COUNT (line ~24)
   - Disable magnetic buttons: set ENABLE_MAGNETIC = false
   ============================================================ */

const Interactions = {
    // Feature toggles
    ENABLE_CURSOR: true,
    ENABLE_MAGNETIC: true,
    ENABLE_CLICK_PARTICLES: true,
    ENABLE_GLOW_CARDS: true,
    ENABLE_RIPPLE: true,

    // Config
    BURST_COUNT: 14,
    reducedMotion: false,
    isTouch: false,

    // Cursor refs
    cursorDot: null,
    cursorRing: null,
    cursorX: 0,
    cursorY: 0,
    ringX: 0,
    ringY: 0,
    isHovering: false,

    // Click particle canvas
    particleCanvas: null,
    particleCtx: null,
    clickParticles: [],

    init() {
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.reducedMotion =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            (window.Store && Store.getSettings && Store.getSettings().reducedMotion);

        if (this.reducedMotion) return;

        if (this.ENABLE_CURSOR && !this.isTouch) this.initCursor();
        if (this.ENABLE_MAGNETIC && !this.isTouch) this.initMagneticButtons();
        if (this.ENABLE_CLICK_PARTICLES) this.initClickParticles();
        if (this.ENABLE_GLOW_CARDS) this.initGlowCards();
        if (this.ENABLE_RIPPLE) this.initRipple();
    },

    /* =========================================================
       CUSTOM CURSOR
       ========================================================= */
    initCursor() {
        // Create cursor elements
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'ix-cursor-dot';
        this.cursorDot.setAttribute('aria-hidden', 'true');

        this.cursorRing = document.createElement('div');
        this.cursorRing.className = 'ix-cursor-ring';
        this.cursorRing.setAttribute('aria-hidden', 'true');

        document.body.appendChild(this.cursorDot);
        document.body.appendChild(this.cursorRing);
        document.body.classList.add('ix-custom-cursor');

        // Track mouse
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            // Dot follows instantly
            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
        });

        // Hover detection for interactive elements
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, [role="button"], .glass-card-interactive, input, select, textarea, .un-action-btn, .un-chip, .nav-btn');
            if (target) {
                this.isHovering = true;
                this.cursorDot.classList.add('hovering');
                this.cursorRing.classList.add('hovering');
            }
        });
        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, [role="button"], .glass-card-interactive, input, select, textarea, .un-action-btn, .un-chip, .nav-btn');
            if (target) {
                this.isHovering = false;
                this.cursorDot.classList.remove('hovering');
                this.cursorRing.classList.remove('hovering');
            }
        });

        // Click burst animation
        document.addEventListener('mousedown', () => {
            this.cursorRing.classList.add('clicking');
        });
        document.addEventListener('mouseup', () => {
            setTimeout(() => this.cursorRing.classList.remove('clicking'), 200);
        });

        // Ring follows with lerp
        const animateRing = () => {
            this.ringX += (this.cursorX - this.ringX) * 0.12;
            this.ringY += (this.cursorY - this.ringY) * 0.12;
            this.cursorRing.style.left = this.ringX + 'px';
            this.cursorRing.style.top = this.ringY + 'px';
            requestAnimationFrame(animateRing);
        };
        requestAnimationFrame(animateRing);
    },

    /* =========================================================
       MAGNETIC BUTTONS
       ========================================================= */
    initMagneticButtons() {
        // Attach to primary CTAs — re-scan periodically for dynamic content
        const attach = () => {
            document.querySelectorAll('.btn-primary, .btn-add-notes, .auth-btn, .un-upload-btn').forEach(btn => {
                if (btn._magneticBound) return;
                btn._magneticBound = true;
                btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';

                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const bx = rect.left + rect.width / 2;
                    const by = rect.top + rect.height / 2;
                    const dx = e.clientX - bx;
                    const dy = e.clientY - by;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 60) {
                        const moveX = dx * 0.35;
                        const moveY = dy * 0.35;
                        btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
                        // Inner text parallax
                        const inner = btn.querySelector('span, .btn-text');
                        if (inner) inner.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
                    }
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = '';
                    const inner = btn.querySelector('span, .btn-text');
                    if (inner) inner.style.transform = '';
                });
            });
        };

        attach();
        // Re-scan on page changes
        const mo = new MutationObserver(() => { clearTimeout(this._magTimer); this._magTimer = setTimeout(attach, 200); });
        mo.observe(document.body, { childList: true, subtree: true });
    },

    /* =========================================================
       CLICK PARTICLE BURST
       ========================================================= */
    initClickParticles() {
        this.particleCanvas = document.createElement('canvas');
        this.particleCanvas.className = 'ix-particle-canvas';
        this.particleCanvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(this.particleCanvas);
        this.particleCtx = this.particleCanvas.getContext('2d');

        const resize = () => {
            this.particleCanvas.width = window.innerWidth;
            this.particleCanvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Spawn particles on click (only on "empty" areas)
        document.addEventListener('click', (e) => {
            const t = e.target;
            if (t.closest('a, button, input, select, textarea, [role="button"], .glass-card-interactive, .un-card')) return;
            this.burstAt(e.clientX, e.clientY);
        });

        // Animation loop
        const loop = () => {
            const ctx = this.particleCtx;
            ctx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

            this.clickParticles = this.clickParticles.filter(p => {
                p.life -= 0.016;
                if (p.life <= 0) return false;

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15; // gravity
                p.size *= 0.97;
                const alpha = Math.max(0, p.life / p.maxLife);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace('1)', alpha + ')');
                ctx.fill();
                return true;
            });

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    },

    burstAt(x, y) {
        // Get current accent color from CSS var
        const cs = getComputedStyle(document.documentElement);
        const colors = [
            'rgba(79,142,247,1)',
            'rgba(155,89,182,1)',
            'rgba(0,212,255,1)',
            'rgba(99,102,241,1)'
        ];

        for (let i = 0; i < this.BURST_COUNT; i++) {
            const angle = (Math.PI * 2 / this.BURST_COUNT) * i + (Math.random() - 0.5) * 0.4;
            const speed = Math.random() * 4 + 2;
            this.clickParticles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 4 + 3,
                life: 0.6,
                maxLife: 0.6,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    },

    /* =========================================================
       GLOW-FOLLOW CARDS
       ========================================================= */
    initGlowCards() {
        const attach = () => {
            document.querySelectorAll('.glass-card, .un-card, .subject-select-card, .action-card').forEach(card => {
                if (card._glowBound) return;
                card._glowBound = true;
                card.classList.add('ix-glow-card');

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
                    card.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
                    card.classList.add('ix-glow-active');
                });
                card.addEventListener('mouseleave', () => {
                    card.classList.remove('ix-glow-active');
                });
            });
        };

        attach();
        const mo = new MutationObserver(() => { clearTimeout(this._glowTimer); this._glowTimer = setTimeout(attach, 200); });
        mo.observe(document.body, { childList: true, subtree: true });
    },

    /* =========================================================
       RIPPLE EFFECT ON BUTTONS
       ========================================================= */
    initRipple() {
        document.addEventListener('mousedown', (e) => {
            const btn = e.target.closest('button, .btn, .nav-btn, .nav-mobile-btn');
            if (!btn) return;

            // Ensure relative positioning for the ripple span
            const pos = getComputedStyle(btn).position;
            if (pos === 'static') btn.style.position = 'relative';
            btn.style.overflow = 'hidden';

            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ix-ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
            btn.appendChild(ripple);

            ripple.addEventListener('animationend', () => ripple.remove());
        });
    }
};

document.addEventListener('DOMContentLoaded', () => { Interactions.init(); });
window.Interactions = Interactions;
