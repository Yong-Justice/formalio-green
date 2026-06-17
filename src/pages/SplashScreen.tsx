import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesignedScreen from '../components/common/DesignedScreen';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate('/onboarding'), 2600);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <DesignedScreen src="/images/launch-screen.png" alt="Formalio Green launch artwork">
      <div className="absolute inset-0 bg-green-dark/5 animate-[launchFade_2.4s_ease-out_forwards]" />
      <div className="absolute left-1/2 top-[22%] h-36 w-36 -translate-x-1/2 rounded-full bg-lime-300/20 blur-2xl animate-ping" />
      <div className="absolute bottom-[6.5%] left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-white/25 border-t-lime-400 animate-spin" />
      <button
        type="button"
        aria-label="Skip launch animation"
        className="absolute inset-0 cursor-pointer"
        onClick={() => navigate('/onboarding')}
      />
    </DesignedScreen>
  );
}
