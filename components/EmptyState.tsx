import React from "react";
import { Card } from "@/components/Card";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="space-y-3 text-center py-8">
      <div className="space-y-1">
        <p className="text-sm font-medium text-[var(--tape-text)]">
          {title}
        </p>

        {description && (
          <p className="text-sm text-[var(--tape-muted)]">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </Card>
  );
}