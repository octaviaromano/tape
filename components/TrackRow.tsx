import React from "react";
import { ListRow } from "@/components/ListRow";

function platformName(p?: string) {
  if (p === "spotify") return "Spotify";
  if (p === "apple") return "Apple Music";
  if (p === "youtube") return "YouTube";
  if (p === "soundcloud") return "SoundCloud";
  return "Link";
}

function platformGlyph(p?: string) {
  if (p === "spotify") return "♪";
  if (p === "apple") return "";
  if (p === "youtube") return "▶";
  if (p === "soundcloud") return "☁";
  return "↗";
}

function cleanDomain(url: string) {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch {
    return url;
  }
}

export function TrackRow({
  url,
  title,
  artist,
  platform,
  artworkUrl,
  onRemove,
  loading = false,
}: {
  url: string;
  title?: string;
  artist?: string;
  platform?: string;
  artworkUrl?: string;
  onRemove?: () => void;
  loading?: boolean;
}) {
  // Loading skeleton (while metadata is fetching)
  if (loading) {
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

  const primary = title
    ? artist
      ? `${artist} — ${title}`
      : title
    : platformName(platform);

  const secondary = title ? platformName(platform) : cleanDomain(url);

  return (
    <ListRow className="flex items-center justify-between gap-3">
      <div className="min-w-0 flex-1 flex items-center gap-3">
        {artworkUrl ? (
          <img
            src={artworkUrl}
            alt=""
            className="h-10 w-10 rounded-[10px] border border-[var(--tape-border)] object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-[10px] border border-[var(--tape-border)] bg-[var(--tape-surface)] flex items-center justify-center">
            <span className="text-sm opacity-70">{platformGlyph(platform)}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm text-[var(--tape-text)] truncate">{primary}</p>
          <p className="text-xs text-[var(--tape-muted)] truncate">{secondary}</p>
        </div>
      </div>

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-xs opacity-60 hover:opacity-100"
          aria-label="Remove track"
          title="Remove"
        >
          ✕
        </button>
      )}
    </ListRow>
  );
}