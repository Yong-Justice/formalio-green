import { ISSUE_TYPES } from '../../utils/constants';

export default function IssueTypeSelector() {
  return <select className="w-full rounded-lg border border-slate-300 p-3">{ISSUE_TYPES.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}</select>;
}
