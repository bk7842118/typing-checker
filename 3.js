const textAPILink = "https://api.quotable.io/random";
const bkQuote = document.getElementById("quoteDisplay");
const bkInput = document.getElementById("quoteInput");
const bkTimer = document.getElementById("timer");

var wordCnt = 0;

bkInput.addEventListener("input", () => {
  const arrQuote = bkQuote.querySelectorAll("span");
  const arrVal = bkInput.value.split("");

  let correct = true;
  arrQuote.forEach((charSpan, index) => {
    const character = arrVal[index];
    if (character == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");

      correct = false;
    }
  });

  if (correct) {
    let time = getTime();
    let speed = (wordCnt * 12) / time;
    speed = parseInt(speed);
    // alert("Your Typing Speed: " + speed + " wpm");
    document.getElementById("timer1").innerText = "Your Typing Speed: " + speed + " WPM";
    window.addEventListener("keydown", () => {
      document.getElementById("timer1").innerText = "";
      window.location.reload();
    });
  }
});

function getQuote() {
  return fetch(textAPILink)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function printQuote() {
  const quote = await getQuote();
  wordCnt = quote.length;
  bkQuote.innerHTML = "";
  quote.split("").forEach((character) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = character;
    bkQuote.appendChild(charSpan);
  });
  bkInput.value = null;
  beginTimer();
}

let startTime;

function beginTimer() {
  bkTimer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTime();
  }, 1000);
}

function getTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

printQuote();