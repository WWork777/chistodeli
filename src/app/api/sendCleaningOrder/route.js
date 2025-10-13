import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Здесь вы можете:
    // 1. Отправить email
    // 2. Сохранить в базу данных
    // 3. Отправить в Telegram бот
    // 4. Интегрировать с CRM системой
    
    console.log('Получена заявка на уборку:', body);


    return NextResponse.json(
      { success: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    return NextResponse.json(
      { success: false, message: 'Ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}