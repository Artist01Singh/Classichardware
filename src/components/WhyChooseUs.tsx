import React from 'react';
import { Shield, Sparkles, Scale, Wrench, Layers, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Shield,
      title: 'Precision Mechanical Reliability',
      description: 'Every mortise lock body, computerized euro cylinder, and heavy bearing hinge undergoes strict cycle testing to ensure zero jamming and long-term security.'
    },
    {
      icon: Sparkles,
      title: 'Museum-Grade Brass & PVD Finishes',
      description: 'Our handles and pulls feature advanced Physical Vapor Deposition (PVD) and electrophoretic lacquering that resist tarnishing, humidity, and coastal weather.'
    },
    {
      icon: Scale,
      title: 'Architect & Builder Trade Pricing',
      description: 'We partner directly with architects, interior decorators, and civil contractors with competitive volume brackets and flexible supply schedules.'
    },
    {
      icon: Layers,
      title: 'Comprehensive Range Under One Roof',
      description: 'From grand double-door entrance handles to soft-close kitchen telescopic channels, concealed hinges, and bathroom hardware suites.'
    },
    {
      icon: Wrench,
      title: 'Technical Specification Guidance',
      description: 'Our experienced staff helps you calculate backsets, door weights, clearance angles, and master key cylinder requirements with zero guesswork.'
    },
    {
      icon: Users,
      title: 'Showroom Touch-and-Feel Samples',
      description: 'Inspect finish samples in person or request loaner boards to present directly to your residential or commercial clients before finalizing specs.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F4F5F7] text-[#191C21] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
            The Classic Hardware Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-[#17191E] leading-tight mb-4">
            Why Discerning Builders & Designers Choose Us.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Hardware is the most frequently touched component of any building. We provide materials that feel substantial, operate smoothly, and stand the test of time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#17191E] text-[#D97706] flex items-center justify-center mb-5 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-[#17191E] mb-2.5">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
