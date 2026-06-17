import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import type { MapMarker } from '../../types/map';
import { statusLabel } from '../../utils/statusLabels';

type MarkerPopupProps = {
  marker: MapMarker;
};

export default function MarkerPopup({ marker }: MarkerPopupProps) {
  return (
    <Popup>
      <div className="min-w-48 space-y-2">
        <p className="font-semibold">{marker.title}</p>
        <p className="text-xs">{marker.description}</p>
        <div className="flex flex-wrap gap-1 text-[11px]">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{statusLabel(marker.status)}</span>
          {marker.severity ? <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700">{marker.severity}</span> : null}
        </div>
        {marker.volunteersNeeded ? (
          <p className="text-xs text-slate-600">{marker.volunteersJoined}/{marker.volunteersNeeded} volunteers • {marker.ecoPointsReward} pts</p>
        ) : null}
        {marker.missionId ? (
          <Link className="block rounded-md bg-primary px-3 py-2 text-center text-xs font-bold text-white" to={`/missions/${marker.missionId}`}>
            Open mission
          </Link>
        ) : (
          <Link className="block rounded-md bg-mission px-3 py-2 text-center text-xs font-bold text-white" to="/missions">
            Find mission
          </Link>
        )}
      </div>
    </Popup>
  );
}
