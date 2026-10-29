import React, { useState, useEffect } from 'react';
import { useAppTheme } from '../context/ThemeContext';

interface SectionPin {
  id: string;
  label: string;
}

const SECTION_PINS: SectionPin[] = [
  { id: 'home', label: 'Top' },
  { id: 'about', label: 'Our Story' },
  { id: 'signatures', label: 'Signatures' },
  { id: 'menu', label: 'Menu' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'reservations', label: 'Reserve' },
];

export const BackToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMenuOpen(false);
      }

      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }

      // Track active section pin
      const sections = ['home', 'about', 'signatures', 'menu', 'testimonials', 'reservations', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId) || (sectionId === 'testimonials' ? document.getElementById('reviews') : null);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id) || (id === 'testimonials' ? document.getElementById('reviews') : null);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  // SVG circular calculations (radius = 22, circumference = 2 * pi * 22 ≈ 138.23)
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center select-none">
      
      {/* Expandable Circular Section Pin Navigator (No arrows!) */}
      {isMenuOpen && (
        <div className={`mb-3 p-2 rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 animate-in slide-in-from-bottom-3 duration-200 ${
          isMidnight 
            ? 'bg-stone-950/90 border-stone-800 text-stone-200' 
            : 'bg-white/95 border-[#e8dfd1] text-stone-800'
        }`}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-center text-[#785b6b] dark:text-amber-400 py-1 border-b border-black/5 dark:border-white/5">
            Quick Nav
          </div>

          {SECTION_PINS.map((pin) => {
            const isActive = activeSection === pin.id;
            return (
              <button
                key={pin.id}
                onClick={() => scrollTo(pin.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? isMidnight
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : 'bg-[#281523] text-white shadow-sm'
                    : isMidnight
                      ? 'hover:bg-white/10 text-stone-300'
                      : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                {/* Glowing Circular Section Dot */}
                <span className={`w-2 h-2 rounded-full transition-transform ${
                  isActive 
                    ? isMidnight ? 'bg-stone-950 scale-125' : 'bg-amber-400 scale-125'
                    : 'bg-stone-400/60'
                }`} />
                <span>{pin.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Modern Circular Navigation Dial Widget (Replaces the Arrow!) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onDoubleClick={() => scrollTo('home')}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 border ${
          isMidnight
            ? 'bg-stone-950 border-stone-800 text-white shadow-black/80'
            : 'bg-white border-[#e8dfd1] text-stone-900 shadow-stone-300/60'
        }`}
        title="Circular Section Navigator (Click to open, double click for Top)"
        aria-label="Circular Section Navigator"
      >
        {/* SVG Circular Progress Ring */}
        <svg className="absolute inset-0 w-14 h-14 -rotate-90 pointer-events-none" viewBox="0 0 56 56">
          {/* Background track circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            className={`fill-none stroke-current opacity-15 ${isMidnight ? 'text-white' : 'text-stone-900'}`}
            strokeWidth="3.5"
          />
          {/* Active progress stroke */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            className={`fill-none transition-all duration-150 ${isMidnight ? 'stroke-amber-400' : 'stroke-[#281523]'}`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Center Content: Circular Percentage / Active Pin Indicator */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold font-mono tracking-tighter leading-none">
            {Math.round(scrollProgress)}%
          </span>
          <span className={`w-1.5 h-1.5 rounded-full mt-0.5 animate-pulse ${
            isMidnight ? 'bg-amber-400' : 'bg-[#785b6b]'
          }`} />
        </div>
      </button>

    </div>
  );
};
