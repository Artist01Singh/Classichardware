import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';

export const QuoteDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity, clearCart, business, submitEnquiry } = useStore();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isCartOpen) return null;

  const totalEstimated = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const formatWhatsAppMessage = () => {
    let msg = `*New Quote Request - Classic Hardware*\n`;
    if (customerName) msg += `Name: ${customerName}\n`;
    if (customerPhone) msg += `Phone: ${customerPhone}\n`;
    msg += `\n*Selected Products:*\n`;

    cart.forEach((item, index) => {
      msg += `${index + 1}. ${item.product.name}\n`;
      msg += `   Finish: ${item.finish || 'Standard'} | Qty: ${item.quantity} | Est. Rate: ₹${item.product.price}\n`;
    });

    msg += `\n*Total Estimated:* ₹${totalEstimated.toLocaleString('en-IN')}\n`;
    msg += `\nPlease provide availability and formal project discount.`;

    return encodeURIComponent(msg);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || cart.length === 0) return;

    submitEnquiry({
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      subject: `Quote Request for ${cart.length} Hardware Items`,
      message: `Customer requested formal quote for: ${cart.map(c => `${c.product.name} (Qty: ${c.quantity}, Finish: ${c.finish})`).join('; ')}. Estimated Total: ₹${totalEstimated}`,
      items: cart.map(c => ({ id: c.product.id, name: c.product.name, quantity: c.quantity }))
    });

    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D97706]" />
            <h3 className="font-bold font-display text-base text-slate-900">
              Project Quotation List
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Close quote drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1">Your Quote List is Empty</h4>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              Browse our architectural handles, mortise locks, and kitchen channels to add items for project estimation.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-5 py-2.5 bg-[#17191E] text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        ) : submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Quotation Request Sent!</h4>
            <p className="text-xs text-slate-600 max-w-sm mb-4">
              We received your product list. Our sales desk will prepare the formal discounted estimate and contact you at {customerPhone}.
            </p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.finish}`}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 items-center"
                >
                  <SafeImage
                    src={item.product.image}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h5>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Finish: <span className="font-medium text-slate-700">{item.finish || 'Standard'}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#17191E] mt-1">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold px-1.5 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-slate-500 hover:text-rose-600 transition-colors underline"
                >
                  Clear all items
                </button>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">Estimated Total</div>
                  <div className="text-base font-bold font-mono text-slate-900">
                    ₹{totalEstimated.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Form Footer */}
            <div className="p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#D97706]"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={`https://wa.me/${business.whatsappNumber}?text=${formatWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send on WhatsApp
                </a>

                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="flex-1 py-2.5 px-3 bg-[#17191E] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#D97706]" />
                  Submit Request
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
