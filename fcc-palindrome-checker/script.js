const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result-div');
let palindromeCheckResult = "";

function cleanInputString(str) {
  const regex = /[^0-9a-z]/gi;
  return str.replace(regex, '');
}

function isPalindrome(str) {
  const backwards = turnBackwards(str);
  if (str === backwards) {
    return true;
  }
  return false;
}

function turnBackwards(str) {
  let reversed = "";
  for (let i = str.length; i >= 0; i--) {
    reversed = reversed + str.charAt(i);
  }
  return reversed;
}

function checkPalindrome(str) {
  if (isPalindrome(str)) {
    palindromeCheckResult = "is"
  } else {
    palindromeCheckResult = "is not"
  }
  resultDiv.innerHTML = `
    <h3>Result:</h3>
    <p class="italic">${textInput.innerText}</p>
    <p>${palindromeCheckResult} a palindrome</p>`;
  resultDiv.classList.remove('hide');
}

textInput.addEventListener("input", () => {
  if (textInput.innerText.charCodeAt(0) === 10) {
    textInput.classList.add('placeholder');
  } else {
    textInput.classList.remove('placeholder');
  }
})

textInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
  	event.preventDefault();
    checkBtn.click();
  }
});

checkBtn.addEventListener("click", () => {
  const userInput = cleanInputString(textInput.innerText.toLowerCase());
  if (userInput === "") {
    resultDiv.classList.add('hide');
    alert(`Please input a value`);
    return null;
  } else {
    checkPalindrome(userInput);
  }
});
