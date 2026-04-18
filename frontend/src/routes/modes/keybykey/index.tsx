import { Navbar } from '@/components/Navbar';
import { createFileRoute } from '@tanstack/react-router';
import { Keyboard } from '@/components/Keyboard';
import LetterDisplay from '@/components/LetterDisplay';
import { useEffect, useState } from 'react';
import { generateLearningOrder, generateLetters } from '@/utils/textGenerators';
import { useKeyboardLayout } from '@/context/LayoutContext';
import layoutData from '@/layouts.json';
import type { LayoutConfig } from '@/types/keyboardTypes';
import { useLevel } from '@/context/LevelContext';
import { ProgressBar } from '@/components/ProgressBar';

const layout = layoutData as LayoutConfig;

export const Route = createFileRoute('/modes/keybykey/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { layoutName } = useKeyboardLayout();
  const learningOrder = generateLearningOrder(layout[layoutName]);
  const { level, xp, addXp, removeXp } = useLevel();
  const [input, setInput] = useState('');
  const [text, setText] = useState(
    generateLetters(
      20,
      level === 0 ? [learningOrder[0]] : learningOrder.slice(0, level),
      learningOrder[level] ?? learningOrder[0],
    ),
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setInput((prevInput) => {
        if (event.key === 'Backspace') {
          return prevInput.slice(0, -1);
        }

        if (event.key === ' ') {
          return prevInput + ' ';
        }

        if (event.key.length !== 1) {
          return prevInput;
        }

        const currentIndex = prevInput.length;

        if (event.key === text[currentIndex]) {
          addXp(10);
        } else {
          removeXp(10);
        }

        const newInput = prevInput + event.key;

        if (currentIndex >= text.length - 5) {
          const moreText = generateLetters(
            20,
            learningOrder.slice(0, level),
            learningOrder[level],
          );

          setText((prevText) => prevText + moreText);
        }

        return newInput;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text, level, learningOrder, addXp, removeXp]);

  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-5">
        <LetterDisplay text={text} input={input} />
        <div className="w-xl">
          <ProgressBar value={xp} goal={200} />
        </div>
        <Keyboard highlightedKey={text[input.length]} />
      </div>
    </div>
  );
}
