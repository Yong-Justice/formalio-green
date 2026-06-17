import { Eye, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthBrand from '../components/common/AuthBrand';
import AuthField from '../components/common/AuthField';

export default function Login() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-white px-6 pb-8 pt-8 text-ink">
      <AuthBrand />

      <section className="mt-8 text-center">
        <h1 className="text-3xl font-extrabold text-green-dark">Welcome back!</h1>
        <p className="mt-2 text-xl text-slate-500">Login to continue</p>
      </section>

      <form
        className="mt-8 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          navigate('/home');
        }}
      >
        <AuthField label="Email or Phone" icon={<Mail size={24} />} placeholder="Enter your email or phone" />
        <AuthField
          label="Password"
          icon={<LockKeyhole size={24} />}
          placeholder="Enter your password"
          type="password"
          action={<Eye size={24} className="text-slate-500" />}
        />

        <Link to="/login" className="block text-right text-base font-bold text-primary">
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="h-14 w-full rounded-xl bg-gradient-to-r from-primary to-green-700 text-lg font-extrabold text-white shadow-lg shadow-green-700/20"
        >
          Login
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4 text-slate-500">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-base">or continue with</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button type="button" className="h-14 rounded-xl border border-slate-200 bg-white text-base font-bold shadow-sm">
          Google
        </button>
        <button type="button" className="h-14 rounded-xl border border-slate-200 bg-white text-base font-bold shadow-sm">
          Facebook
        </button>
      </div>

      <p className="mt-auto pt-8 text-center text-base font-medium">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-extrabold text-primary">
          Register
        </Link>
      </p>
    </main>
  );
}
