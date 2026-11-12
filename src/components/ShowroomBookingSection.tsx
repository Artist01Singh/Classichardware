import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, User, Phone, Mail, FileText, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ShowroomBookingSection: React.FC = () => {
  const { business, bookAppointment } = useStore();

  const services = [
    {
      id: 'door-lock',
      name: 'Architectural Door & Lock Consultation',
      duration: '45 mins',
      description: 'Hands-on review of entrance door levers, euro profile mortise locksets, and digital security cylinders.'
    },
    {
      id: 'cabinet-kitchen',
      name: 'Cabinet, Kitchen & Wardrobe Hardware',
      duration: '45 mins',
      description: 'Explore knurled brass pulls, profile handles, and soft-close telescopic drawer runner mechanisms.'
    },
    {
      id: 'project-boq',
      name: 'Bulk Project BOQ & Contractor Pricing Review',
      duration: '60 mins',
      description: 'Review architectural floor plans, door schedules, and obtain wholesale trade estimates for residential/commercial projects.'
    }
  ];

  const timeSlots = [
    '10:30 AM',
    '12:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM'
  ];

  const [selectedService, setSelectedService] = useState(services[0].name);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedDate || !selectedTime) return;

    const res = bookAppointment({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      serviceType: selectedService,
      date: selectedDate,
      timeSlot: selectedTime,
      notes: notes.trim()
    });

    setBookingResult(res);

    if (res.success) {
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
    }
  };

  return (
    <section id="booking" className="py-20 bg-[#17191E] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Showroom Information */}
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
              Bespoke Showroom Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white leading-tight mb-4">
              Schedule an In-Person Hardware Consultation.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Experience the weight, tactile knurling, and silent action of our architectural fittings in person. Our specialists will guide you through door schedules, lock clearances, and matching brass finishes.
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-[#D97706] shrink-0 border border-slate-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Operating Hours</span>
                  <span>{business.openingHours.weekdays}</span>
                  <span className="block text-slate-400 mt-0.5">{business.openingHours.sunday}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-[#D97706] shrink-0 border border-slate-700">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Need Instant Assistance?</span>
                  <span>Call our showroom directly at </span>
                  <a href={`tel:${business.phone}`} className="text-[#D97706] hover:underline font-mono">
                    {business.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {bookingResult?.success ? (
              <div className="p-8 text-center animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  Showroom Consultation Confirmed
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                  {bookingResult.message} We look forward to welcoming you at Classic Hardware showroom. A copy has been saved to our scheduling calendar.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setBookingResult(null)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Book Another Slot
                  </button>
                  <a
                    href={`https://wa.me/${business.whatsappNumber}?text=Hi%20Classic%20Hardware%2C%20I%20just%20scheduled%20a%20showroom%20consultation%20for%20my%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Notify us on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {bookingResult && !bookingResult.success && (
                  <div className="p-4 bg-rose-950/50 border border-rose-800/80 text-rose-200 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{bookingResult.message}</span>
                  </div>
                )}

                {/* Service Selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    1. Select Consultation Focus:
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {services.map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() => setSelectedService(svc.name)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedService === svc.name
                            ? 'bg-slate-800 border-[#D97706] text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">{svc.name}</span>
                          <span className="text-[11px] text-[#D97706] font-mono">{svc.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{svc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date & Time Slot Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      2. Preferred Date:
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      3. Available Time Slot:
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-[#D97706]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Client Contact Details */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block">
                    4. Contact & Project Details:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number (e.g. 098...)*"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Project Name / Notes (Optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Confirm Showroom Appointment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
