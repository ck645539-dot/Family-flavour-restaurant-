import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Headphones
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Table Booking Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormMessage('');
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <Headphones className="w-3.5 h-3.5" />
            <span>Direct Hospitality Concierge</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            Contact & Accessibility <span className="italic font-serif-display text-[#8B0000]">Support</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions regarding dietary accommodations, private hall bookings, tour group packages, or wheelchair access? Our hospitality desk is available 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Details & Timings (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone & Direct Communications */}
            <div className="p-6 bg-white border border-[#E5E1D8] shadow-sm space-y-5">
              <h3 className="font-heading font-normal text-lg text-[#1A1A1A]">
                Direct Contact Lines
              </h3>

              <div className="space-y-3">
                {RESTAURANT_INFO.phones.map((p, idx) => (
                  <a
                    key={idx}
                    href={`tel:${p.number}`}
                    className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8] hover:border-[#8B0000] flex items-center space-x-3.5 transition-all group"
                  >
                    <div className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center shrink-0 group-hover:bg-[#8B0000] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777] uppercase font-bold tracking-widest block font-body">{p.label}</span>
                      <strong className="text-[#1A1A1A] text-sm tracking-wide group-hover:text-[#8B0000] transition-colors font-body">
                        {p.display}
                      </strong>
                    </div>
                  </a>
                ))}

                {/* WhatsApp Chat Button */}
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Family%20Flavour%20Restaurant,%20I%20need%20information%20about%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8] hover:border-emerald-700 flex items-center space-x-3.5 transition-all group"
                >
                  <div className="w-9 h-9 bg-emerald-800 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-widest block font-body">Instant WhatsApp Support</span>
                    <strong className="text-[#1A1A1A] text-sm font-body">
                      Chat with Concierge ({RESTAURANT_INFO.phones[0].display})
                    </strong>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8] hover:border-[#8B0000] flex items-center space-x-3.5 transition-all group"
                >
                  <div className="w-9 h-9 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] flex items-center justify-center shrink-0 group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#777] uppercase font-bold tracking-widest block font-body">Official Correspondence</span>
                    <strong className="text-[#1A1A1A] text-sm truncate block group-hover:text-[#8B0000] transition-colors font-body">
                      {RESTAURANT_INFO.email}
                    </strong>
                  </div>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="p-6 bg-white border border-[#E5E1D8] shadow-sm">
              <h3 className="font-heading font-normal text-base text-[#1A1A1A] mb-4 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#8B0000]" />
                <span>Daily Dining Hours</span>
              </h3>

              <div className="space-y-2 text-xs font-body">
                <div className="flex justify-between py-2 border-b border-[#E5E1D8]">
                  <span className="text-[#666]">Days of Operation</span>
                  <strong className="text-[#1A1A1A]">{RESTAURANT_INFO.timings.days}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E5E1D8]">
                  <span className="text-[#666]">Lunch Service</span>
                  <strong className="text-[#1A1A1A]">{RESTAURANT_INFO.timings.lunch}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E5E1D8]">
                  <span className="text-[#666]">Dinner Service</span>
                  <strong className="text-[#1A1A1A]">{RESTAURANT_INFO.timings.dinner}</strong>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#666]">Last Kitchen Order</span>
                  <strong className="text-[#8B0000] font-bold">{RESTAURANT_INFO.timings.kitchenCloses}</strong>
                </div>
              </div>

              <p className="text-[11px] text-[#777] mt-3 leading-relaxed font-body">
                * Continuous tea, beverages, freshly baked snacks & desserts served between lunch and dinner.
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 bg-white border border-[#E5E1D8] shadow-sm">
              <h3 className="font-heading font-light text-2xl text-[#1A1A1A] mb-2">
                Send a Message to Front Desk
              </h3>
              <p className="text-xs sm:text-sm text-[#666] mb-8 font-body">
                Inquire about custom tour packages, catering, special celebrations, or dietary requests. We respond promptly within business hours.
              </p>

              {isSubmitted ? (
                <div className="p-8 bg-[#FAF9F6] border border-[#E5E1D8] text-center space-y-3 animate-in fade-in">
                  <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-normal text-xl text-[#1A1A1A]">Message Received</h4>
                  <p className="text-xs sm:text-sm text-[#555] font-body">
                    Thank you. Our restaurant hospitality manager will contact you promptly via phone or WhatsApp.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8B0000]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Meera Kapoor"
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. meera@example.com"
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                        Inquiry Topic
                      </label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                      >
                        <option value="Table Booking Inquiry">Table Booking Inquiry</option>
                        <option value="Tour Group / Travel Agency Booking">Tour Group / Travel Agency Booking</option>
                        <option value="Wheelchair / Accessibility Assistance">Wheelchair / Accessibility Assistance</option>
                        <option value="Private Hall / Banquet Celebration">Private Hall / Banquet Celebration</option>
                        <option value="Dietary / Halal / Jain Questions">Dietary / Halal / Jain Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Your Message or Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Please let us know how many guests, date, dietary requirements, or any questions..."
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm placeholder-[#999] focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-semibold text-xs uppercase tracking-widest shadow-sm flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
