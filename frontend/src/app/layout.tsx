import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Poppins } from "next/font/google";
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-MENU",
  description: "Menu para garnçons!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={poppins.className}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster position='bottom-right' toastOptions={{
          style: {
            backgroundColor: '#f1f1f1',
            color: '131313',
            borderColor: 'rgba(255,255,255, 0.5)'
          }
        }} />
        {children}
      </body>
    </html>
  );
}
