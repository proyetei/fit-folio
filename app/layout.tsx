import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import {dark} from "@clerk/themes";
import { subTitle } from "@/fonts/font";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "FitFolio",
  description: "Your fitness journey made easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
    <html lang="en">
      <body className={`${subTitle.className} bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-violet-900 via-zinc-900 to-black`}>
        {children} 
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
