"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./photoEstimate.module.scss";

export function PhotoEstimate({
  className = "",
  imageSrc,
  title,
  description,
  maxLink = "https://max.ru/u/f9LHodD0cOIAQm0SvKv96wb8bxEFrrL0tqzMuIdZdexVUPak7PkwACj_B6k",
  telegramLink = "https://t.me/chistodely42",
}) {
  return (
    <section className={`${styles.photoEstimate} ${className}`}>
      <div className={styles.container}>
        <div className={styles.imageCard}>
          {imageSrc ? (
            <div className={styles.imageWrapper}>
              <Image
                src={imageSrc}
                alt={title}
                fill
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              <div className={styles.placeholderIcon}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                    fill="#9CA3AF"
                  />
                </svg>
              </div>
              <span className={styles.placeholderText}>Фото помещения</span>
            </div>
          )}
        </div>
        <div className={styles.contentCard}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.buttons}>
              {maxLink && (
                <Link href={maxLink} className={styles.button} target="_blank" rel="noopener noreferrer">
                  <span className={styles.buttonText}>Написать в MAX</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.buttonIcon}
                  >
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
              {telegramLink && (
                <Link href={telegramLink} className={styles.button} target="_blank" rel="noopener noreferrer">
                  <span className={styles.buttonText}>Написать в Telegram</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.buttonIcon}
                  >
                    <g clipPath="url(#clip0_321_343)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29 14.5C29 22.5081 22.5081 29 14.5 29C6.49187 29 0 22.5081 0 14.5C0 6.49187 6.49187 0 14.5 0C22.5081 0 29 6.49187 29 14.5ZM15.0196 10.7045C13.6093 11.2911 10.7906 12.5053 6.56354 14.3469C5.87713 14.6199 5.51756 14.8869 5.48483 15.148C5.42951 15.5893 5.98211 15.7631 6.73461 15.9997C6.83697 16.0319 6.94303 16.0652 7.05176 16.1006C7.7921 16.3412 8.788 16.6228 9.30572 16.634C9.77535 16.6441 10.2995 16.4505 10.8782 16.0531C14.8277 13.3871 16.8664 12.0396 16.9944 12.0106C17.0847 11.9901 17.2098 11.9643 17.2946 12.0396C17.3794 12.115 17.371 12.2577 17.3621 12.296C17.3073 12.5294 15.1382 14.546 14.0156 15.5896C13.6657 15.915 13.4174 16.1458 13.3667 16.1985C13.253 16.3165 13.1372 16.4282 13.0258 16.5356C12.338 17.1986 11.8222 17.6958 13.0544 18.5078C13.6465 18.898 14.1203 19.2206 14.593 19.5426C15.1092 19.8941 15.6241 20.2447 16.2903 20.6814C16.46 20.7927 16.6221 20.9082 16.78 21.0208C17.3808 21.4491 17.9205 21.8339 18.5873 21.7725C18.9748 21.7369 19.375 21.3725 19.5782 20.2859C20.0586 17.718 21.0028 12.154 21.221 9.86118C21.2401 9.6603 21.2161 9.40321 21.1968 9.29036C21.1775 9.17751 21.1371 9.01671 20.9904 8.89768C20.8167 8.75672 20.5485 8.72699 20.4285 8.7291C19.8832 8.73871 19.0464 9.02965 15.0196 10.7045Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_321_343">
                        <rect width="29" height="29" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

