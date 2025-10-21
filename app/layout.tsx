import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politrack Africa | Data-Driven Political Insights",
  description:
    "Politrack Africa is East Africa’s leading political research and consumer insight company. We specialize in election polling, voter sentiment analysis, and data-driven decision-making for governments, brands, and NGOs.",
  keywords: [
    "Political research Kenya",
    "Opinion polling East Africa",
    "Consumer insight surveys Africa",
    "Election polling firm Kenya",
    "Public opinion data analysis",
    "Political survey company Nairobi",
    "Voter sentiment tracking",
    "Constituency-level polling Kenya",
    "Brand perception surveys Africa",
    "Political forecasting firm",
    "Ward-level political analysis Kenya",
    "Predictive modeling for elections",
    "Clan-based voting behavior studies",
    "Statistically neutral survey design",
    "Political polling methodology experts",
    "Business market research East Africa",
    "Consumer behavior analytics Kenya",
    "Corporate brand credibility surveys",
    "Politrack Africa polling reports",
    "Kenya political opinion trends",
    "Trusted political polling firm",
    "Accurate election predictions Kenya",
    "Data-driven consumer insights",
    "Award-winning research company",
    "Real-time voter sentiment analysis",
    "Professional polling services East Africa",
    "East African voter insights",
    "Kiambu constituency polling data",
    "Sigona ward election projections",
    "African polling company",
  ],
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome",
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/favicons/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`font-sans ${inter.variable}`}>
 
    <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
  <Footer />
        <ToastContainer
          toastClassName="text-sm"
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
      </body>
    </html>
  );
}
