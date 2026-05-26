import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
});

const siteUrl = "https://arsenyyurkevich.ru";
const title = "Ведущий Арсений Юркевич";
const description = "Без тирании позитива. УрФО, Москва, Россия.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: ["/images/home-desktop.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/home-desktop.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-manrope">{children}</body>
    </html>
  );
}
