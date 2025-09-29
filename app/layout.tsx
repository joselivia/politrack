import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Politrack Africa",
  description: "Politrack Africa: Where Numbers Meet Narrative",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${playfair.variable}`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
