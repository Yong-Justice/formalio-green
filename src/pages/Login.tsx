import { Link } from 'react-router-dom';
import DesignedScreen from '../components/common/DesignedScreen';

export default function Login() {
  return (
    <DesignedScreen src="/images/login-screen.png" alt="Formalio Green login screen">
      <Link className="absolute inset-x-[11%] top-[67.5%] h-[6%] rounded-2xl" to="/home" aria-label="Login" />
      <Link className="absolute bottom-[6.8%] right-[18%] h-8 w-24 rounded-lg" to="/register" aria-label="Register" />
      <Link className="absolute right-[10%] top-[62%] h-7 w-36 rounded-lg" to="/login" aria-label="Forgot password" />
    </DesignedScreen>
  );
}
