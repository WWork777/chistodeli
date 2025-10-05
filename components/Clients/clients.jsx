"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import "./clients.scss";

export function Clients() {
    const availableClients = [
        {id: 1, img: "Clients_1.webp", width: 250, height: 250},
        {id: 2, img: "Clients_2.webp", width: 417, height: 153},
        {id: 3, img: "Clients_3.webp", width: 358, height: 200},
        {id: 4, img: "Clients_4.webp", width: 277, height: 277},
        {id: 5, img: "Clients_1.webp", width: 250, height: 250},
        {id: 6, img: "Clients_2.webp", width: 417, height: 153},
        {id: 7, img: "Clients_3.webp", width: 358, height: 200},
        {id: 8, img: "Clients_4.webp", width: 277, height: 277},
    ]

    return (
        <div className="clients">
            <div className="clients-text">
                <h2>Работаем со множеством организаций</h2>
                <p>Наш корпоративный отдел всегда готов к сотрудничеству</p>
            </div>
            
            <div className="clients-catalog">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={0}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                >
                    {availableClients.map(item => (
                        <SwiperSlide key={item.id}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}>
                                <Image 
                                    src={`/Clients/${item.img}`} 
                                    width={item.width} 
                                    height={item.height} 
                                    alt="Компании с которыми мы сотрудничаем"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}