import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Shield, Phone, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { business, cart, setIsCartOpen, setIsAdminOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-[#17191E] text-[#D97706] flex items-center justify-center font-display font-bold text-xl tracking-tighter border border-slate-700/50 group-hover:border-[#D97706] transition-colors shrink-0">
              CH
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#17191E] font-display whitespace-nowrap shrink-0 leading-tight">
                {business.name}
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-slate-500 whitespace-nowrap">
                Architectural Fittings
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[14px] ${
                  activeSection === item.id
                    ? 'text-[#17191E] font-semibold border-[#D97706]'
                    : 'border-transparent hover:text-[#17191E] hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + helper utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Phone Call */}
            <a
              href={`tel:${business.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Call store directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-mono tabular-nums">{business.phoneFormatted}</span>
            </a>

            {/* Quote Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-[#17191E] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="View Quote List"
              aria-label="View Quote List"
            >
              <ShoppingBag className="w-5 h-5 text-slate-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D97706] text-white rounded-full text-[11px] font-bold flex items-center justify-center font-mono tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('booking')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#17191E] hover:bg-slate-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Showroom Visit
            </button>

            {/* Admin Management Toggle */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Store Owner Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-slate-100 text-[#17191E] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#D97706]" />
              Call {business.phoneFormatted}
            </a>
            <button
              onClick={() => {
                handleNavClick('booking');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#17191E] rounded-lg text-center"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
