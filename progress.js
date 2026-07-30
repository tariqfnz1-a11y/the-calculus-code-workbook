// ===== PROGRESS TRACKING =====
const Progress = {
    load: function() {
        try {
            return JSON.parse(localStorage.getItem('calcProgress')) || {};
        } catch {
            return {};
        }
    },

    save: function(data) {
        localStorage.setItem('calcProgress', JSON.stringify(data));
        this.updateUI();
    },

    markSolved: function(chapter, problem) {
        let data = this.load();
        if (!data[chapter]) data[chapter] = {};
        data[chapter][problem] = 'solved';
        this.save(data);
    },

    getChapterProgress: function(chapter, total) {
        let data = this.load();
        if (!data[chapter]) return { solved: 0, total: total || 0 };
        return { solved: Object.keys(data[chapter]).length, total: total || 0 };
    },

    getOverallProgress: function() {
        let data = this.load();
        let totalSolved = 0;
        let totalProblems = 0;
        let chapterTotals = {
            '1': 10, '2': 12, '3': 10, '4': 12,
            '5': 15, '6': 10, '7': 10, '8': 12,
            '9': 10, '10': 10, '11': 12,
            'epilogue': 12, 'police': 10, 'mixed': 15
        };
        for (let chapter in chapterTotals) {
            totalProblems += chapterTotals[chapter];
            let solved = data[chapter] ? Object.keys(data[chapter]).length : 0;
            totalSolved += solved;
        }
        return { solved: totalSolved, total: totalProblems };
    },

    updateUI: function() {
        let overall = this.getOverallProgress();
        let pct = Math.min(Math.round((overall.solved / overall.total) * 100), 100);
        
        let bar = document.getElementById('progress-bar');
        let text = document.getElementById('progress-text');
        if (bar) bar.style.width = pct + '%';
        if (text) text.textContent = overall.solved + ' of ' + overall.total + ' problems solved';

        let chapterMap = {
            'ch1': { id: 'ch1-progress', key: '1', total: 10 },
            'ch2': { id: 'ch2-progress', key: '2', total: 12 },
            'ch3': { id: 'ch3-progress', key: '3', total: 10 },
            'ch4': { id: 'ch4-progress', key: '4', total: 12 },
            'ch5': { id: 'ch5-progress', key: '5', total: 15 },
            'ch6': { id: 'ch6-progress', key: '6', total: 10 },
            'ch7': { id: 'ch7-progress', key: '7', total: 10 },
            'ch8': { id: 'ch8-progress', key: '8', total: 12 },
            'ch9': { id: 'ch9-progress', key: '9', total: 10 },
            'ch10': { id: 'ch10-progress', key: '10', total: 10 },
            'ch11': { id: 'ch11-progress', key: '11', total: 12 },
            'epilogue': { id: 'epilogue-progress', key: 'epilogue', total: 12 },
            'police': { id: 'police-progress', key: 'police', total: 10 },
            'mixed': { id: 'mixed-progress', key: 'mixed', total: 15 }
        };

        let data = this.load();
        for (let key in chapterMap) {
            let el = document.getElementById(chapterMap[key].id);
            if (el) {
                let solved = data[chapterMap[key].key] ? Object.keys(data[chapterMap[key].key]).length : 0;
                el.textContent = solved + '/' + chapterMap[key].total;
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Progress.updateUI();
});