import { Link } from 'react-router-dom';
import PageContainer from '../components/common/PageContainer';

export default function Register() {
  return <PageContainer title="Register" eyebrow="Auth"><p className="text-slate-600">Account creation placeholder for Supabase Auth.</p><Link className="font-semibold text-primary" to="/home">Create demo account</Link></PageContainer>;
}
