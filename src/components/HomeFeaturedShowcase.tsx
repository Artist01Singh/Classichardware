import React from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { IMAGES } from '../assets/imageRegistry';
import { SafeImage } from './SafeImage';
import { useStore } from '../context/StoreContext';

interface HomeFeaturedShowcaseProps {
  onSelectCategory: (categoryKey: string) => void;
  onBook: () => void;
}

export const HomeFeaturedShowcase: React.FC<HomeFeaturedShowcaseProps> = ({
  onSelectCategory,
  onBook
}) => {
  const { business } = useStore();

  const collections = [
    {
      key: 'door-handles',
      title: 'Architectural Door Handles',
      subtitle: 'Solid Brass · SUS304 · PVD Finishes',
      description: 'Knurled entrance levers, concealed rosette sets, and heavy ball-bearing hinges.',
      image: IMAGES.doorHandlesMarble,
      count: '3 Series Available'
    },
    {
      key: 'locks',
      title: 'Precision Locks & Security',
      subtitle: 'Euro Mortise · Biometric Smart Locks',
      description: 'Double-throw steel mortise bodies, 6-pin brass cylinders, and fingerprint access.',
      image: IMAGES.precisionMortiseLock,
      count: '2 Security Lines'
    },
    {
      key: 'cabinet',
      title: 'Cabinet & Kitchen Hardware',
      subtitle: 'Knurled T-Bars · Soft-Close Channels',
      description: 'Solid extruded brass furniture pulls and 45kg hydraulic telescopic runners.',
      image: IMAGES.cabinetPullsKitchen,
      count: '2 Hardware Systems'
    },
    {
      key: 'sanitary',
      title: 'Bathroom & Sanitary Brassware',
      subtitle: 'Brushed Gold · Matte Black Suites',
      description: 'Moisture-proof forged brass towel bars, robe hooks, and vanity fixtures.',
      image: IMAGES.brassBathroomSuite,
      count: 'Coordinated Suites'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white text-[#191C21] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">
              <span className="text-[#D97706]">Home Overview</span>
              <span aria-hidden="true">·</span>
              <span>Curated Architectural Divisions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight">
              Explore Our Core Hardware Collections.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectCategory('all')}
              className="px-4 py-2.5 bg-[#17191E] hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              View Full Catalog
              <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
            </button>
            <button
              onClick={onBook}
              className="px-4 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Visit
            </button>
          </div>
        </div>

        {/* 4-Column Architectural Division Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <button
              key={col.key}
              onClick={() => onSelectCategory(col.key)}
              className="text-left group bg-[#FBFBFC] border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
            >
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                <SafeImage
                  src={col.image}
                  alt={col.title}
                  fallbackTitle={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
              </div>

              <div className="p-5 flex flex-col flex-1 w-full">
                <div className="text-[11px] font-medium text-slate-500 mb-1">
                  {col.subtitle}
                </div>
                <h3 className="text-base font-bold font-display text-[#17191E] group-hover:text-[#D97706] transition-colors mb-2">
                  {col.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                  {col.description}
                </p>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs w-full">
                  <span className="font-mono text-[11px] text-slate-500">{col.count}</span>
                  <span className="font-semibold text-[#17191E] group-hover:text-[#D97706] inline-flex items-center gap-1 transition-colors">
                    Browse
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Showroom Spotlight Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-[#17191E] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-700 shrink-0 hidden sm:block">
              <SafeImage
                src={IMAGES.flutedWalnutDoor}
                alt="Fluted Walnut Architectural Door Suite"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs text-[#D97706] font-semibold uppercase tracking-wider mb-0.5">
                Architect & Contractor Desk
              </div>
              <p className="text-sm font-medium text-slate-100">
                Bring your door schedules or floor plans for same-day BOQ hardware estimation & finish matching.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
              Visit Showroom
            </a>
            <a
              href={`tel:${business.phone}`}
              className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
