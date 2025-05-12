import { Syne as FontSyne, Source_Sans_3 as Fontsans } from "next/font/google";
import "./globals.css";
import "./globals1.css";
import NavigationBar from "@/components/common/NavigationBar";
import Footer from "@/components/common/Footer";

import { Metadata } from "next";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const fontsans = Fontsans({
  variable: "--font-sanss",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const fontSyne = FontSyne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "PaperMind",
  description: "convert pdf into summary and cheatsheet",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontsans.variable} ${fontSyne.variable} font-sanss font-syne antialiased`}
        >
          <div className="bg relative flex min-h-screen flex-col text-white">
            <NavigationBar />

            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
