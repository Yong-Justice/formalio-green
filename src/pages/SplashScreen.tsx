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
      <div className="absolute bottom-[4.1%] left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-green-dark/95 blur-sm" />
      <div className="absolute bottom-[5%] left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-green-dark/90 p-2">
        <div className="h-full w-full animate-spin rounded-full border-[4px] border-white/25 border-t-lime-400 border-r-lime-300" />
      </div>
      <button
        type="button"
        aria-label="Skip launch animation"
        className="absolute inset-0 cursor-pointer"
        onClick={() => navigate('/onboarding')}
      />
    </DesignedScreen>
  );
}
