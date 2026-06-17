import { Link } from 'react-router-dom';
import AuthBrand from '../components/common/AuthBrand';

export default function Onboarding() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-white px-6 pb-8 pt-10 text-center text-ink">
      <AuthBrand />

      <section className="mt-8">
        <h1 className="text-[28px] font-extrabold leading-tight text-green-dark">
          Let&apos;s protect our environment together.
        </h1>
        <p className="mx-auto mt-5 max-w-[300px] text-xl leading-relaxed text-ink">
          Report issues, join missions, earn <span className="font-extrabold text-primary">Eco Points</span> and restore
          our communities.
        </p>
      </section>

      <div className="relative mt-6 min-h-0 flex-1">
        <img src="/images/onboarding-screen.png" alt="" className="h-full w-full object-cover object-[50%_61%]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-green-light" />
        <span className="h-3 w-3 rounded-full bg-green-light" />
      </div>

      <Link
        className="mt-6 flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-green-700 text-lg font-extrabold text-white shadow-lg shadow-green-700/20"
        to="/register"
      >
        Get Started
      </Link>

      <p className="mt-5 text-base font-medium">
        Already have an account?{' '}
        <Link to="/login" className="font-extrabold text-primary">
          Login
        </Link>
      </p>
    </main>
  );
}
