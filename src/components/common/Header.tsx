import { Link } from 'react-router-dom';
import { APP_NAME, TAGLINE } from '../../utils/constants';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3">
      <Link to="/home" className="block">
        <p className="text-base font-bold text-green-dark">{APP_NAME}</p>
        <p className="text-xs text-slate-500">{TAGLINE}</p>
      </Link>
    </header>
  );
}
