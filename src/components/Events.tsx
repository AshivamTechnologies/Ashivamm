import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, ArrowRight, Music, Check, X } from 'lucide-react';
import { RESTAURANT_EVENTS } from '../data/restaurantData';
import { RestaurantEvent } from '../types';
import { useToast } from '../context/ToastContext';

interface EventsProps {
  onBookEventTable: (eventTitle: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onBookEventTable }) => {
  const { showToast } = useToast();
  const [selectedEventModal, setSelectedEventModal] = useState<RestaurantEvent | null>(null);

  const handleInquire = (event: RestaurantEvent) => {
    setSelectedEventModal(event);
  };

  const handleBookNow = (eventTitle: string) => {
    setSelectedEventModal(null);
    onBookEventTable(eventTitle);
    showToast('Event Selected', `Booking table for "${eventTitle}". Complete your guest details below.`, 'info');
  };

  return (
    <section id="events" className="py-12 sm:py-16 bg-[#f7f4ed] border-t border-[#e8e1d5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2 flex items-center justify-center gap-2">
            <Music className="w-3.5 h-3.5 text-amber-700" />
            <span>Curated Culinary Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Upcoming Restaurant Events
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
            From candlelit live acoustic sitar evenings to sun-drenched seaside terrace brunches and private chef degustations.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {RESTAURANT_EVENTS.map((event: RestaurantEvent) => (
            <div
              key={event.id}
              className="group bg-white rounded-3xl border border-[#e8e1d5] overflow-hidden hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between text-left"
            >
              <div>
                {/* Event Image Container with Scrim & Tag */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Status Tag */}
                  <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-bold text-[11px] uppercase px-3 py-1 rounded-md shadow-md tracking-wider">
                    {event.statusTag}
                  </div>
                </div>

                {/* Event Body with clean left alignment */}
                <div className="p-6 sm:p-7 text-left">
                  <div className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1">
                    {event.tagline}
                  </div>
                  
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Date, Time, Cover */}
                  <div className="mt-4 space-y-2 py-3 border-y border-stone-100 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="font-medium text-stone-800">{event.dateOrSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-900 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                      <span>{event.coverPrice}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 space-y-1.5">
                    {event.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-7 pt-0 border-t border-stone-100 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => handleInquire(event)}
                  className="px-3.5 py-2.5 text-xs text-stone-700 hover:text-stone-950 border border-stone-200 hover:border-stone-400 rounded-xl transition-colors font-medium bg-stone-50"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleBookNow(event.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm active:scale-98"
                >
                  <span>Reserve Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            onClick={() => setSelectedEventModal(null)}
          />
          <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-left">
            <div className="flex items-start justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                  {selectedEventModal.statusTag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {selectedEventModal.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedEventModal.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-56 object-cover rounded-xl border border-stone-200"
                referrerPolicy="no-referrer"
              />

              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500 block uppercase font-medium text-[10px]">Schedule</span>
                  <span className="font-semibold text-stone-900">{selectedEventModal.dateOrSchedule}</span>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase font-medium text-[10px]">Timings</span>
                  <span className="font-semibold text-stone-900">{selectedEventModal.time}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-500 block uppercase font-medium text-[10px]">Cover / Pricing</span>
                  <span className="font-semibold text-amber-900">{selectedEventModal.coverPrice}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {selectedEventModal.description}
              </p>

              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                  Event Inclusions & Privileges:
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {selectedEventModal.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="text-xs text-stone-500 hover:text-stone-900"
              >
                Close
              </button>
              <button
                onClick={() => handleBookNow(selectedEventModal.title)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm"
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
