const letters = "abcdefghijklmnopqrstuvwxyz".split("");

type KeyboardProps = {
  disabled: boolean,
  activeLetters: string[],
  inactiveLetters: string[],
  addGuessedLetters: (letter: string) => void
}
export default function Keyboard({disabled = false, activeLetters, inactiveLetters, addGuessedLetters} : KeyboardProps) {
  return (
    <div className="keyboard-layout">
      <div className="keyboard">
        {letters.map((letter, index) => {
          const isActive = activeLetters.includes(letter);
          const isInactive = inactiveLetters.includes(letter);
          return (
            <button 
            key={index}
            disabled={isActive || isInactive || disabled}
            className={`key ${isActive ? "active" : ""} ${isInactive ? "inactive" : ""}`} 
            onClick={()=> addGuessedLetters(letter)} >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
