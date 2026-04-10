import React from "react";

export function ListRow({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "border border-[var(--tape-border)] bg-[var(--tape-surface)]",
        "rounded-[var(--tape-radius)] p-4",
        "transition-colors active:scale-[0.99]",
        "hover:bg-[var(--tape-btn-hover)]",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}