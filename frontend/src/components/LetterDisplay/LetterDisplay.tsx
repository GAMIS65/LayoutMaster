import styles from './LetterDisplay.module.css'
import React from 'react'

interface ScrollContainerProps {
  text: string;
  currentLetter: number;
  error: boolean
}

function LetterDisplay({ text, currentLetter, error }: ScrollContainerProps) {
  const shiftedLetters = text.slice(0, currentLetter).split('');
  const letters = text.slice(currentLetter).split('');

  return (
    <div className={styles["scroll-container"]}>
      <div className={styles["scroll"]}>
        <div className={styles["scroll-left"]}>
          {shiftedLetters.map((letter, index) => (
            <div key={index} className={styles["display-letter"]}>
              {letter}
            </div>
          ))}
        </div>
        <div className={error ? styles.error : styles["scroll-center"]}>
          {letters[0] && <div className={styles["display-letter"]}>{letters[0]}</div>}
        </div>
        <div className={styles["scroll-right"]}>
          {letters.slice(1).map((letter, index) => (
            <div key={index} className={styles["display-letter"]}>
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterDisplay