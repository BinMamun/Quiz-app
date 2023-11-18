const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      {
        text: "Shark", result: false,
      },
      {
        text: "Blue Whale", result: true,
      },
      {
        text: "Elephant", result: false,
      },
      {
        text: "Giraffe", result: false,
      }]
  },
  {
    question: "Which animal lays eggs?",
    answers: [
      {
        text: "Dog", result: false,
      },
      {
        text: "Cat", result: false,
      },
      {
        text: "Duck", result: true,
      },
      {
        text: "Sheep", result: false,
      }]
  },
  {
    question: "A male cow is called?",
    answers: [
      {
        text: "Monkey", result: false,
      },
      {
        text: "Dog", result: false,
      },
      {
        text: "Sheep", result: false,
      },
      {
        text: "Ox", result: true,
      }]
  },
  {
    question: "All animals need food, air, and ____ to survive.",
    answers: [
      {
        text: "House", result: false,
      },
      {
        text: "Chocolate", result: false,
      },
      {
        text: "Water", result: true,
      },
      {
        text: "Fruits", result: false,
      }]
  }
];

const questionElement = document.querySelector(".js-question");
const answerButtons = document.querySelector(".js-answer-buttons");
const nextButton = document.querySelector(".js-next-button");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNO = currentQuestionIndex + 1;

  questionElement.innerHTML = `${questionNO}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    if (answer.result) {
      button.dataset.result = answer.result;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  })
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.result === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.result === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
  else {
    startQuiz();
  }
})

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

startQuiz();