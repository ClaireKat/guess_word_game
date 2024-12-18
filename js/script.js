const guessedLetterElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const guessLetter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const wordProgress = function (word) {
  // have a black circle for each letter in the 'word' variable
  const placeholders = [];
  for (const letter in word) {
    placeholders.push("●");
  }
  // use join() method otherwise the array elements will be separated by a comma
  progress.innerText = placeholders.join("");
};

wordProgress(word);

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

const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You already guessed that letter.";
  } else {
    guessedLetters.push(letter);
    console.log(guessedLetters);
  }
};
