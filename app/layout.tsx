import type { Metadata } from "next";
import "./globals.css";
import TableOfContents from "./components/TableOfContents";
import ScrollProgress from "./components/ScrollProgress";
import FloatingCTA from "./components/FloatingCTA";

export const metadata: Metadata = {
  title: "Łamigłówki dla bystrej główki | Rozwój logicznego myślenia dzieci",
  description: "Książka z zagadkami logicznymi dla dzieci. 15 minut dziennie rozwija myślenie, koncentrację i kreatywność. Wspólny czas bez ekranu. 30-dniowa gwarancja zwrotu.",
  keywords: ["łamigłówki dla dzieci", "zagadki logiczne", "rozwój dziecka", "matematyka dla dzieci", "logiczne myślenie"],
  metadataBase: new URL('https://paulinaodmatematyki.com'),
  openGraph: {
    title: "Łamigłówki dla bystrej główki",
    description: "15 minut dziennie = lepsza logika, koncentracja i wspólny czas bez ekranu",
    images: ["/images/okladka przodem.webp"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "name": "Łamigłówki dla bystrej główki",
        "author": {
          "@type": "Person",
          "name": "Paulina od Matematyki"
        },
        "description": "Książka z zagadkami logicznymi dla dzieci. 15 minut dziennie rozwija myślenie, koncentrację i kreatywność.",
        "inLanguage": "pl",
        "numberOfPages": "150+",
        "audience": {
          "@type": "Audience",
          "audienceType": "Children aged 5-12"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2430"
        }
      },
      {
        "@type": "Product",
        "name": "Łamigłówki dla bystrej główki",
        "image": "/images/okladka przodem.webp",
        "description": "Książka z zagadkami logicznymi dla dzieci",
        "brand": {
          "@type": "Brand",
          "name": "Paulina od Matematyki"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Pakiet Starter",
            "price": "69",
            "priceCurrency": "PLN",
            "availability": "https://schema.org/InStock",
            "url": "https://paulinaodmatematyki.com/lamiglowki",
            "priceValidUntil": "2025-12-31"
          },
          {
            "@type": "Offer",
            "name": "Pakiet Aktywny",
            "price": "99",
            "priceCurrency": "PLN",
            "availability": "https://schema.org/InStock",
            "url": "https://paulinaodmatematyki.com/lamiglowki"
          },
          {
            "@type": "Offer",
            "name": "Pakiet Premium",
            "price": "199",
            "priceCurrency": "PLN",
            "availability": "https://schema.org/InStock",
            "url": "https://paulinaodmatematyki.com/lamiglowki"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2430",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Organization",
        "name": "Paulina od Matematyki",
        "url": "https://paulinaodmatematyki.com",
        "logo": "/images/okladka przodem.webp",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "paulina@matematyki.pl",
          "contactType": "Customer Service",
          "availableLanguage": "Polish"
        }
      }
    ]
  };

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="antialiased">
        <ScrollProgress />
        <TableOfContents />
        <FloatingCTA />
        {children}
      </body>
    </html>
  );
}
