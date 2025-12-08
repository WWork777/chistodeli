import { notFound } from "next/navigation";
import "../article.scss";
import blogData from "@/data/blogData.json";
import "../../globals.scss";

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

function getArticleData(slug) {
  return blogData.find((post) => post.slug === slug);
}

function parseDate(dateString) {
  const months = {
    января: "January",
    февраля: "February",
    марта: "March",
    апреля: "April",
    мая: "May",
    июня: "June",
    июля: "July",
    августа: "August",
    сентября: "September",
    октября: "October",
    ноября: "November",
    декабря: "December",
  };

  const parts = dateString.split(" ");
  if (parts.length === 3) {
    const [day, monthRu, year] = parts;
    const monthEn = months[monthRu];
    if (monthEn) {
      return new Date(`${monthEn} ${day}, ${year}`);
    }
  }
  return new Date();
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleData(slug);

  if (!article) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.imageUrl
      ? `https://klining-kemerovo.ru${article.imageUrl}`
      : undefined,
    datePublished: parseDate(article.date).toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Чистоделы",
    },
    publisher: {
      "@type": "Organization",
      name: "Чистоделы",
      logo: {
        "@type": "ImageObject",
        url: "https://klining-kemerovo.ru/icons/Header/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://klining-kemerovo.ru/blog/${article.slug}`,
    },
    keywords: ["клининг", "чистка", "Кемерово", "уборка", article.category],
    articleSection: article.category,
    articleBody: (article.text || "").substring(0, 5000),
  };

  return (
    <section className="hero-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article
        className="article"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <div className="articleHeader">
          <div className="meta">
            <span className="category" itemProp="articleSection">
              {article.category}
            </span>
            <span className="date">
              📅{" "}
              <time
                itemProp="datePublished"
                dateTime={parseDate(article.date).toISOString()}
              >
                {article.date}
              </time>
            </span>
            <span className="readTime">⏱️ {article.readTime}</span>
          </div>

          <h1 className="title" itemProp="headline">
            {article.title}
          </h1>
          <p className="excerpt" itemProp="description">
            {article.description}
          </p>

          <div
            className="author"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <meta itemProp="name" content="Чистоделы" />
            <span>Автор: Чистоделы</span>
          </div>
        </div>

        <div className="articleContent" itemProp="articleBody">
          {typeof article.text === "string"
            ? article.text
                .split("\n\n")
                .map((para, idx) => (
                  <p key={idx}>{para.replace(/^#+\s*/, "")}</p>
                ))
            : null}
        </div>

        <div className="articleFooter">
          <div className="tags">
            <span>Теги:</span>
            <button className="tag" itemProp="keywords">
              чистка
            </button>
            <button className="tag" itemProp="keywords">
              Кемерово
            </button>
            <button className="tag" itemProp="keywords">
              клининговая компания
            </button>
            <button className="tag" itemProp="keywords">
              уборка
            </button>
            <button className="tag" itemProp="keywords">
              {article.category}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleData(slug);

  if (!article) {
    return {
      title: "Статья не найдена",
      description: "Запрошенная статья не существует или была удалена",
    };
  }

  const baseKeywords = [
    "клининговая компания Кемерово",
    "профессиональная уборка Кемерово",
    "уборка квартир Кемерово",
    "уборка офисов Кемерово",
    "уборка после ремонта Кемерово",
    "генеральная уборка Кемерово",
    "ежедневная уборка офисов",
    "химчистка мебели Кемерово",
    "мойка окон Кемерово",
    "клининг для бизнеса Кемерово",
    "уборка помещений Кемерово",
    "качественная уборка квартир",
    "клининг после ремонта",
  ];

  const contentKeywords =
    typeof article.text === "string"
      ? article.text
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 4)
          .slice(0, 30)
      : [];

  const keywords = [
    ...new Set([...baseKeywords, ...contentKeywords, article.category]),
  ].join(", ");

  const ogImage = article.imageUrl
    ? {
        url: `https://klining-kemerovo.ru${article.imageUrl}`,
        width: 1200,
        height: 630,
        alt: article.title,
      }
    : {
        url: "https://klining-kemerovo.ru/images/Hero/Hero.webp",
        width: 1200,
        height: 630,
        alt: "Блог о клининговой компании Чистоделы",
      };

  return {
    title: `${article.title} | Блог Чистоделы`,
    description: article.description,
    keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: parseDate(article.date).toISOString(),
      authors: ["Чистоделы"],
      tags: ["клининг", "уборка", "Кемерово", article.category],
      images: [ogImage],
      url: `https://klining-kemerovo.ru/blog/${article.slug}`,
      siteName: "Чистоделы",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage.url],
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
    alternates: {
      canonical: `https://klining-kemerovo.ru/blog/${article.slug}`,
    },
    other: {
      "application-name": "Блог Чистоделы",
      generator: "Next.js",
      referrer: "origin-when-cross-origin",
      "color-scheme": "light only",
      language: "ru",
      "content-language": "ru-RU",
      "geo.region": "RU",
      "geo.placename": "Кемерово",
      "geo.position": "55.393070;86.102239",
      "business:contact_data:locality": "Кемерово",
      "business:contact_data:country_name": "Россия",
      "product:brand": "Чистоделы",
      "product:availability": "in_stock",
      "product:condition": "new",
      "product:price:amount": "0",
      "product:price:currency": "RUB",
    },
  };
}
