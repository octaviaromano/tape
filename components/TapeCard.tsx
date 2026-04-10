import React from "react";
import { Card } from "@/components/Card";

type Track = {
  id: string;
  artworkUrl?: string;
};

export function TapeCard({
  trackCount,
  createdAt,
  tracks,
  onClick,
}: {
  trackCount: number;
  createdAt: string;
  tracks: Track[];
  onClick?: () => void;
}) {
  const artworkTracks = tracks.filter((t) => t.artworkUrl).slice(0, 4);

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      className="cursor-pointer space-y-4"
      onClick={onClick}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-[var(--tape-text)]">
          Tape
        </p>

        <p className="text-xs text-[var(--tape-muted)]">
          {trackCount} track{trackCount === 1 ? "" : "s"} • {formattedDate}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {artworkTracks.length > 0 ? (
          artworkTracks.map((track) => (
            <div
              key={track.id}
              className="aspect-square overflow-hidden rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-surface)]"
            >
              <img
                src={track.artworkUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))
        ) : (
          <>
            <div className="aspect-square rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-surface)]" />
            <div className="aspect-square rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-surface)]" />
            <div className="aspect-square rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-surface)]" />
            <div className="aspect-square rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-surface)]" />
          </>
        )}
      </div>
    </Card>
  );
}