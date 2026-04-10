import React from "react";

export function Card({
  children,
  className = "",
  as: As = "div",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
}) {
  return (
    <As
      onClick={onClick}
      className={[
        "border border-[var(--tape-border)] bg-[var(--tape-surface)]",
        "rounded-[var(--tape-radius)] p-4",
        className,
      ].join(" ")}
    >
      {children}
    </As>
  );
}