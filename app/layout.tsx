import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "The Nourished Garden & Farm", template: "%s | The Nourished Garden & Farm" },
  description: "Online holistic health coaching that helps individuals and families build healthier habits, calmer routines, and brighter tomorrows.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Nourished Garden", statusBarStyle: "default" },
  icons: { icon: "/icons/garden.svg", apple: "/icons/garden-192.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body><SiteHeader />{children}<footer><p><strong>The Nourished Garden &amp; Farm</strong> · Nourishing the body from the soil to the soul.</p><p className="fine-print">Educational health coaching only. This website does not provide medical advice, diagnosis, or treatment. Individual results vary.</p></footer></body>
      </html>
    </ClerkProvider>
  );
}
