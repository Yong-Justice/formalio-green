import { useState } from 'react';
import GreenMap from '../components/map/GreenMap';
import MapFilters from '../components/map/MapFilters';
import MapStatsCard from '../components/map/MapStatsCard';
import PageContainer from '../components/common/PageContainer';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { focusBafoussam, focusCameroon } from '../services/mapService';

export default function GreenMapPage() {
  const markers = useMapMarkers();
  const [center, setCenter] = useState(focusBafoussam());
  return (
    <PageContainer title="Green Map" eyebrow="Live markers">
      <MapFilters onFocusCameroon={() => setCenter(focusCameroon())} onFocusBafoussam={() => setCenter(focusBafoussam())} />
      <MapStatsCard reportCount={markers.filter((marker) => marker.type === 'report').length} missionCount={markers.filter((marker) => marker.type === 'mission').length} />
      <GreenMap markers={markers} center={center} />
    </PageContainer>
  );
}
