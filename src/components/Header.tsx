import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="mb-12">
      <Link to="/" className="block">
        <h1 className="text-4xl font-bold text-theme-text-primary mb-2 hover:text-theme-accent-primary transition-colors">
          Anuradha Weeraman
        </h1>
        <p className="text-theme-text-tertiary">A practitioner's views on computers, operating systems and technology</p>
      </Link>
    </header>
  );
}
