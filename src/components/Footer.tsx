import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#13110f] text-stone-300 border-t border-stone-800/80 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact 4-Column Company Details Grid from Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          
          {/* Column 1: Company Logo & Tagline */}
          <div className="space-y-4">
            <div className="inline-block p-2 bg-white rounded-xl shadow-md border border-stone-200">
              <img
                src={RESTAURANT_INFO.company.logo}
                alt="Ashivam Technologies"
                className="h-12 w-auto max-w-[170px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/public/assets/aistudio/image_fa912bac.png';
                }}
              />
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-xs">
              {RESTAURANT_INFO.company.description}
            </p>
          </div>

          {/* Column 2: VISIT US */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-amber-500">
              VISIT US
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{RESTAURANT_INFO.name}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: HOURS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-amber-500">
              HOURS
            </h4>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-200 font-medium">Mon – Thu</div>
                  <div className="text-stone-400 text-xs mt-0.5">{RESTAURANT_INFO.hours.mon_thu}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-200 font-medium">Fri – Sun</div>
                  <div className="text-stone-400 text-xs mt-0.5">{RESTAURANT_INFO.hours.fri_sun}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: FOLLOW */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider uppercase text-amber-500">
              FOLLOW
            </h4>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {RESTAURANT_INFO.company.followText}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-400 transition-colors text-xs font-semibold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href={RESTAURANT_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-400 transition-colors text-xs font-semibold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={RESTAURANT_INFO.social.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-400 transition-colors text-xs font-semibold"
                aria-label="TripAdvisor"
              >
                TA
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Exact Copyright from Reference */}
        <div className="pt-6 border-t border-stone-800/80 text-center text-xs text-stone-400">
          <p>© 2026 Saffron & Stone. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
