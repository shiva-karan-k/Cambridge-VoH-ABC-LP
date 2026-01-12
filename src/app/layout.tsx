import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Lato, Oswald, Bebas_Neue } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "ABC Active Breathing Course - Big Breathing Adventure",
  description: "A free 12-week online breathing course for children aged 7 and above",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${lato.variable} ${oswald.variable} ${bebasNeue.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
