'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './users.scss';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { UrMore } from './Ur_more';
import { serviceUser, serviceBisines } from '@/data/services.data';

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
            (item) => (
              <Link
                href={`/${item.slug}`}
                className='user-service'
                key={item.id}
              >
                <Image
                  src={`/Services/${item.img}`}
                  width={466}
                  height={300}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </Link>
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