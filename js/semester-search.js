/* Cross-semester notes search */
const SemesterSearch = {
    results: [],
    _driveWarning: '',
    
    onSearchInput(val) {
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.style.display = val.trim() ? 'block' : 'none';
    },

    clearSearch() {
        const input = document.getElementById('global-note-search');
        if (input) input.value = '';
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) clearBtn.style.display = 'none';
        SemesterHub.render();
    },

    async execute(query) {
        const cleanQuery = (query || '').trim();
        if (!cleanQuery) {
            SemesterHub.render();
            return;
        }

        const el = document.getElementById('page-notes');
        if (!el) return;
        
        el.innerHTML = `
            <div class="section-header">
                <button class="btn btn-ghost btn-sm" onclick="SemesterHub.render()" style="margin-bottom: var(--sp-2)">Back to Semesters</button>
                <h2>Search Results</h2>
                <p>Searching for "${SemesterNotes._sanitize(cleanQuery)}" across all semesters.</p>
            </div>
            
            <div id="search-results-container" class="un-grid">
                <div class="un-skeleton-card"><div class="un-skeleton-thumb"></div><div class="un-skeleton-body"><div class="un-skeleton-line wide"></div></div></div>
                <div class="un-skeleton-card"><div class="un-skeleton-thumb"></div><div class="un-skeleton-body"><div class="un-skeleton-line wide"></div></div></div>
            </div>
        `;

        await this.performSearch(cleanQuery.toLowerCase());
    },

    _subjectFor(code) {
        for (const sem of window.SemestersConfig || []) {
            const subject = (sem.subjects || []).find(s => s.code === code);
            if (subject) return { semester: sem, subject };
        }
        return { semester: null, subject: null };
    },

    _dedupeKey(subjectCode, note) {
        if (note.driveFileId) return `drive_${note.driveFileId}`;
        const title = (note.title || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '');
        const unit = note.unitId || note.unit || '';
        return `${subjectCode}_${unit}_${title}`;
    },

    _platformResults() {
        const results = [];
        const seen = new Set();
        for (const sem of window.SemestersConfig || []) {
            for (const subject of sem.subjects || []) {
                const driveNotes = window.DriveNotes ? DriveNotes.getSubjectNotes(subject.code) : [];
                const driveMcqs = window.DriveNotes ? DriveNotes.getSubjectMcqPdfs(subject.code) : [];
                const staticNotes = window.SubjectMapping ? SubjectMapping.getPlatformNotes(subject.code) : [];
                const staticMcqs = window.SubjectMapping ? SubjectMapping.getMcqPdfs(subject.code) : [];
                const notes = [
                    ...driveNotes,
                    ...staticNotes,
                    ...driveMcqs.map(m => ({ ...m, fileUrl: m.fileUrl || m.file, fileType: 'pdf', _kind: 'mcq' })),
                    ...staticMcqs.map(m => ({ ...m, fileUrl: m.file, fileType: 'pdf', source: m.source || 'folder-mcq', noteId: m.id, _kind: 'mcq' }))
                ];

                notes.forEach(note => {
                    const id = this._dedupeKey(subject.code, note);
                    if (seen.has(id)) return;
                    seen.add(id);
                    results.push({
                        ...note,
                        _kind: note._kind || 'platform',
                        _searchId: id,
                        semester: sem.id,
                        subject: subject.code,
                        subjectName: subject.name,
                        semesterName: sem.name
                    });
                });
            }
        }
        return results;
    },

    _matches(note, query) {
        return [
            note.title,
            note.subject,
            note.subjectId,
            note.subjectName,
            note.semester,
            note.semesterName,
            note.content,
            note.unit ? `unit ${note.unit}` : '',
            note.unitId ? `unit ${note.unitId}` : '',
            ...(note.tags || [])
        ].join(' ').toLowerCase().includes(query);
    },

    async performSearch(query) {
        const container = document.getElementById('search-results-container');
        this._driveWarning = '';
        if (window.DriveNotes) {
            try {
                await DriveNotes.load();
            } catch (error) {
                console.warn('Drive notes unavailable for search:', error.message || error);
                this._driveWarning = DriveNotes.friendlyError();
            }
        }

        const platformMatches = this._platformResults().filter(n => this._matches(n, query));
        const userMatches = [];
        
        if (window.firestoreDb) {
            try {
                const uid = Auth.user ? Auth.user.id : null;
                const publicSnap = await window.firestoreDb.collection('userNotes').where('isPublic', '==', true).get();
                let privateSnap = { docs: [] };
                if (uid) {
                    privateSnap = await window.firestoreDb.collection('userNotes').where('userId', '==', uid).where('isPublic', '==', false).get();
                }
                
                const seenIds = new Set();
                [...publicSnap.docs, ...privateSnap.docs].forEach(d => {
                    if (seenIds.has(d.id)) return;
                    seenIds.add(d.id);
                    const data = { ...d.data(), _docId: d.id, _kind: 'student' };
                    const ctx = this._subjectFor(data.subject);
                    data.subjectName = ctx.subject?.name || data.subject;
                    data.semesterName = ctx.semester?.name || data.semester;
                    if (this._matches(data, query)) userMatches.push(data);
                });
            } catch (error) {
                if (container && !platformMatches.length) {
                    container.innerHTML = `<div class="un-empty-state"><div class="un-empty-icon">Search</div><h4>Search failed</h4><p>Student notes could not be loaded. Platform notes are still available.</p></div>`;
                }
            }
        }

        this.results = [...platformMatches, ...userMatches];
        this.renderResults();
    },

    renderResults() {
        const container = document.getElementById('search-results-container');
        if (!container) return;
        
        if (this.results.length === 0) {
            container.innerHTML = `${this._driveWarning ? `<div style="grid-column:1/-1;color:var(--warning);font-size:0.85rem;">${SemesterNotes._sanitize(this._driveWarning)}</div>` : ''}<div class="un-empty-state">
                <div class="un-empty-icon">Search</div>
                <h4>No notes found</h4>
                <p>Try different keywords or check your spelling.</p>
            </div>`;
            return;
        }

        const grouped = {};
        this.results.forEach(n => {
            if (!grouped[n.semester]) grouped[n.semester] = [];
            grouped[n.semester].push(n);
        });

        let html = this._driveWarning
            ? `<div style="grid-column:1/-1;color:var(--warning);font-size:0.85rem;">${SemesterNotes._sanitize(this._driveWarning)}</div>`
            : '';
        for (const [semId, notes] of Object.entries(grouped)) {
            const sem = (window.SemestersConfig || []).find(s => s.id === semId);
            const semName = sem ? sem.name : semId;
            const semColor = sem ? sem.color : 'var(--primary)';
            
            html += `<div style="grid-column: 1 / -1; margin-top: var(--sp-6);">
                <h3 style="color: ${semColor}; margin-bottom: var(--sp-4); padding-bottom: var(--sp-2); border-bottom: 1px solid ${semColor}55;">
                    ${SemesterNotes._sanitize(semName)} <span class="badge badge-ghost" style="float:right">${notes.length} results</span>
                </h3>
            </div>`;
            
            html += notes.map(n => {
                const fileType = n.fileType || (n.content ? 'text' : 'pdf');
                const subName = n.subjectName || n.subject;
                const label = n._kind === 'student'
                    ? 'Student Added'
                    : n.source === 'google-drive'
                        ? (n._kind === 'mcq' ? 'Drive MCQ PDF' : 'Google Drive')
                        : n._kind === 'mcq'
                            ? 'MCQ PDF'
                            : 'Platform Note';
                const target = n._kind === 'platform' && n.fileUrl
                    ? `window.open('${n.fileUrl}', '_blank')`
                    : n._kind === 'mcq'
                        ? `window.open('${n.fileUrl || n.file}', '_blank')`
                        : `SemesterNotes.render('${n.semester}', '${n.subject}')`;

                return `
                <div class="un-card" tabindex="0" onclick="${target}" onkeydown="if(event.key==='Enter') ${target}">
                    <div class="un-card-thumb">${fileType === 'image' ? `<img src="${n.fileUrl}" loading="lazy" alt="">` : `<span class="un-type-icon">${SemesterNotes._typeIcon(fileType)}</span>`}</div>
                    <div class="un-card-body">
                        <div class="un-card-title">${SemesterNotes._sanitize(n.title)}</div>
                        <div class="un-card-meta">
                            <span class="sem-badge" style="background:${semColor}">${SemesterNotes._sanitize(subName)}</span>
                            <span class="tag-chip">${label}</span>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }
        
        container.innerHTML = html;
        container.style.display = 'grid';
    }
};

window.SemesterSearch = SemesterSearch;
