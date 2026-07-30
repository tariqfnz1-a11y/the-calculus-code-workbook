// ===== ANSWER CHECKING =====
function checkAnswer(chapter, problem, correctAnswer) {
    let input = document.getElementById('answer-' + chapter + '-' + problem);
    let feedback = document.getElementById('feedback-' + chapter + '-' + problem);
    let status = document.getElementById('status-' + chapter + '-' + problem);

    if (!input) return;

    let userAnswer = input.value.trim().replace(/\s/g, '');
    let expected = correctAnswer.replace(/\s/g, '');

    if (userAnswer === expected) {
        feedback.innerHTML = '✅ Correct! Well done!';
        feedback.className = 'feedback correct';
        if (status) status.textContent = '✅';
        Progress.markSolved(chapter, problem);
    } else {
        feedback.innerHTML = '❌ Not quite. Try again, or use the hint.';
        feedback.className = 'feedback incorrect';
    }
}

// ===== HINT TOGGLE =====
function toggleHint(id) {
    let el = document.getElementById(id);
    if (el) {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
}

// ===== SOLUTION TOGGLE =====
function toggleSolution(id) {
    let el = document.getElementById(id);
    if (el) {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
}

// ===== KEYBOARD SUPPORT =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let target = e.target;
        if (target.tagName === 'INPUT' && target.id.startsWith('answer-')) {
            let btn = target.parentElement.querySelector('button');
            if (btn) btn.click();
        }
    }
});

// ===== RESET ALL PROGRESS =====
function resetAllProgress() {
    if (confirm('Are you sure you want to delete all progress?')) {
        localStorage.removeItem('calcProgress');
        location.reload();
    }
}