import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  CalendarCheck, 
  MessageCircle, 
  Utensils, 
  ShoppingBag
} from 'lucide-react';
import { MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PreOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preOrderItems: { [itemId: string]: number };
  allItems: MenuItem[];
  onUpdateQty: (itemId: string, delta: number) => void;
  onClear: () => void;
  currency: 'INR' | 'USD';
  onAttachToReservation: () => void;
}

export const PreOrderDrawer: React.FC<PreOrderDrawerProps> = ({
  isOpen,
  onClose,
  preOrderItems,
  allItems,
  onUpdateQty,
  onClear,
  currency,
  onAttachToReservation
}) => {
  if (!isOpen) return null;

  // Filter items in cart
  const cartEntries = (Object.entries(preOrderItems) as [string, number][])
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = allItems.find(i => i.id === id);
      return { item, qty };
    })
    .filter((entry): entry is { item: MenuItem; qty: number } => entry.item !== undefined);

  const totalINR = cartEntries.reduce((sum, { item, qty }) => sum + item.priceINR * qty, 0);
  const totalUSD = cartEntries.reduce((sum, { item, qty }) => sum + item.priceUSD * qty, 0);
  const totalItemsCount = cartEntries.reduce((sum, { qty }) => sum + qty, 0);

  const handleWhatsAppShare = () => {
    const lines = cartEntries.map(e => `• ${e.item.name} x ${e.qty} (₹${e.item.priceINR * e.qty})`);
    const message = `Hello Family Flavour Restaurant,\nI am planning a visit and would like to pre-order / inquire about these dishes:\n\n${lines.join('\n')}\n\nEstimated Total: ₹${totalINR} ($${totalUSD.toFixed(2)})\nPlease confirm availability for our dining table!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E5E1D8] text-[#1A1A1A] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E5E1D8] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#8B0000] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-normal text-lg text-[#1A1A1A]">
                  Pre-Order Selection
                </h3>
                <p className="text-[11px] text-[#777] uppercase tracking-wider font-body">
                  {totalItemsCount} {totalItemsCount === 1 ? 'dish' : 'dishes'} selected for table
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#777] hover:text-[#1A1A1A] hover:bg-[#FAF9F6] transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartEntries.length === 0 ? (
              <div className="text-center py-20 text-[#888] space-y-3 font-body">
                <Utensils className="w-10 h-10 mx-auto text-[#CCC]" />
                <p className="font-medium text-sm text-[#555]">
                  Your pre-order list is currently empty.
                </p>
                <p className="text-xs text-[#777] max-w-xs mx-auto">
                  Browse the menu and click "Add to Pre-Order" on dishes you'd like ready upon your arrival.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E1D8] text-xs text-[#666] font-body">
                  <span className="uppercase tracking-wider font-semibold text-[10px]">Selected Courses</span>
                  <button
                    onClick={onClear}
                    className="text-[#8B0000] hover:text-red-800 flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cartEntries.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white border border-[#E5E1D8] flex items-center space-x-3 shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover shrink-0 border border-[#E5E1D8]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 mb-0.5">
                          <span className={`w-2 h-2 rounded-full ${item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-[#8B0000]'}`} />
                          <h4 className="font-heading font-medium text-sm text-[#1A1A1A] truncate">
                            {item.name}
                          </h4>
                        </div>
                        <div className="text-xs text-[#8B0000] font-semibold font-mono">
                          {currency === 'USD' 
                            ? `$${(item.priceUSD * qty).toFixed(2)}` 
                            : `₹${item.priceINR * qty}`}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center space-x-1.5 bg-[#FAF9F6] border border-[#E5E1D8] p-1">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#555] hover:text-[#1A1A1A] hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-[#1A1A1A] w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#555] hover:text-[#1A1A1A] hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Calculations & Actions */}
          {cartEntries.length > 0 && (
            <div className="p-5 border-t border-[#E5E1D8] bg-white space-y-4">
              <div className="space-y-1 text-sm font-body">
                <div className="flex justify-between text-[#555]">
                  <span>Estimated Total (Pre-tax)</span>
                  <span className="font-heading font-normal text-xl text-[#8B0000]">
                    {currency === 'USD' ? `$${totalUSD.toFixed(2)}` : `₹${totalINR}`}
                  </span>
                </div>
                <p className="text-[11px] text-[#777]">
                  *Payment is settled upon dine-in. Pre-ordering ensures kitchen priority and zero waiting time.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onAttachToReservation();
                  }}
                  className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-semibold text-xs uppercase tracking-widest shadow-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Attach to Table Reservation</span>
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="w-full py-3 bg-[#FAF9F6] hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Send Dishes List via WhatsApp</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
