import React, { useState } from 'react';
import { Mail, ArrowRight, Heart } from 'lucide-react';
import { EywaLogo } from './EywaLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#3B4D30] text-[#F7F7F2] pt-16 pb-12 border-t border-[#5A6D47]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E5EBE6]/20">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <EywaLogo variant="light" size="lg" />

            <p className="font-sans text-xs sm:text-sm text-[#E5EBE6]/80 max-w-sm leading-relaxed">
              Dale vida a tu hogar. Kits de autocultivo ecológicos con todo incluido, fichas técnicas completas y la app Eywa de acompañamiento digital paso a paso.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <h4 className="font-bold text-[#F7F7F2] uppercase text-[10px] tracking-[0.2em]">
              Navegación
            </h4>
            <ul className="space-y-2 text-[#E5EBE6]/80">
              <li>
                <button onClick={() => setActiveTab('inicio')} className="hover:text-white transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sobre-eywa')} className="hover:text-white transition-colors">
                  Sobre Eywa
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalogo')} className="hover:text-white transition-colors">
                  Catálogo
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-white transition-colors">
                  Tu planta ideal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('app')} className="hover:text-white transition-colors">
                  App
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <h4 className="font-bold text-[#F7F7F2] uppercase text-[10px] tracking-[0.2em]">
              Boletín Botánico
            </h4>
            <p className="font-sans text-xs text-[#E5EBE6]/80">
              Recibe guías mensuales de siembra, trucos de cuidado y ofertas exclusivas de temporada.
            </p>

            {subscribed ? (
              <p className="text-xs text-[#E5EBE6] font-semibold bg-[#5A6D47]/40 p-3 rounded-xl border border-[#5A6D47]">
                ¡Gracias por suscribirte! Te hemos enviado una guía de cultivo de regalo.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-[#E5EBE6]/20 text-xs text-[#F7F7F2] placeholder:text-[#E5EBE6]/60 focus:outline-none focus:ring-1 focus:ring-[#5A6D47]"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse al boletín"
                  className="px-4 py-2.5 bg-[#5A6D47] hover:bg-[#6B7C59] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5EBE6]/70 font-sans gap-4">
          <p>© {new Date().getFullYear()} Eywa - Dale vida a tu hogar. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Cultivado con <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" /> para amantes de las plantas.
          </p>
        </div>

      </div>
    </footer>
  );
};

