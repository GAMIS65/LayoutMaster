import type { LucideIcon } from 'lucide-react';

export const styles = {
  green: 'text-green-600 border-green-200 hover:border-green-300',
  purple: 'border-purple-200 text-purple-600 hover:border-purple-300',
  blue: 'border-blue-200 text-blue-600 hover:border-blue-300',
  pink: 'border-pink-200 text-pink-600 hover:border-pink-300',
  yellow: 'border-orange-200 text-orange-500 hover:border-orange-300',
  black: 'border-gray-300 text-gray-600 hover:border-gray-500',
} as const;

type Color = keyof typeof styles;

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: Color;
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
}: FeatureCardProps) {
  color = color ?? 'black';

  return (
    <div
      className={`flex flex-col p-6 border-2 rounded-xl hover:shadow-sm bg-white duration-150 ease-out transition-transform hover:-translate-y-1 ${styles[color]}`}
    >
      <div className={`mb-4`}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h1 className="font-bold text-lg mb-2 text-gray-900">{title}</h1>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
