"use client";
import "./ofCanvas.scss";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function OffCanvas({ isOpen, onClose }) {
  const router = useRouter();
  const handleLinkClick = (href) => {
    onClose();

    // Если это якорная ссылка (#), выполняем плавный скролл
    if (href.startsWith("/#")) {
      // Даем время на закрытие оффканваса
      setTimeout(() => {
        const id = href.split("#")[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(href);
        }
      }, 300);
    } else {
      // Обычные ссылки
      router.push(href);
    }
  };

  return (
    <>
      <div
        className={"offcanvas" + (isOpen ? " show" : "")}
        id="offcanvasRight"
      >
        <div className="offcanvas-header">
          <button className="btn-close" onClick={onClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.432 15.852V0.947999H9.052V15.852H7.432ZM0.592 9.192V7.644H15.892V9.192H0.592Z"
                fill="#000"
              />
            </svg>
          </button>
        </div>
        <div className="offcanvas-menu">
          <div className="offcanvas-logo">
            <Image src={logo} width={210} height={95} alt="Чистоделы" />
          </div>
          <button onClick={() => handleLinkClick("/#services")}>Услуги</button>
          <button onClick={() => handleLinkClick("/#calculate")}>
            Калькулятор
          </button>
          <button onClick={() => handleLinkClick("/#works")}>
            Наши работы
          </button>
          <button onClick={() => handleLinkClick("/#questions")}>
            Вопросы
          </button>
          <button onClick={() => handleLinkClick("/blog")}>Блог</button>
          <button onClick={() => handleLinkClick("/#reviews")}>Отзывы</button>
          <div className="phone">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_378_160)">
                <path
                  d="M7.91567 4.68L5.37842 1.75125C5.08592 1.41375 4.54967 1.41525 4.20992 1.75575L2.12342 3.846C1.50242 4.46775 1.32467 5.391 1.68392 6.13125C3.83014 10.575 7.41396 14.1638 11.8547 16.3162C12.5942 16.6755 13.5167 16.4977 14.1377 15.876L16.2437 13.7662C16.5849 13.425 16.5857 12.8857 16.2452 12.5932L13.3052 10.0695C12.9977 9.8055 12.5199 9.84 12.2117 10.149L11.1887 11.1735C11.1363 11.2284 11.0674 11.2646 10.9924 11.2765C10.9175 11.2884 10.8407 11.2754 10.7739 11.2395C9.10176 10.2766 7.71467 8.88767 6.75392 7.21425C6.71794 7.14731 6.70492 7.07042 6.71684 6.99537C6.72876 6.92031 6.76497 6.85124 6.81992 6.79875L7.83992 5.778C8.14892 5.4675 8.18267 4.98825 7.91567 4.68Z"
                  stroke="#0091C9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_378_160">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Link href={"tel:+79050783111"}>+7 (905) 078-31-11</Link>
          </div>
          <div className="icons">
            <Link className="icon" href={"https://t.me/chistodely42"}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_321_348)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.517578 14.5C0.517578 12.6638 0.879237 10.8457 1.58191 9.14927C2.28457 7.45287 3.31449 5.91149 4.61285 4.61313C5.91121 3.31477 7.45259 2.28485 9.14899 1.58218C10.8454 0.879515 12.6636 0.517857 14.4997 0.517857C16.3359 0.517857 18.1541 0.879515 19.8505 1.58218C21.5468 2.28485 23.0882 3.31477 24.3866 4.61313C25.685 5.91149 26.7149 7.45287 27.4175 9.14927C28.1202 10.8457 28.4819 12.6638 28.4819 14.5C28.4819 18.2083 27.0087 21.7647 24.3866 24.3869C21.7644 27.009 18.208 28.4821 14.4997 28.4821C10.7914 28.4821 7.23501 27.009 4.61285 24.3869C1.99069 21.7647 0.517578 18.2083 0.517578 14.5ZM19.1646 22.9183L21.3292 6.48771L4.41601 14.6388L9.42265 16.4534L14.9865 12.1531C15.0942 12.07 15.2173 12.0089 15.3486 11.9733C15.4799 11.9378 15.617 11.9284 15.7519 11.9459C15.8868 11.9633 16.017 12.0071 16.135 12.0748C16.253 12.1425 16.3565 12.2328 16.4396 12.3405C16.5227 12.4483 16.5838 12.5713 16.6193 12.7026C16.6549 12.8339 16.6642 12.971 16.6468 13.1059C16.6294 13.2408 16.5856 13.371 16.5179 13.489C16.4502 13.607 16.3599 13.7105 16.2521 13.7936L11.637 17.3586V23.0053L15.1274 19.6827L19.1646 22.9183Z"
                    fill="#0091C9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_321_348">
                    <rect width="29" height="29" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link className="icon" href={"https://wa.me/79050783111"}>
              <Image src="/max.svg" width={29} height={29}></Image>
            </Link>
            <Link className="icon" href={"https://vk.com/id848910555"}>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_290_299)">
                  <path
                    d="M15.1123 0C21.6675 0 24.9631 0.000332922 26.9814 2.03613C28.9998 4.07194 29 7.35001 29 13.8877V15.1123C29 21.6512 29.0172 24.9281 26.9814 26.9639C24.9456 28.9997 21.6675 29 15.1123 29H13.9053C7.34896 29 4.07194 28.9997 2.03613 26.9639C0.000340052 24.9281 0 21.6513 0 15.1123V13.8877C0 7.34761 0.000340052 4.07194 2.03613 2.03613C4.07194 0.000340053 7.34896 0 13.9053 0H15.1123ZM4.90039 8.83301C5.05468 16.3718 9.02357 20.9092 15.5625 20.9092H15.9414V16.5957C18.3217 16.837 20.0992 18.6147 20.8242 20.9092H24.2568C23.3254 17.4769 20.9102 15.5786 19.4092 14.8535C20.9101 13.9567 23.0313 11.7827 23.5312 8.83301H20.4102C19.7537 11.2307 17.8043 13.4048 15.9414 13.6113V8.83301H12.7666V17.2002C10.8352 16.7211 8.31613 14.3707 8.21289 8.83301H4.90039Z"
                    fill="#0091C9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_290_299">
                    <rect width="29" height="29" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
