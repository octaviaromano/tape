import React from "react";

type TapeButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function TapeButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: TapeButtonProps) {
  const base =
    "w-full rounded-[var(--tape-radius)] border transition-colors duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tape-accent)] " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tape-bg)]";

  const sizes = {
    sm: "py-2 text-sm",
    md: "py-3 text-[15px]",
    lg: "py-4 text-[16px]",
  };

  const variants = {
    primary:
      "bg-[var(--tape-btn-bg)] text-[var(--tape-text)] border-[var(--tape-border)] " +
      "hover:bg-[var(--tape-btn-hover)] active:bg-[var(--tape-btn-press)]",

    secondary:
      "bg-transparent text-[var(--tape-muted)] border-[var(--tape-border)] " +
      "hover:bg-[var(--tape-btn-hover)] active:bg-[var(--tape-btn-press)]",

    ghost:
      "bg-transparent text-[var(--tape-muted)] border-transparent " +
      "hover:bg-[var(--tape-btn-hover)] active:bg-[var(--tape-btn-press)]",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-transparent active:bg-transparent"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}