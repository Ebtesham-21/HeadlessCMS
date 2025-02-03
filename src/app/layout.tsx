import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({subsets: ["latin"]});


export const metadata: Metadata = {
  title: {
    template: "%s | 99BOOKS",
    absolute: "99BOOKS",
  },
  description: "Generated by Ebtesham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
