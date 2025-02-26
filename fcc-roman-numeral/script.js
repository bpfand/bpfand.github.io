const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputDiv = document.getElementById("output-div");
const outputBody = document.getElementById("output-body");
const outputTitle = document.getElementById("output-title");
const output = document.getElementById("output");
const errorMsg = document.getElementById("error-msg");
const explanation = document.getElementById("explanation");
const explanationButton = document.getElementById("explanation-button");
const showExplanation = document.getElementById("show-explanation");
const hideExplanation = document.getElementById("hide-explanation");
const largeNumToggle = document.getElementById("large-num-toggle");

const numerals = [
  {letter: "M",
  value: 1000},
  {letter: "CM",
  value: 900},
  {letter: "D",
  value: 500},
  {letter: "CD",
  value: 400},
  {letter: "C",
  value: 100},
  {letter: "XC",
  value: 90},
  {letter: "L",
  value: 50},
  {letter: "XL",
  value: 40},
  {letter: "X",
  value: 10},
  {letter: "IX",
  value: 9},
  {letter: "V",
  value: 5},
  {letter: "IV",
  value: 4},
  {letter: "I",
  value: 1}
];

let isValidNum = false;
let useLargeNumber = false;
let outputText = ``;
let errorText = ``;

const reset = () => {
  isValidNum = false;
  useLargeNumber = largeNumToggle.checked;
  outputText = ``;
  errorText = ``;

  output.innerHTML = outputText;
  errorMsg.innerHTML = errorText;

  outputBody.classList.add("hide");
  explanationButton.classList.add("hide");
  outputDiv.classList.add("hide");
  outputTitle.classList.add("hide");
};

const checkNum = (num) => {
  switch(true) {
    case num=="":
        errorText = `<p>Please enter a valid number</p>`;
        break;

    case num<1:
        errorText = `<p>Please enter a number greater than or equal to 1</p>`;
        break;
      
    case num>3999 && useLargeNumber==false:
      errorText = `<p>Please enter a number smaller than or equal to 3999</p>`;
      break;

    default:
      isValidNum = true;
  }
};

const displayOutput = () => {
  outputDiv.classList.remove("hide")
  output.innerHTML = outputText;
  errorMsg.innerHTML = errorText;

  if (isValidNum) {
    outputBody.classList.remove("hide");
    explanationButton.classList.remove("hide");
    outputTitle.classList.remove("hide");
  }
}

const splitNum = (num) => {
  const hundThouNum = Math.floor(num / 100000);
  const thousandsNum = Math.floor((num - (hundThouNum * 100000)) / 1000);
  const hundredsNum = Math.floor((num - (hundThouNum * 100000) - (thousandsNum * 1000)));
  
  outputText += `<p class="hund-thousands">`;
  convertInput(hundThouNum);
  outputText += `</p>`;

  outputText += `<p class="thousands">`;
  convertInput(thousandsNum);
  outputText += `</p>`;
  
  outputText += `<p class="hundreds">`;
  convertInput(hundredsNum);
  outputText += `</p>`;
}

const convertInput = (input) => {
  let letter = "";
  let value = 0;
  let repeats = 0;

  if (input <= 3) {
    outputText += "I".repeat(input);
    return;
  } 
  
  else {
    numerals.some((el) => {
      if (input >= el.value) {
        letter = el.letter;
        value = el.value;
        repeats = Math.floor(input / el.value);
        return true;
      }
    });
    outputText += letter.repeat(repeats);
    return convertInput(input % value);
  }
}

convertBtn.addEventListener("click", () => {
  reset();
  const num = numberInput.value;
  checkNum(num);

  if (isValidNum && useLargeNumber) {
    splitNum(num);
  } else if (isValidNum) {
    convertInput(num);
  }
  displayOutput();
});

explanationButton.addEventListener("click", () => {
  explanation.classList.toggle("hide");
  showExplanation.classList.toggle("hide");
  hideExplanation.classList.toggle("hide");
});

