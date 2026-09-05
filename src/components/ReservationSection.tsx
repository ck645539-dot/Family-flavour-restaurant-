import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  Users, 
  Utensils, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake, 
  AlertCircle,
  Download,
  Calendar as CalendarIcon,
  MessageCircle,
  X,
  Search,
  Baby,
  Accessibility
} from 'lucide-react';
import { SeatingArea, OccasionType, Reservation, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  preOrderItems: { [itemId: string]: number };
  allItems: MenuItem[];
  onOpenPreOrder: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  preOrderItems,
  allItems,
  onOpenPreOrder
}) => {
  // Form state
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('07:30 PM');
  const [guestsCount, setGuestsCount] = useState(4);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('royal-hall');
  const [occasion, setOccasion] = useState<OccasionType>('family-dinner');
  const [specialRequests, setSpecialRequests] = useState('');
  const [babyChairRequested, setBabyChairRequested] = useState(false);
  const [wheelchairAccessRequested, setWheelchairAccessRequested] = useState(false);

  // Status & modal states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [lookupCode, setLookupCode] = useState('');
  const [lookupResult, setLookupResult] = useState<Reservation | null | 'not-found'>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>('book');

  // Lunch & Dinner time slots
  const lunchSlots = ['11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
  const dinnerSlots = ['06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM'];

  // Pre-ordered items breakdown
  const attachedPreOrders = (Object.entries(preOrderItems) as [string, number][])
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = allItems.find(i => i.id === id);
      return item ? { itemId: id, name: item.name, quantity: qty, priceINR: item.priceINR } : null;
    })
    .filter((entry): entry is { itemId: string; name: string; quantity: number; priceINR: number } => entry !== null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) {
      alert('Please fill in your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const code = `FFR-${randomDigits}`;
      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        bookingCode: code,
        guestName,
        phone,
        email: email || 'walkin@familyflavour.com',
        date,
        timeSlot,
        guestsCount,
        seatingArea,
        occasion,
        specialRequests,
        babyChairRequested,
        wheelchairAccessRequested,
        preOrderedItems: attachedPreOrders,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };

      // Save to localStorage for persistent recall
      try {
        const stored = JSON.parse(localStorage.getItem('family_flavour_reservations') || '[]');
        stored.push(newReservation);
        localStorage.setItem('family_flavour_reservations', JSON.stringify(stored));
      } catch (err) {
        console.error('Could not save reservation locally', err);
      }

      setConfirmedReservation(newReservation);
      setIsSubmitting(false);
    }, 600);
  };

  const handleLookup = () => {
    if (!lookupCode.trim()) return;
    try {
      const stored: Reservation[] = JSON.parse(localStorage.getItem('family_flavour_reservations') || '[]');
      const found = stored.find(r => r.bookingCode.toUpperCase() === lookupCode.trim().toUpperCase());
      if (found) {
        setLookupResult(found);
      } else {
        setLookupResult('not-found');
      }
    } catch {
      setLookupResult('not-found');
    }
  };

  const handleCancelBooking = (bookingCode: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const stored: Reservation[] = JSON.parse(localStorage.getItem('family_flavour_reservations') || '[]');
      const updated = stored.map(r => r.bookingCode === bookingCode ? { ...r, status: 'cancelled' as const } : r);
      localStorage.setItem('family_flavour_reservations', JSON.stringify(updated));
      if (lookupResult && typeof lookupResult === 'object') {
        setLookupResult({ ...lookupResult, status: 'cancelled' });
      }
      alert('Reservation has been cancelled successfully.');
    } catch (e) {
      console.error(e);
    }
  };

  const generateGoogleCalendarUrl = (res: Reservation) => {
    const title = encodeURIComponent(`Table Reservation at Family Flavour Restaurant Agra (${res.bookingCode})`);
    const details = encodeURIComponent(`Reservation for ${res.guestsCount} guests in ${res.seatingArea}.\nSpecial Requests: ${res.specialRequests || 'None'}\nPhone: ${RESTAURANT_INFO.phones[0].number}`);
    const location = encodeURIComponent(RESTAURANT_INFO.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const generateWhatsAppConfirmation = (res: Reservation) => {
    const text = `Hello Family Flavour Restaurant! I have booked a table:\n*Booking Code:* ${res.bookingCode}\n*Name:* ${res.guestName}\n*Guests:* ${res.guestsCount}\n*Date:* ${res.date} at ${res.timeSlot}\n*Seating:* ${res.seatingArea}\n*Contact:* ${res.phone}`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservation" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Direct Reservations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            Reserve Your <span className="italic font-serif-display text-[#8B0000]">Dining Table</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base leading-relaxed">
            Whether for an intimate dinner after the Taj Mahal sunset or an extended family reunion, book your table in advance with zero booking fee and guaranteed priority seating.
          </p>

          {/* Toggle between New Booking & Lookup */}
          <div className="inline-flex p-1 bg-white border border-[#E5E1D8] mt-6 shadow-sm">
            <button
              onClick={() => { setActiveTab('book'); setLookupResult(null); }}
              className={`px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'book'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              New Reservation
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'lookup'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              Find Existing Booking
            </button>
          </div>
        </div>

        {/* TAB 1: NEW RESERVATION FORM */}
        {activeTab === 'book' && (
          <div className="bg-white border border-[#E5E1D8] p-6 sm:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Step 1: Date & Time */}
              <div>
                <h3 className="font-heading text-xl font-normal text-[#1A1A1A] mb-5 flex items-center space-x-2.5">
                  <span className="w-6 h-6 bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Select Date, Time Slot & Party Size</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  {/* Guests Counter */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Number of Guests
                    </label>
                    <div className="flex items-center justify-between px-4 py-2 bg-[#FAF9F6] border border-[#E5E1D8]">
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="w-8 h-8 bg-white hover:bg-[#E5E1D8] text-[#1A1A1A] font-bold flex items-center justify-center border border-[#E5E1D8]"
                      >
                        -
                      </button>
                      <div className="text-center">
                        <span className="text-base font-bold text-[#1A1A1A]">{guestsCount}</span>
                        <span className="text-xs text-[#777] ml-1.5">{guestsCount === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.min(30, guestsCount + 1))}
                        className="w-8 h-8 bg-white hover:bg-[#E5E1D8] text-[#1A1A1A] font-bold flex items-center justify-center border border-[#E5E1D8]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Dining Occasion */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value as OccasionType)}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                    >
                      <option value="family-dinner">Family Dinner</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="tourist-group">Tourist / Sightseeing Group</option>
                      <option value="business-meeting">Business Lunch</option>
                      <option value="casual-dining">Casual Dine-in</option>
                    </select>
                  </div>
                </div>

                {/* Time Slots Selector */}
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-[#8B0000] mb-2 block uppercase tracking-wider font-body">
                      Lunch Slots (11:30 AM – 3:30 PM):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {lunchSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                            timeSlot === slot
                              ? 'bg-[#8B0000] text-white shadow-sm font-bold'
                              : 'bg-[#FAF9F6] text-[#555] border border-[#E5E1D8] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#1A1A1A] mb-2 block uppercase tracking-wider font-body">
                      Dinner Slots (6:30 PM – 10:30 PM):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dinnerSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                            timeSlot === slot
                              ? 'bg-[#8B0000] text-white shadow-sm font-bold'
                              : 'bg-[#FAF9F6] text-[#555] border border-[#E5E1D8] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {guestsCount >= 10 && (
                  <div className="mt-5 p-4 bg-[#F4F1ED] border border-[#E5E1D8] text-xs text-[#555] flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-[#8B0000] shrink-0" />
                    <span>
                      Large group of {guestsCount} guests detected. We will automatically reserve adjacent tables or our dedicated Family Hall section for your comfort.
                    </span>
                  </div>
                )}
              </div>

              {/* Step 2: Seating Area Selection */}
              <div className="pt-8 border-t border-[#E5E1D8]">
                <h3 className="font-heading text-xl font-normal text-[#1A1A1A] mb-5 flex items-center space-x-2.5">
                  <span className="w-6 h-6 bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Choose Your Preferred Seating Atmosphere</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: 'royal-hall' as SeatingArea,
                      title: 'Royal Mughal Hall',
                      desc: 'Grand AC hall with chandeliers, classical background sitar music, and spacious tables.'
                    },
                    {
                      id: 'garden-terrace' as SeatingArea,
                      title: 'Garden Courtyard',
                      desc: 'Open-air terrace with ambient fairy lights and fresh evening breeze.'
                    },
                    {
                      id: 'private-dining' as SeatingArea,
                      title: 'Private Family VIP Chamber',
                      desc: 'Quiet, secluded sound-insulated chamber ideal for special celebrations (seats 8-20).'
                    },
                    {
                      id: 'ac-family-lounge' as SeatingArea,
                      title: 'AC Family Lounge',
                      desc: 'Plush cushioned booths with easy stroller and high chair room.'
                    }
                  ].map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setSeatingArea(area.id)}
                      className={`p-5 cursor-pointer border transition-all text-left flex flex-col justify-between ${
                        seatingArea === area.id
                          ? 'bg-[#F4F1ED] border-[#8B0000] shadow-sm ring-1 ring-[#8B0000]'
                          : 'bg-white border-[#E5E1D8] hover:border-[#1A1A1A]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-heading font-semibold text-sm text-[#1A1A1A]">{area.title}</h4>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            seatingArea === area.id ? 'border-[#8B0000] bg-[#8B0000]' : 'border-[#AAA]'
                          }`}>
                            {seatingArea === area.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <p className="text-xs text-[#666] leading-relaxed font-body">{area.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Accessibility & Dietary Requests */}
              <div className="pt-8 border-t border-[#E5E1D8]">
                <h3 className="font-heading text-xl font-normal text-[#1A1A1A] mb-4 flex items-center space-x-2.5">
                  <span className="w-6 h-6 bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>Special Comfort, Accessibility & Dietary Needs</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <label className="flex items-center space-x-3 p-4 bg-[#FAF9F6] border border-[#E5E1D8] cursor-pointer hover:border-[#1A1A1A]">
                    <input
                      type="checkbox"
                      checked={babyChairRequested}
                      onChange={(e) => setBabyChairRequested(e.target.checked)}
                      className="w-4 h-4 accent-[#8B0000]"
                    />
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#333]">
                      <Baby className="w-4 h-4 text-[#8B0000]" />
                      <span>Request Toddler / Infant High Chair</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 bg-[#FAF9F6] border border-[#E5E1D8] cursor-pointer hover:border-[#1A1A1A]">
                    <input
                      type="checkbox"
                      checked={wheelchairAccessRequested}
                      onChange={(e) => setWheelchairAccessRequested(e.target.checked)}
                      className="w-4 h-4 accent-[#8B0000]"
                    />
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#333]">
                      <Accessibility className="w-4 h-4 text-[#8B0000]" />
                      <span>Step-Free Ramp & Accessible Table Assistance</span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                    Additional Dietary or Special Notes
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Mild spice preference for children, celebrate anniversary with candle, Jain food preparation..."
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm placeholder-[#999] focus:outline-none focus:border-[#8B0000]"
                  />
                </div>
              </div>

              {/* Attached Pre-orders Alert if any */}
              {attachedPreOrders.length > 0 && (
                <div className="p-5 bg-[#F4F1ED] border border-[#E5E1D8] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Utensils className="w-5 h-5 text-[#8B0000]" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A]">
                        {attachedPreOrders.length} dishes attached from your pre-order list
                      </h4>
                      <p className="text-xs text-[#666]">
                        Our chef will prepare these delicacies so they are hot & fresh upon your arrival.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenPreOrder}
                    className="text-xs font-bold uppercase tracking-wider text-[#8B0000] hover:underline whitespace-nowrap"
                  >
                    View Dishes
                  </button>
                </div>
              )}

              {/* Step 4: Contact Information & Submission */}
              <div className="pt-8 border-t border-[#E5E1D8]">
                <h3 className="font-heading text-xl font-normal text-[#1A1A1A] mb-5 flex items-center space-x-2.5">
                  <span className="w-6 h-6 bg-[#1A1A1A] text-white text-xs flex items-center justify-center font-bold">4</span>
                  <span>Lead Guest Contact Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma / John Smith"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#777] mb-2 uppercase tracking-widest font-body">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm focus:outline-none focus:border-[#8B0000]"
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-xs text-[#777] max-w-md font-body leading-relaxed">
                    * Instant table confirmation. No prepayment required. We hold your table for 20 minutes past reservation time.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-9 py-4 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-semibold text-xs uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Confirming Table...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Reservation Now</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </form>
          </div>
        )}

        {/* TAB 2: FIND / LOOK UP EXISTING RESERVATION */}
        {activeTab === 'lookup' && (
          <div className="bg-white border border-[#E5E1D8] p-8 sm:p-12 shadow-sm max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-light text-[#1A1A1A] mb-2 text-center">
              Look Up Your Existing Booking
            </h3>
            <p className="text-xs sm:text-sm text-[#666] mb-8 text-center font-body">
              Enter the unique booking code provided upon confirmation (e.g. FFR-1234) to view or cancel your table.
            </p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter Booking Code (e.g. FFR-8492)..."
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] text-sm uppercase tracking-widest focus:outline-none focus:border-[#8B0000]"
              />
              <button
                onClick={handleLookup}
                className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#8B0000] text-white font-semibold text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            {lookupResult === 'not-found' && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>No reservation found with code "{lookupCode}". Please verify the code or contact front desk.</span>
              </div>
            )}

            {lookupResult && typeof lookupResult === 'object' && (
              <div className="p-6 bg-[#FAF9F6] border border-[#E5E1D8] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E1D8]">
                  <div>
                    <span className="text-xs font-mono text-[#8B0000] font-bold">{lookupResult.bookingCode}</span>
                    <h4 className="font-heading font-normal text-[#1A1A1A] text-xl">{lookupResult.guestName}</h4>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    lookupResult.status === 'confirmed' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {lookupResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-[#555]">
                  <div>
                    <span className="text-[#888] block uppercase text-[10px] tracking-wider">Date & Time:</span>
                    <strong className="text-[#1A1A1A] text-sm">{lookupResult.date} at {lookupResult.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-[#888] block uppercase text-[10px] tracking-wider">Guests:</span>
                    <strong className="text-[#1A1A1A] text-sm">{lookupResult.guestsCount} Persons</strong>
                  </div>
                  <div>
                    <span className="text-[#888] block uppercase text-[10px] tracking-wider">Seating Area:</span>
                    <strong className="text-[#1A1A1A] text-sm capitalize">{lookupResult.seatingArea.replace('-', ' ')}</strong>
                  </div>
                  <div>
                    <span className="text-[#888] block uppercase text-[10px] tracking-wider">Phone:</span>
                    <strong className="text-[#1A1A1A] text-sm">{lookupResult.phone}</strong>
                  </div>
                </div>

                {lookupResult.status === 'confirmed' && (
                  <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                    <a
                      href={generateWhatsAppConfirmation(lookupResult)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-800 hover:underline flex items-center space-x-1 font-semibold uppercase tracking-wider"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat with Front Desk</span>
                    </a>

                    <button
                      onClick={() => handleCancelBooking(lookupResult.bookingCode)}
                      className="px-3 py-1.5 bg-rose-800 text-white hover:bg-rose-900 text-xs uppercase tracking-wider font-semibold"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>

      {/* CONFIRMATION TICKET MODAL: Editorial Ticket */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E1D8] max-w-lg w-full overflow-hidden shadow-2xl">
            
            {/* Ticket Header */}
            <div className="bg-[#1A1A1A] p-7 text-center text-white relative">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white"
                aria-label="Close confirmation"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 bg-[#8B0000] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-light text-2xl tracking-tight">Table Reserved</h3>
              <p className="text-xs text-[#CCC] mt-1 font-body">
                Family Flavour Restaurant • Agra
              </p>
            </div>

            {/* Ticket Details */}
            <div className="p-7 space-y-5">
              <div className="bg-[#FAF9F6] border border-[#E5E1D8] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#888] uppercase tracking-widest block font-body">Booking Pass Code</span>
                  <span className="font-mono text-xl font-bold text-[#8B0000] tracking-wider">
                    {confirmedReservation.bookingCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#888] uppercase tracking-widest block font-body">Status</span>
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8]">
                  <span className="text-[#888] uppercase tracking-wider text-[10px] block">Lead Guest:</span>
                  <strong className="text-[#1A1A1A] text-sm">{confirmedReservation.guestName}</strong>
                </div>
                <div className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8]">
                  <span className="text-[#888] uppercase tracking-wider text-[10px] block">Party Size:</span>
                  <strong className="text-[#1A1A1A] text-sm">{confirmedReservation.guestsCount} Guests</strong>
                </div>
                <div className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8]">
                  <span className="text-[#888] uppercase tracking-wider text-[10px] block">Date:</span>
                  <strong className="text-[#1A1A1A] text-sm">{confirmedReservation.date}</strong>
                </div>
                <div className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8]">
                  <span className="text-[#888] uppercase tracking-wider text-[10px] block">Time Slot:</span>
                  <strong className="text-[#1A1A1A] text-sm">{confirmedReservation.timeSlot}</strong>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] border border-[#E5E1D8] text-xs text-[#555]">
                <span className="text-[#888] uppercase tracking-wider text-[10px] block mb-1">Seating Area:</span>
                <span className="text-[#1A1A1A] font-medium capitalize">
                  {confirmedReservation.seatingArea.replace('-', ' ')}
                </span>
                {(confirmedReservation.babyChairRequested || confirmedReservation.wheelchairAccessRequested) && (
                  <div className="mt-1 text-[#8B0000] font-semibold text-xs">
                    {confirmedReservation.babyChairRequested && '• High chair ready '}
                    {confirmedReservation.wheelchairAccessRequested && '• Wheelchair ramp reserved '}
                  </div>
                )}
              </div>

              {/* Action Buttons: Add to Calendar & WhatsApp */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={generateGoogleCalendarUrl(confirmedReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-[#8B0000] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 text-[#E5E1D8]" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href={generateWhatsAppConfirmation(confirmedReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Booking Pass to WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full py-2 text-xs uppercase tracking-widest font-semibold text-[#888] hover:text-[#1A1A1A] transition-colors"
                >
                  Print Reservation Summary
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
