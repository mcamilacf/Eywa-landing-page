import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { EywaLogo } from './EywaLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-eywa', label: 'Sobre Eywa' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'quiz', label: 'Tu planta ideal' },
    { id: 'app', label: 'App' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F7F2]/90 backdrop-blur-md border-b border-[#E5EBE6]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Eywa Official Logo */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="focus:outline-none hover:opacity-85 transition-opacity"
        >
          <EywaLogo variant="horizontal" size="md" />
        </button>

        {/* Desktop Navigation Links with Animated Moving Indicator Bar */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 relative">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 text-xs font-sans font-medium uppercase tracking-widest transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-[#3B4D30] font-bold'
                    : 'text-[#3B4D30]/60 hover:text-[#3B4D30] hover:bg-[#E5EBE6]/50'
                }`}
              >
                <span>{item.label}</span>
                {/* Active Indicator Line in Light Moss Green */}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#767f64] rounded-full animate-fadeIn transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Minimal Cart Icon & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Cart: ShoppingCart ICON ONLY as explicitly requested */}
          <button
            onClick={onOpenCart}
            aria-label={`Ver mi carrito (${cartCount} productos)`}
            className="relative p-2.5 rounded-full text-[#3B4D30] hover:bg-[#E5EBE6] active:scale-95 transition-all focus:outline-none"
            title="Ver Carrito"
          >
            <ShoppingCart className="w-5 h-5 text-[#3B4D30]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#767f64] text-[#F7F7F2] text-[10px] font-bold flex items-center justify-center border-2 border-[#F7F7F2] shadow-xs animate-scaleUp">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full md:hidden text-[#3B4D30] hover:bg-[#E5EBE6] transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F7F2] border-b border-[#E5EBE6] px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-sans uppercase tracking-wider transition-colors flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#E5EBE6] text-[#3B4D30] font-bold'
                  : 'text-[#3B4D30]/80 hover:bg-[#E5EBE6]/50'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && <span className="w-2 h-2 rounded-full bg-[#767f64]" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};


