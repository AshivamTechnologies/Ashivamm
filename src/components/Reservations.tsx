import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, AlertCircle, Phone, Mail, User, MessageSquare, Trash2, X } from 'lucide-react';
import { ReservationData } from '../types';
import { useToast } from '../context/ToastContext';
import { useAppTheme } from '../context/ThemeContext';

const RESERVATIONS_STORAGE_KEY = 'saffron_stone_reservations_v1';

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
];

interface ReservationsProps {
  prefilledRequest?: string;
}

export const Reservations: React.FC<ReservationsProps> = ({ prefilledRequest }) => {
  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState('2');
  const [seatingPreference, setSeatingPreference] = useState('Main Dining Hall');
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    if (prefilledRequest) {
      setSpecialRequests(prefilledRequest);
    }
  }, [prefilledRequest]);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [latestConfirmed, setLatestConfirmed] = useState<ReservationData | null>(null);
  const [allReservations, setAllReservations] = useState<ReservationData[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Min date string
  const todayStr = new Date().toISOString().split('T')[0];

  // Load existing reservations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
      if (stored) {
        setAllReservations(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!showHistoryModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowHistoryModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHistoryModal]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!phone.trim()) {
      newErrors.phone = 'Please enter a contact phone number.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter an email address.';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!date) {
      newErrors.date = 'Please select a reservation date.';
    } else if (date < todayStr) {
      newErrors.date = 'Reservation date cannot be in the past.';
    }
    if (!time) newErrors.time = 'Please select a dining time slot.';
    if (!guests || Number(guests) < 1) newErrors.guests = 'Please select guest count.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Form Incomplete', 'Please check the required fields highlighted in red.', 'error');
      return;
    }

    const newBooking: ReservationData = {
      id: `SS-${Date.now().toString().slice(-6)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      date,
      time,
      guests: Number(guests),
      seatingPreference,
      specialRequests: specialRequests.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    setLatestConfirmed(newBooking);
    const nextList = [newBooking, ...allReservations];
    setAllReservations(nextList);
    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(nextList));
    } catch (e) {
      console.error('Failed to save reservation', e);
    }

    showToast(
      'Reservation Confirmed!',
      `Table booked for ${guests} guests on ${date} at ${time}. Confirmation #${newBooking.id}`,
      'success',
      6000
    );

    setSpecialRequests('');
  };

  const cancelReservation = (id: string) => {
    const updated = allReservations.filter((r) => r.id !== id);
    setAllReservations(updated);
    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (latestConfirmed?.id === id) {
      setLatestConfirmed(null);
    }
    showToast('Reservation Cancelled', `Booking #${id} has been cancelled.`, 'info');
  };

  return (
    <section 
      id="reservations" 
      className={`py-14 sm:py-20 transition-colors duration-500 border-t relative ${
        isMidnight ? 'bg-[#100e0c] text-white' : 'bg-white text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Table Reservations</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isMidnight ? 'text-cream-50' : 'text-stone-900'
          }`} style={{ textWrap: 'balance' }}>
            Book Your Fine Dining Experience
          </h2>
          <p className={`mt-2.5 text-sm sm:text-base max-w-xl mx-auto ${
            isMidnight ? 'text-stone-400' : 'text-stone-600'
          }`}>
            Reserve your table at Saffron & Stone Indian Kitchen. Priority seating in our ambient vaulted hall or garden courtyard.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-3" />
        </div>

        {/* View Previous Bookings Action */}
        {allReservations.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowHistoryModal(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                isMidnight 
                  ? 'text-amber-300 bg-stone-900 hover:bg-stone-800 border-stone-700' 
                  : 'text-amber-900 bg-amber-50 hover:bg-amber-100 border-amber-300'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Manage My Bookings ({allReservations.length})</span>
            </button>
          </div>
        )}

        {/* Latest Confirmation Card if submitted */}
        {latestConfirmed && (
          <div className={`max-w-2xl mx-auto mb-10 p-6 sm:p-8 rounded-2xl border shadow-md animate-in zoom-in-95 duration-300 text-left ${
            isMidnight ? 'bg-stone-900/90 border-amber-500/40' : 'bg-amber-50/80 border-amber-300'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                    Booking Confirmed · #{latestConfirmed.id}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Instant Guaranteed Seating
                  </span>
                </div>
                <h3 className={`font-serif text-2xl font-bold mt-1 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
                  We look forward to welcoming you, {latestConfirmed.fullName}!
                </h3>
                
                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t ${
                  isMidnight ? 'border-stone-800' : 'border-amber-200'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-medium">Date</span>
                    <div className={`text-sm font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{latestConfirmed.date}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-medium">Time</span>
                    <div className={`text-sm font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{latestConfirmed.time}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-medium">Guests</span>
                    <div className={`text-sm font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{latestConfirmed.guests} Person(s)</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-stone-400 font-medium">Area</span>
                    <div className={`text-sm font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{latestConfirmed.seatingPreference}</div>
                  </div>
                </div>

                {latestConfirmed.specialRequests && (
                  <div className={`mt-4 pt-3 border-t text-xs ${
                    isMidnight ? 'border-stone-800 text-stone-300' : 'border-amber-200 text-stone-700'
                  }`}>
                    <span className={`font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Special Request:</span> {latestConfirmed.specialRequests}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between pt-2">
                  <p className={`text-xs ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>
                    Notice transmitted to <span className={`font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{latestConfirmed.email}</span>
                  </p>
                  <button
                    onClick={() => setLatestConfirmed(null)}
                    className="text-xs text-amber-500 hover:underline font-semibold cursor-pointer"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Reservation Form Layout */}
        <div className={`max-w-4xl mx-auto rounded-3xl border p-6 sm:p-10 shadow-sm text-left ${
          isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-[#faf7f2] border-[#e8e1d5]'
        }`}>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            
            {/* Row 1: Name, Phone, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Full Name */}
              <div>
                <label htmlFor="res-fullname" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="res-fullname"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rao"
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    } ${
                      errors.fullName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="res-phone" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Phone Number <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    } ${
                      errors.phone ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="res-email" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="res-email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    } ${
                      errors.email ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

            </div>

            {/* Row 2: Date, Time, Guests, Seating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Date */}
              <div>
                <label htmlFor="res-date" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Reservation Date <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="res-date"
                    type="date"
                    required
                    aria-required="true"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    } ${
                      errors.date ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.date}
                  </p>
                )}
              </div>

              {/* Time Slot */}
              <div>
                <label htmlFor="res-time" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Time Slot <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    }`}
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className={isMidnight ? 'bg-stone-900 text-white' : ''}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="res-guests" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Number of Guests <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="res-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
                      isMidnight 
                        ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                        : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                    }`}
                  >
                    <option value="1" className={isMidnight ? 'bg-stone-900 text-white' : ''}>1 Guest (Solo Dining)</option>
                    <option value="2" className={isMidnight ? 'bg-stone-900 text-white' : ''}>2 Guests (Couple Table)</option>
                    <option value="3" className={isMidnight ? 'bg-stone-900 text-white' : ''}>3 Guests</option>
                    <option value="4" className={isMidnight ? 'bg-stone-900 text-white' : ''}>4 Guests (Family / Friends)</option>
                    <option value="5" className={isMidnight ? 'bg-stone-900 text-white' : ''}>5 Guests</option>
                    <option value="6" className={isMidnight ? 'bg-stone-900 text-white' : ''}>6 Guests</option>
                    <option value="8" className={isMidnight ? 'bg-stone-900 text-white' : ''}>8 Guests (Private Bay)</option>
                    <option value="10" className={isMidnight ? 'bg-stone-900 text-white' : ''}>10+ Guests (Royal Banquet)</option>
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label htmlFor="res-seating" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Seating Area
                </label>
                <select
                  id="res-seating"
                  value={seatingPreference}
                  onChange={(e) => setSeatingPreference(e.target.value)}
                  className={`w-full px-3.5 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                  }`}
                >
                  <option value="Main Dining Hall" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Vaulted Stone Hall</option>
                  <option value="Courtyard Terrace" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Outdoor Terracotta Courtyard</option>
                  <option value="Chef Hearth Bar" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Live Hearth Counter</option>
                  <option value="Private Dining Suite" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Private Dining Enclave</option>
                </select>
              </div>

            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="res-requests" className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                isMidnight ? 'text-stone-300' : 'text-stone-700'
              }`}>
                Special Requests or Dietary Requirements
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="res-requests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Anniversary celebration, window table request, Jain food (no onion/garlic), nut allergies..."
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-white border-stone-300 text-stone-900 focus:border-amber-600'
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className={`text-xs ${isMidnight ? 'text-stone-400' : 'text-stone-500'}`}>
                <span>Free cancellation up to 2 hours prior · Instant booking confirmation</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              >
                Confirm Reservation
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Reservation History Drawer / Modal */}
      {showHistoryModal && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="bookings-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setShowHistoryModal(false)}
          />
          <div className={`relative w-full max-w-2xl border rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl z-10 text-left ${
            isMidnight ? 'bg-stone-900 border-stone-700 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isMidnight ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <div id="bookings-modal-title" className={`font-serif text-xl font-bold flex items-center gap-2 ${
                isMidnight ? 'text-cream-50' : 'text-stone-900'
              }`}>
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>My Active Reservations</span>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                aria-label="Close Bookings Dialog"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {allReservations.length === 0 ? (
                <p className="text-sm text-stone-500 text-center py-8">
                  You have no saved reservations.
                </p>
              ) : (
                allReservations.map((res) => (
                  <div
                    key={res.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isMidnight ? 'bg-stone-800/80 border-stone-700' : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-500 font-mono">#{res.id}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                          {res.status}
                        </span>
                      </div>
                      <h4 className={`font-serif text-base font-semibold mt-1 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
                        {res.fullName}
                      </h4>
                      <p className={`text-xs mt-0.5 ${isMidnight ? 'text-stone-300' : 'text-stone-600'}`}>
                        {res.date} at {res.time} · {res.guests} Guests ({res.seatingPreference})
                      </p>
                      {res.specialRequests && (
                        <p className="text-[11px] text-stone-400 italic mt-1">
                          "{res.specialRequests}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => cancelReservation(res.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg transition-colors shrink-0 font-medium cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className={`mt-6 pt-4 border-t flex justify-end ${
              isMidnight ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
