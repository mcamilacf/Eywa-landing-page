import React from 'react';
import { ArrowRight, Heart, Sparkles, Sprout } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#E5EBE6] text-[#3B4D30] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] border border-[#767f64]/30 max-w-full">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#767f64] shrink-0" />
              <span className="truncate">LEMA EYWA: DALE VIDA A TU HOGAR</span>
            </div>

            <h1 className="font-serif italic leading-[1.15] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3B4D30] break-words">
              Construye una relación con la naturaleza.{' '}
              <span className="not-italic text-[#767f64] block mt-1 font-serif">
                Sin miedo a cuidar tu planta.
              </span>
            </h1>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#3B4D30]/80 leading-relaxed max-w-xl">
              Eywa elimina la incertidumbre de la jardinería. Te acompañamos desde el primer momento con un quiz personalizado, un kit completo listo para sembrar y una app inteligente que guía el crecimiento de tu planta día a día.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#767f64] hover:bg-[#5A6D47] text-[#F7F7F2] font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs transition-all shadow-xs active:scale-[0.98]"
              >
                Descubre tu Planta Ideal (Quiz)
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-[#E5EBE6] text-[#3B4D30] font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs border border-[#767f64]/30 transition-colors active:scale-[0.98]"
              >
                Explora los Kits Eywa
              </button>
            </div>

            {/* Quick stats / guarantees from Eywa philosophy */}
            <div className="pt-5 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#E5EBE6]">
              <div className="space-y-0.5">
                <span className="block font-serif font-bold text-xl sm:text-2xl text-[#3B4D30]">100%</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight sm:tracking-widest text-[#5A6D47] block leading-tight">Kit listo para empezar</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif font-bold text-xl sm:text-2xl text-[#3B4D30]">Ficha</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight sm:tracking-widest text-[#5A6D47] block leading-tight">Técnica Incluida</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif font-bold text-xl sm:text-2xl text-[#3B4D30]">App Eywa</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight sm:tracking-widest text-[#5A6D47] block leading-tight">Acompañamiento 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5EBE6] bg-[#E5EBE6] shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1200"
                alt="Planta minimalista Eywa en maceta clara"
                className="w-full h-[280px] xs:h-[340px] sm:h-[420px] lg:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B4D30]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-[#F7F7F2]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E5EBE6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-xs">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#767f64]/20 flex items-center justify-center text-[#3B4D30] shrink-0">
                    <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-[#767f64]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#3B4D30] truncate">Ecosistema Completo Eywa</h4>
                    <p className="font-sans text-[10px] sm:text-xs text-[#3B4D30]/70 line-clamp-1">Maceta + Semillas + Sustrato + Herramientas</p>
                  </div>
                </div>
                <span className="self-end sm:self-auto px-2.5 py-1 rounded-full bg-[#767f64] text-[#F7F7F2] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <Heart className="w-2.5 h-2.5 fill-white" />
                  Ecológico
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

