import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ToasterContext from "@/contexxt/ToasterContext";
import { Theme } from "@/providers/ThemeProvider";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Kandan T0-D0",
  description: "Personal Kanban Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${ubuntu.className} dark:bg-gray-900`}>
          <Theme>
            <ToasterContext />
            <Navbar />
            {children}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
