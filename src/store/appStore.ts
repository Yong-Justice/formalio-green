import { create } from 'zustand';
import { DEFAULT_CITY, DEFAULT_REGION } from '../utils/constants';

type MapView = 'world' | 'cameroon' | 'bafoussam';

type AppState = {
  selectedCity: string;
  selectedRegion: string;
  selectedMapView: MapView;
  activeTab: string;
  setSelectedCity: (city: string) => void;
  setSelectedRegion: (region: string) => void;
  setSelectedMapView: (view: MapView) => void;
  setActiveTab: (tab: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedCity: DEFAULT_CITY,
  selectedRegion: DEFAULT_REGION,
  selectedMapView: 'bafoussam',
  activeTab: 'home',
  setSelectedCity: (selectedCity) => set({ selectedCity }),
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
  setSelectedMapView: (selectedMapView) => set({ selectedMapView }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
