import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactSection: React.FC = () => {
  const { business, submitEnquiry } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    submitEnquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject: subject.trim() || 'General Hardware Inquiry',
      message: message.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white text-[#191C21] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Opening Hours */}
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
              Get In Touch & Visit
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight mb-4">
              Direct Showroom & Project Enquiries.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Speak directly with our hardware experts, request technical drawings, or get instant pricing estimates for residential and commercial hardware schedules.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#17191E] text-[#D97706] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Telephone & Order Desk</div>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-base font-bold text-slate-900 hover:text-[#D97706] transition-colors font-mono tabular-nums block"
                  >
                    {business.phoneFormatted}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Click to call directly from mobile or desktop</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">WhatsApp Direct Chat</div>
                  <a
                    href={`https://wa.me/${business.whatsappNumber}?text=Hi%20Classic%20Hardware%2C%20I%20have%20an%20inquiry%20regarding%20architectural%20hardware.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-emerald-700 hover:underline inline-flex items-center gap-1.5"
                  >
                    Chat with Classic Hardware Desk
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Instant quotes, catalogs, and photo sharing</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#17191E] text-[#D97706] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Physical Location & Google Profile</div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {business.address}
                  </p>
                  <a
                    href={business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97706] hover:underline mt-1"
                  >
                    Get GPS Directions on Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#17191E] text-[#D97706] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Store Working Hours</div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    {business.openingHours.weekdays}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {business.openingHours.sunday}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form & Interactive Map Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#FBFBFC] border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold font-display text-[#17191E] mb-2">
                Send a Message or Project RFQ
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill out the form below. Our architectural sales team usually responds within 2 hours during store hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Message Received Successfully!</h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Thank you for contacting Classic Hardware. Our team will review your enquiry and reach out to {phone}.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alok Singhania"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 09800000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@architect.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Project / Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Villa Door Hardware Schedule"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Enquiry Details / Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify your required quantities, door thicknesses, preferred finishes (brass, matte black, etc.), or project location..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#17191E] hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4 text-[#D97706]" />
                    Send Enquiry to Classic Hardware
                  </button>
                </form>
              )}
            </div>

            {/* Google Maps Visual Banner Card */}
            <div className="border border-slate-200 rounded-xl p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-lg text-[#17191E] shrink-0">
                  <MapPin className="w-6 h-6 text-[#D97706]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Google Business Profile & Map</h4>
                  <p className="text-xs text-slate-500">
                    Find live route directions, traffic conditions, and photos on Google Maps.
                  </p>
                </div>
              </div>

              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 whitespace-nowrap shadow-xs"
              >
                Open Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
