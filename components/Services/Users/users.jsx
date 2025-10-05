"use client";
import { useState } from "react";
import Image from "next/image"
import "./users.scss"
import Link from "next/link"
export function Users() {
    const [activeService, setActiveService] = useState(1);

    const serviceUser = [
        {img: "service_1.webp", title: "Уборка после ремонта"},
        {img: "service_2.webp", title: "Генеральная уборка"},
        {img: "service_3.webp", title: "Поддерживающая уборка"},
        {img: "service_4.webp", title: "Мытье окон"},
        {img: "service_5.webp", title: "Химчистка мебели и ковров"},
        {img: "service_6.webp", title: "Озонирование"},
    ]
        const serviceBisines = [
        {img: "service_7.webp", title: "Уборка ежедневная"},
        {img: "service_8.webp", title: "Уборка генеральная"},
        {img: "service_9.webp", title: "Уборка после ремонта"},
        {img: "service_10.webp", title: "Химчистка на выезде"},
        {img: "service_11.webp", title: "Мытьё окон"},
        {img: "service_12.webp", title: "Мытьё фасадов"},
    ]
    return (
        <>
            <div className="home-services" id="services">
                <div className="variant-services">
                    <button className={`btn ${+ activeService === 1 ? " active" : ""}`} onClick={ () => setActiveService(1)}>
                        Для физ. лиц
                    </button>
                    <button className={`btn ${+ activeService === 2 ? " active" : ""}`} onClick={ () => setActiveService(2)}>
                        Для бизнеса
                    </button>
                </div>
                <div className="users-services">
                    {(activeService === 1 ? serviceUser : serviceBisines).map((item, index) => (
                    <div className="user-service" key={index}>
                        <Image src={`/Services/${item.img}`} width={466} height={300} alt="Уборка после ремонта" />
                        <div className="consultation-button">
                            <Link href={`https://wa.me/79050783111?text=Здравствуйте! Пишу с сайта по поводу услуги: ${item.title}`} >
                                <span>
                                    Консультация
                                </span>
                                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="29" cy="29" r="29" fill="white"/>
                                    <path d="M17.6769 29.4958L17.667 29.3542C17.6667 29.0972 17.7595 28.8488 17.9283 28.655C18.0971 28.4612 18.3304 28.3351 18.585 28.3002L18.7295 28.2902L36.7155 28.2917L32.1524 23.73C31.9725 23.5501 31.8631 23.3116 31.8441 23.0579C31.8251 22.8041 31.8978 22.552 32.049 22.3473L32.151 22.2283C32.331 22.048 32.5698 21.9384 32.8238 21.9194C33.0779 21.9004 33.3303 21.9733 33.5351 22.1249L33.6541 22.2269L40.0291 28.5977C40.209 28.7776 40.3184 29.0161 40.3374 29.2698C40.3564 29.5235 40.2837 29.7757 40.1325 29.9803L40.0291 30.0993L33.6541 36.48C33.4642 36.6684 33.2104 36.7782 32.9431 36.7876C32.6759 36.797 32.4149 36.7053 32.2123 36.5308C32.0096 36.3562 31.8803 36.1117 31.85 35.846C31.8198 35.5803 31.8908 35.313 32.049 35.0973L32.151 34.9783L36.7098 30.4167H18.7295C18.4723 30.4166 18.2239 30.3232 18.0303 30.1538C17.8368 29.9845 17.7112 29.7507 17.6769 29.4958Z" fill="#0091C9"/>
                                </svg>
                            </Link>
                        </div>
                        <span>
                            {item.title}
                        </span>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}