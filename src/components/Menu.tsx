import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Flame } from 'lucide-react';
import { FULL_MENU } from '../data/restaurantData';
import { DishCategory, MenuItem } from '../types';
import { useCart } from '../context/CartContext';

// Categories including Veg Curries, Biryanis, Meals & Thalis, Veg items, Non-veg items, Starters, Drinks
const CATEGORIES: DishCategory[] = [
  'All',
  'Veg Curries',
  'Biryanis',
  'Meals & Thalis',
  'Veg items',
  'Non-veg items',
  'Starters',
  'Drinks'
];

export const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpiceFilter, setActiveSpiceFilter] = useState<number | 'all'>('all');
  const { addToCart } = useCart();

  // Dynamic filtering based on chosen category, search query, and spice
  const filteredDishes = useMemo(() => {
    return FULL_MENU.filter((dish) => {
      // Category match
      let matchesCategory = true;
      if (selectedCategory === 'All') {
        matchesCategory = true;
      } else if (selectedCategory === 'Veg Curries') {
        matchesCategory = dish.category === 'Veg Curries' || !!dish.isCurry;
      } else if (selectedCategory === 'Biryanis') {
        matchesCategory = dish.category === 'Biryanis' || !!dish.isBiryani;
      } else if (selectedCategory === 'Meals & Thalis') {
        matchesCategory = dish.category === 'Meals & Thalis' || !!dish.isMeal;
      } else if (selectedCategory === 'Veg items') {
        matchesCategory = dish.isVegetarian && !dish.isDrink;
      } else if (selectedCategory === 'Non-veg items') {
        matchesCategory = !dish.isVegetarian && !dish.isDrink;
      } else if (selectedCategory === 'Starters') {
        matchesCategory = dish.category === 'Starters' || !!dish.isStarter;
      } else if (selectedCategory === 'Drinks') {
        matchesCategory = dish.category === 'Drinks' || !!dish.isDrink;
      }

      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query) ||
        (dish.tags && dish.tags.some((t) => t.toLowerCase().includes(query)));

      // Spice level match
      const matchesSpice =
        activeSpiceFilter === 'all' || dish.spiceLevel === activeSpiceFilter;

      return matchesCategory && matchesSearch && matchesSpice;
    });
  }, [selectedCategory, searchQuery, activeSpiceFilter]);

  return (
    <section id="menu" className="py-12 sm:py-16 bg-[#faf7f2] border-t border-[#e8e1d5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with balanced text alignment */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
            Culinary Repertoire
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Interactive Dining Menu
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
            Explore royal Awadhi veg curries, slow-dum handi biryanis, grand maharaja thali meals, stone-charred starters, and refreshing drinks.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-6 sm:mb-8">
          
          {/* Centered Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Biryani, Thali, Paneer, Korma, Chai)..."
              className="w-full pl-11 pr-14 py-3 bg-white border border-[#e8e1d5] rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-900 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-[#e8e1d5]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sub-filter Bar */}
          <div className="flex items-center justify-between text-xs text-stone-600 max-w-5xl mx-auto border-t border-[#e8e1d5] pt-4 px-2">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              <span>Showing <strong className="text-stone-900 font-bold">{filteredDishes.length}</strong> distinctive dishes</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-stone-500 font-medium">Spice:</span>
              <button
                onClick={() => setActiveSpiceFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeSpiceFilter === 'all' ? 'text-amber-800 font-bold bg-amber-100' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveSpiceFilter(1)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                  activeSpiceFilter === 1 ? 'text-amber-800 font-bold bg-amber-100' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Flame className="w-3 h-3 text-amber-600" /> Mild
              </button>
              <button
                onClick={() => setActiveSpiceFilter(2)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                  activeSpiceFilter === 2 ? 'text-terracotta-700 font-bold bg-amber-100' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Flame className="w-3 h-3 text-terracotta-600" /> Medium
              </button>
            </div>
          </div>

        </div>

        {/* Menu Cards Grid - Bright, Crisp Luxury Theme */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#e8e1d5] max-w-md mx-auto shadow-sm">
            <p className="text-stone-500 text-sm">No dishes found in this category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setActiveSpiceFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-amber-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish: MenuItem) => (
              <div
                key={dish.id}
                className="group bg-white rounded-2xl border border-[#e8e1d5] overflow-hidden hover:border-amber-400 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-stone-200/50 text-left"
              >
                <div>
                  {/* Distinct Food/Drink Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Veg/Non-Veg Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-stone-200 shadow-sm flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dish.isVegetarian ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}
                      />
                      <span className="text-[10px] uppercase font-bold text-stone-800">
                        {dish.isVegetarian ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>

                    {/* Prep Time */}
                    {dish.prepTime && (
                      <span className="absolute bottom-2 right-3 text-[10px] bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded font-medium">
                        {dish.prepTime}
                      </span>
                    )}
                  </div>

                  {/* Body Info with perfect left alignment */}
                  <div className="p-5 text-left">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      {dish.spiceLevel !== undefined && dish.spiceLevel > 0 && (
                        <div className="flex items-center gap-0.5 shrink-0 mt-1" title={`Spice level: ${dish.spiceLevel}`}>
                          {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-3 h-3 text-terracotta-500 fill-terracotta-500" />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Category tag */}
                    {dish.tags && dish.tags[0] && (
                      <div className="mt-2 text-[11px] text-amber-800 font-medium">
                        {dish.tags[0]}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Price and Add to Cart */}
                <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] uppercase text-stone-400 font-medium block">Price</span>
                    <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">
                      ₹{dish.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(dish)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    aria-label={`Add ${dish.name} to cart`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
