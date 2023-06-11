const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

fetch("../json/questions.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    availableQuesions = loadedQuestions;
    startQuiz();
  });


const CORRECT_ANSWER = 10;
const MAX_QUESTIONS = 10;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('RecentScore', score);
    return window.location.assign("../html/score.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["choice"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["choice"];

    const applyClass =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (applyClass === "correct") {
      score += CORRECT_ANSWER;
      scoreText.innerText = score;
    }

    selectedChoice.parentElement.classList.add(applyClass);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(applyClass);
      getNewQuestion();
    }, 2000);
  });
});
