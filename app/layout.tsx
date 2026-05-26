import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Ведущий Арсений Юркевич",
  description:
    "Ведущий Арсений Юркевич. Без тирании позитива. УрФО, Москва, Россия.",
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
