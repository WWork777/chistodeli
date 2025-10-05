import Image from "next/image"
import background from "../../../public/background_hero.webp"
import woman from "../../../public/hero_woman_item.webp"
import Link from "next/link"
import "./hero.scss"
import { OffCanvas } from "../OfCanvas/ofCanvas"
export function Hero() {
    return (
    <>
    <OffCanvas />
    <div className="hero">
        <Image className="hero-background" src={background} width={1920} height={1080} alt="Профессиональный клининг"/>
        <div className="hero-content">
            <div className="hero-slogan">
                <h1>Чистота без усилий: Профессиональный<br/>клининг для вашего дома и бизнеса!</h1>
                <span>Уборка квартир и домов, клининг после ремонта,<br/>уборка офисов и любых других помещений</span>
            </div>
            <div className="hero-button">
                <Link href={"#calculate"}>
                    <span>Расчёт стоимости</span>
                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="29" cy="29" r="29" fill="white"/>
                        <path d="M17.6769 29.4958L17.667 29.3542C17.6667 29.0972 17.7595 28.8488 17.9283 28.655C18.0971 28.4612 18.3304 28.3351 18.585 28.3002L18.7295 28.2902L36.7155 28.2917L32.1524 23.73C31.9725 23.5501 31.8631 23.3116 31.8441 23.0579C31.8251 22.8041 31.8978 22.552 32.049 22.3473L32.151 22.2283C32.331 22.048 32.5698 21.9384 32.8238 21.9194C33.0779 21.9004 33.3303 21.9733 33.5351 22.1249L33.6541 22.2269L40.0291 28.5977C40.209 28.7776 40.3184 29.0161 40.3374 29.2698C40.3564 29.5235 40.2837 29.7757 40.1325 29.9803L40.0291 30.0993L33.6541 36.48C33.4642 36.6684 33.2104 36.7782 32.9431 36.7876C32.6759 36.797 32.4149 36.7053 32.2123 36.5308C32.0096 36.3562 31.8803 36.1117 31.85 35.846C31.8198 35.5803 31.8908 35.313 32.049 35.0973L32.151 34.9783L36.7098 30.4167H18.7295C18.4723 30.4166 18.2239 30.3232 18.0303 30.1538C17.8368 29.9845 17.7112 29.7507 17.6769 29.4958Z" fill="#0091C9"/>
                    </svg>
                </Link>
            </div>
            <div className="hero-advantage">
                <div className="advantage">
                    <span>10</span>
                    <span>лет опыта работы</span>
                </div>
                <div className="advantage">
                    <span>1093</span>
                    <span>уборки мы провели<br/>за 2025 год</span>
                </div>
                <div className="advantage">
                    <span>92%</span>
                    <span>клиентов<br/>возвращаются к нам</span>
                </div>
            </div>
            <Image className="woman-img" src={woman} width={721} height={877} alt="Клининг" />
        </div>
    </div>
    </>
    )
}