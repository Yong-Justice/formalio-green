import type { Coordinates } from '../types/map';

export const CITY_COORDINATES: Record<string, Coordinates> = {
  Cameroon: { latitude: 7.3697, longitude: 12.3547 },
  Bafoussam: { latitude: 5.4778, longitude: 10.4176 },
  Douala: { latitude: 4.0511, longitude: 9.7679 },
  Yaounde: { latitude: 3.848, longitude: 11.5021 },
  Dschang: { latitude: 5.4456, longitude: 10.0677 },
  Buea: { latitude: 4.1534, longitude: 9.2423 },
  Bamenda: { latitude: 5.9631, longitude: 10.1591 },
  Maroua: { latitude: 10.591, longitude: 14.3159 },
  Ngaoundere: { latitude: 7.3277, longitude: 13.5847 },
};

export const BAFOUSSAM_ZONES: Record<string, Coordinates> = {
  'Marche A': { latitude: 5.4812, longitude: 10.4185 },
  Banengo: { latitude: 5.4921, longitude: 10.4098 },
  Tamdja: { latitude: 5.4694, longitude: 10.4248 },
  'Tyo-Ville': { latitude: 5.475, longitude: 10.4284 },
  Djeleng: { latitude: 5.4855, longitude: 10.4302 },
  Eveche: { latitude: 5.4745, longitude: 10.4101 },
  'Mifi River Area': { latitude: 5.4639, longitude: 10.4049 },
};
