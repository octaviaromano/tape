"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TrackRow } from "@/components/TrackRow";
import { useTape, Track } from "@/lib/TapeContext";
import { fetchTrackMeta } from "@/lib/trackMeta";

const DEMO_SEEDS = [
  { title: 'A Plea', artist: 'Flea', itunesId: '1852302991', country: 'ar' },
  { title: 'Halo Lunar', artist: 'Luis Alberto Spinetta', itunesId: '' },
  { title: 'Water No Get Enemy', artist: 'Fela Kuti', itunesId: '' },
  { title: 'Diosa', artist: 'Kali Uchis', itunesId: '' },
  { title: 'Know', artist: 'Nick Drake', itunesId: '' },
];

export default function EditTape() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { tapes, updateTape } = useTape();

  const tape = tapes.find((t) => t.id === id);

  const [name, setName] = useState(tape?.name ?? "");
  const [input, setInput] = useState("");
  const [tracks, setTracks] = useState<Track[]>(tape?.tracks ?? []);

  // Pre-populate with demo tracks when tape is new/empty
  useEffect(() => {
    if (!tape || tape.tracks.length > 0) return;

    async function loadDemo() {
      const results = await Promise.all(
        DEMO_SEEDS.map(async (seed) => {
          const country = 'country' in seed && seed.country ? `&country=${seed.country}` : '';
          const url = seed.itunesId
            ? `https://itunes.apple.com/lookup?id=${seed.itunesId}${country}`
            : `https://itunes.apple.com/search?term=${encodeURIComponent(`${seed.title} ${seed.artist}`)}&entity=song&limit=1`;
          try {
            const res = await fetch(url);
            const data = await res.json();
            const result = data.results?.[0];
            return {
              id: crypto.randomUUID(),
              url: result?.trackViewUrl ?? '#',
              platform: 'apple' as const,
              title: seed.title,
              artist: seed.artist,
              artworkUrl: result?.artworkUrl100?.replace('100x100bb', '400x400bb') as string | undefined,
            };
          } catch {
            return {
              id: crypto.randomUUID(),
              url: '#',
              platform: 'apple' as const,
              title: seed.title,
              artist: seed.artist,
            };
          }
        })
      );
      setTracks(results);
    }

    loadDemo();
  }, [tape?.id]);

  if (!tape) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 13, color: '#ABABAB' }}>Tape not found.</p>
      </main>
    );
  }

  async function handleAddTrack() {
    if (!input.trim()) return;
    const url = input.trim();
    setInput("");
    const tempId = crypto.randomUUID();

    const skeletonTimer = setTimeout(() => {
      setTracks((prev) => [...prev, { id: tempId, url, loading: true }]);
    }, 150);

    const meta = await fetchTrackMeta(url);
    clearTimeout(skeletonTimer);

    setTracks((prev) => {
      const exists = prev.some((t) => t.id === tempId);
      if (exists) {
        return prev.map((t) =>
          t.id === tempId
            ? { ...t, loading: false, platform: meta.platform, title: meta.title, artist: meta.artist, artworkUrl: meta.artworkUrl }
            : t
        );
      }
      return [...prev, { id: tempId, url, platform: meta.platform, title: meta.title, artist: meta.artist, artworkUrl: meta.artworkUrl }];
    });
  }

  function handleRemoveTrack(trackId: string) {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  }

  function handleSave() {
    const cleaned: Track[] = tracks.map(({ loading, ...rest }) => rest);
    updateTape(id, { name: name.trim() || undefined, tracks: cleaned });
    router.push(`/verify-email?id=${id}`);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F2F0EB', display: 'flex', flexDirection: 'column', padding: '20px 24px 48px' }}>
      <p style={{ fontSize: 13, color: '#ABABAB', marginBottom: 48 }}>Tape</p>

      <div style={{ maxWidth: 400, width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Heading */}
        <h1 style={{
          fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", serif',
          fontSize: 32,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          marginBottom: 40,
          color: '#1a1a1a',
        }}>
          Add tracks
        </h1>

        {/* Tape name */}
        <input
          placeholder="Tape name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #D6D2CD',
            borderRadius: 10,
            background: '#ffffff',
            fontSize: 15,
            color: '#1a1a1a',
            fontFamily: 'inherit',
            outline: 'none',
            marginBottom: 24,
          }}
        />

        {/* Track input */}
        <input
          placeholder="Paste a streaming link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTrack()}
          style={{
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #D6D2CD',
            borderRadius: 10,
            background: '#ffffff',
            fontSize: 15,
            color: '#1a1a1a',
            fontFamily: 'inherit',
            outline: 'none',
            marginBottom: 8,
          }}
        />

        <button
          onClick={handleAddTrack}
          disabled={!input.trim()}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 14,
            color: input.trim() ? '#1a1a1a' : '#ABABAB',
            cursor: input.trim() ? 'pointer' : 'default',
            padding: '8px 0',
            fontFamily: 'inherit',
            textAlign: 'center',
            marginBottom: 6,
          }}
        >
          Add track
        </button>

        <p style={{ fontSize: 12, color: '#ABABAB', textAlign: 'center', marginBottom: 36 }}>
          From Spotify, Apple Music, YouTube, or anywhere
        </p>

        {/* Track count */}
        {tracks.length > 0 && (
          <p style={{ fontSize: 11, color: '#ABABAB', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </p>
        )}

        {/* Track list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {tracks.map((track) => (
            <TrackRow
              key={track.id}
              url={track.url}
              title={track.title}
              artist={track.artist}
              platform={track.platform}
              artworkUrl={track.artworkUrl}
              loading={track.loading}
              onRemove={() => handleRemoveTrack(track.id)}
            />
          ))}
        </div>

        {/* Save */}
        {tracks.length > 0 && (
          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '14px',
              background: 'none',
              border: 'none',
              fontSize: 15,
              color: '#1a1a1a',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'center',
              marginTop: 32,
            }}
          >
            Save tracks
          </button>
        )}
      </div>
    </div>
  );
}
