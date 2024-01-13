import styles from "../../app/page.module.css";
import { useEffect, useState } from "react";

type KeyProps = {
  name: string;
  isActive: boolean | string;
  style: string;
};

function Key({ name, isActive, style }: KeyProps) {
  return (
    <div className={`${styles.key} ${styles[style]} ${isActive ? styles.active : styles.opacity}`}>{name}</div>
  );
}

type KeyboardProps = {
  keyboardLayout: KeyboardLayout;
  text: string;
  currentLetter: number;
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
};

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
};

function Keyboard({keyboardLayout, text, currentLetter}: KeyboardProps) {
  const [leftShift, setLeftShift] = useState(false);
  const [rightShift, setRightShift] = useState(false);

  useEffect(() => {
    const currentShift = findShiftForKey(text[currentLetter], keyboardLayout);
    if (
      text &&
      text[currentLetter] &&
      !findKeyWithoutShift(text[currentLetter], keyboardLayout)
    ) {
      if (currentShift === "left") {
        setLeftShift(true);
        setRightShift(false);
      } else if (currentShift === "right") {
        setRightShift(true);
        setLeftShift(false);
      } else {
        setRightShift(false);
        setLeftShift(false);
      }
    } else {
      setRightShift(false);
      setLeftShift(false);
    }
  }, [text, currentLetter, keyboardLayout]);

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
  return <div>{keyboard}</div>;
}

export default Keyboard;
