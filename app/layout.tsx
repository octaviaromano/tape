import type { Metadata } from "next";
import "./globals.css";
import { TapeProvider } from "@/lib/TapeContext";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Tape",
  description: "Share music thoughtfully.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TapeProvider>
          <NavBar />
          {children}
        </TapeProvider>
      </body>
    </html>
  );
}
