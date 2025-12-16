
const quiz = [
  {
    q: "what jazz artist do you think I love the most",
    a: [
      "Laufey",
      "Frank Sinatra",
      "Louis Armstrong",
      "Yussef Dayes"
    ],
    correct: 0 
  },

  {
    q: "What part of jazz do I enjoy the most?",
    a: [ "Perfect repetition", "Improvisation", "Loud volume", "Short songs" ],
    correct: 1
  },

  {
    q: "When do I usually listen to jazz?",
    a: [
      "In class ?",
      "While reading ?",
      "During the test ?",
      "All the time"
    ],
    correct: 3
  },

  {
    q: "What is exciting for me when listeing to jazz ?",
    a: [ "Every song sounds the same", "Each record tells a story", "It is very popular", "It is simple music" ],
    correct: 1
  },

  {
    q: "What format do I prefer for jazz?",
    a: [
      "Vinyl if I have money to by more",
      "CD",
      "Spotify",
      "Radio"
    ],
    correct: 1
  },

  {
    q: "What does jazz encourage ?",
    a: [
      "strict rules",
      "improvising",
      "silence",
      "All of the above"
    ],
    correct: 3
  },

  {
    q: "How does jazz make me feel?",
    a: [ "Bored", "Emotionally connected", "Confused", "Angry" ],
    correct: 1
  },

  {
    q: "What kind of listening is jazz for me?",
    a: ["Passive", "Active and focused", "Accidental", "Background noise"],
    correct: 0
    
  },

  {
    q: "Why do I replay jazz albums?",
    a: ["They never change", "They reveal new moments", "They are short", "They are loud"],
    correct: 1
  },

  {
     q: "Jazz is my hobby because…",
    a: ["It reminds me of my grandparents ", "It expresses feeling and freedom", "It is emotional", "All of the above"],
    correct: 3
  }
];



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

