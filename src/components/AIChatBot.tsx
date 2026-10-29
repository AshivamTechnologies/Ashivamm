import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  Utensils, 
  ChefHat, 
  Bot, 
  User,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAppTheme } from '../context/ThemeContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickAction?: {
    type: 'menu' | 'reservation';
    label: string;
  };
}

const QUICK_PROMPTS = [
  { label: '👑 సిగ్నేచర్ డిషెస్ (Signatures)', text: 'What are your signature dishes and chef specials?' },
  { label: '🥗 వెజ్ & జైన్ (Veg & Jain)', text: 'Are there Jain and dedicated vegetarian options available?' },
  { label: '📅 టేబుల్ బుకింగ్ (Book Table)', text: 'How do I book a table for dinner?' },
  { label: '🌶️ బిర్యానీ & కబాబ్స్ (Biryani & Kebabs)', text: 'Tell me about the Saffron Dum Biryani and Stone-Grilled Chicken.' },
  { label: '⏰ సమయాలు & లొకేషన్ (Hours & Location)', text: 'What are your opening hours and exact address in Mumbai?' },
  { label: '🏢 ఆశివం టెక్నాలజీస్ (Ashivam Tech)', text: 'What is the role of Ashivam Technologies in this restaurant?' },
];

// Rich Bilingual Client-Side Culinary Knowledge Engine (Telugu + English)
function getIntelligentConciergeResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Telugu queries detection
  const isTelugu = /[\u0C00-\u0C7F]/.test(query);

  if (isTelugu) {
    if (q.includes('మెనూ') || q.includes('ఫుడ్') || q.includes('డిష్') || q.includes('ఏమున్నాయి') || q.includes('తినడానికి')) {
      return `నమస్తే! మా **Saffron & Stone** లో రాయల్ & మోడరన్ ఇండియన్ వంటకాలు లభిస్తాయి:\n\n• **Saffron Special Biryani** (₹795) — కుండలో దమ్ చేసిన అథెంటిక్ బిర్యానీ\n• **Stone-Grilled Chicken** (₹685) — సహజ బసాల్ట్ రాతిపై కాల్చిన కబాబ్స్\n• **Creamy Butter Paneer** (₹565) — జీడిపప్పు, టొమాటో గ్రేవీతో చేసిన క్రీమీ పన్నీర్\n• **Maharaja Royal Veg Thali** (₹695) — 3 రకాల కూరలు, దాల్ మఖానీ, పులావ్, రొట్టెలు & స్వీట్.\n\nమీరు ఆన్‌లైన్‌లో మెనూ చూడవచ్చు లేదా ఇప్పుడే ఆర్డర్ చేయవచ్చు!`;
    }
    if (q.includes('బుకింగ్') || q.includes('టేబుల్') || q.includes('రిజర్వేషన్') || q.includes('సీట్') || q.includes('బుక్')) {
      return `మీరు చాలా సులభంగా టేబుల్ బుక్ చేసుకోవచ్చు! మా వెబ్‌సైట్‌లోని **'Book a Table'** ఫారమ్ ద్వారా లేదా మా ఫోన్ నంబర్ **${RESTAURANT_INFO.phone}** కి కాల్ చేసి మీ సమయం మరియు అతిథుల సంఖ్యను నమోదు చేయండి. మేము మీ కోసం ప్రీమియం సీటింగ్ సిద్ధం చేస్తాము.`;
    }
    if (q.includes('వెజ్') || q.includes('శాకాహారం') || q.includes('జైన్') || q.includes('పన్నీర్') || q.includes('కూరగాయ')) {
      return `అవును! మా దగ్గర పూర్తి ప్రత్యేకమైన **వెజిటేరియన్ మరియు జైన్ (ఉల్లి, వెల్లుల్లి లేని)** వంటకాలు అందుబాటులో ఉన్నాయి. Creamy Butter Paneer, Dal Makhani Dum Pukht, Subz Biryani, మరియు Maharaja Royal Thali అత్యంత ప్రజాదరణ పొందాయి.`;
    }
    if (q.includes('బిర్యానీ') || q.includes('చికెన్') || q.includes('నాన్ వెజ్') || q.includes('స్పైసీ') || q.includes('కారం')) {
      return `మా బిర్యానీలు మరియు కబాబ్స్ 100% హలాల్ మీట్‌తో రాయల్ దమ్ పద్ధతిలో తయారు చేయబడతాయి. కారం మీ అభిరుచికి అనుగుణంగా (Mild, Medium, Fiery Hot) సర్వ్ చేయబడుతుంది!`;
    }
    if (q.includes('లొకేషన్') || q.includes('ఎక్కడ') || q.includes('అడ్రస్') || q.includes('ముంబై') || q.includes('ఎలా రావాలి')) {
      return `మా రెస్టారెంట్ **14/B Heritage Promenade, Colaba Waterfront, Mumbai 400001** లో అరేబియా సముద్ర తీరంలో ఉంది.`;
    }
    if (q.includes('టైమింగ్') || q.includes('సమయం') || q.includes('ఎప్పుడు') || q.includes('ఓపెన్')) {
      return `మా రెస్టారెంట్ తెరిచే సమయాలు:\n• సోమవారం - గురువారం: 11:00 AM నుండి 10:30 PM\n• శుక్రవారం - ఆదివారం: 10:00 AM నుండి 11:30 PM\nలంచ్ సమయం 11:00 AM – 3:30 PM మరియు డిన్నర్ 7:00 PM – 10:30 PM.`;
    }
    if (q.includes('ఆశివం') || q.includes('పార్ట్నర్') || q.includes('టెక్నాలజీ')) {
      return `**Ashivam Technologies** మా సాంకేతిక మరియు స్మార్ట్ ఆపరేషన్స్ భాగస్వామి. డిజిటల్ మెనూలు, కాంటాక్ట్‌లెస్ ఆర్డరింగ్, మరియు గెస్ట్ సర్వీసెస్ సాంకేతికతను ఆశివం టెక్నాలజీస్ నిర్వహిస్తోంది.`;
    }
    return `నమస్తే! **Saffron & Stone** కి స్వాగతం. మీరు మా మెనూ, వంటకాలు, కారం స్థాయిలు, జైన్/వెజ్ ఆప్షన్లు, టేబుల్ రిజర్వేషన్ లేదా ఆశివం టెక్నాలజీస్ గురించి ఏవైనా ప్రశ్నలు అడగవచ్చు. నేను మీకు ఎలా సహాయపడగలను?`;
  }

  // English queries detection
  if (q.includes('menu') || q.includes('dish') || q.includes('food') || q.includes('eat') || q.includes('special')) {
    return "Our culinary highlights include our signature **Saffron Special Biryani** (₹795), **Stone-Grilled Chicken** (₹685), **Creamy Butter Paneer** (₹565), and the grand **Maharaja Royal Veg Thali** (₹695). We offer extensive vegetarian curries, tandoori starters, dum biryanis, and artisanal desserts!";
  }
  if (q.includes('veg') || q.includes('vegetarian') || q.includes('jain') || q.includes('vegan')) {
    return "We take immense pride in our dedicated vegetarian and Jain preparations! Popular choices include the Creamy Butter Paneer, Dal Makhani Dum Pukht, Subz Dum Biryani, and the Maharaja Thali. Jain options without onion and garlic are freshly prepared upon request.";
  }
  if (q.includes('spice') || q.includes('spicy') || q.includes('hot') || q.includes('chili')) {
    return "We customize heat levels to your exact preference—from Mild (child-friendly aromatic) to Medium and Fiery Desi Hot! Just specify your preference during reservation or with your server.";
  }
  if (q.includes('book') || q.includes('reserv') || q.includes('table') || q.includes('seat')) {
    return `You can reserve a table anytime using our **'Book a Table'** form on this website or by calling our guest desk at **${RESTAURANT_INFO.phone}**. We accommodate 1 to 20+ guests, with private dining suites available.`;
  }
  if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('mumbai') || q.includes('colaba')) {
    return "Saffron & Stone is located at **14/B Heritage Promenade, Colaba Waterfront, Mumbai, Maharashtra 400001**, overlooking the tranquil Arabian Sea waters.";
  }
  if (q.includes('ashivam') || q.includes('partner') || q.includes('company') || q.includes('tech')) {
    return "Ashivam Technologies is our smart restaurant operations partner, powering our digital menus, reservation flows, contactless guest services, and dining concierge solutions.";
  }
  if (q.includes('drink') || q.includes('beverage') || q.includes('lassi') || q.includes('cocktail') || q.includes('tea') || q.includes('chai')) {
    return "Quench your thirst with our chilled **Royal Saffron Kesar Lassi** (₹220), **Smoked Masala Chaas** (₹180), **Kokum Basil Fizz** (₹240), or authentic **Mumbai Masala Cutting Chai** (₹120)!";
  }
  if (q.includes('biryani') || q.includes('chicken') || q.includes('kebab') || q.includes('mutton')) {
    return "Our Biryanis and Kebabs are prepared in authentic clay handis and charred over volcanic basalt rocks. 100% Halal certified meats with rich saffron aroma and slow-cooked perfection.";
  }
  if (q.includes('price') || q.includes('cost') || q.includes('rate')) {
    return "Starters range from ₹385–₹520, signature curries from ₹480–₹685, grand royal biryanis and chef platters from ₹695–₹895, and artisanal drinks from ₹120–₹240.";
  }
  if (q.includes('hour') || q.includes('time') || q.includes('timing') || q.includes('open') || q.includes('close')) {
    return "We are open Monday to Thursday from 11:00 AM – 10:30 PM, and Friday to Sunday from 10:00 AM – 11:30 PM. Lunch is 11:00 AM – 3:30 PM; Dinner is 7:00 PM – 10:30 PM.";
  }

  return "Welcome to Saffron & Stone Indian Kitchen! We are delighted to assist you with dish recommendations, spice preferences, Jain/Veg diets, table reservations, or our tech partner Ashivam Technologies. How may I assist you?";
}

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `నమస్తే & Welcome to **Saffron & Stone**!\nI am your AI Dining Concierge. Ask me anything in **English** or **తెలుగు (Telugu)** about our dishes, spices, Jain/Veg options, table bookings, or Ashivam Technologies.`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        scrollToBottom();
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    let botReply = '';

    // Step 1: Attempt fast server call with 2000ms AbortController timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          botReply = data.reply;
        }
      }
    } catch {
      // Server timed out or network error; gracefully proceed to client engine
    }

    // Step 2: Instant intelligent client-side fallback if server did not reply
    if (!botReply) {
      botReply = getIntelligentConciergeResponse(query);
    }

    // Check if reply suggests menu or reservation quick action
    let quickAction: ChatMessage['quickAction'] = undefined;
    const lower = (query + ' ' + botReply).toLowerCase();
    if (lower.includes('reserv') || lower.includes('book') || lower.includes('table') || lower.includes('బుకింగ్') || lower.includes('టేబుల్')) {
      quickAction = { type: 'reservation', label: 'Book a Table Now · టేబుల్ బుక్ చేయండి' };
    } else if (lower.includes('menu') || lower.includes('dish') || lower.includes('మెనూ') || lower.includes('వంటకాలు')) {
      quickAction = { type: 'menu', label: 'Explore Menu · మెనూ చూడండి' };
    }

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: botReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickAction,
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleActionClick = (type: 'menu' | 'reservation') => {
    setIsOpen(false);
    const targetId = type === 'menu' ? 'menu' : 'reservations';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `నమస్తే! Chat restarted. How can I assist you with your dining at Saffron & Stone today?`,
        timestamp: 'Just now',
      },
    ]);
  };

  // Helper to render bold text nicely
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className={`font-semibold ${isMidnight ? 'text-amber-300' : 'text-stone-900'}`}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Concierge Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pointer-events-auto">
        {!isOpen && hasUnread && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/95 text-stone-200 text-xs shadow-2xl border-t border-white/20 border-b border-black/80 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Have dining doubts? Ask AI (తెలుగు/Eng)!</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close dining concierge' : 'Open AI dining concierge'}
          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer
            bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-stone-950
            border-t border-white/50 border-b-[3px] border-amber-700
            shadow-[0_8px_20px_rgba(217,119,6,0.45),inset_0_1px_1px_rgba(255,255,255,0.8)]
            hover:translate-y-[-1px] hover:border-b-[4px]
            active:translate-y-[3px] active:border-b-[1px]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300
          `}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-stone-950" />
          ) : (
            <>
              <ChefHat className="w-7 h-7 text-stone-950 drop-shadow-sm" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full shadow-sm" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Modern Chat Modal */}
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="AI Dining Concierge"
          className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-96 max-w-[420px] h-[540px] max-h-[82vh] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.2)] border flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 ${
            isMidnight ? 'bg-stone-900 border-stone-700 text-white' : 'bg-white border-stone-200/90 text-stone-900'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-amber-500/20 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border-t border-white/20 border-b border-black/60 shadow-inner flex items-center justify-center text-amber-300">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-bold text-cream-50">AI Dining Concierge</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Saffron & Stone · English & తెలుగు</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                title="Restart chat"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className={`border-b px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 ${
            isMidnight ? 'bg-stone-950/90 border-stone-800' : 'bg-stone-100/80 border-stone-200/80'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 shrink-0 ${
              isMidnight ? 'text-stone-400' : 'text-stone-500'
            }`}>
              <Sparkles className="w-3 h-3 text-amber-500" />
              Quick:
            </span>
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.text)}
                disabled={isLoading}
                className={`text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full border transition-all shadow-2xs cursor-pointer disabled:opacity-50 ${
                  isMidnight 
                    ? 'bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-200 border-stone-700 hover:border-amber-500/40' 
                    : 'bg-white hover:bg-amber-50 hover:text-amber-900 text-stone-700 border-stone-300/80 hover:border-amber-400'
                }`}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3.5 ${
            isMidnight ? 'bg-stone-950/60' : 'bg-stone-50/70'
          }`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-500 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed text-left shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-stone-950 font-medium rounded-tr-none border-t border-amber-300 border-b border-amber-600'
                        : isMidnight
                          ? 'bg-stone-800 text-stone-100 border border-stone-700 rounded-tl-none'
                          : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{formatText(msg.text)}</p>

                    {/* Quick Action Button */}
                    {msg.quickAction && (
                      <div className={`mt-2.5 pt-2 border-t ${
                        isMidnight ? 'border-stone-700' : 'border-stone-200'
                      }`}>
                        <button
                          onClick={() => handleActionClick(msg.quickAction!.type)}
                          className="w-full inline-flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold text-[11px] transition-colors cursor-pointer border border-amber-400/40 shadow-2xs"
                        >
                          <div className="flex items-center gap-1.5">
                            {msg.quickAction.type === 'reservation' ? (
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Utensils className="w-3.5 h-3.5 text-amber-400" />
                            )}
                            <span>{msg.quickAction.label}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-500 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className={`border rounded-2xl rounded-tl-none px-4 py-3 shadow-2xs flex items-center gap-1.5 ${
                  isMidnight ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-200'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                  <span className={`text-[11px] ml-1 ${isMidnight ? 'text-stone-300' : 'text-stone-500'}`}>Consulting Kitchen...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`p-3 border-t flex items-center gap-2 ${
              isMidnight ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask in Telugu or English (e.g. మెనూ, బుకింగ్)..."
              className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
                isMidnight 
                  ? 'bg-stone-800 border-stone-700 text-white placeholder:text-stone-500' 
                  : 'bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-400'
              }`}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm border-t border-white/40 border-b border-amber-700"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className={`px-3 py-1.5 text-center text-[10px] flex items-center justify-center gap-1 ${
            isMidnight ? 'bg-stone-950 text-stone-400 border-t border-stone-800' : 'bg-stone-100 text-stone-500'
          }`}>
            <span>Powered by Ashivam Technologies</span>
          </div>

        </div>
      )}
    </>
  );
};
