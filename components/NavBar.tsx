"use client";

import { usePathname, useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // Routes where nav should NOT appear
  const hiddenRoutes = ["/", "/login", "/verify-email", "/share"];

  const hideNav =
    hiddenRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.endsWith("/edit");

  if (hideNav) return null;

  function isActive(path: string) {
    return pathname === path || pathname.startsWith(`${path}/`);
  }

  return (
    <nav className="border-b border-[var(--tape-border)] bg-[var(--tape-surface)]">
      <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">

        <button
          onClick={() => router.push("/home")}
          className={`text-sm ${
            isActive("/home")
              ? "text-[var(--tape-text)]"
              : "text-[var(--tape-muted)]"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => router.push("/tapes")}
          className={`text-sm ${
            isActive("/tapes") || isActive("/tape")
              ? "text-[var(--tape-text)]"
              : "text-[var(--tape-muted)]"
          }`}
        >
          Tapes
        </button>

        <button
          onClick={() => router.push("/profile")}
          className={`text-sm ${
            isActive("/profile")
              ? "text-[var(--tape-text)]"
              : "text-[var(--tape-muted)]"
          }`}
        >
          Profile
        </button>

      </div>
    </nav>
  );
}
