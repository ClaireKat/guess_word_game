const guessedLetterElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const guessLetter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const remainingGuessesSpan = document.querySelector(".remaining span");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const request = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await request.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();

  wordProgress(word);
};

getWord();

const wordProgress = function (word) {
  // have a black circle for each letter in the 'word' variable
  const placeholders = [];
  for (const letter in word) {
    placeholders.push("●");
  }
  // use join() method otherwise the array elements will be separated by a comma
  progress.innerText = placeholders.join("");
};

button.addEventListener("click", function (e) {
  e.preventDefault();
  // empty the text of the message element
  message.innerText = "";
  // create variable for the value in the input box
  const guess = guessLetter.value;
  // call the playerInput function that checks for validity
  const playerInputValue = playerInput(guess);
  // empty the input box for the letter
  if (playerInputValue) {
    makeGuess(guess);
  }
  guessLetter.value = "";
});

const playerInput = function (input) {
  // create a variable for the accepted letter sequence = A-Z
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "You must guess a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please choose only one letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please choose a letter A-Z only.";
  } else {
    return input;
  }
};
// function to take your guessed letter and put them in the array of guesses or signal that letter was already guessed
const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You already guessed that letter.";
  } else {
    guessedLetters.push(letter);
    console.log(guessedLetters);
    lettersGuessed();
    guessCount(letter);
    wordInProgress(guessedLetters);
  }
};

// function to show the letters guessed
const lettersGuessed = function () {
  guessedLetterElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetterElement.append(li);
  }
};

const wordInProgress = function (guessedLetters) {
  //replace the circles with the correctly guessed letters
  const wordUpper = word.toUpperCase();
  // split function splits a string into substrings and returns them each as an array
  const wordArray = wordUpper.split("");
  // if wordArray contains any letters from the guessedLetters array update circle with that letter
  const circleReplacer = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      circleReplacer.push(letter.toUpperCase());
    } else {
      circleReplacer.push("●");
    }
  }
  progress.innerText = circleReplacer.join("");
  didIWin();
};

const guessCount = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, no "${guess}".`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yes! "${guess}" is in the word!`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Aw snap 🫰🏼, you have a big brain and you were so close! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerHTML = `${remainingGuesses} guess.`;
  } else {
    remainingGuessesSpan.innerHTML = `${remainingGuesses} guesses.`;
  }
};

const didIWin = function () {
  if (word.toUpperCase() === progress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the word! Good work!</p>`;

    startOver();
  }
};

const startOver = function () {
  button.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLetterElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses.`;
  guessedLetterElement.innerHTML = "";
  message.innerText = "";

  getWord();

  button.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLetterElement.classList.remove("hide");
});
