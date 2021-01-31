"use strict";
import Hangman from "./hangman-class";
import getPuzzle from "./requests";


const puzzle = document.getElementById("render-puzzle");
const guesses = document.getElementById("guesses");
const reset = document.getElementById("reset");
let game1;

const generatePuzzleDom = () => {
  puzzle.innerHTML = "";
  guesses.innerHTML = game1.statusMessage;
  generatePuzzle(game1);
};

const startGame = async () => {
  const puzzle = await getPuzzle(2);
  game1 = new Hangman(puzzle, 5);
  generatePuzzleDom();
};

startGame();
reset.addEventListener("click", startGame);

window.addEventListener("keypress", (e) => {
  game1.makeGuess(e.key);
  generatePuzzleDom();
});

function generatePuzzle(game) {
  game.puzzle.split("").forEach((letter) => {
    const word = document.createElement("span");
    word.innerHTML = letter;
    puzzle.appendChild(word);
  });
}
