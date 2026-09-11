import React from 'react';
import { Sprout, HeartHandshake, Leaf, ShieldCheck, Heart } from 'lucide-react';
import { EywaLogo } from './EywaLogo';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F7F7F2] border-t border-[#E5EBE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5EBE6] shadow-xs bg-[#E5EBE6]">
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1000"
                alt="Manos cultivando planta Eywa con amor"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B4D30]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-5 bg-[#F7F7F2]/95 backdrop-blur-md rounded-2xl border border-[#E5EBE6] text-[#3B4D30] shadow-md">
                <p className="font-serif italic text-xs sm:text-sm leading-relaxed text-[#3B4D30]">
                  "Un hogar no solo está compuesto por muebles y decoración, sino también por elementos vivos que transmiten bienestar, tranquilidad y conexión."
                </p>
                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#5A6D47] mt-2">
                  — Filosofía Eywa: Dale vida a tu hogar.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#767f64]">
                IDENTIDAD Y PROPÓSITO
              </span>
            </div>

            <h2 className="font-serif italic text-3xl sm:text-5xl text-[#3B4D30]">
              Inspirados en la conexión viva de la naturaleza
            </h2>
            
            <p className="font-sans text-sm md:text-base text-[#3B4D30]/80 leading-relaxed">
              El nombre <strong className="font-serif text-[#3B4D30]">Eywa</strong> nace inspirado en la película <em>Avatar</em>, donde Eywa representa la red viva que conecta a todos los seres vivos. Compartimos ese mismo principio: las plantas no son adornos inanimados, sino compañeras vivas con las que establecemos un vínculo diario.
            </p>

            <p className="font-sans text-sm md:text-base text-[#3B4D30]/80 leading-relaxed">
              Muchas personas desean tener plantas pero sienten miedo de no saber cuidarlas, no tener tiempo o no saber cuánta agua necesitan. Eywa nace para eliminar esa incertidumbre y guiarte en cada etapa de crecimiento.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#E5EBE6] border border-[#5A6D47]/20">
                <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center shrink-0 shadow-xs">
                  <Leaf className="w-5 h-5 text-[#E5EBE6]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3B4D30]">Ecosistema Completo</h4>
                  <p className="font-sans text-xs text-[#5A6D47] mt-0.5">Quiz + Kit con todo incluido + App interactiva de seguimiento.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#E5EBE6] border border-[#5A6D47]/20">
                <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center shrink-0 shadow-xs">
                  <Heart className="w-5 h-5 text-[#E5EBE6]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3B4D30]">Acompañamiento Vivo</h4>
                  <p className="font-sans text-xs text-[#5A6D47] mt-0.5">Ficha técnica personalizada e historial de riego y cuidados.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Brand Values Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#3B4D30] text-[#F7F7F2] space-y-6 text-center border border-[#5A6D47]/40 shadow-xs">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E5EBE6]">
              VALORES DE MARCA
            </span>
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
              Naturaleza · Vida · Bienestar · Conexión · Paciencia
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#E5EBE6]/80">
              "Creemos que cuidar una planta también es aprender a cuidar nuestro entorno. Cada semilla simboliza un nuevo comienzo."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

