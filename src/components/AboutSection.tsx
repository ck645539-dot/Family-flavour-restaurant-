import React from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Award, 
  Users 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#E5E1D8] bg-white p-2 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
                alt="Clay oven cooking at Family Flavour Restaurant"
                className="w-full h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlapping Trust Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 p-5 bg-white border border-[#E5E1D8] shadow-md max-w-xs">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 bg-[#8B0000] text-white flex items-center justify-center font-bold text-lg">
                  ★
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider font-body">4.9 / 5.0 Rating</div>
                  <p className="text-[11px] text-[#777] font-body">Trusted by 2,800+ families & travelers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Heritage & Culinary Philosophy</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] leading-tight">
              Rooted in Royal Mughal Heritage, <span className="italic font-serif-display text-[#8B0000]">Crafted for Family Joy</span>.
            </h2>

            <p className="font-body text-sm sm:text-base text-[#444] leading-relaxed">
              Agra has long been the culinary cradle of the Mughal empire, where royal khansamas elevated ordinary spices into imperial banquets. Inspired by this timeless legacy and the warmth of family dinner tables, <strong className="text-[#1A1A1A] font-semibold">Family Flavour Restaurant</strong> was established to offer authentic dining just minutes from the Taj Mahal.
            </p>

            <p className="font-body text-xs sm:text-sm text-[#666] leading-relaxed">
              We reject artificial preservatives and pre-made commercial pastes. Our gravies are slow-simmered in copper degchis for hours, our biryanis are sealed with dough for authentic <em>Dum Pukht</em> infusion, and every naan bread is slapped on red-hot clay tandoor walls only when you order.
            </p>

            {/* Four Heritage Pillars: Editorial Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-white border border-[#E5E1D8] hover:border-[#8B0000] transition-colors shadow-sm">
                <div className="flex items-center space-x-2.5 mb-2">
                  <Flame className="w-4 h-4 text-[#8B0000]" />
                  <h4 className="font-heading font-medium text-sm text-[#1A1A1A]">Live Clay Charcoal Tandoors</h4>
                </div>
                <p className="text-xs text-[#666] leading-relaxed font-body">
                  Authentic charcoal smoke infusion delivering natural charred aromas and juicy succulent kebabs.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E5E1D8] hover:border-[#8B0000] transition-colors shadow-sm">
                <div className="flex items-center space-x-2.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <h4 className="font-heading font-medium text-sm text-[#1A1A1A]">Spotless Hygiene & RO Water</h4>
                </div>
                <p className="text-xs text-[#666] leading-relaxed font-body">
                  FSSAI Gold Grade certification, certified Halal meats, and multi-stage RO UV filtered drinking water.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E5E1D8] hover:border-[#8B0000] transition-colors shadow-sm">
                <div className="flex items-center space-x-2.5 mb-2">
                  <Users className="w-4 h-4 text-[#1A1A1A]" />
                  <h4 className="font-heading font-medium text-sm text-[#1A1A1A]">Generous Family Hospitality</h4>
                </div>
                <p className="text-xs text-[#666] leading-relaxed font-body">
                  Comfortable seating, private dining chambers, and attentive care for children and seniors.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E5E1D8] hover:border-[#8B0000] transition-colors shadow-sm">
                <div className="flex items-center space-x-2.5 mb-2">
                  <Award className="w-4 h-4 text-[#8B0000]" />
                  <h4 className="font-heading font-medium text-sm text-[#1A1A1A]">Tailored Spice Profiles</h4>
                </div>
                <p className="text-xs text-[#666] leading-relaxed font-body">
                  From mild velvety curries for international travelers to sizzling hot recipes for desi spice lovers.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
