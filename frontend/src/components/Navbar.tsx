import { Link } from '@tanstack/react-router';
import { styles } from './Card';
import Logo from './Logo';

type Color = keyof typeof styles;

const navItems: { color: Color; to: string; label: string }[] = [
  { color: 'green', to: '/modes', label: 'Modes' },
  { color: 'pink', to: '/layouts', label: 'Layouts' },
  { color: 'blue', to: '/', label: 'Stats' },
];

export function Navbar() {
  return (
    <nav className="flex justify-between px-32 pt-2">
      <Link to="/" className="text-2xl">
        <Logo />
      </Link>

      <ul className="flex gap-4">
        {navItems.map(({ color, to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`${styles[color]} block px-6 py-2 border rounded-lg`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
