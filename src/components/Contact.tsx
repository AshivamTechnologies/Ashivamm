import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Navigation, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useToast } from '../context/ToastContext';
import { useAppTheme } from '../context/ThemeContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const { theme } = useAppTheme();
  const isMidnight = theme === 'midnight';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please enter a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Form Incomplete', 'Please check highlighted fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        'Message Sent Successfully',
        `Thank you ${name}. Our concierge at ${RESTAURANT_INFO.shortName} will contact you shortly.`,
        'success'
      );
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }, 600);
  };

  return (
    <section 
      id="contact" 
      className={`py-14 sm:py-20 transition-colors duration-500 border-t relative ${
        isMidnight 
          ? 'bg-[#12100e] border-stone-800 text-stone-100' 
          : 'bg-[#faf7f2] border-[#e8e1d5] text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
            Visit Us & Connect
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isMidnight ? 'text-cream-50' : 'text-stone-900'
          }`} style={{ textWrap: 'balance' }}>
            Contact Saffron & Stone Indian Kitchen
          </h2>
          <p className={`mt-2.5 text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
            isMidnight ? 'text-stone-400' : 'text-stone-600'
          }`} style={{ textWrap: 'balance' }}>
            Located on the historic Colaba Waterfront Promenade. Get in touch for table reservations, private catering, or general guest inquiries.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-3" />
        </div>

        {/* Company & Operations Banner */}
        <div className={`mb-8 p-5 sm:p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 text-left ${
          isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
        }`}>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl border border-stone-200 shadow-sm shrink-0">
              <img
                src={RESTAURANT_INFO.company.logo}
                alt={RESTAURANT_INFO.company.name}
                className="h-11 w-auto max-w-[150px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/ashivam_logo.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`font-serif text-base font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
                  {RESTAURANT_INFO.company.name}
                </h4>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded">
                  Operations Partner
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>
                {RESTAURANT_INFO.company.description}
              </p>
            </div>
          </div>

          <div className={`text-xs md:text-right border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto ${
            isMidnight ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-500'
          }`}>
            <span className="font-medium block">Direct Guest Support:</span>
            <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-amber-500 font-semibold hover:underline">
              {RESTAURANT_INFO.email}
            </a>
          </div>
        </div>

        {/* 4 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 sm:mb-12">
          
          {/* Card 1: Visit Us */}
          <div className={`p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left ${
            isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
          }`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className={`font-serif text-lg font-bold mb-1.5 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Visit Us</h3>
              <p className="text-xs font-semibold text-amber-500 mb-1">
                {RESTAURANT_INFO.name}
              </p>
              <p className={`text-xs leading-relaxed ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>
                14/B Heritage Promenade, Colaba Waterfront, Mumbai, MH 400001
              </p>
            </div>
            <div className={`mt-4 pt-3 border-t ${isMidnight ? 'border-stone-800' : 'border-stone-100'}`}>
              <span className="text-[11px] text-amber-500 font-medium">Valet Parking Available</span>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className={`p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left ${
            isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
          }`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className={`font-serif text-lg font-bold mb-1.5 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Telephone</h3>
              <div className={`space-y-1.5 text-xs ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>
                <p>
                  Direct: <a href={`tel:${RESTAURANT_INFO.phone}`} className={`font-semibold transition-colors hover:text-amber-500 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>{RESTAURANT_INFO.phone}</a>
                </p>
                <p>
                  Concierge: <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="hover:text-amber-500 transition-colors">{RESTAURANT_INFO.secondaryPhone}</a>
                </p>
              </div>
            </div>
            <div className={`mt-4 pt-3 border-t ${isMidnight ? 'border-stone-800' : 'border-stone-100'}`}>
              <span className={`text-[11px] ${isMidnight ? 'text-stone-400' : 'text-stone-500'}`}>Lines open during dining hours</span>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className={`p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left ${
            isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
          }`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className={`font-serif text-lg font-bold mb-1.5 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Email Inquiries</h3>
              <div className="space-y-1 text-xs">
                <p>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className={`font-semibold hover:text-amber-500 transition-colors ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
                    {RESTAURANT_INFO.email}
                  </a>
                </p>
              </div>
            </div>
            <div className={`mt-4 pt-3 border-t ${isMidnight ? 'border-stone-800' : 'border-stone-100'}`}>
              <span className={`text-[11px] ${isMidnight ? 'text-stone-400' : 'text-stone-500'}`}>Response within 24 hours</span>
            </div>
          </div>

          {/* Card 4: Hours */}
          <div className={`p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-left ${
            isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
          }`}>
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className={`font-serif text-lg font-bold mb-1.5 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Hours</h3>
              <div className={`space-y-1.5 text-xs ${isMidnight ? 'text-stone-300' : 'text-stone-700'}`}>
                <p>
                  <span className={`font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Mon – Thu:</span> {RESTAURANT_INFO.hours.mon_thu}
                </p>
                <p>
                  <span className={`font-semibold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Fri – Sun:</span> {RESTAURANT_INFO.hours.fri_sun}
                </p>
              </div>
            </div>
            <div className={`mt-4 pt-3 border-t ${isMidnight ? 'border-stone-800' : 'border-stone-100'}`}>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Open 7 Days a Week
              </span>
            </div>
          </div>

        </div>

        {/* Two-Column: Interactive Google Map + Validated Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left Column: Interactive Google Map */}
          <div className={`lg:col-span-6 rounded-3xl border p-5 sm:p-7 shadow-sm flex flex-col h-full justify-between ${
            isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className={`font-serif text-xl font-bold ${isMidnight ? 'text-white' : 'text-stone-900'}`}>Interactive Location Map</h3>
                  <p className={`text-xs ${isMidnight ? 'text-stone-400' : 'text-stone-500'}`}>Colaba Waterfront, Mumbai Harbour</p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Colaba+Waterfront+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Clean Map Container */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border relative bg-stone-900/40 border-stone-700/50">
                <iframe
                  title="Saffron & Stone Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15093.287235255474!2d72.8258384!3d18.9220027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06fffffff%3A0x88981f3322f96307!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Floating Map Pin Badge */}
                <div className={`absolute bottom-4 left-4 right-4 backdrop-blur-md p-3.5 rounded-xl border shadow-md flex items-center justify-between ${
                  isMidnight ? 'bg-stone-900/90 border-stone-700 text-white' : 'bg-white/95 border-stone-200 text-stone-900'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{RESTAURANT_INFO.name}</div>
                      <div className={`text-[11px] ${isMidnight ? 'text-stone-300' : 'text-stone-500'}`}>Colaba Promenade · Near Gateway of India</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Open Daily
                  </span>
                </div>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t flex items-center justify-between text-xs flex-wrap gap-2 ${
              isMidnight ? 'border-stone-800 text-stone-400' : 'border-stone-100 text-stone-500'
            }`}>
              <span>Landmark: 2 mins from Gateway of India</span>
              <span>Churchgate Station: 10 mins by cab</span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className={`lg:col-span-6 rounded-3xl border p-6 sm:p-8 shadow-sm ${
            isMidnight ? 'bg-stone-900/90 border-stone-800' : 'bg-white border-[#e8e1d5]'
          }`}>
            <h3 className={`font-serif text-2xl font-bold mb-1.5 ${isMidnight ? 'text-white' : 'text-stone-900'}`}>
              Send a Message
            </h3>
            <p className={`text-xs mb-6 ${isMidnight ? 'text-stone-400' : 'text-stone-600'}`}>
              For banquet reservations, private dining events, or chef tasting queries, please fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Your Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Apte"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-500'
                  } ${errors.name ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="radhika@example.com"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-500'
                  } ${errors.email ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-subject" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Subject / Topic
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-500'
                  }`}
                >
                  <option value="General Inquiry" className={isMidnight ? 'bg-stone-900 text-white' : ''}>General Dining Inquiry</option>
                  <option value="Private Event" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Private Event / Banquet Buyout</option>
                  <option value="Chef Tasting" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Chef Tasting Degustation Inquiry</option>
                  <option value="Press & Media" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Press & Media Relations</option>
                  <option value="Feedback" className={isMidnight ? 'bg-stone-900 text-white' : ''}>Dining Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isMidnight ? 'text-stone-300' : 'text-stone-700'
                }`}>
                  Your Message <span className="text-amber-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our concierge team assist you today?"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm placeholder-stone-400 focus:outline-none transition-colors ${
                    isMidnight 
                      ? 'bg-stone-800 border-stone-700 text-white focus:border-amber-400' 
                      : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-500'
                  } ${errors.message ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : ''}`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all disabled:opacity-50 active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
