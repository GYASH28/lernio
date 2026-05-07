/* Main entry point for semester notes */
const SemesterHub = {
    _progressCache: {},

    async render() {
        if (window.SemesterNotes) {
            SemesterNotes.currentSemId = null;
            SemesterNotes.currentSubCode = null;
        }
        if (window.App) App.updateHeader();

        const el = document.getElementById('page-notes');
        if (!el) return;

        el.innerHTML = `
            <div class="section-header">
                <h2>Academic Semesters</h2>
                <p>Browse notes, assignments, and materials by semester</p>
            </div>
            
            <div class="upload-notes-controls" style="margin-bottom: var(--sp-4);">
                <div class="un-search-wrap" style="max-width: 100%; position: relative;">
                    <span class="un-search-icon">Search</span>
                    <input class="un-search-input" id="global-note-search" placeholder="Search notes across all semesters..." 
                           oninput="SemesterSearch.onSearchInput(this.value)"
                           onkeypress="if(event.key==='Enter') SemesterSearch.execute(this.value)" aria-label="Global search">
                    <button class="btn btn-ghost btn-sm" id="search-clear-btn" onclick="SemesterSearch.clearSearch()" 
                            style="position:absolute; right:80px; top:50%; transform:translateY(-50%); display:none; font-size:0.9rem; padding:2px 6px;">Clear</button>
                    <button class="btn btn-primary btn-sm" onclick="SemesterSearch.execute(document.getElementById('global-note-search').value)" style="margin-left: 8px">Search</button>
                    <button class="btn btn-secondary btn-sm" id="drive-sync-global-btn" onclick="SemesterHub.syncDriveNotes()" style="margin-left: 8px">Sync from Google Drive</button>
                </div>
                <div id="drive-sync-global-status" style="display:none;margin-top:var(--sp-2);font-size:0.82rem;color:var(--text-secondary);"></div>
            </div>

            <div class="semester-hub-grid" id="semester-grid">
                ${Array(6).fill(`<div class="semester-card" style="background: var(--glass-bg)"><div class="un-skeleton-body"><div class="un-skeleton-line wide"></div><div class="un-skeleton-line narrow"></div></div></div>`).join('')}
            </div>
            
            <button class="fab-btn" onclick="SemesterNotes.openUploadModal()" aria-label="Upload Note" title="Upload Note">+</button>
        `;

        await this.loadSemesters();
    },

    _showDriveStatus(message = '') {
        const status = document.getElementById('drive-sync-global-status');
        if (!status) return;
        status.textContent = message;
        status.style.display = message ? 'block' : 'none';
    },

    async syncDriveNotes() {
        if (!window.DriveNotes) return;
        const btn = document.getElementById('drive-sync-global-btn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Syncing...';
        }

        try {
            await DriveNotes.load({ force: true });
            this._showDriveStatus('');
            Utils.showToast('Google Drive notes synced.', 'success');
        } catch (error) {
            console.warn('Global Drive sync failed:', error.message || error);
            this._showDriveStatus(DriveNotes.friendlyError());
            Utils.showToast(DriveNotes.friendlyError(), 'warning');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Sync from Google Drive';
            }
        }
    },

    async loadSemesters() {
        const grid = document.getElementById('semester-grid');
        if (!grid) return;

        const semesters = window.SemestersConfig || [];
        if (window.Auth && Auth.user && window.firestoreDb) await this.calculateProgress(semesters);

        grid.innerHTML = semesters.map((sem, index) => {
            const isLocked = !sem.isUnlocked;
            const subCount = sem.subjects ? sem.subjects.length : 0;
            const prog = this._progressCache[sem.id] || 0;
            
            return `
            <div class="semester-card ${isLocked ? 'locked' : 'glass-card-interactive'}" 
                 style="--card-color: ${sem.color}; background: linear-gradient(135deg, ${sem.color}dd, ${sem.color}55); animation-delay: ${index * 100}ms;"
                 ${isLocked ? `title="This semester has not started yet"` : `onclick="App.goToSemester('${sem.id}')"`}
                 data-animate="fade-up">
                
                <div class="sem-card-header">
                    <h3 class="sem-card-title">${isLocked ? 'Locked - ' : ''}${Utils.escHtml(sem.name)}</h3>
                </div>
                <div class="sem-card-subtitle">${Utils.escHtml(sem.subtitle)}</div>
                
                <div class="sem-card-stats">${subCount} Subjects</div>
                
                <div class="sem-progress-wrap">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:600">
                        <span>Progress</span>
                        <span>${prog}%</span>
                    </div>
                    <div class="sem-progress-bar">
                        <div class="sem-progress-fill" style="width: ${prog}%"></div>
                    </div>
                </div>
            </div>`;
        }).join('');

        if (window.Interactions && Interactions.initGlowCards) Interactions.initGlowCards();
        if (window.ScrollFX && ScrollFX.refresh) ScrollFX.refresh();
    },

    async calculateProgress(semesters) {
        if (!window.firestoreDb || !Auth.user) return;
        const uid = Auth.user.id;
        
        try {
            const snap = await window.firestoreDb.collection('userNotes').where('userId', '==', uid).get();
            const userNotes = snap.docs.map(d => d.data());
            
            semesters.forEach(sem => {
                if (!sem.isUnlocked || !sem.subjects || sem.subjects.length === 0) {
                    this._progressCache[sem.id] = 0;
                    return;
                }
                
                const subjectsInSem = sem.subjects.map(s => s.code);
                const coveredSubjects = new Set();
                userNotes.forEach(note => {
                    if (note.semester === sem.id && subjectsInSem.includes(note.subject)) coveredSubjects.add(note.subject);
                });
                this._progressCache[sem.id] = Math.round((coveredSubjects.size / sem.subjects.length) * 100);
            });
        } catch (_) {
            this._progressCache = {};
        }
    }
};

window.SemesterHub = SemesterHub;
