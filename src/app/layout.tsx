import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fashionista Admin",
  description: "Admin dashboard for Fashionista Valentine Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Using light theme by default with font smoothing
    <html lang="en" className={`${GeistSans.className} antialiased bg-white`}>
      <body className="min-h-screen bg-gray-50/90">{children}</body>
    </html>
  );
} 


