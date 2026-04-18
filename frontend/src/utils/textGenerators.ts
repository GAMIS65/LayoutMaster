import type { Layout, Key } from '@/types/keyboardTypes';
import { Finger } from '@/types/keyboardTypes';

export const generateLetters = (
  count: number,
  letters: Array<string>,
  currentLetter: string,
): string => {
  let output = '';

  for (let i = 0; i < count; i++) {
    let letter = letters[Math.floor(Math.random() * letters.length)];

    if (Math.random() < 0.5) {
      letter = letter.toUpperCase();
    }

    output += letter + (currentLetter || '');

    if (Math.random() < 0.3) {
      output += ' ';
    }
  }
  return output;
};

export function generateLearningOrder(layout: Layout): string[] {
  const fingerPriority: Finger[] = [
    Finger.IndexLeft,
    Finger.IndexRight,
    Finger.MiddleLeft,
    Finger.MiddleRight,
    Finger.RingLeft,
    Finger.RingRight,
    Finger.PinkyLeft,
    Finger.PinkyRight,
    Finger.ThumbLeft,
  ];

  const rowPriority = [2, 1, 3, 0, 4];

  const BLACKLISTED_KEYS = new Set([
    'Enter',
    'Bksp',
    'Ctrl',
    'Win',
    'Tab',
    'Caps',
    'Fn',
    'Menu',
    'Alt',
  ]);

  const learningOrder: string[] = [];

  rowPriority.forEach((rowIndex) => {
    const row = layout.rows[rowIndex];
    if (!row) return;

    fingerPriority.forEach((finger) => {
      const keysForFingerInRow = row.rows.filter(
        (key: Key) =>
          key.finger === finger &&
          key.letter.withoutShift !== 'Shift' &&
          key.letter.withoutShift !== 'SPACE' &&
          key.letter.withoutShift !== 'ShiftLeft' &&
          key.letter.withoutShift !== 'ShiftRight',
      );

      keysForFingerInRow.forEach((key) => {
        if (!BLACKLISTED_KEYS.has(key.letter.display)) {
          if (key.letter.withoutShift) {
            learningOrder.push(key.letter.withoutShift);
          }
          if (key.letter.withShift) {
            learningOrder.push(key.letter.withShift);
          }
        }
      });
    });
  });

  return [...new Set(learningOrder)];
}
