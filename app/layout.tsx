import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
});

const siteUrl = "https://arsenyyurkevich.ru";
const title = "Арсений Юркевич — официальный сайт ведущего";
const description =
  "Арсений Юркевич — ведущий свадеб, корпоративов и частных событий. Официальный сайт. Курган, Екатеринбург, Тюмень, Москва.";
const openGraphDescription =
  "Ведущий свадеб, корпоративов и частных событий. Курган, Екатеринбург, Тюмень, Москва.";
const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Арсений Юркевич",
  alternateName: "Сеня Юркевич",
  jobTitle: "Ведущий мероприятий",
  url: siteUrl,
  telephone: "+79080045544",
  sameAs: [
    "https://t.me/arsenyyurkevich",
    "https://instagram.com/arsya_ecenin",
    "https://vk.com/arsenyecenin",
  ],
  areaServed: ["Курган", "Екатеринбург", "Тюмень", "Москва", "УрФО", "Россия"],
};
const professionalServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Арсений Юркевич",
  url: siteUrl,
  telephone: "+79080045544",
  image: `${siteUrl}/images/home-desktop.jpg`,
  serviceType: "Ведение мероприятий",
  areaServed: ["Курган", "Екатеринбург", "Тюмень", "Москва", "УрФО", "Россия"],
  sameAs: [
    "https://t.me/arsenyyurkevich",
    "https://instagram.com/arsya_ecenin",
    "https://vk.com/arsenyecenin",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Арсений Юркевич",
    "ведущий Арсений Юркевич",
    "Арсений Юркевич ведущий",
    "официальный сайт Арсения Юркевича",
    "ведущий Курган",
    "ведущий Екатеринбург",
    "ведущий Тюмень",
    "ведущий Москва",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title,
    description: openGraphDescription,
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
      <body className="font-manrope">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
