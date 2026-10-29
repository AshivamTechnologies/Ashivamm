/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, useAppTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SignatureDishes } from './components/SignatureDishes';
import { Menu } from './components/Menu';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Reservations } from './components/Reservations';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BackToTop } from './components/BackToTop';
import { AIChatBot } from './components/AIChatBot';
import { CircularScrollController } from './components/CircularScrollController';

function AppContent() {
  const [prefilledRequest, setPrefilledRequest] = useState<string>('');
  const { theme } = useAppTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookEventTable = (eventTitle: string) => {
    setPrefilledRequest(`Attending Event: ${eventTitle}`);
    scrollTo('reservations');
  };

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950 transition-colors duration-500 ${
        theme === 'midnight' 
          ? 'bg-[#0f0e0c] text-stone-100' 
          : 'bg-[#faf7f2] text-stone-900'
      }`}
    >
      {/* Floating 3D Perspective Tilt Glassmorphic Navbar with Rounded Pill Shape & Theme Switcher */}
      <Navbar onOpenReservations={() => scrollTo('reservations')} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={() => scrollTo('menu')}
          onReserveTable={() => scrollTo('reservations')}
        />

        {/* 2. About Us Section */}
        <About />

        {/* 3. Signature Dishes Section */}
        <SignatureDishes />

        {/* 4. Complete Interactive Menu Section */}
        <Menu />

        {/* 5. Restaurant Events & Experiences Section */}
        <Events onBookEventTable={handleBookEventTable} />

        {/* 6. Restaurant Gallery with Lightbox */}
        <Gallery />

        {/* 7. Table Reservation Section */}
        <Reservations prefilledRequest={prefilledRequest} />

        {/* 8. Customer Testimonials Carousel */}
        <Testimonials />

        {/* 9. Contact & Interactive Location Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Shopping Bag & Checkout Drawer */}
      <CartDrawer />

      {/* Floating AI Dining Concierge Chatbot */}
      <AIChatBot />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* 3D Circular Mouse Scroll Navigation Controller */}
      <CircularScrollController />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
