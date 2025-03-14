import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "./[slug]/menu/contexts/cart";
import CustomButton from "@/components/AuthorButton";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  generator: 'Next.js',
  title: 'McDonalds',
  description: 'Delivery App Clone',
  applicationName: 'McDonalds',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'typescript', 'nextjs', 'frontend', 'developer', 'front end', 'programmer'],
  authors: [{ name: 'Eduardo Rigo', url: 'https://eduardev.com' }],
  creator: 'Eduardo Rigo',
  publisher: 'Eduardo Rigo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'McDonalds',
    description: 'Delivery App Clone',
    url: 'https://mcdonalds.eduardev.com',
    siteName: 'McDonalds',
    images: [
      {
        url: 'https://mcdonalds.eduardev.com/images/bg.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://mcdonalds.eduardev.com/images/bg-g.png',
        width: 1800,
        height: 1600,
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>
          {children}
          <footer className="py-6 flex justify-center">
            <CustomButton />
          </footer>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
