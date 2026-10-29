import React, { useState, useEffect } from 'react';
import { Award, Flame, HeartHandshake, Sparkles, ArrowRight, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useAppTheme } from '../context/ThemeContext';

export const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <section 
      id="about" 
      className={`py-14 sm:py-20 transition-colors duration-500 border-t border-b relative overflow-hidden ${
        isMidnight 
          ? 'bg-[#141210] border-stone-800 text-stone-100' 
          : 'bg-[#f7f4ed] border-[#e8e1d5] text-stone-900'
      }`}
    >
      {/* Subtle background ambient warmth */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
        isMidnight ? 'bg-amber-500/10 opacity-60' : 'bg-amber-500/5 opacity-100'
      }`} />
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
        isMidnight ? 'bg-amber-700/10 opacity-50' : 'bg-terracotta-500/5 opacity-100'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Lead-in */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center justify-center gap-2">
            <span>Our Heritage & Craftsmanship</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
            isMidnight ? 'text-cream-50' : 'text-stone-900'
          }`} style={{ textWrap: 'balance' }}>
            A Story of Flavour, Passion & Tradition
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-3" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Multi-Image Display */}
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Chef preparation image */}
            <div className="space-y-4">
              <div className={`overflow-hidden rounded-2xl border shadow-lg group ${
                isMidnight ? 'border-stone-800 bg-stone-900' : 'border-[#e8e1d5] bg-stone-100'
              }`}>
                <img
                  src="/images/chef_culinary_art_1793203589737.jpg"
                  alt="Executive Chef preparing artisanal gourmet dish"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className={`p-4 rounded-xl border shadow-sm ${
                isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
              }`}>
                <div className="text-amber-500 font-serif text-2xl font-bold tabular-nums">24+</div>
                <div className={`text-xs font-medium ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>Years of Culinary Mastery</div>
              </div>
            </div>

            {/* Restaurant interior ambience image */}
            <div className="space-y-4 pt-6">
              <div className={`p-4 rounded-xl border shadow-sm ${
                isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
              }`}>
                <div className="text-amber-500 font-serif text-2xl font-bold tabular-nums">100%</div>
                <div className={`text-xs font-medium ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>Stone Hearth Charring</div>
              </div>
              <div className={`overflow-hidden rounded-2xl border shadow-lg group ${
                isMidnight ? 'border-stone-800 bg-stone-900' : 'border-[#e8e1d5] bg-stone-100'
              }`}>
                <img
                  src="/images/about_courtyard_interior_1793204790336.jpg"
                  alt="Saffron & Stone royal courtyard dining"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Story and Philosophy */}
          <div className="space-y-6 text-left">
            <p className={`text-lg leading-relaxed font-light ${
              isMidnight ? 'text-stone-200' : 'text-stone-800'
            }`}>
              Saffron & Stone is a destination for food lovers who appreciate authentic flavours, fresh ingredients, and exceptional hospitality. Our chefs combine traditional recipes with modern culinary techniques to create memorable dining experiences.
            </p>

            <p className={`text-sm leading-relaxed ${
              isMidnight ? 'text-stone-400' : 'text-stone-600'
            }`}>
              Named after nature’s most precious spice and the primordial basalt stones of ancient hearth cooking, our kitchen honors ancestral techniques while embracing contemporary gastronomic artistry. Every single grain of basmati is steeped in authentic Kashmiri saffron, and our marinades are grounded fresh at daybreak.
            </p>

            {/* Three Pillar Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-xl border shadow-sm ${
                isMidnight ? 'bg-stone-900/80 border-stone-800' : 'bg-white border-[#e8e1d5]'
              }`}>
                <Flame className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className={`text-sm font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Basalt Stone Fire</h4>
                <p className={`text-xs mt-1 ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>High-heat volcanic stone searing locks in natural juices.</p>
              </div>

              <div className={`p-4 rounded-xl border shadow-sm ${
                isMidnight ? 'bg-stone-900/80 border-stone-800' : 'bg-white border-[#e8e1d5]'
              }`}>
                <Sparkles className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className={`text-sm font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Kashmiri Saffron</h4>
                <p className={`text-xs mt-1 ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>Directly sourced Grade-1 Mongra saffron threads.</p>
              </div>

              <div className={`p-4 rounded-xl border shadow-sm ${
                isMidnight ? 'bg-stone-900/80 border-stone-800' : 'bg-white border-[#e8e1d5]'
              }`}>
                <HeartHandshake className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className={`text-sm font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Warm Hospitality</h4>
                <p className={`text-xs mt-1 ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>Atithi Devo Bhava philosophy in every interaction.</p>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer group ${
                  isMidnight
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 hover:text-stone-950'
                }`}
              >
                <span>Learn More About Our Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Story Modal */}
      {isModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="heritage-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className={`relative w-full max-w-2xl border rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-left ${
            isMidnight ? 'bg-stone-900 border-stone-700 text-stone-100' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isMidnight ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <div id="heritage-modal-title" className={`font-serif text-2xl font-bold ${
                isMidnight ? 'text-cream-50' : 'text-stone-900'
              }`}>
                The Heritage of Saffron & Stone
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Story Dialog"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`mt-6 space-y-4 text-sm leading-relaxed ${
              isMidnight ? 'text-stone-300' : 'text-stone-700'
            }`}>
              <p>
                Founded in Mumbai’s historic waterfront district, Saffron & Stone Indian Kitchen emerged from a simple yet profound vision: to elevate classic regional recipes into an immersive gastronomic journey without sacrificing their authentic soul.
              </p>
              <h4 className="text-amber-500 font-serif text-lg font-semibold pt-2">
                The Stone Hearth Philosophy
              </h4>
              <p>
                In an era dominated by rapid cooking appliances, we intentionally returned to ancestral stone hearths. Our volcanic basalt slabs absorb searing temperatures of over 400°C, permitting meats and paneer to form an instantaneous caramelized crust while sealing in moisture, natural fats, and delicate spices.
              </p>
              <h4 className="text-amber-500 font-serif text-lg font-semibold pt-2">
                Ethical Sourcing & Grade-1 Saffron
              </h4>
              <p>
                Every strand of saffron utilized in our biryanis, desserts, and signature masalas is sourced directly from sustainable multi-generational farmer cooperatives in Pampore, Kashmir. Our spices are stone-ground daily in small batches to preserve volatile essential oils.
              </p>
              <div className={`p-4 rounded-xl border mt-4 flex items-center gap-4 ${
                isMidnight ? 'bg-stone-800/80 border-amber-500/30' : 'bg-amber-50 border-amber-200'
              }`}>
                <Award className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <div className={`text-sm font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Recognized Excellence</div>
                  <div className={`text-xs ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>Awarded Best Modern Indian Dining 2025 & 2026 by Epicurean Guild Mumbai.</div>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t flex justify-end ${
              isMidnight ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
