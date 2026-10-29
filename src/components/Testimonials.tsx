import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, X, Check, MessageSquare } from 'lucide-react';
import { TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/restaurantData';
import { useToast } from '../context/ToastContext';
import { useAppTheme } from '../context/ThemeContext';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [userRole, setUserRole] = useState('Diner');
  const [dishFavored, setDishFavored] = useState('Saffron Special Biryani');
  const [rating, setRating] = useState(5);
  const [reviewQuote, setReviewQuote] = useState('');

  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  const total = testimonials.length;

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextTestimonial]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewQuote.trim()) {
      showToast('Please fill all fields', 'Name and review text are required.', 'error');
      return;
    }

    const newReview = {
      id: `test-${Date.now()}`,
      name: authorName.trim(),
      role: userRole.trim() || 'Verified Guest',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating,
      quote: reviewQuote.trim(),
      dishFavored: dishFavored.trim() || 'Chef Special',
      date: 'Just now',
    };

    setTestimonials((prev) => [newReview, ...prev]);
    setCurrentIndex(0);
    setIsModalOpen(false);
    setAuthorName('');
    setReviewQuote('');
    showToast('Review Submitted', 'Thank you for your valuable feedback!', 'success');
  };

  const active = testimonials[currentIndex];

  return (
    <section 
      id="testimonials" 
      data-section="reviews"
      className={`py-14 sm:py-20 relative overflow-hidden transition-colors duration-500 border-t ${
        isMidnight ? 'bg-[#12100e] border-stone-800 text-white' : 'bg-[#faf6ee] border-[#eee7da] text-stone-900'
      }`}
    >
      {/* Anchor for id="reviews" */}
      <span id="reviews" className="absolute -top-24 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#785b6b] bg-white border border-[#e8dfd1] shadow-2xs mb-3">
            <span>Guest Reflections & Reviews</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isMidnight ? 'text-cream-50' : 'text-stone-900'
          }`}>
            Celebrated by Connoisseurs
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-[#785b6b] mx-auto mt-4" />
        </div>

        {/* Carousel Container */}
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Review Card */}
          <div className={`relative rounded-3xl p-7 sm:p-12 text-center transition-colors shadow-xl border ${
            isMidnight 
              ? 'bg-stone-950/80 border-stone-800 text-stone-100 shadow-black/80' 
              : 'bg-white border-stone-200/90 text-stone-900 shadow-stone-200/50'
          }`}>
            
            <Quote className="w-10 h-10 text-amber-500/30 mx-auto mb-4" />

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < active.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-lg sm:text-2xl italic leading-relaxed max-w-3xl mx-auto min-h-[5rem] flex items-center justify-center">
              "{active.quote}"
            </p>

            {/* Dish Favored Note */}
            <div className="mt-6 text-xs text-[#785b6b] dark:text-amber-400 font-medium">
              Favorite Dish: <span className="font-bold underline decoration-dotted">{active.dishFavored}</span>
            </div>

            {/* Profile Avatar & Info */}
            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-center gap-4">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <h4 className="font-serif text-base font-bold">
                  {active.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {active.role} · <span className="text-stone-400 dark:text-stone-500">{active.date}</span>
                </p>
              </div>
            </div>

            {/* Navigation Buttons (Prev / Next) - Fully Functional with z-index & Cursor Pointer */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-20">
              <button
                onClick={prevTestimonial}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-[#281523] hover:text-white dark:hover:bg-amber-400 dark:hover:text-stone-950 flex items-center justify-center shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 z-20">
              <button
                onClick={nextTestimonial}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-[#281523] hover:text-white dark:hover:bg-amber-400 dark:hover:text-stone-950 flex items-center justify-center shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Dots Indicator & Write a Review CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer focus:outline-none ${
                    currentIndex === idx
                      ? 'w-8 bg-[#281523] dark:bg-amber-400'
                      : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Leave a Review Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 shadow-2xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="text-center mt-4 text-xs text-stone-500 dark:text-stone-400">
            Verified diner reviews from Mumbai dining patrons & food critics
          </div>

        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 dark:border-stone-800 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-stone-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Write a Dining Review</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Share your culinary experience at Saffron & Stone</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-2">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Priyanshu Sharma"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Dining City / Role</label>
                  <input
                    type="text"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    placeholder="e.g. Colaba, Mumbai"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Favorite Dish</label>
                  <input
                    type="text"
                    value={dishFavored}
                    onChange={(e) => setDishFavored(e.target.value)}
                    placeholder="e.g. Stone-Grilled Chicken"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-stone-700 dark:text-stone-300">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={reviewQuote}
                  onChange={(e) => setReviewQuote(e.target.value)}
                  placeholder="Describe the flavours, ambiance, and service..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#281523] hover:bg-[#3d1f34] dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300 shadow-md cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
