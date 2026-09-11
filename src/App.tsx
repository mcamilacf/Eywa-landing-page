import React, { useState, useEffect } from 'react';
import { Plant, CartItem, KitSize } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Quiz } from './components/Quiz';
import { Catalog } from './components/Catalog';
import { PlantDetailModal } from './components/PlantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutSection } from './components/AboutSection';
import { AppSection } from './components/AppSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedPlantModal, setSelectedPlantModal] = useState<Plant | null>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll handler for menu clicks and direct links
  const scrollToTab = (tabId: string, customTargetId?: string) => {
    setActiveTab(tabId);
    
    // Update address bar hash cleanly without page reload
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tabId}`);
    }

    // Scroll to the specified target element or to the tab section directly
    const targetElementId = customTargetId || tabId;
    const element = document.getElementById(targetElementId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  // Detect direct deep links in URL on initial page load (e.g. #app, /app, #instalar-app, ?tab=app)
  useEffect(() => {
    const handleDeepLinks = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab') || searchParams.get('seccion');

      const target = hash || pathname || tabParam;

      if (['app', 'instalar-app', 'instalar', 'descargar', 'apk'].includes(target)) {
        setTimeout(() => {
          // Direct deep link with #app leads straight to download card
          scrollToTab('app', 'instalar-app');
        }, 200);
      } else if (target && ['inicio', 'sobre-eywa', 'catalogo', 'quiz'].includes(target)) {
        setTimeout(() => {
          scrollToTab(target);
        }, 200);
      }
    };

    handleDeepLinks();
    window.addEventListener('hashchange', handleDeepLinks);
    window.addEventListener('popstate', handleDeepLinks);
    return () => {
      window.removeEventListener('hashchange', handleDeepLinks);
      window.removeEventListener('popstate', handleDeepLinks);
    };
  }, []);

  // Scrollspy to move header indicator as user scrolls down the page
  useEffect(() => {
    const sections = ['inicio', 'sobre-eywa', 'catalogo', 'quiz', 'app'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180; // Offset for header detection
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (plant: Plant, size: KitSize = 'M') => {
    const price = plant[`price${size}` as keyof Plant];
    
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.plant.id === plant.id && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { plant, size, quantity: 1, price }];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (plantId: string, size: KitSize, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.plant.id === plantId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (plantId: string, size: KitSize) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.plant.id === plantId && item.size === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#3B4D30] font-sans antialiased selection:bg-[#5A6D47]/20">
      
      {/* Top Sticky Minimal Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Layout in strictly requested order:
          1. Inicio
          2. Sobre Eywa
          3. Catálogo
          4. Tu planta ideal
          5. App
      */}
      <main className="flex-1 space-y-0">
        
        {/* 1. INICIO */}
        <section id="inicio">
          <Hero
            onStartQuiz={() => scrollToTab('quiz')}
            onExploreCatalog={() => scrollToTab('catalogo')}
          />
          <Features
            onGoToQuiz={() => scrollToTab('quiz')}
            onGoToCatalog={() => scrollToTab('catalogo')}
            onGoToApp={() => scrollToTab('app')}
          />
        </section>

        {/* 2. SOBRE EYWA */}
        <section id="sobre-eywa">
          <AboutSection />
        </section>

        {/* 3. CATÁLOGO */}
        <section id="catalogo">
          <Catalog
            onSelectPlantModal={(p) => setSelectedPlantModal(p)}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* 4. TU PLANTA IDEAL (QUIZ) */}
        <section id="quiz">
          <Quiz
            onSelectPlantModal={(p) => setSelectedPlantModal(p)}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* 5. APP */}
        <section id="app">
          <AppSection />
        </section>

      </main>

      {/* Footer */}
      <Footer setActiveTab={scrollToTab} />

      {/* Modals & Drawers */}
      <PlantDetailModal
        plant={selectedPlantModal}
        onClose={() => setSelectedPlantModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

export default App;

