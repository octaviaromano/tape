export function Stack({
  children,
  gap = "md",
  className = "",
}: {
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
  className?: string;
}) {
  const gaps = {
    sm: "space-y-3",
    md: "space-y-6",
    lg: "space-y-10",
  };

  return <div className={`${gaps[gap]} ${className}`}>{children}</div>;
}