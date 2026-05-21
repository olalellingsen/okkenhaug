import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Studio - Ola Lømo Ellingsen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          height: "100vh",
          maxHeight: "100dvh",
          overscrollBehavior: "none",
          WebkitFontSmoothing: "antialiased",
          overflow: "auto",
          margin: 0,
        }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
