import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink, 
  Car, 
  Compass, 
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const MapAndLocationSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${RESTAURANT_INFO.coordinates.lat}, ${RESTAURANT_INFO.coordinates.lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  return (
    <section id="location" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Prime Agra Location</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            Find Us on <span className="italic font-serif-display text-[#8B0000]">Google Maps</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Located just 1.2 km from the Taj Mahal East Gate on Fatehabad Road Tourist Corridor. Enjoy effortless access with dedicated valet parking and step-free entry.
          </p>
        </div>

        {/* Main Grid: Interactive Map & Direction Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map Embed (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative border border-[#E5E1D8] bg-white shadow-sm flex-1 min-h-[440px] sm:min-h-[500px]">
              
              {/* Google Maps Embed iframe with responsive container */}
              <iframe
                title="Family Flavour Restaurant Google Map Location"
                src={RESTAURANT_INFO.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.95]"
              />

              {/* Top floating location pill over map */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 bg-white/95 backdrop-blur-md border border-[#E5E1D8] shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-[#8B0000] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-sm text-[#1A1A1A]">Family Flavour Restaurant</h4>
                    <p className="text-[11px] text-[#777]">1.2 km from Taj Mahal (East Gate)</p>
                  </div>
                </div>
              </div>

              {/* Bottom floating CTA to open in native Google Maps app */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3 pointer-events-auto">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-semibold text-xs uppercase tracking-widest shadow-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>

            </div>

            {/* Quick GPS & Address copy toolbar below map */}
            <div className="mt-4 p-4 bg-white border border-[#E5E1D8] flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center space-x-2 text-[#666]">
                <span className="text-[#1A1A1A] font-semibold text-[11px] uppercase tracking-wider">GPS Coordinates:</span>
                <code className="font-mono text-[#8B0000] font-bold">{RESTAURANT_INFO.coordinates.lat}° N, {RESTAURANT_INFO.coordinates.lng}° E</code>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyCoords}
                  className="px-3.5 py-1.5 bg-[#FAF9F6] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E1D8] text-[#555] flex items-center space-x-1.5 transition-colors text-xs uppercase tracking-wider font-medium"
                >
                  {copiedCoords ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Coordinates</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyAddress}
                  className="px-3.5 py-1.5 bg-[#FAF9F6] hover:bg-[#1A1A1A] hover:text-white border border-[#E5E1D8] text-[#555] flex items-center space-x-1.5 transition-colors text-xs uppercase tracking-wider font-medium"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Address, Landmark Distances & Transit Guide (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="p-6 bg-white border border-[#E5E1D8] shadow-sm">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-9 h-9 bg-[#FAF9F6] border border-[#E5E1D8] flex items-center justify-center text-[#8B0000] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-normal text-lg text-[#1A1A1A]">
                    Restaurant Location
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider text-[#777]">
                    Fatehabad Road Tourism Corridor
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#444] leading-relaxed mb-4 font-body">
                {RESTAURANT_INFO.address}
              </p>

              <div className="pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs text-[#666]">
                <span>Near VIP Gate & ITC Mughal</span>
                <span className="text-[#8B0000] font-semibold">Easy Coach & Taxi Access</span>
              </div>
            </div>

            {/* Proximity to Agra Landmarks */}
            <div className="p-6 bg-white border border-[#E5E1D8] shadow-sm">
              <h3 className="font-heading font-normal text-base text-[#1A1A1A] mb-4 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#8B0000]" />
                <span>Distances from Major Agra Landmarks</span>
              </h3>

              <div className="space-y-2.5">
                {RESTAURANT_INFO.nearbyLandmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF9F6] border border-[#E5E1D8] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-[#1A1A1A] block">{lm.name}</span>
                      <span className="text-[11px] text-[#777]">{lm.time}</span>
                    </div>
                    <div className="px-2.5 py-1 bg-white border border-[#E5E1D8] text-[#8B0000] font-mono font-bold text-xs">
                      {lm.distance}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Getting Here: Transit Guide */}
            <div className="p-6 bg-white border border-[#E5E1D8] shadow-sm">
              <h3 className="font-heading font-normal text-base text-[#1A1A1A] mb-3 flex items-center space-x-2">
                <Car className="w-4 h-4 text-[#8B0000]" />
                <span>Arrival & Parking Directions</span>
              </h3>

              <ul className="text-xs text-[#555] space-y-2.5 leading-relaxed font-body">
                <li className="flex items-start space-x-2">
                  <span className="text-[#8B0000] font-bold">•</span>
                  <span><strong>By E-Rickshaw / Auto:</strong> Ask for "Family Flavour Restaurant on VIP Road near Taj East Gate". Average fare from Taj ticket counter is ₹30–₹50.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#8B0000] font-bold">•</span>
                  <span><strong>By Private Car / Tour Bus:</strong> Smooth dual-lane access with dedicated bus bay and free valet parking attendants on site.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
