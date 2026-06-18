import { ISSUE_TYPES } from '../../utils/constants';
import { issueTypeLabel } from '../../utils/issueLabels';

export default function IssueTypeSelector() {
  return <select className="w-full rounded-lg border border-slate-300 p-3">{ISSUE_TYPES.map((type) => <option key={type} value={type}>{issueTypeLabel(type)}</option>)}</select>;
}
