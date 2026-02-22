import { Link } from '@tanstack/react-router';
import { createContext, useContext, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export const styles = {
  green:
    'text-green-600 border-green-200 hover:border-green-300 bg-green-50 hover:bg-green-100',
  purple:
    'border-purple-200 text-purple-600 hover:border-purple-300 bg-purple-50 hover:bg-purple-100',
  blue: 'border-blue-200 text-blue-600 hover:border-blue-300 bg-blue-50 hover:bg-blue-100',
  pink: 'border-pink-200 text-pink-600 hover:border-pink-300 bg-pink-50 hover:bg-pink-100',
  red: 'border-red-200 text-red-600 hover:border-red-300 bg-red-50 hover:bg-red-100',
  orange:
    'border-orange-200 text-orange-600 hover:border-orange-300 bg-orange-50 hover:bg-orange-100',
  black: 'border-gray-300 text-gray-600 hover:border-gray-500',
} as const;

type Color = keyof typeof styles;

type CardContextValue = {
  disabled?: boolean;
};

const CardContext = createContext<CardContextValue>({});

type RootProps = {
  children: React.ReactNode;
  color?: Color;
  disabled?: boolean;
  className?: string;
};

function Root({ children, color = 'black', disabled, className }: RootProps) {
  return (
    <CardContext.Provider value={{ disabled }}>
      <div
        className={`
			flex flex-col p-6 border-2 rounded-xl
			transition-transform duration-150 ease-out
			h-full
			${styles[color]}
			${disabled ? 'cursor-not-allowed opacity-70' : 'hover:-translate-y-1 hover:shadow-sm'}
			${className ?? ''}
  `}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex justify-between items-center">{children}</div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h1 className="font-bold text-lg mb-2 text-gray-900">{children}</h1>;
}

function Description({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

function Label({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="text-black px-2 rounded-xl bg-gray-200">{children}</span>
  );
}

function Icon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="mb-4">
      <Icon size={24} strokeWidth={1.5} />
    </div>
  );
}

type LinkProps = {
  to: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

function CardLink({ to, children, disabled, className }: LinkProps) {
  const ctx = useContext(CardContext);
  const isDisabled = disabled ?? ctx.disabled;

  const base = `block h-full ${className ?? ''}`;

  if (isDisabled) {
    return <div className={base}>{children}</div>;
  }

  return (
    <Link to={to} className={base}>
      {children}
    </Link>
  );
}

export const Card = Object.assign(Root, {
  Header,
  Title,
  Description,
  Label,
  Badge,
  Icon,
  Link: CardLink,
});
