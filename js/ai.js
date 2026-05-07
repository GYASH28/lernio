/* AI Chat, Hints, Topic Explainer, and Analysis */
const AI = {
    PROVIDER: 'n8n',
    isTyping: false,
    history: {},
    _configPromise: null,
    _composerBound: false,

    init() {
        this.PROVIDER = 'n8n';
        this._bindComposerOnce();
    },

    getSessionId() {
        if (!this._sessionId) {
            this._sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
        }
        return this._sessionId;
    },

    _escape(value) {
        const d = document.createElement('div');
        d.textContent = (value || '').toString();
        return d.innerHTML;
    },

    _formatMessage(value) {
        const safe = this._escape(value);
        return safe
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    },

    async _loadConfig() {
        if (!this._configPromise) {
            this._configPromise = fetch('/api/config', { headers: { Accept: 'application/json' } })
                .then(res => res.ok ? res.json() : {})
                .catch(() => ({}));
        }
        return this._configPromise;
    },

    _messagesEl() {
        return document.getElementById('chat-messages');
    },

    _scrollChatToBottom() {
        const container = this._messagesEl();
        if (!container) return;
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    },

    updateSendButtonState() {
        const input = document.getElementById('chat-input');
        const btn = document.getElementById('chat-send');
        if (!btn) return;
        const empty = !input || !String(input.value || '').trim();
        btn.disabled = empty || this.isTyping;
    },

    _bindComposerOnce() {
        if (this._composerBound) return;

        const bind = () => {
            const input = document.getElementById('chat-input');
            const btn = document.getElementById('chat-send');
            if (!input || !btn) return;

            this._composerBound = true;
            input.addEventListener('input', () => this.updateSendButtonState());

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendFromInput();
                }
            });
            this.updateSendButtonState();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', bind);
        } else {
            bind();
        }
    },

    onChatPageEnter() {
        this.updateSendButtonState();
        this.renderHistory();
        const input = document.getElementById('chat-input');
        if (input && !this.isTyping) input.focus();
    },

    sendFromInput() {
        const input = document.getElementById('chat-input');
        if (!input) return;
        this.send(input.value);
    },

    renderHistory() {
        const code = Store.getActiveSubject();
        const msgs = this.history[code] || [];
        const container = this._messagesEl();
        if (!container) return;

        container.innerHTML = '';
        if (msgs.length === 0) {
            this.appendMessage('Hello! Ask me anything about your subjects.', 'bot', false);
        } else {
            msgs.forEach(m => this.appendMessage(m.text, m.role, false));
        }
        this._scrollChatToBottom();
    },

    appendMessage(text, role, save = true) {
        const container = this._messagesEl();
        if (!container) return;

        const code = Store.getActiveSubject();
        if (save) {
            if (!this.history[code]) this.history[code] = [];
            this.history[code].push({ text, role });
            if (this.history[code].length > 50) this.history[code].shift();
        }

        const div = document.createElement('div');
        div.className = `ai-msg ${role}`;
        div.innerHTML = this._formatMessage(text);
        container.appendChild(div);
        this._scrollChatToBottom();

        if (!Store.getSettings().reducedMotion && window.gsap) {
            gsap.fromTo(div,
                { opacity: 0, scale: 0.85, y: 10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }
            );
        }
    },

    async send(text) {
        if (this.isTyping || !text.trim()) return;

        const now = Date.now();
        if (this._lastSendTime && now - this._lastSendTime < 1500) {
            Utils.showToast('Please wait a moment before sending another message.', 'warning');
            return;
        }
        this._lastSendTime = now;

        const input = document.getElementById('chat-input');
        const btn = document.getElementById('chat-send');

        this.isTyping = true;
        if (window.ThreeScene) window.ThreeScene.setAiThinking(true);
        if (input) { input.value = ''; input.disabled = true; }
        if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
        this.updateSendButtonState();

        this.appendMessage(text, 'user');

        const typingId = 'typing-' + Date.now();
        const container = this._messagesEl();
        if (container) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'ai-msg bot ai-msg-typing';
            typingDiv.id = typingId;
            typingDiv.textContent = 'AI Tutor is thinking...';
            container.appendChild(typingDiv);
            this._scrollChatToBottom();
        }

        try {
            const reply = await this._getReply(text);
            document.getElementById(typingId)?.remove();
            this.appendMessage(reply, 'bot');
        } catch (error) {
            document.getElementById(typingId)?.remove();
            const subject = SubjectRegistry ? SubjectRegistry.get(Store.getActiveSubject()) : null;
            const offlineReply = this._getOfflineReply(text, subject);
            this.appendMessage(`${error.message}\n\nOffline suggestion:\n${offlineReply}`, 'bot');
        } finally {
            this.isTyping = false;
            if (window.ThreeScene) window.ThreeScene.setAiThinking(false);
            if (input) { input.disabled = false; input.focus(); }
            if (btn) { btn.style.opacity = '1'; }
            this.updateSendButtonState();
        }
    },

    quickAsk(text) {
        if (window.App && App.navigate) {
            if (App.currentPage !== 'chat') App.navigate('chat');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => this.send(text));
            });
        } else {
            this.send(text);
        }
    },

    askAboutNote(title) {
        this.quickAsk(`Can you explain the topic "${title}" in more detail?`);
    },

    applyChip(kind, btnEl) {
        const prefixes = {
            explain: 'Explain simply: ',
            exam: 'Give an exam-style answer for: ',
            summary: 'Summarize: '
        };

        const input = document.getElementById('chat-input');
        if (!input) return;

        if (kind === 'weak') {
            document.querySelectorAll('.chat-chip').forEach(b => b.classList.remove('active'));
            input.value = 'What are my weak topics?';
            input.focus();
            this.updateSendButtonState();
            return;
        }

        if (kind === 'plan') {
            document.querySelectorAll('.chat-chip').forEach(b => b.classList.remove('active'));
            input.value = 'Give me a study plan.';
            input.focus();
            this.updateSendButtonState();
            return;
        }

        document.querySelectorAll('.chat-chip').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        if (prefixes[kind]) {
            input.value = prefixes[kind];
            input.focus();
            this.updateSendButtonState();
        }
    },

    async _getReply(text) {
        const code = Store.getActiveSubject();
        const subject = SubjectRegistry.get(code);
        const cacheKey = Utils.simpleHash(code + text);
        const cached = Store.getAiCache(cacheKey);
        if (cached) return cached;

        const context = subject ? subject.aiContext || subject.name : 'general studies';
        const reply = await this._callN8N({
            prompt: text,
            subjectCode: code,
            subjectName: subject?.name || code,
            context
        });

        Store.setAiCache(cacheKey, reply);
        return reply;
    },

    async _callN8N({ prompt, subjectCode, subjectName, context }) {
        const config = await this._loadConfig();
        const webhookUrl = config.N8N_CHAT_WEBHOOK_URL;
        if (!webhookUrl) {
            throw new Error('AI backend is not connected yet. Add N8N_CHAT_WEBHOOK_URL in Vercel or local environment variables.');
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        let response;
        try {
            response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'sendMessage',
                    sessionId: this.getSessionId(),
                    chatInput: prompt,
                    context: {
                        subjectCode,
                        subjectName,
                        subjectContext: context,
                        page: App.currentPage || 'unknown'
                    }
                }),
                signal: controller.signal
            });
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('The AI request timed out. Please try again.');
            }
            throw new Error('Unable to reach the AI server. Please check your connection.');
        } finally {
            clearTimeout(timeoutId);
        }

        if (!response.ok) throw new Error(`AI server returned HTTP ${response.status}. Please try again.`);

        let data;
        try {
            data = await response.json();
        } catch (_) {
            throw new Error('The AI server returned an unreadable response.');
        }

        if (typeof data?.output === 'string') return data.output;
        if (typeof data?.text === 'string') return data.text;
        if (typeof data?.reply === 'string') return data.reply;
        throw new Error('No valid reply received from AI. Please try again.');
    },

    _getOfflineReply(text, subject) {
        const q = text.toLowerCase();
        if (q.includes('hello') || q.includes('hi')) {
            return `Hello! I am in offline mode right now. You can still search notes and practice available quizzes for ${subject ? subject.name : 'this course'}.`;
        }

        if (subject && subject.glossary) {
            for (const item of subject.glossary) {
                if (q.includes(item.term.toLowerCase())) return `${item.term}: ${item.def}`;
            }
        }

        return 'AI features are temporarily unavailable. Try the Notes search, review the linked PDFs, or practice the available MCQs.';
    }
};

window.AI = AI;
AI.init();
