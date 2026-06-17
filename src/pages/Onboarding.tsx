import { Link } from 'react-router-dom';
import DesignedScreen from '../components/common/DesignedScreen';

export default function Onboarding() {
  return (
    <DesignedScreen src="/images/onboarding-screen.png" alt="Formalio Green onboarding screen">
      <Link className="absolute inset-x-[14%] bottom-[10.5%] h-[6.5%] rounded-2xl" to="/register" aria-label="Get started" />
      <Link className="absolute bottom-[5.2%] right-[22%] h-8 w-20 rounded-lg" to="/login" aria-label="Login" />
    </DesignedScreen>
  );
}
