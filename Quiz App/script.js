const questions = document.querySelectorAll('.question');
const navButtons = document.querySelectorAll('.navigation button');
const resultDiv = document.getElementById('result');

let currentQuestion = 'question1';

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        questions.forEach(question => {
            question.style.display = 'none';
        });
        currentQuestion = button.dataset.question;
        document.getElementById(currentQuestion).style.display = 'block';
        resetTimer(currentQuestion);
    });
});

questions.forEach(question => {
    const answers = question.querySelectorAll('.answer');
    let timerId;
    let timeLeft = 15;
    const timerDisplay = question.querySelector(#timer${ question.id.slice(-1) });
    const correctAnswerDisplay = question.querySelector('.correct-answer');

    function startTimer() {
        timeLeft = 15;
        timerDisplay.textContent = timeLeft;
        timerId = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                answers.forEach(answer => answer.disabled = true);
                correctAnswerDisplay.style.display = 'block';
            }
        }, 1000);
    }

    function resetTimer(questionID) {
        if (question.id === questionID) {
            clearInterval(timerId);
            timeLeft = 15;
            timerDisplay.textContent = timeLeft;
            answers.forEach(answer => answer.disabled = false);
            correctAnswerDisplay.style.display = 'none';
            startTimer();
        }
    }

    startTimer();
    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            clearInterval(timerId);
            answers.forEach(btn => btn.disabled = true);
            if (answer.dataset.correct === 'true') {
                resultDiv.textContent = 'Correct!';
                answer.style.backgroundColor = '#aaffaa';
            } else {
                resultDiv.textContent = 'Incorrect!';
                answer.style.backgroundColor = '#ffaaaa';
            }
            correctAnswerDisplay.style.display = 'block';
        });
    });
});