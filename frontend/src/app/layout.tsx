import type { Metadata } from "next";
import { Inter  as FontSans} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CMS | Foobarz",
  description: "CMS | with Version Control",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        {children}
      </body>
    </html>
  );
}
