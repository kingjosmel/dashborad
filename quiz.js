const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;

const questions = [
  {
    question: "What is the correct syntax to declare a constant in JavaScript?",
    answers: [
      { text: "const myVar;", correct: true },
      { text: "var const myVar;", correct: false },
      { text: "constant myVar;", correct: false },
      { text: "myVar const;", correct: false },
    ],
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "add()", correct: false },
      { text: "append()", correct: false },
      { text: "insert()", correct: false },
    ],
  },
  {
    question: "What is the output of: typeof null?",
    answers: [
      { text: '"null"', correct: false },
      { text: '"object"', correct: true },
      { text: '"undefined"', correct: false },
      { text: '"number"', correct: false },
    ],
  },
  {
    question: "How do you define an arrow function in JavaScript?",
    answers: [
      { text: "function => () {}", correct: false },
      { text: "() => {}", correct: true },
      { text: "function() => {}", correct: false },
      { text: "=> () {}", correct: false },
    ],
  },
  {
    question: "Which keyword is used to check strict equality in JavaScript?",
    answers: [
      { text: "==", correct: false },
      { text: "=", correct: false },
      { text: "!=", correct: false },
      { text: "===", correct: true },
    ],
  },
];

startButton.addEventListener("click", () => startQuiz());
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartButton.addEventListener("click", () => startQuiz());

const startQuiz = () => {
  startButton.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  correctAnswers = 0;
  setNextQuestion();
};

const setNextQuestion = () => {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

const showQuestion = (question) => {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("bg-gray-200", "p-2", "rounded");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
};

const resetState = () => {
  nextButton.classList.add("hidden");
  answerButtonsElement.innerHTML = "";
};

const selectAnswer = (e) => {
  const selected = e.target;
  const correct = selected.dataset.correct;
  if (correct) correctAnswers++;

  Array.from(answerButtonsElement.children).forEach((btn) =>
    setStatusClass(btn, btn.dataset.correct)
  );

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    showResult();
  }
};

const setStatusClass = (el, correct) => {
  clearStatusClass(el);
  el.classList.add(correct ? "bg-green-500" : "bg-red-500");
};

const clearStatusClass = (el) => {
  el.classList.remove("bg-green-500", "bg-red-500");
};

const showResult = () => {
  quizContainer.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultMessage.innerText = `You got ${correctAnswers} out of ${questions.length} correct!`;
};
