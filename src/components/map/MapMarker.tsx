import L from 'leaflet';
import { Marker } from 'react-leaflet';
import type { MapMarker as MapMarkerType } from '../../types/map';
import { markerHex } from '../../utils/markerColors';
import MarkerPopup from './MarkerPopup';

function markerLabel(marker: MapMarkerType) {
  if (marker.type === 'achievement') return 'A';
  if (marker.status === 'resolved' || marker.status === 'completed') return '8';
  if (marker.type === 'mission') return String(Math.min(99, marker.volunteersJoined || 8));
  if (marker.severity === 'high') return '7';
  if (marker.severity === 'medium') return '5';
  return '3';
}

function createMarkerIcon(color: string, label: string) {
  return L.divIcon({
    className: 'formalio-marker',
    html: `<span style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:999px;background:${color};border:3px solid white;box-shadow:0 8px 18px rgba(15,23,42,.28);color:white;font-size:17px;font-weight:900;line-height:1">${label}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

type MapMarkerProps = {
  marker: MapMarkerType;
};

export default function MapMarker({ marker }: MapMarkerProps) {
  return (
    <Marker position={[marker.latitude, marker.longitude]} icon={createMarkerIcon(markerHex(marker.color), markerLabel(marker))}>
      <MarkerPopup marker={marker} />
    </Marker>
  );
}
