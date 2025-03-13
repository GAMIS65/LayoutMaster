import { Finger, Layout } from '../types/keyboardTypes';

export function generateLearningOrder(layout: Layout): string[] {
  const fingerPriority: Finger[] = [
    'indexLeft',
    'indexRight',
    'middleLeft',
    'middleRight',
    'ringLeft',
    'ringRight',
    'pinkyLeft',
    'pinkyRight',
    'thumbLeft',
  ];

  const rowPriority = [2, 1, 3, 0, 4]; // Home row, then upper, then lower, etc.

  const learningOrder: string[] = [];

  rowPriority.forEach((rowIndex) => {
    if (!layout.keyboardRows[rowIndex]) return; // Skip if row doesn't exist

    fingerPriority.forEach((finger) => {
      const keysForFingerInRow = layout.keyboardRows[rowIndex].rowKeys.filter(
        (key) =>
          key.finger === finger &&
          key.letter.withoutShift !== 'Shift' &&
          key.letter.withoutShift !== 'SPACE' &&
          key.letter.withoutShift !== 'ShiftLeft' &&
          key.letter.withoutShift !== 'ShiftRight',
      );

      keysForFingerInRow.forEach((key) => {
        if (key.letter.withoutShift) {
          learningOrder.push(key.letter.withoutShift);
        }
        if (key.letter.withShift) {
          learningOrder.push(key.letter.withShift);
        }
      });
    });
  });

  return [...new Set(learningOrder)];
}
