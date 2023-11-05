import styles from '../page.module.css'
import React, { useState, useEffect } from 'react'

interface ScrollContainerProps {
  text: string;
  currentLetter: number;
}

function LetterDisplay({ text, currentLetter }: ScrollContainerProps) {
  const [letters, setLetters] = useState<string[]>(text.split(''));
  const [shiftedLetters, setShiftedLetters] = useState<string[]>([]);

  useEffect(() => {
    if (currentLetter > 0) {
      setShiftedLetters((prevLetters) => [...prevLetters, letters[0]]);
      setLetters((prevLetters) => prevLetters.slice(1));
    }
  }, [currentLetter]);

  return (
    <div id={styles["scroll-container"]}>
      <div id={styles["scroll"]}>
        <div id={styles["scroll-left"]}>
          {shiftedLetters.map((letter, index) => (
            <div key={index} className={styles["display-letter"]}>
              {letter}
            </div>
          ))}
        </div>
        <div id={styles["scroll-center"]}>
          {letters[0] && <div className={styles["display-letter"]}>{letters[0]}</div>}
        </div>
        <div id={styles["scroll-right"]}>
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