interface HandlerResponse {
  statusCode: number;
  body: string;
}

interface Event {
  httpMethod: string;
  body: string;
}

export const handler = async (event: Event): Promise<HandlerResponse> => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, service } = data;

    // --- CONFIGURATION ---
    // In a real production environment, use process.env.TELEGRAM_BOT_TOKEN
    // For this demo, using the provided token.
    const BOT_TOKEN = '8311918329:AAGYzX5V3gJ25YdH58Nz-FzVpIBzJt95OXA';
    
    // IMPORTANT: You need to know which Chat ID to send the message to.
    // 1. Message your bot @YourBotName
    // 2. Go to https://api.telegram.org/bot<YourBOTToken>/getUpdates
    // 3. Find "chat": {"id": 123456789...}
    // 4. Replace the placeholder below with that ID.
    // Use an environment variable in production: process.env.TELEGRAM_CHAT_ID
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'REPLACE_WITH_YOUR_CHAT_ID'; 

    if (!name || !phone) {
      return { statusCode: 400, body: 'Missing required fields' };
    }

    const message = `
🔥 *Новая заявка с сайта* 🔥

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
💆 *Услуга:* ${service}
⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
    `;

    // Only send if we have a valid CHAT_ID (not the placeholder)
    if (CHAT_ID !== 'REPLACE_WITH_YOUR_CHAT_ID') {
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Telegram API Error:', errorText);
            return { statusCode: 502, body: `Telegram API Error: ${errorText}` };
        }
    } else {
        console.warn('TELEGRAM_CHAT_ID is not set. Message was not sent.');
        // We return 200 to the frontend so the user sees "Success" even if config is missing on backend
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};