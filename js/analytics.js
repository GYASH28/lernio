/* ANALYTICS - Performance tracking and charts */
const Analytics = {
    render() {
        const el = document.getElementById('page-analytics');
        const code = Store.getActiveSubject();
        const subject = SubjectRegistry.get(code);
        const perf = Store.getPerformance(code);
        const attempts = Store.getAttemptsBySubject(code);
        const streak = Store.getStreak();

        if (!perf || attempts.length === 0) {
            el.innerHTML = `
                <div class="section-header">
                    <h2>Analytics</h2>
                </div>
                <div class="empty-state">
                    <div class="empty-icon">Stats</div>
                    <div class="empty-title">No Data Yet</div>
                    <div class="empty-desc">Take a quiz to see your performance analytics here.</div>
                    <button class="btn btn-primary" onclick="App.navigate('quiz')" style="margin-top:var(--sp-4)">Start Quiz</button>
                </div>`;
            return;
        }

        const units = subject ? subject.units : [];
        const unitBars = units.map(unit => {
            const key = 'Unit ' + unit.id;
            const stats = perf.unitStats[key];
            const pct = stats ? Math.round((stats.correct / stats.total) * 100) : 0;
            return { label: 'U' + unit.id, pct, total: stats ? stats.total : 0 };
        });

        const trend = perf.recentScores.slice().reverse();

        const insights = [];
        unitBars.forEach(unit => {
            if (unit.total > 0) {
                if (unit.pct >= 80) insights.push({ icon: 'Strong', msg: `Strong in ${unit.label} (${unit.pct}% accuracy)` });
                else if (unit.pct < 50) insights.push({ icon: 'Focus', msg: `Needs work: ${unit.label} (${unit.pct}% accuracy)` });
            }
        });
        if (perf.avgScore >= 80) insights.push({ icon: 'Ready', msg: 'You are exam-ready overall.' });
        else if (perf.avgScore < 50) insights.push({ icon: 'Review', msg: 'Focus on studying before your next attempt.' });

        const totalCorrect = attempts.reduce((sum, attempt) => sum + (attempt.correctCount ?? attempt.score ?? 0), 0);
        const totalWrong = attempts.reduce((sum, attempt) => sum + (attempt.wrongCount ?? Math.max((attempt.total || 0) - (attempt.correctCount ?? attempt.score ?? 0), 0)), 0);
        const totalAll = totalCorrect + totalWrong;
        const correctPct = totalAll ? Math.round((totalCorrect / totalAll) * 100) : 0;
        const donutStyle = `background: conic-gradient(var(--success) 0% ${correctPct}%, var(--danger) ${correctPct}% 100%)`;

        const svgW = 400;
        const svgH = 150;
        const pad = 20;
        let svgPath = '';
        let svgDots = '';
        if (trend.length > 1) {
            const step = (svgW - pad * 2) / (trend.length - 1);
            const points = trend.map((value, index) => ({
                x: pad + index * step,
                y: svgH - pad - (value / 100) * (svgH - pad * 2)
            }));
            svgPath = points.map((point, index) => (index === 0 ? 'M' : 'L') + point.x + ',' + point.y).join(' ');
            svgDots = points.map(point => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="var(--primary)" stroke="var(--bg-surface)" stroke-width="2"/>`).join('');
        }

        el.innerHTML = `
        <div class="section-header">
            <h2>${subject ? subject.name : ''} Analytics</h2>
            <p>Track your progress and identify areas for improvement.</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-value">${perf.totalAttempts}</div><div class="stat-label">Quizzes</div></div>
            <div class="stat-card"><div class="stat-value" style="color:${perf.avgScore >= 70 ? 'var(--success)' : 'var(--warning)'}">${perf.avgScore}%</div><div class="stat-label">Avg Score</div></div>
            <div class="stat-card"><div class="stat-value" style="color:var(--success)">${perf.bestScore}%</div><div class="stat-label">Best</div></div>
            <div class="stat-card"><div class="stat-value">${perf.lastScore}%</div><div class="stat-label">Last</div></div>
            <div class="stat-card"><div class="stat-value">${streak}</div><div class="stat-label">Streak</div></div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-6)">
            <div class="glass-card chart-card">
                <h3>Unit Accuracy</h3>
                <div class="bar-chart">
                    ${unitBars.map(unit => `<div class="bar-row"><div class="bar-label">${unit.label}</div><div class="bar-track"><div class="bar-fill ${Utils.pctColor(unit.pct)}" style="width:${Math.max(unit.pct, 2)}%">${unit.pct}%</div></div></div>`).join('')}
                </div>
            </div>
            <div class="glass-card chart-card">
                <h3>Accuracy</h3>
                <div class="donut-chart" style="${donutStyle}">
                    <div class="donut-center">
                        <div class="donut-value">${correctPct}%</div>
                        <div class="donut-label">Correct</div>
                    </div>
                </div>
                <div class="donut-legend">
                    <div class="legend-item"><div class="legend-dot" style="background:var(--success)"></div>Correct (${totalCorrect})</div>
                    <div class="legend-item"><div class="legend-dot" style="background:var(--danger)"></div>Wrong (${totalWrong})</div>
                </div>
            </div>
        </div>

        ${trend.length > 1 ? `<div class="glass-card chart-card"><h3>Score Trend</h3>
            <div class="line-chart-wrap"><svg viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="none">
                <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--primary)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--primary)" stop-opacity="0"/></linearGradient></defs>
                <path d="${svgPath}" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                ${svgDots}
            </svg></div></div>` : ''}

        ${insights.length ? `<div class="glass-card chart-card"><h3>Insights</h3><div class="insights-list">${insights.map(item => `<div class="insight-item"><span class="insight-icon">${item.icon}</span><span>${item.msg}</span></div>`).join('')}</div></div>` : ''}

        <div class="glass-card chart-card">
            <h3>Attempt History</h3>
            <div class="history-table"><table>
                <thead><tr><th>Date</th><th>Unit</th><th>Mode</th><th>Correct</th><th>%</th></tr></thead>
                <tbody>${attempts.slice(0, 20).map(attempt => `<tr><td>${Utils.formatDate(attempt.date)}</td><td>${attempt.unitLabel || '-'}</td><td>${attempt.mode || '-'}</td><td>${attempt.correctCount ?? attempt.score}/${attempt.total}</td><td style="color:${attempt.pct >= 70 ? 'var(--success)' : 'var(--warning)'}">${attempt.pct}%</td></tr>`).join('')}</tbody>
            </table></div>
        </div>`;

        requestAnimationFrame(() => {
            if (Store.getSettings().reducedMotion) return;

            gsap.fromTo('#page-analytics .section-header',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.45 }
            );

            document.querySelectorAll('#page-analytics .stat-card').forEach((card, index) => {
                gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 + index * 0.08 });
                const valueEl = card.querySelector('.stat-value');
                const rawText = valueEl.textContent.trim();
                const numericMatch = rawText.match(/\d+/);
                if (numericMatch) {
                    const target = parseInt(numericMatch[0], 10);
                    const prefix = rawText.replace(/[\d.]+.*/, '');
                    const suffix = rawText.includes('%') ? '%' : '';
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: target,
                        duration: 1.4,
                        ease: 'power2.out',
                        delay: 0.3 + index * 0.08,
                        onUpdate: () => { valueEl.textContent = prefix + Math.round(obj.val) + suffix; }
                    });
                }
            });

            document.querySelectorAll('#page-analytics .bar-fill').forEach((bar, index) => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                gsap.to(bar, { width: targetWidth, duration: 1.0, ease: 'expo.out', delay: 0.5 + index * 0.07 });
            });

            gsap.fromTo('.donut-chart',
                { rotation: -90, opacity: 0, scale: 0.6, transformOrigin: '50% 50%' },
                { rotation: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.3)', delay: 0.4 }
            );
            gsap.fromTo('.donut-center',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.9 }
            );

            const path = document.querySelector('#page-analytics .chart-card svg path[stroke]');
            if (path) {
                const length = path.getTotalLength();
                gsap.fromTo(path,
                    { strokeDasharray: length, strokeDashoffset: length },
                    { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.6 }
                );
            }

            gsap.fromTo('#page-analytics svg circle',
                { scale: 0, transformOrigin: '50% 50%' },
                { scale: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(2)', delay: 1.8 }
            );

            gsap.fromTo('.insight-item',
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
            );

            gsap.fromTo('.history-table tr',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'power2.out', delay: 1 }
            );
        });
    }
};

window.Analytics = Analytics;
