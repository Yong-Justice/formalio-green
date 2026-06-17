import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { Coordinates, MapMarker as MapMarkerType } from '../../types/map';
import { CITY_COORDINATES } from '../../utils/coordinates';
import MapMarker from './MapMarker';

function MapFocus({ center }: { center: Coordinates }) {
  const map = useMap();

  useEffect(() => {
    const zoom = center.latitude === CITY_COORDINATES.Bafoussam.latitude ? 13 : center.latitude === CITY_COORDINATES.Cameroon.latitude ? 6 : 3;
    map.setView([center.latitude, center.longitude], zoom);
  }, [center, map]);

  return null;
}

type GreenMapProps = {
  markers: MapMarkerType[];
  center?: Coordinates;
};

export default function GreenMap({ markers, center = CITY_COORDINATES.Bafoussam }: GreenMapProps) {
  return (
    <div className="h-[360px] overflow-hidden rounded-lg border border-slate-200">
      <MapContainer center={[center.latitude, center.longitude]} zoom={13} scrollWheelZoom className="h-full">
        <MapFocus center={center} />
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => <MapMarker key={`${marker.type}-${marker.id}`} marker={marker} />)}
      </MapContainer>
    </div>
  );
}
