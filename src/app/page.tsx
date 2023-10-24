"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import english from './languages/english-ansi.json'

type KeyProps = {
  name: string,
  isActive: boolean | string,
  style: string
}

type LetterDisplayProps = {
  text: string;
  index: number;
}

type DisplayKeyProps = {
  name: string;
  isActive: boolean;
}

const layout = english.layout; 

function Key({ name, isActive, style }: KeyProps) {
  return <div className={`${styles.key} ${isActive ? styles[style] : ''}`}>{name}</div>;
}

function DisplayKey({name, isActive}: DisplayKeyProps) {
  return <div className={`${styles.letter} ${isActive ? styles.active : ''}`}>{name}</div>;
}

function LetterDisplay({ text, index }: LetterDisplayProps) {

  const letters = text.split("");
  console.log(text);
  return (
  <div className={styles["letter-display"]}>

      {text[index-1] && <DisplayKey name={text[index-1]} isActive={false}/> }

      {text[index] && <DisplayKey name={text[index]} isActive={true}/>}
      
      {text[index+1] && <DisplayKey name={text[index+1]} isActive={false}/>}
  </div>
  );
  // return (
  //   <div className={styles["letter-display"]}>
  //     {letters.map((letter, test) => (
  //       <DisplayKey key={test}  name={letter} isActive={index === test}/>
  //     ))}
  //   </div>
  // );
  // return (
  //   <div className={styles["letter"]}>{text}</div>
  // )
}

export default function Home() {
  const [text, setText] = useState('asdfghjkl;zxcvbnm,./');
  const [currentLetter, setCurrentLetter] = useState(0);
  const [leftShift, setLeftShift] = useState(false);
  const [rightShift, setRightShift] = useState(false);

  const handleKeyDown = (event: any) => {
    setCurrentLetter(event.currentTarget.value.length);
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

  useEffect(() => {
    console.log(text[currentLetter]);
    const currentShift = findShiftForKey(text[currentLetter], english.layout);
    if (
      text &&
      text[currentLetter] &&
      (text[currentLetter] === text[currentLetter].toUpperCase() &&
        text[currentLetter] !== text[currentLetter].toLowerCase()) || /^[^a-zA-Z0-9]$/.test(text[currentLetter])
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

  const keyboard = Object.entries(layout).map(([rowKey, row]) => (
    <div key={rowKey} className={styles.row}>
      {Object.entries(row).map(([key, keyProps]) => (
        <Key
          key={key}
          name={keyProps.letter[0] || ''}
          style={keyProps.finger}
          isActive={
            text[currentLetter] === keyProps.letter[1] ||
            (keyProps.letter[2] && text[currentLetter] === keyProps.letter[2]) ||
            (keyProps.letter[1] === 'ShiftLeft' && leftShift || keyProps.letter[1] === "ShiftRight" && rightShift) 
          }
        />
      ))}
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <LetterDisplay text={text} index={currentLetter}/> 
      {/* <div>{text}</div> */}
      <input onChange={handleKeyDown} />
      {keyboard}
    </div>
  );
}
