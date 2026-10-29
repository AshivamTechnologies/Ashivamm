import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { useAppTheme } from '../context/ThemeContext';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

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
    <section 
      id="gallery" 
      className={`py-14 sm:py-20 transition-colors duration-500 relative ${
        isMidnight ? 'bg-[#100e0c] text-white' : 'bg-white text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2 flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            <span>Visual Chronicle</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isMidnight ? 'text-cream-50' : 'text-stone-900'
          }`} style={{ textWrap: 'balance' }}>
            The Saffron & Stone Experience
          </h2>
          <p className={`mt-2.5 text-sm sm:text-base max-w-xl mx-auto ${
            isMidnight ? 'text-stone-400' : 'text-stone-600'
          }`}>
            A glimpse into our candlelit stone chambers, dramatic live flame hearths, and handcrafted fine-dining presentations.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-3" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/25'
                  : isMidnight
                    ? 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
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
            const isSpan2 = index === 0 || index === 5;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-2xl border cursor-pointer shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 ${
                  isSpan2 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                } ${
                  isMidnight ? 'border-stone-800 bg-stone-900' : 'border-stone-200 bg-stone-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/gallery_wine_cellar_1793204823729.jpg';
                  }}
                />

                {/* Ambient Scrim for high readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/70 border border-white/20 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption / Title Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">
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
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Content */}
          <div 
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl max-h-[65vh] w-auto border border-white/20 shadow-2xl">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/gallery_wine_cellar_1793204823729.jpg';
                }}
              />
            </div>

            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                {activeItem.category} • {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 id="gallery-lightbox-title" className="font-serif text-xl sm:text-2xl font-bold mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
