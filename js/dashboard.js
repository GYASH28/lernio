/* Dashboard renderer */
const Dashboard = {
    _driveLoading: false,
    _driveLastAttempt: 0,

    _loadDriveNotes() {
        if (!window.DriveNotes || DriveNotes.hasFreshCache()) return;
        const now = Date.now();
        if (this._driveLoading || now - this._driveLastAttempt < 5 * 60 * 1000) return;

        this._driveLoading = true;
        this._driveLastAttempt = now;
        DriveNotes.load()
            .then(() => {
                if (window.App && App.currentPage === 'dashboard') this.render();
            })
            .catch(error => {
                console.warn('Drive notes unavailable on dashboard:', error.message || error);
            })
            .finally(() => {
                this._driveLoading = false;
            });
    },

    render() {
        this._loadDriveNotes();

        const el = document.getElementById('page-dashboard');
        const code = Store.getActiveSubject();
        const subject = SubjectRegistry.get(code);
        const perf = Store.getPerformance(code);
        const streak = Store.getStreak();
        const attempts = Store.getAttemptsBySubject(code).slice(0, 3);
        const lastUnit = Store.getLastUnit(code);
        const unitData = subject ? SubjectRegistry.getUnit(code, lastUnit) : null;

        let weakTopics = [];
        if (perf && perf.unitStats) {
            weakTopics = Object.entries(perf.unitStats)
                .map(([u, s]) => ({ unit: u, pct: s.total ? Math.round((s.correct / s.total) * 100) : 0 }))
                .filter(t => t.pct < 70)
                .sort((a, b) => a.pct - b.pct)
                .slice(0, 3);
        }

        const readiness = perf ? perf.avgScore : 0;
        const readinessColor = readiness >= 80 ? 'var(--success)' : readiness >= 50 ? 'var(--warning)' : 'var(--danger)';

        if (
            window.Auth && Auth.user &&
            window.SemesterHub &&
            window.SemestersConfig &&
            Object.keys(SemesterHub._progressCache).length === 0
        ) {
            SemesterHub.calculateProgress(window.SemestersConfig).then(() => Dashboard.render());
        }

        el.innerHTML = `
        <div class="dashboard-welcome glass-card">
            <h1 class="text-gradient">${window.Auth && Auth.user ? 'Welcome Back, ' + Auth.user.name : 'Welcome to Lernio AI'}</h1>
            <p class="welcome-sub">${window.Auth && Auth.user ? 'Continue your ' + (subject ? subject.name : 'study') + ' journey. You have a ' + streak + '-day study streak.' : 'Your AI-powered study companion. Browse notes freely or sign in to unlock quizzes and analytics.'}</p>
        </div>

        <h3 style="margin-bottom:var(--sp-4)">Your Semester Overview</h3>
        <div class="subject-cards-row" style="margin-bottom: var(--sp-6);">
            ${(window.SemestersConfig || []).map(sem => {
                const prog = window.SemesterHub && SemesterHub._progressCache ? (SemesterHub._progressCache[sem.id] || 0) : 0;
                return `<div class="glass-card action-card glass-card-interactive" onclick="App.navigate('notes')" style="padding: var(--sp-3); cursor: pointer; border-bottom: 3px solid ${sem.color}">
                    <h4 style="margin:0; font-size: 1rem; color: ${sem.isUnlocked ? sem.color : 'var(--text-muted)'}">${sem.isUnlocked ? sem.name : 'Locked ' + sem.name}</h4>
                    <div class="progress-bar" style="margin-top:var(--sp-2); height: 4px; background: rgba(255,255,255,0.1)">
                        <div class="progress-fill" style="width:${prog}%; background: ${sem.color}"></div>
                    </div>
                </div>`;
            }).join('')}
        </div>

        <h3 style="margin-bottom:var(--sp-4)">Semester Subjects</h3>
        <div class="subject-cards-row" style="grid-template-columns: 1fr; gap: var(--sp-3);">
            ${(window.SemestersConfig || []).filter(sem => sem.isUnlocked).map(sem => {
                const examCodes = new Set(['EC101', 'EE101', 'CS102']);
                const examSubjects = (sem.subjects || []).filter(sub => examCodes.has(sub.code));
                if (!examSubjects.length) return '';
                return `<div style="margin-bottom: var(--sp-4);">
                    <h4 style="color: ${sem.color}; margin-bottom: var(--sp-3); font-size: 0.95rem; display:flex; align-items:center; gap: var(--sp-2);">
                        ${sem.name} - ${sem.subtitle}
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--sp-3);">
                    ${examSubjects.map(sub => {
                        const staticCount = window.SubjectMapping ? SubjectMapping.getPlatformCount(sub.code) : 0;
                        const driveCount = window.DriveNotes ? DriveNotes.getPlatformCount(sub.code) : 0;
                        const noteCount = staticCount + driveCount;
                        const hasQuiz = window.SubjectMapping && SubjectMapping.hasQuiz(sub.code);
                        const hasNotes = noteCount > 0;
                        return `<div class="glass-card glass-card-interactive" onclick="SemesterNotes.render('${sem.id}', '${sub.code}')" 
                                     style="padding: var(--sp-3); cursor:pointer; border-left: 3px solid ${sem.color}; display:flex; align-items:center; gap:var(--sp-3);"
                                     onkeydown="if(event.key==='Enter') SemesterNotes.render('${sem.id}', '${sub.code}')"
                                     tabindex="0">
                            <span style="font-size:1.4rem">${sub.icon}</span>
                            <div style="flex:1; min-width:0;">
                                <div style="font-weight:600; font-size:0.88rem;">${sub.name}</div>
                                <div class="text-xs text-muted">${sub.code} - ${sub.credits} Credits</div>
                            </div>
                            <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;" onclick="event.stopPropagation()">
                                ${hasNotes ? `<button class="btn btn-ghost btn-sm" style="padding:4px 8px; font-size:0.7rem;" onclick="SemesterNotes.render('${sem.id}', '${sub.code}')">Notes</button>` : ''}
                                ${hasQuiz ? `<button class="btn btn-primary btn-sm" style="padding:4px 8px; font-size:0.7rem;" onclick="Store.setActiveSubject('${sub.code}'); App.navigate('quiz', false, true);">Quiz</button>` : ''}
                            </div>
                        </div>`;
                    }).join('')}
                    </div>
                </div>`;
            }).join('')}
        </div>

        <h3 style="margin-bottom:var(--sp-4)">Quick Actions</h3>
        <div class="quick-actions">
            <div class="glass-card action-card glass-card-interactive" onclick="App.navigate('notes')">
                <div class="action-icon">📖</div>
                <h3>Continue Learning</h3>
                <p>${unitData ? 'Resume: Unit ' + lastUnit + ' - ' + unitData.title : 'Start studying'}</p>
            </div>
            <div class="glass-card action-card glass-card-interactive" onclick="App.navigate('quiz')">
                <div class="action-icon">📝</div>
                <h3>Quick Quiz</h3>
                <p>${window.Auth && Auth.user ? 'Test yourself with a fast quiz' : '🔒 Sign in to take quizzes'}</p>
            </div>
            <div class="glass-card action-card glass-card-interactive" onclick="App.navigate('quiz')">
                <div class="action-icon">🎯</div>
                <h3>Adaptive Revision</h3>
                <p>${window.Auth && Auth.user ? 'AI targets your weak areas' : '🔒 Sign in to access'}</p>
            </div>
            <div class="glass-card action-card glass-card-interactive" onclick="App.navigate('chat')">
                <div class="action-icon">🤖</div>
                <h3>Ask AI Tutor</h3>
                <p>Get instant explanations</p>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="glass-card readiness-meter">
                <h3>Exam Readiness</h3>
                <div class="meter-value" style="color:${readinessColor}">${readiness}%</div>
                <div class="meter-label">${readiness >= 80 ? 'You are exam ready.' : readiness >= 50 ? 'Getting there, keep practicing.' : 'More practice is needed.'}</div>
                <div class="progress-bar" style="margin-top:var(--sp-3);height:8px"><div class="progress-fill" style="width:${readiness}%"></div></div>
            </div>

            <div class="glass-card weak-topics-card">
                <h3 style="margin-bottom:var(--sp-4)">Weak Areas</h3>
                ${weakTopics.length > 0 ? weakTopics.map(t => `
                    <div class="weak-topic-item">
                        <div class="topic-dot" style="background:${t.pct < 40 ? 'var(--danger)' : 'var(--warning)'}"></div>
                        <span class="topic-name">${t.unit}</span>
                        <span class="badge badge-${t.pct < 40 ? 'danger' : 'warning'}">${t.pct}%</span>
                    </div>`).join('') : '<div class="empty-state"><p class="text-sm text-muted">Take a quiz to see your weak areas.</p></div>'}
            </div>

            <div class="glass-card recent-activity full-width">
                <h3 style="margin-bottom:var(--sp-4)">Recent Activity</h3>
                ${attempts.length > 0 ? attempts.map(a => `
                    <div class="activity-item">
                        <div class="activity-icon">${a.pct >= 80 ? '🌟' : a.pct >= 50 ? '📝' : '📚'}</div>
                        <div class="activity-info">
                            <div class="activity-title">${a.mode || 'Practice'} Quiz - ${a.unitLabel || 'All Units'}</div>
                            <div class="activity-meta">${Utils.formatDate(a.date)}</div>
                        </div>
                        <div class="activity-score" style="color:${a.pct >= 70 ? 'var(--success)' : 'var(--warning)'}">${a.pct}%</div>
                    </div>`).join('') : '<div class="empty-state"><p class="text-sm text-muted">No quizzes taken yet. Start one.</p></div>'}
            </div>
        </div>`;

        requestAnimationFrame(() => {
            if (Store.getSettings().reducedMotion) return;

            gsap.fromTo('.dashboard-welcome',
                { opacity: 0, y: 40, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out' }
            );
            gsap.fromTo('.dashboard-welcome h1',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, delay: 0.15 }
            );
            gsap.fromTo('.welcome-sub',
                { opacity: 0 },
                { opacity: 1, duration: 0.4, delay: 0.3 }
            );

            gsap.fromTo(gsap.utils.toArray('#page-dashboard h3'),
                { opacity: 0, x: -16 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );

            gsap.fromTo('.action-card',
                { opacity: 0, y: 30, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.07, delay: 0.45 }
            );

            gsap.fromTo('.readiness-meter, .weak-topics-card, .recent-activity',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1, delay: 0.55 }
            );

            const meterEl = document.querySelector('.meter-value');
            if (meterEl) {
                const realVal = parseInt(meterEl.textContent, 10);
                gsap.to({ val: 0 }, {
                    val: realVal,
                    duration: 1.2,
                    ease: 'power2.out',
                    delay: 0.8,
                    onUpdate: function () { meterEl.textContent = Math.round(this.targets()[0].val) + '%'; }
                });
            }

            document.querySelectorAll('#page-dashboard .progress-fill').forEach(progressEl => {
                const target = progressEl.style.width;
                progressEl.style.width = '0%';
                gsap.to(progressEl, { width: target, duration: 1, ease: 'expo.out', delay: 0.9 });
            });

            gsap.fromTo('.activity-item',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, delay: 0.7 }
            );

            document.querySelectorAll('.glass-card-interactive:not([data-gsap-hover])').forEach(card => {
                card.setAttribute('data-gsap-hover', 'true');

                card.addEventListener('mousemove', (e) => {
                    if (Store.getSettings().reducedMotion) return;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -8;
                    const rotateY = ((x - centerX) / centerX) * 8;

                    gsap.to(card, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        z: 30,
                        transformPerspective: 1000,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(99, 102, 241, 0.4)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseenter', () => {
                    if (Store.getSettings().reducedMotion) {
                        gsap.to(card, { y: -4, duration: 0.2 });
                        return;
                    }
                    gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
                });

                card.addEventListener('mouseleave', () => {
                    if (Store.getSettings().reducedMotion) {
                        gsap.to(card, { y: 0, duration: 0.2 });
                        return;
                    }
                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        scale: 1,
                        clearProps: 'boxShadow',
                        duration: 0.6,
                        ease: 'expo.out'
                    });
                });
            });
        });
    }
};

window.Dashboard = Dashboard;
