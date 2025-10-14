import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('🎯 Получена заявка на уборку:', body);

    const { name, phone } = body;
    
    if (!name || !phone) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Пожалуйста, заполните обязательные поля: имя и телефон' 
        },
        { status: 400 }
      );
    }

    // Автоматически отправляем в WhatsApp через Green API
    const result = await sendViaGreenAPI(body);

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Заявка успешно отправлена! Менеджер свяжется с вами в течение 15 минут.'
        },
        { status: 200 }
      );
    } else {
      throw new Error(result.error);
    }
    
  } catch (error) {
    console.error('❌ Ошибка при обработке заявки:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Произошла ошибка. Пожалуйста, позвоните нам напрямую.' 
      },
      { status: 500 }
    );
  }
}

// Автоматическая отправка через Green API
async function sendViaGreenAPI(data) {
  const GREEN_API_ID_INSTANCE = process.env.GREEN_API_ID_INSTANCE;
  const GREEN_API_TOKEN_INSTANCE = process.env.GREEN_API_TOKEN_INSTANCE;
  const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER;

  if (!GREEN_API_ID_INSTANCE || !GREEN_API_TOKEN_INSTANCE || !ADMIN_WHATSAPP_NUMBER) {
    throw new Error('Green API не настроен. Проверьте переменные окружения');
  }

  const message = createWhatsAppMessage(data);

  try {
    // Форматируем номер (убираем +)
    const formattedPhone = ADMIN_WHATSAPP_NUMBER.replace('+', '');

    const response = await fetch(
      `https://api.green-api.com/waInstance${GREEN_API_ID_INSTANCE}/sendMessage/${GREEN_API_TOKEN_INSTANCE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: `${formattedPhone}@c.us`,
          message: message
        }),
      }
    );

    const result = await response.json();

    if (response.ok && result.idMessage) {
      console.log('✅ Сообщение автоматически отправлено в WhatsApp через Green API, ID:', result.idMessage);
      return { success: true, id: result.idMessage };
    } else {
      console.error('❌ Ошибка Green API:', result);
      return { 
        success: false, 
        error: result.message || result?.text || 'Unknown error' 
      };
    }

  } catch (error) {
    console.error('❌ Ошибка отправки через Green API:', error);
    return { success: false, error: error.message };
  }
}

function createWhatsAppMessage(data) {
  const {
    user = 'Не указано',
    service = 'Не указана',
    rooms = 'Не указано',
    square = 'Не указана',
    name = 'Не указано',
    phone = 'Не указан',
    comment = '',
    additionalservices = [],
    totalPrice = 0,
    basePrice = 0,
    additionalPrice = 0
  } = data;

  let additionalServicesText = '🔧 Дополнительные услуги: нет';
  if (Array.isArray(additionalservices) && additionalservices.length > 0) {
    additionalServicesText = `🔧 Дополнительные услуги:\n${additionalservices.map(service => `• ${service}`).join('\n')}`;
  }

  return `🧹 *НОВАЯ ЗАЯВКА НА УБОРКУ*

👤 *Тип клиента:* ${user}
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}

🛠 *Основная услуга:* ${service}
🚪 *Комнат:* ${rooms}
📏 *Площадь:* ${square} м²

💰 *Стоимость:*
• Базовая цена: ${basePrice} ₽
• Доп. услуги: ${additionalPrice} ₽
• *Итого: ${totalPrice} ₽*

${additionalServicesText}

${comment ? `📝 *Комментарий:*\n${comment}` : ''}

⏰ *Получено:* ${new Date().toLocaleString('ru-RU')}
📍 *Источник:* сайт`;
}