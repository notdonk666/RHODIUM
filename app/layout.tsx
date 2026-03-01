import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GamificationProvider } from "@/components/GamificationContext";
import NavigationWrapper from "@/components/NavigationWrapper";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RHODIUM | Ascension Protocol",
  description: "The gamified habitat for high-performers. Turn your daily tasks into experience points, level up your discipline, and ascend the ranks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark selection:bg-amber-500/30 selection:text-amber-200">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}>
        <SessionProvider>
          <GamificationProvider>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
          </GamificationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
