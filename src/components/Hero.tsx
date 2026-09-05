import React from 'react';
import { 
  CalendarCheck, 
  Utensils, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Award,
  ChevronDown
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative bg-[#FAF9F6] text-[#1A1A1A] border-b border-[#E5E1D8] overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[620px] lg:min-h-[720px]">
        
        {/* Left Column: Editorial Headline & Content (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 py-14 lg:py-20 lg:border-r border-[#E5E1D8] relative z-10">
          
          {/* Subtle large background typographic watermark */}
          <div className="absolute top-6 left-6 sm:left-12 text-[#EFECE5] text-[100px] sm:text-[150px] lg:text-[180px] font-heading font-black -z-10 leading-none select-none pointer-events-none opacity-80">
            TASTE
          </div>

          {/* Micro Eyebrow */}
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-body font-bold text-[#8B0000] mb-5">
            <span>Agra Culinary Landmark</span>
            <span className="text-[#C5BFB4]">•</span>
            <span className="text-[#666]">1.2 KM TO TAJ MAHAL</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-[#1A1A1A] mb-6">
            Exquisite Spices <br className="hidden sm:inline" />
            & Timeless <span className="italic font-serif-display font-light text-[#8B0000]">Tradition</span>.
          </h1>

          {/* Editorial Lead Copy */}
          <p className="font-body text-sm sm:text-base text-[#555] max-w-xl leading-relaxed mb-8">
            Discover the culinary soul of Agra through royal Mughlai heritage recipes, slow-simmered hand-ground spices, and charcoal-fired clay tandoors. A treasured family dining legacy just moments from the Taj Mahal.
          </p>

          {/* Editorial Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => onNavigate('reservation')}
              className="bg-[#1A1A1A] text-white px-7 py-3.5 text-xs uppercase tracking-widest font-body font-semibold hover:bg-[#8B0000] transition-colors shadow-sm flex items-center space-x-2"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>

            <button
              onClick={() => onNavigate('menu')}
              className="border border-[#1A1A1A] text-[#1A1A1A] px-7 py-3.5 text-xs uppercase tracking-widest font-body font-semibold hover:bg-[#8B0000] hover:text-white hover:border-[#8B0000] transition-colors flex items-center space-x-2"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Explore Menu</span>
            </button>

            <button
              onClick={() => onNavigate('location')}
              className="border border-[#E5E1D8] bg-white text-[#555] px-5 py-3.5 text-xs uppercase tracking-widest font-body font-medium hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Google Maps View</span>
            </button>
          </div>

          {/* Editorial Micro Highlights Bar */}
          <div className="pt-8 border-t border-[#E5E1D8] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs font-bold text-[#8B0000] font-body uppercase tracking-wider mb-0.5">
                4.9 ★ Rating
              </div>
              <p className="text-[11px] text-[#777] font-body">2,840+ Google Reviews</p>
            </div>

            <div>
              <div className="text-xs font-bold text-[#1A1A1A] font-body uppercase tracking-wider mb-0.5">
                Pure Veg & Halal
              </div>
              <p className="text-[11px] text-[#777] font-body">Separate Prep Stations</p>
            </div>

            <div>
              <div className="text-xs font-bold text-[#1A1A1A] font-body uppercase tracking-wider mb-0.5">
                11:30 AM — 11:30 PM
              </div>
              <p className="text-[11px] text-[#777] font-body">Open All 7 Days</p>
            </div>

            <div>
              <div className="text-xs font-bold text-[#1A1A1A] font-body uppercase tracking-wider mb-0.5">
                Step-Free & Valet
              </div>
              <p className="text-[11px] text-[#777] font-body">100% Accessible</p>
            </div>
          </div>

        </div>

        {/* Right Column: Editorial Visual Showcase (5 Cols) */}
        <div className="lg:col-span-5 bg-[#1A1A1A] relative min-h-[380px] lg:min-h-full overflow-hidden">
          <div 
            className="absolute inset-0 opacity-55 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200')` }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/30"></div>

          {/* Top Editorial Stamp */}
          <div className="absolute top-8 right-8 z-10">
            <span className="bg-white text-[#1A1A1A] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest shadow-sm">
              Agra Heritage
            </span>
          </div>

          {/* Bottom Editorial Caption */}
          <div className="absolute bottom-10 left-8 sm:left-10 right-8 text-white z-10">
            <div className="text-[11px] uppercase tracking-[0.25em] mb-2 text-[#E5E1D8] font-body">
              Featured Specialty
            </div>
            <div className="text-2xl sm:text-3xl italic font-light font-serif-display mb-3 text-white">
              Mughlai Saffron Dum Biryani
            </div>
            <p className="text-xs text-[#DDD] max-w-sm mb-4 font-body leading-relaxed">
              Slow cooked in sealed clay pots with royal basmati, saffron infusion, and caramelized onions.
            </p>
            <div className="w-16 h-[1px] bg-white opacity-40"></div>
          </div>
        </div>

      </div>

    </section>
  );
};
