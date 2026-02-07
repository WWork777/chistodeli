import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services.data';
import styles from './page.module.scss';

// Генерация статических параметров для всех услуг
export async function generateStaticParams() {
  const services = getAllServiceSlugs();
  return services;
}

// Генерация метаданных для каждой страницы
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: "Услуга не найдена | Клининговая компания",
      description: "Запрашиваемая услуга не найдена",
    };
  }

  const title = service.seoTitle || `${service.title} | Клининговая компания`;
  const description = service.seoDescription || service.description;
  const imageUrl = `/Services/${service.img}`;
  
  // Замените на ваш реальный домен
  const baseUrl = 'https://ваш-сайт.рф';
  const url = `${baseUrl}/${slug}`;

  return {
    title,
    description,
    keywords: [
      service.title,
      "клининг",
      "уборка",
      "Кемерово",
      service.category === "user" ? "уборка квартиры" : "уборка офиса",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: "Клининговая компания - Уборка в Кемерово",
      images: [
        {
          url: `${baseUrl}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${imageUrl}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  // Если услуга не найдена - показываем 404
  if (!service) {
    notFound();
  }

  return (
    <section className={styles.servicePage}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        {/* <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>Главная</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/#services" className={styles.breadcrumbLink}>Услуги</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{service.title}</span>
        </div> */}

        <div className={styles.content}>
          {/* Левая колонка - изображение */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                src={`/Services/${service.img}`}
                alt={service.title}
                width={600}
                height={400}
                className={styles.mainImage}
                priority
              />
            </div>
            
            {/* Дополнительная информация */}
            <div className={styles.infoCard}>
              {/* <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Цена:</span>
                <span className={styles.infoValue}>{service.price}</span>
              </div> */}
              {/* <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Длительность:</span>
                <span className={styles.infoValue}>{service.duration}</span>
              </div> */}
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Категория:</span>
                <span className={styles.infoValue}>
                  {service.category === 'user' ? 'Для физических лиц' : 'Для бизнеса'}
                </span>
              </div>
            </div>
          </div>

          {/* Правая колонка - текст */}
          <div className={styles.textSection}>
            <h1 className={styles.title}>{service.title}</h1>
            
            <div className={styles.priceBlock}>
              {/* <span className={styles.currentPrice}>
                {service.price}
              </span> */}
              {/* {service.duration && (
                <span className={styles.duration}>{service.duration}</span>
              )} */}
            </div>

            {/* <div className={styles.descriptionBlock}>
              <h2 className={styles.subtitle}>Описание услуги</h2>
              <p className={styles.description}>{service.description}</p>
            </div> */}

            <div className={styles.fullDescriptionBlock}>
              <h2 className={styles.subtitle}>Описание услуги</h2>
              <div className={styles.fullDescription} dangerouslySetInnerHTML={{ __html: service.fullDescription.replace(/\n/g, '<br/>') }} />
            </div>

            {/* Кнопки действий */}
            <div className={styles.actions}>
              <a
                href="/#calculate"
                
                className={styles.primaryButton}
              >
                <span>Рассчитать стоимость</span>
              </a>
              
              <Link
                href="/#services"
                className={styles.secondaryButton}
              >
                Смотреть все услуги
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}