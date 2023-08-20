type HangmanTextProps = {
  guessedLetters: string[],
  wordToGuess: string,
  reveal?: boolean
}

export default function HangmanText({ guessedLetters, wordToGuess: word, reveal = false} : HangmanTextProps ){
  return (
    <div className="hangman-text">
      {word.split("").map((letter, index) => {
        return (
          <span className="letter" key={index}>
            <span
              style={{
                visibility: guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
                  color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
}
