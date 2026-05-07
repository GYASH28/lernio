/* Shows subjects inside a selected semester */
const SubjectView = {
    async render(semId) {
        if (window.SemesterNotes) {
            SemesterNotes.currentSemId = semId;
            SemesterNotes.currentSubCode = null;
        }
        if (window.App) App.updateHeader();

        const el = document.getElementById('page-notes');
        if (!el) return;

        const semester = (window.SemestersConfig || []).find(s => s.id === semId);
        if (!semester) {
            SemesterHub.render();
            return;
        }

        if (!semester.isUnlocked) {
            Utils.showToast('This semester is locked and will be available soon.', 'info');
            SemesterHub.render();
            return;
        }

        let driveWarning = '';
        if (window.DriveNotes) {
            try {
                await DriveNotes.load();
            } catch (error) {
                console.warn('Drive notes unavailable on subject list:', error.message || error);
                driveWarning = DriveNotes.friendlyError();
            }
        }

        const noteCounts = await this.getNoteCounts(semId);

        el.innerHTML = `
            <nav class="sem-breadcrumbs" aria-label="Breadcrumb">
                <a onclick="SemesterHub.render()">Home</a> <span>/</span>
                <a onclick="SemesterHub.render()">Notes</a> <span>/</span>
                <span aria-current="page">${Utils.escHtml(semester.name)}</span>
            </nav>
            
            <div class="section-header" style="border-bottom: 2px solid ${semester.color}; padding-bottom: var(--sp-4);">
                <button class="btn btn-ghost btn-sm" onclick="SemesterHub.render()" style="margin-bottom: var(--sp-2)">Back to Semesters</button>
                <h2 style="color: ${semester.color}">${Utils.escHtml(semester.name)} - ${Utils.escHtml(semester.subtitle)}</h2>
                <p>Select a subject to view or add notes</p>
                ${driveWarning ? `<p style="color:var(--warning);font-size:0.85rem;margin-top:var(--sp-2);">${Utils.escHtml(driveWarning)}</p>` : ''}
            </div>
            
            <div class="subject-list-container" id="subject-list" data-animate="stagger">
                ${semester.subjects.map(sub => {
                    const staticCount = window.SubjectMapping ? SubjectMapping.getPlatformCount(sub.code) : 0;
                    const driveCount = window.DriveNotes ? DriveNotes.getPlatformCount(sub.code) : 0;
                    const platformCount = driveCount + staticCount;
                    const studentCount = noteCounts[sub.code] || 0;
                    const totalCount = platformCount + studentCount;
                    const hasQuiz = window.SubjectMapping && SubjectMapping.hasQuiz(sub.code);

                    return `
                    <div class="subject-list-item" onclick="App.goToSemester('${semId}', '${sub.code}')" tabindex="0"
                         onkeypress="if(event.key==='Enter') App.goToSemester('${semId}', '${sub.code}')">
                        <div class="sub-item-left">
                            <div class="sub-item-icon" style="color: ${semester.color}">${Utils.escHtml(sub.icon)}</div>
                            <div class="sub-item-details">
                                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                    <h4>${Utils.escHtml(sub.name)}</h4>
                                    ${hasQuiz ? `<span class="badge badge-primary" style="font-size:0.6rem; padding: 2px 6px;">QUIZ</span>` : ''}
                                </div>
                                <span class="sub-code">${Utils.escHtml(sub.code)} - ${sub.credits} Credits</span>
                            </div>
                        </div>
                        <div class="sub-item-right">
                            <div style="text-align:right">
                                <span class="sub-note-count">${totalCount} note${totalCount !== 1 ? 's' : ''}</span>
                                ${driveCount > 0 ? `<div style="font-size:0.65rem; opacity:0.6;">Incl. ${driveCount} Drive</div>` : platformCount > 0 ? `<div style="font-size:0.65rem; opacity:0.6;">Incl. ${platformCount} platform</div>` : ''}
                            </div>
                            <div class="sub-status-dot ${totalCount > 0 ? 'active' : ''}"></div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
            
            <button class="fab-btn" onclick="SemesterNotes.openUploadModal('${semId}')" aria-label="Upload Note" title="Upload Note">+</button>
        `;

        if (window.ScrollFX && ScrollFX.refresh) ScrollFX.refresh();
        window.scrollTo(0, 0);
    },

    async getNoteCounts(semId) {
        const counts = {};
        if (!window.firestoreDb) return counts;
        
        try {
            const snap = await window.firestoreDb.collection('userNotes').where('semester', '==', semId).get();
            const uid = Auth.user ? Auth.user.id : null;
            
            snap.docs.forEach(doc => {
                const data = doc.data();
                if (data.isPublic || data.userId === uid) counts[data.subject] = (counts[data.subject] || 0) + 1;
            });
        } catch (_) {}
        return counts;
    }
};

window.SubjectView = SubjectView;
