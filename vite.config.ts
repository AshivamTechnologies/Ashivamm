import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const RESTAURANT_SYSTEM_INSTRUCTION = `
You are the elite AI Concierge for "Saffron & Stone Indian Kitchen", a premier luxury modern Indian restaurant located at 14/B Heritage Promenade, Colaba Waterfront, Mumbai, operated in technology partnership with Ashivam Technologies.

Key Restaurant Details:
- Name: Saffron & Stone Indian Kitchen (Operations & Tech by Ashivam Technologies).
- Cuisine: Handcrafted royal & modern Indian fine dining, featuring Dum Biryanis, Stone-Grilled Kebabs, Rich Vegetarian Curries, Royal Thalis, Tandoori Starters, Artisanal Desserts, and Infused Drinks.
- Address: 14/B Heritage Promenade, Colaba Waterfront, Mumbai, Maharashtra 400001.
- Phone: +91 98765 43210 / +91 22 4892 1100.
- Email: hello@saffronandstone.in
- Opening Hours: Mon – Thu: 11:00 AM – 10:30 PM; Fri – Sun: 10:00 AM – 11:30 PM. Lunch: 11:00 AM – 3:30 PM. Dinner: 7:00 PM – 10:30 PM.
- Highlights:
  * Saffron Special Biryani (₹795, slow-cooked in sealed clay handi with Kashmiri saffron).
  * Stone-Grilled Chicken (₹685, charred over volcanic basalt rocks).
  * Creamy Butter Paneer (₹565, velvety tomato-cashew reduction).
  * Maharaja Royal Veg Thali (₹695, 3 curries, dal makhani, saffron pulao, breads, dessert).
  * Tandoori Platter (₹895), Garlic Butter Prawns (₹745), Chocolate Lava Cake with saffron ice cream (₹385).
  * Drinks: Royal Saffron Kesar Lassi (₹220), Smoked Masala Chaas (₹180), Kokum Basil Fizz (₹240), Mumbai Cutting Chai (₹120).
- Dietary Information: 100% Halal meat, extensive dedicated Vegetarian kitchen section, Jain preparations available upon request (no onion/garlic), gluten-free roti/dishes labeled, vegan options ready.
- Reservations: Available online via the website booking form or phone. Accommodates 1 to 20+ guests. Private dining rooms for celebrations and corporate dinners.
- Tech Partner: Ashivam Technologies delivers smart digital operations, contactless ordering, review collection, and digital guest concierge.

Guidelines for responses:
1. Be warm, hospitable, polite, and enthusiastic about Indian culinary heritage.
2. Provide concise, clear answers (2 to 4 sentences or brief bullet points).
3. Always invite the guest to reserve a table or order online if relevant.
4. If asked about allergens or special dietary requests (Jain, vegan, nut allergies), provide reassuring, clear specifics.
`;

function generateLocalResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('menu') || q.includes('dish') || q.includes('food') || q.includes('eat')) {
    return "Our culinary highlights include our signature **Saffron Special Biryani** (₹795), **Stone-Grilled Chicken** (₹685), **Creamy Butter Paneer** (₹565), and the grand **Maharaja Royal Veg Thali** (₹695). We offer extensive vegetarian curries, tandoori starters, dum biryanis, and artisanal desserts!";
  }
  if (q.includes('veg') || q.includes('vegetarian') || q.includes('jain') || q.includes('vegan')) {
    return "We take immense pride in our dedicated vegetarian and Jain preparations! Popular choices include the Creamy Butter Paneer, Dal Makhani Dum Pukht, Subz Dum Biryani, and the Maharaja Thali. Jain options without onion and garlic can be prepared fresh upon request.";
  }
  if (q.includes('spice') || q.includes('spicy') || q.includes('hot')) {
    return "We customize heat levels to your exact preference—from Mild (child-friendly aromatic) to Medium and Fiery Desi Hot! Just let your server or reservation note know your preferred spice level.";
  }
  if (q.includes('book') || q.includes('reserv') || q.includes('table') || q.includes('timing') || q.includes('hour')) {
    return "We are open Monday to Thursday from 11:00 AM – 10:30 PM, and Friday to Sunday from 10:00 AM – 11:30 PM. You can reserve a table anytime using our online Reservation form above or by calling +91 98765 43210.";
  }
  if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('mumbai') || q.includes('colaba')) {
    return "Saffron & Stone is located at **14/B Heritage Promenade, Colaba Waterfront, Mumbai, Maharashtra 400001**, overlooking the tranquil Arabian Sea waters.";
  }
  if (q.includes('ashivam') || q.includes('partner') || q.includes('company') || q.includes('technology')) {
    return "Ashivam Technologies is our smart restaurant operations partner, powering our digital menus, reservation flows, and guest experience solutions. You can review their partner profile in our Contact and Footer sections!";
  }
  if (q.includes('drink') || q.includes('beverage') || q.includes('lassi') || q.includes('cocktail') || q.includes('tea')) {
    return "Quench your thirst with our chilled **Royal Saffron Kesar Lassi** (₹220), **Smoked Masala Chaas** (₹180), **Kokum Basil Fizz** (₹240), or authentic **Mumbai Masala Cutting Chai** (₹120)!";
  }
  if (q.includes('price') || q.includes('cost') || q.includes('rate')) {
    return "Our dishes range from ₹120–₹240 for drinks, ₹385–₹520 for starters & desserts, ₹480–₹685 for rich curries, and ₹695–₹895 for signature royal biryanis and chef platters.";
  }

  return "Welcome to Saffron & Stone Indian Kitchen! We would be delighted to assist you with dish recommendations, spice preferences, table reservations for lunch or dinner, and dietary requirements. How can I help you today?";
}

function apiMiddlewarePlugin(): Plugin {
  let aiClient: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      aiClient = new GoogleGenAI({});
    } catch (err) {
      console.warn('Could not initialize GoogleGenAI client in Vite dev:', err);
    }
  }

  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'ok',
            restaurant: 'Saffron & Stone Indian Kitchen',
            partner: 'Ashivam Technologies',
            aiEnabled: Boolean(apiKey),
          }));
          return;
        }

        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { message, conversationHistory } = JSON.parse(body || '{}');
              if (!message || typeof message !== 'string') {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Message is required' }));
                return;
              }

              if (aiClient && apiKey) {
                try {
                  const historyText = Array.isArray(conversationHistory)
                    ? conversationHistory
                        .slice(-6)
                        .map((msg: { sender: string; text: string }) => `${msg.sender === 'user' ? 'Guest' : 'Concierge'}: ${msg.text}`)
                        .join('\n')
                    : '';

                  const fullPrompt = `${historyText ? `Previous Conversation:\n${historyText}\n\n` : ''}Guest: ${message}\nConcierge:`;

                  const timeoutPromise = new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
                  );

                  const geminiCall = aiClient.models.generateContent({
                    model: 'gemini-3.8-flash',
                    contents: fullPrompt,
                    config: {
                      systemInstruction: RESTAURANT_SYSTEM_INSTRUCTION,
                      temperature: 0.7,
                      maxOutputTokens: 350,
                    },
                  });

                  const response = await Promise.race([geminiCall, timeoutPromise]);
                  const reply = response.text || generateLocalResponse(message);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ reply, source: 'gemini-3.8-flash' }));
                  return;
                } catch (geminiError) {
                  console.warn('Gemini API call bypassed or timed out, using local knowledge engine:', geminiError);
                }
              }

              const reply = generateLocalResponse(message);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply, source: 'knowledge-engine' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: 'An unexpected error occurred',
                reply: 'We are at your service! Feel free to call us directly at +91 98765 43210 or reserve a table using our reservation form.'
              }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
