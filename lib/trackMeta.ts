export type TrackMeta = {
  platform: "spotify" | "apple" | "youtube" | "soundcloud" | "other";
  title?: string;
  artist?: string;
  artworkUrl?: string;
};

export function detectPlatform(url: string): TrackMeta["platform"] {
  const u = url.toLowerCase();
  if (u.includes("spotify.com")) return "spotify";
  if (u.includes("music.apple.com") || u.includes("itunes.apple.com")) return "apple";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("soundcloud.com")) return "soundcloud";
  return "other";
}

function stripSuffix(s: string) {
  return s.replace(/\s*-\s*(Spotify|YouTube|SoundCloud)\s*$/i, "").trim();
}

function splitArtistTitle(text: string): { artist?: string; title?: string } {
  const cleaned = stripSuffix(text);
  const parts = cleaned.split(" - ").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return { artist: parts[0], title: parts.slice(1).join(" - ") };
  }
  return { title: cleaned };
}

export async function fetchTrackMeta(url: string): Promise<TrackMeta> {
  const platform = detectPlatform(url);

  // Apple Music: no-key metadata is non-trivial; fallback for now
  if (platform === "apple" || platform === "other") return { platform };

  const endpoint =
    platform === "spotify"
      ? `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`
      : platform === "youtube"
      ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`
      : `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) return { platform };

    const data: any = await res.json();

    const oembedTitle: string | undefined = data?.title;
    const authorName: string | undefined = data?.author_name;
    const thumbnail: string | undefined = data?.thumbnail_url;

    if (platform === "spotify") {
      const { artist, title } = oembedTitle ? splitArtistTitle(oembedTitle) : {};
      return {
        platform,
        title,
        artist: artist ?? authorName,
        artworkUrl: thumbnail,
      };
    }

    if (platform === "youtube") {
      return { platform, title: oembedTitle, artist: authorName, artworkUrl: thumbnail };
    }

    if (platform === "soundcloud") {
      const { artist, title } = oembedTitle ? splitArtistTitle(oembedTitle) : {};
      return { platform, title, artist: artist ?? authorName, artworkUrl: thumbnail };
    }

    return { platform };
  } catch {
    return { platform };
  }
}