export default function StatusBar() {
  return (
    <div className="flex h-7 shrink-0 items-center justify-between bg-white px-5 text-[11px] font-bold text-ink">
      <span>9:41</span>
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="flex items-end gap-0.5">
          <span className="h-1.5 w-1 rounded-full bg-ink" />
          <span className="h-2 w-1 rounded-full bg-ink" />
          <span className="h-2.5 w-1 rounded-full bg-ink" />
          <span className="h-3 w-1 rounded-full bg-ink" />
        </span>
        <span className="relative h-3 w-4 overflow-hidden">
          <span className="absolute left-0 top-2 h-5 w-5 rounded-full border-[2px] border-ink" />
          <span className="absolute left-[4px] top-[5px] h-3 w-3 rounded-full border-[2px] border-ink" />
        </span>
        <span className="h-3 w-6 rounded-[4px] border-2 border-ink p-0.5">
          <span className="block h-full w-4 rounded-[2px] bg-ink" />
        </span>
      </span>
    </div>
  );
}
