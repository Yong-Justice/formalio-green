import Card from '../components/common/Card';
import PageContainer from '../components/common/PageContainer';
import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const user = useAuthStore((state) => state.currentUser);
  return <PageContainer title="Profile" eyebrow="Citizen account"><Card><p className="font-semibold">{user?.fullName}</p><p className="text-sm text-slate-500">{user?.city} • {user?.ecoScore} Eco Points</p></Card></PageContainer>;
}
