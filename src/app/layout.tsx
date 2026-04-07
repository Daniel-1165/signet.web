import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SyncUser } from "@/components/auth/SyncUser";
import { CustomCursor } from "@/components/ui/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Signet | Build Your Life Right",
  description: "A minimalist community for personal growth, disciplined living, and mature mindset development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body
          className={`${syne.variable} ${outfit.variable} font-sans antialiased`}
        >
          <SyncUser />
          <CustomCursor />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
