import React, { useState, useMemo } from 'react';
import { Plant, KitSize, POT_DIMENSIONS, KIT_INCLUDED_ITEMS } from '../types';
import { PLANTS, CATEGORIES, KEYWORD_TAGS } from '../data/plants';
import { Search, Star, ShoppingCart, Filter, Check, X, PackageCheck, Info } from 'lucide-react';
import { formatCOP } from '../utils/format';

interface CatalogProps {
  onSelectPlantModal: (plant: Plant) => void;
  onAddToCart: (plant: Plant, size: 'S' | 'M' | 'L') => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectPlantModal, onAddToCart }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sizeSelections, setSizeSelections] = useState<Record<string, 'S' | 'M' | 'L'>>({});

  const handleSizeChange = (plantId: string, size: 'S' | 'M' | 'L') => {
    setSizeSelections((prev) => ({ ...prev, [plantId]: size }));
  };

  const getSize = (plant: Plant): 'S' | 'M' | 'L' => {
    const selected = sizeSelections[plant.id];
    if (selected && plant.availableSizes.includes(selected)) return selected;
    return plant.availableSizes[0];
  };

  // Toggle category in multi-select
  const toggleCategory = (cat: string) => {
    if (cat === 'Todas') {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle difficulty in multi-select
  const toggleDifficulty = (diff: number | 'Todas') => {
    if (diff === 'Todas') {
      setSelectedDifficulties([]);
      return;
    }
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  // Toggle keyword tag in multi-select
  const toggleKeyword = (tag: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedKeywords([]);
    setSearchQuery('');
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedDifficulties.length +
    selectedKeywords.length +
    (searchQuery.trim() ? 1 : 0);

  const filteredPlants = useMemo(() => {
    const MAIN_GROUPS = [
      'Huerta',
      'Aromáticas y culinarias',
      'Infusiones y bienestar',
      'Flores ornamentales',
      'Plantas decorativas de interior',
      'Cactus y suculentas',
    ];

    const SPECIAL_ATTRIBUTES = [
      'Plantas medicinales',
      'No tóxico para mascotas',
      'Plantas para polinizadores',
    ];

    const selectedMainGroups = selectedCategories.filter((c) =>
      MAIN_GROUPS.includes(c)
    );
    const selectedSpecialAttrs = selectedCategories.filter((c) =>
      SPECIAL_ATTRIBUTES.includes(c)
    );

    return PLANTS.filter((plant) => {
      // Build full array of categories for this plant
      const plantCats = plant.categories || [
        plant.category,
        ...(plant.secondaryCategory ? [plant.secondaryCategory] : []),
        ...(plant.isMedicinal ? ['Plantas medicinales'] : []),
        ...(plant.isPetFriendly ? ['No tóxico para mascotas'] : []),
        ...(plant.isPolinizador ? ['Plantas para polinizadores'] : []),
      ];

      // 1a. Filter by Main Groups (OR logic: if main groups selected, plant must belong to at least ONE)
      if (selectedMainGroups.length > 0) {
        const matchesMain = selectedMainGroups.some((group) =>
          plantCats.includes(group as any)
        );
        if (!matchesMain) return false;
      }

      // 1b. Filter by Special Attributes (AND logic: plant must satisfy ALL selected special attributes)
      if (selectedSpecialAttrs.length > 0) {
        const matchesAllSpecial = selectedSpecialAttrs.every((attr) => {
          if (attr === 'Plantas medicinales') return plant.isMedicinal || plantCats.includes('Plantas medicinales');
          if (attr === 'No tóxico para mascotas') return plant.isPetFriendly || plantCats.includes('No tóxico para mascotas');
          if (attr === 'Plantas para polinizadores') return plant.isPolinizador || plantCats.includes('Plantas para polinizadores');
          return plantCats.includes(attr as any);
        });
        if (!matchesAllSpecial) return false;
      }

      // 2. Multi-Difficulty filter (OR condition among selected difficulties)
      if (selectedDifficulties.length > 0) {
        if (!selectedDifficulties.includes(plant.difficulty)) return false;
      }

      // 3. Multi-Keyword filter (OR condition among selected keywords)
      if (selectedKeywords.length > 0) {
        const matchesKeyword = selectedKeywords.some((kw) => {
          const kwLower = kw.toLowerCase();
          return (
            plant.keywords.some((k) => k.toLowerCase().includes(kwLower)) ||
            plant.idealFor.some((i) => i.toLowerCase().includes(kwLower)) ||
            plant.uses.some((u) => u.toLowerCase().includes(kwLower))
          );
        });
        if (!matchesKeyword) return false;
      }

      // 4. Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          plant.name.toLowerCase().includes(q) ||
          plant.scientificName.toLowerCase().includes(q) ||
          plant.summaryDescription.toLowerCase().includes(q) ||
          plant.benefits.toLowerCase().includes(q) ||
          plant.careTips.toLowerCase().includes(q) ||
          plant.uses.some((u) => u.toLowerCase().includes(q)) ||
          plant.idealFor.some((i) => i.toLowerCase().includes(q)) ||
          plant.keywords.some((k) => k.toLowerCase().includes(q));

        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [selectedCategories, selectedDifficulties, selectedKeywords, searchQuery]);

  return (
    <section id="catalogo" className="py-8 sm:py-12 md:py-16 bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#767f64] block">
            CATÁLOGO EYWA
          </span>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#3B4D30]">
            Nuestros Kits de Cultivo
          </h2>
          <p className="font-sans text-[#3B4D30]/80 text-sm md:text-base">
            Selecciona múltiples categorías, dificultades y etiquetas simultáneamente para personalizar tu búsqueda.
          </p>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E5EBE6] shadow-xs space-y-5 sm:space-y-6">
          
          {/* Top Bar: Search Input & Difficulty Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767f64]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o palabra clave (ej: cocina, balcón)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#F7F7F2] border border-[#E5EBE6] text-xs text-[#3B4D30] placeholder:text-[#5A6D47]/60 focus:outline-none focus:ring-1 focus:ring-[#767f64]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6D47] hover:text-[#3B4D30] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Multi-Difficulty Filter */}
            <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#767f64]" /> Dificultad:
              </span>

              {/* Todas Button */}
              <button
                onClick={() => toggleDifficulty('Todas')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all border shrink-0 ${
                  selectedDifficulties.length === 0
                    ? 'bg-[#767f64] text-[#F7F7F2] border-[#767f64]'
                    : 'bg-[#E5EBE6] text-[#3B4D30] border-[#E5EBE6] hover:bg-[#5A6D47] hover:text-white'
                }`}
              >
                Todas
              </button>

              {/* 1, 2, 3 Buttons */}
              {[1, 2, 3].map((diff) => {
                const isSelected = selectedDifficulties.includes(diff);
                return (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all border flex items-center gap-1 shrink-0 ${
                      isSelected
                        ? 'bg-[#767f64] text-[#F7F7F2] border-[#767f64]'
                        : 'bg-[#E5EBE6] text-[#3B4D30] border-[#E5EBE6] hover:bg-[#5A6D47] hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{diff} ★ {diff === 1 ? 'Fácil' : diff === 2 ? 'Media' : 'Alta'}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Multi-Categories Selector Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47]">
                Categorías (puedes seleccionar varias):
              </span>
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-[10px] font-bold text-[#767f64] hover:underline"
                >
                  Limpiar categorías ({selectedCategories.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isAll = cat === 'Todas';
                const isSelected = isAll
                  ? selectedCategories.length === 0
                  : selectedCategories.includes(cat);

                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#767f64] text-[#F7F7F2] border-[#767f64] shadow-xs'
                        : 'bg-[#E5EBE6] text-[#3B4D30] border-[#E5EBE6] hover:bg-[#5A6D47] hover:text-white'
                    }`}
                  >
                    {!isAll && isSelected && <Check className="w-3 h-3 text-[#F7F7F2]" />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Keyword Tags (Multi-select) */}
          <div className="pt-3 border-t border-[#E5EBE6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47]">
                Palabras clave recomendadas:
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Limpiar Todo ({activeFilterCount})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {KEYWORD_TAGS.map((tag) => {
                const isActive = selectedKeywords.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleKeyword(tag)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#3B4D30] text-[#F7F7F2] border-[#3B4D30]'
                        : 'bg-[#E5EBE6] text-[#5A6D47] border-[#E5EBE6] hover:bg-[#5A6D47] hover:text-white'
                    }`}
                  >
                    {isActive && <Check className="w-2.5 h-2.5" />}
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-sans text-[#5A6D47]">
            Mostrando <span className="font-bold text-[#3B4D30]">{filteredPlants.length}</span> kits de cultivo
            {activeFilterCount > 0 && (
              <span className="ml-2 italic text-[#767f64]">({activeFilterCount} filtros activos)</span>
            )}
          </p>
        </div>

        {/* Plant Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E5EBE6]">
            <p className="font-serif font-bold text-lg text-[#3B4D30] mb-2">
              No se encontraron plantas con estos filtros
            </p>
            <p className="font-sans text-xs text-[#5A6D47] mb-6">
              Prueba desmarcando alguna categoría o restableciendo los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 bg-[#767f64] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#5A6D47]"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {filteredPlants.map((plant) => {
              const currentSize = getSize(plant);
              const currentPrice = plant[`price${currentSize}` as keyof Plant];

              return (
                <div
                  key={plant.id}
                  onClick={() => onSelectPlantModal(plant)}
                  className="bg-white rounded-xl sm:rounded-3xl border border-[#E5EBE6] overflow-hidden flex flex-col hover:shadow-md hover:border-[#767f64]/40 transition-all duration-300 group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-32 xs:h-40 sm:h-52 md:h-56 bg-[#E5EBE6] overflow-hidden">
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      style={{ objectPosition: plant.imagePosition || 'center' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#F7F7F2]/95 backdrop-blur-md text-[#3B4D30] text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#E5EBE6] max-w-[65%] truncate">
                      {plant.secondaryCategory ? `${plant.category} / ${plant.secondaryCategory}` : plant.category}
                    </span>

                    {/* Difficulty Badge */}
                    <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#F7F7F2]/95 backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 border border-[#E5EBE6]">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#767f64] text-[#767f64]" />
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#3B4D30]">
                        {plant.difficulty}/3
                      </span>
                    </div>
                  </div>

                  {/* Body Content - Minimalist view */}
                  <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="space-y-0.5 sm:space-y-1 min-w-0">
                      <h3 className="font-serif font-bold text-xs xs:text-sm sm:text-base md:text-lg text-[#3B4D30] group-hover:text-[#767f64] transition-colors leading-tight line-clamp-1 sm:line-clamp-none">
                        Kit {plant.name}
                      </h3>
                      <p className="font-serif italic text-[10px] sm:text-xs text-[#5A6D47] truncate">
                        {plant.scientificName}
                      </p>
                      <p className="font-sans text-[11px] sm:text-xs text-[#3B4D30]/80 line-clamp-2 pt-0.5 hidden xs:block">
                        {plant.summaryDescription}
                      </p>
                    </div>

                    {/* Size Selector & Pot Dimensions */}
                    <div onClick={(e) => e.stopPropagation()} className="space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47]">
                        <span>Tamaño:</span>
                        <span className="text-[#3B4D30] font-serif font-bold text-xs sm:text-sm md:text-base">{formatCOP(Number(currentPrice))}</span>
                      </div>
                      <div className="flex gap-1">
                        {plant.availableSizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSizeChange(plant.id, sz);
                            }}
                            className={`flex-1 py-0.5 sm:py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border transition-all active:scale-95 ${
                              currentSize === sz
                                ? 'bg-[#767f64] text-[#F7F7F2] border-[#767f64]'
                                : 'bg-[#E5EBE6] text-[#3B4D30] border-[#E5EBE6] hover:bg-[#5A6D47] hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-[#5A6D47] bg-[#E5EBE6]/60 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-[#E5EBE6]">
                        <span className="font-semibold">Maceta {currentSize}:</span>
                        <span className="font-sans font-medium text-[#3B4D30] truncate">{POT_DIMENSIONS[currentSize].label} prof.</span>
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-0.5 sm:pt-1 space-y-1 sm:space-y-1.5">
                      <div className="flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#5A6D47]">
                        <PackageCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#767f64] shrink-0" />
                        <span className="truncate">Kit de 9 elementos</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(plant, currentSize);
                        }}
                        className="w-full py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-[#767f64] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px] transition-all flex items-center justify-center gap-1 sm:gap-1.5 shadow-xs active:scale-[0.98]"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>Encargar</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
