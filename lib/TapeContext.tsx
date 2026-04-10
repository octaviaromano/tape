"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------------------ */

export type Track = {
  id: string;
  url: string;
  platform?: "spotify" | "apple" | "youtube" | "soundcloud" | "other";
  title?: string;
  artist?: string;
  artworkUrl?: string;
  loading?: boolean;
};

export type Tape = {
  id: string;
  name?: string;
  createdAt: string;
  tracks: Track[];
  email?: string;
  verified: boolean;
};

type TapeContextType = {
  tapes: Tape[];
  createTape: () => Tape;
  updateTape: (id: string, updates: Partial<Tape>) => void;
  clearAll: () => void;
};

/* ------------------------------------------------------------ */
/* STORAGE */
/* ------------------------------------------------------------ */

const STORAGE_KEY = "tape_app_v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------ */
/* CONTEXT */
/* ------------------------------------------------------------ */

const TapeContext = createContext<TapeContextType | undefined>(undefined);

/* ------------------------------------------------------------ */
/* PROVIDER */
/* ------------------------------------------------------------ */

export function TapeProvider({ children }: { children: React.ReactNode }) {
  const [tapes, setTapes] = useState<Tape[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* Hydrate from localStorage */
  useEffect(() => {
    const stored = safeParse<{ tapes: Tape[] }>(
      window.localStorage.getItem(STORAGE_KEY)
    );

    if (stored?.tapes && Array.isArray(stored.tapes)) {
      setTapes(stored.tapes);
    }

    setHydrated(true);
  }, []);

  /* Persist changes */
  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tapes })
    );
  }, [tapes, hydrated]);

  /* ------------------------------------------------------------ */
  /* ACTIONS */
  /* ------------------------------------------------------------ */

  function createTape(): Tape {
    const newTape: Tape = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      tracks: [],
      verified: false,
    };

    setTapes((prev) => [...prev, newTape]);
    return newTape;
  }

  function updateTape(id: string, updates: Partial<Tape>) {
    setTapes((prev) =>
      prev.map((tape) =>
        tape.id === id ? { ...tape, ...updates } : tape
      )
    );
  }

  function clearAll() {
    setTapes([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  /* ------------------------------------------------------------ */
  /* CONTEXT VALUE */
  /* ------------------------------------------------------------ */

  const value = useMemo(
    () => ({
      tapes,
      createTape,
      updateTape,
      clearAll,
    }),
    [tapes]
  );

  return (
    <TapeContext.Provider value={value}>
      {children}
    </TapeContext.Provider>
  );
}

/* ------------------------------------------------------------ */
/* HOOK */
/* ------------------------------------------------------------ */

export function useTape() {
  const context = useContext(TapeContext);

  if (!context) {
    throw new Error("useTape must be used inside TapeProvider");
  }

  return context;
}