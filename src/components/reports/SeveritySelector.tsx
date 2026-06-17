import { SEVERITY_LEVELS } from '../../utils/constants';

export default function SeveritySelector() {
  return <select className="w-full rounded-lg border border-slate-300 p-3">{SEVERITY_LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}</select>;
}
