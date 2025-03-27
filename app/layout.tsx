"use client";

import { ReactNode, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Head from "next/head";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((err) =>
        console.error("Service Worker registration failed:", err)
      );
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      console.log("beforeinstallprompt fired");
      (window as any).deferredPrompt = event;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>M.J_Meeting</title>
        <meta
          name="description"
          content="Video calling App, powered by Stream, Clerk and Next.js, with Zoom clone, Developed by Syed Mujtaba Abbas"
        />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/yoom-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
