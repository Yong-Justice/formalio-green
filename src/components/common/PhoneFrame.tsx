import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import StatusBar from './StatusBar';

const hideNavigationRoutes = new Set(['/', '/onboarding', '/login', '/register']);
const hideHeaderRoutes = new Set(['/home', '/map', '/missions', '/challenges', '/report', '/profile', '/leaderboard']);
const hideHeaderPrefixes = ['/missions/', '/submit-proof/', '/verification/'];

type PhoneFrameProps = {
  children: ReactNode;
};

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const location = useLocation();
  const [scale, setScale] = useState(1);
  const showChrome = !hideNavigationRoutes.has(location.pathname);
  const routeOwnsHeader = hideHeaderRoutes.has(location.pathname) || hideHeaderPrefixes.some((prefix) => location.pathname.startsWith(prefix));
  const showHeader = showChrome && !routeOwnsHeader;
  const showStatusBar = showChrome;

  useEffect(() => {
    function updateScale() {
      const nextScale = Math.min(1, (window.innerHeight - 32) / 864, (window.innerWidth - 32) / 410);
      setScale(Number.isFinite(nextScale) ? Math.max(0.5, nextScale) : 1);
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 p-4">
      <div
        style={{ width: 410 * scale, height: 864 * scale }}
      >
        <div
          className="phone-shell flex h-[844px] w-[390px] origin-top-left flex-col overflow-hidden rounded-[32px] border-[10px] border-slate-950 bg-white shadow-phone"
          style={{ transform: `scale(${scale})` }}
        >
          {showStatusBar ? <StatusBar /> : null}
          {showHeader ? <Header /> : null}
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          {showChrome ? <BottomNavigation /> : null}
        </div>
      </div>
    </div>
  );
}
