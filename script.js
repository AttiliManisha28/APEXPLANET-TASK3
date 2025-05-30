const quizData = [
  {
    question: "Which is used for Connect To Database?",
    options: ["PHP", "HTML", "JS", "All"],
    answer: "PHP"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyper Mail", "How to Make Lasagna", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

function loadQuestion(index) {
  const q = quizData[index];
  document.getElementById("question").textContent = q.question;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsContainer.appendChild(btn);
  });
  highlightSelected();
  document.getElementById("answer-result").textContent = "";
}

function selectAnswer(answer) {
  userAnswers[currentQuestion] = answer;
  highlightSelected();
}

function highlightSelected() {
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => {
    btn.style.background = (btn.textContent === userAnswers[currentQuestion]) ? "#b2dfdb" : "#e0e0e0";
  });
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

function skipQuestion() {
  userAnswers[currentQuestion] = null;
  nextQuestion();
}

function submitAnswer() {
  const selected = userAnswers[currentQuestion];
  const resultBox = document.getElementById("answer-result");

  if (!selected) {
    resultBox.textContent = "Please select an answer before submitting.";
    resultBox.style.color = "orange";
    return;
  }

  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    resultBox.textContent = "✅ Correct!";
    resultBox.style.color = "green";
  } else {
    resultBox.textContent = `❌ Incorrect. Correct answer is "${correct}".`;
    resultBox.style.color = "red";
  }
}

// WEATHER API
const apiKey = '025f3a9b49b3b78c83c6046711a662b6'; 

function fetchWeather() {
  const city = document.getElementById("city-input").value.trim();
  const weatherResult = document.getElementById("weather-result");

  if (!city) {
    weatherResult.innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("Weather not found.");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const windSpeed = data.wind.speed;
      const country = data.sys.country;

      weatherResult.innerHTML = `
        <h3>${city}, ${country}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <p><strong>${temp}°C</strong> - ${desc}</p>
        <p>Feels Like: ${feelsLike}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    })
    .catch(() => {
      weatherResult.innerHTML = `<p style="color:red;">Failed to fetch weather data.</p>`;
    });
}

function showSection(sectionId) {
  document.getElementById("quiz-section").style.display = sectionId === 'quiz' ? 'block' : 'none';
  document.getElementById("weather-section").style.display = sectionId === 'weather' ? 'block' : 'none';
}

loadQuestion(currentQuestion);
