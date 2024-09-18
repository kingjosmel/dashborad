const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;

const questions = [
    { 
        question: 'What does HTML stand for?', 
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Home Tool Markup Language', correct: false },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Hyper Text Makeup Language', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used for the largest heading?', 
        answers: [
            { text: '<head>', correct: false },
            { text: '<h6>', correct: false },
            { text: '<h1>', correct: true },
            { text: '<heading>', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used to define an internal style sheet?', 
        answers: [
            { text: '<css>', correct: false },
            { text: '<script>', correct: false },
            { text: '<style>', correct: true },
            { text: '<link>', correct: false }
        ]
    },
    { 
        question: 'Which HTML attribute is used to define inline styles?', 
        answers: [
            { text: 'class', correct: false },
            { text: 'style', correct: true },
            { text: 'font', correct: false },
            { text: 'styles', correct: false }
        ]
    },
    { 
        question: 'Which is the correct HTML element for inserting a line break?', 
        answers: [
            { text: '<break>', correct: false },
            { text: '<lb>', correct: false },
            { text: '<br>', correct: true },
            { text: '<line>', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used to define a paragraph?', 
        answers: [
            { text: '<para>', correct: false },
            { text: '<paragraph>', correct: false },
            { text: '<p>', correct: true },
            { text: '<pg>', correct: false }
        ]
    },
    { 
        question: 'What is the correct HTML element for inserting an image?', 
        answers: [
            { text: '<image>', correct: false },
            { text: '<picture>', correct: false },
            { text: '<img>', correct: true },
            { text: '<src>', correct: false }
        ]
    },
    { 
        question: 'What does the <a> HTML element represent?', 
        answers: [
            { text: 'An anchor', correct: false },
            { text: 'A hyperlink', correct: true },
            { text: 'An article', correct: false },
            { text: 'A link list', correct: false }
        ]
    },
    { 
        question: 'Which attribute is used in HTML to specify the URL of a link?', 
        answers: [
            { text: 'url', correct: false },
            { text: 'link', correct: false },
            { text: 'href', correct: true },
            { text: 'src', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used to create a numbered list?', 
        answers: [
            { text: '<ul>', correct: false },
            { text: '<ol>', correct: true },
            { text: '<li>', correct: false },
            { text: '<list>', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used to create an unordered list?', 
        answers: [
            { text: '<ol>', correct: false },
            { text: '<li>', correct: false },
            { text: '<ul>', correct: true },
            { text: '<list>', correct: false }
        ]
    },
    { 
        question: 'Which attribute is used in HTML to open a link in a new tab?', 
        answers: [
            { text: 'target="newtab"', correct: false },
            { text: 'target="_blank"', correct: true },
            { text: 'open="new"', correct: false },
            { text: 'window="new"', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used to play audio files?', 
        answers: [
            { text: '<audio>', correct: true },
            { text: '<music>', correct: false },
            { text: '<sound>', correct: false },
            { text: '<media>', correct: false }
        ]
    },
    { 
        question: 'Which HTML element is used to play video files?', 
        answers: [
            { text: '<movie>', correct: false },
            { text: '<media>', correct: false },
            { text: '<film>', correct: false },
            { text: '<video>', correct: true },
        ]
    },
    { 
        question: 'Which attribute is used to make an input field required?', 
        answers: [
            { text: 'mandatory', correct: false },
            { text: 'required', correct: true },
            { text: 'validate', correct: false },
            { text: 'must', correct: false },
        ]
    },
    { 
        question: 'How can you make a numbered list in HTML?', 
        answers: [
            { text: '<ol>', correct: true },
            { text: '<ul>', correct: false },
            { text: '<dl>', correct: false },
            { text: '<list>', correct: false }
        ]
    },
    { 
        question: 'Which element is used to define a table in HTML?', 
        answers: [
            { text: '<tab>', correct: false },
            { text: '<tr>', correct: false },
            { text: '<td>', correct: false },
            { text: '<table>', correct: true },
        ]
    },
    { 
        question: 'What does the <meta> HTML tag do?', 
        answers: [
            { text: 'Defines the main content of the document', correct: false },
            { text: 'Links external resources', correct: false },
            { text: 'Provides metadata about the HTML document', correct: true },
            { text: 'Styles the document', correct: false }
        ]
    },
    { 
        question: 'Which element is used to define the title of an HTML document?', 
        answers: [
            { text: '<head>', correct: false },
            { text: '<meta>', correct: false },
            { text: '<title>', correct: true },
            { text: '<header>', correct: false }
        ]
    },
    { 
        question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?', 
        answers: [
            { text: 'title', correct: false },
            { text: 'src', correct: false },
            { text: 'href', correct: false },
            { text: 'alt', correct: true },
        ]
    }
];


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('bg-gray-200', 'p-2', 'rounded', 'hover:bg-gray-300');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        correctAnswers++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('bg-green-500');
    } else {
        element.classList.add('bg-red-500');
    }
}

function clearStatusClass(element) {
    element.classList.remove('bg-green-500');
    element.classList.remove('bg-red-500');
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    resultMessage.innerText = `You got ${correctAnswers} out of ${questions.length} correct!`;
}
