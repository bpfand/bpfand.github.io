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
    console.log("empty");
  } else {
    textInput.classList.remove('placeholder');
    console.log(`Text-${textInput.innerText}-Text`);
    console.log(textInput.innerText.length);
    console.log(textInput.innerText.charCodeAt(0));
  }
})

textInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    checkBtn.click();
  }
});

checkBtn.addEventListener("click", () => {
  const userInput = cleanInputString(textInput.innerText.toLowerCase());
  console.log(userInput);
  if (userInput === "") {
    resultDiv.classList.add('hide');
    alert(`Please input a value`);
    return null;
  } else {
    checkPalindrome(userInput);
  }
});
