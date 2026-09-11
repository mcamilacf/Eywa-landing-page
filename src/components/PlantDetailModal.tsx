import React, { useState } from 'react';
import { Plant, POT_DIMENSIONS, KitSize } from '../types';
import { X, Star, Sun, Droplets, Thermometer, Zap, Ruler, Tag, Heart, ShoppingCart, Check, Box } from 'lucide-react';
import { formatCOP } from '../utils/format';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToCart: (plant: Plant, size: 'S' | 'M' | 'L') => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');

  if (!plant) return null;

  const currentSize = plant.availableSizes.includes(selectedSize)
    ? selectedSize
    : plant.availableSizes[0];

  const currentPrice = plant[`price${currentSize}` as keyof Plant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#F7F7F2] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5EBE6] shadow-2xl my-auto max-h-[92vh] flex flex-col text-[#3B4D30]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-white text-[#3B4D30] flex items-center justify-center transition-colors border border-[#E5EBE6] shadow-sm active:scale-95"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 overscroll-contain">
          
          {/* Plant Image Header */}
          <div className="relative h-56 sm:h-72 md:h-80 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 md:-mx-8 md:-mt-8 mb-4 sm:mb-6 overflow-hidden bg-[#E5EBE6]">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              style={{ objectPosition: plant.imagePosition || 'center' }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1">
              <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#F7F7F2]/95 backdrop-blur-md text-[#3B4D30] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-[#E5EBE6]">
                {plant.secondaryCategory ? `${plant.category} • ${plant.secondaryCategory}` : plant.category}
              </span>
              <h2 className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
                Kit {plant.name}
              </h2>
              <p className="font-serif italic text-[11px] sm:text-xs text-stone-200">
                {plant.scientificName}
              </p>
            </div>
          </div>

          {/* Primary Quick Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-[#E5EBE6] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#5A6D47]/20">
            
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#5A6D47] flex items-center justify-center shrink-0 border border-[#E5EBE6]">
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block truncate">Luz</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#3B4D30] block truncate">{plant.light}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#5A6D47] flex items-center justify-center shrink-0 border border-[#E5EBE6]">
                <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block truncate">Riego</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#3B4D30] block truncate">{plant.watering}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#5A6D47] flex items-center justify-center shrink-0 border border-[#E5EBE6]">
                <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block truncate">Temperatura</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#3B4D30] block truncate">{plant.temperature}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#5A6D47] flex items-center justify-center shrink-0 border border-[#E5EBE6]">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block truncate">Crecimiento</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#3B4D30] block truncate">{plant.growthSpeed}</span>
              </div>
            </div>

          </div>

          {/* Technical Specs List */}
          <div className="space-y-4 pt-2">
            
            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block mb-1">
                  Categoría
                </span>
                <span className="text-sm font-serif font-bold text-[#3B4D30]">
                  🌱 {plant.secondaryCategory ? `${plant.category} / ${plant.secondaryCategory}` : plant.category}
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block mb-1">
                  Dificultad
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex text-[#5A6D47]">
                    {[...Array(plant.difficulty)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#5A6D47]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#3B4D30]">
                    {plant.difficulty}/3 ({plant.difficulty === 1 ? 'Fácil' : plant.difficulty === 2 ? 'Intermedio' : 'Avanzado'})
                  </span>
                </div>
              </div>

            </div>

            {/* Height */}
            <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5EBE6] text-[#5A6D47] flex items-center justify-center">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                  Altura promedio
                </span>
                <span className="text-sm font-sans text-[#3B4D30]">
                  {plant.height}
                </span>
              </div>
            </div>

            {/* Usos */}
            <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                Usos principales
              </span>
              <div className="flex flex-wrap gap-2">
                {plant.uses.map((useItem, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#E5EBE6] text-[#3B4D30] text-xs font-serif border border-[#5A6D47]/20"
                  >
                    ✓ {useItem}
                  </span>
                ))}
              </div>
            </div>

            {/* Ideal para */}
            <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                Ideal para
              </span>
              <div className="flex flex-wrap gap-2">
                {plant.idealFor.map((idealItem, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#3B4D30] text-[#F7F7F2] text-xs font-bold uppercase tracking-wider"
                  >
                    ✦ {idealItem}
                  </span>
                ))}
              </div>
            </div>

            {/* Cuidados Especiales */}
            {plant.careTips && (
              <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-white space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                  Cuidados y Claves de Cultivo
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#3B4D30]/90 leading-relaxed">
                  💡 {plant.careTips}
                </p>
              </div>
            )}

            {/* Special Badges (Medicinal, Pet Friendly, Polinizador) */}
            {(plant.isMedicinal || plant.isPetFriendly || plant.isPolinizador) && (
              <div className="flex flex-wrap gap-2 pt-1">
                {plant.isMedicinal && (
                  <span className="px-3 py-1 rounded-full bg-[#E5EBE6] text-[#3B4D30] text-xs font-bold border border-[#5A6D47]/30 flex items-center gap-1.5">
                    🌱 Planta Medicinal
                  </span>
                )}
                {plant.isPetFriendly && (
                  <span className="px-3 py-1 rounded-full bg-[#E5EBE6] text-[#3B4D30] text-xs font-bold border border-[#5A6D47]/30 flex items-center gap-1.5">
                    🐾 No tóxico para mascotas
                  </span>
                )}
                {plant.isPolinizador && (
                  <span className="px-3 py-1 rounded-full bg-[#E5EBE6] text-[#3B4D30] text-xs font-bold border border-[#5A6D47]/30 flex items-center gap-1.5">
                    🦋 Para polinizadores
                  </span>
                )}
              </div>
            )}

            {/* Beneficios */}
            <div className="p-4 rounded-2xl border border-[#E5EBE6] bg-[#E5EBE6] space-y-2">
              <div className="flex items-center gap-2 text-[#5A6D47]">
                <Heart className="w-4 h-4 text-[#3B4D30]" />
                <span className="text-[10px] font-bold uppercase tracking-wider block text-[#3B4D30]">
                  Beneficios
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#3B4D30]/80 leading-relaxed">
                {plant.benefits}
              </p>
            </div>

            {/* Included in Kit & Pot Dimensions */}
            <div className="p-5 rounded-2xl bg-[#E5EBE6] border border-[#5A6D47]/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-[#3B4D30]">
                  Contenido del Kit Eywa:
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#5A6D47] border border-[#E5EBE6]">
                  Kit {currentSize} ({POT_DIMENSIONS[currentSize].label})
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans text-[#3B4D30]/90">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span><strong>Maceta {currentSize}</strong> ({POT_DIMENSIONS[currentSize].fullLabel})</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Semilla o plántula de {plant.name}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Tierra o sustrato adecuado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Pala de jardinería</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Atomizador para riego</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Etiquetas para identificar la planta</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Guantes de cultivo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span>Ficha técnica personalizada</span>
                </li>
                <li className="flex items-center gap-2 sm:col-span-2">
                  <Check className="w-4 h-4 text-[#5A6D47] shrink-0" />
                  <span><strong>Código QR</strong> para sincronizar con la App Eywa</span>
                </li>
              </ul>

              {/* Pot Dimensions Reference Box */}
              <div className="pt-3 border-t border-[#5A6D47]/15">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block mb-2">
                  Guía de medidas de macetas para este kit:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {plant.availableSizes.map((sz) => {
                    const isCurrent = sz === currentSize;
                    const dim = POT_DIMENSIONS[sz];
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`text-left p-2.5 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-white border-[#767f64] shadow-xs'
                            : 'bg-[#F7F7F2]/60 border-[#5A6D47]/10 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-[#767f64]' : 'text-[#5A6D47]'}`}>
                            Tamaño {sz}
                          </span>
                          {isCurrent && <Check className="w-3 h-3 text-[#767f64]" />}
                        </div>
                        <p className="text-xs font-bold text-[#3B4D30]">
                          Ø {dim.diameter} cm × {dim.depth} cm
                        </p>
                        <p className="text-[10px] text-[#5A6D47] mt-0.5">
                          Profundidad: {dim.depth} cm
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Size & Purchase CTA Bar */}
          <div className="pt-4 border-t border-[#E5EBE6] space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                  Elige tu tamaño:
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-serif font-bold text-[#3B4D30]">
                    {formatCOP(Number(currentPrice))}
                  </span>
                  <span className="text-xs font-sans text-[#5A6D47]">
                    (Maceta: {POT_DIMENSIONS[currentSize].label} prof.)
                  </span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {plant.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all active:scale-95 ${
                      currentSize === sz
                        ? 'bg-[#767f64] text-[#F7F7F2] border-[#767f64]'
                        : 'bg-white text-[#3B4D30] border-[#E5EBE6] hover:bg-[#E5EBE6]'
                    }`}
                  >
                    Kit {sz}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(plant, currentSize);
                onClose();
              }}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-[#767f64] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs transition-all shadow-xs flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar Kit {currentSize} • {formatCOP(Number(currentPrice))}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
