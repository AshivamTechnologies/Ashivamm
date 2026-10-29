# Saffron & Stone Indian Kitchen 🍽️✨

> **Where Flavour Meets Elegance** — A luxury modern Indian fine-dining digital experience operated in technology partnership with **Ashivam Technologies**. Located at 14/B Heritage Promenade, Colaba Waterfront, Mumbai.

---

## 🌟 Highlights & Features

- **Royal Ambiance & Editorial Design**: Sophisticated editorial visual hierarchy inspired by Kashmiri saffron, basalt stone hearths, and warm sandstone palettes with seamless **Midnight Obsidian** and **Warm Sandstone** theme modes.
- **Bilingual AI Dining Concierge**: High-performance AI concierge responding natively in both **Telugu (తెలుగు)** and **English**, powered by **Gemini 3.8 Flash** with an instant localized culinary knowledge engine fallback.
- **Interactive Menu & Category Filtering**: Explore 23 handcrafted culinary creations across Biryanis, Royal Thalis, Veg Curries, Stone-Grilled Kebabs, Starters, Artisanal Desserts, and Infused Drinks with live search and spice-level filtering.
- **Instant Table Reservations**: Form validation with date boundaries, guest party selection, seating preferences (Vaulted Stone Hall, Outdoor Terracotta Courtyard, Live Hearth Counter, Private Dining Suite), instant confirmation numbers, and local booking management.
- **Dining Bag & Seamless Ordering**: Real-time cart calculations with promotional coupon codes (`SAFFRON10`, `ROYAL15`, `ASHIVAM20`), automated 5% GST calculation, free delivery thresholds, and delivery tracking.
- **Visual Chronicle Lightbox**: High-resolution gallery featuring keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and category filters.
- **Curated Events**: Bookings for acoustic live Sufi/sitar evenings, chef degustations, and seaside terrace brunches.
- **Accessibility & Motion Compliance**: WCAG AA color contrast, explicit ARIA dialog roles, focus rings, and strict adherence to `prefers-reduced-motion`.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/), [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Build System**: [Vite 8](https://vitejs.dev/) with native ES module loading and static asset optimization
- **Backend**: [Express 4](https://expressjs.com/), [Node.js 22](https://nodejs.org/)
- **AI Integration**: [@google/genai](https://github.com/google-gemini/generative-ai-js) (Gemini 3.8 Flash)
- **Testing**: Built-in Node 22 Test Runner (`node --test`) with TypeScript support via `tsx`

---

## 🚀 Quick Start & Installation

### Prerequisites

- Node.js `v20.11+` or `v22+`
- npm `v10+`

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kavyasreenarasimhulu19/Ashivam-Resta-Website.git
   cd Ashivam-Resta-Website
   ```

2. **Install Dependencies**:
   ```bash
   # On Windows PowerShell
   npm.cmd install

   # On macOS/Linux
   npm install
   ```

3. **Configure Environment Variables** (Optional for Gemini AI):
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key if you want cloud AI chat capabilities:
   ```env
   GEMINI_API_KEY="your-api-key-here"
   PORT=3000
   ```
   *(Note: The AI Concierge functions seamlessly in both Telugu and English even without an API key thanks to its built-in knowledge engine!)*

4. **Run Development Server**:
   ```bash
   npm.cmd run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm.cmd run dev` | Starts Vite dev server with integrated API middleware on port 3000 |
| `npm.cmd run build` | Compiles optimized production bundle into `dist/` |
| `npm.cmd run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm.cmd test` | Executes the automated test suite across cart, menu, reservations, and API |
| `npm.cmd start` | Starts the production Express server serving `dist/` |

---

## 🛡️ Production Deployment

### Option 1: Vercel / Netlify (Frontend & Static)
1. Build Command: `npm run build`
2. Output Directory: `dist`
3. Node Version: `20.x` or `22.x`

### Option 2: Render / Railway / Cloud Run (Full-Stack Node Server)
1. Build Command: `npm install && npm run build`
2. Start Command: `npm start`
3. Environment Variables: Set `NODE_ENV=production`, `PORT=3000`, and optionally `GEMINI_API_KEY`.

---

## 🏛️ Operations & Technology Partner

**Ashivam Technologies** powers digital operations, guest experiences, and contactless dining solutions for Saffron & Stone Indian Kitchen.
