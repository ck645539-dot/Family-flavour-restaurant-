import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { MapAndLocationSection } from './components/MapAndLocationSection';
import { AccessibilitySection } from './components/AccessibilitySection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PreOrderDrawer } from './components/PreOrderDrawer';
import { MENU_ITEMS, RESTAURANT_INFO } from './data/restaurantData';
import { MenuItem } from './types';
import { CalendarCheck, Phone, Navigation, Utensils, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [preOrderItems, setPreOrderItems] = useState<{ [itemId: string]: number }>({});
  const [isPreOrderDrawerOpen, setIsPreOrderDrawerOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleCurrency = () => {
    setCurrency(prev => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const handleAddToPreOrder = (item: MenuItem) => {
    setPreOrderItems(prev => {
      const current = prev[item.id] || 0;
      return { ...prev, [item.id]: current + 1 };
    });
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setPreOrderItems(prev => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const handleClearPreOrder = () => {
    setPreOrderItems({});
  };

  const preOrderCount = (Object.values(preOrderItems) as number[]).reduce((sum: number, qty: number) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-body flex flex-col selection:bg-[#8B0000] selection:text-white pb-16 md:pb-0">
      
      {/* Main Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        preOrderCount={preOrderCount}
        onOpenPreOrder={() => setIsPreOrderDrawerOpen(true)}
        onOpenReservationModal={() => handleNavigate('reservation')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* Online Menu Section */}
        <MenuSection
          currency={currency}
          onAddToPreOrder={handleAddToPreOrder}
          preOrderItems={preOrderItems}
          onOpenPreOrder={() => setIsPreOrderDrawerOpen(true)}
        />

        {/* Table Reservation Engine */}
        <ReservationSection
          preOrderItems={preOrderItems}
          allItems={MENU_ITEMS}
          onOpenPreOrder={() => setIsPreOrderDrawerOpen(true)}
        />

        {/* Photo Gallery Section */}
        <GallerySection />

        {/* Google Map & Directions Section */}
        <MapAndLocationSection />

        {/* Accessibility & Comfort */}
        <AccessibilitySection />

        {/* Heritage Story & About Us */}
        <AboutSection />

        {/* Customer Reviews & Testimonials */}
        <TestimonialsSection />

        {/* Contact & Inquiry Desk */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Pre-Order / Wishlist Drawer */}
      <PreOrderDrawer
        isOpen={isPreOrderDrawerOpen}
        onClose={() => setIsPreOrderDrawerOpen(false)}
        preOrderItems={preOrderItems}
        allItems={MENU_ITEMS}
        onUpdateQty={handleUpdateQty}
        onClear={handleClearPreOrder}
        currency={currency}
        onAttachToReservation={() => handleNavigate('reservation')}
      />

      {/* Mobile Sticky Quick Action Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E1D8] p-2 flex items-center justify-around md:hidden shadow-lg">
        <button
          onClick={() => handleNavigate('menu')}
          className="flex flex-col items-center justify-center p-1.5 text-xs text-[#666] hover:text-[#8B0000]"
        >
          <Utensils className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Menu</span>
        </button>

        <button
          onClick={() => handleNavigate('reservation')}
          className="flex flex-col items-center justify-center px-4 py-1.5 bg-[#8B0000] text-white font-semibold text-xs shadow-sm"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-widest">Book Table</span>
        </button>

        <button
          onClick={() => handleNavigate('location')}
          className="flex flex-col items-center justify-center p-1.5 text-xs text-[#666] hover:text-[#8B0000]"
        >
          <Navigation className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Map</span>
        </button>

        <a
          href={`tel:${RESTAURANT_INFO.phones[0].number}`}
          className="flex flex-col items-center justify-center p-1.5 text-xs text-[#666] hover:text-[#8B0000]"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Call</span>
        </a>

        {preOrderCount > 0 && (
          <button
            onClick={() => setIsPreOrderDrawerOpen(true)}
            className="relative flex flex-col items-center justify-center p-1.5 text-xs text-[#8B0000]"
          >
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Order</span>
            <span className="absolute top-0.5 right-1 w-4 h-4 bg-[#8B0000] text-white text-[10px] font-bold flex items-center justify-center">
              {preOrderCount}
            </span>
          </button>
        )}
      </div>

    </div>
  );
}
