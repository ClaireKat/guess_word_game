const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const guessLetter = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
console.log(word.length);

const wordProgress = function (word) {
  // have a black circle for each letter in the 'word' variable
  const placeholders = [];
  for (const letter of word) {
    console.log(letter);
    placeholders.push("●");
  }
  progress.innerText = placeholders.join("");
};

wordProgress(word);

button.addEventListener("click", function (e) {
  e.preventDefault();
  const collectedLetter = guessLetter.value;
  console.log(collectedLetter);
  guessLetter.value = "";
});
