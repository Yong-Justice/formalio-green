import { useEffect, useState } from 'react';
import type { Coordinates } from '../types/map';

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(
    typeof navigator !== 'undefined' && !navigator.geolocation ? 'Geolocation is not supported by this browser.' : null,
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      () => setError('Unable to read current location.'),
    );
  }, []);

  return { coordinates, error };
}
