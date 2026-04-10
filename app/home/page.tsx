"use client";

import { useRouter } from "next/navigation";
import { useTape } from "@/lib/TapeContext";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";
import { TapeButton } from "@/components/TapeButton";
import { Card } from "@/components/Card";
import { TapeCard } from "@/components/TapeCard";
import { EmptyState } from "@/components/EmptyState";

export default function HomePage() {
  const router = useRouter();
  const { tapes, createTape } = useTape();

  const recentTapes = [...tapes].slice(-2).reverse();

  function handleCreateTape() {
    const newTape = createTape();
    router.push(`/tape/${newTape.id}/edit`);
  }

  return (
    <PageContainer>
      <Stack gap="lg">
        <PageHeader
          title="Home"
          subtitle="Your music, shared intentionally."
        />

        <Stack gap="sm">
          <TapeButton onClick={handleCreateTape}>
            Create new Tape
          </TapeButton>

          <TapeButton
            variant="secondary"
            onClick={() => router.push("/tapes")}
          >
            View all Tapes
          </TapeButton>
        </Stack>

        <Stack gap="sm">
          {recentTapes.length === 0 ? (
            <EmptyState
              title="Nothing here yet"
              description="Create your first tape to start building your library."
              action={
                <TapeButton onClick={handleCreateTape}>
                  Create your first Tape
                </TapeButton>
              }
            />
          ) : (
            recentTapes.map((tape) => (
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

        <Card>
          <p className="text-sm text-[var(--tape-muted)]">
            Tape is for sharing music with people, not algorithms.
          </p>
        </Card>
      </Stack>
    </PageContainer>
  );
}