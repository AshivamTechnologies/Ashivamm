import React, { useState } from 'react';
import { Award, Flame, HeartHandshake, Sparkles, ArrowRight, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="py-12 sm:py-16 bg-[#f7f4ed] border-t border-b border-[#e8e1d5] relative overflow-hidden">
      {/* Subtle background ambient warmth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Lead-in */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2 flex items-center justify-center gap-2">
            <span>Our Heritage & Craftsmanship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
            A Story of Flavour, Passion & Tradition
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Multi-Image Display */}
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Chef preparation image */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#e8e1d5] shadow-lg bg-stone-100 group">
                <img
                  src="/src/assets/images/chef_culinary_art_1793203589737.jpg"
                  alt="Executive Chef preparing artisanal gourmet dish"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-sm">
                <div className="text-amber-700 font-serif text-2xl font-bold tabular-nums">24+</div>
                <div className="text-xs text-stone-600 font-medium">Years of Culinary Mastery</div>
              </div>
            </div>

            {/* Restaurant interior ambience image */}
            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-sm">
                <div className="text-terracotta-600 font-serif text-2xl font-bold tabular-nums">100%</div>
                <div className="text-xs text-stone-600 font-medium">Stone Hearth Charring</div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#e8e1d5] shadow-lg bg-stone-100 group">
                <img
                  src="/src/assets/images/about_courtyard_interior_1793204790336.jpg"
                  alt="Saffron & Stone royal courtyard dining"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Story and Philosophy */}
          <div className="space-y-6 text-left">
            <p className="text-lg text-stone-800 leading-relaxed font-light">
              Saffron & Stone is a destination for food lovers who appreciate authentic flavours, fresh ingredients, and exceptional hospitality. Our chefs combine traditional recipes with modern culinary techniques to create memorable dining experiences.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              Named after nature’s most precious spice and the primordial basalt stones of ancient hearth cooking, our kitchen honors ancestral techniques while embracing contemporary gastronomic artistry. Every single grain of basmati is steeped in authentic Kashmiri saffron, and our marinades are grounded fresh at daybreak.
            </p>

            {/* Three Pillar Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-sm">
                <Flame className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="text-sm font-semibold text-stone-900">Basalt Stone Fire</h4>
                <p className="text-xs text-stone-600 mt-1">High-heat volcanic stone searing locks in natural juices.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="text-sm font-semibold text-stone-900">Kashmiri Saffron</h4>
                <p className="text-xs text-stone-600 mt-1">Directly sourced Grade-1 Mongra saffron threads.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#e8e1d5] shadow-sm">
                <HeartHandshake className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="text-sm font-semibold text-stone-900">Warm Hospitality</h4>
                <p className="text-xs text-stone-600 mt-1">Atithi Devo Bhava philosophy in every interaction.</p>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-stone-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-all group"
              >
                <span>Learn More About Our Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Story Modal (Bright Luxury) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="font-serif text-2xl font-bold text-stone-900">
                The Heritage of Saffron & Stone
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                Founded in Mumbai’s historic waterfront district, Saffron & Stone Indian Kitchen emerged from a simple yet profound vision: to elevate classic regional recipes into an immersive gastronomic journey without sacrificing their authentic soul.
              </p>
              <h4 className="text-amber-800 font-serif text-lg font-semibold pt-2">
                The Stone Hearth Philosophy
              </h4>
              <p>
                In an era dominated by rapid cooking appliances, we intentionally returned to ancestral stone hearths. Our volcanic basalt slabs absorb searing temperatures of over 400°C, permitting meats and paneer to form an instantaneous caramelized crust while sealing in moisture, natural fats, and delicate spices.
              </p>
              <h4 className="text-amber-800 font-serif text-lg font-semibold pt-2">
                Ethical Sourcing & Grade-1 Saffron
              </h4>
              <p>
                Every strand of saffron utilized in our biryanis, desserts, and signature masalas is sourced directly from sustainable multi-generational farmer cooperatives in Pampore, Kashmir. Our spices are stone-ground daily in small batches to preserve volatile essential oils.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mt-4 flex items-center gap-4">
                <Award className="w-8 h-8 text-amber-700 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-stone-900">Recognized Excellence</div>
                  <div className="text-xs text-stone-600">Awarded Best Modern Indian Dining 2025 & 2026 by Epicurean Guild Mumbai.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
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
