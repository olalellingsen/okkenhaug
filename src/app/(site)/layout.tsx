import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const robotoMono = Roboto_Condensed({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ola Lømo Ellingsen",
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
        className={`${robotoCondensed.variable} ${robotoMono.variable} font-light antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
