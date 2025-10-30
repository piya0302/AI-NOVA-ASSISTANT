let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let themeToggle = document.querySelector("#themeToggle");
let openedTabs = [];

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-IN";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let hours = new Date().getHours();
  if (hours < 12) speak("Good morning, Sir!");
  else if (hours < 16) speak("Good afternoon, Sir!");
  else speak("Good evening, Sir!");
}

// Auto greet on page load
window.addEventListener('load', () => {
  wishMe();
});

// Speech recognition setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  let transcript = event.results[event.resultIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
});

// Dark/Light mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  speak(isLight ? "Light mode activated" : "Dark mode activated");
});

function takeCommand(message) {
  voice.style.display = "none";
  btn.style.display = "flex";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  }
  else if (message.includes("who are you")) {
    speak("I am Nova, your virtual assistant, created by Priyanshu.");
  }
  else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    openedTabs.push(window.open("https://www.youtube.com", "_blank"));
  }
  else if (message.includes("open google")) {
    speak("Opening Google...");
    openedTabs.push(window.open("https://www.google.com", "_blank"));
  }
  else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    openedTabs.push(window.open("https://www.facebook.com", "_blank"));
  }
  else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    openedTabs.push(window.open("https://www.instagram.com", "_blank"));
  }
  else if (message.includes("open gmail")) {
    speak("Opening Gmail...");
    openedTabs.push(window.open("https://mail.google.com", "_blank"));
  }
  else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp Web...");
    openedTabs.push(window.open("https://web.whatsapp.com", "_blank"));
  }
  else if (message.includes("open file")) {
    let fileName = message.replace("open file", "").trim();
    if (fileName) {
      speak(`Opening file ${fileName}`);
      openedTabs.push(window.open(fileName, "_blank"));
    } else {
      speak("Please say the file name clearly.");
    }
  }
  else if (message.includes("close all windows")) {
    speak("Closing all opened windows...");
    openedTabs.forEach(tab => tab.close());
    openedTabs = [];
  }
  else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    speak(`The time is ${time}`);
  }
  else if (message.includes("date")) {
    let date = new Date().toLocaleDateString([], { day: "numeric", month: "long" });
    speak(`Today's date is ${date}`);
  }
  else {
    let query = message.replace("nova", "").trim();
    speak(`Here is what I found for ${query}`);
    openedTabs.push(window.open(`https://www.google.com/search?q=${query}`, "_blank"));
  }
}
