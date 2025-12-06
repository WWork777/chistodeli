// components/NewYearModal/NewYearModal.jsx
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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenNewYearModal');
    
    const timer = setTimeout(() => {
      if (!hasSeenModal) {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenNewYearModal', 'true');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return cleanPhone.length >= 11;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие';
    }
    
    return newErrors;
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      let numbers = value.replace(/[^\d]/g, '');
      if (numbers.length > 0) {
        if (!numbers.startsWith('7') && !numbers.startsWith('8')) {
          numbers = '7' + numbers;
        }
        numbers = numbers.substring(0, 11);
        
        let formatted = '+7';
        if (numbers.length > 1) formatted += ' (' + numbers.substring(1, 4);
        if (numbers.length > 4) formatted += ') ' + numbers.substring(4, 7);
        if (numbers.length > 7) formatted += '-' + numbers.substring(7, 9);
        if (numbers.length > 9) formatted += '-' + numbers.substring(9, 11);
        
        setFormData(prev => ({ ...prev, [name]: formatted }));
      } else {
        setFormData(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      setErrors({});
      
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          source: 'newyear_modal'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка отправки');
      }

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        throw new Error('Не удалось отправить заявку');
      }
      
    } catch (error) {
      console.error('Ошибка:', error);
      setErrors({ 
        submit: 'Ошибка отправки. Позвоните нам: +7 (905) 078-31-11' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.winterBackground}>
        <div className={styles.treeLeft}>🎄</div>
        <div className={styles.treeRight}>🎄</div>
        <div className={styles.snowflakes}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.snowflake}></div>
          ))}
        </div>
      </div>
      
      <div className={styles.modalContent}>
        <button 
          className={styles.closeButton} 
          onClick={handleClose}
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>
        
        {success ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <h2>Отправлено!</h2>
            <p>Заявка ушла в WhatsApp.</p>
            <p>Ждите звонка!</p>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.title}>
                <h2>🎄 НОВОГОДНЯЯ АКЦИЯ 🎄</h2>
              </div>
              <div className={styles.giftTag}>
                <span>🎁 ХИМЧИСТКА ДИВАНА В ПОДАРОК!</span>
              </div>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.offerText}>
                Закажите генеральную уборку до 31 декабря
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={errors.name ? styles.inputError : ''}
                  />
                  {errors.name && (
                    <div className={styles.errorMessage}>{errors.name}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={errors.phone ? styles.inputError : ''}
                  />
                  {errors.phone && (
                    <div className={styles.errorMessage}>{errors.phone}</div>
                  )}
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={errors.agreement ? styles.checkboxError : ''}
                  />
                  <label htmlFor="agreement">
                    Согласен на обработку данных
                  </label>
                  {errors.agreement && (
                    <div className={styles.errorMessage}>{errors.agreement}</div>
                  )}
                </div>

                {errors.submit && (
                  <div className={styles.submitError}>{errors.submit}</div>
                )}

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className={styles.loading}>
                      <span className={styles.spinner}></span>
                      Отправляем...
                    </span>
                  ) : (
                    'ПОЛУЧИТЬ ПОДАРОК'
                  )}
                </button>
              </form>
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.deadline}>
                ⏰ Акция действует до 31.12.2025
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewYearModal;