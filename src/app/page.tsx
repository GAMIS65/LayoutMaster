"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import english from './languages/english-ansi.json'

type KeyProps = {
  name: string,
  isActive: boolean | string,
  style: string
}

const layout = english.layout; 

function Key({ name, isActive, style }: KeyProps) {
  return <div className={`${styles.key} ${isActive ? styles[style] : ''}`}>{name}</div>;
}

export default function Home() {
  const [text, setText] = useState('A*Test 123');
  const [currentLetter, setCurrentLetter] = useState(0);
  const [leftShift, setLeftShift] = useState(false);
  const [rightShift, setRightShift] = useState(false);

  const handleKeyDown = (event: any) => {
    setCurrentLetter(event.currentTarget.value.length);
  };

  useEffect(() => {
    console.log(text[currentLetter])
    if (
      text &&
      text[currentLetter] &&
      (text[currentLetter] === text[currentLetter].toUpperCase() &&
        text[currentLetter] !== text[currentLetter].toLowerCase())
    ) {
      setLeftShift(true);
    } else {
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
      <div>{text}</div>
      <input onChange={handleKeyDown} />
      {keyboard}
    </div>
  );
}
