/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        'green-dark': '#064E3B',
        'green-light': '#DCFCE7',
        gold: '#FBBF24',
        danger: '#EF4444',
        warning: '#F97316',
        mission: '#2563EB',
        app: '#F8FAFC',
        ink: '#111827',
      },
      boxShadow: {
        phone: '0 24px 80px rgba(15, 23, 42, 0.28)',
      },
    },
  },
  plugins: [],
};
