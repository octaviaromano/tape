"use client";

import { useSearchParams } from "next/navigation";
import { useTape } from "@/lib/TapeContext";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";
import { TapeButton } from "@/components/TapeButton";
import { Card } from "@/components/Card";

export default function ProfilePage() {
  const { clearAll } = useTape();
  const searchParams = useSearchParams();

  // Only show dev reset when explicitly enabled: /profile?dev=1
  const showDevReset = searchParams.get("dev") === "1";

  return (
    <PageContainer>
      <Stack gap="lg">
        <PageHeader title="Your Profile" subtitle="Account details (placeholder)" />

        <Stack gap="md">
          <Card>
            <p className="text-sm opacity-70">Name</p>
            <p className="mt-1">User Name</p>
          </Card>

          <Card>
            <p className="text-sm opacity-70">Email</p>
            <p className="mt-1">user@email.com</p>
          </Card>
        </Stack>

        <Stack gap="sm">
          <TapeButton>Sign Out</TapeButton>

          {showDevReset && (
            <TapeButton
              variant="secondary"
              onClick={() => {
                const ok = confirm("Reset all local Tape data on this device?");
                if (ok) clearAll();
              }}
            >
              Reset local data (dev)
            </TapeButton>
          )}
        </Stack>
      </Stack>
    </PageContainer>
  );
}