/* ============================================================
   SUBJECT MAPPING
   Bridges SemesterConfig subjects to SubjectRegistry data and
   deploy-safe notes/MCQ PDF assets.
   ============================================================ */

const SubjectMapping = {
    _codeMap: {
        WD: 'WD',
        EE101: 'EE101',
        EC101: 'EC101',
        CS102: 'CS102',
        LIN101: 'LIN101',
        PCO101: 'PCO101'
    },

    _notePdfs: {
        CS102: [
            { id: 'cs102-pic-unit-1', title: 'PIC Unit 1 Notes', file: 'assets/notes/CS102/PIC Unit 1 Notes.pdf', unit: 1, source: 'folder' },
            { id: 'cs102-pic-unit-2', title: 'PIC Unit 2 Notes', file: 'assets/notes/CS102/PIC Unit 2 Notes.pdf', unit: 2, source: 'folder' },
            { id: 'cs102-pic-unit-3-1', title: 'PIC Unit 3.1 Notes', file: 'assets/notes/CS102/PIC Unit 3.1 Notes.pdf', unit: 3, source: 'folder' },
            { id: 'cs102-pic-unit-3-3-to-3-6', title: 'PIC Unit 3.3 to 3.6 Notes', file: 'assets/notes/CS102/PIC Unit 3.3-3.6 Notes.pdf', unit: 3, source: 'folder' },
            { id: 'cs102-pic-unit-4', title: 'PIC Unit 4 Notes', file: 'assets/notes/CS102/PIC Unit 4 Notes.pdf', unit: 4, source: 'folder' },
            { id: 'cs102-pic-unit-5', title: 'PIC Unit 5 Notes', file: 'assets/notes/CS102/PIC Unit 5 Notes.pdf', unit: 5, source: 'folder' },
            { id: 'cs102-pic-unit-6', title: 'PIC Unit 6 Notes', file: 'assets/notes/CS102/PIC UNIT 6 NOTES.pdf', unit: 6, source: 'folder' }
        ],
        EC101: [
            { id: 'ec101-beee-ex-practical-manual', title: 'BEEE Electronics Practical Manual', file: 'assets/notes/EC101/BEEE-EX-Practical-Manual.pdf', unit: 4, source: 'folder' }
        ]
    },

    _mcqPdfs: {
        EE101: [
            { id: 'ee101-unit-1-mcqs', title: 'BEEE Electrical Unit 1 MCQs', file: 'assets/mcqs/bee-ee-unit1-mcqs.pdf', unit: 1, source: 'folder' },
            { id: 'ee101-unit-2-mcqs', title: 'BEEE Electrical Unit 2 MCQs', file: 'assets/mcqs/bee-ee-unit2-mcqs.pdf', unit: 2, source: 'folder' },
            { id: 'ee101-unit-3-mcqs', title: 'BEEE Electrical Unit 3 MCQs', file: 'assets/mcqs/bee-ee-unit3-mcqs.pdf', unit: 3, source: 'folder' }
        ],
        EC101: [
            { id: 'ec101-unit-4-mcqs', title: 'BEEE Electronics Unit 4 MCQs', file: 'assets/mcqs/bee-ex-unit4-mcqs.pdf', unit: 4, source: 'folder' },
            { id: 'ec101-unit-5-mcqs', title: 'BEEE Electronics Unit 5 MCQs', file: 'assets/mcqs/bee-ex-unit5-mcqs.pdf', unit: 5, source: 'folder' },
            { id: 'ec101-unit-6-mcqs', title: 'BEEE Electronics Unit 6 MCQs', file: 'assets/mcqs/bee-ex-unit6-mcqs.pdf', unit: 6, source: 'folder' }
        ]
    },

    getRegistryCode(semSubCode) {
        return this._codeMap[semSubCode] || null;
    },

    getSubjectData(semSubCode) {
        const regCode = this.getRegistryCode(semSubCode);
        if (!regCode || !window.SubjectRegistry) return null;
        return SubjectRegistry.get(regCode);
    },

    getSemesterForSubject(semSubCode) {
        const config = window.SemestersConfig || [];
        const semester = config.find(sem => (sem.subjects || []).some(sub => sub.code === semSubCode));
        return semester ? semester.id : null;
    },

    getPlatformNotes(semSubCode) {
        const data = this.getSubjectData(semSubCode);
        const notes = [];
        const seen = new Set();

        if (data && data.units) {
            data.units.forEach(unit => {
                (unit.notes || []).forEach(note => {
                    const noteId = `platform_${semSubCode}_${note.id}`;
                    if (seen.has(noteId)) return;
                    seen.add(noteId);
                    notes.push({
                        id: noteId,
                        noteId,
                        title: note.title,
                        subjectId: semSubCode,
                        semester: this.getSemesterForSubject(semSubCode),
                        content: note.content,
                        unitId: unit.id,
                        unitTitle: unit.title,
                        type: 'platform',
                        fileType: 'html',
                        source: 'previous-data',
                        isPlatform: true
                    });
                });
            });
        }

        (this._notePdfs[semSubCode] || []).forEach((pdf, i) => {
            const noteId = pdf.id || `pdf_note_${semSubCode}_${i}`;
            if (seen.has(noteId)) return;
            seen.add(noteId);
            notes.push({
                id: noteId,
                noteId,
                title: pdf.title,
                subjectId: semSubCode,
                semester: this.getSemesterForSubject(semSubCode),
                fileUrl: pdf.file,
                unitId: pdf.unit,
                unitTitle: `Unit ${pdf.unit}`,
                type: 'platform',
                fileType: 'pdf',
                source: pdf.source || 'folder',
                isPlatform: true,
                isPdf: true
            });
        });

        return notes;
    },

    getMcqPdfs(semSubCode) {
        return (this._mcqPdfs[semSubCode] || []).map((pdf, i) => ({
            id: pdf.id || `mcq_pdf_${semSubCode}_${i}`,
            title: pdf.title,
            subjectId: semSubCode,
            semester: this.getSemesterForSubject(semSubCode),
            file: pdf.file,
            unit: pdf.unit,
            source: pdf.source || 'folder',
            type: 'pdf'
        }));
    },

    hasQuiz(semSubCode) {
        const data = this.getSubjectData(semSubCode);
        return !!(data && data.questions && data.questions.length > 0);
    },

    getQuizCount(semSubCode) {
        const data = this.getSubjectData(semSubCode);
        return data && data.questions ? data.questions.length : 0;
    },

    getPlatformCount(semSubCode) {
        return this.getPlatformNotes(semSubCode).length + this.getMcqPdfs(semSubCode).length;
    }
};

window.SubjectMapping = SubjectMapping;
