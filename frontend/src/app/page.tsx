"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import englishQwertyAnsi from '@/keyboards/qwerty-english-ansi.json'
import LetterDisplay from '../components/LetterDisplay/LetterDisplay'
import FingerColors from '../components/FingerColors/FingerColors'
import LetterProgress from '../components/LetterProgress/LetterProgress';
import Keyboard from '../components/Keyboard/Keyboard';
import Settings from '@/components/Settings/Settings'
import Navbar from '@/components/Navbar/Navbar';

const backendURL = process.env.NEXT_PUBLIC_BACKEND;

export default function Home() {
  const [text, setText] = useState('');
  const [layout, setLayout] = useState(englishQwertyAnsi);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [inputLength, setInputLength] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false)
  const [level, setLevel] = useState(() => {
    let savedLevel = 0;
    if (typeof window !== 'undefined') {
      // @ts-ignore
      savedLevel = localStorage.getItem(`level_${layout.name}_${layout['layout-standard']}_${layout.language}`);
    }
    return savedLevel !== null ? Number(savedLevel) : 0;
  });
  const [mistakes, setMistakes] = useState({});
  const [charactersTypedCount, setcharactersTypedCount] = useState(0);
  const [showSettings, setSettings] = useState(false);

  const keyboardData = layout;
  const keyboardLayout = keyboardData.layout;

  const changeLevel = (newLevel: number, layout: Keyboard) => {
    setLevel(newLevel);
    localStorage.setItem(`level_${layout.name}_${layout['layout-standard']}_${layout.language}`, newLevel.toString());
  }

  const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const lastEnteredLetter = inputValue[inputValue.length - 1];

    if (inputValue.length < inputLength) {
      event.currentTarget.value = inputValue + text[currentLetter - 1];
    } else if (lastEnteredLetter === text[currentLetter]) {
      setCurrentLetter(inputValue.length);
      setInputLength(inputValue.length);
      setcharactersTypedCount(charactersTypedCount => charactersTypedCount + 1);

      if (keyboardData.stages[level]) {
        if (lastEnteredLetter === keyboardData.stages[level] || lastEnteredLetter === keyboardData.stages[level].toUpperCase()) {
          setProgress((progress) => progress += 1);
        }

        if (progress >= 30) {
          setProgress(0);
  
          if (level !== keyboardData.stages.length - 1) {
            // TODO store the level in db
            const newLevel = level + 1;
            changeLevel(newLevel, keyboardData);
          }
        }
      if (charactersTypedCount >= 15) {
      let result = [];
          for(let key in mistakes) {
              result.push({
                  "key": key,
                  //@ts-ignore
                  "value": mistakes[key]
              });
          }

        if (backendURL && document.cookie.length > "token=".length) {
          fetch(`https://${backendURL}/api/stats`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${document.cookie.replace("token=", "")}`
            },
            body: JSON.stringify({
              layoutName: `${layout.name}_${layout['layout-standard']}_${layout.language}`,
              mistakeValues: result,
            }),
          });
        }
        setMistakes({});
        setcharactersTypedCount(0);
      }
      }
    } else {
      event.currentTarget.value = inputValue.slice(0, inputValue.length - 1);
      const newMistake = {...mistakes};
      // @ts-ignore
      newMistake[text[currentLetter]] = (newMistake[text[currentLetter]] || 0) + 1;

      if (progress > 0) {
        setProgress((progress) => progress -= 3);
      }

      setMistakes(newMistake);
      setcharactersTypedCount((mistakeCount) => mistakeCount += 1);

      
    }
  };

  const generateLetters = (count: number, letters: Array<string>, currentLetter: string): string => {
    let output = "";

    for (let i = 0; i < count; i++) {
      let letter = letters[Math.floor(Math.random() * (letters.length))];

      if (Math.random() < 0.50) {
        letter = letter.toUpperCase();
      }

      output += letter + (currentLetter || '');

      if (Math.random() < 0.30) {
        output += " "
      }
    }
    return output;
}

useEffect(() => {
  setIsClient(true);
  setLevel(Number(localStorage.getItem(`level_${layout.name}_${layout['layout-standard']}_${layout.language}`)));

  if (inputLength === text.length - 5 || text.length === 0) {
      setText((text) => text + generateLetters(3, keyboardData.stages.slice(0, level + 1), keyboardData.stages[level]));
    }
  }, [text, currentLetter, inputLength, level, keyboardData.stages, layout]);

  return (
    <div className={styles.wrapper}>
      <Navbar />
      {
      // @ts-ignore}
       isClient && <LetterProgress currentLetter={keyboardData.stages[level]} progress={progress} />
      }
      <LetterDisplay text={text} currentLetter={currentLetter} />
      <input className={styles.input} onChange={handleKeyDown} placeholder='Kliknite sem aby ste začali písať'/>
      <button onClick={() => setSettings(!showSettings)}>Nastavenia</button>
      <button onClick={() => setShowKeyboard(!showKeyboard)}>{showKeyboard ? 'Klávesnica: ZAPNUTÁ' : 'Klávesnica: VYPNUTÁ'} </button>
      <div className={styles["finger-colors-container"]}>
        {showKeyboard && <FingerColors />}
      </div>
      <div className={styles["keyboard-container"]}>
        {showKeyboard && <Keyboard keyboardLayout={keyboardLayout} text={text} currentLetter={currentLetter} />}
      </div>
        {
          // @ts-ignore
          showSettings && <Settings closeSettings={() => setSettings(false)} changeLayout={setLayout} letters={keyboardData.stages} currentLetter={keyboardData.stages[level]} changeLevel={changeLevel} keyboard={keyboardData}/>
        }
      </div>
  );
}
