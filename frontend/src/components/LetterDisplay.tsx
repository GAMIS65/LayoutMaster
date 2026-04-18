type LetterDisplayProps = {
  text: string;
  input: string;
};

export default function LetterDisplay({ text, input }: LetterDisplayProps) {
  const currentPosition = input.length;

  const shiftedLetters = text.slice(0, currentPosition).split('');
  const letters = text.slice(currentPosition).split('');

  return (
    <div className="border-2 border-gray-100 rounded-xl flex justify-center overflow-hidden w-[80%] mx-auto text-[98px] min-h-[1.25em] max-w-250 bg-gray-50">
      <div className="relative font-mono">
        {/* Left (typed letters) */}
        <div className="absolute top-0 right-full flex text-green-400">
          {shiftedLetters.map((letter, index) => (
            <div
              key={index}
              className={[
                'w-[1em] h-[1.25em] flex items-center justify-center',
                'border-2 border-gray-200 bg-gray-100',
                input[index] !== letter &&
                  'text-red-400 animate-[ld-shake_0.4s_ease]',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Current letter */}
        <div className="underline decoration-2">
          {letters[0] && (
            <div className="w-[1em] h-[1.25em] flex items-center justify-center border-2 border-gray-200 bg-gray-100">
              {letters[0]}
            </div>
          )}
        </div>

        {/* Right (remaining letters) */}
        <div className="absolute top-0 left-full flex">
          {letters.slice(1).map((letter, index) => (
            <div
              key={index}
              className="w-[1em] h-[1.25em] flex items-center justify-center bg-gray-100 border-2 border-gray-200"
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind-compatible custom keyframes */}
      <style>
        {`
          @keyframes ld-shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(4px); }
            50% { transform: translateX(-4px); }
            75% { transform: translateX(2px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}
