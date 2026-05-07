/* ============================================================
   THREE.JS MANAGER — Enhanced 3D Backgrounds & UI Elements
   ============================================================
   PERFORMANCE TUNING GUIDE:
   - Reduce PARTICLE_COUNT (line ~38) if frame rate drops
   - Reduce SHAPE_COUNT (line ~40) for low-end GPUs
   - Set antialias: false in bgRenderer for extra fps
   - Lower pixel ratio cap from 2 to 1.5
   ============================================================ */

const ThreeScene = {
    // --- Refs ---
    bgScene: null,
    bgCamera: null,
    bgRenderer: null,
    particles: null,
    particlePositions: null,
    shapes: [],

    orbScene: null,
    orbCamera: null,
    orbRenderer: null,
    orbMesh: null,
    orbEdges: null,
    orbNodes: [],
    orbLight: null,

    // --- Mouse / Parallax ---
    mouseX: 0,
    mouseY: 0,
    camTargetX: 0,
    camTargetY: 0,

    // --- State ---
    isAiThinking: false,
    isActive: true,
    isOrbHovered: false,
    animationFrameId: null,
    clock: null,

    // --- Config ---
    isMobile: window.innerWidth < 768,
    reducedMotion: false,

    init() {
        if (!window.THREE) { console.warn('Three.js not loaded'); return; }

        this.reducedMotion =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
            (window.Store && Store.getSettings && Store.getSettings().reducedMotion);

        if (this.reducedMotion) { this.isActive = false; return; }

        this.clock = new THREE.Clock();
        this.initBackground();
        this.initAiOrb();

        // Mouse tracking (desktop)
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Device orientation (mobile parallax fallback)
        if (this.isMobile && window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                if (e.gamma !== null) this.mouseX = THREE.MathUtils.clamp(e.gamma / 45, -1, 1);
                if (e.beta  !== null) this.mouseY = THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1);
            }, { passive: true });
        }

        // AI orb hover speed-up
        const orbCanvas = document.getElementById('ai-orb-canvas');
        if (orbCanvas) {
            orbCanvas.addEventListener('mouseenter', () => { this.isOrbHovered = true; });
            orbCanvas.addEventListener('mouseleave', () => { this.isOrbHovered = false; });
        }

        // Debounced resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.onResize(), 150);
        });

        // Visibility
        document.addEventListener('visibilitychange', () => {
            this.isActive = document.visibilityState === 'visible';
            if (this.isActive) { this.clock.getDelta(); this.animate(); }
        });

        this.animate();
    },

    /* =========================================================
       BACKGROUND SCENE — Shapes + Particles + Parallax
       ========================================================= */
    initBackground() {
        const canvas = document.getElementById('three-bg-canvas');
        if (!canvas) return;

        this.bgScene = new THREE.Scene();
        this.bgScene.fog = new THREE.FogExp2(0x050510, 0.012);

        this.bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.bgCamera.position.z = 30;

        this.bgRenderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance'
        });
        this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1 : 2));
        this.bgRenderer.setSize(window.innerWidth, window.innerHeight);

        // --- Lights ---
        this.bgScene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 8, 5);
        this.bgScene.add(dirLight);

        // --- Particles ---
        const pCount = this.isMobile ? 150 : 400;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        const pVel = new Float32Array(pCount); // Y velocity per particle

        for (let i = 0; i < pCount; i++) {
            pPos[i * 3]     = (Math.random() - 0.5) * 80;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
            pVel[i] = Math.random() * 0.015 + 0.005;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        this.particlePositions = pPos;
        this._particleVelocities = pVel;
        this._particleCount = pCount;

        const pMat = new THREE.PointsMaterial({
            color: 0x8ec5fc,
            size: this.isMobile ? 0.08 : 0.12,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        this.particles = new THREE.Points(pGeo, pMat);
        this.bgScene.add(this.particles);

        // --- Floating Geometric Shapes ---
        const palette = [0x4f8ef7, 0x9b59b6, 0x00d4ff, 0x6366f1, 0xa855f7, 0x14b8a6];
        const geos = [
            new THREE.IcosahedronGeometry(1.8, 0),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TorusGeometry(1.2, 0.4, 8, 16),
            new THREE.DodecahedronGeometry(1.4, 0),
            new THREE.TetrahedronGeometry(1.3, 0),
            new THREE.IcosahedronGeometry(1.0, 1),
            new THREE.TorusGeometry(0.9, 0.35, 6, 12),
            new THREE.OctahedronGeometry(1.2, 0)
        ];

        const shapeCount = this.isMobile ? 3 : 7;
        for (let i = 0; i < shapeCount; i++) {
            const color = palette[i % palette.length];
            const mat = new THREE.MeshBasicMaterial({
                color,
                wireframe: true,
                transparent: true,
                opacity: 0.15 + Math.random() * 0.2
            });
            const mesh = new THREE.Mesh(geos[i % geos.length], mat);

            mesh.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 25,
                -(Math.random() * 6 + 2)
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            mesh.userData = {
                rx: (Math.random() - 0.5) * 0.008,
                ry: (Math.random() - 0.5) * 0.006,
                rz: (Math.random() - 0.5) * 0.004,
                floatAmp: Math.random() * 1.5 + 0.5,
                floatSpeed: Math.random() * 0.4 + 0.2,
                initX: mesh.position.x,
                initY: mesh.position.y
            };
            this.shapes.push(mesh);
            this.bgScene.add(mesh);
        }
    },

    /* =========================================================
       AI ORB — Neural Network Style Sphere
       ========================================================= */
    initAiOrb() {
        const canvas = document.getElementById('ai-orb-canvas');
        if (!canvas) return;

        this.orbScene = new THREE.Scene();
        this.orbCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        this.orbCamera.position.z = 4;

        this.orbRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.orbRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.orbRenderer.setSize(40, 40);

        // Core icosahedron (neural-network look)
        const geo = new THREE.IcosahedronGeometry(1.2, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xa855f7,
            emissive: 0x3b0764,
            emissiveIntensity: 0.6,
            flatShading: true,
            roughness: 0.4,
            metalness: 0.8,
            wireframe: false
        });
        this.orbMesh = new THREE.Mesh(geo, mat);
        this.orbScene.add(this.orbMesh);

        // Wireframe overlay (edges)
        const edgeMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe, wireframe: true, transparent: true, opacity: 0.35 });
        this.orbEdges = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28, 1), edgeMat);
        this.orbScene.add(this.orbEdges);

        // Node dots at vertices
        const positions = geo.getAttribute('position');
        const nodeGeo = new THREE.SphereGeometry(0.06, 4, 4);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const seen = new Set();
        for (let i = 0; i < positions.count; i++) {
            const key = `${positions.getX(i).toFixed(2)},${positions.getY(i).toFixed(2)},${positions.getZ(i).toFixed(2)}`;
            if (seen.has(key)) continue;
            seen.add(key);
            const node = new THREE.Mesh(nodeGeo, nodeMat);
            node.position.set(positions.getX(i), positions.getY(i), positions.getZ(i));
            this.orbMesh.add(node);
            this.orbNodes.push(node);
        }

        // Lights
        this.orbScene.add(new THREE.AmbientLight(0xffffff, 0.3));
        this.orbLight = new THREE.PointLight(0xd8b4fe, 2, 10);
        this.orbLight.position.set(2, 2, 2);
        this.orbScene.add(this.orbLight);
    },

    setAiThinking(isThinking) {
        this.isAiThinking = isThinking;
        if (this.orbMesh && window.gsap) {
            if (isThinking) {
                gsap.to(this.orbMesh.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
                gsap.to(this.orbMesh.material, { emissiveIntensity: 1.5, duration: 0.4, yoyo: true, repeat: -1 });
            } else {
                gsap.killTweensOf(this.orbMesh.scale);
                gsap.killTweensOf(this.orbMesh.material);
                gsap.to(this.orbMesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'power2.out' });
                gsap.to(this.orbMesh.material, { emissiveIntensity: 0.6, duration: 0.5 });
            }
        }
    },

    /* =========================================================
       RESIZE
       ========================================================= */
    onResize() {
        this.isMobile = window.innerWidth < 768;
        if (this.bgCamera && this.bgRenderer) {
            this.bgCamera.aspect = window.innerWidth / window.innerHeight;
            this.bgCamera.updateProjectionMatrix();
            this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
            this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1 : 2));
        }
    },

    /* =========================================================
       ANIMATION LOOP
       ========================================================= */
    animate() {
        if (!this.isActive) return;
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        const time = this.clock ? this.clock.getElapsedTime() : Date.now() * 0.001;

        // === Background ===
        if (this.bgRenderer && this.bgScene && this.bgCamera) {
            // Smooth mouse parallax (lerp)
            this.camTargetX += (this.mouseX * 5 - this.camTargetX) * 0.04;
            this.camTargetY += (this.mouseY * 3 - this.camTargetY) * 0.04;
            this.bgCamera.position.x = this.camTargetX;
            this.bgCamera.position.y = this.camTargetY;
            // Subtle camera tilt (max ±5°)
            this.bgCamera.rotation.y = this.camTargetX * 0.015;
            this.bgCamera.rotation.x = -this.camTargetY * 0.015;
            this.bgCamera.lookAt(0, 0, 0);

            // Particle drift (upward + sideways loop)
            if (this.particles) {
                const pos = this.particlePositions;
                const vel = this._particleVelocities;
                for (let i = 0; i < this._particleCount; i++) {
                    pos[i * 3 + 1] += vel[i];               // rise
                    pos[i * 3]     += Math.sin(time + i) * 0.002; // sway
                    if (pos[i * 3 + 1] > 30) {
                        pos[i * 3 + 1] = -30;
                        pos[i * 3]     = (Math.random() - 0.5) * 80;
                    }
                }
                this.particles.geometry.attributes.position.needsUpdate = true;
            }

            // Shape rotation + float
            this.shapes.forEach((s, i) => {
                const d = s.userData;
                s.rotation.x += d.rx;
                s.rotation.y += d.ry;
                s.rotation.z += d.rz;
                s.position.y = d.initY + Math.sin(time * d.floatSpeed + i * 1.2) * d.floatAmp;
                s.position.x = d.initX + Math.cos(time * d.floatSpeed * 0.7 + i) * 0.5;
            });

            this.bgRenderer.render(this.bgScene, this.bgCamera);
        }

        // === AI Orb ===
        if (this.orbRenderer && this.orbMesh) {
            const baseSpeed = this.isOrbHovered ? 0.04 : (this.isAiThinking ? 0.05 : 0.012);
            this.orbMesh.rotation.y += baseSpeed;
            this.orbMesh.rotation.x += baseSpeed * 0.5;
            if (this.orbEdges) {
                this.orbEdges.rotation.y = this.orbMesh.rotation.y;
                this.orbEdges.rotation.x = this.orbMesh.rotation.x;
            }
            // Subtle bob
            if (!this.isAiThinking) {
                this.orbMesh.position.y = Math.sin(time * 2.5) * 0.1;
                if (this.orbEdges) this.orbEdges.position.y = this.orbMesh.position.y;
            }
            this.orbRenderer.render(this.orbScene, this.orbCamera);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => { ThreeScene.init(); });
window.ThreeScene = ThreeScene;
