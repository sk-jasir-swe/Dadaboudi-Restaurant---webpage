import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dada Boudi — Kolkata Restaurant",
  description: "A cinematic Dada Boudi restaurant experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
