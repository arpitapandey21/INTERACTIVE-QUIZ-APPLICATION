// ✅ 15 COMPLETE WEB TECH QUESTIONS - NO ERRORS!
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correct: 1
    },
    {
        question: "Which is the largest heading tag?",
        options: ["<h1>", "<heading>", "<head>", "<h6>"],
        correct: 0
    },
    {
        question: "Which method adds element to end of array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "What is used for routing in React?",
        options: ["Redux", "React Router", "React Context", "React Hooks"],
        correct: 1
    },
    {
        question: "Difference between 'let' and 'const'?",
        options: ["let can be reassigned", "const can be reassigned", "Both are same", "No difference"],
        correct: 0
    },
    {
        question: "How to center align items in Flexbox?",
        options: ["justify-content: center", "align-items: center", "Both", "margin: auto"],
        correct: 2
    },
    {
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Ordered Notation", "JavaScript Object Number"],
        correct: 0
    },
    {
        question: "Which is ES6 async feature?",
        options: ["Promises", "async/await", "Callbacks", "Event Loop"],
        correct: 1
    },
    {
        question: "How to define rows in CSS Grid?",
        options: ["grid-template-rows", "grid-rows", "rows-template", "display: rows"],
        correct: 0
    },
    {
        question: "What does Array.map() return?",
        options: ["New array", "Void", "Boolean", "Number"],
        correct: 0
    },
    {
        question: "How long does LocalStorage data persist?",
        options: ["Permanent", "Session based", "Until refresh", "Until tab close"],
        correct: 0
    },
    {
        question: "What does GET method do in REST API?",
        options: ["Create data", "Read data", "Update data", "Delete data"],
        correct: 1
    },
    {
        question: "How to create responsive breakpoints?",
        options: ["@media queries", "@responsive", "media screen", "screen queries"],
        correct: 0
    },
    {
        question: "What is useState used for in React?",
        options: ["Class component", "Function component Hook", "Reducer", "Context"],
        correct: 1
    }
];

// 🧠 Game Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let selectedAnswer = null;
let gameActive = true;
let startTime = Date.now();
let totalTime = 0;

// 🎯 DOM Elements
const elements = {
    questionText: document.getElementById('questionText'),
    qNumber: document.getElementById('qNumber'),
    optionsGrid: document.getElementById('optionsGrid'),
    nextBtn: document.getElementById('nextBtn'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    questionTimer: document.getElementById('questionTimer'),
    currentScore: document.getElementById('currentScore'),
    questionCounter: document.getElementById('questionCounter'),
    resultsModal: document.getElementById('resultsModal'),
    finalScoreNum: document.getElementById('finalScoreNum'),
    accuracyPercent: document.getElementById('accuracyPercent'),
    gradeBadge: document.getElementById('gradeBadge'),
    resultTitle: document.getElementById('resultTitle'),
    totalTimeTaken: document.getElementById('totalTimeTaken'),
    questionsAttempted: document.getElementById('questionsAttempted'),
    restartBtn: document.getElementById('restartBtn')
};

// 🚀 Initialize Quiz
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    updateUI();
});

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    
    // Update question display
    elements.questionText.textContent = q.question;
    elements.qNumber.textContent = currentQuestion + 1;
    elements.questionCounter.textContent = `Q${currentQuestion + 1}/15`;
    elements.currentScore.textContent = `Score: ${score}`;
    
    // Update progress
    const progress = ((currentQuestion + 1) / 15) * 100;
    elements.progressText.textContent = Math.round(progress) + '%';
    elements.progressFill.style.strokeDashoffset = 164 - (164 * progress / 100);
    
    // Reset timer
    timeLeft = 30;
    elements.questionTimer.textContent = '30s';
    document.getElementById('questionTimer').classList.remove('warning');
    
    // Clear previous options
    elements.optionsGrid.innerHTML = '';
    
    // Load new options
    q.options.forEach((option, index) => {
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.innerHTML = `<span>${option}</span>`;
        optionCard.onclick = () => selectAnswer(index, optionCard);
        elements.optionsGrid.appendChild(optionCard);
    });
    
    // Reset UI
    elements.nextBtn.disabled = true;
    selectedAnswer = null;
    gameActive = true;
    
    // Start question timer
    clearInterval(timerInterval);
    startQuestionTimer();
}

function selectAnswer(index, optionCard) {
    if (!gameActive || selectedAnswer !== null) return;
    
    selectedAnswer = index;
    gameActive = false;
    clearInterval(timerInterval);
    
    // Disable all options
    document.querySelectorAll('.option-card').forEach((card, i) => {
        card.style.pointerEvents = 'none';
        
        if (i === quizQuestions[currentQuestion].correct) {
            card.classList.add('correct');
        } else if (i === index && index !== quizQuestions[currentQuestion].correct) {
            card.classList.add('incorrect');
        }
    });
    
    // Highlight selected answer
    optionCard.classList.add('selected');
    
    // Check answer after animation
    setTimeout(() => {
        if (index === quizQuestions[currentQuestion].correct) {
            score++;
        }
        updateUI();
        elements.nextBtn.disabled = false;
    }, 1200);
}

function startQuestionTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        elements.questionTimer.textContent = timeLeft + 's';
        
        if (timeLeft <= 5) {
            elements.questionTimer.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            elements.nextBtn.disabled = false;
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    totalTime = Math.round((Date.now() - startTime) / 1000);
    
    const percentage = Math.round((score / 15) * 100);
    elements.finalScoreNum.textContent = score;
    elements.accuracyPercent.textContent = percentage + '%';
    elements.questionsAttempted.textContent = 15;
    elements.totalTimeTaken.textContent = formatTime(totalTime);
    
    // Grade system
    let title = '';
    let gradeClass = '';
    
    if (percentage >= 90) {
        title = '👑 WEB MASTERY ACHIEVED!';
        gradeClass = 'grade-perfect';
    } else if (percentage >= 75) {
        title = '⭐ ELITE DEVELOPER!';
        gradeClass = 'grade-excellent';
    } else if (percentage >= 60) {
        title = '✅ PROFESSIONAL LEVEL!';
        gradeClass = 'grade-good';
    } else {
        title = '📚 KEEP LEARNING!';
        gradeClass = 'grade-improve';
    }
    
    elements.resultTitle.textContent = title;
    elements.gradeBadge.textContent = percentage + '%';
    elements.gradeBadge.className = `grade-badge ${gradeClass}`;
    
    elements.resultsModal.classList.add('show');
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateUI() {
    elements.currentScore.textContent = `Score: ${score}`;
    elements.questionCounter.textContent = `Q${currentQuestion + 1}/15`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    startTime = Date.now();
    elements.resultsModal.classList.remove('show');
    loadQuestion();
    updateUI();
}

// 🎧 Event Listeners
elements.nextBtn.onclick = nextQuestion;
elements.restartBtn.onclick = restartQuiz;

