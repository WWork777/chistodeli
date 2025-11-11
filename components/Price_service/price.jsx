"use client";
import { useState } from "react";
import styles from "./quiz.module.scss";
import PrivacyPolicyModal from './political_confidencial';
import Link from "next/link";

export default function Price() {
  const [step, setStep] = useState(0);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const [formData, setFormData] = useState({
    user: "Физическое лицо",
    service: "Генеральная уборка",
    rooms: "1",
    square: 50,
    name: "",
    phone: "+7",
    comment: "",
    additionalservices: [],
  });

  const questions = [
    {
      title: "Какая уборка вам нужна?",
      type: "radio",
      name: "service",
      options: [
        { value: "Генеральная уборка", label: "Генеральная уборка" },
        { value: "Уборка после ремонта", label: "Уборка после ремонта" },
      ],
    },
    {
      title: "Какое количество комнат нужно убрать?",
      type: "select",
      name: "rooms",
      options: [
        { value: "1", label: "1 комната" },
        { value: "2", label: "2 комнаты" },
        { value: "3", label: "3 комнаты" },
        { value: "4", label: "4 комнаты" },
      ],
    },
    {
      title: "Какая площадь вашего помещения?",
      type: "square",
      name: "square",
    },
    {
      title: "Дополнительные услуги",
      type: "checkbox",
      name: "additionalservices",
      options: [
        { 
          value: "Мытьё окон", 
          label: "Мытьё окон", 
          price: 700, 
          calculationType: "perUnit",
          displayPrice: "700₽ шт."
        },
        { 
          value: "Удаление пыли с оконных рам", 
          label: "Удаление пыли с оконных рам", 
          price: 20, 
          calculationType: "percentage",
          displayPrice: "+20%"
        },
        { 
          value: "Уборка балкона с мытьем окон", 
          label: "Уборка балкона с мытьем окон", 
          price: 2500, 
          calculationType: "fixed",
          displayPrice: "от 2500₽"
        },
        { 
          value: "Мытьё кухонных ящиков", 
          label: "Мытьё кухонных ящиков", 
          price: 1000, 
          calculationType: "fixed",
          displayPrice: "1000₽"
        },
        { 
          value: "Мытьё вытяжки", 
          label: "Мытьё вытяжки", 
          price: 700, 
          calculationType: "fixed",
          displayPrice: "700₽"
        },
        { 
          value: "Мытье посудомоечной машины", 
          label: "Мытье посудомоечной машины", 
          price: 500, 
          calculationType: "fixed",
          displayPrice: "500₽"
        },
        { 
          value: "Мытьё холодильника внутри", 
          label: "Мытьё холодильника внутри", 
          price: 1000, 
          calculationType: "perUnit",
          displayPrice: "1000₽ шт."
        },
        { 
          value: "Мытье духового шкафа", 
          label: "Мытье духового шкафа", 
          price: 1000, 
          calculationType: "fixed",
          displayPrice: "1000₽"
        },
        { 
          value: "Мытьё микроволновой печи", 
          label: "Мытьё микроволновой печи", 
          price: 500, 
          calculationType: "fixed",
          displayPrice: "500₽"
        },
        { 
          value: "Мытьё посуды", 
          label: "Мытьё посуды", 
          price: 500, 
          calculationType: "fixed",
          displayPrice: "500₽"
        },
        { 
          value: "Удаление шерсти дом. животных", 
          label: "Удаление шерсти дом. животных", 
          price: 2000, 
          calculationType: "fixed",
          displayPrice: "2000₽"
        },
        { 
          value: "Химчистка мягкой мебели, ковров", 
          label: "Химчистка мягкой мебели, ковров", 
          price: 2500, 
          calculationType: "perUnit",
          displayPrice: "2500₽ шт."
        },
        { 
          value: "Озонирование", 
          label: "Озонирование", 
          price: 2500, 
          calculationType: "fixed",
          displayPrice: "2500₽"
        },
      ],
    }
  ];

  const userQuestion = [
    {
      title: "Вы являетесь физическим или юридическим лицом?",
      type: "radio",
      name: "user",
      options: [
        { value: "Физическое лицо", label: "Физическое лицо" },
        { value: "Юридическое лицо", label: "Юридическое лицо" },
      ],
    },
  ];

  // Расчет стоимости
  const calculateBasePrice = () => {
    return formData.square * 250;
  };

  const calculateAdditionalPrice = () => {
    let additionalPrice = 0;
    const basePrice = calculateBasePrice();

    const serviceCounts = {};
    formData.additionalservices.forEach(service => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });

    Object.keys(serviceCounts).forEach(serviceValue => {
      const service = questions[3].options.find(s => s.value === serviceValue);
      const count = serviceCounts[serviceValue];
      
      if (service?.price > 0) {
        if (service.calculationType === "fixed") {
          additionalPrice += service.price;
        } else if (service.calculationType === "perUnit") {
          additionalPrice += service.price * count;
        }
      }
    });

    Object.keys(serviceCounts).forEach(serviceValue => {
      const service = questions[3].options.find(s => s.value === serviceValue);
      if (service?.calculationType === "percentage") {
        additionalPrice += basePrice * (service.price / 100);
      }
    });

    return Math.round(additionalPrice);
  };

  const totalPrice = calculateBasePrice() + calculateAdditionalPrice();

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => {
      if (type === "checkbox") {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
        const servicesQuestion = questions.find(q => q.name === name);
        const option = servicesQuestion?.options.find(opt => opt.value === value);
        
        let newArray;
        
        if (option?.calculationType === "perUnit") {
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
            newArray = currentArray.filter(item => item !== value);
          }
        }
        
        return { ...prev, [name]: newArray };
      } else {
        return { ...prev, [name]: name === "square" ? +value : value };
      }
    });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      if (!value.startsWith('+7')) {
        setFormData(prev => ({ ...prev, phone: '+7' }));
        setIsPhoneValid(false);
        return;
      }
      
      let cleanedValue = '+7' + value.slice(2).replace(/\D/g, '');
      
      if (cleanedValue.length <= 12) {
        setFormData(prev => ({ ...prev, [name]: cleanedValue }));
        const phoneDigits = cleanedValue.slice(1).replace(/\D/g, '');
        setIsPhoneValid(phoneDigits.length === 11);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePaste = (e) => {
    if (e.target.name === 'phone') {
      const pastedText = e.clipboardData.getData('text');
      let cleanedValue = pastedText.startsWith('+') ? 
        '+' + pastedText.slice(1).replace(/\D/g, '') : 
        pastedText.replace(/\D/g, '');
      
      setFormData(prev => ({ ...prev, phone: cleanedValue }));
      let phoneDigits = cleanedValue.startsWith('+') ? 
        cleanedValue.slice(1).replace(/\D/g, '') : 
        cleanedValue.replace(/\D/g, '');
      
      setIsPhoneValid(phoneDigits.length === 11);
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let phoneDigits = formData.phone.startsWith('+') ? 
      formData.phone.slice(1).replace(/\D/g, '') : 
      formData.phone.replace(/\D/g, '');
    
    if (phoneDigits.length !== 11) {
      alert('Номер телефона должен содержать 11 цифр');
      return;
    }

    if (!isChecked) {
      alert('Необходимо согласие с политикой конфиденциальности');
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
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        if (typeof ym !== "undefined") {
          ym(99528524, "reachGoal", "Quiz");
        }
        setTimeout(() => {
          setStep(7);
          setIsAnimating(false);
        }, 300);
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

  const getServiceCount = (serviceValue) => {
    return formData.additionalservices.filter(item => item === serviceValue).length;
  };

  const isServiceSelected = (serviceValue) => {
    return formData.additionalservices.includes(serviceValue);
  };

  const renderUser = () => {
    if (step === 0) return null;
    const userQuestions = userQuestion[step - 1];

    return (
      <div className={`${styles.userQuestions} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
        <h2>{userQuestions.title}</h2>
        <div className={styles.options}>
          {userQuestions.options.map((option, index) => (
            <label key={index} className={`${styles.option} ${formData[userQuestions.name] === option.value ? styles.active : ""}`}>
              <input type="radio" name={userQuestions.name} value={option.value} checked={formData[userQuestions.name] === option.value} onChange={handleChange} />
              {option.label}
            </label>
          ))}
        </div>
        <div className={styles.navigation}>
          <button onClick={handleBack} className={styles.backButton} disabled={step === 0}>
            Назад
          </button>
          <button onClick={handleNext} className={styles.nextButton} disabled={step === 1 && !formData.user}>
            Далее
          </button>
        </div>
      </div>
    );
  };

  const renderQuestionLegally = () => {
    if (step === 0) return null;
    const question = questions[step - 2];
    if (!question) return null;
    
    return (
      <div className={`${styles.question} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${(step / (questions.length + 1)) * 100}%` }}></div>
          <span className={styles.progressText}>Шаг {step} из {questions.length + 1}</span>
        </div>

        <h2 className={styles.questionTitle}>{question.title}</h2>

        {question.type === "radio" && (
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <label key={index} className={`${styles.option} ${formData[question.name] === option.value ? styles.active : ""}`}>
                <input type="radio" name={question.name} value={option.value} checked={formData[question.name] === option.value} onChange={handleChange} />
                {option.label}
              </label>
            ))}
          </div>
        )}

        {question.type === "select" && (
          <select name={question.name} value={formData[question.name]} onChange={handleChange} className={styles.selectInput}>
            {question.options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}

        {question.type === "square" && (
          <>
            <div className={styles.rangeContainer}>
              <input type="range" name={question.name} min="1" max="300" value={formData.square} onChange={handleChange} className={styles.rangeInput} />
              <div className={styles.rangeValues}>
                <span>1</span>
                <span className={styles.selectedValue}>{formData.square} кв.м</span>
                <span>300</span>
              </div>
            </div>
            <div className={styles.squarePreview}>
              Базовая стоимость: <span>{calculateBasePrice().toLocaleString()} ₽</span>
            </div>
          </>
        )}

        {question.type === "checkbox" && (
          <div className={styles.servicesGrid}>
            {question.options.map((option, index) => {
              const count = getServiceCount(option.value);
              const isSelected = isServiceSelected(option.value);
              
              return (
                <div key={index} className={`${styles.serviceCard} ${isSelected ? styles.serviceCardActive : ""}`}>
                  <div className={styles.serviceHeader}>
                    <h3 className={styles.serviceName}>{option.label}</h3>
                    <span className={styles.servicePrice}>{option.displayPrice}</span>
                  </div>
                  <div className={styles.serviceControls}>
                    {option.calculationType === "perUnit" ? (
                      <div className={styles.counter}>
                        <button onClick={() => handleChange({ target: { name: question.name, value: option.value, type: "checkbox", checked: false } })} disabled={count === 0} className={styles.counterBtn}>-</button>
                        <span className={styles.counterValue}>{count}</span>
                        <button onClick={() => handleChange({ target: { name: question.name, value: option.value, type: "checkbox", checked: true } })} className={styles.counterBtn}>+</button>
                      </div>
                    ) : (
                      <button onClick={() => handleChange({ target: { name: question.name, value: option.value, type: "checkbox", checked: !isSelected } })} className={`${styles.serviceBtn} ${isSelected ? styles.serviceBtnActive : ""}`}>
                        {isSelected ? 'Добавлено' : 'Добавить'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.navigation}>
          <button onClick={handleBack} className={styles.backButton} disabled={step === 0}>Назад</button>
          <button onClick={handleNext} className={styles.nextButton} disabled={(step === 2 && !formData.service) || (step === 3 && !formData.rooms) || (step === 4 && !formData.square)}>
            {step === questions.length + 1 ? "Продолжить" : "Далее"}
          </button>
        </div>
      </div>
    );
  };

  const renderFinalForm = () => (
    <form onSubmit={handleSubmit} className={`${styles.finalForm} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
      <h2 className={styles.formTitle}>Заполните контактные данные</h2>
      <p className={styles.formDescription}>Мы свяжемся с вами в ближайшее время</p>

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Ваше имя</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Как к вам обращаться?" required className={styles.formInput} />
        </div>

        <div className={styles.inputGroup}>
          <label>Телефон</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} onPaste={handlePaste} placeholder="+7 (000) 000-00-00" required className={styles.formInput} />
        </div>

        <div className={styles.inputGroup}>
          <label>Комментарий</label>
          <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Например, желаемая дата уборки" rows={3} className={styles.formTextarea} />
        </div>
      </div>

      <div className={styles.orderSummary}>
        <h3 className={styles.summaryTitle}>Сводка заказа</h3>
        <div className={styles.summaryItem}>
          <span>{formData.service}</span>
          <span>{formData.rooms} ком. квартира</span>
          <span>{formData.square} кв. м — {calculateBasePrice().toLocaleString()} ₽</span>
        </div>
        
        {formData.additionalservices.length > 0 && (
          <div className={styles.additionalServices}>
            <h4>Дополнительные услуги:</h4>
            {questions[3].options.filter(service => getServiceCount(service.value) > 0).map(service => {
              const count = getServiceCount(service.value);
              let servicePrice = 0;
              
              if (service.calculationType === "fixed") {
                servicePrice = service.price;
              } else if (service.calculationType === "perUnit") {
                servicePrice = service.price * count;
              } else if (service.calculationType === "percentage") {
                servicePrice = calculateBasePrice() * (service.price / 100);
              }
              
              return (
                <div key={service.value} className={styles.additionalItem}>
                  <span>{service.label} {count > 1 ? `× ${count}` : ''}</span>
                  <span>+{Math.round(servicePrice).toLocaleString()} ₽</span>
                </div>
              );
            })}
          </div>
        )}
        
        <div className={styles.total}>
          <span>Итого:</span>
          <span>{totalPrice.toLocaleString()} ₽</span>
        </div>
      </div>

      <div className={styles.formFooter}>
        {(!formData.name || !isPhoneValid) && (
          <p className={styles.validationError}>Заполните все обязательные поля</p>
        )}

        <div className={styles.agreeSection}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <span className={styles.checkmark}></span>
            Соглашаюсь с <button type="button" onClick={() => setIsPrivacyModalOpen(true)} className={styles.privacyLink}>Политикой конфиденциальности</button>
          </label>
        </div>

        <div className={styles.navigation}>
          <button type="button" onClick={handleBack} className={styles.backButton}>Назад</button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting || !formData.name || !isPhoneValid || !isChecked}>
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
        </div>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <div className={styles.successScreen}>
      <div className={styles.successIcon}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="#0091C9"/>
          <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className={styles.successTitle}>Спасибо за заявку!</h2>
      <p className={styles.successText}>Мы получили вашу заявку и свяжемся с вами в ближайшее время для уточнения деталей.</p>
    </div>
  );

  return (
    <>
      <div id="calculate" className={styles.container}>
        {step === 0 && (
          <div className={`${styles.welcomeScreen} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
            <div className={styles.welcomeContent}>
              <h1 className={styles.welcomeTitle}>Рассчитайте стоимость уборки</h1>
              <p className={styles.welcomeText}>Ответьте на несколько вопросов и получите точный расчет стоимости уборки с учетом всех ваших пожеланий</p>
              <button onClick={handleNext} className={styles.startButton}>Начать расчет</button>
            </div>
          </div>
        )}

        {step === 1 && renderUser()}
        {step > 1 && step <= questions.length + 1 && renderQuestionLegally()}
        {step === questions.length + 2 && renderFinalForm()}
        {step === 7 && renderSuccess()}
      </div>
      
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
    </>
  );
}