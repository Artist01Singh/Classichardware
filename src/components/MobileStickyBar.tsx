import React from 'react';
import { Phone, MessageSquare, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileStickyBar: React.FC = () => {
  const { business, cart, setIsCartOpen } = useStore();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#17191E] border-t border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shadow-xl h-14">
      {/* Call Button */}
      <a
        href={`tel:${business.phone}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
      >
        <Phone className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${business.whatsappNumber}?text=Hi%20Classic%20Hardware%2C%20I%20have%20an%20enquiry%20regarding%20architectural%20hardware.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Quote List Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-xs font-semibold transition-colors relative shrink-0 cursor-pointer"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Quotes</span>
        {itemCount > 0 && (
          <span className="w-4 h-4 bg-white text-slate-900 rounded-full text-[10px] font-bold flex items-center justify-center font-mono">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
};
