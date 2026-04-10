import React from "react";

type TapeInputProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

export function TapeInput({
  value,
  onChange,
  placeholder,
  type = "text",
  size = "md",
  disabled = false,
  className = "",
}: TapeInputProps) {
  const base =
    "w-full border border-[var(--tape-border)] rounded-[var(--tape-radius)] bg-[var(--tape-surface)] text-[var(--tape-text)] placeholder:text-[color-mix(in_oklab,var(--tape-muted)_75%,transparent)] transition-shadow";

  const sizes = {
    sm: "py-2 px-3 text-sm",
    md: "py-2.5 px-3 text-[15px]",
    lg: "py-3 px-4 text-[16px]",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${disabledStyles} ${className}`}
    />
  );
}