const toggleBtn = document.getElementById("toggleBtn");
const output = document.getElementById("output");

let recognition;
let isListening = false;
let finalTranscript = ""; // To store the entire transcript

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
  let interimTranscript = ""; // For storing interim results
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript; // Append to final transcript
    } else {
      interimTranscript += event.results[i][0].transcript; // Handle interim results
    }
  }
  output.value = finalTranscript + interimTranscript;

  // Optional: Auto-scroll to the bottom
  output.scrollTop = output.scrollHeight;
};

recognition.onerror = function (event) {
  console.error("Speech recognition error detected: " + event.error);
};

recognition.onend = function () {
  console.log("Speech recognition service disconnected");
  isListening = false;
  toggleBtn.classList.remove("bg-red-500", "hover:bg-red-600");
  toggleBtn.classList.add("bg-blue-500", "hover:bg-blue-600");
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
  toggleBtn.classList.remove("bg-blue-500", "hover:bg-blue-600");
  toggleBtn.classList.add("bg-red-500", "hover:bg-red-600");
  toggleBtn.textContent = "Stop Listening";
}

function stopRecognition() {
  recognition.stop();
  isListening = false;
  toggleBtn.classList.remove("bg-red-500", "hover:bg-red-600");
  toggleBtn.classList.add("bg-blue-500", "hover:bg-blue-600");
  toggleBtn.textContent = "Start Listening";
}

function speak() {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(output.value);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice

  // Speak the text
  speechSynthesis.speak(utterance);
}
