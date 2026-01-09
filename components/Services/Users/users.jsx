'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './users.scss';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { UrMore } from './Ur_more';

export function Users() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeService, setActiveService] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTabChanged, setHasTabChanged] = useState(false);

  useEffect(() => {
    if (tabParam === '1') {
      setActiveService(1);
    }
    if (tabParam === '2') {
      setActiveService(2);
    }
  }, [tabParam]);

  useEffect(() => {
    if (!hasTabChanged && tabParam) {
      setHasTabChanged(true);
      return;
    }

    if (hasTabChanged && tabParam) {
      const element = document.getElementById('services');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }

      setTimeout(() => {
        const newUrl = window.location.pathname + '#services';
        window.history.replaceState(null, '', newUrl);
      }, 600);
    }
  }, [tabParam, hasTabChanged]);

  const serviceUser = [
    {
      img: 'service_1.webp',
      title: 'Уборка после ремонта',
      description:
        'При уборке после ремонта мы удаляем пятна краски, остатки скотча, следы силикона и т.д. Для того, чтобы убрать эти загрязнения и при этом не повредить отделочные материалы, элементы интерьера и экстерьера, мы постоянно проходим обучения, используем специализированное оборудование и профессиональные химические средства. Рекомендуем проводить после полного завершения всех строительных и отделочных работ.',
    },
    {
      img: 'service_2.webp',
      title: 'Генеральная уборка',
      description:
        'При Генеральной уборке мы удаляем грязь, жир, нагар и ржавчину практически с любых поверхностей. Для того, чтобы убрать эти загрязнения и при этом не повредить отделочные материалы, элементы интерьера и экстерьера, мы постоянно проходим обучения, а в работе используем специализированное оборудование и профессиональные химические средства. Рекомендуем проводить 2–3 раза в год. Подходит также, если был переезд или весёлый корпоратив.',
    },
    {
      img: 'service_3.webp',
      title: 'Поддерживающая уборка',
      description:
        'Поддерживающая уборка позволят быстро навести чистоту. Обычно поддерживающая уборка проводится от 1 до 4 раз в месяц. При подписке на такую уборку мы предоставляем индивидуальную скидку, её размер зависит от количества уборок в месяц и особенностей вашего дома. На заказы по поддерживающей уборке обычно выезжает 1 или 2 клинера. А сама уборка длиться от 3 до 6 часов в зависимости от площади помещения. Во время поддерживающей уборки проводится влажная очистка поверхностей, удаляются лёгкие загрязнения.',
    },
    {
      img: 'service_4.webp',
      title: 'Мытье окон',
      description:
        'Мы тщательно моем не только стёкла, но и весь оконный блок полностью (в том числе резинки, пазы, петли) с помощью современных средств и технологий. Справляемся с самыми сложными загрязнениями (остатки цемента, монтажной пены, краски, скотча). А так же удаляем прикипевшую защитную плёнку с оконных рам, сохраняя поверхности в первозданном виде.',
    },
    {
      img: 'service_5.webp',
      title: 'Химчистка мебели и ковров',
      description:
        'Мы умело и качественно чистим диваны, матрасы, кресла, стулья от следов сока, чая, фломастеров, авторучек, мочи и многих других пятен. Наши опытные мастера работают профессиональными моющими пылесосами (экстракторами) с применением пятновыводителей и очистителей. Конечно же, мы обязательно учитываем тип обивки и удаляем не только пятна, но и устраняем общую загрязнённость поверхности. В результате мебель приобретает отличный внешний вид и готова к эксплуатации уже через 4–5 часов.',
    },
    {
      img: 'service_6.webp',
      title: 'Озонирование',
      description:
        'Озонирование — это экологически чистая технология борьбы с вредными примесями и бактериями, витающими в воздухе, которая основана на использовании озона (мощного окислителя).',
    },
  ];

  const serviceBisines = [
    {
      img: 'service_7.webp',
      title: 'Уборка ежедневная',
      description:
        'Ежедневная уборка офисных и коммерческих помещений для поддержания чистоты и порядка.',
    },
    {
      img: 'service_8.webp',
      title: 'Уборка генеральная',
      description:
        'Комплексная уборка бизнес-помещений с тщательной обработкой всех зон и поверхностей.',
    },
    {
      img: 'service_9.webp',
      title: 'Уборка после ремонта',
      description:
        'Специализированная уборка коммерческих помещений после завершения ремонтных работ.',
    },
    {
      img: 'service_10.webp',
      title: 'Химчистка на выезде',
      description:
        'Выездная химчистка офисной мебели, ковровых покрытий и корпусной мебели.',
    },
    {
      img: 'service_11.webp',
      title: 'Мытьё окон',
      description:
        'Мытье витрин, фасадного остекления и внутренних оконных конструкций бизнес-помещений.',
    },
    {
      img: 'service_12.webp',
      title: 'Мытьё фасадов',
      description:
        'Профессиональная мойка фасадов зданий и наружных поверхностей коммерческих объектов.',
    },
  ];

  const handleCardClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleServiceChange = (serviceNumber) => {
    setActiveService(serviceNumber);
    setHasTabChanged(true);
  };

  return (
    <>
      <div className='home-services' id='services'>
        <div className='variant-services'>
          <button
            className={`btn ${activeService === 1 ? ' active' : ''}`}
            onClick={() => handleServiceChange(1)}
          >
            Для физ. лиц
          </button>
          <button
            className={`btn ${activeService === 2 ? ' active' : ''}`}
            onClick={() => handleServiceChange(2)}
          >
            Для бизнеса
          </button>
        </div>
        <div className='users-services'>
          {(activeService === 1 ? serviceUser : serviceBisines).map(
            (item, index) => (
              <div
                className='user-service'
                key={index}
                onClick={() => handleCardClick(item)}
              >
                <Image
                  src={`/Services/${item.img}`}
                  width={466}
                  height={300}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && selectedService && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-image'>
              <Image
                src={`/Services/${selectedService.img}`}
                width={400}
                height={250}
                alt={selectedService.title}
              />
            </div>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>
            <div className='modal-actions'>
              <Link
                href={`https://t.me/chistodely42?text=Здравствуйте! Пишу с сайта по поводу услуги: ${selectedService.title}`}
                className='telegram-button'
                target='_blank'
              >
                Заказать в Telegram
              </Link>
              <button className='close-button' onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
      <UrMore style={{ display: activeService === 2 ? 'block' : 'none' }} />
    </>
  );
}
