import { Keyboard } from '@/components/Keyboard';
import { createFileRoute, Link } from '@tanstack/react-router';
import layoutData from '@/layouts.json';
import type { LayoutConfig } from '@/types/keyboardTypes';
import { KeyboardIcon } from 'lucide-react';
import { useKeyboardLayout } from '@/context/LayoutContext';
import { Navbar } from '@/components/Navbar';

export const Route = createFileRoute('/layouts/')({
  component: RouteComponent,
});

type CardProps = {
  title: string;
  onClick: () => void;
  badge?: string;
  description?: string;
  isSelected: boolean;
};

const layouts = layoutData as LayoutConfig;

function RouteComponent() {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <SelectionMenu />
          </div>

          <div className="mx-6 flex-col">
            <Keyboard />
            <div className="flex justify-end mt-3">
              <Link
                to="/modes"
                className="px-8 py-3 font-bold bg-green-200 rounded-xl hover:bg-green-300 transition-colors duration-150 hover:cursor-pointer text-green-600"
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, onClick, badge, description, isSelected }: CardProps) {
  return (
    <button
      className={`py-6 px-6 hover:cursor-pointer rounded-xl my-1 shadow-sm border-2 border-gray-200 hover:bg-gray-100 transition-colors duration-150 ${isSelected ? 'border-green-300 bg-green-50 hover:bg-green-100' : ''}`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center">
        <div className="bg-gray-100 p-2 rounded-xl mr-1">
          <KeyboardIcon />
        </div>
        <div className="flex flex-col items-start m-1">
          <div className="flex">
            <div className="font-bold">{title}</div>
            {badge && (
              <div className={`ml-2 px-2 outline-0 rounded-xl bg-gray-200`}>
                {badge}
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 max-w-sm">{description}</div>
        </div>
      </div>
    </button>
  );
}

function SelectionMenu() {
  const { layoutName, setLayoutName } = useKeyboardLayout();
  return (
    <div className="flex flex-col max-h-[175]">
      <h1>Select a layout</h1>
      <div className="flex flex-col overflow-y-scroll">
        {Object.keys(layouts).map((layout, index) => (
          <Card
            title={layout.toUpperCase()}
            onClick={() => setLayoutName(layout)}
            badge={layout === 'qwerty' ? 'Default' : ''}
            key={index}
            isSelected={layout === layoutName}
          />
        ))}
      </div>
    </div>
  );
}
