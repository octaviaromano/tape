"use client";

import { useParams } from "next/navigation";
import { PageContainer } from "@/components/PageContainer";
import { Stack } from "@/components/Stack";
import { PageHeader } from "@/components/PageHeader";

export default function GroupDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer>
      <Stack gap="lg">
        <PageHeader title={`Group ${id}`} subtitle="Members and shared tapes" />
      </Stack>
    </PageContainer>
  );
}
