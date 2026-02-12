import type {
  Key as KeyType,
  LayoutConfig,
  Finger,
} from '@/types/keyboardTypes';
import layoutData from '@/layouts.json';
import { useKeyboardLayout } from '@/context/LayoutContext';

const layout = layoutData as LayoutConfig;

type KeyProps = {
  keyData: KeyType;
  isActive: boolean;
};

const colors: Record<Finger, string> = {
  pinkyLeft: 'bg-pink-400',
  ringLeft: 'bg-violet-400',
  middleLeft: 'bg-sky-400',
  indexLeft: 'bg-teal-400',
  indexRight: 'bg-green-400',
  middleRight: 'bg-yellow-400',
  ringRight: 'bg-orange-400',
  pinkyRight: 'bg-red-400',
  thumbLeft: 'bg-gray-400',
} as const;

const sizes = {
  Bksp: 'w-28',
  Tab: 'w-24',
  '\\': 'w-20',
  Caps: 'w-28',
  Enter: 'w-32',
  LShift: 'w-36',
  RShift: 'w-40',
  SPACE: 'w-100',
};

export function Key({ keyData, isActive }: KeyProps) {
  return (
    <div
      className={`h-12 flex items-center justify-center rounded-md text-white text-sm font-bold select-none w-20 ${colors[keyData.finger]} ${sizes[keyData.letter.display as keyof typeof sizes] ?? 'flex-1'}`}
    >
      {keyData.letter.display}
    </div>
  );
}

export function Keyboard() {
  const { layoutName } = useKeyboardLayout();
  return (
    <>
      <div className="p-4 rounded-xl bg-gray-100 inline-block">
        <div className="flex flex-col gap-2 w-full max-w-[900px] md:min-w-[800px]">
          {layout[layoutName].rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 w-full">
              {row.rows.map((key, keyIndex) => (
                <Key key={keyIndex} keyData={key} isActive={false} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
