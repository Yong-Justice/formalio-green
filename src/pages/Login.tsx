import { Link } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

export default function Login() {
  return <PageContainer title="Login" eyebrow="Auth"><p className="text-slate-600">Supabase Auth form placeholder.</p><Link className="font-semibold text-primary" to="/home">Enter demo app</Link><Link className="block text-sm text-slate-500" to="/register">Create account</Link></PageContainer>;
}
