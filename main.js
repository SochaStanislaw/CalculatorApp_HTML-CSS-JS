// liczba wpisywana na ekran to current number:
const currentNumber = document.querySelector(".currentNumber");

// liczba na której wykonujwmy działanie to previous number:
const previousNumber = document.querySelector(".previousNumber p");

// tutaj jest span gdzie wyświetla się aktualny znak wykonywanego działania +- / *
const mathSign = document.querySelector(".mathSign");

// wszystkie btns z liczbami:
const numbersButtons = document.querySelectorAll(".number");

// opartory działań matematycznych:
const operatorsButtons = document.querySelectorAll(".operator");

// znak równości:
const equalsButton = document.querySelector(".equals");

// przycisk CLEAR do czyszczenia działań:
const clearButton = document.querySelector(".clear");

// historia działań:
const calculatorHistory = document.querySelector(".history");

// przycisk do czyszczenia historii:
const historyBtn = document.querySelector(".historyBtn");

// zmienna która będzie przechowywać wynik:
let result = "";

// Funkcje:
function displayNumber() {
  if (this.textContent === "." && currentNumber.innerHTML === "")
    return (currentNumber.innerHTML = "0.");

  if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;

  // DO NAPISANIA FUNKCJA
  // funkacja jeżeli mamy wiele zer i stawiamy przecinek
  // to z wielu zer przed przecinkiem robi się jedno zero

  currentNumber.innerHTML += this.textContent;
}

function operate() {
  if (currentNumber.innerHTML === "" && this.textContent === "-") {
    currentNumber.innerHTML = "-";
    return;
  } else if (currentNumber.innerHTML === "") {
    return;
  }

  if (mathSign.innerHTML !== "") {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = "";
}

function showResult() {
  if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = b - a;
      break;
    case "x":
      result = a * b;
      break;
    case ":":
      result = b / a;
      break;
    case "a^":
      result = b ** a;
      break;
  }

  addToHistory();
  historyBtn.classList.add("active");

  currentNumber.innerHTML = result;
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

function addToHistory() {
  const newHistoryItem = document.createElement("li");
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} 
  ${previousNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add("history-item");
  calculatorHistory.appendChild(newHistoryItem);
}

function clearScreen() {
  result = "";
  currentNumber.innerHTML = "";
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

function clearHistory() {
  calculatorHistory.textContent = "";
  if (calculatorHistory.textContent === "") {
    historyBtn.classList.remove("active");
  }
}

// nasłuchiwanie przycisków -- spoko jest to trzymać na dole:
numbersButtons.forEach((button) =>
  button.addEventListener("click", displayNumber)
);

operatorsButtons.forEach((button) => button.addEventListener("click", operate));

equalsButton.addEventListener("click", showResult);

clearButton.addEventListener("click", clearScreen);

historyBtn.addEventListener("click", clearHistory);
