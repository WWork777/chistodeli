// app/api/new-year-application/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('🎄 Новогодняя заявка:', body);

    const { name, phone } = body;
    
    if (!name || !phone) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Заполните имя и телефон' 
        },
        { status: 400 }
      );
    }

    // Отправляем в WhatsApp
    const result = await sendToWhatsApp(name, phone);

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Заявка отправлена!'
        },
        { status: 200 }
      );
    } else {
      throw new Error(result.error);
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка отправки' 
      },
      { status: 500 }
    );
  }
}

async function sendToWhatsApp(name, phone) {
  const GREEN_API_ID_INSTANCE = process.env.GREEN_API_ID_INSTANCE;
  const GREEN_API_TOKEN_INSTANCE = process.env.GREEN_API_TOKEN_INSTANCE;
  const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER;

  if (!GREEN_API_ID_INSTANCE || !GREEN_API_TOKEN_INSTANCE || !ADMIN_WHATSAPP_NUMBER) {
    console.error('❌ WhatsApp не настроен');
    return { success: false, error: 'WhatsApp не настроен' };
  }

  const message = `🎄 НОВОГОДНЯЯ ЗАЯВКА 🎄

👤 Имя: ${name}
📞 Тел: ${phone}

🎁 Акция: Химчистка дивана БЕСПЛАТНО!
⏰ Действует до: 31.12.2025

📌 Источник: Новогодняя акция
🕐 ${new Date().toLocaleTimeString('ru-RU')}

❗ Срочно перезвонить!`;

  try {
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
      console.log('✅ WhatsApp отправлен:', result.idMessage);
      return { success: true };
    } else {
      console.error('❌ WhatsApp ошибка:', result);
      return { success: false, error: 'Ошибка WhatsApp' };
    }

  } catch (error) {
    console.error('❌ Ошибка:', error);
    return { success: false, error: error.message };
  }
}