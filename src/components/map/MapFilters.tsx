import Button from '../common/Button';

type MapFiltersProps = {
  onFocusCameroon: () => void;
  onFocusBafoussam: () => void;
};

export default function MapFilters({ onFocusCameroon, onFocusBafoussam }: MapFiltersProps) {
  return (
    <div className="flex gap-2">
      <Button type="button" variant="secondary" onClick={onFocusCameroon}>Cameroon</Button>
      <Button type="button" variant="secondary" onClick={onFocusBafoussam}>Bafoussam</Button>
    </div>
  );
}
