
"use client";
import { useState, useEffect } from 'react';
import Image from "next/image"
import logo from "../../../public/logo.svg"
import Link from "next/link"
import "./header.scss"

export function Header({ onOpenOffcanvas }) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasBackground, setHasBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            if (currentScrollY > 50) {
                setHasBackground(true);
            } else {
                setHasBackground(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={"header" + (!isVisible ? " hidden" : '') + (hasBackground ? " withBackground" : '')}>
            <div className="header-logo"><Image src={logo} width={210} height={95} alt="Чистоделы"></Image></div>
            <svg 
                className="burger" 
                onClick={onOpenOffcanvas}
                id="Line" 
                enableBackground="new 0 0 32 32" 
                viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path id="XMLID_174_" d="m26 16c0 .552-.448 1-1 1h-18c-.552 0-1-.448-1-1s.448-1 1-1h18c.552 0 1 .448 1 1z" fill="#000000" ></path>
                <path id="XMLID_176_" d="m26 25c0 .553-.448 1-1 1h-18c-.552 0-1-.447-1-1s.448-1 1-1h18c.552 0 1 .447 1 1z" fill="#000000" ></path>
                <path id="XMLID_178_" d="m6 7c0-.552.448-1 1-1h18c.552 0 1 .448 1 1s-.448 1-1 1h-18c-.552 0-1-.448-1-1z" fill="#000000" ></path>
            </svg>
            <nav className="navigate-menu">
                <div className="menu">
                    <Link href={"#services"}>Услуги</Link>
                    <Link href={"#calculate"}>Калькулятор</Link>
                    <Link href={"#works"}>Наши работы</Link>
                    <Link href={"#questions"}>Вопросы</Link>
                    <Link href={"#reviews"}>Отзывы</Link>
                </div>
                <div className="contacts">
                    <div className="phone-city">
                        <div className="phone">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_378_160)">
                                    <path d="M7.91567 4.68L5.37842 1.75125C5.08592 1.41375 4.54967 1.41525 4.20992 1.75575L2.12342 3.846C1.50242 4.46775 1.32467 5.391 1.68392 6.13125C3.83014 10.575 7.41396 14.1638 11.8547 16.3162C12.5942 16.6755 13.5167 16.4977 14.1377 15.876L16.2437 13.7662C16.5849 13.425 16.5857 12.8857 16.2452 12.5932L13.3052 10.0695C12.9977 9.8055 12.5199 9.84 12.2117 10.149L11.1887 11.1735C11.1363 11.2284 11.0674 11.2646 10.9924 11.2765C10.9175 11.2884 10.8407 11.2754 10.7739 11.2395C9.10176 10.2766 7.71467 8.88767 6.75392 7.21425C6.71794 7.14731 6.70492 7.07042 6.71684 6.99537C6.72876 6.92031 6.76497 6.85124 6.81992 6.79875L7.83992 5.778C8.14892 5.4675 8.18267 4.98825 7.91567 4.68Z" stroke="#0091C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_378_160">
                                        <rect width="18" height="18" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <Link href={"tel:+79050783111"}>+7 (905) 078-31-11 </Link>
                        </div>
                        <div className="city">
                            <select name="options" id="exampleSelect">  
                                <option value="volvo">Кемерово</option>  
                                <option value="saab">Нижний Новгород</option>  
                                <option value="fiat">Саратов</option>  
                                <option value="audi">Сочи</option>
                                <option value="audi">Калининград</option>  
                            </select>
                        </div>
                    </div>
                    <div className="icons">
                        <Link className="icon" href={"https://t.me/TanushaSmir"}>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_321_348)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.517578 14.5C0.517578 12.6638 0.879237 10.8457 1.58191 9.14927C2.28457 7.45287 3.31449 5.91149 4.61285 4.61313C5.91121 3.31477 7.45259 2.28485 9.14899 1.58218C10.8454 0.879515 12.6636 0.517857 14.4997 0.517857C16.3359 0.517857 18.1541 0.879515 19.8505 1.58218C21.5468 2.28485 23.0882 3.31477 24.3866 4.61313C25.685 5.91149 26.7149 7.45287 27.4175 9.14927C28.1202 10.8457 28.4819 12.6638 28.4819 14.5C28.4819 18.2083 27.0087 21.7647 24.3866 24.3869C21.7644 27.009 18.208 28.4821 14.4997 28.4821C10.7914 28.4821 7.23501 27.009 4.61285 24.3869C1.99069 21.7647 0.517578 18.2083 0.517578 14.5ZM19.1646 22.9183L21.3292 6.48771L4.41601 14.6388L9.42265 16.4534L14.9865 12.1531C15.0942 12.07 15.2173 12.0089 15.3486 11.9733C15.4799 11.9378 15.617 11.9284 15.7519 11.9459C15.8868 11.9633 16.017 12.0071 16.135 12.0748C16.253 12.1425 16.3565 12.2328 16.4396 12.3405C16.5227 12.4483 16.5838 12.5713 16.6193 12.7026C16.6549 12.8339 16.6642 12.971 16.6468 13.1059C16.6294 13.2408 16.5856 13.371 16.5179 13.489C16.4502 13.607 16.3599 13.7105 16.2521 13.7936L11.637 17.3586V23.0053L15.1274 19.6827L19.1646 22.9183Z" fill="#0091C9"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_321_348">
                                        <rect width="29" height="29" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                        <Link className="icon" href={"https://wa.me/79050783111"}>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_290_300)">
                                    <path d="M29 14.1269C29 21.9285 22.6264 28.2529 14.7624 28.2529C12.2669 28.2529 9.92262 27.6146 7.88193 26.4969L0 29L2.56931 21.4188C1.27378 19.2911 0.527668 16.7927 0.527668 14.126C0.528614 6.32445 6.90035 0 14.7643 0C22.6273 0.00189128 29 6.3254 29 14.1269ZM14.7615 2.25252C8.16183 2.25252 2.79343 7.58027 2.79343 14.1298C2.79343 16.7284 3.64072 19.1341 5.07337 21.0916L3.57925 25.5011L8.17697 24.0401C10.0682 25.2808 12.3312 26.0033 14.7615 26.0033C21.3611 26.0033 26.7314 20.6765 26.7314 14.1269C26.7333 7.58027 21.362 2.25252 14.7615 2.25252ZM21.9521 17.3809C21.8632 17.2381 21.6306 17.1511 21.2826 16.9771C20.9356 16.8031 19.2173 15.9662 18.8987 15.8527C18.5771 15.7364 18.3445 15.6778 18.1119 16.0248C17.8821 16.3719 17.2126 17.1511 17.0074 17.3837C16.8041 17.6154 16.6007 17.6447 16.2518 17.4736C15.9029 17.2977 14.7775 16.9346 13.4442 15.7553C12.4068 14.8362 11.7061 13.7042 11.5037 13.3572C11.2985 13.0111 11.4829 12.8238 11.656 12.6517C11.812 12.4957 12.0049 12.247 12.1799 12.0437C12.3548 11.8423 12.4125 11.6995 12.5288 11.4678C12.6432 11.2361 12.5855 11.0347 12.4995 10.8598C12.4125 10.6858 11.7156 8.9836 11.4234 8.29044C11.133 7.59823 10.8427 7.71266 10.6385 7.71266C10.4352 7.71266 10.2025 7.68429 9.9699 7.68429C9.73727 7.68429 9.35902 7.76845 9.04034 8.1155C8.72166 8.46255 7.81951 9.29944 7.81951 11.0035C7.81951 12.7094 9.06871 14.3539 9.24365 14.5846C9.41954 14.8144 11.6588 18.4258 15.2059 19.8121C18.7549 21.1975 18.7549 20.7351 19.3942 20.6765C20.0353 20.6178 21.4595 19.8396 21.7488 19.032C22.0401 18.2206 22.0401 17.5256 21.9521 17.3809Z" fill="#0091C9"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_290_300">
                                        <rect width="29" height="29" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                        <Link className="icon" href={"https://vk.com/id848910555"}>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_290_299)">
                                    <path d="M15.1123 0C21.6675 0 24.9631 0.000332922 26.9814 2.03613C28.9998 4.07194 29 7.35001 29 13.8877V15.1123C29 21.6512 29.0172 24.9281 26.9814 26.9639C24.9456 28.9997 21.6675 29 15.1123 29H13.9053C7.34896 29 4.07194 28.9997 2.03613 26.9639C0.000340052 24.9281 0 21.6513 0 15.1123V13.8877C0 7.34761 0.000340052 4.07194 2.03613 2.03613C4.07194 0.000340053 7.34896 0 13.9053 0H15.1123ZM4.90039 8.83301C5.05468 16.3718 9.02357 20.9092 15.5625 20.9092H15.9414V16.5957C18.3217 16.837 20.0992 18.6147 20.8242 20.9092H24.2568C23.3254 17.4769 20.9102 15.5786 19.4092 14.8535C20.9101 13.9567 23.0313 11.7827 23.5312 8.83301H20.4102C19.7537 11.2307 17.8043 13.4048 15.9414 13.6113V8.83301H12.7666V17.2002C10.8352 16.7211 8.31613 14.3707 8.21289 8.83301H4.90039Z" fill="#0091C9"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_290_299">
                                        <rect width="29" height="29" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}