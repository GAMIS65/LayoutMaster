import { RowKey, Layout } from '../../types/keyboardTypes';
import styles from './Keyboard.module.css';

type KeyProps = {
  keyData: RowKey;
  letter?: string;
  isActive?: boolean;
};

type KeyboardProps = {
  layout: Layout;
  letter?: string;
};

const findShiftForKey = (
  letterToFind: string,
  layout: Layout,
): string | undefined => {
  for (const row of layout.keyboardRows) {
    for (const key of row.rowKeys) {
      const letterVariants = key.letter;
      if (letterVariants.withShift === letterToFind) {
        return key.shift;
      }
    }
  }
  return undefined;
};

function KeyElement({ keyData, isActive = true }: KeyProps) {
  return (
    <div
      className={`${styles.key} ${!isActive && styles.opacity} ${styles[keyData.finger]}`}
    >
      {keyData.letter.display}
    </div>
  );
}

function Keyboard({ layout, letter }: KeyboardProps) {
  const shift = letter ? (findShiftForKey(letter, layout) ?? '') : '';

  const isActiveKey = (keyData: RowKey): boolean => {
    return (
      keyData.letter.withoutShift === letter ||
      keyData.letter.withShift === letter ||
      (keyData.letter.withShift === 'ShiftLeft' && shift === 'left') ||
      (keyData.letter.withShift === 'ShiftRight' && shift === 'right')
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {layout.keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.rowKeys.map((keyData, keyIndex) => (
              <KeyElement
                key={keyIndex}
                letter={letter}
                keyData={keyData}
                isActive={letter ? isActiveKey(keyData) : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
