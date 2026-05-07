/* Google Drive notes metadata loader. Secrets stay server-side in /api/drive-* functions. */
const DriveNotes = {
    _storageKey: 'lernio_drive_notes_cache_v1',
    _cacheTtlMs: 5 * 60 * 1000,
    _data: null,
    _loadedAt: 0,
    _loadPromise: null,
    lastError: null,

    _now() { return Date.now(); },

    _readStored() {
        try {
            const raw = sessionStorage.getItem(this._storageKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.data || !parsed.loadedAt) return null;
            return parsed;
        } catch {
            return null;
        }
    },

    _writeStored(data) {
        try {
            sessionStorage.setItem(this._storageKey, JSON.stringify({
                loadedAt: this._loadedAt,
                data
            }));
        } catch (_) {}
    },

    _hydrateFromStored() {
        const stored = this._readStored();
        if (!stored) return false;
        this._data = stored.data;
        this._loadedAt = stored.loadedAt;
        return true;
    },

    hasFreshCache() {
        if (!this._data) this._hydrateFromStored();
        return !!this._data && (this._now() - this._loadedAt) < this._cacheTtlMs;
    },

    async load(options = {}) {
        const force = !!options.force;
        if (!force && this.hasFreshCache()) return this._data;
        if (!force && this._loadPromise) return this._loadPromise;

        this._loadPromise = this._fetchDriveNotes(force)
            .catch(error => {
                this.lastError = error;
                if (this._data || this._hydrateFromStored()) return this._data;
                throw error;
            })
            .finally(() => {
                this._loadPromise = null;
            });

        return this._loadPromise;
    },

    async _fetchDriveNotes(force) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        try {
            const response = await fetch(`/api/drive-notes${force ? '?refresh=1' : ''}`, {
                headers: { Accept: 'application/json' },
                signal: controller.signal
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok || data.ok === false) {
                throw new Error(data.error || 'Unable to sync Google Drive notes right now.');
            }

            this._data = {
                notes: Array.isArray(data.notes) ? data.notes : [],
                mcqPdfs: Array.isArray(data.mcqPdfs) ? data.mcqPdfs : [],
                semesters: Array.isArray(data.semesters) ? data.semesters : [],
                syncedAt: data.syncedAt || new Date().toISOString(),
                warnings: Array.isArray(data.warnings) ? data.warnings : []
            };
            this._loadedAt = this._now();
            this.lastError = null;
            this._writeStored(this._data);
            if (this._data.warnings.length) {
                console.warn('Google Drive notes sync warnings:', this._data.warnings);
            }
            return this._data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Google Drive sync timed out.');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    },

    _normalizeNote(raw) {
        const fileId = raw.driveFileId || raw.id || raw.noteId;
        return {
            ...raw,
            id: raw.id || `drive_${fileId}`,
            noteId: raw.noteId || `drive_${fileId}`,
            driveFileId: fileId,
            title: raw.title || 'Google Drive PDF',
            subjectId: raw.subjectId || raw.subject,
            semester: raw.semester,
            fileUrl: raw.fileUrl || raw.downloadUrl || `/api/drive-file?id=${encodeURIComponent(fileId)}`,
            file: raw.file || raw.downloadUrl || `/api/drive-file?id=${encodeURIComponent(fileId)}`,
            fileType: 'pdf',
            source: 'google-drive',
            type: raw.type || 'platform',
            isPlatform: true,
            isPdf: true
        };
    },

    getSubjectNotes(subjectCode) {
        if (!this._data) this._hydrateFromStored();
        return ((this._data && this._data.notes) || [])
            .filter(note => (note.subjectId || note.subject) === subjectCode)
            .map(note => this._normalizeNote(note));
    },

    getSubjectMcqPdfs(subjectCode) {
        if (!this._data) this._hydrateFromStored();
        return ((this._data && this._data.mcqPdfs) || [])
            .filter(note => (note.subjectId || note.subject) === subjectCode)
            .map(note => this._normalizeNote(note));
    },

    getPlatformCount(subjectCode) {
        return this.getSubjectNotes(subjectCode).length + this.getSubjectMcqPdfs(subjectCode).length;
    },

    friendlyError() {
        return 'Unable to sync Google Drive notes right now. Showing available saved notes.';
    }
};

window.DriveNotes = DriveNotes;
