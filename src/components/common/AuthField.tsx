import type { InputHTMLAttributes, ReactNode } from 'react';

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: ReactNode;
  action?: ReactNode;
};

export default function AuthField({ label, icon, action, className = '', ...props }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-bold text-ink">{label}</span>
      <span className="flex h-[58px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 shadow-sm">
        <span className="text-slate-500">{icon}</span>
        <input
          className={`min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-slate-400 ${className}`}
          {...props}
        />
        {action}
      </span>
    </label>
  );
}
