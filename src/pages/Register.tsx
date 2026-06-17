import { ArrowLeft, ChevronDown, Eye, LockKeyhole, Mail, MapPin, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBrand from '../components/common/AuthBrand';
import AuthField from '../components/common/AuthField';
import { mockCities } from '../data/mapLocations';

export default function Register() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-6 pb-8 pt-6 text-ink">
      <button
        type="button"
        onClick={() => navigate('/onboarding')}
        className="mb-2 flex h-10 w-10 items-center justify-center rounded-full text-ink"
        aria-label="Back to onboarding"
      >
        <ArrowLeft size={30} />
      </button>

      <AuthBrand />

      <section className="mt-7 text-center">
        <h1 className="text-3xl font-extrabold text-green-dark">Create Account</h1>
        <p className="mt-2 text-xl text-slate-500">Join Formalio Green today</p>
      </section>

      <form
        className="mt-7 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          navigate('/home');
        }}
      >
        <AuthField label="Full Name" icon={<User size={24} />} placeholder="Enter your full name" />
        <AuthField label="Email or Phone" icon={<Mail size={24} />} placeholder="Enter your email or phone" />
        <AuthField
          label="Password"
          icon={<LockKeyhole size={24} />}
          placeholder="Create a password"
          type="password"
          action={<Eye size={24} className="text-slate-500" />}
        />

        <label className="block">
          <span className="mb-2 block text-base font-bold text-ink">City</span>
          <span className="flex h-[58px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
            <MapPin size={24} className="text-slate-500" />
            <select defaultValue="" className="min-w-0 flex-1 appearance-none bg-transparent text-base text-slate-500 outline-none">
              <option value="" disabled>
                Select your city
              </option>
              {mockCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown size={24} className="text-slate-500" />
          </span>
        </label>

        <button
          type="submit"
          className="h-14 w-full rounded-xl bg-gradient-to-r from-primary to-green-700 text-lg font-extrabold text-white shadow-lg shadow-green-700/20"
        >
          Register
        </button>
      </form>

      <p className="mt-auto pt-7 text-center text-base font-medium">
        Already have an account?{' '}
        <Link to="/login" className="font-extrabold text-primary">
          Login
        </Link>
      </p>
    </main>
  );
}
