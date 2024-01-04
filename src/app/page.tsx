"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import english from '../languages/english-ansi.json'
import LetterDisplay from '../components/LetterDisplay/LetterDisplay'
import FingerColors from '../components/FingerColors'
import LetterProgress from '../components/LetterProgress/LetterProgress';

type KeyProps = {
  name: string,
  isActive: boolean | string,
  style: string
}

const keyboardData = english;
const keyboardLayout = keyboardData.layout; 

function Key({ name, isActive, style }: KeyProps) {
  return <div className={`${styles.key} ${styles[style]} ${isActive ? styles.active : ''}`}>{name}</div>;
}

export default function Home() {
  const [text, setText] = useState('');
  const [currentLetter, setCurrentLetter] = useState(0);
  const [leftShift, setLeftShift] = useState(false);
  const [rightShift, setRightShift] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(() => {
      const savedLevel = localStorage.getItem('level');
      return savedLevel !== null ? Number(savedLevel) : 0;
  });
  const [mistakes, setMistakes] = useState({});
  const [mistakeCount, setMistakeCount] = useState(0);

const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = event.currentTarget.value;
  const lastEnteredLetter = inputValue[inputValue.length - 1];

  console.log(inputLength);
  if (inputValue.length < inputLength) {
    event.currentTarget.value = inputValue + text[currentLetter - 1];
  } else if (lastEnteredLetter === text[currentLetter]) {
    setCurrentLetter(inputValue.length);
    setInputLength(inputValue.length);
    
    if (lastEnteredLetter === keyboardData.stages[level] || lastEnteredLetter === keyboardData.stages[level].toUpperCase()) {
      setProgress((progress) => progress += 1);
    }

    if (progress >= 30) {
      setProgress(0);

      if (level !== keyboardData.stages.length - 1) {
        // TODO store the level in db
        const newLevel = level + 1;
        setLevel(newLevel);
        localStorage.setItem('level', newLevel.toString());
      }
    }
  } else {
    event.currentTarget.value = inputValue.slice(0, inputValue.length - 1);
    const newMistake = {...mistakes};
    // @ts-ignore
    newMistake[text[currentLetter]] = (newMistake[text[currentLetter]] || 0) + 1;
    console.log(newMistake);

    if (progress >= -13) {
      setProgress((progress) => progress -= 3);
    }

    setMistakes(newMistake);
    setMistakeCount((mistakeCount) => mistakeCount += 1);

    if (mistakeCount >= 15) {
      // TODO change this path to a real api endpoint
      // TODO Make sure the user is logged in
      fetch('http://127.0.0.1:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mistakes),
      });
    }

    setMistakes({});
    setMistakeCount(0);

  }
};

  const findShiftForKey = (letterToFind: string, layout: any): string | undefined => {
    for (const row in layout) {
      for (const key in layout[row]) {
        const letterVariants = layout[row][key].letter;
        if (letterVariants.includes(letterToFind)) {
          return layout[row][key].shift;
        }
      }
    }
    return undefined;
  }
  
  const findKeyWithoutShift = (letterToFind: string, layout: any): boolean => {
    for (const row in layout) {
      for (const key in layout[row]) {
        const letterVariants = layout[row][key].letter;
        if (letterVariants[1] === letterToFind) {
          return true;
        }
      }
    }
    return false;
  }

  const generateLetters = (count: number, letters: Array<string>, currentLetter: string): string => {
    let output = "";

    for (let i = 0; i < (count / 2); i++) {
      let letter = letters[Math.floor(Math.random() * (letters.length))];

      if (/^[a-zA-Z]$/.test(letter) && Math.random() > 0.50) {
        letter = letter.toUpperCase();
      }

      output += letter + currentLetter;
    }

    return output;
  }

useEffect(() => {
  if (inputLength === text.length - 5 || text.length === 0) {
    console.log(inputLength, text.length)
      setText((text) => text + generateLetters(5, keyboardData.stages.slice(0, level + 1), keyboardData.stages[level]));
  }

  const currentShift = findShiftForKey(text[currentLetter], keyboardLayout);
  if (
    text &&
    text[currentLetter] &&
    !findKeyWithoutShift(text[currentLetter], keyboardLayout)
  ) {
    if(currentShift === "left") {
      setLeftShift(true);
      setRightShift(false);
    } else {
      setRightShift(true);
      setLeftShift(false);
    }
  } else {
    setRightShift(false);
    setLeftShift(false);
  }
}, [text, currentLetter]);

const keyboard = Object.entries(keyboardLayout).map(([rowKey, row], index) => (
  <div key={rowKey} className={`${styles.row} ${styles[`row${index + 1}`]}`}>
    {Object.entries(row).map(([key, keyProps]) => (
      <Key
        key={key}
        name={keyProps.letter[0] || ""}
        style={keyProps.finger}
        isActive={
          text[currentLetter] === keyProps.letter[1] ||
          (keyProps.letter[2] && text[currentLetter] === keyProps.letter[2]) ||
          (keyProps.letter[1] === "ShiftLeft" && leftShift) ||
          (keyProps.letter[1] === "ShiftRight" && rightShift)
        }
      />
    ))}
  </div>
));

  return (
    <div className={styles.wrapper}>
      <LetterDisplay text={text} currentLetter={currentLetter} />
      <input onChange={handleKeyDown} />
      <button onClick={() => setShowKeyboard(!showKeyboard)}>{showKeyboard ? 'Klávesnica: ZAPNUTÁ' : 'Klávesnica: VYPNUTÁ'} </button>
      <LetterProgress currentLetter={keyboardData.stages[level]} progress={progress} />
      {showKeyboard && <FingerColors />}
      {showKeyboard && keyboard}
    </div>
  );
}
