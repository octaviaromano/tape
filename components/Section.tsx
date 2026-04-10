export function Section({
  title,
  subtitle,
  size = "md",
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <section className={`space-y-3 ${className}`}>
      {title && <h1 className={sizes[size]}>{title}</h1>}
      {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      {children}
    </section>
  );
}