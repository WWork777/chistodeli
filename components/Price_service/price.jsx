'use client';
import { useState, useEffect } from 'react';
import styles from './quiz.module.scss';
import PrivacyPolicyModal from './political_confidencial';
import ConsentModal from './consent_Modal';

export default function Price() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Модалка контактных данных

  const [formData, setFormData] = useState({
    user: 'Физическое лицо',
    service: 'Генеральная уборка',
    rooms: '1',
    square: 50,
    name: '',
    phone: '+7',
    cleaningDate: '',
    comment: '',
    additionalservices: [],
  });

  const questions = [
    {
      title: 'Какая уборка вам нужна? \n',
      type: 'radio',
      name: 'service',
      options: [
        { value: 'Генеральная уборка', label: 'Генеральная уборка' },
        { value: 'Уборка после ремонта', label: 'Уборка после ремонта' },
      ],
    },
    {
      title: 'Какое количество комнат нужно убрать?',
      type: 'select',
      name: 'rooms',
      options: [
        { value: '1', label: '1 комната' },
        { value: '2', label: '2 комнаты' },
        { value: '3', label: '3 комнаты' },
        { value: '4', label: '4 комнаты' },
      ],
    },
    {
      title: 'Какая площадь вашего помещения?',
      type: 'square',
      name: 'square',
    },
    {
      title: 'Дополнительные услуги',
      type: 'checkbox',
      name: 'additionalservices',
      options: [
        {
          value: 'Мытьё окон',
          label: 'Мытьё окон',
          price: 700,
          calculationType: 'perUnit',
          displayPrice: '700₽ створка',
        },
        {
          value: 'Уборка балкона с мытьем окон',
          label: 'Уборка балкона с мытьем окон',
          price: 4000,
          calculationType: 'fixed',
          displayPrice: 'от 4000₽',
        },
        {
          value: 'Мытьё кухонных ящиков',
          label: 'Мытьё кухонных ящиков',
          price: 100,
          calculationType: 'perUnit',
          displayPrice: '100₽ шт.',
        },
        {
          value: 'Мытьё вытяжки',
          label: 'Мытьё вытяжки',
          price: 700,
          calculationType: 'fixed',
          displayPrice: '700₽',
        },
        {
          value: 'Мытье посудомоечной машины',
          label: 'Мытье посудомоечной машины',
          price: 500,
          calculationType: 'fixed',
          displayPrice: '500₽',
        },
        {
          value: 'Мытьё холодильника внутри',
          label: 'Мытьё холодильника внутри',
          price: 1000,
          calculationType: 'fixed',
          displayPrice: '1000₽',
        },
        {
          value: 'Мытье духового шкафа',
          label: 'Мытье духового шкафа',
          price: 1000,
          calculationType: 'fixed',
          displayPrice: '1000₽',
        },
        {
          value: 'Мытьё микроволновой печи',
          label: 'Мытьё микроволновой печи',
          price: 500,
          calculationType: 'fixed',
          displayPrice: '500₽',
        },
        {
          value: 'Мытьё посуды',
          label: 'Мытьё посуды',
          price: 500,
          calculationType: 'fixed',
          displayPrice: '500₽',
        },
        {
          value: 'Удаление шерсти дом. животных',
          label: 'Удаление шерсти дом. животных',
          price: 1500,
          calculationType: 'fixed',
          displayPrice: 'от 1500₽',
        },
        {
          value: 'Химчистка мягкой мебели, ковролин(ковровое покрытие)',
          label: 'Химчистка мягкой мебели, ковролин(ковровое покрытие)',
          price: 2500,
          calculationType: 'fixed',
          displayPrice: 'от 2500₽',
        },
        {
          value: 'Озонирование',
          label: 'Озонирование',
          price: 0,
          calculationType: 'fixed',
          displayPrice: 'в подарок при генеральной уборке',
          isFreeWithGeneral: true,
        },
      ],
    },
  ];

  const userQuestion = {
    title: 'Вы являетесь физическим или юридическим лицом?',
    type: 'radio',
    name: 'user',
    options: [
      { value: 'Физическое лицо', label: 'Физическое лицо' },
      { value: 'Юридическое лицо', label: 'Юридическое лицо' },
    ],
  };

  // Расчет стоимости
  const calculateBasePrice = () => {
    return formData.square * 250;
  };

  const calculateAdditionalPrice = () => {
    let additionalPrice = 0;
    const basePrice = calculateBasePrice();
    const isGeneralCleaning = formData.service === 'Генеральная уборка';

    const serviceCounts = {};
    formData.additionalservices.forEach((service) => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });

    Object.keys(serviceCounts).forEach((serviceValue) => {
      const service = questions[3].options.find(
        (s) => s.value === serviceValue
      );
      const count = serviceCounts[serviceValue];

      // Озонирование бесплатно при генеральной уборке
      if (service?.isFreeWithGeneral && isGeneralCleaning) {
        return; // Пропускаем, не добавляем к цене
      }

      if (service?.price > 0) {
        if (service.calculationType === 'fixed') {
          additionalPrice += service.price;
        } else if (service.calculationType === 'perUnit') {
          additionalPrice += service.price * count;
        }
      }
    });

    Object.keys(serviceCounts).forEach((serviceValue) => {
      const service = questions[3].options.find(
        (s) => s.value === serviceValue
      );
      if (service?.calculationType === 'percentage') {
        additionalPrice += basePrice * (service.price / 100);
      }
    });

    return Math.round(additionalPrice);
  };

  const totalPrice = calculateBasePrice() + calculateAdditionalPrice();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === 'checkbox') {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
        const servicesQuestion = questions.find((q) => q.name === name);
        const option = servicesQuestion?.options.find(
          (opt) => opt.value === value
        );

        let newArray;

        if (option?.calculationType === 'perUnit') {
          if (checked) {
            newArray = [...currentArray, value];
          } else {
            const lastIndex = currentArray.lastIndexOf(value);
            if (lastIndex !== -1) {
              newArray = [...currentArray];
              newArray.splice(lastIndex, 1);
            } else {
              newArray = currentArray;
            }
          }
        } else {
          if (checked) {
            newArray = [...currentArray, value];
          } else {
            newArray = currentArray.filter((item) => item !== value);
          }
        }

        return { ...prev, [name]: newArray };
      } else {
        return { ...prev, [name]: name === 'square' ? +value : value };
      }
    });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      if (!value.startsWith('+7')) {
        setFormData((prev) => ({ ...prev, phone: '+7' }));
        setIsPhoneValid(false);
        return;
      }

      let cleanedValue = '+7' + value.slice(2).replace(/\D/g, '');

      if (cleanedValue.length <= 12) {
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        const phoneDigits = cleanedValue.slice(1).replace(/\D/g, '');
        setIsPhoneValid(phoneDigits.length === 11);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePaste = (e) => {
    if (e.target.name === 'phone') {
      const pastedText = e.clipboardData.getData('text');
      let cleanedValue = pastedText.startsWith('+')
        ? '+' + pastedText.slice(1).replace(/\D/g, '')
        : pastedText.replace(/\D/g, '');

      setFormData((prev) => ({ ...prev, phone: cleanedValue }));
      let phoneDigits = cleanedValue.startsWith('+')
        ? cleanedValue.slice(1).replace(/\D/g, '')
        : cleanedValue.replace(/\D/g, '');

      setIsPhoneValid(phoneDigits.length === 11);
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let phoneDigits = formData.phone.startsWith('+')
      ? formData.phone.slice(1).replace(/\D/g, '')
      : formData.phone.replace(/\D/g, '');

    if (phoneDigits.length !== 11) {
      alert('Номер телефона должен содержать 11 цифр');
      return;
    }

    if (!isChecked) {
      alert('Необходимо дать согласие на обработку персональных данных');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sendCleaningOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalPrice: totalPrice,
          basePrice: calculateBasePrice(),
          additionalPrice: calculateAdditionalPrice(),
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (typeof ym !== 'undefined') {
          ym(99528524, 'reachGoal', 'Quiz');
        }
        setIsSubmitted(true);
        setIsContactModalOpen(false); // Закрываем модалку после успешной отправки
      } else {
        const errorMessage =
          data.message || `Ошибка при отправке (статус: ${response.status})`;
        console.error('Ошибка при отправке заявки:', {
          status: response.status,
          data,
        });
        alert(
          errorMessage ||
            'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.'
        );
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      alert(
        'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceCount = (serviceValue) => {
    return formData.additionalservices.filter((item) => item === serviceValue)
      .length;
  };

  const isServiceSelected = (serviceValue) => {
    return formData.additionalservices.includes(serviceValue);
  };

  // Проверяем, есть ли услуги с ценой "от ..."
  const hasApproximatePrice = () => {
    return formData.additionalservices.some((serviceValue) => {
      const service = questions[3].options.find(
        (s) => s.value === serviceValue
      );
      return service?.displayPrice?.startsWith('от');
    });
  };

  const openContactModal = () => {
    // Проверяем обязательные поля перед открытием модалки
    if (!formData.user || !formData.service || !formData.rooms || !formData.square) {
      alert('Пожалуйста, заполните все основные поля формы');
      return;
    }
    setIsContactModalOpen(true);
  };

  const renderSuccess = () => (
    <div className={styles.successScreen}>
      <div className={styles.successIcon}>
        <svg width='80' height='80' viewBox='0 0 80 80' fill='none'>
          <circle cx='40' cy='40' r='40' fill='#0091C9' />
          <path
            d='M25 40L35 50L55 30'
            stroke='white'
            strokeWidth='6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <h2 className={styles.successTitle}>Заявка на расчет отправлена!</h2>
      <p className={styles.successText}>
        Мы получили вашу заявку на расчет стоимости. Скоро с вами свяжется наш
        менеджер для уточнения деталей и предоставления точной стоимости.
      </p>
    </div>
  );

  if (isSubmitted) {
    return (
      <div id='calculate' className={styles.container}>
        {renderSuccess()}
      </div>
    );
  }

  return (
    <>
      <div id='calculate' className={styles.container}>
        <form className={styles.fullForm}>
          <h1 className={styles.formMainTitle}>Предварительный расчет стоимости уборки</h1>

          {/* Двухколоночная структура */}
          <div className={styles.formContent}>
            {/* Левый столбец */}
            <div className={styles.leftColumn}>
              {/* Выбор юр/физ лица + выбор уборки в одну строку */}
              <div className={styles.firstForm}>
                {/* Тип клиента */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>{userQuestion.title}</h2>
                  <div className={styles.options}>
                    {userQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`${styles.option} ${
                          formData[userQuestion.name] === option.value
                            ? styles.active
                            : ''
                        }`}
                      >
                        <input
                          type='radio'
                          name={userQuestion.name}
                          value={option.value}
                          checked={formData[userQuestion.name] === option.value}
                          onChange={handleChange}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Тип уборки */}
                <div className={styles.formSection}>
                  {/* <div className={styles.typeClean}> */}
                  <h2 className={styles.sectionTitle}>{questions[0].title}</h2>
                  <br className={styles.brHelp} />
                  <div className={styles.options}>
                    {questions[0].options.map((option, index) => (
                      <label
                        key={index}
                        className={`${styles.option} ${
                          formData[questions[0].name] === option.value
                            ? styles.active
                            : ''
                        }`}
                      >
                        <input
                          type='radio'
                          name={questions[0].name}
                          value={option.value}
                          checked={formData[questions[0].name] === option.value}
                          onChange={handleChange}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {/* </div> */}
                </div>
              </div>

              {/* Количество комнат и площадь */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  Количество комнат и площадь
                </h2>
                <div className={styles.roomsAndSquareContainer}>
                  <div className={styles.roomsSelect}>
                    <label>Количество комнат</label>
                    <select
                      name={questions[1].name}
                      value={formData[questions[1].name]}
                      onChange={handleChange}
                      className={styles.selectInput}
                    >
                      {questions[1].options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.squareInput}>
                    <label>Площадь помещения (кв.м)</label>
                    <div className={styles.squareInputWrapper}>
                      <input
                        type='number'
                        name={questions[2].name}
                        min='1'
                        max='1000'
                        value={formData.square}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === '') {
                            handleChange({
                              target: {
                                name: questions[2].name,
                                value: 1,
                              },
                            });
                            return;
                          }
                          const value = Math.max(
                            1,
                            Math.min(1000, parseInt(inputValue) || 1)
                          );
                          handleChange({
                            target: {
                              name: questions[2].name,
                              value: value,
                            },
                          });
                        }}
                        className={styles.squareNumberInput}
                        placeholder='50'
                      />
                      <div className={styles.rangeContainer}>
                        <input
                          type='range'
                          name={questions[2].name}
                          min='1'
                          max='300'
                          value={Math.min(300, formData.square)}
                          onChange={(e) => {
                            handleChange({
                              target: {
                                name: questions[2].name,
                                value: parseInt(e.target.value),
                              },
                            });
                          }}
                          className={styles.rangeInput}
                        />
                        <div className={styles.rangeValues}>
                          <span>1</span>
                          <span>300</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Правый столбец */}
            <div className={styles.rightColumn}>
              {/* Дополнительные услуги */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>{questions[3].title}</h2>
                <div className={styles.servicesList}>
                  {questions[3].options
                    .slice(0, showAllServices ? questions[3].options.length : (isMobile ? 3 : 6))
                    .map((option, index) => {
                      const count = getServiceCount(option.value);
                      const isSelected = isServiceSelected(option.value);

                      return (
                        <div
                          key={index}
                          className={`${styles.serviceItem} ${
                            isSelected ? styles.serviceItemActive : ''
                          }`}
                        >
                          <label className={styles.serviceLabel}>
                            <input
                              type='checkbox'
                              checked={isSelected || count > 0}
                              onChange={(e) => {
                                const shouldBeChecked =
                                  !isSelected && count === 0;
                                handleChange({
                                  target: {
                                    name: questions[3].name,
                                    value: option.value,
                                    type: 'checkbox',
                                    checked: shouldBeChecked,
                                  },
                                });
                              }}
                              className={styles.serviceCheckbox}
                            />
                            <div className={styles.serviceNameWrapper}>
                              <span className={styles.serviceName}>
                                {option.label}
                              </span>
                              <span className={styles.servicePrice}>
                                {option.displayPrice}
                              </span>
                            </div>
                          </label>
                          <div className={styles.serviceRight}>
                            {option.calculationType === 'perUnit' &&
                              count > 0 && (
                                <div className={styles.counter}>
                                  <button
                                    type='button'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleChange({
                                        target: {
                                          name: questions[3].name,
                                          value: option.value,
                                          type: 'checkbox',
                                          checked: false,
                                        },
                                      });
                                    }}
                                    disabled={count === 0}
                                    className={styles.counterBtn}
                                  >
                                    -
                                  </button>
                                  <span className={styles.counterValue}>
                                    {count}
                                  </span>
                                  <button
                                    type='button'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleChange({
                                        target: {
                                          name: questions[3].name,
                                          value: option.value,
                                          type: 'checkbox',
                                          checked: true,
                                        },
                                      });
                                    }}
                                    className={styles.counterBtn}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                {questions[3].options.length > (isMobile ? 3 : 6) && (
                  <button
                    type='button'
                    onClick={() => setShowAllServices(!showAllServices)}
                    className={styles.showAllServicesBtn}
                  >
                    {showAllServices
                      ? 'Скрыть'
                      : `Показать все (еще ${questions[3].options.length - (isMobile ? 3 : 6)})`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Итоговая стоимость и кнопка открытия модалки */}
          <div className={styles.priceSummaryContainer}>
            <div className={styles.priceSummaryLeft}>
              <h3 className={styles.summaryTitle}>Состав расчета:</h3>
              <div className={styles.summaryDetails}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    {formData.square} м² × 250 ₽/м²
                  </span>
                  <span className={styles.summaryValue}>
                    {calculateBasePrice().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                {calculateAdditionalPrice() > 0 && (
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      Дополнительные услуги
                    </span>
                    <span className={styles.summaryValue}>
                      {hasApproximatePrice() && (
                        <span className={styles.approximateSymbolSmall}>~</span>
                      )}
                      {calculateAdditionalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.priceSummaryRight}>
              <div className={styles.totalPriceContainer}>
                <div className={styles.totalPrice}>
                  {hasApproximatePrice() && (
                    <span className={styles.approximateSymbol}>~</span>
                  )}
                  {totalPrice.toLocaleString('ru-RU')}
                  <span className={styles.totalCurrency}> ₽</span>
                </div>
                <div className={styles.totalLabel}>
                  Итоговая стоимость работ
                </div>
              </div>
              <button
                type='button'
                onClick={openContactModal}
                className={styles.orderButton}
              >
                Перейти к оформлению
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Модальное окно для контактных данных */}
      {isContactModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsContactModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type='button'
              className={styles.modalClose}
              onClick={() => setIsContactModalOpen(false)}
            >
              ×
            </button>

            <h2 className={styles.modalTitle}>Контактные данные для заказа</h2>
            
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGrid}>
                <div className={styles.contGrid}>
                  <div className={styles.inputGroup}>
                    <label>
                      Ваше имя
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Как к вам обращаться?'
                      required
                      className={`${styles.formInput} ${
                        !formData.name ? styles.inputError : ''
                      }`}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>
                      Телефон
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onPaste={handlePaste}
                      placeholder='+7 (000) 000-00-00'
                      required
                      className={`${styles.formInput} ${
                        !isPhoneValid ? styles.inputError : ''
                      }`}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Желаемая дата уборки</label>
                    <div className={styles.dateInputContainer}>
                      <input
                        type='date'
                        name='cleaningDate'
                        value={formData.cleaningDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={styles.dateInput}
                      />
                      <span className={styles.dateHint}>
                        Выезд на объект осуществляется от 12500 рублей.
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Комментарий</label>
                  <textarea
                    name='comment'
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder='Дополнительная информация (необязательно)'
                    rows={3}
                    className={styles.formTextarea}
                  />
                </div>
              </div>

              {/* Чекбокс согласия */}
              <div className={styles.agreeSection}>
                <label
                  className={`${styles.checkboxLabel} ${
                    !isChecked && (!formData.name || !isPhoneValid)
                      ? styles.checkboxLabelError
                      : ''
                  }`}
                >
                  <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span
                    className={`${styles.checkmark} ${
                      !isChecked && (!formData.name || !isPhoneValid)
                        ? styles.checkmarkError
                        : ''
                    }`}
                  ></span>
                  <span className={styles.checkboxText}>
                    Я даю{' '}
                    <button
                      type='button'
                      onClick={() => setIsConsentModalOpen(true)}
                      className={styles.privacyLink}
                    >
                      согласие на обработку персональных данных
                    </button>{' '}
                    и согласен(а) с{' '}
                    <button
                      type='button'
                      onClick={() => setIsPrivacyModalOpen(true)}
                      className={styles.privacyLink}
                    >
                      политикой конфиденциальности
                    </button>
                    <span className={styles.required}>*</span>
                  </span>
                </label>
              </div>

              {(!formData.name || !isPhoneValid || !isChecked) && (
                <p className={styles.validationError}>
                  Заполните все обязательные поля
                </p>
              )}

              <button
                type='submit'
                className={styles.submitButton}
                disabled={
                  isSubmitting ||
                  !formData.name ||
                  !isPhoneValid ||
                  !isChecked
                }
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      )}

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <ConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
      />
    </>
  );
}