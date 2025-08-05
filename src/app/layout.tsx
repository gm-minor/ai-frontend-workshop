import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import FontProvider from '@/components/FontProvider'
import { siteMetadata } from '@/lib/metadata'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = `${geistSans.variable} ${geistMono.variable} antialiased`
  
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <FontProvider fontVariables={fontVariables}>
          <ErrorBoundary>
            <CartProvider>
              {children}
            </CartProvider>
          </ErrorBoundary>
        </FontProvider>
      </body>
    </html>
  );
}
