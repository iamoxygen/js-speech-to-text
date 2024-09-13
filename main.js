const toggleBtn = document.getElementById("toggleBtn");
const output = document.getElementById("output");

let recognition;
let isListening = false;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
} else if ("SpeechRecognition" in window) {
  recognition = new SpeechRecognition();
} else {
  alert("Your browser does not support the Web Speech API");
}

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

recognition.onresult = function (event) {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  output.value = transcript;
};

recognition.onerror = function (event) {
  console.error("Speech recognition error detected: " + event.error);
};

recognition.onend = function () {
  console.log("Speech recognition service disconnected");
  isListening = false;
  toggleBtn.textContent = "Start Listening";
};

toggleBtn.addEventListener("click", toggleRecognition);

function toggleRecognition() {
  if (isListening) {
    stopRecognition();
  } else {
    startRecognition();
  }
}

function startRecognition() {
  recognition.start();
  isListening = true;
  toggleBtn.classList.add(
    "bg-blue-500"
  );
  toggleBtn.textContent = "Stop Listening";
}

function stopRecognition() {
  recognition.stop();
  isListening = false;
  toggleBtn.classList.add(
    "bg-red-500"
  );
  toggleBtn.textContent = "Start Listening";
}
