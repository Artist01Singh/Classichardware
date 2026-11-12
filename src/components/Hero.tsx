import React, { useState } from 'react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroProps {
  onExplore: () => void;
  onBook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onBook }) => {
  const { business } = useStore();

  const heroViews = [
    {
      id: 'showroom-interior',
      label: 'Showroom Boutique',
      sublabel: 'Physical Store & Exhibits',
      image: '/src/assets/images/showroom_interior_store_1794506590256.jpg',
      caption: 'Visit Classic Hardware showroom to explore hundreds of live architectural handles, locks, and tactile brass displays.'
    },
    {
      id: 'knurled-brass',
      label: 'Craftsmanship Detail',
      sublabel: 'Solid Brass Knurling',
      image: '/src/assets/images/hero_hardware_craftsmanship_1794507289220.jpg',
      caption: 'Precision knurled lever handle & euro cylinder in PVD brushed brass on dark travertine stone.'
    },
    {
      id: 'fluted-suite',
      label: 'Architectural Door Suite',
      sublabel: 'Fluted Walnut Entrance',
      image: '/src/assets/images/hero_luxury_architectural_brass_1794507289824.jpg',
      caption: 'Bespoke grand entrance door with matching solid brass mortise lock and designer lever handle.'
    }
  ];

  const [activeView, setActiveView] = useState(heroViews[0]);

  return (
    <section className="relative bg-[#111317] text-white overflow-hidden border-b border-slate-800">
      {/* Subtle architectural ambient background glow */}
      <div 
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#D97706]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean unboxed kicker with dot separator */}
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold mb-4">
              <span className="text-[#D97706]">Boutique Hardware Showroom</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Door & Cabinet Systems</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-display tracking-tight text-white leading-[1.12] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Mastercrafted Architectural Hardware & Precision Fittings.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8 font-light">
              Supplying residential architects, interior designers, and building contractors with solid forged brass door furniture, heavy-duty mortise locksets, and bespoke architectural hardware.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-xs sm:text-sm shadow-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Product Catalog
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${business.phone}`}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg transition-colors border border-slate-700 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#D97706]" />
                Call {business.phone}
              </a>

              <button
                onClick={onBook}
                className="px-4 py-3.5 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 underline decoration-slate-600 underline-offset-4"
              >
                Book Showroom Visit
              </button>
            </div>

            {/* Verified Trust Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Google Profile
                </div>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#D97706] transition-colors"
                >
                  <span className="font-mono tabular-nums text-[#D97706] font-bold">★ 4.9 / 5.0</span>
                  <span className="text-xs text-slate-400">({business.reviewCount}+ Verified)</span>
                </a>
              </div>

              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Material Standard
                </div>
                <div className="text-sm font-semibold text-white">
                  Solid Brass & SUS 304
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Wholesale & Trade
                </div>
                <div className="text-sm font-semibold text-white">
                  Direct B2B Project Rates
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium High-Definition Showcase Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-950 shadow-2xl group">
              {/* Main Premium Photography */}
              <div className="relative h-[420px] sm:h-[500px] lg:h-[540px] overflow-hidden bg-slate-900">
                <img
                  key={activeView.id}
                  src={activeView.image}
                  alt={activeView.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />

                {/* Measured luxury gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-black/20 to-transparent opacity-85 pointer-events-none" />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-[#17191E]/95 backdrop-blur-md text-[11px] font-semibold text-amber-400 border border-amber-500/30 flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    {activeView.sublabel}
                  </span>
                </div>

                {/* Floating Tactile Hardware Inset Preview */}
                <div className="hidden sm:flex absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl items-center gap-2.5 max-w-[210px]">
                  <img
                    src="/src/assets/images/hero_hardware_craftsmanship_1794507289220.jpg"
                    alt="Tactile Knurled Brass Detail"
                    className="w-11 h-11 rounded-lg object-cover border border-amber-500/30 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] text-amber-400 uppercase tracking-wider font-bold">Tactile Sample</div>
                    <div className="text-[11px] text-slate-200 truncate font-medium">Knurled Brass & PVD</div>
                  </div>
                </div>

                {/* Bottom Architectural Caption & Map Anchor */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-xl bg-slate-950/95 backdrop-blur-md border border-slate-800/90 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] uppercase tracking-wider text-[#D97706] font-semibold">
                          Physical Hardware Showroom
                        </span>
                        <span className="text-slate-500 text-[10px]" aria-hidden="true">·</span>
                        <span className="text-[11px] text-slate-400 font-mono">Open Mon–Sat</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-snug font-normal">
                        {activeView.caption}
                      </p>
                    </div>

                    <a
                      href={business.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white bg-[#D97706] hover:bg-[#B45309] transition-colors shrink-0 font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* View Selector Tabs underneath image */}
              <div className="bg-slate-950 border-t border-slate-800/80 p-2.5 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
                {heroViews.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view)}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-left transition-colors whitespace-nowrap cursor-pointer text-xs ${
                      activeView.id === view.id
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="font-semibold text-[11px] truncate">{view.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{view.sublabel}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
