import React from 'react';
import { MapPin, Phone, MessageSquare, Shield, Clock, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { business, setIsAdminOpen } = useStore();

  return (
    <footer className="bg-[#0D0F12] text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#17191E] text-[#D97706] flex items-center justify-center font-display font-bold text-lg border border-slate-800 shrink-0">
                CH
              </div>
              <span className="text-lg font-bold font-display text-white tracking-tight">
                {business.name}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Premier showroom and distributor for architectural door hardware, precision mortise locksets, luxury cabinet pulls, and builder fittings. Partnering with architects, interior designers, and contractors across residential and commercial projects.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors inline-flex items-center gap-1.5 text-[11px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                Google Business Profile
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={`https://wa.me/${business.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 transition-colors inline-flex items-center gap-1.5 text-[11px]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Desk
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Our Showroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Architectural Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Installation Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Architectural Door Handles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Euro Mortise Locks & Cylinders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cabinet & Knurled T-Bars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Soft-Close Telescopic Channels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  SUS304 Heavy Ball Hinges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Biometric Digital Locks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Hours & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contact & Hours
            </h4>
            <div className="space-y-2.5">
              <div>
                <span className="text-slate-500 block text-[11px]">Phone:</span>
                <a
                  href={`tel:${business.phone}`}
                  className="text-white hover:text-[#D97706] font-mono tabular-nums font-semibold"
                >
                  {business.phoneFormatted}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Operating Hours:</span>
                <p className="text-slate-300 text-[11px]">{business.openingHours.weekdays}</p>
                <p className="text-slate-400 text-[11px]">{business.openingHours.sunday}</p>
              </div>

              <div>
                <span className="text-slate-500 block text-[11px]">Showroom:</span>
                <p className="text-slate-400 text-[11px]">{business.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Classic Hardware. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-slate-300 transition-colors"
            >
              FAQ
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Contact Us
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-400 hover:text-[#D97706] transition-colors flex items-center gap-1 cursor-pointer"
              title="Store Owner Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
