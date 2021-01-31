"use strict";

class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedWords = new Set();
    this.status = "Playing";
  }

  get puzzle() {
    let puzzle = [];
    this.word.forEach((char) => {
      this.guessedWords.has(char) || char === " "
        ? puzzle.push(char)
        : puzzle.push("*");
    });
    return puzzle.join("");
  }

  makeGuess(guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedWords.has(guess);
    const isBadGuess = !this.word.includes(guess);

    if (isUnique) {
      this.guessedWords.add(guess);
    }

    if (isUnique && isBadGuess && this.status === "Playing") {
      this.remainingGuesses--;
    }

    this.calculateStatus();
  }

  calculateStatus() {
    const finsished = this.word.every(
      (letter) => this.guessedWords.has(letter) || letter === " "
    );

    this.remainingGuesses === 0
      ? (this.status = "Failed")
      : finsished
      ? (this.status = "Finished")
      : (this.status = "Playing");
  }

  get statusMessage() {
    let message = "";

    if (this.status === "Playing") {
      message = `Remaining Guesses: ${this.remainingGuesses}`;
    } else if (this.status === "Failed") {
      message = `Nice try! The word was "${this.word.join("")}"`;
    } else {
      message = `Great Work! You guessed the word!!!`;
    }

    return message;
  }
}

export { Hangman as default };
