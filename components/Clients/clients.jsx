"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "./clients.scss";

export function Clients() {
  const availableClients = [
    {
      id: 1,
      img: "Автокласс.webp",
      title: "Автокласс",
      name: "Казанин Константин",
      review:
        "Команда профессионалов всегда вежлива и внимательна к нашим пожеланиям. Мы отмечаем высокий уровень ответственности и аккуратности в работе. Также радует, что используются современные средства для уборки, что обеспечивает не только чистоту, но и безопасность для сотрудников.",
    },
    {
      id: 2,
      img: "Сибцообр.webp",
      title: "Сибцообр",
      name: "Романова Ирина",
      review:
        "Команда профессионалов проявила высокий уровень ответственности и внимательности к деталям, что позволило нам быстро подготовить клинику к открытию. Уборка проводится регулярно и на высоком уровне, что создает комфортную и чистую атмосферу для наших пациентов.",
    },
    {
      id: 3,
      img: "Ирина.webp",
      title: 'Клиника "Ирина"',
      name: "Ударцева Екатерина",
      review:
        "Хочу поделиться своим положительным опытом работы с клининговой компанией. С самого начала нашего сотрудничества мы заметили значительное улучшение чистоты и порядка в офисе. Команда всегда выполняет свои задачи качественно и вовремя, что для нас очень важно.",
    },
  ];
  return (
    <div className="clients">
      <div className="clients-text">
        <h2>Работаем со множеством организаций</h2>
        <p>Наш корпоративный отдел всегда готов к сотрудничеству</p>
      </div>

      <div className="clients-catalog">
        <Swiper
          spaceBetween={35}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            375: {
              slidesPerView: 1,
            },
            1500: {
              slidesPerView: 2,
            },
          }}
        >
          {availableClients.map((item) => (
            <SwiperSlide key={item.id}>
              {/* <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}> */}
              <div className="client">
                <Image
                  src={`/Clients/${item.img}`}
                  width={250}
                  height={333}
                  alt="Компании с которыми мы сотрудничаем"
                />
                <div className="client-text">
                  <h3>{item.title}</h3>
                  <span>{item.name}</span>
                  <p>{item.review}</p>
                </div>
              </div>
              {/* </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
