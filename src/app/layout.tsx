import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SyncUser } from "@/components/auth/SyncUser";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

// Fonts are loaded via @import in globals.css rather than next/font, because
// build-time Google Fonts downloads fail in this environment. Faces: Fraunces
// (display), Inter (body), JetBrains Mono (eyebrows/data).

export const metadata: Metadata = {
  title: "SIGNET | Silent Growth Network",
  description: "A global network of trailblazers who model and replicate excellence in diverse spheres.",
  // Tints the mobile browser chrome to match the page rather than leaving it
  // default grey.
  themeColor: "#FBFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="font-sans antialiased bg-canvas text-ink w-full overflow-x-hidden relative">
          <SyncUser />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
