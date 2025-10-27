// components/ConsentModal.js
"use client";
import { useEffect } from 'react';

export default function ConsentModal({ isOpen, onClose }) {
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
    // Стили для контента согласия
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '24px 0 16px 0',
      textAlign: 'center'
    },
    paragraph: {
      marginBottom: '16px',
      fontSize: '15px',
      lineHeight: '1.6',
      textAlign: 'justify'
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
    },
    operatorInfo: {
      backgroundColor: '#f3f4f6',
      padding: '16px',
      borderRadius: '6px',
      marginBottom: '16px',
      borderLeft: '4px solid #2563eb'
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>СОГЛАСИЕ<br />субъекта на обработку персональных данных</h2>
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
            
            <div style={styles.operatorInfo}>
              <p style={styles.paragraph}>
                <strong>Оператор:</strong> Индивидуальный предприниматель Смирнов Андрей Леонидович<br />
                <strong>ИНН:</strong> 420510759590<br />
                <strong>ОГРНИП:</strong> 322420500078648<br />
                <strong>E-mail:</strong> t-kiva@yandex.ru
              </p>
            </div>

            <p style={styles.paragraph}>
              Используя ресурс, находящийся по адресу: https://klining-kemerovo.ru/,
              его сервисах или его поддоменах (далее - Сайт), а также переходя для
              дальнейшего взаимодействия с Оператором в мессенджер, и предоставляя ему
              свои персональных данные, я (далее - Пользователь), добровольно даю
              согласие на их обработку Оператору.
            </p>

            <h3 style={styles.sectionTitle}>ОБРАБАТЫВАЕМЫЕ ДАННЫЕ</h3>

            <p style={styles.paragraph}>
              Согласие распространяется на следующую информацию: Фамилия, имя, номер
              телефона, адрес электронной почты, информация о действиях Пользователя
              на сайте, данные о местоположении, cookie-файлы, данные,
              автоматически передаваемые с Сайта в процессе его использования
              с помощью установленного на устройстве Пользователя программного
              обеспечения, в т.ч. IP-адрес, индивидуальный сетевой номер устройства
              (MAC-адрес, ID устройства), электронный серийный номер (IMEI, MEID),
              информация о браузере, операционной системе, времени доступа, поисковых
              запросах Пользователя.
            </p>

            <h3 style={styles.sectionTitle}>ЦЕЛИ ОБРАБОТКИ</h3>

            <p style={styles.paragraph}>
              Согласие на обработку персональных данных дается мною в целях:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>идентификации стороны в рамках предоставляемой информации Пользователем с целью заключения договоров;</li>
              <li style={styles.listItem}>установления с Пользователем обратной связи, включая консультирование, реализацию услуг;</li>
              <li style={styles.listItem}>предоставления Пользователям услуг и/или для выполнения обязательств Оператором перед Пользователями в т.ч. уточнения тех или иных данных, дальнейшего совершенствования Сайта, разработки новых услуг.</li>
            </ul>

            <h3 style={styles.sectionTitle}>СПОСОБЫ ОБРАБОТКИ</h3>

            <p style={styles.paragraph}>
              Согласие предоставляется без принуждения, по собственной воле и в своих
              интересах в том числе на осуществление любых действий в отношении
              персональных данных, которые необходимы для достижения вышеуказанных
              целей, включая без ограничения: сбор, запись, накопление, систематизацию
              и хранение данных в своих информационных базах, находящихся в РФ,
              уточнение (обновление, изменение) данных, извлечение, использование,
              передачу (предоставление, доступ), обезличивание, блокирование, в случае
              обнаружения данных, не подлежащих обработке, уничтожение и удаление
              данных, которые перестали быть необходимыми, а также осуществление любых
              иных действий с персональными данными в соответствии с действующим
              законодательством.
            </p>

            <p style={styles.paragraph}>
              При обработке персональных данных Оператор не ограничен в применении
              способов их обработки.
            </p>

            <h3 style={styles.sectionTitle}>ПЕРЕДАЧА ТРЕТЬИМ ЛИЦАМ</h3>

            <p style={styles.paragraph}>
              Настоящим я признаю, что Оператор имеет право предоставить третьим лицам
              мои персональные данные, если:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>Я предоставляю свое прямое согласие на передачу своих персональных данных третьим лицам;</li>
              <li style={styles.listItem}>раскрытие моих персональных данных необходимо для оказания мне услуг и/или для обработки моих персональных данных.</li>
            </ul>

            <p style={styles.paragraph}>
              В случае, когда Оператор передает мои персональные данные третьим лицам, 
              Оператор обезличивает персональные данные или требует от третьих лиц соблюдения
              конфиденциальности моих персональных данных.
            </p>

            <h3 style={styles.sectionTitle}>ЯНДЕКС.МЕТРИКА</h3>

            <p style={styles.paragraph}>
              Кроме того, я информирован(-а) о том, что на Сайте размещена программа
              Яндекс.Метрика для сбора и анализа данных о посещаемости. Используя
              Сайт, я предоставляю своё согласие на обработку метрических данных о
              своих действиях на Сайте в целях автоматизации работы Сайта.
            </p>

            <h3 style={styles.sectionTitle}>СРОК ОБРАБОТКИ</h3>

            <p style={styles.paragraph}>
              Срок обработки персональных данных определяется моментом достижения
              целей обработки персональных данных, указанных в настоящем Согласии, а
              также определённых в п. 3.2 Политики конфиденциальности.
            </p>

            <p style={styles.paragraph}>
              В случае достижения цели обработки персональных данных оператор обязан
              прекратить обработку персональных данных и уничтожить персональные
              данные в срок, не превышающий 30 дней с даты достижения цели обработки
              персональных данных, если иное не предусмотрено договором, стороной
              которого, выгодоприобретателем или поручителем по которому является
              субъект персональных данных, иным соглашением между оператором и
              субъектом персональных данных либо если оператор не вправе осуществлять
              обработку персональных данных без согласия субъекта персональных данных
              на основаниях, предусмотренных настоящим Федеральным законом или другими
              федеральными законами.
            </p>

            <h3 style={styles.sectionTitle}>ПРАВА СУБЪЕКТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h3>

            <p style={styles.paragraph}>
              Я осознаю, что:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>имею право запросить у компании Оператора информацию об обработке моих персональных данных;</li>
              <li style={styles.listItem}>если откажусь предоставлять согласие на обработку персональных данных, а равно как и свои персональные данные, то не смогу пользоваться услугами компании Оператора и интернет-сервисами Оператора;</li>
              <li style={styles.listItem}>имею право в любой момент отозвать настоящее согласие, направив письменное уведомление с пометкой «Отзыв согласия на обработку персональных данных» по электронной почте Оператора: t-kiva@yandex.ru;</li>
              <li style={styles.listItem}>если потребую прекратить обработку данных, компания Оператора может продолжить обрабатывать данные без моего согласия в случае, если у меня будет заключен действующий договор с Оператором.</li>
            </ul>

            <h3 style={styles.sectionTitle}>ГАРАНТИИ И ОБЯЗАТЕЛЬСТВА</h3>

            <p style={styles.paragraph}>
              Я гарантирую, что представленная мной информация является полной, точной
              и достоверной, а также что при представлении информации не нарушаются
              действующее законодательство Российской Федерации, законные права и
              интересы третьих лиц. Вся представленная информация заполнена мною в
              отношении себя лично.
            </p>

            <p style={styles.paragraph}>
              За исключением случаев, предусмотренных действующим законодательством РФ
              и настоящим Соглашением, Оператор обязуется:
            </p>

            <ul style={styles.list}>
              <li style={styles.listItem}>без прямого согласия Пользователя не передавать персональные данные Пользователя третьим лицам;</li>
              <li style={styles.listItem}>не обмениваться персональными данными Пользователя с третьими лицами;</li>
              <li style={styles.listItem}>не публиковать и не распространять данные неограниченному кругу лиц;</li>
              <li style={styles.listItem}>не передавать данные за границу РФ.</li>
            </ul>

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