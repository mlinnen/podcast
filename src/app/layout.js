import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/LayoutComponents";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Let the Chips Fly | Podcast",
  description: "The official home of the Let the Chips Fly podcast. Listen to episodes, watch video, and subscribe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
