import type { Metadata } from "next";
import "./globals.css";
import Footerpage from "@/components/Footer";
import ToastCard from "@/components/toastNotification";


export const metadata: Metadata = {
  title: "Politrack Africa",
  description: "Politrack Africa: Where Numbers Meet Narrative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ToastCard />
        {children}
        <Footerpage />
      </body>
    </html>
  );
}
