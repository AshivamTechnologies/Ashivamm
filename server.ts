import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security and middleware
app.use(express.json({ limit: '100kb' }));
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Initialize Gemini Client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
  }
}

export const RESTAURANT_SYSTEM_INSTRUCTION = `
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

// Fallback intelligent responder if Gemini API key is missing or encounters quota limits
export function generateLocalResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Telugu queries detection
  const isTelugu = /[\u0C00-\u0C7F]/.test(query);

  if (isTelugu) {
    if (q.includes('మెనూ') || q.includes('ఫుడ్') || q.includes('డిష్') || q.includes('ఏమున్నాయి') || q.includes('తినడానికి')) {
      return "నమస్తే! మా Saffron & Stone లో Saffron Special Biryani (₹795), Stone-Grilled Chicken (₹685), Creamy Butter Paneer (₹565), మరియు Maharaja Royal Veg Thali (₹695) ప్రత్యేకతలు!";
    }
    if (q.includes('బుకింగ్') || q.includes('టేబుల్') || q.includes('రిజర్వేషన్')) {
      return "మీరు మా వెబ్‌సైట్‌లోని రిజర్వేషన్ ఫారమ్ ద్వారా లేదా +91 98765 43210 కు కాల్ చేసి సులభంగా టేబుల్ బుక్ చేసుకోవచ్చు.";
    }
    return "నమస్తే! Saffron & Stone కి స్వాగతం. మేము మీకు మెనూ, టేబుల్ బుకింగ్ లేదా ఆశివం టెక్నాలజీస్ వివరాల్లో ఎలా సహాయపడగలం?";
  }

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

// POST /api/chat - AI Concierge endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'Valid message string is required' });
      return;
    }

    const cleanMessage = message.trim().slice(0, 1000);

    // If Gemini client is available and API key configured, use Gemini 3.8 Flash
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const historyText = Array.isArray(conversationHistory)
          ? conversationHistory
              .slice(-6)
              .map((msg: { sender: string; text: string }) => `${msg.sender === 'user' ? 'Guest' : 'Concierge'}: ${String(msg.text || '').slice(0, 300)}`)
              .join('\n')
          : '';

        const fullPrompt = `${historyText ? `Previous Conversation:\n${historyText}\n\n` : ''}Guest: ${cleanMessage}\nConcierge:`;

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
        const reply = response.text || generateLocalResponse(cleanMessage);
        res.json({ reply, source: 'gemini-3.8-flash' });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call bypassed or timed out, switching to local knowledge engine:', geminiError);
        const reply = generateLocalResponse(cleanMessage);
        res.json({ reply, source: 'knowledge-engine' });
        return;
      }
    }

    // Default to high-fidelity localized knowledge engine
    const reply = generateLocalResponse(cleanMessage);
    res.json({ reply, source: 'knowledge-engine' });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while processing your request',
      reply: "We are at your service! Feel free to call us directly at +91 98765 43210 or reserve a table using our reservation form.",
    });
  }
});

// GET /api/health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    restaurant: 'Saffron & Stone Indian Kitchen',
    partner: 'Ashivam Technologies',
    aiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

export async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Vite middleware for development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static build
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      app.get('*', (_req: Request, res: Response) => {
        res.status(503).send('Production build not found. Run npm run build first.');
      });
    }
  }

  return app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Saffron & Stone] Server running on http://0.0.0.0:${PORT}`);
  });
}

// Only auto-start when executed directly as main script
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain && process.env.NODE_ENV !== 'test') {
  startServer();
}
