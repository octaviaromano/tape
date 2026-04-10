"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTape } from "@/lib/TapeContext";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";
import { TapeButton } from "@/components/TapeButton";
import { Card } from "@/components/Card";

export default function SharePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tapes } = useTape();

  const tapeId = searchParams.get("id");
  const tape = tapeId ? tapes.find((t) => t.id === tapeId) : undefined;

  const shareUrl = useMemo(() => {
    if (!tape) return "";
    if (typeof window === "undefined") return `/tape/${tape.id}`;
    return `${window.location.origin}/tape/${tape.id}`;
  }, [tape]);

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
          title="Share Tape"
          subtitle={`${tape.tracks.length} track${tape.tracks.length === 1 ? "" : "s"} • ${tape.email ?? "no email saved"}`}
        />

        <Card className="text-sm break-all">{shareUrl}</Card>

        <Stack gap="sm">
          <TapeButton onClick={() => router.push('/tape-detail-page')}>
            View Tape
          </TapeButton>

          <TapeButton
            variant="secondary"
            onClick={() => navigator.clipboard?.writeText(shareUrl)}
          >
            Copy link
          </TapeButton>
        </Stack>
      </Stack>
    </PageContainer>
  );
}