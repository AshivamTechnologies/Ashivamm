import React from 'react';
import { Plus, Star, Sparkles } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';

export const SignatureDishes: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <section id="signatures" className="py-12 sm:py-16 bg-[#ffffff] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Chef's Masterpieces</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Our Signature Dishes
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Handcrafted with ancestral heritage techniques, volcanic stone grilling, and rare Kashmiri saffron.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* 6 Signature Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGNATURE_DISHES.map((dish: MenuItem) => {
            return (
              <div
                key={dish.id}
                className="group bg-white rounded-2xl border border-[#e8e1d5] overflow-hidden hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 flex flex-col transform hover:-translate-y-1 text-left"
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Veg / Non-Veg Indicator Symbol */}
                  <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-200 shadow-sm flex items-center gap-1.5">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        dish.isVegetarian
                          ? 'bg-emerald-600'
                          : 'bg-rose-600'
                      }`}
                      aria-label={dish.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                    />
                    <span className="text-[10px] uppercase font-bold text-stone-800">
                      {dish.isVegetarian ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {/* Rating indicator */}
                  {dish.rating && (
                    <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 backdrop-blur-md px-2 py-1 rounded-md border border-stone-200 shadow-sm flex items-center gap-1 text-amber-700">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold tabular-nums text-stone-900">{dish.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Tags */}
                  {dish.tags && dish.tags[0] && (
                    <div className="absolute bottom-3 left-3 z-10 text-[11px] font-semibold text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded tracking-wide">
                      {dish.tags[0]}
                    </div>
                  )}
                </div>

                {/* Card Content with left alignment */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category kicker */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                      {dish.category}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {dish.name}
                    </h3>

                    <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price and Add to Cart Button */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Price</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                        ₹{dish.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(dish)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      aria-label={`Add ${dish.name} to dining cart`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
