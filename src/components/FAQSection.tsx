import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FAQSection: React.FC = () => {
  const { faqs, business } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white text-[#191C21] border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight mb-3">
            Hardware Selection & Trade Inquiries.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Everything you need to know about our architectural specifications, warranties, trade pricing, and order fulfillment.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors bg-white hover:border-slate-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-[#17191E] cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#D97706]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Callout */}
        <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#17191E] text-[#D97706] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Have a custom architectural bill of quantities (BOQ)?</div>
              <p className="text-xs text-slate-500">Send your drawings or schedule an on-site consultation with our hardware specialists.</p>
            </div>
          </div>
          <a
            href={`tel:${business.phone}`}
            className="px-4 py-2 bg-[#17191E] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D97706]" />
            Call {business.phoneFormatted}
          </a>
        </div>
      </div>
    </section>
  );
};
