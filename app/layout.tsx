import type { Metadata, Viewport } from "next";
import { Lora, Geist_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Nourished Garden & Farm | Affordable Health Coaching",
  description:
    "Affordable health coaching for women, men, kids, and families. Support for ADHD, ADD, Autism, meal planning, routines, and family wellness.",
  keywords: [
    "health coaching",
    "affordable health coach",
    "family wellness",
    "ADHD support",
    "autism support",
    "meal planning",
    "healthy routines",
    "kids health",
    "women health coaching",
    "men health coaching",
  ],
  openGraph: {
    title: "The Nourished Garden & Farm | Affordable Health Coaching",
    description:
      "Affordable health coaching for women, men, kids, and families. Simple routines, budget-friendly meals, and realistic support.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7f9464",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${geistMono.variable} bg-background antialiased`}
    >
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
