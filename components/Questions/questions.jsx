'use client';
import { useState } from "react";
import "./questions.scss";
import Image from "next/image";

export function Questions() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqItems = [
        {
            question: "Сколько времени занимает уборка?",
            answer: "Качественная уборка квартиры занимает 6-8 часов. Уборка дома может длиться 2-4 дня! (Зависит от площади и степени загрязнения)."
        },
        {
            question: "В чем отличие генеральной уборки от повседневной?",
            answer: "Генеральная включает мытье окон, стен, потолков и труднодоступных мест. Повседневная - поддержание чистоты поверхностей и полов."
        },
        {
            question: "Как проходит уборка квартиры?",
            answer: "Сначала оцениваем объем работ, затем поэтапно очищаем все помещения. Используем профессиональную химию и оборудование."
        },
        {
            question: "Я могу оставить клинера одного в квартире?",
            answer: "Да, большинство клиентов так и делают. Наши сотрудники проверены и несут материальную ответственность за ваше имущество."
        },
        {
            question: "Как можно перенести или отменить уборку?",
            answer: "Вы можете отменить или перенести уборку бесплатно за 24 часа до начала."
        },
        {
            question: "Что нужно подготовить к приходу клинера?",
            answer: "Обеспечьте доступ к воде, розеткам и зонам уборки. Заранее сообщите об особых пожеланиях. Остальное - наша забота!"
        },
        {
            question: "Как можно оплатить ваши услуги?",
            answer: "Оплата производится после уборки наличными, картой или переводом. Предоставляем чек и гарантию на работы."
        },
        {
            question: "Сколько сотрудников выезжают на уборку?",
            answer: "На квартиру до 60 м² - 1 клинер, от 60 до 100 м² - 2 специалиста, свыше 100 м² - команда из 3 человек."
        }
    ];

    const toggleItem = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="questions" id="questions">
            <h2>У нас уже есть ответы на ваши вопросы</h2>
            <div className="question-list">
                {faqItems.map((item, index) => (
                    <div key={index} className="question-conteiner">
                        <div className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="accordion-header">
                                <h2>{item.question}</h2>
                                <div className={`accordion-text ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="accordion-body">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                            <button 
                                className={`button-question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleItem(index)}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.432 15.852V0.947999H9.052V15.852H7.432ZM0.592 9.192V7.644H15.892V9.192H0.592Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}