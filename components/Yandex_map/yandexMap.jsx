'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import './yandexMap.scss';
import Link from 'next/link';

export function YandexMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadYandexMap = () => {
      if (window.ymaps && mapRef.current) {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [55.393134, 86.102307],
            zoom: 16,
            // ОТКЛЮЧАЕМ ВСЕ ЛИШНИЕ ЭЛЕМЕНТЫ
            controls: [], // ← пустой массив = никаких элементов управления
            behaviors: ['default', 'scrollZoom'], // оставляем только базовое поведение
            type: 'yandex#map', // обычная схема без лишнего
          });

          // Создаем кастомный маркер
          const marker = new window.ymaps.Placemark(
            [55.393134, 86.102307],
            {
              hintContent: 'Наш офис',
              balloonContent: 'ул. Тульская 28, офис 5',
            },
            {
              // Простой красный маркер
              preset: 'islands#redIcon',
              iconColor: '#0091C9',
            }
          );

          map.geoObjects.add(marker);

          // ДОПОЛНИТЕЛЬНО: отключаем рекламу и другие элементы
          setTimeout(() => {
            // Убираем рекламу и копирайты если они есть
            const copyrights = mapRef.current.querySelectorAll(
              '.ymaps-2-1-79-copyrights-pane, .ymaps-2-1-79-copyright'
            );
            copyrights.forEach((el) => (el.style.display = 'none'));

            const ads = mapRef.current.querySelectorAll("[class*='ads']");
            ads.forEach((el) => (el.style.display = 'none'));
            const currentCenter = map.getCenter();
            // Смещаем на 0.0015 по долготе для сдвига вправо
            const newCenter = [currentCenter[0], currentCenter[1]];
            map.setCenter(newCenter, 17, { duration: 300 });
          }, 1000);
        });
      }
    };

    if (window.ymaps) {
      loadYandexMap();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://api-maps.yandex.ru/2.1/?apikey=2a907ab4-e930-4aca-9ebb-13d8e04a56a5&lang=ru_RU';
      script.async = true;
      script.onload = loadYandexMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className='map-container'>
      <div className='map-contacts'>
        <h2>Контакты</h2>
        <div className='map-all-contacts'>
          <div className='map-contact-adress'>
            <h4>Адрес:</h4>
            <span>
              ул. Тульская 28, офис 5, Кемерово,
              <br />
              Кемеровская обл. 650002
            </span>
          </div>
          <div className='map-other-contacts'>
            <h4>Мы на связи</h4>
            <span>info42@chistodely.ru</span>
            <span>+7 (905) 07-83-111</span>
            <div className='map-contacts-messages'>
              <Link href={'https://max.ru/u/f9LHodD0cOIAQm0SvKv96wb8bxEFrrL0tqzMuIdZdexVUPak7PkwACj_B6k'}>
                <div className='map-contact-message'>
                  <span>Max</span>
                  <Image src="icons/maxgrad.svg" width={29} height={29}></Image>
                </div>
              </Link>
              <Link href={'https://t.me/chistodely42'}>
                <div className='map-contact-message'>
                  <span>Telegram</span>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_321_343)'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M29 14.5C29 22.5081 22.5081 29 14.5 29C6.49187 29 0 22.5081 0 14.5C0 6.49187 6.49187 0 14.5 0C22.5081 0 29 6.49187 29 14.5ZM15.0196 10.7045C13.6093 11.2911 10.7906 12.5053 6.56354 14.3469C5.87713 14.6199 5.51756 14.8869 5.48483 15.148C5.42951 15.5893 5.98211 15.7631 6.73461 15.9997C6.83697 16.0319 6.94303 16.0652 7.05176 16.1006C7.7921 16.3412 8.788 16.6228 9.30572 16.634C9.77535 16.6441 10.2995 16.4505 10.8782 16.0531C14.8277 13.3871 16.8664 12.0396 16.9944 12.0106C17.0847 11.9901 17.2098 11.9643 17.2946 12.0396C17.3794 12.115 17.371 12.2577 17.3621 12.296C17.3073 12.5294 15.1382 14.546 14.0156 15.5896C13.6657 15.915 13.4174 16.1458 13.3667 16.1985C13.253 16.3165 13.1372 16.4282 13.0258 16.5356C12.338 17.1986 11.8222 17.6958 13.0544 18.5078C13.6465 18.898 14.1203 19.2206 14.593 19.5426C15.1092 19.8941 15.6241 20.2447 16.2903 20.6814C16.46 20.7927 16.6221 20.9082 16.78 21.0208C17.3808 21.4491 17.9205 21.8339 18.5873 21.7725C18.9748 21.7369 19.375 21.3725 19.5782 20.2859C20.0586 17.718 21.0028 12.154 21.221 9.86118C21.2401 9.6603 21.2161 9.40321 21.1968 9.29036C21.1775 9.17751 21.1371 9.01671 20.9904 8.89768C20.8167 8.75672 20.5485 8.72699 20.4285 8.7291C19.8832 8.73871 19.0464 9.02965 15.0196 10.7045Z'
                        fill='#2AABEE'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_321_343'>
                        <rect width='29' height='29' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div ref={mapRef} className='map' />
    </div>
  );
}
