"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import englishQwertyAnsi from '@/keyboards/english-ansi.json'
import LetterDisplay from '../components/LetterDisplay/LetterDisplay'
import FingerColors from '../components/FingerColors/FingerColors'
import LetterProgress from '../components/LetterProgress/LetterProgress';
import Keyboard from '../components/Keyboard/Keyboard';
import LanguageSelection from '../components/LanguageSelection';
import Navbar from '@/components/Navbar/Navbar'

export default function Home() {
  const [text, setText] = useState('');
  const [layout, setLayout] = useState(englishQwertyAnsi);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [inputLength, setInputLength] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(() => {
      const savedLevel = localStorage.getItem(`level_${layout.name}_${layout['layout-standard']}_${layout.language}`);
      return savedLevel !== null ? Number(savedLevel) : 0;
  });
  const [mistakes, setMistakes] = useState({});
  const [mistakeCount, setMistakeCount] = useState(0);

  const keyboardData = layout;
  const keyboardLayout = keyboardData.layout;

  const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const lastEnteredLetter = inputValue[inputValue.length - 1];

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
          localStorage.setItem(`level_${layout.name}_${layout['layout-standard']}_${layout.language}`, newLevel.toString());
        }
      }
    } else {
      event.currentTarget.value = inputValue.slice(0, inputValue.length - 1);
      const newMistake = {...mistakes};
      // @ts-ignore
      newMistake[text[currentLetter]] = (newMistake[text[currentLetter]] || 0) + 1;
      console.log(newMistake);

      if (progress > 0) {
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
  setLevel(Number(localStorage.getItem(`level_${layout.name}_${layout['layout-standard']}_${layout.language}`)));

  if (inputLength === text.length - 5 || text.length === 0) {
    console.log(inputLength, text.length)
      setText((text) => text + generateLetters(5, keyboardData.stages.slice(0, level + 1), keyboardData.stages[level]));
    }
  }, [text, currentLetter, inputLength, level, keyboardData.stages, layout]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <LetterProgress currentLetter={keyboardData.stages[level]} progress={progress}/>
      <LetterDisplay text={text} currentLetter={currentLetter} />
      <input onChange={handleKeyDown} placeholder='Kliknite sem aby ste začali písať'/>
      <button onClick={() => setShowKeyboard(!showKeyboard)}>{showKeyboard ? 'Klávesnica: ZAPNUTÁ' : 'Klávesnica: VYPNUTÁ'} </button>
      <div className={styles["finger-colors-container"]}>
        {showKeyboard && <FingerColors />}
      </div>
      <div className={styles["keyboard-container"]}>
        {showKeyboard && <Keyboard keyboardLayout={keyboardLayout} text={text} currentLetter={currentLetter} />}
      </div>
      {// @ts-ignore}
      <LanguageSelection changeLayout={setLayout} />
      }</div>
  );
}
