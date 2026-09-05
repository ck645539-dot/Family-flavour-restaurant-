import React from 'react';
import { 
  Star, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { CUSTOMER_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF9F6] text-[#1A1A1A] border-t border-[#E5E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header with ratings score */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] mb-3">
            <Star className="w-3.5 h-3.5 fill-[#8B0000] text-[#8B0000]" />
            <span>Verified Diner Feedback</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A] mb-4">
            Loved by Travelers & <span className="italic font-serif-display text-[#8B0000]">Local Families</span>
          </h2>
          <p className="font-body text-[#555] text-sm sm:text-base mb-6 leading-relaxed">
            Rated <strong className="text-[#1A1A1A]">{RESTAURANT_INFO.ratings.googleRating} out of 5</strong> across more than {RESTAURANT_INFO.ratings.googleReviewCount.toLocaleString()} verified diner reviews on Google Maps.
          </p>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-[#E5E1D8] shadow-sm">
              <span className="text-[#8B0000] font-bold uppercase tracking-wider text-[11px]">Google Reviews:</span>
              <span className="text-[#1A1A1A] font-semibold">4.9 ★★★★★</span>
              <span className="text-[#777]">({RESTAURANT_INFO.ratings.googleReviewCount}+)</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-white border border-[#E5E1D8] shadow-sm">
              <span className="text-[#1A1A1A] font-bold uppercase tracking-wider text-[11px]">Tripadvisor:</span>
              <span className="text-[#8B0000] font-semibold">Travelers' Choice 2026</span>
            </div>
          </div>
        </div>

        {/* Review Cards Grid: Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-7 bg-white border border-[#E5E1D8] hover:border-[#8B0000] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Top: Star rating & Source */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-[#8B0000]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#8B0000] text-[#8B0000]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#888] uppercase tracking-widest font-body">
                    {review.source}
                  </span>
                </div>

                {/* Review Text: Serif Italics */}
                <p className="font-serif-display text-sm sm:text-base text-[#2A2A2A] leading-relaxed italic mb-6">
                  "{review.text}"
                </p>

                {/* Recommended Dish Tag */}
                {review.highlightDish && (
                  <div className="mb-4 text-xs text-[#8B0000] font-medium bg-[#FAF9F6] p-2.5 border border-[#E5E1D8]">
                    Favorite: <strong className="text-[#1A1A1A]">{review.highlightDish}</strong>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-[#E5E1D8]">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E1D8]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-semibold text-sm text-[#1A1A1A] flex items-center space-x-1 font-body">
                    <span>{review.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  </h4>
                  <p className="text-[11px] text-[#777] font-body">{review.location}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Call to review on Google */}
        <div className="text-center">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-[#8B0000] hover:text-[#1A1A1A] transition-colors"
          >
            <span>Read all 2,840+ verified diner reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
