"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import english from './languages/english-ansi.json'
import LetterDisplay from './components/LetterDisplay'
import FingerColors from './components/FingerColors'

type KeyProps = {
  name: string,
  isActive: boolean | string,
  style: string
}

const layout = english.layout; 

function Key({ name, isActive, style }: KeyProps) {
  return <div className={`${styles.key} ${styles[style]} ${isActive ? styles.active : ''}`}>{name}</div>;
}


export default function Home() {
  const [text, setText] = useState('12#Sdfghjkl;zxcvbnm,./');
  const [currentLetter, setCurrentLetter] = useState(0);
  const [leftShift, setLeftShift] = useState(false);
  const [rightShift, setRightShift] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(true);

const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = event.currentTarget.value;
  const lastEnteredLetter = inputValue[inputValue.length - 1];

  if (inputValue.length < inputLength) {
    event.currentTarget.value = inputValue + text[currentLetter - 1];
  } else if (lastEnteredLetter === text[currentLetter]) {
    setCurrentLetter(inputValue.length);
    setInputLength(inputValue.length);
  } else {
    event.currentTarget.value = inputValue.slice(0, inputValue.length - 1);
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

useEffect(() => {
  console.log(text[currentLetter]);
  const currentShift = findShiftForKey(text[currentLetter], english.layout);
  if (
    text &&
    text[currentLetter] &&
    !findKeyWithoutShift(text[currentLetter], english.layout)
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

const keyboard = Object.entries(layout).map(([rowKey, row], index) => (
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
      <FingerColors /> 
      {showKeyboard && keyboard}
    </div>
  );
}
