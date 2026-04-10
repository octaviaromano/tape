import { ListRow } from "@/components/ListRow";

export function TrackRowSkeleton() {
  return (
    <ListRow className="flex items-center gap-3 animate-pulse">
      <div className="h-10 w-10 rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-border)] opacity-40" />

      <div className="flex-1 space-y-1">
        <div className="h-3 w-2/3 bg-[var(--tape-border)] rounded opacity-40" />
        <div className="h-2 w-1/3 bg-[var(--tape-border)] rounded opacity-30" />
      </div>
    </ListRow>
  );
}