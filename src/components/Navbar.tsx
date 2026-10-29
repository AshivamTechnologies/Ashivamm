import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Calendar, 
  Phone,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAppTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenReservations?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservations }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 3D Perspective Tilt on Hover State
  const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useAppTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    
    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, mouseX: mouseXPercent, mouseY: mouseYPercent });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
    setIsHovered(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'signatures', 'menu', 'testimonials', 'reservations', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id) || (id === 'testimonials' ? document.getElementById('reviews') : null);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Streamlined and balanced navigation links (fits all viewports on one line)
  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Our Story', id: 'about' },
    { label: 'Signatures', id: 'signatures' },
    { label: 'Menu', id: 'menu' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Visit Us', id: 'contact' },
  ];

  return (
    <>
      {/* Outer Fixed Floating Positioning Wrapper */}
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-40 px-2.5 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-auto" style={{ perspective: '1200px' }}>
          
          {/* Floating Pill Glassmorphic Island with 3D Tilt - Compact & Always Fits on One Line */}
          <div
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovered
                ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-2px) scale3d(1.006, 1.006, 1.006)`
                : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
              transition: isHovered ? 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)' : 'transform 0.5s cubic-bezier(0.2, 0, 0, 1)',
              transformStyle: 'preserve-3d',
            }}
            className={`relative flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300
              ${
                theme === 'midnight'
                  ? 'bg-stone-950/85 border border-white/15 text-white shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)]'
                  : isScrolled
                    ? 'bg-[#faf6ee]/95 border border-[#e5dcce] text-stone-900 shadow-[0_12px_32px_-6px_rgba(40,21,35,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)]'
                    : 'bg-[#faf6ee]/90 border border-[#ebe2d5] text-stone-900 shadow-[0_10px_28px_-6px_rgba(40,21,35,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)]'
              }
              backdrop-blur-xl
            `}
          >
            {/* Specular glare shine */}
            {isHovered && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 200px at ${tilt.mouseX}% ${tilt.mouseY}%, ${
                    theme === 'midnight' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)'
                  }, transparent 70%)`,
                }}
              />
            )}

            {/* Zone 1: Logo & Brand Name */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="flex items-center gap-2 group focus-visible:outline-none shrink-0"
            >
              <div className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-white p-1 border border-stone-200/90 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={RESTAURANT_INFO.company.logo}
                  alt="Ashivam Technologies"
                  className="h-5.5 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/ashivam_logo.png';
                  }}
                />
              </div>

              <div className="flex flex-col text-left min-w-0">
                <span className={`font-serif text-xs sm:text-base font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase leading-none transition-colors truncate ${
                  theme === 'midnight' ? 'text-cream-50 group-hover:text-amber-300' : 'text-stone-900 group-hover:text-[#281523]'
                }`}>
                  {RESTAURANT_INFO.shortName}
                </span>
                <span className={`text-[7.5px] sm:text-[8px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium mt-0.5 hidden xs:block ${
                  theme === 'midnight' ? 'text-amber-400/90' : 'text-[#785b6b]'
                }`}>
                  COLABA • MUMBAI
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (visible on desktop >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-[13px] font-medium">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id || (link.id === 'about' && activeSection === 'about');
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? theme === 'midnight'
                          ? 'text-amber-300 font-bold bg-white/5'
                          : 'text-stone-950 font-bold bg-black/5'
                        : theme === 'midnight'
                          ? 'text-stone-300 hover:text-white hover:bg-white/5'
                          : 'text-stone-600 hover:text-stone-950 hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className={`absolute -bottom-0.5 left-2.5 right-2.5 h-[2px] rounded-full ${
                        theme === 'midnight' ? 'bg-amber-400' : 'bg-[#281523]'
                      }`} />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions & ALWAYS-VISIBLE "Book a Table" Button */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              
              {/* Light / Dark Mode Toggle (visible on tablet and desktop; accessible via drawer on mobile) */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'cream' ? 'Dark' : 'Light'} Mode`}
                title={`Switch to ${theme === 'cream' ? 'Dark' : 'Light'} Mode`}
                className={`hidden sm:inline-flex p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-semibold transition-all border cursor-pointer shrink-0 ${
                  theme === 'midnight'
                    ? 'bg-stone-900 border-amber-400/30 text-amber-300 hover:bg-stone-800'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {theme === 'midnight' ? (
                  <div className="flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden xl:inline text-[11px]">Dark</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden xl:inline text-[11px]">Light</span>
                  </div>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer shrink-0 ${
                  theme === 'midnight'
                    ? 'border-stone-700 bg-stone-900/80 text-stone-200 hover:bg-stone-800'
                    : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-800'
                }`}
                aria-label={`Open dining bag with ${totalItems} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-1 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm ${
                    theme === 'midnight' ? 'bg-amber-400 text-stone-950' : 'bg-[#281523] text-white'
                  }`}>
                    {totalItems}
                  </span>
                )}
              </button>

              {/* "Book a Table" Pill Button (visible on tablet and desktop; prominent in Hero & Drawer on mobile) */}
              <button
                onClick={() => {
                  if (onOpenReservations) {
                    onOpenReservations();
                  } else {
                    scrollToSection('reservations');
                  }
                }}
                className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                  theme === 'midnight'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/20'
                    : 'bg-[#281523] text-white hover:bg-[#3d1f34] shadow-[#281523]/25'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Book a Table</span>
              </button>

              {/* Mobile Menu Hamburger (visible on screens < 1024px) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-1.5 rounded-full border transition-colors cursor-pointer shrink-0 ${
                  theme === 'midnight'
                    ? 'border-stone-700 bg-stone-900 text-stone-200'
                    : 'border-stone-300 bg-white text-stone-800'
                }`}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Navigation with Pill Aesthetic */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className={`fixed top-0 right-0 bottom-0 w-5/6 max-w-sm p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 ${
            theme === 'midnight' ? 'bg-stone-950 border-l border-stone-800 text-white' : 'bg-[#faf6ee] border-l border-[#e5decfa0] text-stone-900'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-white p-1 border border-stone-300 shadow-2xs flex items-center justify-center">
                    <img
                      src={RESTAURANT_INFO.company.logo}
                      alt="Ashivam Technologies"
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif text-base font-bold tracking-wider">
                      {RESTAURANT_INFO.shortName}
                    </h3>
                    <p className={`text-[9px] uppercase tracking-widest font-medium ${
                      theme === 'midnight' ? 'text-amber-400' : 'text-[#785b6b]'
                    }`}>
                      COLABA • MUMBAI
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-1.5 rounded-full border shadow-2xs ${
                    theme === 'midnight' ? 'border-stone-700 bg-stone-900 text-stone-300' : 'border-stone-200 bg-white text-stone-700'
                  }`}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Switcher in Mobile Drawer */}
              <div className={`mt-4 flex items-center justify-between p-3 rounded-2xl border ${
                theme === 'midnight' ? 'bg-stone-900 border-stone-800' : 'bg-black/5 border-stone-300/70'
              }`}>
                <span className={`text-xs font-semibold ${theme === 'midnight' ? 'text-stone-300' : 'text-stone-800'}`}>Theme Mode:</span>
                <button
                  onClick={toggleTheme}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                    theme === 'midnight'
                      ? 'bg-stone-800 border-amber-400/40 text-amber-300'
                      : 'bg-white border-stone-300 text-stone-800'
                  }`}
                >
                  {theme === 'midnight' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{theme === 'midnight' ? 'Royal Midnight' : 'Ivory Cream'}</span>
                </button>
              </div>

              <nav className="mt-5 flex flex-col gap-1.5 text-left">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      activeSection === link.id
                        ? theme === 'midnight'
                          ? 'bg-stone-800 text-amber-300 font-bold'
                          : 'bg-stone-200/90 text-stone-950 font-bold'
                        : theme === 'midnight'
                          ? 'text-stone-300 hover:bg-white/10'
                          : 'text-stone-800 hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-200/60 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('reservations');
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md cursor-pointer ${
                  theme === 'midnight'
                    ? 'bg-amber-400 text-stone-950 hover:bg-amber-300'
                    : 'bg-[#281523] text-white hover:bg-[#3d1f34]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs border font-medium ${
                  theme === 'midnight' ? 'border-stone-800 bg-stone-900 text-stone-300' : 'border-stone-300 bg-white text-stone-700'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
