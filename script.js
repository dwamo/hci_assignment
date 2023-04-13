const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const timerDuration = 60; // 1 minute

let shuffledQuestions, currentQuestionIndex, startTime, correctAnswers;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  startTime = new Date().getTime(); // record start time
  correctAnswers = 0; // initialize correctAnswers variable
  setNextQuestion();
  startTimer(); // start the timer
}

function startTimer() {
  let timeLeft = timerDuration;
  const timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endQuiz();
    }
    timerElement.innerText = `Time left: ${timeLeft}s`;
    timeLeft--;
  }, 1000);
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
      button.classList.add('answer-button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    correctAnswers++; // increment correctAnswers variable
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    clearInterval(timerId); // stop the timer
    endQuiz();
  }
}

function endQuiz() {
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000; // calculate time taken in seconds
  const score = `${correctAnswers} out of ${questions.length}`;
  questionElement.innerText = `Quiz complete! Your score is ${score} and you took ${timeTaken.toFixed(2)} seconds to complete the quiz.`;
  answerButtonsElement.innerHTML = '';
  nextButton.classList.add('hide');
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
}
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  

  
  const questions = [
  {
    question: 'What is the capital of Ghana?',
    answers: [
      { text: 'Kumasi', correct: false },
      { text: 'Accra', correct: true },
      { text: 'Sunyani', correct: false },
      { text: 'Ho', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Jupiter', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Saturn', correct: false },
      { text: 'Venus', correct: false }
    ]
  },
  {
    question: 'Who is the president of Ghana?',
    answers: [
      { text: 'Nana Akuffo Addo', correct: true },
      { text: 'Isaac Dwamena', correct: false },
      { text: 'Seth Martins', correct: false },
      { text: 'Angelina Adams', correct: false }
    ]
  },
  {
    question: 'What is the largest continent in the world?',
    answers: [
      { text: 'North America', correct: false },
      { text: 'Europe', correct: false },
      { text: 'Asia', correct: true },
      { text: 'Africa', correct: false }
    ]
  },
  {
    question: 'Which of the following is not a programming language?',
    answers: [
      { text: 'Java', correct: false },
      { text: 'Python', correct: false },
      { text: 'Ruby', correct: false },
      { text: 'Microsoft', correct: true }
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answers: [
      { text: 'Monaco', correct: false },
      { text: 'Vatican City', correct: true },
      { text: 'San Marino', correct: false },
      { text: 'Nauru', correct: false }
    ]
  },
  {
    question: 'Which of the following is a mammal?',
    answers: [
      { text: 'Crocodile', correct: false },
      { text: 'Penguin', correct: false },
      { text: 'Giraffe', correct: true },
      { text: 'Salmon', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean in the world?',
    answers: [
      { text: 'Atlantic', correct: false },
      { text: 'Arctic', correct: false },
      { text: 'Indian', correct: false },
      { text: 'Pacific', correct: true }
    ]
  },
  {
    question: 'Who invented the telephone?',
    answers: [
      { text: 'Alexander Graham Bell', correct: true },
      { text: 'Thomas Edison', correct: false },
      { text: 'Nikola Tesla', correct: false },
      { text: 'Isaac Newton', correct: false }
    ]
  },
  {
    question: 'Which of the following is a type of rock?',
    answers: [
      { text: 'Tulip', correct: false },
      { text: 'Granite', correct: true },
      { text: 'Piano', correct: false },
      { text: 'Painting', correct: false }
    ]
  }
];

  function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startButton.innerText = 'Next'; // add this line
}