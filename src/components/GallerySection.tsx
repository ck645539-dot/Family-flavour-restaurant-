import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2 
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/restaurantData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'dishes', label: 'Signature Dishes' },
    { id: 'ambience', label: 'Royal Ambiance' },
    { id: 'kitchen', label: 'Live Tandoor & Kitchen' },
    { id: 'gatherings', label: 'Family Gatherings' }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(p => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxPhotoIndex(index);
  };

  const closeLightbox = () => {
    setLightboxPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxPhotoIndex !== null) {
      setLightboxPhotoIndex((lightboxPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxPhotoIndex !== null) {
      setLightboxPhotoIndex((lightboxPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Chronicle</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            A Glimpse into <span className="italic font-serif-display text-[#8B0000]">Our World</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience the culinary artistry of our master chefs, our royal Mughlai dining interiors, glowing tandoor pits, and heartfelt family celebrations in Agra.
          </p>
        </div>

        {/* Category Filter Pills: Editorial */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
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

        {/* Photos Grid: Editorial Frame */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group bg-white border border-[#E5E1D8] hover:border-[#8B0000] cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF9F6]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div>
                
                {/* Badge */}
                {photo.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[10px] uppercase font-bold tracking-widest text-[#8B0000] border border-[#E5E1D8]">
                    {photo.badge}
                  </span>
                )}

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 text-[#1A1A1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption on Card bottom */}
              <div className="p-5">
                <h3 className="font-heading font-normal text-lg text-[#1A1A1A] group-hover:text-[#8B0000] transition-colors mb-1">
                  {photo.title}
                </h3>
                <p className="font-body text-xs text-[#666] leading-relaxed line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhotoIndex !== null && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white text-white hover:text-black transition-colors z-50"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white text-white hover:text-black transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white text-white hover:text-black transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Current Photo Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-white border border-[#E5E1D8] overflow-hidden shadow-2xl"
          >
            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={filteredPhotos[lightboxPhotoIndex].image}
                alt={filteredPhotos[lightboxPhotoIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-white border-t border-[#E5E1D8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B0000]">
                  {filteredPhotos[lightboxPhotoIndex].badge || 'Family Flavour Gallery'}
                </span>
                <span className="text-xs text-[#888] font-mono">
                  {lightboxPhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
              <h3 className="font-heading font-normal text-2xl text-[#1A1A1A] mb-1">
                {filteredPhotos[lightboxPhotoIndex].title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#555]">
                {filteredPhotos[lightboxPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
