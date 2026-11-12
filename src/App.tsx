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
import { HomeFeaturedShowcase } from './components/HomeFeaturedShowcase';
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
  const [catalogCategory, setCatalogCategory] = useState<string>('all');

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

  const handleSelectHomeCategory = (categoryKey: string) => {
    setCatalogCategory(categoryKey);
    scrollToSection('products');
  };

  // Scroll spy to update activeSection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'booking', 'faq', 'reviews', 'gallery', 'why-us', 'about', 'products'];
      const scrollPosition = window.scrollY + 200;

      if (window.scrollY < 450) {
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
        {/* 3. Home Page Experience: Hero + Trust Strip + Featured Collections */}
        <div id="home">
          <Hero
            onExplore={() => scrollToSection('products')}
            onBook={() => scrollToSection('booking')}
          />
          <TrustBar />
          <HomeFeaturedShowcase
            onSelectCategory={handleSelectHomeCategory}
            onBook={() => scrollToSection('booking')}
          />
        </div>

        {/* 4. Services & Products Catalog */}
        <ProductsSection externalCategory={catalogCategory} />

        {/* 5. About the Business */}
        <AboutSection
          onBookConsultation={() => scrollToSection('booking')}
        />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Gallery & Showroom Lightbox */}
        <GallerySection />

        {/* 8. Customer Reviews & Google Rating */}
        <ReviewsSection />

        {/* 9. FAQ Accordion */}
        <FAQSection />

        {/* 10. Showroom Appointment Booking */}
        <ShowroomBookingSection />

        {/* 11. Location & Contact Section */}
        <ContactSection />

        {/* 12. Final CTA */}
        <FinalCTA
          onBook={() => scrollToSection('booking')}
          onExplore={() => scrollToSection('products')}
        />
      </main>

      {/* 13. Footer */}
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
