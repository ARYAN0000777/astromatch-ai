import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AstroMatch AI — Vedic Kundali Compatibility",
  description: "AI-powered Kundali matching using ancient Vedic wisdom and modern artificial intelligence.",
  keywords: ["kundali matching", "astrology", "compatibility", "vedic astrology", "AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
