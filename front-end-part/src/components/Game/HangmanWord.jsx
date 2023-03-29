export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "5rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
        userSelect: "none",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{ borderBottom: ".1em solid #45df16df", userSelect: "none" }}
          key={index}
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal
                  ? "#df1616b5"
                  : "#156831",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
