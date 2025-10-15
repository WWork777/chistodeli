'use client';
import './reviews.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import star from "../../public/star.svg";
import twogis from "../../public/2gis.svg";

import 'swiper/css';
import 'swiper/css/navigation';

export function Reviews(){
    const [activeButton, setActiveButton] = useState(1);
    
    const availableReviews2gis = [
        {id: 1, img: "Ксения_V.jpg", name: "Ксения V", date: "13.08.2025", star: 5, text: 'Очень довольна уборкой! Ребята работали быстро, аккуратно и внимательно к деталям. Квартира засияла: вымыли даже труднодоступные места, навели порядок в каждой комнате. Особенно порадовало, что использовали качественные средства без резкого запаха. Цена соответствует результату — чистота идеальная! Обязательно обращусь ещё и рекомендую эту компанию друзьям. Спасибо за отличную работу!'},
        {id: 2, img: "Мария_Князева.jpg", name: "Мария Князева", date: "06.02.2025", star: 5, text: 'Обращались в компанию трижды. Делали разные виды уборки (и после ремонта, и генеральные) и доп. услуги (химчистка, мытье потолков), все всегда на отлично и быстро. Очень благодарны Вам за помощь и работу. Будем обращаться снова!'},
        {id: 3, img: "Илья_Адамчук.jpg", name: "​Илья Адамчук", date: "09.08.2024", star: 5, text: 'Цена устроила, приехали, красоту чистоту навели, аж сверкает) Спасибо чистоделам за чистое дело'},
        {id: 4, img: "Aндрей_andrei_trunov.jpg", name: "​Aндрей andrei.trunov", date: "14.03.2024", star: 5, text: 'Заказал уборку своей квартиры и остался очень доволен качеством и быстротой проделанной работы.Обязательно воспользуюсь услугой ещё. Спасибо.'},
        {id: 5, img: "Александр_Погорелов.jpg", name: "Александр Погорелов", date: "26.12.2023", star: 5, text: 'Заказывали химчистку очень-очень грязного дивана, после маленького ребенка. Результат порадовал, диван как новый. Быстро и качественно. Очень довольны работой'},
        {id: 6, img: "Никита.jpg", name: "​Никита .", date: "19.08.2025", star: 5, text: 'Очень доволен услугами Чистоделов! Заказывал уборку квартиры после ремонта, и не пожалел. Сотрудники приехали вовремя, работали быстро и аккуратно. Убрали всю пыль, грязь, следы строительных материалов. После их работы квартира выглядит идеально! Ничего не повредили. Цена полностью соответствует качеству. Обязательно обращусь ещё и буду рекомендовать всем!'},
        {id: 7, img: "Василий_Васильев.jpg", name: "Василий Васильев", date: "11.12.2023", star: 5, text: 'Качество услуг на уровне) Убрались добротно. Однозначно рекомендую данную компанию'},
        {id: 8, img: "Ольга_Григорьева.jpg", name: "Ольга Григорьева", date: "08.12.2023", star: 5, text: 'Приехала в гости к родителям и решили в подарок заказать уборку в квартире. Приехал сначала к нам специалист, который оценил фронт работы, так сказать. Согласовали время и стоимость. В день когда назначена была уборка, приехали вовремя, все с собой привезли, убрали даже там где я и не думала, что убирают. Все сделали за один день. И мои родители остались очень довольны. В квартире до сих пор ощущается свежесть.'},
    ]
    const availableReviewsYandex = [
        {id: 1, img: "Анна_Скатерная.webp", name: "Анна Скатерная", date: "01.07.2025", star: 5, text: 'Результат превзошел все мои ожидания! Мой дом стал совершенно другим — все поверхности блестят, а воздух наполнился свежестью. Особенно порадовало, как они справились с труднодоступными местами и удалили пятна, которые я считала безнадежными.'},
        {id: 2, img: "Шикотько_Мария.webp", name: "Шикотько Мария", date: "28.06.2025", star: 5, text: 'замечательная компания выехали менеджер внимательно спросил , про все нюансы , Все было в пыли и даже краска осталась , клинкеры справились на ура у нас была уборка после ремонта, убиралась бригада с утра до вечера , так удобно теперь уставливаем мебель в чистой квартире'},
        {id: 3, img: "Александр_Г.webp", name: "Александр Г.", date: "07.12.2023", star: 5, text: 'Нашел ребят случайно! Позвонил что бы обсудить все детали и цену вопроса. Приятный и профессиональный консультант все объяснила и рассказала. Мне нужна была уборка квартиры. Договорились на удобное для меня время. Понравилось что приехали вовремя без задержек и опозданий. Качество уборки меня полностью устроило, без замечаний и переделок. В общем рекомендую, быстро и качественно а главное в удобное для меня время!'},
        {id: 4, img: "Анна_Астанина.webp", name: "Анна Астанина", date: "04.12.2023", star: 5, text: 'Как и обещали, команда профессиональных уборщиков провела генеральную уборку в моей квартире, и я осталась очень довольна результатом. Все было очень чисто и аккуратно убрано, никакой пыли и грязи не осталось. Я оценила тщательность и профессионализм работников, которые выполнили работу быстро и эффективно. Я рекомендую эту компанию всем, кто ищет высококачественные услуги по уборке. Спасибо за отличную работу!'},
        {id: 5, img: "Арина_Г.webp", name: "Арина Г.", date: "07.11.2024", star: 5, text: 'Все сделали супер! Приехали с профессиональным оборудованием, девушки-клинеры очень приятные, делают свою работу качественно! Очень понравилось! Буду пользоваться этой компанией впредь! Спасибо большое!!!🙏🙏🙏'},
        {id: 7, img: "Марина_Перевязко.webp", name: "Марина Перевязко", date: "12.12.2023", star: 5, text: 'Большое спасибо! Всё очень быстро, качественно, профессионально. Отмыли квартиру до блеска. Даже то, что казалось безнадежным, теперь сияет чистотой! Огромная благодарность за ваш труд! Не могу насмотреться на каждый уголок дома. Спасибо!'},
        {id: 8, img: "Артем_Лыжников.webp", name: "Артем Лыжников", date: "28.04.2025", star: 5, text: 'Заказал перед пасхой генеральную уборку квартиры , навели такой порядок , что я подумал что опять , квартира как новая)))'},
    ]

    return(
        <>
            <div id='reviews' className='home-reviews home-block'>
                <div className='swiper-title-pagination'>
                        <div className='reviews-title'>
                            <h2>Нам доверяют</h2>
                            <button className="swiper-button-prev-reviews">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M11.03 8.53a.75.75 0 1 0-1.06-1.06l-4 4a.748.748 0 0 0 0 1.06l4 4a.75.75 0 1 0 1.06-1.06l-2.72-2.72H18a.75.75 0 0 0 0-1.5H8.31z"/></svg>
                            </button>
                            <button className="swiper-button-next-reviews">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"/></svg>
                            </button>
                        </div>
                        <div className='reviews-2gis'>
                            <p className='avarage-rating'>{activeButton === 1 ? "5.0" : "4.9"}</p>
                            <div className='score'>
                                <div className='star'>
                                    <div className='star-icon'>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Image 
                                                key={i} 
                                                src={star} 
                                                width={22} 
                                                height={22} 
                                                alt='Звезда'
                                            />
                                        ))}
                                    </div>
                                    <div className='gis-logo'>
                                        <Image src={activeButton === 1 ? "/2gis.svg" : "/yandex.svg"} width={activeButton === 1 ? 24 : 12} height={activeButton === 1 ? 24 : 24} alt='2gis'/> {activeButton === 1 ? "2GIS" : "YANDEX"}
                                    </div>
                                </div>
                                <div className='numbers'>
                                    <p className='numbers-bold'>{activeButton === 1 ? "47" : "21"} отзывов</p>
                                    <p className='numbers-bold-dot'>•</p>
                                    <p className='numbers-thin'>{activeButton === 1 ? "52" : "24"} оценок</p>
                                </div>
                            </div>
                            <a href={activeButton === 1 ? "https://2gis.ru/kemerovo/firm/70000001081194421?m=86.102139%2C55.393166%2F16" : "https://yandex.ru/maps/org/chistodely/5737147181/reviews/?ll=86.102437%2C55.393060&rl=86.102287%2C55.393149&rlt=area&z=21"} className='go-review'>Оставить отзыв</a>
                        </div>
                </div>
                        <div className='reviews-2gis-yandex'>
                            <button className={'reviews-2gis' + (activeButton === 1 ? " active" : "")} onClick={() => setActiveButton(1)}>
                                <span>
                                    2GIS
                                </span>
                            </button>
                            <button className={'reviews-yandex' + (activeButton === 2 ? " active" : "")} onClick={() => setActiveButton(2)}>
                                <span>
                                    Yandex
                                </span>
                            </button>
                        </div>
                <Swiper
                   slidesPerView={'auto'}
                   spaceBetween={0}
                   navigation={{
                       nextEl: ".swiper-button-next-reviews",
                       prevEl: ".swiper-button-prev-reviews",
                   }}
                   modules={[Navigation]}
                   className="reviews-catalog"  
               >
                   {(activeButton === 1 ? availableReviews2gis : availableReviewsYandex).map(item => (
                       <SwiperSlide key={item.id}>
                            <div className='reviews-home-card'>
                                <div className='review-profile'>
                                    <Image src={`/Reviews/${item.img}`} width={87} height={87} alt='Отзыв o клининговой компании Чистодел'/>
                                    <div className='profile-info'>
                                        <p className='profile-name'>{item.name}</p>
                                        <p className='profile-date'>{item.date}</p>
                                        <div className='star'>
                                            {Array.from({ length: item.star }).map((_, i) => (
                                            <Image 
                                                key={i} 
                                                src={star} 
                                                width={30} 
                                                height={30} 
                                                alt='Звезда'
                                            />
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                <p className='reviews-text'>{item.text}</p>
                            </div>
                       </SwiperSlide>
                   ))}
                   
               </Swiper>
            </div>
        </>
    )
}