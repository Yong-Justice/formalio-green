import { Link } from 'react-router-dom';
import { APP_NAME, TAGLINE } from '../utils/constants';

export default function SplashScreen() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-green-dark p-8 text-center text-white">
      <div className="mb-6 h-20 w-20 rounded-2xl bg-primary" />
      <h1 className="text-3xl font-bold">{APP_NAME}</h1>
      <p className="mt-2 text-green-light">{TAGLINE}</p>
      <Link className="mt-8 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green-dark" to="/onboarding">Continue</Link>
    </main>
  );
}
