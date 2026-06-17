import { Link } from 'react-router-dom';

export default function SplashScreen() {
  return (
    <main className="relative flex flex-1 overflow-hidden bg-green-dark text-center text-white">
      <img
        src="/images/launch-screen.png"
        alt="Formalio Green launch artwork"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-green-dark/10" />
      <Link
        className="absolute inset-x-8 bottom-8 rounded-full bg-white/95 px-5 py-3 text-sm font-bold text-green-dark shadow-lg transition hover:bg-green-light"
        to="/onboarding"
      >
        Continue
      </Link>
    </main>
  );
}
