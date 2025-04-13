let score = 0;
let timer;
let timeLeft = 10;

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
        } else {
            document.getElementById("time-left").textContent = --timeLeft;
        }
    }, 1000);
}

function showHint(questionId) {
    document.getElementById(`hint-${questionId}`).style.display = "block";
}

function submitAnswer(questionId, correctAnswer) {
    const userAnswer = prompt("Enter your answer:");
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("score").textContent = score;
    }
    nextQuestion();
}

function showCorrectAnswer() {
    alert("Time's up! The correct answer is: 4");
}

function nextQuestion() {
    // Handle navigation to the next question here
}

// Initialize the first question
document.getElementById("question-1").classList.add("active");
startTimer();