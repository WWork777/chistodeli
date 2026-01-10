import CookieConsent from "../../components/Cookie/cookie";
import YandexMetrika from "../../components/YandexMetrika/YandexMEtrika";
import { HeaderOffCanvas } from "../../components/Hero/headerOffCanvas";
import { Footer } from "../../components/Footer/footer";

export const metadata = {
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <HeaderOffCanvas />
          {children}

          <CookieConsent />
          <YandexMetrika />
          <Footer />
        </body>
      </html>
    </>
  );
}
