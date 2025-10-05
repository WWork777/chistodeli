"use client";
import { useState, useEffect } from "react";
import styles from "./quiz.module.scss";
import Image from "next/image";

export default function Price() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    user: "",
    service: "",
    rooms: "",
    square: 0,
    price: 0,
    name: "",
    phone: "+7",
    comment: "",
    additionalservices: [],
  });
  console.log(formData.additionalservices);
  const [isAnimating, setIsAnimating] = useState(false);
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
      type: "text",
      name: "rooms",
      placeholder: "Введите количество комнат",
    },
    {
      title: "Какая площадь вашего помещения?",
      type: "square",
      name: "square",
      placeholder: "Площадь помещения",
    },
    {
      title: "Дополнительные услуги",
      type: "checkbox",
      name: "additionalservices",
      options: [
        {value: "Mытьё окон", label: "мытьё окон", price: 600, calculationType: "perUnit"},
        {value: "Мытьё холодильника внутри", label: "Мытьё холодильника внутри", price: 1000, calculationType: "perUnit"},
        {value: "Химчистка мягкой мебели, ковров", label: "Химчистка мягкой мебели, ковров", price: 3000, calculationType: "perUnit"},
        {value: "Снять/повесить шторы, тюль", label: "Снять/повесить шторы, тюль", price: 200, calculationType: "perUnit"},
        {value: "Удаление прикипевшей плёнки с оконных рам", label: "Удаление прикипевшей плёнки с оконных рам", price: 20, calculationType: "percentage"},
        {value: "Уборка балкона с мытьем окон", label: "Уборка балкона с мытьем окон", price: 3000, calculationType: "fixed"},
        {value: "Мытьё кухонных ящиков", label: "Мытьё кухонных ящиков", price: 1000, calculationType: "fixed"},
        {value: "Мытьё вытяжки", label: "Мытьё вытяжки", price: 1000, calculationType: "fixed"},
        {value: "Мытье посудомоечной машины", label: "Мытье посудомоечной машины", price: 500, calculationType: "fixed"},
        {value: "Мытье духового шкафа", label: "Мытье духового шкафа", price: 1000, calculationType: "fixed"},
        {value: "Мытьё микроволновой печи", label: "Мытьё микроволновой печи", price: 500, calculationType: "fixed"},
        {value: "Мытьё посуды", label: "Мытьё посуды", price: 500},
        {value: "Удаление шерсти дом. животных", label: "Удаление шерсти дом. животных", price: 2000, calculationType: "fixed"},
        {value: "Озонирование", label: "Озонирование", price: 2500, calculationType: "fixed"},
      ],
    }
  ];
    const userQuestion = [
    {
      title: "Вы являетесь физическим или юридическим лицом?",
      type: "radio",
      name: "user",
      options: [
        {
          value: "Физичиское лицо",
          label: "Физичиское лицо",
        },
        {
          value: "Юридическое лицо",
          label: "Юридическое лицо",
        },
      ],
    },
  ];
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
        // Для поштучных услуг - специальная логика
        if (checked) {
          // Добавляем одну штуку
          newArray = [...currentArray, value];
        } else {
          // Убираем одну штуку (последнюю)
          const lastIndex = currentArray.lastIndexOf(value);
          if (lastIndex !== -1) {
            newArray = [...currentArray];
            newArray.splice(lastIndex, 1);
          } else {
            newArray = currentArray;
          }
        }
      } else {
        // Для остальных услуг - обычная логика
        if (checked) {
          newArray = [...currentArray, value];
        } else {
          newArray = currentArray.filter(item => item !== value);
        }
      }
      
      const newPrice = calculateTotalPrice(prev.square, newArray);
      
      return {
        ...prev,
        [name]: newArray,
        price: newPrice
      };
    } else {
      const newSquare = name === "square" ? +value : prev.square;
      const newPrice = calculateTotalPrice(newSquare, prev.additionalservices || []);
      
      return {
        ...prev,
        [name]: name === "square" ? +value : value,
        price: newPrice
      };
    }
  });
};

const calculateTotalPrice = (square, services) => {
  let total = square * (formData.user === "Юридическое лицо" ? 200 : 400);
  const servicesQuestion = questions.find(q => q.name === "additionalservices");
  
  // Создаем объект для подсчета количества каждой услуги
  const serviceCounts = {};
  services.forEach(service => {
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
  });
  
  // Сначала считаем фиксированные и поштучные
  Object.keys(serviceCounts).forEach(serviceValue => {
    const option = servicesQuestion?.options.find(opt => opt.value === serviceValue);
    const count = serviceCounts[serviceValue];
    
    if (option?.price > 0) {
      if (option.calculationType === "fixed") {
        // Фиксированные - одна цена независимо от количества в массиве
        total += option.price;
      } else if (option.calculationType === "perUnit") {
        // Поштучные - цена × количество
        total += option.price * count;
      }
    }
  });
  
  // Затем процентные надбавки
  Object.keys(serviceCounts).forEach(serviceValue => {
    const option = servicesQuestion?.options.find(opt => opt.value === serviceValue);
    if (option?.calculationType === "percentage") {
      total += total * (option.price / 100);
    }
  });
  
  return Math.round(total);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnimating(true);

    try {
      await fetch("/api/sendQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (typeof ym !== "undefined") {
        ym(99528524, "reachGoal", "Quiz");
      }

      setTimeout(() => {
        setStep(7);
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setIsAnimating(false);
    }
  };
  const renderUser = () => {
    if (step === 0) return null;
    const userQuestions = userQuestion[step - 1];

    console.log(userQuestions);
    return (
    <>
      <div
        className={`${styles.userQuestions} ${
          isAnimating ? styles.fadeOut : styles.fadeIn
        }`}
      >
      <h2>{userQuestions.title}</h2>
        <div className={styles.options}>
        {userQuestions.options.map((option, index) => (
          <label
            key={index}
            className={`${styles.option} ${
            formData[userQuestions.name] === option.value ? styles.active : ""
            }`}
          >
            <input
              type="radio"
              name={userQuestions.name}
              value={option.value}
              checked={formData[userQuestions.name] === option.value}
              onChange={handleChange}
            />
          {option.label}
          </label>
        ))}
        </div>
        <div className={styles.navigation}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            disabled={step === 0}
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            className={styles.nextButton}
            disabled={
              (step === 1 && !formData.user)
            }
          >
            {step === userQuestions.length ? "Продолжить" : "Далее"}
          </button>
        </div>
      </div>
    </>
  )}

  const renderQuestionLegally = () => {
    if (step === 0) return null;
    const question = questions[step - 2];
    if (!question) return null;
    return (
      <div
        id="container"
        className={`${styles.question} ${
          isAnimating ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <div className={styles.progress}>
          <div
            className={styles.progressBar}
            style={{ width: `${(step / (questions.length + 1)) * 100}%` }}
          ></div>
          <span>
            Шаг {step} из {questions.length + 1}
          </span>
        </div>

        <h2>{question.title}</h2>

        {question.type === "radio" && (
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`${styles.option} ${
                  formData[question.name] === option.value ? styles.active : ""
                }`}
              >
                <input
                  type="radio"
                  name={question.name}
                  value={option.value}
                  checked={formData[question.name] === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}

        {question.type === "checkbox" && (
  <div className={styles.options} style={{overflowY: "scroll", maxHeight: "300px"}}>
    {question.options.map((option, index) => {
      const count = formData[question.name]?.filter(item => item === option.value).length || 0;
      const isSelected = count > 0;
      
      let priceInfo = "";
      if (option.price > 0) {
        switch (option.calculationType) {
          case "perUnit":
            priceInfo = `(+${option.price}р за шт)`;
            break;
          case "fixed":
            priceInfo = `(+${option.price}р)`;
            break;
          case "percentage":
            priceInfo = `(+${option.price}%)`;
            break;
        }
      }
      
      return (
        <div key={index} className={styles.serviceItem}>
          <label className={`${styles.option} ${isSelected ? styles.active : ""}`}>
            {option.label} {priceInfo}
          </label>
          
          {option.calculationType === "perUnit" ? (
            // Для поштучных услуг - кнопки +/-
            <div className={styles.quantityControls}>
              <button 
                onClick={(e) => {
                  const fakeEvent = {
                    target: {
                      name: question.name,
                      value: option.value,
                      type: "checkbox",
                      checked: false
                    }
                  };
                  handleChange(fakeEvent);
                }}
                disabled={count === 0}
                className={styles.quantityButton}
              >-</button>
              
              <span className={styles.quantityText}>{count} шт</span>
              
              <button 
                onClick={(e) => {
                  const fakeEvent = {
                    target: {
                      name: question.name,
                      value: option.value,
                      type: "checkbox", 
                      checked: true
                    }
                  };
                  handleChange(fakeEvent);
                }}
                className={styles.quantityButton}
              >+</button>
            </div>
          ) : (
            // Для остальных услуг - кнопки Добавить/Убрать
            <div className={styles.toggleControls}>
              <button 
                onClick={(e) => {
                  const fakeEvent = {
                    target: {
                      name: question.name,
                      value: option.value,
                      type: "checkbox",
                      checked: !isSelected
                    }
                  };
                  handleChange(fakeEvent);
                }}
                className={`${styles.toggleButton} ${isSelected ? styles.active : ""}`}
              >
                {isSelected ? 'Убрать' : 'Добавить'}
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}

        {question.type === "text" && (
          <input
            type="text"
            name={question.name}
            value={formData[question.name]}
            onChange={handleChange}
            placeholder={question.placeholder}
            className={styles.textInput}
          />
        )}

        {question.type === "square" && (
          <>
            <label>{question.label}</label>
            <div className={styles.rangeContainer}>
              <input
                type="range"
                name={question.name}
                min="0"
                max="300"
                value={formData[question.name]}
                onChange={handleChange}
                className={styles.rangeInput}
              />
              <div className={styles.rangeValues}>
                <span>0</span>
                <span className={styles.selectedValue}>
                  {formData.square} кв.м
                </span>
                <span>300</span>
              </div>
            </div>
            <div className={styles.squarePreview}>
              Примерная стоимость: <span>{formData.square * (formData.user === "Юридическое лицо" ? 200 : 400)}p.</span>
            </div>
          </>
        )}

        <div className={styles.navigation}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            disabled={step === 0}
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            className={styles.nextButton}
            disabled={
              (step === 2 && !formData.service) ||
              (step === 3 && !formData.rooms) ||
              (step === 4 && !formData.square)
            }
          >
            {step === questions.length ? "Продолжить" : "Далее"}
          </button>
        </div>
      </div>
    );
  };

  const renderFinalForm = () => (
    <form
      onSubmit={handleSubmit}
      className={`${styles.finalForm} ${
        isAnimating ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <h2 className={styles.formTitle}>Заполните контактные данные</h2>
      <p className={styles.formDescription}>
        Мы свяжемся с вами в ближайшее время
      </p>

      <div className={styles.inputGroup}>
        <label>Ваше имя</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Как к вам обращаться?"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Telegram</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (000)-00-00"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Коментарий</label>
        <input
          type="text"
          name="comment"
          onChange={handleChange}
          placeholder="например желаемая дата уборки"
          required
        />
      </div>
      <div className={styles.navigation}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
        >
          Назад
        </button>
        <button type="submit" className={styles.submitButton}>
          Отправить заявку
        </button>
      </div>
    </form>
  );

  const renderSuccess = () => (
    <div className={styles.successScreen}>
      <div className={styles.checkmark}>✓</div>
      <h2 className={styles.successTitle}>Спасибо за заявку!</h2>
      <p className={styles.successText}>
        Мы уже обрабатываем ваши данные и скоро свяжемся с вами в Telegram
      </p>
    </div>
  );

  return (
    <>
    <div id="calculate" className={styles.container}>
      {step === 0 && (
        <div
          className={`${styles.welcomeScreen} ${
            isAnimating ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>
              Расчитайте стоимость уборки
            </h1>
            <p className={styles.welcomeText}>
              Выберите нужные вам услуги и мы расчитаем примерную стоимость.
            </p>
            <button onClick={handleNext} className={styles.startButton}>
              Начать
            </button>
          </div>
        </div>
      )}

      {step === 1 && renderUser()}
      {step > 1 && step <= questions.length + 1 && renderQuestionLegally()}
      {step === questions.length + 2 && renderFinalForm()}
      {step === 7 && renderSuccess()}
    </div>
    </>
  );
}
