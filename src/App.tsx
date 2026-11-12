/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductsSection } from './components/ProductsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { ShowroomBookingSection } from './components/ShowroomBookingSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { QuoteDrawer } from './components/QuoteDrawer';
import { AdminModal } from './components/AdminModal';
import { MobileStickyBar } from './components/MobileStickyBar';

function MainWebsite() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll spy to update activeSection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'booking', 'faq', 'reviews', 'gallery', 'why-us', 'about', 'products'];
      const scrollPosition = window.scrollY + 200;

      if (window.scrollY < 300) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFC] text-[#191C21] pb-14 lg:pb-0">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Navigation */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <div id="home">
          <Hero
            onExplore={() => scrollToSection('products')}
            onBook={() => scrollToSection('booking')}
          />
        </div>

        {/* 4. Trust Section */}
        <TrustBar />

        {/* 5. Services & Products Catalog */}
        <ProductsSection />

        {/* 6. About the Business */}
        <AboutSection
          onBookConsultation={() => scrollToSection('booking')}
        />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Gallery & Showroom Lightbox */}
        <GallerySection />

        {/* 9. Customer Reviews & Google Rating */}
        <ReviewsSection />

        {/* 10. FAQ Accordion */}
        <FAQSection />

        {/* 11. Showroom Appointment Booking */}
        <ShowroomBookingSection />

        {/* 12. Location & Contact Section */}
        <ContactSection />

        {/* 13. Final CTA */}
        <FinalCTA
          onBook={() => scrollToSection('booking')}
          onExplore={() => scrollToSection('products')}
        />
      </main>

      {/* 14. Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Interactive Drawers & Overlays */}
      <QuoteDrawer />
      <AdminModal />
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainWebsite />
    </StoreProvider>
  );
}
