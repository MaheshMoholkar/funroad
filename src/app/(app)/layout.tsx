import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funroad",
  description: "Multi-Vendor E-Commerce Marketplace",
  icons: {
    icon: "/funroad.png",
    shortcut: "/funroad.png",
    apple: "/funroad.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <TRPCReactProvider>
          {children}
          <Toaster richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
