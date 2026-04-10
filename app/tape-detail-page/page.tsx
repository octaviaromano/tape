'use client';

import { useState, useRef, useEffect } from 'react';

function PlayIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <polygon points="3,1 15,8 3,15" />
    </svg>
  );
}

function PauseIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <rect x="2" y="1" width="4.5" height="14" rx="1" />
      <rect x="9.5" y="1" width="4.5" height="14" rx="1" />
    </svg>
  );
}

interface Track {
  id: number;
  title: string;
  artist: string;
  artUrl: string;
  previewUrl: string | null;
  duration: number;
  externalUrl: string;
}

const TRACK_SEEDS = [
  { title: 'A Plea', artist: 'Flea', album: '', itunesId: '1852302991', country: 'ar' },
  { title: 'Halo Lunar', artist: 'Luis Alberto Spinetta', album: '', itunesId: '' },
  { title: 'Water No Get Enemy', artist: 'Fela Kuti', album: '', itunesId: '' },
  { title: 'Diosa', artist: 'Kali Uchis', album: '', itunesId: '' },
  { title: 'Know', artist: 'Nick Drake', album: '', itunesId: '' },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}


export default function TapePage() {
  const [view, setView] = useState<'list' | 'gallery'>('list');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({});
  const [currentTime, setCurrentTime] = useState<Record<number, number>>({});
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchTracks() {
      const results = await Promise.all(
        TRACK_SEEDS.map(async (seed, i) => {
          try {
            const country = 'country' in seed && seed.country ? `&country=${seed.country}` : '';
            const url = seed.itunesId
              ? `https://itunes.apple.com/lookup?id=${seed.itunesId}${country}`
              : `https://itunes.apple.com/search?term=${encodeURIComponent([seed.title, seed.artist, seed.album].filter(Boolean).join(' '))}&entity=song&limit=1${country}`;
            const res = await fetch(url);
            const data = await res.json();
            const result = data.results?.[0];
            return {
              id: i + 1,
              title: seed.title,
              artist: seed.artist,
              artUrl: result?.artworkUrl100?.replace('100x100bb', '400x400bb') ?? '',
              previewUrl: result?.previewUrl ?? null,
              duration: result?.trackTimeMillis ? Math.floor(result.trackTimeMillis / 1000) : 372,
              externalUrl: result?.trackViewUrl ?? '#',
            };
          } catch {
            return {
              id: i + 1,
              title: seed.title,
              artist: seed.artist,
              artUrl: '',
              previewUrl: null,
              duration: 372,
              externalUrl: '#',
            };
          }
        })
      );
      setTracks(results);
      setLoading(false);
    }
    fetchTracks();
  }, []);

  function handlePlay(track: Track) {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
    }

    if (!track.previewUrl) return;

    const audio = new Audio(track.previewUrl);
    audioRef.current = audio;
    audio.play();
    setPlayingId(track.id);

    audio.ontimeupdate = () => {
      setProgress(p => ({ ...p, [track.id]: audio.currentTime / audio.duration }));
      setCurrentTime(t => ({ ...t, [track.id]: audio.currentTime }));
    };
    audio.onended = () => {
      setPlayingId(null);
      setProgress(p => ({ ...p, [track.id]: 0 }));
      setCurrentTime(t => ({ ...t, [track.id]: 0 }));
    };
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', padding: '48px 24px 80px', minHeight: '100vh' }}>

      {/* Logo */}
      <p style={{ fontSize: 13, color: '#ABABAB', marginBottom: 48 }}>Tape</p>

      {/* Tape title */}
      <h1 style={{
        fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", serif',
        fontSize: 32,
        fontWeight: 400,
        lineHeight: 1.15,
        marginBottom: 8,
      }}>
        Sunday Morning Drive
      </h1>
      <p style={{ fontSize: 13, color: '#ABABAB', marginBottom: 36 }}>
        Shared with close friends · January 2026
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 32, borderBottom: '1px solid #E2DED8' }}>
        {(['list', 'gallery'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: view === tab ? '1.5px solid #1a1a1a' : '1.5px solid transparent',
              marginBottom: -1,
              padding: '6px 0',
              fontSize: 14,
              cursor: 'pointer',
              color: view === tab ? '#1a1a1a' : '#ABABAB',
              fontFamily: 'inherit',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ color: '#ABABAB', fontSize: 13, textAlign: 'center', paddingTop: 48 }}>
          Loading tracks...
        </div>
      )}

      {/* List View */}
      {!loading && view === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {tracks.map(track => (
            <div key={track.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>{track.title}</p>
                  <p style={{ fontSize: 13, color: '#ABABAB' }}>{track.artist}</p>
                </div>
                <a
                  href={track.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ABABAB', fontSize: 15, textDecoration: 'none', paddingTop: 2 }}
                >
                  ↗
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Album art */}
                {track.artUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={track.artUrl}
                    alt={`${track.title} by ${track.artist}`}
                    style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 3, flexShrink: 0 }}
                  />
                ) : (
                  <div style={{ width: 88, height: 88, backgroundColor: '#E2DED8', borderRadius: 3, flexShrink: 0 }} />
                )}

                {/* Player */}
                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => handlePlay(track)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: track.previewUrl ? 'pointer' : 'default',
                      padding: 0,
                      lineHeight: 0,
                      marginBottom: 14,
                      color: '#1a1a1a',
                      opacity: track.previewUrl ? 1 : 0.3,
                    }}
                    aria-label={playingId === track.id ? 'Pause' : 'Play'}
                  >
                    {playingId === track.id ? <PauseIcon size={16} color="#1a1a1a" /> : <PlayIcon size={16} color="#1a1a1a" />}
                  </button>

                  {/* Progress bar */}
                  <div style={{ position: 'relative', height: 1, backgroundColor: '#E2DED8', marginBottom: 6 }}>
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      height: '100%',
                      backgroundColor: '#1a1a1a',
                      width: `${(progress[track.id] ?? 0) * 100}%`,
                      transition: 'width 0.25s linear',
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: '#ABABAB' }}>
                      {formatTime(currentTime[track.id] ?? 0)}
                    </span>
                    <span style={{ fontSize: 11, color: '#ABABAB' }}>
                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery View */}
      {!loading && view === 'gallery' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 16px' }}>
          {tracks.map(track => (
            <div key={track.id}>
              <div
                style={{ position: 'relative', cursor: track.previewUrl ? 'pointer' : 'default', marginBottom: 10 }}
                onMouseEnter={() => setHoveredId(track.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handlePlay(track)}
              >
                {track.artUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={track.artUrl}
                    alt={`${track.title} by ${track.artist}`}
                    style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 3, display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '1 / 1', backgroundColor: '#E2DED8', borderRadius: 3 }} />
                )}
                {(hoveredId === track.id || playingId === track.id) && track.previewUrl && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 3,
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {playingId === track.id ? <PauseIcon size={28} color="#fff" /> : <PlayIcon size={28} color="#fff" />}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{track.title}</p>
                  <p style={{ fontSize: 12, color: '#ABABAB' }}>{track.artist}</p>
                </div>
                <a
                  href={track.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ABABAB', fontSize: 13, textDecoration: 'none', paddingTop: 1 }}
                >↗</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
