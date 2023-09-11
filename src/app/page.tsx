"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import english from './languages/english-ansi.json'

type KeyProps = {
  name: string,
  isActive: boolean | string
}

const layout = english; 

function Key({ name, isActive }: KeyProps) {
  return <div className={`${styles.key} ${isActive ? styles.active : ""}`}>{name}</div>;
}

export default function Home() {
  const [text, setText] = useState("Aa5%[{");
  const [currentLetter, setCurrentLetter] = useState(0);
  const [leftShift, setLeftShift] = useState(false);
  const [rightShift, setRightShift] = useState(false);

  const handleKeyDown = (event: any) => {
    setCurrentLetter(event.currentTarget.value.length);
  };

  useEffect(() => {
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

  const alphabetKeys = Object.entries(layout).map(([rowKey, row]) => (
    <div key={rowKey} className={styles.row}>
      {Object.entries(row).map(([key, letters]) => (
        <Key
          key={key}
          name={letters[0] || ""}
          isActive={
            text[currentLetter] === letters[1] ||
            (letters[2] && text[currentLetter] === letters[2]) ||
            (letters[1] === "ShiftLeft" && leftShift)
          }
        />
      ))}
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <div>{text}</div>
      <input onChange={handleKeyDown} />
      {alphabetKeys}
    </div>
  );
}
