import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Navigation, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();

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
    }, 800);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-[#faf7f2] border-t border-[#e8e1d5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
            Visit Us & Connect
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Contact Saffron & Stone Indian Kitchen
          </h2>
          <p className="mt-2.5 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
            Located on the historic Colaba Waterfront Promenade. Get in touch for table reservations, private catering, or general guest inquiries.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* Company & Operations Banner (From reference details) */}
        <div className="mb-6 sm:mb-8 p-5 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl border border-stone-200 shadow-sm shrink-0">
              <img
                src={RESTAURANT_INFO.company.logo}
                alt={RESTAURANT_INFO.company.name}
                className="h-11 w-auto max-w-[150px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/public/assets/aistudio/image_fa912bac.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {RESTAURANT_INFO.company.name}
                </h4>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  Operations Partner
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                {RESTAURANT_INFO.company.description}
              </p>
            </div>
          </div>

          <div className="text-xs text-stone-500 md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-stone-200 w-full md:w-auto">
            <span className="font-medium text-stone-700 block">Direct Guest Support:</span>
            <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-amber-700 font-semibold hover:underline">
              {RESTAURANT_INFO.email}
            </a>
          </div>
        </div>

        {/* 4 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 sm:mb-12">
          
          {/* Card 1: Visit Us / Location */}
          <div className="p-6 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1.5">Visit Us</h3>
              <p className="text-xs font-semibold text-amber-800 mb-1">
                {RESTAURANT_INFO.name}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                14/B Heritage Promenade, Colaba Waterfront, Mumbai, MH 400001
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[11px] text-amber-700 font-medium">Valet Parking Available</span>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="p-6 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1.5">Telephone</h3>
              <div className="space-y-1.5 text-xs text-stone-600">
                <p>
                  Direct: <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-semibold text-stone-900 hover:text-amber-700 transition-colors">{RESTAURANT_INFO.phone}</a>
                </p>
                <p>
                  Concierge: <a href={`tel:${RESTAURANT_INFO.secondaryPhone}`} className="hover:text-amber-700 transition-colors">{RESTAURANT_INFO.secondaryPhone}</a>
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[11px] text-stone-500">Lines open during dining hours</span>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="p-6 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1.5">Email Inquiries</h3>
              <div className="space-y-1 text-xs text-stone-600">
                <p>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="font-semibold text-stone-900 hover:text-amber-700 transition-colors">
                    {RESTAURANT_INFO.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[11px] text-stone-500">Response within 24 hours</span>
            </div>
          </div>

          {/* Card 4: Hours */}
          <div className="p-6 rounded-2xl bg-white border border-[#e8e1d5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1.5">Hours</h3>
              <div className="space-y-1.5 text-xs text-stone-700">
                <p>
                  <span className="font-semibold text-stone-900">Mon – Thu:</span> {RESTAURANT_INFO.hours.mon_thu}
                </p>
                <p>
                  <span className="font-semibold text-stone-900">Fri – Sun:</span> {RESTAURANT_INFO.hours.fri_sun}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Open 7 Days a Week
              </span>
            </div>
          </div>

        </div>

        {/* Two-Column: Interactive Google Map + Validated Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Google Map */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e8e1d5] p-5 sm:p-7 shadow-sm flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">Interactive Location Map</h3>
                  <p className="text-xs text-stone-500">Colaba Waterfront, Mumbai Harbour</p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Colaba+Waterfront+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Clean Map Container */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100">
                <iframe
                  title="Saffron & Stone Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15093.287235255474!2d72.8258384!3d18.9220027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06fffffff%3A0x88981f3322f96307!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Floating Map Pin Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">{RESTAURANT_INFO.name}</div>
                      <div className="text-[11px] text-stone-500">Colaba Promenade · Near Gateway of India</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Open Daily
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Landmark: 2 mins from Gateway of India</span>
              <span>Churchgate Station: 10 mins by cab</span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#e8e1d5] p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1.5">
              Send a Message
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              For banquet reservations, private dining events, or chef tasting queries, please fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Full Name <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Apte"
                  className={`w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-colors ${
                    errors.name
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Email Address <span className="text-amber-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="radhika@example.com"
                  className={`w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                >
                  <option value="General Inquiry">General Dining Inquiry</option>
                  <option value="Private Event">Private Event / Banquet Buyout</option>
                  <option value="Chef Tasting">Chef Tasting Degustation Inquiry</option>
                  <option value="Press & Media">Press & Media Relations</option>
                  <option value="Feedback">Dining Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Message <span className="text-amber-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our concierge team assist you today?"
                  className={`w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white transition-colors ${
                    errors.message
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                  }`}
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all disabled:opacity-50 active:scale-98"
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
