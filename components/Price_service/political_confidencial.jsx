// components/PrivacyPolicyModal.js
import { useEffect } from 'react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  // Блокировка скролла при открытой модалке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Стили
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '20px',
      zIndex: 1000,
      overflowY: 'auto'
    },
    container: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      maxWidth: '800px',
      width: '100%',
      margin: '40px auto',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '28px',
      color: '#6b7280',
      cursor: 'pointer',
      padding: 0,
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      padding: '24px',
      overflowY: 'auto',
      flex: 1,
      maxHeight: '60vh'
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '20px 24px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb'
    },
    confirmBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '10px 24px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    // Стили для контента политики
    updateDate: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '20px'
    },
    intro: {
      marginBottom: '24px',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '24px 0 12px 0'
    },
    paragraph: {
      marginBottom: '16px',
      fontSize: '15px',
      lineHeight: '1.6'
    },
    subparagraph: {
      marginBottom: '12px',
      fontSize: '15px',
      lineHeight: '1.6',
      paddingLeft: '16px'
    },
    list: {
      margin: '12px 0',
      paddingLeft: '32px'
    },
    listItem: {
      marginBottom: '8px',
      fontSize: '15px',
      lineHeight: '1.5'
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Политика конфиденциальности</h2>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            onMouseEnter={(e) => e.target.style.color = '#374151'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div style={styles.content}>
          <div style={{ color: '#374151', lineHeight: '1.6' }}>
            <p style={styles.updateDate}>Последнее обновление: 17.10.2025</p>
            
            <p style={styles.intro}>
              Настоящая Политика конфиденциальности персональных данных (далее — Политика конфиденциальности) 
              действует в отношении всей информации, которую данный сайт, на котором размещен текст этой Политики 
              конфиденциальности, может получить о Пользователе, а также любых программ и продуктов, размещенных на нем.
            </p>

            <h3 style={styles.sectionTitle}>1. Определение терминов</h3>
            <p style={styles.paragraph}>
              <strong>1.1</strong> В настоящей Политике конфиденциальности используются следующие термины:
            </p>
            
            <p style={styles.subparagraph}>
              <strong>1.1.1.</strong> «Администрация сайта» – уполномоченные сотрудники на управления сайтом, 
              действующие от его имени, которые организуют и (или) осуществляет обработку персональных данных, 
              а также определяет цели обработки персональных данных, состав персональных данных, подлежащих обработке, 
              действия (операции), совершаемые с персональными данными.
            </p>
            
            <p style={styles.subparagraph}>
              <strong>1.1.2.</strong> «Персональные данные» — любая информация, относящаяся к прямо или косвенно 
              определенному или определяемому физическому лицу (субъекту персональных данных).
            </p>
            
            <p style={styles.subparagraph}>
              <strong>1.1.3.</strong> «Обработка персональных данных» — любое действие (операция) или совокупность 
              действий (операций), совершаемых с использованием средств автоматизации или без использования таких 
              средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение 
              (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), 
              обезличивание, блокирование, удаление, уничтожение персональных данных.
            </p>

            <p style={styles.subparagraph}>
              <strong>1.1.4.</strong> «Конфиденциальность персональных данных» — обязательное для соблюдения 
              Администрацией сайта требование не допускать их умышленного распространения без согласия субъекта 
              персональных данных или наличия иного законного основания.
            </p>

            <p style={styles.subparagraph}>
              <strong>1.1.5.</strong> «Пользователь сайта (далее Пользователь)» – лицо, имеющее доступ к сайту, 
              посредством сети Интернет и использующее данный сайт для своих целей.
            </p>

            <p style={styles.subparagraph}>
              <strong>1.1.6.</strong> «Cookies» — небольшой фрагмент данных, отправленный веб-сервером и хранимый 
              на компьютере пользователя, который веб-клиент или веб-браузер каждый раз пересылает веб-серверу в 
              HTTP-запросе при попытке открыть страницу соответствующего сайта.
            </p>

            <p style={styles.subparagraph}>
              <strong>1.1.7.</strong> «IP-адрес» — уникальный сетевой адрес узла в компьютерной сети, построенной по протоколу IP.
            </p>

            <h3 style={styles.sectionTitle}>2. Общие положения</h3>
            <p style={styles.paragraph}>
              <strong>2.1.</strong> Использование Пользователем сайта означает согласие с настоящей Политикой 
              конфиденциальности и условиями обработки персональных данных Пользователя.
            </p>
            
            <p style={styles.paragraph}>
              <strong>2.2.</strong> В случае несогласия с условиями Политики конфиденциальности Пользователь 
              должен прекратить использование сайта.
            </p>

            <p style={styles.paragraph}>
              <strong>2.3.</strong> Настоящая Политика конфиденциальности применяется только к данному сайту. 
              Администрация сайта не контролирует и не несет ответственность за сайты третьих лиц, на которые 
              Пользователь может перейти по ссылкам, доступным на данном сайте.
            </p>

            <p style={styles.paragraph}>
              <strong>2.4.</strong> Администрация сайта не проверяет достоверность персональных данных, 
              предоставляемых Пользователем сайта.
            </p>

            <h3 style={styles.sectionTitle}>3. Предмет политики конфиденциальности</h3>
            <p style={styles.paragraph}>
              <strong>3.1.</strong> Настоящая Политика конфиденциальности устанавливает обязательства Администрации 
              сайта по умышленному неразглашению персональных данных, которые Пользователь предоставляет по 
              разнообразным запросам Администрации сайта (например, при регистрации на сайте, оформлении заказа, 
              подписки на уведомления и т.п).
            </p>

            <p style={styles.paragraph}>
              <strong>3.2.</strong> Персональные данные, разрешённые к обработке в рамках настоящей Политики 
              конфиденциальности, предоставляются Пользователем путём заполнения специальных форм на Сайте и 
              обычно включают в себя следующую информацию:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>Имя Пользователя;</li>
              <li style={styles.listItem}>Контактный телефон Пользователя;</li>
              <li style={styles.listItem}>Адрес электронной почты (e-mail);</li>
            </ul>

            <p style={styles.paragraph}>
              <strong>3.3.</strong> Администрация сайта также принимает усилия по защите Персональных данных, 
              которые автоматически передаются в процессе посещения страниц сайта: IP адрес; информация из cookies; 
              информация о браузере (или иной программе, которая осуществляет доступ к сайту); время доступа; 
              посещенные адреса страниц; реферер (адрес предыдущей страницы) и т.п.
            </p>

            <p style={styles.paragraph}>
              <strong>3.3.1.</strong> Отключение cookies может повлечь невозможность доступа к сайту.
            </p>

            <p style={styles.paragraph}>
              <strong>3.3.2.</strong> Сайт осуществляет сбор статистики об IP-адресах своих посетителей. 
              Данная информация используется с целью выявления и решения технических проблем, для контроля 
              корректности проводимых операций.
            </p>

            <p style={styles.paragraph}>
              <strong>3.4.</strong> Любая иная персональная информация не оговоренная выше (история покупок, 
              используемые браузеры и операционные системы и т.д.) не подлежит умышленному разглашению, за 
              исключением случаев, предусмотренных в п.п. 5.2. и 5.3. настоящей Политики конфиденциальности.
            </p>

            <h3 style={styles.sectionTitle}>4. Цели сбора персональной информации пользователя</h3>
            <p style={styles.paragraph}>
              <strong>4.1.</strong> Персональные данные Пользователя Администрация сайта может использовать в целях:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования сайта, оказания услуг, обработка запросов и заявок от Пользователя.</li>
              <li style={styles.listItem}>Подтверждения достоверности и полноты персональных данных, предоставленных Пользователем.</li>
              <li style={styles.listItem}>Уведомления Пользователя сайта о состоянии Заказа.</li>
              <li style={styles.listItem}>Предоставления Пользователю эффективной клиентской и технической поддержки при возникновении проблем связанных с использованием сайта.</li>
            </ul>

            <h3 style={styles.sectionTitle}>5. Способы и сроки обработки персональной информации</h3>
            <p style={styles.paragraph}>
              <strong>5.1.</strong> Обработка персональных данных Пользователя осуществляется без ограничения срока, 
              любым законным способом, в том числе в информационных системах персональных данных с использованием 
              средств автоматизации или без использования таких средств.
            </p>

            <p style={styles.paragraph}>
              <strong>5.2.</strong> Пользователь соглашается с тем, что Администрация сайта вправе передавать 
              персональные данные третьим лицам, в частности, курьерским службам, организациями почтовой связи, 
              операторам электросвязи, исключительно в целях выполнения заявок Пользователя.
            </p>

            <p style={styles.paragraph}>
              <strong>5.3.</strong> Персональные данные Пользователя могут быть переданы уполномоченным органам 
              государственной власти только по основаниям и в порядке, установленным действующим законодательством.
            </p>

            <h3 style={styles.sectionTitle}>6. Обязательства сторон</h3>
            <p style={styles.paragraph}><strong>6.1. Пользователь обязуется:</strong></p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Предоставить корректную и правдивую информацию о персональных данных, необходимую для пользования сайтом.</li>
              <li style={styles.listItem}>Обновить или дополнить предоставленную информацию о персональных данных в случае изменения данной информации.</li>
              <li style={styles.listItem}>Принимать меры для защиты доступа к своим конфиденциальным данным, хранящимся на сайте.</li>
            </ul>

            <p style={styles.paragraph}><strong>6.2. Администрация сайта обязуется:</strong></p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Использовать полученную информацию исключительно для целей, указанных в п. 4 настоящей Политики конфиденциальности.</li>
              <li style={styles.listItem}>Не разглашать персональных данных Пользователя, за исключением п.п. 5.2. и 5.3. настоящей Политики Конфиденциальности.</li>
              <li style={styles.listItem}>Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя или его законного представителя либо уполномоченного органа по защите прав субъектов персональных данных на период проверки, в случае выявления неправомерных действий.</li>
            </ul>

            <h3 style={styles.sectionTitle}>7. Ответственность сторон</h3>
            <p style={styles.paragraph}>
              <strong>7.1.</strong> Администрация сайта несёт ответственность за умышленное разглашение Персональных 
              данных Пользователя в соответствии с действующим законодательством, за исключением случаев, предусмотренных 
              п.п. 5.2., 5.3. и 7.2. настоящей Политики Конфиденциальности.
            </p>

            <p style={styles.paragraph}>
              <strong>7.2.</strong> В случае утраты или разглашения Персональных данных Администрация сайта не несёт 
              ответственность, если данная конфиденциальная информация:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>Стала публичным достоянием до её утраты или разглашения.</li>
              <li style={styles.listItem}>Была получена от третьей стороны до момента её получения Администрацией сайта.</li>
              <li style={styles.listItem}>Была получена третьими лицами путем несанкционированного доступа к файлам сайта.</li>
              <li style={styles.listItem}>Была разглашена с согласия Пользователя.</li>
            </ul>

            <p style={styles.paragraph}>
              <strong>7.3.</strong> Пользователь несет ответственность за правомерность, корректность и правдивость 
              предоставленной Персональных данных в соответствии с действующим законодательством.
            </p>

            <h3 style={styles.sectionTitle}>8. Разрешение споров</h3>
            <p style={styles.paragraph}>
              <strong>8.1.</strong> До обращения в суд с иском по спорам, возникающим из отношений между Пользователем 
              сайта и Администрацией сайта, обязательным является предъявление претензии (письменного предложения 
              о добровольном урегулировании спора).
            </p>

            <p style={styles.paragraph}>
              <strong>8.2.</strong> Получатель претензии в течение 30 календарных дней со дня получения претензии, 
              письменно уведомляет заявителя претензии о результатах рассмотрения претензии.
            </p>

            <p style={styles.paragraph}>
              <strong>8.3.</strong> При недостижении соглашения спор будет передан на рассмотрение в судебный орган 
              в соответствии с действующим законодательством.
            </p>

            <p style={styles.paragraph}>
              <strong>8.4.</strong> К настоящей Политике конфиденциальности и отношениям между Пользователем и 
              Администрацией сайта применяется действующее законодательство.
            </p>

            <h3 style={styles.sectionTitle}>9. Дополнительные условия</h3>
            <p style={styles.paragraph}>
              <strong>9.1.</strong> Администрация сайта вправе вносить изменения в настоящую Политику конфиденциальности 
              без согласия Пользователя.
            </p>

            <p style={styles.paragraph}>
              <strong>9.2.</strong> Новая Политика конфиденциальности вступает в силу с момента ее размещения на Сайте, 
              если иное не предусмотрено новой редакцией Политики конфиденциальности.
            </p>
            <section className="privacy-policy__section">
                <h3 className="privacy-policy__section-title">10. Использование файлов cookie</h3>
                
                <p className="privacy-policy__paragraph">
                  <strong>10.1.</strong> Наш сайт использует файлы cookie и аналогичные технологии для обеспечения 
                  корректной работы сайта, анализа трафика и улучшения пользовательского опыта.
                </p>

                <p className="privacy-policy__paragraph">
                  <strong>10.2.</strong> Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем 
                  устройстве при посещении сайта. Они помогают сайту запоминать ваши действия и предпочтения.
                </p>

                <p className="privacy-policy__paragraph">
                  <strong>10.3.</strong> Мы используем следующие типы cookie:
                </p>

                <ul className="privacy-policy__list">
                  <li className="privacy-policy__list-item">
                    <strong>Обязательные (essential) cookie:</strong> необходимы для работы основных функций сайта, 
                    таких как навигация, безопасность и доступ к защищенным разделам. Эти cookie не могут быть отключены.
                  </li>
                  <li className="privacy-policy__list-item">
                    <strong>Аналитические (analytical) cookie:</strong> помогают нам понимать, как посетители 
                    взаимодействуют с сайтом, собирая информацию анонимно. Эти данные используются для улучшения 
                    работы сайта.
                  </li>
                  <li className="privacy-policy__list-item">
                    <strong>Функциональные (functional) cookie:</strong> позволяют сайту запоминать ваши предпочтения 
                    (например, имя пользователя, язык, регион) и предоставлять улучшенные персонализированные функции.
                  </li>
                </ul>

                <p className="privacy-policy__paragraph">
                  <strong>10.4.</strong> Срок хранения cookie:
                </p>
                <ul className="privacy-policy__list">
                  <li className="privacy-policy__list-item">Сессионные cookie: удаляются после закрытия браузера</li>
                  <li className="privacy-policy__list-item">Постоянные cookie: сохраняются на устройстве до истечения срока их действия или ручного удаления</li>
                </ul>

                <p className="privacy-policy__paragraph">
                  <strong>10.5.</strong> Управление cookie:
                </p>
                <p className="privacy-policy__paragraph">
                  Вы можете управлять использованием cookie через настройки вашего браузера. Обратите внимание, что 
                  отключение некоторых типов cookie может повлиять на функциональность сайта и ограничить доступ к 
                  определенным функциям.
                </p>

                <p className="privacy-policy__paragraph">
                  <strong>10.6.</strong> Согласие на использование cookie:
                </p>
                <p className="privacy-policy__paragraph">
                  Продолжая использовать наш сайт, вы даёте согласие на использование файлов cookie в соответствии 
                  с настоящей политикой. При первом посещении сайта вам будет предложено принять использование cookie.
                </p>
              </section>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button
            onClick={onClose}
            style={styles.confirmBtn}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}