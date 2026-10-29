import React from 'react';
import { MapPin, Utensils, Calendar, ChevronDown, Sparkles, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAppTheme } from '../context/ThemeContext';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveTable }) => {
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  return (
    <section 
      id="home" 
      className={`relative min-h-[92vh] flex items-center pt-28 pb-14 sm:pb-20 overflow-hidden transition-colors duration-500 border-b ${
        isMidnight 
          ? 'bg-[#12100e] border-stone-800 text-white' 
          : 'bg-[#faf6ee] border-[#eee7da] text-stone-900'
      }`}
    >
      
      {/* Subtle Atmospheric Ambient Glows */}
      <div className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
        isMidnight ? 'bg-amber-500/10 opacity-70' : 'bg-amber-200/25 opacity-100'
      }`} />
      <div className={`absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
        isMidnight ? 'bg-amber-700/10 opacity-60' : 'bg-[#f2e6dc]/60 opacity-100'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Typography (Matches Screenshot Layout) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            {/* Headline: Two-Line Serif (First line Roman, Second line Italic Palette) */}
            <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] mb-5 transition-colors ${
              isMidnight ? 'text-cream-50' : 'text-stone-900'
            }`}>
              More Than Food.
              <span className={`block font-normal italic mt-1 transition-colors ${
                isMidnight ? 'text-amber-300' : 'text-[#2b1724]'
              }`}>
                A Palette of Flavours.
              </span>
            </h1>

            {/* Subtext Paragraph */}
            <p className={`text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl transition-colors ${
              isMidnight ? 'text-stone-300' : 'text-stone-600'
            }`}>
              Discover authentic royal dum biryanis, basalt stone-grilled kebabs, and culinary moments worth remembering at Colaba Waterfront, Mumbai. Savor heirloom spices while sharing thoughtful celebrations.
            </p>

            {/* Circular Pill Action Buttons (Matches Screenshot's Pill Buttons) */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
              <button
                onClick={onReserveTable}
                className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer active:scale-98 ${
                  isMidnight
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/25'
                    : 'bg-[#281523] text-white hover:bg-[#3d1f34] shadow-[#281523]/25'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Experience</span>
              </button>

              <button
                onClick={onExploreMenu}
                className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-2xs cursor-pointer border ${
                  isMidnight
                    ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-700'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                }`}
              >
                <Utensils className={`w-4 h-4 ${isMidnight ? 'text-amber-400' : 'text-stone-600'}`} />
                <span>Explore Menu</span>
              </button>
            </div>

            {/* Trust Highlights Badges */}
            <div className={`flex flex-wrap items-center gap-4 pt-4 border-t text-xs transition-colors ${
              isMidnight ? 'border-stone-800 text-stone-400' : 'border-[#e8dfd1] text-stone-600'
            }`}>
              <button
                onClick={() => {
                  const el = document.getElementById('testimonials') || document.getElementById('reviews');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 font-medium hover:text-[#281523] dark:hover:text-amber-300 transition-colors cursor-pointer group"
                title="Read 1,250+ diner reviews"
              >
                <Star className="w-4 h-4 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className={`font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>4.9 ★</span>
                <span className="underline decoration-dotted decoration-stone-400 group-hover:decoration-current">(1,250+ Reviews)</span>
              </button>
              <span className="text-stone-400/50">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`font-medium ${isMidnight ? 'text-stone-200' : 'text-stone-800'}`}>
                  Open Daily: 11:00 AM – 10:30 PM
                </span>
              </div>
              <span className="text-stone-400/50">•</span>
              <span className={`font-medium ${isMidnight ? 'text-amber-400' : 'text-[#785b6b]'}`}>
                Tech by Ashivam
              </span>
            </div>

          </div>

          {/* Right Column: Prominent High-Resolution Restaurant Image in Rounded Card Frame */}
          <div className="lg:col-span-6 relative">
            
            {/* Decorative Constellation Dots (As seen in Screenshot floating around corner) */}
            <div className="absolute -top-6 -right-6 z-20 pointer-events-none hidden sm:block">
              <div className="relative w-28 h-28">
                <div className={`absolute top-2 right-4 w-2 h-2 rounded-full ${isMidnight ? 'bg-amber-400/70' : 'bg-[#785b6b]/60'}`} />
                <div className={`absolute top-6 right-10 w-3 h-3 rounded-full ${isMidnight ? 'bg-amber-300/90' : 'bg-[#281523]/80'}`} />
                <div className="absolute top-12 right-2 w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                <div className="absolute top-16 right-8 w-2 h-2 rounded-full bg-stone-400/60" />
                <svg className={`w-full h-full fill-none ${isMidnight ? 'stroke-amber-400/30' : 'stroke-[#785b6b]/30'}`} viewBox="0 0 100 100">
                  <path d="M 80 15 Q 60 25 70 50 T 85 80" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>

            {/* The Main High-Resolution Restaurant Ambiance Card (Exact Rounded Shape from Screenshot) */}
            <div className={`relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border-4 bg-stone-100 group aspect-[4/3] sm:aspect-[16/11] transition-colors ${
              isMidnight ? 'border-stone-800/80 shadow-black/80' : 'border-white/90 shadow-stone-300/60'
            }`}>
              <img
                src="/images/hero_saffron_stone_dining_1793203589411.jpg"
                alt="Saffron & Stone Royal Dining Room Ambiance"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Bottom Card Label */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-950/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-white flex items-center justify-between shadow-lg">
                <div className="text-left">
                  <div className="text-xs font-serif font-bold text-cream-100 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Royal Dining Room & Waterway Terrace</span>
                  </div>
                  <div className="text-[10px] text-stone-300">
                    Handcrafted Heritage Cuisine by Ashivam Technologies
                  </div>
                </div>
                <button
                  onClick={onReserveTable}
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors shrink-0 cursor-pointer shadow-sm"
                >
                  Reserve
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Modern Circular Scroll Down Indicator (No arrows) */}
      <button
        onClick={onExploreMenu}
        aria-label="Scroll to explore menu"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 transition-all cursor-pointer group"
      >
        <div className={`w-5 h-8 rounded-full border-2 flex items-start justify-center p-1 transition-colors ${
          isMidnight ? 'border-amber-400/40 group-hover:border-amber-400' : 'border-stone-400 group-hover:border-stone-800'
        }`}>
          <div className={`w-1.5 h-2 rounded-full animate-bounce ${
            isMidnight ? 'bg-amber-400' : 'bg-[#281523]'
          }`} />
        </div>
      </button>

    </section>
  );
};
