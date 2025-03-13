// TODO: Look into making this better
export const generateRandomLetters = (
  count: number,
  letters: Array<string>,
  currentLetter: string,
): string => {
  let output = '';

  for (let i = 0; i < count; i++) {
    let letter = letters[Math.floor(Math.random() * letters.length)];

    output += letter + (currentLetter || '');

    if (Math.random() < 0.3) {
      output += ' ';
    }
  }
  return output;
};
