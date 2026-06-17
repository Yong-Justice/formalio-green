import { Filter, LocateFixed, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import GreenMap from '../components/map/GreenMap';
import { useMapMarkers } from '../hooks/useMapMarkers';
import type { Coordinates, MapMarker } from '../types/map';
import { BAFOUSSAM_ZONES, CITY_COORDINATES } from '../utils/coordinates';

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

export default function GreenMapPage() {
  const markers = useMapMarkers();
  const [locationId, setLocationId] = useState('Bafoussam');
  const [spotFilter, setSpotFilter] = useState<SpotFilter>('all');
  const selectedLocation = locationOptions.find((option) => option.id === locationId) || locationOptions[1];

  const scopedMarkers = useMemo(() => markers.filter((marker) => markerMatchesScope(marker, selectedLocation)), [markers, selectedLocation]);
  const visibleMarkers = useMemo(() => scopedMarkers.filter((marker) => markerMatchesFilter(marker, spotFilter)), [scopedMarkers, spotFilter]);

  const problems = scopedMarkers.filter((marker) => marker.type === 'report' && marker.status !== 'resolved' && marker.status !== 'rejected').length;
  const resolved = scopedMarkers.filter((marker) => marker.status === 'resolved' || marker.status === 'completed').length;
  const activeMissions = scopedMarkers.filter((marker) => marker.type === 'mission' && marker.status !== 'completed').length;

  return (
    <main className="relative flex flex-1 overflow-hidden bg-sky-100">
      <GreenMap
        markers={visibleMarkers}
        center={selectedLocation.center}
        zoom={selectedLocation.zoom}
        className="absolute inset-0"
      />

      <div className="absolute inset-x-5 top-5 z-[1000] space-y-3">
        <div className="flex items-center gap-3">
          <label className="flex h-16 min-w-0 flex-1 items-center gap-3 rounded-3xl bg-white px-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
            <Search size={27} className="shrink-0 text-ink" />
            <select
              value={locationId}
              onChange={(event) => setLocationId(event.target.value)}
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
            onClick={() => setSpotFilter((current) => (current === 'all' ? 'problems' : 'all'))}
            aria-label="Toggle problem filter"
          >
            <Filter size={28} />
          </button>
        </div>

        <label className="flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-sm font-bold shadow-sm">
          <span className="text-slate-500">Show</span>
          <select
            value={spotFilter}
            onChange={(event) => setSpotFilter(event.target.value as SpotFilter)}
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
        onClick={() => setLocationId('Bafoussam')}
        aria-label="Center on Bafoussam"
      >
        <LocateFixed size={27} />
      </button>

      <section className="absolute inset-x-5 bottom-5 z-[1000] rounded-[24px] bg-white/95 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">{selectedLocation.scope === 'global' ? 'Global Impact' : selectedLocation.label}</h1>
          <span className="text-sm font-bold text-primary">{visibleMarkers.length} spots</span>
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
    </main>
  );
}
