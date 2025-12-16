/* ======================================
   JAZZ QUIZ — EDIT YOUR OWN QUESTIONS
   ====================================== */

const quiz = [
  {
    q: "QUESTION 1 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0 // change to 0,1,2,or 3
  },

  {
    q: "QUESTION 2 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 3 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 4 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 5 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 6 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 7 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 8 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 9 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  },

  {
    q: "QUESTION 10 GOES HERE",
    a: [
      "Answer A",
      "Answer B",
      "Answer C",
      "Answer D"
    ],
    correct: 0
  }
];

/* ========= QUIZ LOGIC (DO NOT EDIT) ========= */

let index = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");

function loadQuestion(){
  const q = quiz[index];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  progressEl.textContent = `Question ${index + 1} / ${quiz.length}`;

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "answer-btn";
    btn.onclick = () => selectAnswer(btn, i);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(btn, i){
  const correct = quiz[index].correct;
  [...answersEl.children].forEach(b => b.disabled = true);

  if(i === correct){
    btn.classList.add("correct");
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    btn.classList.add("wrong");
    answersEl.children[correct].classList.add("correct");
  }
  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  index++;
  nextBtn.classList.add("hidden");

  if(index < quiz.length){
    loadQuestion();
  } else {
    document.querySelector(".quiz-card").classList.add("hidden");
    resultEl.classList.remove("hidden");
    finalScoreEl.textContent = `You scored ${score} / ${quiz.length} 🎷`;
  }
};

loadQuestion();

