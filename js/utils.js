/* Shared utility helpers */
const Utils = {
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    escHtml(str) {
        const d = document.createElement('div');
        d.textContent = str == null ? '' : String(str);
        return d.innerHTML;
    },

    formatDate(d) {
        const date = new Date(d);
        const now = new Date();
        const diff = now - date;
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    },

    debounce(fn, ms = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), ms);
        };
    },

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            Utils.showToast('Copied to clipboard.', 'success');
            
            if (window.event && window.event.target && !Store.getSettings().reducedMotion && window.gsap) {
                const btn = window.event.target.closest('.btn');
                if (btn) gsap.fromTo(btn, { scale: 1 }, { scale: 1.08, yoyo: true, repeat: 1, duration: 0.15, ease: 'power2.out' });
            }
        } catch {
            Utils.showToast('Copy failed.', 'error');
        }
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const labels = { success: 'OK', error: 'Error', info: 'Info', warning: 'Note' };
        toast.innerHTML = `<span>${labels[type] || 'Info'}</span><span>${Utils.escHtml(message)}</span>`;
        container.appendChild(toast);
        
        if (Store.getSettings().reducedMotion || !window.gsap) {
            setTimeout(() => toast.remove(), 3200);
            return;
        }

        gsap.fromTo(toast,
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }
        );
        gsap.to(toast, {
            x: 120,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            delay: 2.7,
            onComplete: () => toast.remove()
        });
    },

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash |= 0;
        }
        return 'h' + Math.abs(hash).toString(36);
    },

    downloadAsText(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    pctColor(pct) {
        if (pct >= 80) return 'green';
        if (pct >= 50) return 'yellow';
        return 'red';
    },

    clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }
};

window.Utils = Utils;
