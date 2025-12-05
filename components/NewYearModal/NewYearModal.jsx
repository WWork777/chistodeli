// components/NewYearModal/NewYearModal.jsx - обновленный
'use client';

import { useEffect, useState } from 'react';
import styles from './NewYearModal.module.scss';
import { X } from 'lucide-react';

const NewYearModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreement: false
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определяем мобильное устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || window.innerHeight <= 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Проверяем, показывалось ли уже модальное окно
    const hasSeenModal = sessionStorage.getItem('hasSeenNewYearModal');
    
    const timer = setTimeout(() => {
      if (!hasSeenModal) {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenNewYearModal', 'true');
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleClose();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время!');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // На мобильных предотвращаем скролл body
  useEffect(() => {
    if (isVisible && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, isMobile]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Закрыть">
          <X size={isMobile ? 20 : 24} />
        </button>
        
        {/* Снежинки показываем только на десктопе или больших экранах */}
        {!isMobile && (
          <>
            <div className={styles.snowflake}>❄</div>
            <div className={styles.snowflake2}>❄</div>
            <div className={styles.snowflake3}>❄</div>
          </>
        )}
        
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>НОВОГОДНЯЯ АКЦИЯ</h2>
          <div className={styles.giftBadge}>🎁 ПОДАРОК</div>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.offerText}>
            При заказе генеральной уборки квартиры — 
            <span className={styles.highlight}> мытьё окон внутри в ПОДАРОК!</span>
          </p>
          
          <p className={styles.callToAction}>
            Свяжитесь с нами прямо сейчас и подарите себе идеальное начало нового года.
          </p>

          <div className={styles.deadline}>
            ⏰ Акция действует до <strong>31.12.2025!</strong>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Как вас зовут?</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Телефон для связи</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+7 (000) 000-00-00"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[-]?\d{2}[-]?\d{2}"
                autoComplete="tel"
              />
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreement">
                Нажимая на кнопку &quot;рассчитать стоимость уборки&quot; вы даете согласие на обработку персональных данных на основании политики конфиденциальности
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              📋 Рассчитать стоимость
            </button>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.newYearDecoration}>
            <span className={styles.ornament}>✨</span>
            <span className={styles.ornament}>🎄</span>
            <span className={styles.ornament}>🎅</span>
            <span className={styles.ornament}>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewYearModal;