import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import StatusBar from './StatusBar';

const hideNavigationRoutes = new Set(['/', '/onboarding', '/login', '/register']);

type PhoneFrameProps = {
  children: ReactNode;
};

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const location = useLocation();
  const showChrome = !hideNavigationRoutes.has(location.pathname);
  const showStatusBar = showChrome;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 p-4">
      <div className="flex h-[844px] w-full max-w-[390px] flex-col overflow-hidden rounded-[32px] border-[10px] border-slate-950 bg-white shadow-phone">
        {showStatusBar ? <StatusBar /> : null}
        {showChrome ? <Header /> : null}
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        {showChrome ? <BottomNavigation /> : null}
      </div>
    </div>
  );
}
