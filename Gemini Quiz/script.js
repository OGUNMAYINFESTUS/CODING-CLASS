const quizContainer = document.querySelector('.quiz-container');
const controls = document.querySelector('.controls');
const timerDisplay = document.getElementById('time');
const progressDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');
const questionPagesContainer = document.querySelector('.question-pages');
const questionNavigationContainer = document.getElementById('question-navigation');
const resultsPage = document.querySelector('.results-page');
const finalScoreDisplay = document.getElementById('final-score');
const correctAnswersDisplay = document.getElementById('correct-answers');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = -1;
let timeLeft = 20;
let timerInterval;
let quizData = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "Blue"
    },
    {
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Abuja", "Kano", "Ibadan"],
        answer: "Abuja"
    },
    {
        question: "What is energy?",
        options: ["Ability to do work", "Power to work", "State of work", "None of the above"],
        answer: "Ability to do work"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["Wa", "H2O", "Wo", "HO2"],
        answer: "H2O"
    }
    // Add more questions here
];
let timerActive = false;
let userAnswers = new Array(quizData.length).fill(null); // Store user's answers

function startQuiz() {
    totalQuestionsDisplay.textContent = quizData.length;
    createNavigationButtons();
    // Initially, no question is shown. The user must select from the navigation.
}

function createQuestionPages() {
    questionPagesContainer.innerHTML = '';
    quizData.forEach((question, index) => {
        const page = document.createElement('div');
        page.classList.add('question-page', 'hidden'); // Remains hidden by default
        page.dataset.index = index;

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `Question ${index + 1}: ${question.question}`;
        page.appendChild(questionTitle);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach(option => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question-${index}`;
            radio.value = option;
            radio.addEventListener('change', () => handleAnswerSelection(index, option));
            if (userAnswers[index] === option) {
                radio.checked = true; // Maintain user's selection
            }
            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${option}`));
            optionsContainer.appendChild(label);
        });
        page.appendChild(optionsContainer);

        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('feedback-container', 'hidden');
        page.appendChild(feedbackDiv);

        questionPagesContainer.appendChild(page);
    });
}

function handleAnswerSelection(questionIndex, selectedOption) {
    userAnswers[questionIndex] = selectedOption;
    const currentQuestion = quizData[questionIndex];
    const feedbackContainer = document.querySelector(`.question-page[data-index="${questionIndex}"] .feedback-container`);

    feedbackContainer.innerHTML = '';

    if (selectedOption === currentQuestion.answer && timerActive) {
        stopTimer();
        const proceedButton = document.createElement('button');
        proceedButton.textContent = "Correct! Proceed";
        proceedButton.addEventListener('click', () => {
            feedbackContainer.classList.add('hidden');
            const nextIndex = questionIndex + 1;
            if (nextIndex < quizData.length) {
                showQuestionPage(nextIndex);
            } else {
                endQuiz();
            }
        });
        feedbackContainer.appendChild(proceedButton);
        feedbackContainer.classList.remove('hidden');
    } else if (timerActive) {
        const stopButton = document.createElement('button');
        stopButton.textContent = "Wrong! See Answer";
        stopButton.addEventListener('click', () => {
            stopTimer();
            feedbackContainer.innerHTML = `<p class="incorrect">Incorrect. Correct Answer: ${currentQuestion.answer}</p>`;
            feedbackContainer.classList.remove('hidden');
        });
        feedbackContainer.appendChild(document.createElement('p'));
        feedbackContainer.appendChild(stopButton);
        feedbackContainer.classList.remove('hidden');
    }
}

function createNavigationButtons() {
    questionNavigationContainer.innerHTML = '';
    quizData.forEach((_, index) => {
        const button = document.createElement('button');
        button.textContent = index + 1;
        button.addEventListener('click', () => {
            const feedbackContainer = document.querySelector(`.question-page[data-index="${currentQuestionIndex}"] .feedback-container`);
            if (currentQuestionIndex === -1 || !feedbackContainer || feedbackContainer.classList.contains('hidden') || !timerActive) {
                showQuestionPage(index);
            } else if (!feedbackContainer.classList.contains('hidden') && feedbackContainer.querySelector('.incorrect')) {
                // Allow navigation away from a wrong answer
                showQuestionPage(index);
            } else if (!feedbackContainer.classList.contains('hidden') && feedbackContainer.querySelector('.correct')) {
                showQuestionPage(index);
            }
        });
        questionNavigationContainer.appendChild(button);
    });
}

function showQuestionPage(index) {
    if (index < 0 || index >= quizData.length) {
        return; // Prevent going out of bounds
    }

    if (currentQuestionIndex !== -1) {
        const previousPage = document.querySelector(`.question-page[data-index="${currentQuestionIndex}"]`);
        if (previousPage) {
            previousPage.classList.add('hidden');
        }
    }

    const pageToShow = document.querySelector(`.question-page[data-index="${index}"]`);
    if (pageToShow) {
        pageToShow.classList.remove('hidden');
        currentQuestionIndex = index;
        progressDisplay.textContent = currentQuestionIndex + 1;
        resetTimer();
        timerActive = true;
        removeCorrectAnswerDisplay(index);
        const feedbackContainer = document.querySelector(`.question-page[data-index="${index}"] .feedback-container`);
        if (feedbackContainer) {
            feedbackContainer.classList.add('hidden');
            feedbackContainer.innerHTML = '';
        }
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;
    timerDisplay.textContent = timeLeft;
    if (currentQuestionIndex !== -1) {
        startTimer();
    } else {
        timerDisplay.textContent = ''; // Keep timer empty until a question is active
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timerActive) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerActive = false;
                showCorrectAnswer(currentQuestionIndex);
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerActive = false;
}

function showCorrectAnswer(index) {
    const currentPage = document.querySelector(`.question-page[data-index="${index}"]`);
    const currentQuestion = quizData[index];
    const feedbackContainer = currentPage.querySelector('.feedback-container');
    feedbackContainer.innerHTML = `<p class="times-up">Time's up! Correct Answer: ${currentQuestion.answer}</p>`;
    feedbackContainer.classList.remove('hidden');
}

function removeCorrectAnswerDisplay(index) {
    const currentPage = document.querySelector(`.question-page[data-index="${index}"]`);
    const existingDisplay = currentPage.querySelector('.times-up');
    if (existingDisplay) {
        existingDisplay.remove();
    }
}

function endQuiz() {
    stopTimer();
    questionPagesContainer.classList.add('hidden');
    controls.classList.add('hidden');
    questionNavigationContainer.classList.add('hidden');
    resultsPage.classList.remove('hidden');
    finalScoreDisplay.textContent = userAnswers.filter((ua, index) => ua === quizData[index].answer).length; // Calculate final score
    displayCorrectAnswers();
}

function displayCorrectAnswers() {
    correctAnswersDisplay.innerHTML = '<h3>Your Answers:</h3>';
    quizData.forEach((question, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer-review');
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        answerDiv.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p><strong>Your Answer:</strong> ${userAnswer !== null ? userAnswer : 'Not Answered'}</p>
            <p><strong>Correct Answer:</strong> ${question.answer}</p>
        `;
        if (isCorrect) {
            answerDiv.classList.add('correct');
        } else {
            answerDiv.classList.add('incorrect');
        }
        correctAnswersDisplay.appendChild(answerDiv);
    });
}

questionNavigationContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const questionIndex = parseInt(event.target.textContent) - 1;
        const feedbackContainer = document.querySelector(`.question-page[data-index="${currentQuestionIndex}"] .feedback-container`);
        if (currentQuestionIndex === -1 || !feedbackContainer || feedbackContainer.classList.contains('hidden') || !timerActive) {
            showQuestionPage(questionIndex);
        } else if (!feedbackContainer.classList.contains('hidden') && feedbackContainer.querySelector('.incorrect')) {
            // Allow navigation away from a wrong answer
            showQuestionPage(questionIndex);
        } else if (!feedbackContainer.classList.contains('hidden') && feedbackContainer.querySelector('.correct')) {
            showQuestionPage(questionIndex);
        }
    }
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = -1;
    timeLeft = 15;
    timerActive = false;
    userAnswers = new Array(quizData.length).fill(null);
    timerDisplay.textContent = '';
    progressDisplay.textContent = ''; // Reset progress display
    resultsPage.classList.add('hidden');
    questionPagesContainer.classList.remove('hidden');
    // Hide all question pages again after restart
    document.querySelectorAll('.question-page').forEach(page => page.classList.add('hidden'));
    controls.classList.remove('hidden');
    questionNavigationContainer.classList.remove('hidden');
    correctAnswersDisplay.innerHTML = "";
    createQuestionPages();
    startQuiz();
});

document.addEventListener('DOMContentLoaded', () => {
    createQuestionPages();
    startQuiz();
    progressDisplay.textContent = ''; // Initially clear the progress display
    // Remove the score and hint elements from the DOM
    const scoreElement = document.getElementById('score');
    if (scoreElement && scoreElement.parentNode) {
        scoreElement.parentNode.removeChild(scoreElement);
    }
    const hintButtonElement = document.getElementById('hint-button');
    if (hintButtonElement && hintButtonElement.parentNode) {
        hintButtonElement.parentNode.removeChild(hintButtonElement);
    }
    const hintTextElement = document.getElementById('hint-text');
    if (hintTextElement && hintTextElement.parentNode) {
        hintTextElement.parentNode.removeChild(hintTextElement);
    }
});