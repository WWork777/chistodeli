export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Просто логируем данные в консоль
    console.log('📥 Получены данные с квиза:', {
      timestamp: new Date().toISOString(),
      ...formData
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Данные успешно получены" 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error("Ошибка обработки запроса:", error);
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка сервера" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}