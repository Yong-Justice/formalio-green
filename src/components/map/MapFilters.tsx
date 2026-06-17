import Button from '../common/Button';

type MapFiltersProps = {
  onFocusWorld: () => void;
  onFocusCameroon: () => void;
  onFocusBafoussam: () => void;
};

export default function MapFilters({ onFocusWorld, onFocusCameroon, onFocusBafoussam }: MapFiltersProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button type="button" variant="secondary" onClick={onFocusWorld}>World</Button>
      <Button type="button" variant="secondary" onClick={onFocusCameroon}>Cameroon</Button>
      <Button type="button" variant="secondary" onClick={onFocusBafoussam}>Bafoussam</Button>
    </div>
  );
}
