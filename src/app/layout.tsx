import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlgoAnimation — See the Algorithm, Understand the Solution",
  description:
    "Educational platform that brings LeetCode problems to life through step-by-step animated visualizations.",
  keywords: [
    "algorithms",
    "data structures",
    "leetcode",
    "visualization",
    "animation",
    "education",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
