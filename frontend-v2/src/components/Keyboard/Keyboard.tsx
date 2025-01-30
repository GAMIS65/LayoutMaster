import { Key, Layout } from '../../types/keyboardTypes';
import styles from './Keyboard.module.css';

type KeyProps = {
  isActive: boolean;
  keyData: Key;
};

type KeyboardProps = {
  layout: Layout;
  text?: string;
};

function KeyElement({ isActive, keyData }: KeyProps) {
  return (
    <div className={`${styles.key} ${!isActive && styles.opacity} ${styles[keyData.finger]}`}>
      {keyData.letter[0]}
    </div>
  );
}

function Keyboard({ layout, text }: KeyboardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {layout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.keys.map((keyData, keyIndex) => (
              <KeyElement key={keyIndex} isActive={true} keyData={keyData} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;

