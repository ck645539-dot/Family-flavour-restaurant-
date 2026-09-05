import React from 'react';
import { 
  Accessibility, 
  Baby, 
  Car, 
  Languages, 
  HeartHandshake, 
  Phone, 
  Check, 
  Sparkles,
  Droplets
} from 'lucide-react';
import { RESTAURANT_INFO, ACCESSIBILITY_FEATURES } from '../data/restaurantData';

export const AccessibilitySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wheelchair': return <Accessibility className="w-5 h-5 text-[#8B0000]" />;
      case 'Baby': return <Baby className="w-5 h-5 text-[#8B0000]" />;
      case 'Car': return <Car className="w-5 h-5 text-[#8B0000]" />;
      case 'HeartPulse': return <HeartHandshake className="w-5 h-5 text-[#8B0000]" />;
      case 'Languages': return <Languages className="w-5 h-5 text-[#8B0000]" />;
      case 'ShieldCheck': return <Droplets className="w-5 h-5 text-[#8B0000]" />;
      default: return <Sparkles className="w-5 h-5 text-[#8B0000]" />;
    }
  };

  return (
    <section id="accessibility" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <Accessibility className="w-3.5 h-3.5" />
            <span>Inclusive Family Hospitality</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            Accessibility & Comfort for <span className="italic font-serif-display text-[#8B0000]">Every Guest</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            At Family Flavour Restaurant, true hospitality means anticipating the comfort of elders, toddlers, travelers, and guests of all abilities.
          </p>
        </div>

        {/* Accessibility Cards Grid: Editorial Frame */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ACCESSIBILITY_FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 bg-white border border-[#E5E1D8] hover:border-[#8B0000] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-[#FAF9F6] border border-[#E5E1D8] flex items-center justify-center mb-5">
                  {getIcon(feat.icon)}
                </div>
                <h3 className="font-heading font-normal text-lg text-[#1A1A1A] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-body">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-[#E5E1D8] flex items-center space-x-2 text-xs text-emerald-800 font-medium uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Verified On-Site Facility</span>
              </div>
            </div>
          ))}
        </div>

        {/* Accessibility Assistance Callout */}
        <div className="p-8 bg-[#F4F1ED] border border-[#E5E1D8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-heading font-light text-2xl text-[#1A1A1A]">
              Need Specific Assistance or Advance Arrangements?
            </h3>
            <p className="text-xs sm:text-sm text-[#666] max-w-2xl font-body leading-relaxed">
              Inform our front desk team when booking or call us in advance. We happily assist with ramp escorting, reserving wide aisle seating for wheelchairs, or preparing special dietary meals.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={`tel:${RESTAURANT_INFO.phones[0].number}`}
              className="px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#8B0000] text-white text-xs uppercase tracking-widest font-semibold shadow-sm flex items-center space-x-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Front Desk</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
