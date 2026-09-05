import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Clock, 
  Users, 
  Plus, 
  Check, 
  Info, 
  Filter, 
  X,
  Eye,
  ShoppingBag,
  Utensils
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, DietaryType } from '../types';

interface MenuSectionProps {
  currency: 'INR' | 'USD';
  onAddToPreOrder: (item: MenuItem) => void;
  preOrderItems: { [itemId: string]: number };
  onOpenPreOrder: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  currency,
  onAddToPreOrder,
  preOrderItems,
  onOpenPreOrder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'chef-special'>('all');
  const [spiceFilter, setSpiceFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'starters', label: 'Starters & Tandoor' },
    { id: 'mains', label: 'Royal Mains' },
    { id: 'biryani', label: 'Biryani & Rice' },
    { id: 'breads', label: 'Tandoori Breads' },
    { id: 'thali', label: 'Royal Thalis' },
    { id: 'desserts', label: 'Desserts & Sweets' },
    { id: 'beverages', label: 'Beverages & Lassi' },
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false;
      if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') return false;
      if (dietaryFilter === 'chef-special' && !item.isChefSpecial) return false;
      // Spice level filter
      if (spiceFilter !== 'all' && item.spiceLevel !== spiceFilter) return false;
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchHindi = item.hindiName?.toLowerCase().includes(query) || false;
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchIngredients = item.ingredients.some(i => i.toLowerCase().includes(query));
        if (!matchName && !matchHindi && !matchDesc && !matchIngredients) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, spiceFilter, searchQuery]);

  const formatPrice = (item: MenuItem) => {
    if (currency === 'USD') {
      return `$${item.priceUSD.toFixed(2)}`;
    }
    return `₹${item.priceINR}`;
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Culinary Collection</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            Our Authentic <span className="italic font-serif-display text-[#8B0000]">Online Menu</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every dish is prepared to order using hand-ground stone spices, traditional Dum clay pots, and live charcoal tandoor embers. Click any dish to view ingredients or add to your pre-order dining list.
          </p>
        </div>

        {/* Editorial Search & Filter Controls Bar */}
        <div className="bg-white border border-[#E5E1D8] p-5 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Butter Chicken, Dal Makhani, Biryani, Naan)..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#FAF9F6] border border-[#E5E1D8] text-[#1A1A1A] placeholder-[#888] text-xs uppercase tracking-wider font-medium focus:outline-none focus:border-[#8B0000] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#1A1A1A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === 'all' 
                    ? 'bg-[#1A1A1A] text-white shadow-sm' 
                    : 'bg-[#FAF9F6] text-[#555] border border-[#E5E1D8] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === 'veg' 
                    ? 'bg-emerald-800 text-white shadow-sm' 
                    : 'bg-[#FAF9F6] text-[#555] border border-[#E5E1D8] hover:text-emerald-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === 'non-veg' 
                    ? 'bg-[#8B0000] text-white shadow-sm' 
                    : 'bg-[#FAF9F6] text-[#555] border border-[#E5E1D8] hover:text-[#8B0000]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#8B0000]"></span>
                <span>Non-Veg (Halal)</span>
              </button>
              <button
                onClick={() => setDietaryFilter('chef-special')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === 'chef-special' 
                    ? 'bg-[#8B0000] text-white shadow-sm' 
                    : 'bg-[#FAF9F6] text-[#555] border border-[#E5E1D8] hover:text-[#8B0000]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Chef Specials</span>
              </button>
            </div>

          </div>

          {/* Spice Level Filter Pill Row */}
          <div className="flex flex-wrap items-center justify-between text-xs text-[#666] pt-3 border-t border-[#E5E1D8]">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-[#1A1A1A] flex items-center uppercase tracking-wider text-[11px]">
                <Flame className="w-3.5 h-3.5 text-[#8B0000] mr-1" />
                Spice Level:
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setSpiceFilter('all')}
                  className={`px-2.5 py-1 text-xs uppercase tracking-wider ${spiceFilter === 'all' ? 'bg-[#1A1A1A] text-white font-bold' : 'text-[#666] hover:text-[#1A1A1A]'}`}
                >
                  Any
                </button>
                <button
                  onClick={() => setSpiceFilter(1)}
                  className={`px-2.5 py-1 text-xs uppercase tracking-wider flex items-center space-x-1 ${spiceFilter === 1 ? 'bg-[#8B0000] text-white font-bold' : 'text-[#666] hover:text-[#1A1A1A]'}`}
                >
                  <span>Mild (Tourist Friendly)</span>
                </button>
                <button
                  onClick={() => setSpiceFilter(2)}
                  className={`px-2.5 py-1 text-xs uppercase tracking-wider flex items-center space-x-1 ${spiceFilter === 2 ? 'bg-[#8B0000] text-white font-bold' : 'text-[#666] hover:text-[#1A1A1A]'}`}
                >
                  <span>Medium</span>
                </button>
                <button
                  onClick={() => setSpiceFilter(3)}
                  className={`px-2.5 py-1 text-xs uppercase tracking-wider flex items-center space-x-1 ${spiceFilter === 3 ? 'bg-[#8B0000] text-white font-bold' : 'text-[#666] hover:text-[#1A1A1A]'}`}
                >
                  <span>Sizzling Hot</span>
                </button>
              </div>
            </div>

            <div className="text-[#777] mt-2 sm:mt-0 font-body text-xs">
              Showing <strong className="text-[#1A1A1A]">{filteredItems.length}</strong> items
            </div>
          </div>
        </div>

        {/* Category Navigation Pills: Editorial Style */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth border-b border-[#E5E1D8]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-white text-[#555] hover:text-[#1A1A1A] hover:bg-[#F4F1ED] border border-[#E5E1D8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid: Editorial Clean Cards */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E5E1D8] p-8">
            <Utensils className="w-10 h-10 text-[#888] mx-auto mb-3 opacity-60" />
            <h3 className="font-heading text-xl font-normal text-[#1A1A1A] mb-1">No delicacies found</h3>
            <p className="text-xs text-[#666] mb-4">Try clearing your search query or selecting another dietary category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSpiceFilter('all');
              }}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8B0000]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const qtyInOrder = preOrderItems[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="group bg-white border border-[#E5E1D8] hover:border-[#8B0000] overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-md"
                >
                  {/* Image Container with Editorial Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#FAF9F6]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                    {/* Veg / Non-Veg Indicator Icon */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <div className="p-1 bg-white/95 backdrop-blur-sm border border-[#E5E1D8] shadow-sm">
                        <div className={`w-3.5 h-3.5 border-2 flex items-center justify-center ${
                          item.dietary === 'veg' ? 'border-emerald-600' : 'border-[#8B0000]'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-[#8B0000]'
                          }`} />
                        </div>
                      </div>

                      {item.isChefSpecial && (
                        <span className="px-2.5 py-0.5 bg-[#8B0000] text-white text-[10px] font-bold tracking-widest uppercase shadow-sm flex items-center space-x-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Chef Special</span>
                        </span>
                      )}

                      {item.isBestSeller && !item.isChefSpecial && (
                        <span className="px-2.5 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold tracking-widest uppercase shadow-sm">
                          Signature
                        </span>
                      )}
                    </div>

                    {/* Spice flames */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-[#E5E1D8] px-2 py-0.5 flex items-center space-x-0.5 text-xs text-[#8B0000]" title={`Spice level: ${item.spiceLevel} of 3`}>
                      {Array.from({ length: item.spiceLevel }).map((_, idx) => (
                        <Flame key={idx} className="w-3 h-3 text-[#8B0000] fill-[#8B0000]" />
                      ))}
                    </div>

                    {/* Quick View Button on Image */}
                    <button
                      onClick={() => setActiveItemModal(item)}
                      className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] transition-colors border border-[#E5E1D8] shadow-sm"
                      title="Inspect dish ingredients"
                      aria-label={`View details for ${item.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Subcategory & Hindi Name */}
                      <div className="flex items-center justify-between text-[11px] text-[#777] mb-1.5">
                        <span className="uppercase tracking-[0.2em] font-bold text-[#8B0000]">{item.subCategory}</span>
                        {item.hindiName && (
                          <span className="font-serif-display italic text-xs text-[#888]">{item.hindiName}</span>
                        )}
                      </div>

                      {/* Dish Title */}
                      <h3 className="font-heading text-xl font-normal text-[#1A1A1A] mb-2 group-hover:text-[#8B0000] transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-xs text-[#666] line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Portion, prep time, price and order CTA */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#777] py-2.5 border-y border-[#E5E1D8] mb-4">
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1 text-[#8B0000]" />
                          {item.portion}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-[#8B0000]" />
                          {item.preparationTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#888]">Price</div>
                          <div className="text-xl font-normal font-heading text-[#1A1A1A]">
                            {formatPrice(item)}
                          </div>
                        </div>

                        {/* Add to Pre-order button */}
                        <button
                          onClick={() => onAddToPreOrder(item)}
                          className={`flex items-center space-x-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                            qtyInOrder > 0
                              ? 'bg-emerald-800 text-white shadow-sm'
                              : 'bg-[#1A1A1A] hover:bg-[#8B0000] text-white shadow-sm'
                          }`}
                          aria-label={`Add ${item.name} to dining pre-order list`}
                        >
                          {qtyInOrder > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added ({qtyInOrder})</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Pre-Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Editorial Bottom Banner */}
        <div className="mt-14 bg-[#F4F1ED] border border-[#E5E1D8] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-2xl font-light text-[#1A1A1A]">
              Visiting with Family or in an Extended Tour Group?
            </h3>
            <p className="text-xs sm:text-sm text-[#666] max-w-2xl font-body leading-relaxed">
              We specialize in royal multi-course family dining feasts, private VIP chamber arrangements, and customized spice levels tailored for international palates.
            </p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenPreOrder}
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#8B0000] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center space-x-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Review Pre-Order List</span>
            </button>
          </div>
        </div>

      </div>

      {/* Dish Detailed Inspection Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-[#E5E1D8] max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="relative h-64 w-full bg-[#FAF9F6]">
              <img
                src={activeItemModal.image}
                alt={activeItemModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveItemModal(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8B0000] border border-[#E5E1D8]">
                {activeItemModal.subCategory}
              </div>
            </div>

            <div className="p-7 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-normal text-[#1A1A1A]">
                    {activeItemModal.name}
                  </h3>
                  {activeItemModal.hindiName && (
                    <p className="text-sm font-serif-display italic text-[#8B0000]">{activeItemModal.hindiName}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-normal font-heading text-[#1A1A1A]">
                    {formatPrice(activeItemModal)}
                  </div>
                  <div className="text-xs text-[#777]">{activeItemModal.portion}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#555] leading-relaxed font-body">
                {activeItemModal.description}
              </p>

              {/* Key Ingredients */}
              <div>
                <h4 className="text-[10px] uppercase font-bold text-[#888] tracking-widest mb-2 font-body">
                  Handcrafted Ingredients:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeItemModal.ingredients.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#FAF9F6] border border-[#E5E1D8] text-xs text-[#444]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergens & Dietary note */}
              {activeItemModal.allergens && activeItemModal.allergens.length > 0 && (
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E1D8] text-xs text-[#666] flex items-center space-x-2">
                  <Info className="w-4 h-4 text-[#8B0000] shrink-0" />
                  <span>
                    Contains <strong>{activeItemModal.allergens.join(', ')}</strong>. Kitchen is 100% Halal certified.
                  </span>
                </div>
              )}

              <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                <span className="text-xs text-[#777] font-body">
                  Prep time: ~{activeItemModal.preparationTime}
                </span>
                <button
                  onClick={() => {
                    onAddToPreOrder(activeItemModal);
                    setActiveItemModal(null);
                  }}
                  className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#8B0000] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
                >
                  Add to Pre-Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
