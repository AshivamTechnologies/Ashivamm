import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Food', 'Interior', 'Chef'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
    );
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLightboxIndex, handleNext, handlePrev]);

  const activeItem: GalleryItem | undefined =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : undefined;

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2 flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Visual Chronicle</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            The Saffron & Stone Experience
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            A glimpse into our candlelit stone chambers, dramatic live flame hearths, and handcrafted fine-dining presentations.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            // Apply varied visual spans for masonry appeal
            const isSpan2 = index === 0 || index === 5;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 cursor-pointer shadow-md hover:border-amber-500/70 hover:shadow-xl transition-all duration-300 ${
                  isSpan2 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient Scrim for high readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/70 border border-stone-600 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption / Title Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
          
          {/* Top Bar Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-cream-100 z-10">
            <div className="text-xs tracking-wider uppercase font-medium text-stone-400">
              <span>{activeLightboxIndex + 1}</span> / <span>{filteredItems.length}</span>
              <span className="mx-2">·</span>
              <span className="text-amber-400 font-semibold">{activeItem.title}</span>
            </div>
            
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:bg-amber-500 hover:text-stone-950 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:bg-amber-500 hover:text-stone-950 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Image Frame */}
          <div className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center p-2">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-stone-800"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl font-bold text-cream-50">{activeItem.title}</h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">{activeItem.caption}</p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
