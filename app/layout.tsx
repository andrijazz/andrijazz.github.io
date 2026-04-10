import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Personal site and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
