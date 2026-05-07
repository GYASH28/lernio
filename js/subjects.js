/* Subject Registry & Data Schema */
const SubjectRegistry = {
    _subjects: new Map(),

    register(data) {
        if (!data.code || !data.name) {
            console.error('Subject must have code and name');
            return;
        }
        this._subjects.set(data.code, data);
    },

    get(code) { return this._subjects.get(code); },
    getAll() { return Array.from(this._subjects.values()); },
    getCodes() { return Array.from(this._subjects.keys()); },
    getUnits(code) { return (this.get(code) || {}).units || []; },
    getUnit(code, unitId) { return this.getUnits(code).find(u => u.id === unitId); },

    getQuestions(code, filters = {}) {
        const subject = this.get(code);
        if (!subject) return [];
        let qs = [...(subject.questions || [])];
        if (filters.unit && filters.unit !== 'all') qs = qs.filter(q => q.unit == filters.unit);
        if (filters.difficulty && filters.difficulty !== 'all') qs = qs.filter(q => q.difficulty === filters.difficulty);
        if (filters.topic) qs = qs.filter(q => q.topic === filters.topic);
        return qs;
    },

    getTopics(code) {
        const qs = (this.get(code) || {}).questions || [];
        return [...new Set(qs.map(q => q.topic).filter(Boolean))];
    },

    getExplainers(code) { return (this.get(code) || {}).topicExplainers || {}; },
    getAiContext(code) { return (this.get(code) || {}).aiContext || ''; },

    getFormulas(code, unitId) {
        const unit = this.getUnit(code, unitId);
        return unit ? (unit.formulas || []) : [];
    },

    getAllFormulas(code) {
        return this.getUnits(code).flatMap(u => (u.formulas || []).map(f => ({ ...f, unit: u.id, unitTitle: u.title })));
    },

    getGlossary(code) { return (this.get(code) || {}).glossary || []; }
};

window.SubjectRegistry = SubjectRegistry;
window.registerSubject = (data) => SubjectRegistry.register(data);
