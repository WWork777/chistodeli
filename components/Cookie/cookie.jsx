"use client";
import { useState, useEffect } from 'react';
import PrivacyPolicyModal from '../Price_service/political_confidencial';
import './cookie.scss';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const openPolicy = () => {
    setIsPolicyOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="cookie-consent">
        <div className="cookie-consent__container">
          <div className="cookie-consent__content">
            <p className="cookie-consent__text">
              Мы используем cookie-файлы для улучшения работы сайта. 
              Оставаясь на сайте, вы соглашаетесь с использованием cookies.
              {' '}
              <button 
                className="cookie-consent__link"
                onClick={openPolicy}
              >
                Подробнее
              </button>
            </p>
          </div>
          
          <div className="cookie-consent__buttons">
            <button 
              className="cookie-consent__button cookie-consent__button--reject"
              onClick={rejectCookies}
            >
              Отклонить
            </button>
            <button 
              className="cookie-consent__button cookie-consent__button--accept"
              onClick={acceptCookies}
            >
              Принять
            </button>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal 
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </>
  );
}