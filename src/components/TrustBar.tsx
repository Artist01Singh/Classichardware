import React from 'react';
import { ShieldCheck, Truck, Clock, MapPin, ExternalLink, PhoneCall } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustBar: React.FC = () => {
  const { business } = useStore();

  return (
    <div className="bg-[#17191E] text-slate-300 border-b border-slate-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {/* Trust 1: Verified Google Business */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-[#D97706] shrink-0 border border-slate-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Verified Location</div>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white hover:text-[#D97706] transition-colors inline-flex items-center gap-1"
              >
                Google Business
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <div className="text-xs text-slate-400 mt-0.5">
                ★ <span className="font-mono tabular-nums text-white font-medium">{business.googleRating}</span> ({business.reviewCount} Reviews)
              </div>
            </div>
          </div>

          {/* Trust 2: Direct Contact */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-[#D97706] shrink-0 border border-slate-700">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Direct Telephone</div>
              <a
                href={`tel:${business.phone}`}
                className="text-sm font-semibold text-white hover:text-[#D97706] transition-colors font-mono tabular-nums block"
              >
                {business.phoneFormatted}
              </a>
              <div className="text-xs text-slate-400 mt-0.5">Instant WhatsApp Quotes</div>
            </div>
          </div>

          {/* Trust 3: Authentic Materials */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-[#D97706] shrink-0 border border-slate-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Grade Guarantee</div>
              <div className="text-sm font-semibold text-white">Solid Brass & SUS 304</div>
              <div className="text-xs text-slate-400 mt-0.5">Heavy Gauge & PVD Finishes</div>
            </div>
          </div>

          {/* Trust 4: Operating Hours */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 text-[#D97706] shrink-0 border border-slate-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Store Working Hours</div>
              <div className="text-sm font-semibold text-white">Mon–Sat: 9:30 AM–8:30 PM</div>
              <div className="text-xs text-slate-400 mt-0.5">Sunday Open: 10 AM–5 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
