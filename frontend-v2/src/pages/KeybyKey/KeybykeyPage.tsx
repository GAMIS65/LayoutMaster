import { useEffect, useState } from 'react';
import Keyboard from '../../components/Keyboard/Keyboard';
import layoutJSON from '../../layouts.json';
import LetterDisplay from '../../components/LetterDisplay/LetterDisplay';
import styles from './KeybyKeyPage.module.css';
import { Layout, LayoutConfig } from '../../types/keyboardTypes';
import useLayoutStore from '../../store/layoutStore';
import { generateLearningOrder } from '../../utils/learningOrderGenerator';
import { generateRandomLetters } from '../../utils/textGenerators/generateRandomLetters';

function KeyByKeyPage() {
  const { layout } = useLayoutStore();
  const layoutData: Layout = (layoutJSON as LayoutConfig)[layout];
  const learningOrder = generateLearningOrder(layoutData);
  const [text, setText] = useState(
    generateRandomLetters(10, learningOrder, 'a'),
  );
  const [input, setInput] = useState('');

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      if (input.length > 0) {
        setInput(input.slice(0, -1));
      }
      return;
    }

    if (input.length === text.length) {
      return;
    }

    if (event.key === 'Space') {
      setInput((prevInput) => prevInput + ' ');
      return;
    }

    if (event.key.length === 1) {
      // Ignore keys like control and shift
      setInput((prevInput) => prevInput + event.key);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Remove the event listener when the page is closed
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.letterDisplayContainer}>
        <LetterDisplay text={text} input={input} />
      </div>

      <Keyboard layout={layoutData} letter={text[input.length]} />
    </div>
  );
}

export default KeyByKeyPage;
