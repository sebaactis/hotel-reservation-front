import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer/Footer";
import AuthBootstrap from "@/components/Auth/AuthBootstrap";

import { Phone } from "lucide-react"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body

        className={clsx(
          "min-h-screen text-foreground font-sans antialiased",
          fontSans.variable,

        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <AuthBootstrap />
            <Navbar />
            <main className="container mx-auto max-w-full flex-grow bg-[#d4c7bf]">
              {children}
            </main>
            <Toaster richColors position="top-center" />
            <div className="fixed bottom-4 right-4 p-3 rounded-full bg-green-500 shadow-lg cursor-pointer z-50">
              <Phone />
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
