import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SyncUser } from "@/components/auth/SyncUser";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

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
