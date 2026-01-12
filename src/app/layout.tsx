import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Lato, Oswald, Bebas_Neue } from "next/font/google";
import "./globals.css";
import "./original-styles.css";

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

// Conditional Clerk Provider Component
function ConditionalClerkProvider({ children }: { children: React.ReactNode }) {
  const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY;
  
  if (!hasClerkKeys) {
    console.warn('Clerk environment variables missing - running without authentication');
    return <>{children}</>;
  }
  
  console.log('Clerk initialized successfully');
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConditionalClerkProvider>
      <html lang="en">
        <body className={`${lato.variable} ${oswald.variable} ${bebasNeue.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ConditionalClerkProvider>
  );
}
