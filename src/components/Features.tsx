import React from 'react';
import { Compass, PackageCheck, Smartphone, BookOpen, Layers } from 'lucide-react';

interface FeaturesProps {
  onGoToQuiz?: () => void;
  onGoToCatalog?: () => void;
  onGoToApp?: () => void;
}

export const Features: React.FC<FeaturesProps> = ({
  onGoToQuiz,
  onGoToCatalog,
  onGoToApp,
}) => {
  return (
    <section className="py-16 md:py-20 bg-[#E5EBE6] border-y border-[#5A6D47]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#5A6D47]">
            LA EXPERIENCIA EYWA
          </div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#3B4D30]">
            5 Etapas para cultivar una relación con la naturaleza
          </h2>
          <p className="font-sans text-sm md:text-base text-[#3B4D30]/80 leading-relaxed">
            Mientras otras marcas solo venden plantas, Eywa te enseña a cuidarlas y te acompaña en cada paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left">
          
          {/* Etapa 1: Descubrir -> Quiz (Clickeable con relieve) */}
          <button
            type="button"
            onClick={onGoToQuiz}
            className="bg-[#F7F7F2] hover:bg-[#F2F4EC] rounded-2xl p-6 border border-[#5A6D47]/20 hover:border-[#5A6D47]/40 shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0.5 active:shadow-xs transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#5A6D47]/40 flex flex-col justify-between"
            title="Ir al Quiz interactivo"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#E5EBE6] text-[#5A6D47]">
                1. Descubrir
              </span>
              <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center my-4">
                <Compass className="w-5 h-5 text-[#E5EBE6]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3B4D30] mb-2">
                Quiz Interactivo
              </h3>
              <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                Identifica tus gustos, personalidad, estilo de vida y luz disponible para recomendarte tu planta ideal.
              </p>
            </div>
          </button>

          {/* Etapa 2: Elegir (Estática) */}
          <div className="bg-[#F7F7F2] rounded-2xl p-6 border border-[#5A6D47]/20 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#E5EBE6] text-[#5A6D47]">
                2. Elegir
              </span>
              <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center my-4">
                <Layers className="w-5 h-5 text-[#E5EBE6]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3B4D30] mb-2">
                Especie & Tamaño
              </h3>
              <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                Elige la variedad (Huerta, Aromáticas, Infusiones, Interior) y el tamaño de tu kit (S, M o L).
              </p>
            </div>
          </div>

          {/* Etapa 3: Recibir -> Kit (Clickeable con relieve) */}
          <button
            type="button"
            onClick={onGoToCatalog}
            className="bg-[#F7F7F2] hover:bg-[#F2F4EC] rounded-2xl p-6 border border-[#5A6D47]/20 hover:border-[#5A6D47]/40 shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0.5 active:shadow-xs transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#5A6D47]/40 flex flex-col justify-between"
            title="Ir al Catálogo de Kits"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#E5EBE6] text-[#5A6D47]">
                3. Recibir
              </span>
              <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center my-4">
                <PackageCheck className="w-5 h-5 text-[#E5EBE6]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3B4D30] mb-2">
                Kit Todo Incluido
              </h3>
              <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                Maceta, semillas/plántula, sustrato, pala, atomizador, etiquetas e insumos listos para sembrar.
              </p>
            </div>
          </button>

          {/* Etapa 4: Aprender (Estática) */}
          <div className="bg-[#F7F7F2] rounded-2xl p-6 border border-[#5A6D47]/20 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#E5EBE6] text-[#5A6D47]">
                4. Aprender
              </span>
              <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center my-4">
                <BookOpen className="w-5 h-5 text-[#E5EBE6]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3B4D30] mb-2">
                Ficha Técnica
              </h3>
              <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                Cada kit incluye una ficha técnica personalizada con iconografía clara sobre luz, riego y cuidados.
              </p>
            </div>
          </div>

          {/* Etapa 5: Cuidar -> App (Clickeable con relieve) */}
          <button
            type="button"
            onClick={onGoToApp}
            className="bg-[#F7F7F2] hover:bg-[#F2F4EC] rounded-2xl p-6 border border-[#5A6D47]/20 hover:border-[#5A6D47]/40 shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0.5 active:shadow-xs transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#5A6D47]/40 flex flex-col justify-between"
            title="Ir a la App Eywa"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#E5EBE6] text-[#5A6D47]">
                5. Cuidar
              </span>
              <div className="w-10 h-10 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center my-4">
                <Smartphone className="w-5 h-5 text-[#E5EBE6]" />
              </div>
              <h3 className="font-serif font-bold text-base text-[#3B4D30] mb-2">
                App Eywa
              </h3>
              <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                Acompañamiento continuo con recordatorios de riego, consejos de crecimiento y contenido educativo.
              </p>
            </div>
          </button>

        </div>

        {/* Kit Included Items Bar */}
        <div className="bg-[#3B4D30] text-[#F7F7F2] p-6 rounded-2xl text-left border border-[#5A6D47]/40 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5EBE6] block">
              ¿QUÉ INCLUYE CADA KIT EYWA?
            </span>
            <p className="font-serif text-sm sm:text-base text-white mt-0.5">
              Todo lo necesario para comenzar inmediatamente sin comprar nada adicional:
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              'Maceta (S/M/L)',
              'Semilla o plántula',
              'Tierra o sustrato adecuado',
              'Pala de jardinería',
              'Atomizador',
              'Etiquetas para identificar la planta',
              'Guantes',
              'Ficha técnica personalizada',
              'Código QR para sincronizar con la App Eywa',
            ].map((item) => (
              <span key={item} className="px-3 py-1 rounded-full bg-[#5A6D47] text-white font-sans text-xs border border-[#6B7C59]">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

