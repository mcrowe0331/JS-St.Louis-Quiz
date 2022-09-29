const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "When was the city of St. Louis founded?",
    choice1: "1764",
    choice2: "1684",
    choice3: "1864",
    choice4:"1986",
    answer: 1
  },
  {
    question: "In which year did the Cardinals win their very first World Series title?",
    choice1: "1904",
    choice2: "1926",
    choice3: "1948",
    choice4: "1969",
    answer: 2
  },
  {
  question: "Which of these is the nickname of the city of St. Louis?",
  choice1: "Lions Heart City",
  choice2: "Braveheart City",
  choice3: "Gateway City",
  choice4: "Iron City",
  answer: 3
  },
  {
    question: "St. Louis has _ airports?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2
    },
    {
      question: "The Hill is a St. Louis neighborhood famous for what type of culture and ethnicity?",
      choice1: "Italian",
      choice2: "German",
      choice3: "Bosnian",
      choice4: "Greek",
      answer: 1
    },
  ];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //update progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

 const questionIndex = Math.floor(Math.random() * availableQuestions.length);
 currentQuestion = availableQuestions[questionIndex];
 question.innerText = currentQuestion.question;

 choices.forEach(choice => {
  const number = choice.dataset["number"];
  choice.innerText = currentQuestion["choice" + number];
});

availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
startGame();

  