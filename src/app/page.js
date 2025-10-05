import Image from "next/image";
import "./globals.scss";
import { HeaderOffCanvas } from "../../components/Hero/headerOffCanvas";
import { Hero } from "../../components/Hero/Hero/hero";
import { Users } from "../../components/Services/Users/users";
import Price from "../../components/Price_service/price";
import { Footer } from "../../components/Footer/footer";
import { Promoutions } from "../../components/Promoutions/promoutions";
import { YandexMap } from "../../components/Yandex_map/yandexMap";
import { Reviews } from "../../components/Reviews/reviews";
import { Questions } from "../../components/Questions/questions";
import { Clients } from "../../components/Clients/clients";
import { ExampleWorks } from "../../components/Examples_works/examples_works";

export async function generateMetadata() {
  return {
    title:
      "Клининговая компания «Чистоделы» — профессиональная уборка в Кемерово",
    description:
      "Профессиональная уборка квартир, офисов, после ремонта. Химчистка мебели и ковров. Дезинфекция помещений. Гарантия качества!",
    keywords: [
      "клининговая компания Кемерово",
      "профессиональная уборка",
      "уборка квартир",
      "уборка офисов",
      "уборка после ремонта",
      "генеральная уборка",
      "ежедневная уборка",
      "химчистка мебели",
      "химчистка ковров",
      "мойка окон",
      "дезинфекция помещений",
      "клининг услуг",
      "коммерческая уборка",
      "уборка помещений",
      "чистота и порядок",
      "клининг для бизнеса",
      "уборка для дома",
    ],
    alternates: {
      canonical: "https://klining-kemerovo.ru/",
    },
    openGraph: {
      title: `Клининговая компания «Чистоделы» — профессиональная уборка в Кемерово`,
      description: `Профессиональная уборка квартир, офисов, после ремонта. Химчистка мебели и ковров. Дезинфекция помещений. Гарантия качества!`,
      url: "https://klining-kemerovo.ru/",
      siteName: "Клининговая компания «Чистоделы»",
      images: [
        {
          url: `/hero_woman_item.webp`,
          width: 1200,
          height: 630,
          alt: `Клининг Кемерово`,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Клининговая компания «Чистоделы» — профессиональная уборка в Кемерово",
      description:
        "Профессиональная уборка квартир, офисов, после ремонта. Химчистка мебели и ковров. Дезинфекция помещений. Гарантия качества!",
      images: [`/hero_woman_item.webp`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <HeaderOffCanvas />
      <Hero />
      <Users />
      <Price />
      <ExampleWorks />
      <Promoutions />
      <Reviews />
      <Clients />
      <Questions />
      <YandexMap />
      <Footer />
    </>
  );
}
