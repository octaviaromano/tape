"use client";

import { useParams, useRouter } from "next/navigation";
import { useTape } from "@/lib/TapeContext";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";
import { TapeButton } from "@/components/TapeButton";
import { Card } from "@/components/Card";
import { TrackRow } from "@/components/TrackRow";

export default function TapeDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { tapes } = useTape();

  const tape = tapes.find((t) => t.id === id);

  if (!tape) {
    return (
      <PageContainer>
        <p className="text-sm opacity-70">Tape not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack gap="lg">
        <PageHeader
          title="Tape"
          subtitle={`${tape.tracks.length} track${tape.tracks.length === 1 ? "" : "s"}`}
        />

        <Stack gap="sm">
          {tape.tracks.length === 0 && (
            <Card className="text-sm opacity-70">No tracks added yet.</Card>
          )}

          {tape.tracks.map((track) => (
            <TrackRow
              key={track.id}
              url={track.url}
              title={track.title}
              artist={track.artist}
              platform={track.platform}
              artworkUrl={track.artworkUrl}
            />
          ))}
        </Stack>

        <TapeButton variant="secondary" onClick={() => router.push(`/tape/${tape.id}/edit`)}>
          Edit Tape
        </TapeButton>
      </Stack>
    </PageContainer>
  );
}