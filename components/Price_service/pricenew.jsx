'use client';

import { useState } from 'react';
import styles from './pricenew.module.scss';
import PrivacyPolicyModal from './political_confidencial';

export default function CleaningCalculator() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    user: 'Физическое лицо',
    service: 'Генеральная уборка',
    rooms: '1',
    square: 1,
    name: '',
    phone: '+7',
    comment: '',
    additionalservices: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const additionalServices = [
    { 
      id: 1, 
      name: 'Мытьё окон', 
      price: '700P шт.', 
      type: 'counter',
      value: 'Мытьё окон',
      priceValue: 700,
      calculationType: 'perUnit'
    },
    { 
      id: 2, 
      name: 'Удаление пыли с оконных рам', 
      price: '+ 20%', 
      type: 'button',
      value: 'Удаление пыли с оконных рам',
      priceValue: 20,
      calculationType: 'percentage'
    },
    { 
      id: 3, 
      name: 'Уборка балкона с мытьем окон', 
      price: 'от 2500P', 
      type: 'button',
      value: 'Уборка балкона с мытьем окон',
      priceValue: 2500,
      calculationType: 'fixed'
    },
    { 
      id: 4, 
      name: 'Мытьё кухонных ящиков', 
      price: '1000P', 
      type: 'button',
      value: 'Мытьё кухонных ящиков',
      priceValue: 1000,
      calculationType: 'fixed'
    },
    { 
      id: 5, 
      name: 'Мытьё вытяжки', 
      price: '700P', 
      type: 'button',
      value: 'Мытьё вытяжки',
      priceValue: 700,
      calculationType: 'fixed'
    },
    { 
      id: 6, 
      name: 'Мытьё посудомоечной машины', 
      price: '500P', 
      type: 'button',
      value: 'Мытьё посудомоечной машины',
      priceValue: 500,
      calculationType: 'fixed'
    },
    { 
      id: 7, 
      name: 'Мытьё холодильника внутри', 
      price: '1000P шт.', 
      type: 'counter',
      value: 'Мытьё холодильника внутри',
      priceValue: 1000,
      calculationType: 'perUnit'
    },
    { 
      id: 8, 
      name: 'Мытьё духового шкафа', 
      price: '1000P', 
      type: 'button',
      value: 'Мытьё духового шкафа',
      priceValue: 1000,
      calculationType: 'fixed'
    },
    { 
      id: 9, 
      name: 'Мытьё микроволновой печи', 
      price: '500P', 
      type: 'button',
      value: 'Мытьё микроволновой печи',
      priceValue: 500,
      calculationType: 'fixed'
    },
    { 
      id: 10, 
      name: 'Мытьё посуды', 
      price: '500P', 
      type: 'button',
      value: 'Мытьё посуды',
      priceValue: 500,
      calculationType: 'fixed'
    },
    { 
      id: 11, 
      name: 'Удаление шерсти дом. животных', 
      price: '2000P', 
      type: 'button',
      value: 'Удаление шерсти дом. животных',
      priceValue: 2000,
      calculationType: 'fixed'
    },
    { 
      id: 12, 
      name: 'Химчистка мягкой мебели', 
      price: '2500P шт.', 
      type: 'counter',
      value: 'Химчистка мягкой мебели, ковров',
      priceValue: 2500,
      calculationType: 'perUnit'
    },
    { 
      id: 14, 
      name: 'Озонирование', 
      price: '2500P', 
      type: 'button',
      value: 'Озонирование',
      priceValue: 2500,
      calculationType: 'fixed'
    },
  ];

  // Расчет базовой стоимости
  const calculateBasePrice = () => {
    const pricePerSquare = 250;
    return formData.square * pricePerSquare;
  };

  // Расчет стоимости дополнительных услуг
  const calculateAdditionalPrice = () => {
    let additionalPrice = 0;
    const basePrice = calculateBasePrice();

    // Создаем объект для подсчета количества каждой услуги
    const serviceCounts = {};
    formData.additionalservices.forEach(service => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });

    // Сначала считаем фиксированные и поштучные
    Object.keys(serviceCounts).forEach(serviceValue => {
      const service = additionalServices.find(s => s.value === serviceValue);
      const count = serviceCounts[serviceValue];
      
      if (service && service.priceValue > 0) {
        if (service.calculationType === 'fixed') {
          // Фиксированные - одна цена независимо от количества
          additionalPrice += service.priceValue;
        } else if (service.calculationType === 'perUnit') {
          // Поштучные - цена × количество
          additionalPrice += service.priceValue * count;
        }
      }
    });

    // Затем процентные надбавки (от общей базовой стоимости)
    Object.keys(serviceCounts).forEach(serviceValue => {
      const service = additionalServices.find(s => s.value === serviceValue);
      if (service && service.calculationType === 'percentage') {
        additionalPrice += basePrice * (service.priceValue / 100);
      }
    });

    return Math.round(additionalPrice);
  };

  // Общая стоимость
  const totalPrice = calculateBasePrice() + calculateAdditionalPrice();

  const handleServiceChange = (serviceValue, type, action = 'toggle') => {
    setFormData(prev => {
      let newServices;
      
      if (type === 'counter') {
        const service = additionalServices.find(s => s.value === serviceValue);
        
        if (action === 'increment') {
          // Добавляем одну штуку
          newServices = [...prev.additionalservices, serviceValue];
        } else if (action === 'decrement') {
          // Убираем одну штуку (последнюю)
          const lastIndex = prev.additionalservices.lastIndexOf(serviceValue);
          if (lastIndex !== -1) {
            newServices = [...prev.additionalservices];
            newServices.splice(lastIndex, 1);
          } else {
            newServices = prev.additionalservices;
          }
        } else {
          newServices = prev.additionalservices;
        }
      } else {
        // Для кнопочных услуг - toggle
        if (prev.additionalservices.includes(serviceValue)) {
          newServices = prev.additionalservices.filter(item => item !== serviceValue);
        } else {
          newServices = [...prev.additionalservices, serviceValue];
        }
      }
      
      return {
        ...prev,
        additionalservices: newServices
      };
    });
  };

  const getServiceCount = (serviceValue) => {
    return formData.additionalservices.filter(item => item === serviceValue).length;
  };

  const isServiceSelected = (serviceValue) => {
    return formData.additionalservices.includes(serviceValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let cleanedValue = value;
      if (value.startsWith('+')) {
        cleanedValue = '+' + value.slice(1).replace(/\D/g, '');
      } else {
        cleanedValue = value.replace(/\D/g, '');
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: cleanedValue
      }));

      let phoneDigits = cleanedValue;
      if (cleanedValue.startsWith('+')) {
        phoneDigits = cleanedValue.slice(1).replace(/\D/g, '');
      } else {
        phoneDigits = cleanedValue.replace(/\D/g, '');
      }
      
      setIsPhoneValid(phoneDigits.length === 11);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePaste = (e) => {
    if (e.target.name === 'phone') {
      const pastedText = e.clipboardData.getData('text');
      
      let cleanedValue = pastedText;
      if (pastedText.startsWith('+')) {
        cleanedValue = '+' + pastedText.slice(1).replace(/\D/g, '');
      } else {
        cleanedValue = pastedText.replace(/\D/g, '');
      }
      
      setFormData(prev => ({
        ...prev,
        phone: cleanedValue
      }));

      let phoneDigits = cleanedValue;
      if (cleanedValue.startsWith('+')) {
        phoneDigits = cleanedValue.slice(1).replace(/\D/g, '');
      } else {
        phoneDigits = cleanedValue.replace(/\D/g, '');
      }
      
      setIsPhoneValid(phoneDigits.length === 11);
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let phoneDigits = formData.phone;
    if (formData.phone.startsWith('+')) {
      phoneDigits = formData.phone.slice(1).replace(/\D/g, '');
    } else {
      phoneDigits = formData.phone.replace(/\D/g, '');
    }
    
    if (phoneDigits.length !== 11) {
      alert('Номер телефона должен содержать 11 цифр');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sendCleaningOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalPrice: totalPrice,
          basePrice: calculateBasePrice(),
          additionalPrice: calculateAdditionalPrice(),
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          user: 'Физическое лицо',
          service: 'Генеральная уборка',
          rooms: '1',
          square: 1,
          name: '',
          phone: '+7',
          comment: '',
          additionalservices: [],
        });
      } else {
        throw new Error('Ошибка при отправке');
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Если заявка отправлена, показываем сообщение об успехе
  if (isSubmitted) {
    return (
      <div className={styles.calculator}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Спасибо за заявку!</h2>
          <p className={styles.successText}>
            Мы получили вашу заявку и свяжемся с вами в ближайшее время для уточнения деталей.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className={styles.successButton}
          >
            Отправить новую заявку
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className={styles.calculator} id="calculate">
      <h1 className={styles.title}>Рассчитать уборку</h1>

      {/* Тип лица */}
      <div className={styles.section}>
        <div className={styles.personType}>
          <button 
            onClick={() => setFormData(prev => ({...prev, user: 'Физическое лицо'}))}
            className={`${styles.personButton} ${
              formData.user === 'Физическое лицо' ? styles.personButtonActive : ''
            }`}
          >
            Физ. лицо
          </button>
          <button 
            onClick={() => setFormData(prev => ({...prev, user: 'Юридическое лицо'}))}
            className={`${styles.personButton} ${
              formData.user === 'Юридическое лицо' ? styles.personButtonActive : ''
            }`}
          >
            Юр. лицо
          </button>
        </div>

        {/* Основные параметры */}
        <div className={styles.parameters}>
          <div className={styles.parameter}>
            <label className={styles.label}>Кол-во комнат:</label>
            <select 
              name="rooms"
              value={formData.rooms}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="1">1 комната</option>
              <option value="2">2 комнаты</option>
              <option value="3">3 комнаты</option>
              <option value="4">4 комнаты</option>
            </select>
          </div>

          <div className={styles.parameter}>
            <label className={styles.label}>Площадь:</label>
            <div className={styles.areaInput}>
              <input
                type="number"
                name="square"
                value={formData.square}
                onChange={handleInputChange}
                className={styles.input}
              />
              <span className={styles.areaUnit}>кв. м.</span>
            </div>
          </div>
        </div>

        {/* Тип уборки */}
        <div className={styles.cleaningType}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="service"
              value="Генеральная уборка"
              checked={formData.service === 'Генеральная уборка'}
              onChange={handleInputChange}
              className={styles.radio}
            />
            Генеральная уборка
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="service"
              value="Уборка после ремонта"
              checked={formData.service === 'Уборка после ремонта'}
              onChange={handleInputChange}
              className={styles.radio}
            />
            Уборка после ремонта
          </label>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Дополнительные услуги */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Дополнительные услуги:</h2>
        
        <div className={styles.servicesGrid}>
          {additionalServices.map((service) => {
            const count = getServiceCount(service.value);
            const isSelected = isServiceSelected(service.value);
            
            return (
              <div key={service.id} className={styles.serviceItem}>
                <div className={styles.serviceInfo}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <div className={service.calculationType === 'percentage' ? styles.servicePriceHighlight : styles.servicePrice}>
                    {service.price}
                  </div>
                </div>
                {service.type === 'counter' ? (
                  <div className={styles.counter}>
                    <button 
                      onClick={() => handleServiceChange(service.value, 'counter', 'decrement')}
                      className={styles.counterButton}
                      disabled={count === 0}
                    >-</button>
                    <span className={styles.counterValue}>{count} шт</span>
                    <button 
                      onClick={() => handleServiceChange(service.value, 'counter', 'increment')}
                      className={styles.counterButton}
                    >+</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleServiceChange(service.value, 'button')}
                    className={`${styles.addButton} ${isSelected ? styles.addButtonActive : ''}`}
                  >
                    {isSelected ? 'Добавлено' : 'Добавить'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Заявка */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Заявка:</h2>
        <div className={styles.orderSummary}>
          <div className={styles.orderItem}>
            <span>{formData.service}</span>
            <span>{formData.rooms} ком. квартира</span>
            <span>{formData.square} кв. м — {calculateBasePrice().toLocaleString()} ₽</span>
          </div>
          
          {/* Дополнительные услуги в заявке */}
          {formData.additionalservices.length > 0 && (
            <div className={styles.additionalServices}>
              <div className={styles.additionalTitle}>Дополнительные услуги:</div>
              {additionalServices
                .filter(service => getServiceCount(service.value) > 0)
                .map(service => {
                  const count = getServiceCount(service.value);
                  let servicePrice = 0;
                  
                  if (service.calculationType === 'fixed') {
                    servicePrice = service.priceValue;
                  } else if (service.calculationType === 'perUnit') {
                    servicePrice = service.priceValue * count;
                  } else if (service.calculationType === 'percentage') {
                    servicePrice = calculateBasePrice() * (service.priceValue / 100);
                  }
                  
                  return (
                    <div key={service.id} className={styles.additionalServiceItem}>
                      <span>{service.name} {count > 1 ? `× ${count}` : ''}</span>
                      <span>+{Math.round(servicePrice).toLocaleString()} ₽</span>
                    </div>
                  );
                })}
            </div>
          )}
          
          <div className={styles.total}>
            Итого: {totalPrice.toLocaleString()} ₽
          </div>
        </div>
      </div>

      {/* Данные */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Заполните заявку:</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Имя"
            className={styles.formInput}
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onPaste={handlePaste}
            placeholder="Номер телефона"
            className={styles.formInput}
            required
          />
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Комментарии: например, желаемая дата уборки."
            rows={3}
            className={styles.formTextarea}
          />
        </form>
      </div>

      {/* Кнопка заказа */}
      <div className={styles.orderSection}>
        <button 
          onClick={handleSubmit} 
          className={styles.orderButton}
          disabled={isSubmitting || !formData.name || !isPhoneValid || !isChecked}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
        <div className={styles.verify}>
          <input type='checkbox' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <p className={styles.privacy}>
            Нажимая на кнопку, вы соглашаетесь с <button onClick={() => setIsPrivacyModalOpen(true)}>Политикой конфиденциальности</button>
          </p>
        </div>
      </div>
    </div>
    <div>
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
    </>
  )
}