import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yes Broker",
  description: "Start Your Property Journey",
};

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ToastContainer position="top-right" />
        <Navbar className="mb-12" />
        
        {/* Main grows to fill available space */}
        <main className="flex-grow pt-16">
          {children}
        </main>
        
        {/* Footer sticks at bottom if content is short */}
        <Footer />
      </body>
    </html>
  );
}
