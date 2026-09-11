export type PlantCategory =
  | 'Huerta'
  | 'Aromáticas y culinarias'
  | 'Infusiones y bienestar'
  | 'Flores ornamentales'
  | 'Plantas decorativas de interior'
  | 'Cactus y suculentas'
  | 'Plantas para polinizadores'
  | 'Plantas medicinales'
  | 'No tóxico para mascotas';

export type DifficultyLevel = 1 | 2 | 3; // 1 = Fácil (1 estrella), 2 = Intermedio (2 estrellas), 3 = Avanzado (3 estrellas)

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: PlantCategory;
  categories: PlantCategory[];
  secondaryCategory?: PlantCategory;
  availableSizes: KitSize[];
  isPolinizador?: boolean; // Can be included in pollinator filter
  isMedicinal?: boolean; // Can be included in medicinal filter
  isPetFriendly?: boolean; // Can be included in pet friendly filter
  difficulty: DifficultyLevel; // 1, 2, or 3 stars
  light: 'Sol directo' | 'Sol parcial' | 'Sombra o luz indirecta' | 'Luz brillante indirecta';
  watering: string; // e.g. '2-3 veces por semana', 'Cada 10-15 días', 'Moderado'
  temperature: string; // e.g. '15-28 °C'
  growthSpeed: 'Rápido' | 'Moderado' | 'Lento';
  height: string; // e.g. '20 - 40 cm'
  uses: string[]; // e.g. ['Gastronómico', 'Ensaladas', 'Cocina']
  idealFor: string[]; // e.g. ['Principiantes', 'Cocina', 'Balcón', 'Poco tiempo']
  careTips: string;
  benefits: string;
  imageUrl: string;
  imagePosition?: string;
  summaryDescription: string;
  priceS: number;
  priceM: number;
  priceL: number;
  keywords: string[]; // for search and tags
}

export type KitSize = 'S' | 'M' | 'L';

export interface PotDimension {
  diameter: number; // in cm
  depth: number;    // in cm
  label: string;    // e.g. "Ø 13 × 11 cm"
  fullLabel: string;// e.g. "Diámetro 13 cm · Profundidad 11 cm"
  recommendedUses: string;
}

export const POT_DIMENSIONS: Record<KitSize, PotDimension> = {
  S: {
    diameter: 13,
    depth: 11,
    label: 'Ø 13 × 11 cm',
    fullLabel: 'Diámetro: 13 cm · Profundidad: 11 cm',
    recommendedUses: 'Ideal para repisas, escritorios, cactus y suculentas compactas.',
  },
  M: {
    diameter: 15,
    depth: 12,
    label: 'Ø 15 × 12 cm',
    fullLabel: 'Diámetro: 15 cm · Profundidad: 12 cm',
    recommendedUses: 'Ideal para aromáticas, infusiones, flores de acento y mesas.',
  },
  L: {
    diameter: 18,
    depth: 20,
    label: 'Ø 18 × 20 cm',
    fullLabel: 'Diámetro: 18 cm · Profundidad: 20 cm',
    recommendedUses: 'Ideal para hortalizas de huerta, tomateras, arbustos y plantas con raíces profundas.',
  },
};

export const KIT_INCLUDED_ITEMS = [
  'Maceta (S, M o L)',
  'Semilla o plántula',
  'Tierra o sustrato adecuado',
  'Pala de jardinería',
  'Atomizador',
  'Etiquetas para identificar la planta',
  'Guantes',
  'Ficha técnica personalizada',
  'Código QR para sincronizar con la App Eywa',
];

export interface CartItem {
  plant: Plant;
  size: KitSize;
  quantity: number;
  price: number;
}

export interface QuizAnswer {
  timeAvailable: 'A' | 'B' | 'C';
  spaceType: 'A' | 'B' | 'C';
  goal: 'A' | 'B' | 'C';
  pets: 'A' | 'B' | 'C';
  lifestyle: 'A' | 'B' | 'C';
  stressReaction: 'A' | 'B' | 'C' | 'D';
  socialRole: 'A' | 'B' | 'C' | 'D';
  dailyEnergy: 'A' | 'B' | 'C' | 'D';
  learningProcess: 'A' | 'B' | 'C' | 'D';
  desiredEmotion: 'A' | 'B' | 'C' | 'D';
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  notes?: string;
}

export interface OrderReservation {
  orderId: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: {
    plantId: string;
    plantName: string;
    size: KitSize;
    potDimensions: string;
    quantity: number;
    priceUnit: number;
    subtotal: number;
  }[];
  totalItems: number;
  totalAmount: number;
  pickupLocation: string;
  pickupSchedule: string;
  status: 'Pendiente de recogida' | 'Entregado' | 'Cancelado';
}

