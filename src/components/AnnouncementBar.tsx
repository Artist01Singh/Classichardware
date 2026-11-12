import React, { useState } from 'react';
import { Phone, ArrowRight, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { business } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!business.announcementActive || dismissed) return null;

  return (
    <div className="bg-[#17191E] text-slate-200 border-b border-slate-800 text-xs py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-[#D97706] font-medium tracking-wide uppercase text-[11px] shrink-0">
            Showroom Update
          </span>
          <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <p className="text-slate-300 truncate font-normal">
            {business.announcementText}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`tel:${business.phone}`}
            className="hidden md:inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#D97706]" />
            <span className="font-mono tabular-nums text-[11px]">{business.phoneFormatted}</span>
          </a>
          <a
            href={`https://wa.me/${business.whatsappNumber}?text=Hello%20Classic%20Hardware%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#D97706] hover:text-[#F59E0B] font-medium transition-colors text-[11px]"
          >
            WhatsApp Support
            <ArrowRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-slate-400 hover:text-slate-200 p-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
