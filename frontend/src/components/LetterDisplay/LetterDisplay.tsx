import styles from './LetterDisplay.module.css';

type LetterDisplayProps = {
  text: string;
  input: string;
};

function LetterDisplay({ text, input }: LetterDisplayProps) {
  const currentPosition = input.length;

  const shiftedLetters = text.slice(0, currentPosition).split('');
  const letters = text.slice(currentPosition).split('');

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scroll}>
        <div className={styles.scrollLeft}>
          {shiftedLetters.map((letter, index) => (
            <div
              key={index}
              className={`${styles.displayLetter} ${input[index] !== letter ? styles.mistake : ''}`}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className={styles.scrollCenter}>
          {letters[0] && (
            <div className={styles.displayLetter}>{letters[0]}</div>
          )}
        </div>
        <div className={styles.scrollRight}>
          {letters.slice(1).map((letter, index) => (
            <div key={index} className={styles.displayLetter}>
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LetterDisplay;
