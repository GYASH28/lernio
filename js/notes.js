/* ============================================================
   NOTES — Notes viewer with search, bookmarks, revised markers
   ============================================================ */
const Notes = {
    currentUnit: 1,
    searchQuery: '',

    render() {
        const el = document.getElementById('page-notes');
        const code = Store.getActiveSubject();
        const subject = SubjectRegistry.get(code);
        if (!subject) { el.innerHTML = '<div class="empty-state"><div class="empty-icon">📚</div><p>No subject selected</p></div>'; return; }
        const units = subject.units;
        this.currentUnit = Store.getLastUnit(code);
        const unit = units.find(u => u.id === this.currentUnit) || units[0];

        el.innerHTML = `
        <div class="section-header"><h2>📚 ${subject.name} — Notes</h2><p>Study material for all units</p></div>
        <div class="notes-layout">
            <aside class="notes-sidebar">
                <div class="notes-search">
                    <span class="search-icon">🔍</span>
                    <input type="text" placeholder="Search notes..." id="notes-search-input" oninput="Notes.onSearch(this.value)">
                </div>
                <div class="sidebar-section">
                    <div class="sidebar-title">Units</div>
                    <div class="unit-nav-list" id="unit-nav-list">
                        ${units.map(u => `<button class="unit-nav-item ${u.id === unit.id ? 'active' : ''}" onclick="Notes.switchUnit(${u.id})">${u.title}</button>`).join('')}
                    </div>
                </div>
                <div class="sidebar-section">
                    <div class="sidebar-title">Tools</div>
                    <button class="btn btn-sm btn-secondary btn-block" onclick="Notes.showFormulas()" style="margin-bottom:var(--sp-2)">📐 Formula Sheet</button>
                    <button class="btn btn-sm btn-secondary btn-block" onclick="Notes.showGlossary()">📖 Glossary</button>
                </div>
            </aside>
            <main class="notes-main">
                <div class="glass-card notes-content-card" id="notes-content"></div>
            </main>
        </div>`;
        this.renderUnit(unit);

        // GSAP Animations for Notes Layout
        requestAnimationFrame(() => {
            if (Store.getSettings().reducedMotion) return;
            gsap.fromTo('.notes-sidebar', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.55, ease: 'expo.out' });
            gsap.fromTo('.notes-content-card', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.55, ease: 'expo.out' });
            gsap.fromTo('.unit-nav-item', { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.2 });
        });

        // Render "My Uploaded Notes" section below platform notes
        if (window.UploadNotes) {
            UploadNotes.renderSection();
        }
    },

    renderUnit(unit) {
        const code = Store.getActiveSubject();
        const content = document.getElementById('notes-content');
        if (!content) return;
        Store.setLastUnit(code, unit.id);

        const bookmarks = Store.getBookmarks(code);
        const revised = Store.getRevised(code);

        content.innerHTML = `
        <div class="unit-header">
            <h2>Unit ${unit.id} — ${unit.title}</h2>
            <div class="unit-meta">
                <span class="badge badge-primary">Unit ${unit.id}</span>
                <span class="badge badge-ghost">⏱ ${unit.estimatedTime || '~2 hours'}</span>
                <span class="badge badge-ghost">${(unit.notes || []).length} sections</span>
            </div>
        </div>
        ${unit.overview ? `<div class="quick-summary"><h4>📋 Quick Summary</h4><p>${unit.overview}</p></div>` : ''}
        ${unit.revisionTips ? `<div class="callout callout-exam">⚡ <strong>Revision Tips:</strong> ${unit.revisionTips.join(' • ')}</div>` : ''}
        ${(unit.formulas && unit.formulas.length) ? `
            <div style="margin-bottom:var(--sp-6)">
                <h3 style="margin-bottom:var(--sp-3)">📐 Key Formulas</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:var(--sp-3)">
                    ${unit.formulas.map(f => `<div class="formula-card">
                        <div class="formula-expr">${Utils.escHtml(f.expr)}</div>
                        <div class="formula-desc">${f.desc}</div>
                        <button class="btn btn-ghost btn-sm formula-copy-btn" onclick="Utils.copyToClipboard('${f.expr.replace(/'/g, "\\'")}')">📋 Copy</button>
                    </div>`).join('')}
                </div>
            </div>` : ''}
        <div id="notes-sections">
            ${(unit.notes || []).map(n => {
                const isBookmarked = bookmarks.includes(n.id);
                const isRevised = revised.includes(n.id);
                return `<div class="note-section ${isRevised ? 'revised' : ''}" id="section-${n.id}">
                    <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="Notes.toggleBookmark('${n.id}')" title="Bookmark">${isBookmarked ? '⭐' : '☆'}</button>
                    <h3>${n.title} ${isRevised ? '<span class="revised-badge">✓ Revised</span>' : ''}</h3>
                    ${n.content}
                    <div style="margin-top:var(--sp-3);display:flex;gap:var(--sp-2);flex-wrap:wrap">
                        <button class="btn btn-ghost btn-sm" onclick="Notes.toggleRevised('${n.id}')">✅ ${isRevised ? 'Unmark' : 'Mark as Revised'}</button>
                        <button class="btn btn-ghost btn-sm" onclick="AI.askAboutNote('${Utils.escHtml(n.title)}')">🤖 Ask AI</button>
                        <button class="btn btn-ghost btn-sm" onclick="AI.quickAsk('Generate a summary for: ${Utils.escHtml(n.title)}')">📄 Summary</button>
                        <button class="btn btn-ghost btn-sm" onclick="AI.quickAsk('Create flashcards for: ${Utils.escHtml(n.title)}')">🗂 Flashcards</button>
                    </div>
                </div>`;
            }).join('')}
        </div>`;

        // GSAP Animations for Unit Content
        requestAnimationFrame(() => {
            if (Store.getSettings().reducedMotion) return;
            
            gsap.fromTo('.unit-header', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.4 });
            
            if (content.querySelector('.quick-summary')) {
                gsap.fromTo('.quick-summary', { opacity: 0, scaleY: 0.8, transformOrigin: 'top' }, { opacity: 1, scaleY: 1, duration: 0.35, delay: 0.1 });
            }
            if (content.querySelector('.callout')) {
                gsap.fromTo('.callout', { opacity: 0, scaleY: 0.8, transformOrigin: 'top' }, { opacity: 1, scaleY: 1, duration: 0.35, delay: 0.15 });
            }
            
            gsap.fromTo('.formula-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, delay: 0.2 });

            // ScrollTrigger for note sections
            gsap.utils.toArray('#notes-sections .note-section').forEach((section, i) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });
        });
    },

    switchUnit(unitId) {
        if (Store.getSettings().reducedMotion) {
            this._executeSwitchUnit(unitId);
            return;
        }

        gsap.to('#notes-content', { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in', onComplete: () => {
            this._executeSwitchUnit(unitId);
            gsap.fromTo('#notes-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' });
        }});
    },

    _executeSwitchUnit(unitId) {
        this.currentUnit = unitId;
        const code = Store.getActiveSubject();
        const unit = SubjectRegistry.getUnit(code, unitId);
        if (unit) {
            this.renderUnit(unit);
            document.querySelectorAll('.unit-nav-item').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.unit-nav-item')[unitId - 1]?.classList.add('active');
        }
    },

    toggleBookmark(sectionId) {
        const code = Store.getActiveSubject();
        const added = Store.toggleBookmark(code, sectionId);
        Utils.showToast(added ? 'Bookmarked!' : 'Bookmark removed', 'success');
        this.renderUnit(SubjectRegistry.getUnit(code, this.currentUnit));
    },

    toggleRevised(sectionId) {
        const code = Store.getActiveSubject();
        const added = Store.toggleRevised(code, sectionId);
        Utils.showToast(added ? 'Marked as revised ✅' : 'Unmarked', 'success');
        this.renderUnit(SubjectRegistry.getUnit(code, this.currentUnit));
    },

    onSearch(query) {
        this.searchQuery = query.toLowerCase();
        const sections = document.querySelectorAll('#notes-sections .note-section');
        sections.forEach(s => {
            const text = s.textContent.toLowerCase();
            s.style.display = !this.searchQuery || text.includes(this.searchQuery) ? 'block' : 'none';
        });
    },

    showFormulas() {
        const code = Store.getActiveSubject();
        const formulas = SubjectRegistry.getAllFormulas(code);
        const content = document.getElementById('notes-content');
        if (!formulas.length) { Utils.showToast('No formulas for this subject', 'info'); return; }
        content.innerHTML = `<div class="unit-header"><h2>📐 Formula Sheet</h2></div>
            ${formulas.map(f => `<div class="formula-card"><div class="formula-expr">${Utils.escHtml(f.expr)}</div><div class="formula-desc">${f.desc} <span class="badge badge-ghost">${f.unitTitle}</span></div>
            <button class="btn btn-ghost btn-sm" onclick="Utils.copyToClipboard('${f.expr.replace(/'/g, "\\'")}')">📋 Copy</button></div>`).join('')}`;
    },

    showGlossary() {
        const code = Store.getActiveSubject();
        const glossary = SubjectRegistry.getGlossary(code);
        const content = document.getElementById('notes-content');
        if (!glossary.length) { Utils.showToast('No glossary available', 'info'); return; }
        content.innerHTML = `<div class="unit-header"><h2>📖 Glossary</h2></div>
            <div class="glossary-grid">${glossary.map(g => `<div class="glossary-item"><dt>${g.term}</dt><dd>${g.def}</dd></div>`).join('')}</div>`;
    }
};
window.Notes = Notes;
