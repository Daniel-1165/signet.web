import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SyncUser } from "@/components/auth/SyncUser";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

// Static mock font variables to prevent build-time Google Fonts downloads (loaded via globals.css)
const montserrat = { variable: "font-sans" };
const jetbrainsMono = { variable: "font-mono" };
const playfair = { variable: "font-serif" };

export const metadata: Metadata = {
  title: "SIGNET | Silent Growth Network",
  description: "A global network of trailblazers who model and replicate excellence in diverse spheres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={`${montserrat.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans antialiased bg-white w-full overflow-x-hidden relative`}>
          <SyncUser />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
