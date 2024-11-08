let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 1;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = "";
}

function lapTimer() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item'); 
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function clearAllLaps() {
    lapList.innerHTML = ""; 
    lapCount = 1;
}


function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
document.getElementById('clearAll').addEventListener('click', clearAllLaps);
