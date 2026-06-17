import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PhoneFrame from './components/common/PhoneFrame';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import GreenMapPage from './pages/GreenMapPage';
import ReportProblem from './pages/ReportProblem';
import Missions from './pages/Missions';
import MissionDetails from './pages/MissionDetails';
import SubmitProof from './pages/SubmitProof';
import VerificationStatus from './pages/VerificationStatus';
import Leaderboard from './pages/Leaderboard';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import AdminPreview from './pages/AdminPreview';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<GreenMapPage />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/missions/:id" element={<MissionDetails />} />
          <Route path="/submit-proof/:missionId" element={<SubmitProof />} />
          <Route path="/verification/:proofId" element={<VerificationStatus />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-preview" element={<AdminPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PhoneFrame>
    </BrowserRouter>
  );
}
