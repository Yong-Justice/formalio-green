import { Link } from 'react-router-dom';
import DesignedScreen from '../components/common/DesignedScreen';

export default function Register() {
  return (
    <DesignedScreen src="/images/register-screen.png" alt="Formalio Green create account screen">
      <Link className="absolute left-[9%] top-[8.2%] h-10 w-10 rounded-full" to="/onboarding" aria-label="Back" />
      <Link className="absolute inset-x-[11%] top-[83.5%] h-[6.5%] rounded-2xl" to="/home" aria-label="Register" />
      <Link className="absolute bottom-[4.8%] right-[25%] h-8 w-20 rounded-lg" to="/login" aria-label="Login" />
    </DesignedScreen>
  );
}
