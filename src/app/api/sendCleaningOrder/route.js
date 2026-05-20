import { NextResponse } from 'next/server';

// Валидация и санитизация входных данных
function validateInput(data) {
  const errors = [];

  // Валидация имени
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Имя обязательно для заполнения');
  } else if (data.name.trim().length < 2) {
    errors.push('Имя должно содержать минимум 2 символа');
  } else if (data.name.length > 100) {
    errors.push('Имя слишком длинное (максимум 100 символов)');
  }

  // Валидация телефона
  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('Телефон обязателен для заполнения');
  } else {
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      errors.push('Некорректный формат телефона');
    }
  }

  // Валидация комментария (если есть)
  if (
    data.comment &&
    typeof data.comment === 'string' &&
    data.comment.length > 1000
  ) {
    errors.push('Комментарий слишком длинный (максимум 1000 символов)');
  }

  // Валидация числовых полей
  if (data.square !== undefined) {
    const square = Number(data.square);
    if (isNaN(square) || square < 1 || square > 10000) {
      errors.push('Площадь должна быть от 1 до 10000 м²');
    }
  }

  if (data.totalPrice !== undefined) {
    const price = Number(data.totalPrice);
    if (isNaN(price) || price < 0 || price > 10000000) {
      errors.push('Некорректная стоимость');
    }
  }

  // Валидация массива дополнительных услуг
  if (data.additionalservices && !Array.isArray(data.additionalservices)) {
    errors.push('Дополнительные услуги должны быть массивом');
  } else if (data.additionalservices && data.additionalservices.length > 50) {
    errors.push('Слишком много дополнительных услуг');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Санитизация данных
function sanitizeInput(data) {
  return {
    user:
      typeof data.user === 'string'
        ? data.user.trim().substring(0, 50)
        : 'Не указано',
    service:
      typeof data.service === 'string'
        ? data.service.trim().substring(0, 100)
        : 'Не указана',
    rooms:
      typeof data.rooms === 'string'
        ? data.rooms.trim().substring(0, 10)
        : 'Не указано',
    square:
      typeof data.square === 'number'
        ? Math.max(1, Math.min(10000, Math.round(data.square)))
        : 0,
    name:
      typeof data.name === 'string'
        ? data.name.trim().substring(0, 100)
        : 'Не указано',
    phone:
      typeof data.phone === 'string'
        ? data.phone.trim().substring(0, 20)
        : 'Не указан',
    cleaningDate:
      typeof data.cleaningDate === 'string' && data.cleaningDate.trim()
        ? data.cleaningDate.trim().substring(0, 20)
        : '',
    comment:
      typeof data.comment === 'string'
        ? data.comment.trim().substring(0, 1000)
        : '',
    additionalservices: Array.isArray(data.additionalservices)
      ? data.additionalservices
          .filter((item) => typeof item === 'string')
          .map((item) => item.trim().substring(0, 200))
          .slice(0, 50)
      : [],
    totalPrice:
      typeof data.totalPrice === 'number'
        ? Math.max(0, Math.min(10000000, Math.round(data.totalPrice)))
        : 0,
    basePrice:
      typeof data.basePrice === 'number'
        ? Math.max(0, Math.min(10000000, Math.round(data.basePrice)))
        : 0,
    additionalPrice:
      typeof data.additionalPrice === 'number'
        ? Math.max(0, Math.min(10000000, Math.round(data.additionalPrice)))
        : 0,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Валидация входных данных
    const validation = validateInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.errors.join(', '),
        },
        { status: 400 }
      );
    }

    // Санитизация данных
    const sanitizedData = sanitizeInput(body);

    // Логируем только безопасные данные (без чувствительной информации)
    console.log('🎯 Получена заявка на уборку:', {
      name: sanitizedData.name.substring(0, 3) + '***',
      phone: sanitizedData.phone.substring(0, 4) + '***',
      service: sanitizedData.service,
    });

    // === ОТПРАВКА ЧЕРЕЗ GREEN-API (WHATSAPP) ===
    const Phone = "79050783111";
    const idInstance = "3100517801";
    const apiTokenInstance = "4e23b210658549c881680633b93bb11301a0f304a927433da6";
    
    const maxResponse = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: `${Phone}@c.us`,
          message: createTelegramMessage(sanitizedData),
        }),
      }
    );

    // Корректно считываем ответ от Green-API
    const result = await maxResponse.json();
    
    // Green-API возвращает { idMessage: "..." } при успехе или { error: "...", errorDescription: "..." } при ошибке
    if (maxResponse.ok && result.idMessage) {
      console.log('✅ Сообщение отправлено в WhatsApp, ID:', result.idMessage);
      
      return NextResponse.json(
        {
          success: true,
          message: 'Заявка успешно отправлена! Менеджер свяжется с вами в течение 15 минут.',
        },
        { status: 200 }
      );
    } else {
      console.error('❌ Ошибка Green-API:', result);
      throw new Error(result.errorDescription || result.error || 'Ошибка отправки сообщения');
    }

    // === TELEGRAM ЗАКОММЕНТИРОВАН ===
    // const result = await sendViaTelegram(sanitizedData);
    // if (result.success) { ... }

  } catch (error) {
    // Не раскрываем детали ошибки клиенту
    console.error('❌ Ошибка при обработке заявки:', error.message);

    return NextResponse.json(
      {
        success: false,
        message: 'Произошла ошибка. Пожалуйста, позвоните нам напрямую.',
      },
      { status: 500 }
    );
  }
}

// === ФУНКЦИИ TELEGRAM ЗАКОММЕНТИРОВАНЫ ===
// Автоматическая отправка через Telegram Bot API
/*
async function sendViaTelegram(data) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error(
      'Telegram Bot не настроен. Проверьте переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID'
    );
  }

  // Валидация формата токена (базовая проверка)
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(TELEGRAM_BOT_TOKEN)) {
    throw new Error('Некорректный формат токена Telegram бота');
  }

  // Валидация Chat ID (должен быть числом или строкой с числом)
  const chatIdNum = Number(TELEGRAM_CHAT_ID);
  if (isNaN(chatIdNum)) {
    throw new Error('Некорректный формат Chat ID');
  }

  const message = createTelegramMessage(data);

  // Проверка длины сообщения (Telegram лимит 4096 символов)
  if (message.length > 4096) {
    console.warn('⚠️ Сообщение слишком длинное, обрезаем до 4096 символов');
    const truncatedMessage =
      message.substring(0, 4000) + '\n\n... (сообщение обрезано)';
    return await sendMessage(TELEGRAM_BOT_TOKEN, chatIdNum, truncatedMessage);
  }

  return await sendMessage(TELEGRAM_BOT_TOKEN, chatIdNum, message);
}

// Отправка сообщения в Telegram
async function sendMessage(token, chatId, message) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const result = await response.json();

    if (response.ok && result.ok) {
      console.log(
        '✅ Сообщение автоматически отправлено в Telegram, ID:',
        result.result.message_id
      );
      return { success: true, id: result.result.message_id };
    } else {
      console.error('❌ Ошибка Telegram API:', {
        error_code: result.error_code,
        description: result.description?.substring(0, 100),
      });
      return {
        success: false,
        error: result.description || 'Unknown error',
      };
    }
  } catch (error) {
    console.error('❌ Ошибка отправки через Telegram API:', error.message);
    return { success: false, error: 'Ошибка отправки сообщения' };
  }
}
*/

// Форматирование даты для читаемого вида
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch (error) {
    return dateString;
  }
}

function createTelegramMessage(data) {
  const {
    user = 'Не указано',
    service = 'Не указана',
    rooms = 'Не указано',
    square = 'Не указана',
    name = 'Не указано',
    phone = 'Не указан',
    cleaningDate = '',
    comment = '',
    additionalservices = [],
    totalPrice = 0,
    basePrice = 0,
    additionalPrice = 0,
  } = data;

  // Функция для экранирования специальных символов Markdown
  const escapeMarkdown = (text) => {
    if (typeof text !== 'string') text = String(text);
    return text
      .replace(/\_/g, '\\_')
      .replace(/\*/g, '\\*')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\~/g, '\\~')
      .replace(/\`/g, '\\`')
      .replace(/\>/g, '\\>')
      .replace(/\#/g, '\\#')
      .replace(/\+/g, '\\+')
      .replace(/\-/g, '\\-')
      .replace(/\=/g, '\\=')
      .replace(/\|/g, '\\|')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\./g, '\\.')
      .replace(/\!/g, '\\!');
  };

  let additionalServicesText = '🔧 *Дополнительные услуги:* нет';
  if (Array.isArray(additionalservices) && additionalservices.length > 0) {
    const servicesList = additionalservices
      .map((service) => `• ${escapeMarkdown(service)}`)
      .join('\n');
    additionalServicesText = `🔧 *Дополнительные услуги:*\n${servicesList}`;
  }

  return `🧹 *НОВАЯ ЗАЯВКА НА УБОРКУ*

👤 *Тип клиента:* ${escapeMarkdown(user)}
👤 *Имя:* ${escapeMarkdown(name)}
📞 *Телефон:* ${escapeMarkdown(phone)}

🛠 *Основная услуга:* ${escapeMarkdown(service)}
🚪 *Комнат:* ${escapeMarkdown(rooms)}
📏 *Площадь:* ${escapeMarkdown(square)} м²

${
  cleaningDate
    ? `📅 *Дата уборки:* ${escapeMarkdown(formatDate(cleaningDate))}`
    : ''
}

💰 *Стоимость:*
• Базовая цена: ${basePrice.toLocaleString()} ₽
• Доп\\. услуги: ${additionalPrice.toLocaleString()} ₽
• *Итого: ${totalPrice.toLocaleString()} ₽*

${additionalServicesText}

${comment ? `📝 *Комментарий:*\n${escapeMarkdown(comment)}` : ''}

⏰ *Получено:* ${escapeMarkdown(new Date().toLocaleString('ru-RU'))}
📍 *Источник:* сайт`;
}