import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Providers from "@/Provider/Providers";
import { Toaster } from "sonner";

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wimers Regiond Center Dashboard",
  description: "Brand-first design system with Lato typography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers >
          <Toaster
            position="top-right"
            richColors
            closeButton
            theme="light"
          />
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
