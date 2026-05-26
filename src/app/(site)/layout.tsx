import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eskild Okkenhaug",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSlab.className} font-light antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
