const loadingProgress = document.getElementById('loading-progress');
const loadingPercent = document.getElementById('loading-percent');
const loadingText = document.getElementById('loading-text');

let progress = 0;

const loading = setInterval(() => {
    progress += 1;

    if (progress > 100) {
        progress = 100;
    }

    loadingProgress.style.width = `${progress}%`;
    loadingPercent.textContent = `${progress}%`;

   

    if (progress >= 100) {
        clearInterval(loading);

        setTimeout(() => {
            window.location.href = '../co/index.html';
        }, 400);
    }
}, 40);
