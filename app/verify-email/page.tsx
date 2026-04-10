"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTape } from "@/lib/TapeContext";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";
import { TapeInput } from "@/components/TapeInput";
import { TapeButton } from "@/components/TapeButton";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateTape, tapes } = useTape();

  const tapeId = searchParams.get("id");
  const tape = tapeId ? tapes.find((t) => t.id === tapeId) : undefined;

  const [email, setEmail] = useState("");
  const canContinue = Boolean(tapeId) && email.trim().length > 0;

  function handleContinue() {
    if (!canContinue || !tapeId) return;

    updateTape(tapeId, { email: email.trim(), verified: true });
    router.push(`/share?id=${tapeId}`);
  }

  return (
    <PageContainer>
      <Stack gap="lg">
        <PageHeader
          title="Enter your email"
          subtitle={
            tape
              ? `You’re creating a tape with ${tape.tracks.length} track${tape.tracks.length === 1 ? "" : "s"}.`
              : "Missing tape id. Go back and create a tape first."
          }
        />

        <Stack gap="md">
          <TapeInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TapeButton onClick={handleContinue} disabled={!canContinue}>
            Continue
          </TapeButton>
        </Stack>
      </Stack>
    </PageContainer>
  );
}