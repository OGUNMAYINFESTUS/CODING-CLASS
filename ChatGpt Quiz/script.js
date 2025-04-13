const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        answer: "Paris",
        hint: "It's known as the city of love."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        hint: "It shares its name with a Roman god of war."
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft;
let timer;
let answered = false;

document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("hint-button").addEventListener("click", showHint);

function startQuiz() {
    document.getElementById("start-button").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    timeLeft = 20; // Set time for each question
    document.getElementById("time").innerText = timeLeft;
    clearInterval(timer); // Clear any existing timer
    answered = false;
    startTimer(); // Start a new timer for each question

    const q = questions[currentQuestion];
    document.getElementById("question-text").innerText = q.question;
    document.getElementById("options").innerHTML = "";
    document.getElementById("correct-answer").classList.add("hidden");
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        document.getElementById("options").appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (answered) return; // Prevent multiple answers
    clearInterval(timer); // Stop the timer when an answer is selected
    answered = true;
    const q = questions[currentQuestion];
    if (selected === q.answer) {
        score++;
    }
    document.getElementById("score-value").innerText = score;
}

function nextQuestion() {
    if (!answered) return; // Prevent moving to the next question before answering
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

document.getElementById("question-container").addEventListener("click", nextQuestion);

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function showCorrectAnswer() {
    document.getElementById("correct-answer").innerText = "Correct answer: " + questions[currentQuestion].answer;
    document.getElementById("correct-answer").classList.remove("hidden");
    answered = true; // Mark question as answered after timer ends
}

function showHint() {
    document.getElementById("hint").innerText = questions[currentQuestion].hint;
    document.getElementById("hint").classList.remove("hidden");
}

function endQuiz() {
    alert("Quiz Over! Your Score: " + score);
}
