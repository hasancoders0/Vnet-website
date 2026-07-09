import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

import BackToTop from "@/components/shared/BackToTop";
import ToastContainer from "@/components/ui/ToastContainer";
import NavigationLoader from "@/components/ui/NavigationLoader";
import { SITE_CONFIG } from "@/config/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  applicationName: SITE_CONFIG.name,

  title: SITE_CONFIG.seo.title,

  description: SITE_CONFIG.seo.description,

  keywords: SITE_CONFIG.seo.keywords,

  authors: [
    {
      name: SITE_CONFIG.name,
    },
  ],

  creator: SITE_CONFIG.name,

  publisher: SITE_CONFIG.name,

  icons: {
    icon: SITE_CONFIG.favicon,
    shortcut: SITE_CONFIG.favicon,
    apple: SITE_CONFIG.favicon,
  },

  openGraph: {
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,

    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: SITE_CONFIG.seo.title,

    description: SITE_CONFIG.seo.description,

    images: [SITE_CONFIG.ogImage],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#050816",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col">
        <NavigationLoader />
        {children}

        <ToastContainer />
        <BackToTop />
      </body>
    </html>
  );
}
