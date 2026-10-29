import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Music, X } from 'lucide-react';
import { RESTAURANT_EVENTS } from '../data/restaurantData';
import { RestaurantEvent } from '../types';
import { useToast } from '../context/ToastContext';
import { useAppTheme } from '../context/ThemeContext';

interface EventsProps {
  onBookEventTable: (eventTitle: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onBookEventTable }) => {
  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';
  const [selectedEventModal, setSelectedEventModal] = useState<RestaurantEvent | null>(null);

  useEffect(() => {
    if (!selectedEventModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEventModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventModal]);

  const handleInquire = (event: RestaurantEvent) => {
    setSelectedEventModal(event);
  };

  const handleBookNow = (eventTitle: string) => {
    setSelectedEventModal(null);
    onBookEventTable(eventTitle);
    showToast('Event Selected', `Booking table for "${eventTitle}". Complete your guest details below.`, 'info');
  };

  return (
    <section 
      id="events" 
      className={`py-14 sm:py-20 transition-colors duration-500 border-t relative ${
        isMidnight 
          ? 'bg-[#141210] border-stone-800 text-stone-100' 
          : 'bg-[#f7f4ed] border-[#e8e1d5] text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center justify-center gap-2">
            <Music className="w-3.5 h-3.5 text-amber-500" />
            <span>Curated Culinary Experiences</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isMidnight ? 'text-cream-50' : 'text-stone-900'
          }`} style={{ textWrap: 'balance' }}>
            Upcoming Restaurant Events
          </h2>
          <p className={`mt-2.5 text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
            isMidnight ? 'text-stone-400' : 'text-stone-600'
          }`} style={{ textWrap: 'balance' }}>
            From candlelit live acoustic sitar evenings to sun-drenched seaside terrace brunches and private chef degustations.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-3" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {RESTAURANT_EVENTS.map((event: RestaurantEvent) => (
            <div
              key={event.id}
              className={`group rounded-3xl border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between text-left ${
                isMidnight
                  ? 'bg-stone-900/90 border-stone-800 hover:border-amber-500/60 shadow-stone-950/60'
                  : 'bg-white border-[#e8e1d5] hover:border-amber-400 shadow-xl shadow-stone-200/50'
              }`}
            >
              <div>
                {/* Event Image Container with Scrim & Tag */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900/30">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/event_chef_degustation_1793242853426.jpg';
                    }}
                  />

                  {/* Status Tag */}
                  <div className="absolute top-4 left-4 bg-amber-400 text-stone-950 font-bold text-[11px] uppercase px-3 py-1 rounded-md shadow-md tracking-wider">
                    {event.statusTag}
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6 sm:p-7 text-left">
                  <div className="text-xs uppercase tracking-wider text-amber-500 font-bold mb-1">
                    {event.tagline}
                  </div>
                  
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-colors leading-snug ${
                    isMidnight ? 'text-white group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-800'
                  }`}>
                    {event.title}
                  </h3>

                  {/* Date, Time, Cover */}
                  <div className={`mt-4 space-y-2 py-3 border-y text-xs ${
                    isMidnight ? 'border-stone-800 text-stone-300' : 'border-stone-100 text-stone-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className={`font-medium ${isMidnight ? 'text-stone-200' : 'text-stone-800'}`}>{event.dateOrSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-amber-500">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.coverPrice}</span>
                    </div>
                  </div>

                  <p className={`mt-4 text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                    isMidnight ? 'text-stone-400' : 'text-stone-600'
                  }`}>
                    {event.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 space-y-1.5">
                    {event.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs ${
                        isMidnight ? 'text-stone-300' : 'text-stone-600'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`p-6 pt-0 flex items-center justify-between gap-3 border-t ${
                isMidnight ? 'border-stone-800/80' : 'border-stone-100'
              }`}>
                <button
                  onClick={() => handleInquire(event)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    isMidnight ? 'text-amber-400 hover:text-amber-300' : 'text-amber-800 hover:text-stone-950'
                  }`}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleBookNow(event.title)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Book Table
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Detail */}
      {selectedEventModal && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setSelectedEventModal(null)}
          />
          <div className={`relative w-full max-w-xl border rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-left ${
            isMidnight ? 'bg-stone-900 border-stone-700 text-stone-100' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isMidnight ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <div>
                <h4 id="event-modal-title" className={`font-serif text-xl sm:text-2xl font-bold ${
                  isMidnight ? 'text-cream-50' : 'text-stone-900'
                }`}>
                  {selectedEventModal.title}
                </h4>
                <p className="text-xs uppercase tracking-wider text-amber-500 font-bold mt-1">
                  {selectedEventModal.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                aria-label="Close Event Dialog"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                loading="lazy"
                decoding="async"
                className={`w-full h-56 object-cover rounded-xl border ${
                  isMidnight ? 'border-stone-700' : 'border-stone-200'
                }`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/event_chef_degustation_1793242853426.jpg';
                }}
              />

              <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border text-xs ${
                isMidnight ? 'bg-stone-800/80 border-stone-700 text-stone-200' : 'bg-amber-50/60 border-amber-200/60 text-stone-700'
              }`}>
                <div>
                  <span className="text-stone-400 block uppercase font-medium text-[10px]">Schedule</span>
                  <span className={`font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{selectedEventModal.dateOrSchedule}</span>
                </div>
                <div>
                  <span className="text-stone-400 block uppercase font-medium text-[10px]">Timings</span>
                  <span className={`font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{selectedEventModal.time}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 block uppercase font-medium text-[10px]">Cover / Pricing</span>
                  <span className="font-semibold text-amber-500">{selectedEventModal.coverPrice}</span>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                isMidnight ? 'text-stone-300' : 'text-stone-700'
              }`}>
                {selectedEventModal.description}
              </p>

              <div>
                <h5 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-white' : 'text-stone-900'
                }`}>
                  Event Inclusions & Privileges:
                </h5>
                <ul className="space-y-1.5 text-xs">
                  {selectedEventModal.highlights.map((h, i) => (
                    <li key={i} className={`flex items-center gap-2 ${
                      isMidnight ? 'text-stone-300' : 'text-stone-600'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t flex items-center justify-between ${
              isMidnight ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="text-xs text-stone-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleBookNow(selectedEventModal.title)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm cursor-pointer"
              >
                Book This Experience
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
