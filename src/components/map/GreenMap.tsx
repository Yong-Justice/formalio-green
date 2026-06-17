import { MapContainer, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { Coordinates, MapMarker as MapMarkerType } from '../../types/map';
import { CITY_COORDINATES } from '../../utils/coordinates';
import MapMarker from './MapMarker';

function MapFocus({ center, zoom }: { center: Coordinates; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([center.latitude, center.longitude], zoom);
  }, [center, map, zoom]);

  return null;
}

type GreenMapProps = {
  markers: MapMarkerType[];
  center?: Coordinates;
  zoom?: number;
  className?: string;
};

export default function GreenMap({ markers, center = CITY_COORDINATES.Bafoussam, zoom = 13, className = 'h-[360px] overflow-hidden rounded-lg border border-slate-200' }: GreenMapProps) {
  return (
    <div className={className}>
      <MapContainer center={[center.latitude, center.longitude]} zoom={zoom} zoomControl={false} scrollWheelZoom className="h-full">
        <MapFocus center={center} zoom={zoom} />
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => <MapMarker key={`${marker.type}-${marker.id}`} marker={marker} />)}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}
