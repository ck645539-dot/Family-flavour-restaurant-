import React from 'react';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  ShieldCheck, 
  Navigation
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#CCC] border-t border-[#2E2E2E]">
      
      {/* Top Editorial Invitation Bar */}
      <div className="border-b border-[#2E2E2E] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 bg-[#8B0000] text-white flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-normal text-white text-lg">
                Visiting the Taj Mahal in Agra?
              </h4>
              <p className="text-xs text-[#999] font-body">
                We are located just 1.2 km away on Fatehabad VIP Road with dedicated guest valet parking.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('reservation')}
              className="px-6 py-3 bg-[#8B0000] hover:bg-white hover:text-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Book Table Online
            </button>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#444] hover:border-white hover:text-white text-[#BBB] text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Google Map Directions
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white text-[#1A1A1A] flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-light text-xl text-white block">Family Flavour</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B0000] font-bold">Restaurant • Agra</span>
              </div>
            </div>

            <p className="text-xs text-[#999] leading-relaxed font-body">
              Agra's cherished family dining landmark celebrating authentic Mughlai heritage recipes, charcoal clay tandoors, and hospitable family service.
            </p>

            <div className="text-xs text-[#888] flex items-center space-x-1.5 font-body">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>FSSAI Gold Certified Clean Kitchen</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-normal text-sm text-white uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#999] font-body">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-white transition-colors">
                  Online Food Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reservation')} className="hover:text-white transition-colors">
                  Table Reservation System
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Food & Ambiance Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-white transition-colors">
                  Google Map Location & Routes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('accessibility')} className="hover:text-white transition-colors">
                  Wheelchair & Family Accessibility
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Our Culinary Heritage Story
                </button>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div className="space-y-3">
            <h4 className="font-heading font-normal text-sm text-white uppercase tracking-widest">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs text-[#999] font-body">
              <p><strong className="text-white font-medium">Days:</strong> {RESTAURANT_INFO.timings.days}</p>
              <p><strong className="text-white font-medium">Lunch:</strong> {RESTAURANT_INFO.timings.lunch}</p>
              <p><strong className="text-white font-medium">Dinner:</strong> {RESTAURANT_INFO.timings.dinner}</p>
              <p><strong className="text-white font-medium">Last Order:</strong> {RESTAURANT_INFO.timings.kitchenCloses}</p>
              <p className="text-[11px] text-[#777] pt-1">
                * Continuous beverages & tandoori appetizers between lunch & dinner
              </p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-heading font-normal text-sm text-white uppercase tracking-widest">
              Location & Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-[#999] font-body">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#8B0000] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phones[0].number}`} className="text-white font-medium hover:text-[#8B0000]">
                  {RESTAURANT_INFO.phones[0].display}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#8B0000] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white truncate">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom micro bar */}
        <div className="mt-12 pt-6 border-t border-[#2E2E2E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777] font-body">
          <div>
            © {new Date().getFullYear()} Family Flavour Restaurant. All rights reserved. Agra, Uttar Pradesh, India.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="px-3.5 py-1.5 border border-[#3A3A3A] text-[#AAA] hover:text-white hover:border-white transition-colors flex items-center space-x-1.5 text-xs uppercase tracking-wider"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
