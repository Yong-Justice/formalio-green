import L from 'leaflet';
import { Marker } from 'react-leaflet';
import type { MapMarker as MapMarkerType } from '../../types/map';
import { markerHex } from '../../utils/markerColors';
import MarkerPopup from './MarkerPopup';

function createMarkerIcon(color: string) {
  return L.divIcon({
    className: 'formalio-marker',
    html: `<span style="display:block;width:18px;height:18px;border-radius:999px;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.25)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

type MapMarkerProps = {
  marker: MapMarkerType;
};

export default function MapMarker({ marker }: MapMarkerProps) {
  return (
    <Marker position={[marker.latitude, marker.longitude]} icon={createMarkerIcon(markerHex(marker.color))}>
      <MarkerPopup marker={marker} />
    </Marker>
  );
}
