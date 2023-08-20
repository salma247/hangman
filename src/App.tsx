import { useState, useEffect, useCallback } from "react";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanText from "./components/HangmanText";
import Keyboard from "./components/Keyboard";

import "./App.css";
import words from "./wordList.json";

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());

  const [guessedLetters, setGuessedLetters] = useState<string[]>([""]);

  const inCorrectLetters = guessedLetters.filter((letter) => {
    return !wordToGuess.includes(letter);
  });

  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every((letter) => {
    return guessedLetters.includes(letter);
  });

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!RegExp(/^[a-z]$/).exec(key)) return;

      e.preventDefault();
      addGuessedLetters(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (key !== "Enter") return;

      e.preventDefault();
      setWordToGuess(getRandomWord());
      setGuessedLetters([""]);
      
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);


  return (
    <div className="app">
      <div className="result">
        {isLoser && <div className="loser">You lose! Refresh to play again.</div>}
        {isWinner && <div className="winner">You win!</div>}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanText guessedLetters={guessedLetters} wordToGuess={wordToGuess} reveal={isLoser} />
      <Keyboard
        disabled={isLoser || isWinner}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={inCorrectLetters}
        addGuessedLetters={addGuessedLetters}
        />
    </div>
  );
}

export default App;
