import { Syne as FontSyne, Source_Sans_3 as Fontsans } from "next/font/google";
import "./globals.css";
import "./globals1.css";
import NavigationBar from "@/components/common/NavigationBar";
import Footer from "@/components/common/Footer";
import UserSyncWrapper from "@/components/common/UserSyncWrapper";

import { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { dark, neobrutalism } from "@clerk/themes";

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
    <ClerkProvider
    appearance={{
      baseTheme: dark,
      variables: {
        colorBackground: 'rgb(0 0 24 / var(--tw-bg-opacity, 1))', 
        colorBorder: '#ffffff',
        colorInputBackground:'rgb(0 0 24 / var(--tw-bg-opacity, 1))', 
        
      
    
      }
    }}
  >
      <html lang="en">
        <body
          className={`${fontsans.variable} ${fontSyne.variable} font-sanss font-syne antialiased`}
        >
          <Toaster />
          <div className="bg relative flex min-h-screen flex-col text-white">
            <NavigationBar />

            <main className="flex-1">
              <UserSyncWrapper>
                {children}
              </UserSyncWrapper>
            </main>
            <Footer />
           
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
