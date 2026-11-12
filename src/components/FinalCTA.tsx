import React from 'react';
import { ArrowRight, Phone, MessageSquare, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FinalCTAProps {
  onBook: () => void;
  onExplore: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBook, onExplore }) => {
  const { business } = useStore();

  return (
    <section className="py-20 bg-[#111317] text-white relative overflow-hidden">
      {/* Decorative architectural background circle */}
      <div 
        className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#D97706]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-3">
          Elevate Your Architectural Vision
        </div>
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-white leading-tight mb-6"
          style={{ textWrap: 'balance' }}
        >
          Equip Your Project with Authentic Craftsmanship & Security.
        </h2>
        <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Visit our showroom to handle sample boards in person, or get a verified trade quotation sent directly to your WhatsApp or inbox.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onBook}
            className="px-7 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer whitespace-nowrap"
          >
            Book Showroom Consultation
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${business.phone}`}
            className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-slate-700 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#D97706]" />
            Call {business.phone}
          </a>

          <a
            href={`https://wa.me/${business.whatsappNumber}?text=Hi%20Classic%20Hardware%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Open in Google Maps</span>
          </a>
          <span aria-hidden="true">·</span>
          <span>Open 7 Days a Week</span>
        </div>
      </div>
    </section>
  );
};
