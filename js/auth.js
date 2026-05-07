/* Firebase Authentication System */
const Auth = {
    user: null,
    token: null,
    isLoginMode: true,
    isInitialized: false,
    isReady: false,
    readyPromise: null,
    _resolveReady: null,

    init() {
        if (this.isInitialized) return this.readyPromise;
        this.isInitialized = true;
        this.readyPromise = new Promise(resolve => { this._resolveReady = resolve; });

        if (!window.firebaseAuth) {
            this.isReady = true;
            this.updateUI();
            this._resolveReady();
            return this.readyPromise;
        }

        window.firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
                await this._setUser(user);
                this.hideAuthOverlay();
                if (window.App) await App.loadUserProgress();
            } else {
                this.user = null;
                this.token = null;
            }

            this.isReady = true;
            this.updateUI();
            this._resolveReady();
        }, (error) => {
            console.warn('Auth state failed:', error.message);
            this.user = null;
            this.token = null;
            this.isReady = true;
            this.updateUI();
            this._resolveReady();
        });

        return this.readyPromise;
    },

    async waitUntilReady() {
        if (!this.isInitialized) this.init();
        return this.readyPromise;
    },

    async _setUser(firebaseUser) {
        const name = firebaseUser.displayName || (firebaseUser.email || 'student').split('@')[0];
        this.token = await firebaseUser.getIdToken();
        this.user = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name,
            photoURL: firebaseUser.photoURL || '',
            role: 'student'
        };
        await this.ensureUserDoc(firebaseUser);
    },

    async ensureUserDoc(firebaseUser) {
        if (!window.firestoreDb || !firebaseUser) return;

        const ref = window.firestoreDb.collection('users').doc(firebaseUser.uid);
        const email = firebaseUser.email || '';
        const fallbackRole = 'student';

        try {
            const snap = await ref.get();
            if (!snap.exists) {
                await ref.set({
                    email,
                    name: firebaseUser.displayName || email.split('@')[0] || 'Student',
                    role: fallbackRole,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                this.user.role = fallbackRole;
                return;
            }

            const data = snap.data() || {};
            this.user.role = data.role || fallbackRole;
            await ref.set({
                email,
                name: firebaseUser.displayName || data.name || email.split('@')[0] || 'Student',
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.warn('Could not update user profile metadata:', error.message);
            this.user.role = fallbackRole;
        }
    },

    hasRole(...roles) {
        return !!this.user && roles.includes(this.user.role);
    },

    updateUI() {
        const isLoggedIn = !!this.user;
        const loginBtn = document.getElementById('nav-login-btn');
        const logoutBtn = document.getElementById('nav-logout-btn');
        const mobileLoginBtn = document.getElementById('nav-mobile-login-btn');
        const mobileLogoutBtn = document.getElementById('nav-mobile-logout-btn');

        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline-flex' : 'none';
        if (mobileLoginBtn) mobileLoginBtn.style.display = isLoggedIn ? 'none' : 'flex';
        if (mobileLogoutBtn) mobileLogoutBtn.style.display = isLoggedIn ? 'flex' : 'none';
    },

    requireAuth(callback) {
        if (this.user) {
            if (callback) callback();
        } else {
            this.showAuthOverlay();
            if (window.Utils) Utils.showToast('Please sign in to continue.', 'warning');
        }
    },

    showAuthOverlay() {
        const overlay = document.getElementById('auth-overlay');
        if (overlay) overlay.classList.add('active');
    },

    hideAuthOverlay() {
        // Ensure the login overlay is hidden on init to avoid auto‑show
        const overlay = document.getElementById('auth-overlay');
        if (overlay) overlay.classList.remove('active');
    },

    showError(message) {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) errorEl.innerText = message || '';
    },

    toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        document.getElementById('auth-title').innerText = this.isLoginMode ? 'Lernio AI' : 'Create Account';
        document.getElementById('auth-subtitle').innerText = this.isLoginMode ? 'Your AI-powered study companion' : 'Join Lernio and start learning today';
        document.getElementById('name-group').style.display = this.isLoginMode ? 'none' : 'block';
        document.getElementById('auth-submit-btn').innerHTML = this.isLoginMode ? 'Sign In <span>&rarr;</span>' : 'Sign Up <span>&rarr;</span>';
        
        const switchText = this.isLoginMode ? "Don't have an account? <a onclick='Auth.toggleMode()'>Sign Up</a>" : "Already have an account? <a onclick='Auth.toggleMode()'>Sign In</a>";
        document.getElementById('auth-switch-text').innerHTML = switchText;
        this.showError('');
    },

    _friendlyError(error) {
        if (!error) return 'Something went wrong. Please try again.';
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') return 'Invalid email or password.';
        if (error.code === 'auth/email-already-in-use') return 'Email is already registered.';
        if (error.code === 'auth/weak-password') return 'Password must be at least 6 characters.';
        if (error.code === 'auth/invalid-email') return 'Enter a valid email address.';
        if (error.code === 'auth/popup-closed-by-user') return 'Login cancelled.';
        if (error.code === 'auth/popup-blocked') return 'Popup blocked by browser. Please allow popups.';
        if (error.code === 'auth/network-request-failed') return 'Network error. Please check your connection.';
        return error.message || 'Something went wrong. Please try again.';
    },

    async handleSubmit(event) {
        event.preventDefault();
        if (!window.firebaseAuth) {
            this.showError('Login is temporarily unavailable. Please try again later.');
            return;
        }

        const email = (document.getElementById('auth-email').value || '').trim();
        const password = document.getElementById('auth-password').value || '';
        const name = (document.getElementById('auth-name').value || '').trim();
        const btn = document.getElementById('auth-submit-btn');
        
        this.showError('');

        if (!email || !password) {
            this.showError('Enter your email and password.');
            return;
        }
        if (!this.isLoginMode && password.length < 6) {
            this.showError('Password must be at least 6 characters.');
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<div class="loading-spinner" style="width:20px;height:20px;border-width:2px;"></div>';

        try {
            if (this.isLoginMode) {
                await window.firebaseAuth.signInWithEmailAndPassword(email, password);
                Utils.showToast('Signed in successfully.', 'success');
            } else {
                const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
                if (name) await userCredential.user.updateProfile({ displayName: name });
                await this.ensureUserDoc(userCredential.user);
                Utils.showToast('Account created successfully.', 'success');
            }
        } catch (error) {
            this.showError(this._friendlyError(error));
        } finally {
            btn.disabled = false;
            btn.innerHTML = this.isLoginMode ? 'Sign In <span>&rarr;</span>' : 'Sign Up <span>&rarr;</span>';
        }
    },

    async handleGoogleLogin() {
        if (!window.firebaseAuth || !window.googleProvider) {
            this.showError('Google login is temporarily unavailable.');
            return;
        }

        const btn = document.querySelector('.google-btn');
        this.showError('');
        if (btn) {
            btn.disabled = true;
            btn.dataset.originalText = btn.innerHTML;
            btn.textContent = 'Connecting...';
        }

        try {
            await window.firebaseAuth.signInWithPopup(window.googleProvider);
            Utils.showToast('Signed in with Google.', 'success');
        } catch (error) {
            this.showError(this._friendlyError(error));
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = btn.dataset.originalText || 'Continue with Google';
            }
        }
    },

    logout() {
        const modalId = 'logout-confirm-modal';
        if (document.getElementById(modalId)) return;
        
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'subject-modal-overlay open';
        modal.style.zIndex = '10000';
        modal.innerHTML = `
            <div class="subject-modal" style="max-width: 400px; text-align: center;" role="dialog" aria-modal="true" aria-label="Confirm logout">
                <h3 style="margin-bottom: var(--sp-4); color: var(--primary);">Confirm Logout</h3>
                <p style="color: var(--text-secondary); margin-bottom: var(--sp-6);">Are you sure you want to log out?</p>
                <div style="display: flex; gap: var(--sp-3); justify-content: center;">
                    <button class="btn btn-ghost" id="logout-cancel">Cancel</button>
                    <button class="btn btn-primary" id="logout-confirm" style="background: var(--danger); border: none;">Yes, Log Out</button>
                </div>
            </div>
        `;
        
        const close = () => {
            modal.remove();
            document.removeEventListener('keydown', esc);
        };
        const esc = (event) => { if (event.key === 'Escape') close(); };

        document.body.appendChild(modal);
        document.addEventListener('keydown', esc);
        modal.addEventListener('click', event => { if (event.target === modal) close(); });
        document.getElementById('logout-cancel').onclick = close;
        document.getElementById('logout-confirm').onclick = async () => {
            const btn = document.getElementById('logout-confirm');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Logging out...';
            }
            try {
                if (window.firebaseAuth) await window.firebaseAuth.signOut();
                Utils.showToast('Logged out successfully.', 'info');
                App.navigate('dashboard', false, true);
                close();
            } catch (error) {
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = 'Yes, Log Out';
                }
                Utils.showToast('Logout failed. Please try again.', 'error');
            }
        };
    }
};

window.Auth = Auth;
