import React from "react";

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-[22px] font-serif text-[var(--tape-text)]">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm text-[var(--tape-muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}