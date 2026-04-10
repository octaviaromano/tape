"use client";

import { useRouter } from "next/navigation";
import { useTape } from "@/lib/TapeContext";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";
import { TapeCard } from "@/components/TapeCard";
import { EmptyState } from "@/components/EmptyState";
import { TapeButton } from "@/components/TapeButton";

export default function TapesPage() {
  const router = useRouter();
  const { tapes, createTape } = useTape();

  const sorted = [...tapes].reverse();

  function handleCreateTape() {
    const newTape = createTape();
    router.push(`/tape/${newTape.id}/edit`);
  }

  return (
    <PageContainer>
      <Stack gap="lg">
        <PageHeader title="Tapes" subtitle={`${tapes.length} tape${tapes.length === 1 ? "" : "s"}`} />

        <Stack gap="sm">
          {sorted.length === 0 ? (
            <EmptyState
              title="No tapes yet"
              description="Create your first tape to get started."
              action={<TapeButton onClick={handleCreateTape}>Create a Tape</TapeButton>}
            />
          ) : (
            sorted.map((tape) => (
              <TapeCard
                key={tape.id}
                trackCount={tape.tracks.length}
                createdAt={tape.createdAt}
                tracks={tape.tracks}
                onClick={() => router.push('/tape-detail-page')}
              />
            ))
          )}
        </Stack>
      </Stack>
    </PageContainer>
  );
}
