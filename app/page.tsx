'use client';

import { useRouter } from 'next/navigation';
import { useTape } from '@/lib/TapeContext';

function CassetteIcon() {
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="54" height="38" rx="5" stroke="#ABABAB" strokeWidth="1.5" />
      <circle cx="16" cy="18" r="7.5" stroke="#ABABAB" strokeWidth="1.5" />
      <circle cx="40" cy="18" r="7.5" stroke="#ABABAB" strokeWidth="1.5" />
      <circle cx="16" cy="18" r="2.5" fill="#ABABAB" />
      <circle cx="40" cy="18" r="2.5" fill="#ABABAB" />
      <rect x="21" y="30" width="14" height="5" rx="1.5" stroke="#ABABAB" strokeWidth="1.5" />
    </svg>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { createTape } = useTape();

  function handleCreate() {
    const newTape = createTape();
    router.push(`/tape/${newTape.id}/edit`);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '20px 24px', backgroundColor: '#F2F0EB' }}>
      <p style={{ fontSize: 13, color: '#ABABAB' }}>Tape</p>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 340 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <CassetteIcon />
          </div>

          <h1 style={{
            fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", serif',
            fontSize: 40,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: 12,
            color: '#1a1a1a',
          }}>
            Tape
          </h1>

          <p style={{ fontSize: 14, color: '#ABABAB', marginBottom: 52 }}>
            Music, shared by people.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button
              onClick={handleCreate}
              style={{
                width: '100%',
                padding: '13px',
                border: '1px solid #D6D2CD',
                borderRadius: 10,
                background: '#ffffff',
                fontSize: 15,
                color: '#1a1a1a',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Create your first Tape
            </button>
            <button
              onClick={() => router.push('/login')}
              style={{
                width: '100%',
                padding: '13px',
                border: 'none',
                background: 'none',
                fontSize: 14,
                color: '#ABABAB',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
