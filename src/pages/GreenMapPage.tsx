import { AlertTriangle, CalendarDays, Filter, Info, Leaf, LocateFixed, MapPin, Recycle, Search, Users, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GreenMap from '../components/map/GreenMap';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { useAuthStore } from '../store/authStore';
import { useMissionStore } from '../store/missionStore';
import type { Coordinates, MapMarker } from '../types/map';
import { BAFOUSSAM_ZONES, CITY_COORDINATES } from '../utils/coordinates';
import { statusLabel } from '../utils/statusLabels';

type LocationOption = {
  id: string;
  label: string;
  placeholder: string;
  center: Coordinates;
  zoom: number;
  scope: 'global' | 'country' | 'region' | 'city' | 'zone';
  city?: string;
  region?: string;
};

type SpotFilter = 'all' | 'problems' | 'resolved' | 'missions' | 'achievements';

const REGION_COORDINATES: Record<string, Coordinates> = {
  'West Region': { latitude: 5.55, longitude: 10.35 },
  'Littoral Region': { latitude: 4.15, longitude: 9.75 },
  'Centre Region': { latitude: 4.0, longitude: 11.6 },
  'Southwest Region': { latitude: 4.25, longitude: 9.2 },
  'Far North Region': { latitude: 10.7, longitude: 14.35 },
  'Northwest Region': { latitude: 5.95, longitude: 10.2 },
  'Adamawa Region': { latitude: 7.35, longitude: 13.55 },
};

const locationOptions: LocationOption[] = [
  { id: 'world', label: 'World view', placeholder: 'Search location', center: { latitude: 18, longitude: 8 }, zoom: 2, scope: 'global' },
  { id: 'cameroon', label: 'Cameroon', placeholder: 'Search in Cameroon', center: CITY_COORDINATES.Cameroon, zoom: 6, scope: 'country' },
  ...Object.entries(REGION_COORDINATES).map(([region, center]) => ({ id: region, label: region, placeholder: `Search in ${region}`, center, zoom: 7, scope: 'region' as const, region })),
  ...Object.entries(CITY_COORDINATES)
    .filter(([city]) => city !== 'Cameroon')
    .map(([city, center]) => ({ id: city, label: city, placeholder: `Search in ${city}`, center, zoom: city === 'Bafoussam' ? 13 : 11, scope: 'city' as const, city })),
  ...Object.entries(BAFOUSSAM_ZONES).map(([zone, center]) => ({
    id: `zone-${zone}`,
    label: `Bafoussam - ${zone}`,
    placeholder: `Search near ${zone}`,
    center,
    zoom: 14,
    scope: 'zone' as const,
    city: 'Bafoussam',
  })),
];

function markerMatchesScope(marker: MapMarker, location: LocationOption) {
  if (location.scope === 'global' || location.scope === 'country') return true;
  if (location.scope === 'region') return marker.region === location.region;
  if (location.scope === 'city' || location.scope === 'zone') return marker.city === location.city;
  return true;
}

function markerMatchesFilter(marker: MapMarker, filter: SpotFilter) {
  if (filter === 'all') return true;
  if (filter === 'problems') return marker.type === 'report' && marker.status !== 'resolved' && marker.status !== 'rejected';
  if (filter === 'resolved') return marker.status === 'resolved' || marker.status === 'completed';
  if (filter === 'missions') return marker.type === 'mission' && marker.status !== 'completed';
  return marker.type === 'achievement';
}

const issueLabels: Record<string, string> = {
  illegal_dumping: 'Waste Pollution',
  water_pollution: 'Water Pollution',
  blocked_drainage: 'Blocked Drainage',
  plastic_waste: 'Plastic Waste',
  flood_risk: 'Flood Risk',
  deforestation: 'Deforestation',
  other: 'Community Issue',
};

function formatDate(date?: string) {
  if (!date) return 'Recently reported';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
}

function spotCategory(marker: MapMarker) {
  if (marker.issueType) return issueLabels[marker.issueType];
  if (marker.type === 'mission') return 'Community Mission';
  if (marker.type === 'achievement') return 'Fixed / Restored';
  return marker.spotKind ? statusLabel(marker.spotKind) : 'Green Map Spot';
}

function severityLabel(marker: MapMarker) {
  if (marker.severity === 'high') return 'High';
  if (marker.severity === 'medium') return 'Medium';
  if (marker.severity === 'low') return 'Low';
  if (marker.status === 'completed' || marker.status === 'resolved' || marker.type === 'achievement') return 'Fixed';
  return 'Normal';
}

function urgencyLabel(marker: MapMarker) {
  if (marker.status === 'resolved' || marker.status === 'completed' || marker.type === 'achievement') return 'Fixed';
  if (marker.type === 'mission') return marker.status === 'in_progress' ? 'In progress' : 'Active';
  if (marker.severity === 'high') return 'Urgent';
  if (marker.status === 'under_review') return 'Review';
  return 'Open';
}

function urgencyClass(marker: MapMarker) {
  const label = urgencyLabel(marker);
  if (label === 'Urgent') return 'bg-red-100 text-red-600';
  if (label === 'Fixed') return 'bg-green-light text-primary';
  if (label === 'Review') return 'bg-orange-100 text-warning';
  return 'bg-blue-100 text-mission';
}

type SpotDetailsSheetProps = {
  marker: MapMarker;
  detailMissionId?: string;
  onClose: () => void;
  onJoinMission: () => void;
};

function SpotDetailsSheet({ marker, detailMissionId, onClose, onJoinMission }: SpotDetailsSheetProps) {
  const volunteersNeeded = marker.volunteersNeeded ?? (marker.severity === 'high' ? 15 : marker.severity === 'medium' ? 10 : 6);
  const detailsTo = detailMissionId ? `/missions/${detailMissionId}` : '/missions';

  return (
    <section className="absolute inset-x-0 bottom-0 z-[1000] max-h-[64%] overflow-y-auto rounded-t-[30px] bg-white px-6 pb-5 pt-4 shadow-[0_-18px_45px_rgba(15,23,42,0.18)]">
      <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-200" />
      <div className="flex items-start justify-between gap-4">
        <h1 className="max-w-[230px] text-[27px] font-extrabold leading-tight text-ink">{marker.title}</h1>
        <div className="flex items-center gap-2">
          <span className={`rounded-2xl px-4 py-2 text-sm font-extrabold ${urgencyClass(marker)}`}>{urgencyLabel(marker)}</span>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500" aria-label="Close spot details">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-[15px] font-semibold text-ink">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white"><Recycle size={16} /></span>
          <span>{spotCategory(marker)}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={23} className="text-primary" />
          <span>{marker.city}, {marker.region}</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays size={23} className="text-primary" />
          <span>Reported on {formatDate(marker.reportedAt)}</span>
        </div>
      </div>

      <div className="my-4 h-px bg-slate-200" />

      <div className="space-y-3 text-[15px]">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3 font-bold text-ink"><AlertTriangle size={23} className="text-red-500" />Severity</span>
          <span className="font-extrabold text-red-500">{severityLabel(marker)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3 font-bold text-ink"><Info size={23} className="text-warning" />Status</span>
          <span className="text-right font-extrabold text-red-500">{statusLabel(marker.status)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3 font-bold text-ink"><Users size={23} className="text-primary" />Volunteers Needed</span>
          <span className="font-extrabold text-primary">{volunteersNeeded}</span>
        </div>
      </div>

      <div className="my-4 h-px bg-slate-200" />

      <p className="mb-3 text-sm font-extrabold text-ink">Before Photo</p>
      <div className="relative h-24 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 via-lime-100 to-slate-200">
        <div className="absolute inset-x-0 bottom-0 h-10 bg-amber-900/25" />
        <div className="absolute -bottom-3 left-5 h-12 w-16 rotate-[-8deg] rounded-full bg-slate-800/40" />
        <div className="absolute bottom-2 left-20 h-7 w-10 rotate-6 rounded-full bg-white/70" />
        <div className="absolute bottom-1 right-16 h-8 w-14 rotate-[-12deg] rounded-full bg-sky-500/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700">{marker.city} field report</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Link to={detailsTo} className="flex h-14 items-center justify-center rounded-xl border border-primary bg-white text-base font-extrabold text-primary">
          View Details
        </Link>
        <button type="button" onClick={onJoinMission} className="flex h-14 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-white shadow-[0_10px_20px_rgba(22,163,74,.24)]">
          Join Mission
        </button>
      </div>
    </section>
  );
}

export default function GreenMapPage() {
  const navigate = useNavigate();
  const markers = useMapMarkers();
  const missions = useMissionStore((state) => state.missions);
  const joinMission = useMissionStore((state) => state.joinMission);
  const currentUser = useAuthStore((state) => state.currentUser);
  const [locationId, setLocationId] = useState('Bafoussam');
  const [spotFilter, setSpotFilter] = useState<SpotFilter>('all');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const selectedLocation = locationOptions.find((option) => option.id === locationId) || locationOptions[1];

  const scopedMarkers = useMemo(() => markers.filter((marker) => markerMatchesScope(marker, selectedLocation)), [markers, selectedLocation]);
  const visibleMarkers = useMemo(() => scopedMarkers.filter((marker) => markerMatchesFilter(marker, spotFilter)), [scopedMarkers, spotFilter]);
  const selectedSpot = selectedSpotId ? visibleMarkers.find((marker) => marker.id === selectedSpotId) : undefined;
  const detailMission = useMemo(() => {
    if (!selectedSpot) return undefined;
    return (
      missions.find((mission) => mission.id === selectedSpot.missionId)
      || missions.find((mission) => selectedSpot.reportId && mission.reportId === selectedSpot.reportId)
      || missions.find((mission) => mission.city === selectedSpot.city && mission.status !== 'completed' && mission.status !== 'cancelled')
      || missions.find((mission) => mission.status !== 'completed' && mission.status !== 'cancelled')
    );
  }, [missions, selectedSpot]);

  const problems = scopedMarkers.filter((marker) => marker.type === 'report' && marker.status !== 'resolved' && marker.status !== 'rejected').length;
  const resolved = scopedMarkers.filter((marker) => marker.status === 'resolved' || marker.status === 'completed').length;
  const activeMissions = scopedMarkers.filter((marker) => marker.type === 'mission' && marker.status !== 'completed').length;

  function handleLocationChange(nextLocationId: string) {
    setLocationId(nextLocationId);
    setSelectedSpotId(null);
  }

  function handleFilterChange(nextFilter: SpotFilter) {
    setSpotFilter(nextFilter);
    setSelectedSpotId(null);
  }

  function handleJoinMission() {
    if (!detailMission) {
      navigate('/missions');
      return;
    }

    if (currentUser) joinMission(detailMission.id, currentUser.id);
    navigate(`/missions/${detailMission.id}`);
  }

  return (
    <main className="relative flex flex-1 overflow-hidden bg-sky-100">
      <GreenMap
        markers={visibleMarkers}
        center={selectedLocation.center}
        zoom={selectedLocation.zoom}
        className="absolute inset-0"
        selectedMarkerId={selectedSpot?.id}
        onMarkerSelect={(marker) => setSelectedSpotId(marker.id)}
      />

      <div className="absolute inset-x-5 top-5 z-[1000] space-y-3">
        <div className="flex items-center gap-3">
          <label className="flex h-16 min-w-0 flex-1 items-center gap-3 rounded-3xl bg-white px-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
            <Search size={27} className="shrink-0 text-ink" />
            <select
              value={locationId}
              onChange={(event) => handleLocationChange(event.target.value)}
              className="min-w-0 flex-1 appearance-none bg-transparent text-lg font-medium text-slate-600 outline-none"
              aria-label="Center map location"
            >
              {locationOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            onClick={() => handleFilterChange(spotFilter === 'all' ? 'problems' : 'all')}
            aria-label="Toggle problem filter"
          >
            <Filter size={28} />
          </button>
        </div>

        <label className="flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-sm font-bold shadow-sm">
          <span className="text-slate-500">Show</span>
          <select
            value={spotFilter}
            onChange={(event) => handleFilterChange(event.target.value as SpotFilter)}
            className="min-w-0 flex-1 bg-transparent text-primary outline-none"
            aria-label="Filter map spots"
          >
            <option value="all">All spots</option>
            <option value="problems">Problems only</option>
            <option value="resolved">Fixed/resolved</option>
            <option value="missions">Active missions</option>
            <option value="achievements">Achievement zones</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        className="absolute right-6 top-[52%] z-[1000] flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink shadow-lg"
        onClick={() => handleLocationChange('Bafoussam')}
        aria-label="Center on Bafoussam"
      >
        <LocateFixed size={27} />
      </button>

      {selectedSpot ? (
        <SpotDetailsSheet
          marker={selectedSpot}
          detailMissionId={detailMission?.id}
          onClose={() => setSelectedSpotId(null)}
          onJoinMission={handleJoinMission}
        />
      ) : (
        <section className="absolute inset-x-5 bottom-5 z-[1000] rounded-[24px] bg-white/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">{selectedLocation.scope === 'global' ? 'Global Impact' : selectedLocation.label}</h1>
            <span className="flex items-center gap-1 rounded-full bg-green-light px-3 py-1 text-sm font-bold text-primary">
              <Leaf size={14} /> {visibleMarkers.length} spots
            </span>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-100 text-center">
            <div className="p-4">
              <p className="text-sm text-slate-500">Problems</p>
              <p className="mt-2 text-3xl font-extrabold text-ink">{problems}</p>
            </div>
            <div className="border-x border-slate-100 p-4">
              <p className="text-sm text-slate-500">Resolved</p>
              <p className="mt-2 text-3xl font-extrabold text-primary">{resolved}</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-500">Missions</p>
              <p className="mt-2 text-3xl font-extrabold text-mission">{activeMissions}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
