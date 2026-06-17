import L from 'leaflet';
import { Marker } from 'react-leaflet';
import type { MapMarker as MapMarkerType } from '../../types/map';
import { markerHex } from '../../utils/markerColors';

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
  onSelect?: (marker: MapMarkerType) => void;
  selected?: boolean;
};

function createSelectedMarkerIcon(color: string) {
  return L.divIcon({
    className: 'formalio-marker formalio-marker-selected',
    html: `
      <span style="position:relative;display:block;width:44px;height:54px;">
        <span style="position:absolute;left:5px;top:0;width:34px;height:34px;border-radius:999px 999px 999px 0;background:${color};border:4px solid white;box-shadow:0 12px 24px rgba(15,23,42,.3);transform:rotate(-45deg);"></span>
        <span style="position:absolute;left:17px;top:10px;width:10px;height:10px;border-radius:999px;background:white;box-shadow:0 0 0 2px rgba(255,255,255,.35);"></span>
      </span>
    `,
    iconSize: [44, 54],
    iconAnchor: [22, 44],
  });
}

export default function MapMarker({ marker, onSelect, selected = false }: MapMarkerProps) {
  const markerColor = markerHex(marker.color);

  return (
    <Marker
      position={[marker.latitude, marker.longitude]}
      icon={selected ? createSelectedMarkerIcon(markerColor) : createMarkerIcon(markerColor, markerLabel(marker))}
      eventHandlers={{ click: () => onSelect?.(marker) }}
    />
  );
}
