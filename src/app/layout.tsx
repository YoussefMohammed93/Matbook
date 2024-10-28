import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { fileRouter } from "./api/uploadthing/core";
import ReactQueryProvider from "./ReactQueryProvider";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Matbook",
    default: "Matbook",
  },
  description:
    "Matbook – Connect, share, and collaborate with like-minded individuals. Discover a vibrant social platform designed for seamless interaction, community building, and creative expression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
