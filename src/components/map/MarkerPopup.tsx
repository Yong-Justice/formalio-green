import { Popup } from 'react-leaflet';
import type { MapMarker } from '../../types/map';
import { statusLabel } from '../../utils/statusLabels';

type MarkerPopupProps = {
  marker: MapMarker;
};

export default function MarkerPopup({ marker }: MarkerPopupProps) {
  return (
    <Popup>
      <div className="space-y-1">
        <p className="font-semibold">{marker.title}</p>
        <p className="text-xs">{marker.description}</p>
        <p className="text-xs text-slate-500">{statusLabel(marker.status)}</p>
      </div>
    </Popup>
  );
}
