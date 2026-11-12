import React from 'react';
import { ArrowRight, Check, MapPin, Phone, Building2, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AboutSectionProps {
  onBookConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookConsultation }) => {
  const { business } = useStore();

  return (
    <section id="about" className="py-20 bg-white text-[#191C21] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image & Showroom Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg group">
              <img
                src="/src/assets/images/showroom_interior_store_1794506590256.jpg"
                alt="Classic Hardware Boutique Showroom Interior"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D97706] font-semibold block">
                      Physical Showroom & Boutique
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      Tactile display walls & architectural consultation tables
                    </p>
                  </div>
                  <a
                    href={business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#17191E] text-white rounded-lg text-xs hover:bg-slate-800 transition-colors shrink-0"
                    title="Get directions on Google Maps"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
              Our Heritage & Quality Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight mb-6">
              A Legacy of Precision Architectural Hardware.
            </h2>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed mb-8">
              <p>
                At <strong className="text-slate-900 font-semibold">Classic Hardware</strong>, we bridge the gap between structural engineering and interior refinement. We curate an extensive portfolio of high-grade architectural door handles, mechanical & digital mortise locksets, soft-close kitchen drawer channels, and solid brass bathroom fittings.
              </p>
              <p>
                Whether partnering with architects drafting bespoke luxury residences, interior designers looking for matching knurled brass finishes, or building contractors sourcing reliable bulk locksets, we provide hands-on product curation and verified material testing.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-[#D97706] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Forged Brass & SUS304</h4>
                  <p className="text-[12px] text-slate-500 mt-0.5">Heavy gauge metal that resists corrosion, sagging, and wear.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-[#D97706] shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Contractor & B2B Tiers</h4>
                  <p className="text-[12px] text-slate-500 mt-0.5">Dedicated volume billing and scheduled site consignments.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onBookConsultation}
                className="px-5 py-3 bg-[#17191E] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                Schedule an In-Store Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${business.phone}`}
                className="px-5 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                Direct Hotline: {business.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
