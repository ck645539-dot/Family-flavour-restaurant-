import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ShoppingBag, 
  Clock, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  preOrderCount: number;
  onOpenPreOrder: () => void;
  onOpenReservationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currency,
  onToggleCurrency,
  preOrderCount,
  onOpenPreOrder,
  onOpenReservationModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if restaurant is currently open (11:30 AM to 11:30 PM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      const openTime = 11 * 60 + 30; // 11:30 AM
      const closeTime = 23 * 60 + 30; // 11:30 PM
      setIsCurrentlyOpen(timeInMinutes >= openTime && timeInMinutes <= closeTime);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Our Menu' },
    { id: 'reservation', label: 'Reservations' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Map & Location' },
    { id: 'about', label: 'Our Heritage' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro-bar: Editorial crisp strip */}
      <div className="bg-[#F4F1ED] text-[#666666] text-xs border-b border-[#E5E1D8] py-1.5 px-4 hidden md:block font-body">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <span className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isCurrentlyOpen ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
              <span className="font-semibold text-[#1A1A1A]">{isCurrentlyOpen ? 'Open Today' : 'Opening at 11:30 AM'}</span>
              <span className="text-[#777] font-normal">({RESTAURANT_INFO.timings.lunch} & {RESTAURANT_INFO.timings.dinner})</span>
            </span>
            <span className="hidden lg:inline-flex items-center text-[#777]">
              <MapPin className="w-3.5 h-3.5 text-[#8B0000] mr-1" />
              1.2 km from Taj Mahal (East Gate VIP Road, Agra)
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <a 
              href={`tel:${RESTAURANT_INFO.phones[0].number}`}
              className="flex items-center text-[#1A1A1A] hover:text-[#8B0000] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#8B0000]" />
              <span>{RESTAURANT_INFO.phones[0].display}</span>
            </a>
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Family%20Flavour%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1" />
              WhatsApp Desk
            </a>
            <button
              onClick={onToggleCurrency}
              className="px-2.5 py-0.5 bg-white border border-[#E5E1D8] text-[10px] font-bold tracking-widest text-[#1A1A1A] hover:border-[#8B0000] transition-colors"
              title="Click to switch currency"
            >
              CURRENCY: {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-200 border-b ${
        isScrolled 
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-[#E5E1D8] py-3.5' 
          : 'bg-[#FAF9F6] border-[#E5E1D8] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Restaurant Logo & Title: Editorial Style */}
          <button 
            onClick={() => handleLinkClick('hero')}
            className="flex items-center text-left focus:outline-none group"
          >
            <div className="border-l-4 border-[#8B0000] pl-3.5 sm:pl-4 py-0.5">
              <div className="text-xl sm:text-2xl font-bold tracking-tighter font-heading text-[#1A1A1A]">
                FAMILY <span className="text-[#8B0000]">FLAVOUR</span>
              </div>
              <p className="text-[10px] font-body uppercase tracking-[0.2em] font-semibold text-[#666]">
                Agra • Mughlai & Family Dining
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links: Editorial font-sans uppercase tracking-widest */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-body text-xs uppercase tracking-widest font-semibold text-[#555]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-1 transition-colors relative ${
                    isActive 
                      ? 'text-[#8B0000] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#8B0000]' 
                      : 'hover:text-[#8B0000]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            {/* Currency switch button on mobile */}
            <button
              onClick={onToggleCurrency}
              className="lg:hidden px-2 py-1 bg-white border border-[#E5E1D8] text-xs font-bold text-[#1A1A1A]"
              title="Switch currency"
            >
              {currency === 'INR' ? '₹' : '$'}
            </button>

            {/* Pre-Order / Wishlist Tray Button */}
            <button
              onClick={onOpenPreOrder}
              className="relative p-2.5 bg-white border border-[#E5E1D8] text-[#1A1A1A] hover:border-[#8B0000] hover:text-[#8B0000] transition-all"
              aria-label="View pre-order dining list"
              title="Dining Pre-Order List"
            >
              <ShoppingBag className="w-4 h-4" />
              {preOrderCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8B0000] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {preOrderCount}
                </span>
              )}
            </button>

            {/* Primary Book Table CTA: Editorial solid black button */}
            <button
              onClick={() => onNavigate('reservation')}
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 bg-[#1A1A1A] text-white hover:bg-[#8B0000] text-xs uppercase tracking-widest font-body font-semibold transition-all shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-white border border-[#E5E1D8] text-[#1A1A1A] hover:text-[#8B0000]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F6] border-t border-[#E5E1D8] px-5 pt-4 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8] text-xs text-[#666]">
              <span className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${isCurrentlyOpen ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                <span className="text-[#1A1A1A] font-semibold">{isCurrentlyOpen ? 'Open Now 11:30 AM - 11:30 PM' : 'Opens 11:30 AM'}</span>
              </span>
              <span className="text-[#8B0000] font-semibold">1.2 km from Taj</span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                    activeSection === link.id
                      ? 'bg-white text-[#8B0000] border-l-2 border-[#8B0000]'
                      : 'text-[#444] hover:text-[#8B0000]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5E1D8] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('reservation');
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-semibold text-xs uppercase tracking-widest shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Reserve Table Online</span>
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${RESTAURANT_INFO.phones[0].number}`}
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-white border border-[#E5E1D8] text-xs font-medium text-[#1A1A1A] hover:border-[#8B0000]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Family%20Flavour%20Restaurant`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
