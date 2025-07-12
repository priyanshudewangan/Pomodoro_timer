const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerInterval = null;
let isPaused = false;


function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;

    gsap.fromTo("#timer",
        { scale: 1.1 },
        { scale: 1, duration: 0.3, ease: "power1.out" }
    );
}



function startTimer() {
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            }
            else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert(`Time's up`);
            }
        }
    }, 1000)


}

function pauseTimer() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    pauseButton.textContent = "Pause";
    timeLeft = 25 * 60;
    updateDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

[startButton, pauseButton, resetButton].forEach(button => {
    button.addEventListener("click", () => {
        gsap.fromTo(button,
            { scale: 0.95 },
            { scale: 1, duration: 0.2, ease: "power2.out" }
        );
    });
});

updateDisplay();

gsap.from(".container", {
    opacity: 0,
    y: -50,
    scale: 0.8,
    duration: 1,
    ease: "power2.out"
});