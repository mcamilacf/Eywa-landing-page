import React, { useState } from 'react';
import { Plant, QuizAnswer, POT_DIMENSIONS } from '../types';
import { PLANTS } from '../data/plants';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, Star, FileText, ShoppingCart, Heart, ShieldCheck, Sun, Compass } from 'lucide-react';
import { formatCOP } from '../utils/format';

interface QuizProps {
  onSelectPlantModal: (plant: Plant) => void;
  onAddToCart: (plant: Plant, size: 'S' | 'M' | 'L') => void;
}

interface QuestionOption {
  value: 'A' | 'B' | 'C' | 'D';
  label: string;
  desc?: string;
}

interface Question {
  id: number;
  block: 'Hábitos y Espacio' | 'Personalidad y Conexión Emocional';
  title: string;
  field: keyof QuizAnswer;
  options: QuestionOption[];
}

export const Quiz: React.FC<QuizProps> = ({ onSelectPlantModal, onAddToCart }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({
    timeAvailable: 'A',
    spaceType: 'A',
    goal: 'A',
    pets: 'B',
    lifestyle: 'A',
    stressReaction: 'A',
    socialRole: 'A',
    dailyEnergy: 'A',
    learningProcess: 'A',
    desiredEmotion: 'A',
  });
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');

  const questions: Question[] = [
    // Bloque 1: Hábitos y Hábitat
    {
      id: 1,
      block: 'Hábitos y Espacio',
      title: '¿Cuánto tiempo libre tienes a la semana para dedicarle a las plantas?',
      field: 'timeAvailable',
      options: [
        {
          value: 'A',
          label: 'Casi nada o se me olvida regar constantemente.',
          desc: 'Buscas plantas de bajo mantenimiento que sobrevivan a descuidos o viajes.',
        },
        {
          value: 'B',
          label: 'Un par de veces por semana tengo unos minutos para revisar cómo van.',
          desc: 'Tienes disposición moderada para mantener un riego periódico constante.',
        },
        {
          value: 'C',
          label: 'Me encanta dedicarles tiempo diario, regar, podar y consentirlas.',
          desc: 'Disfrutas del cuidado intensivo y ver su evolución continua.',
        },
      ],
    },
    {
      id: 2,
      block: 'Hábitos y Espacio',
      title: '¿En qué espacio de tu hogar ubicarías la planta?',
      field: 'spaceType',
      options: [
        {
          value: 'A',
          label: 'En un escritorio, habitación u oficina de interior (luz indirecta o poca luz).',
          desc: 'Espacio cerrado de iluminación tenue o luz filtrada por cortina.',
        },
        {
          value: 'B',
          label: 'En la cocina, cerca de una ventana donde entra buena luz.',
          desc: 'Espacio cálido y luminoso con acceso rápido para sazonar tus platos.',
        },
        {
          value: 'C',
          label: 'En un balcón, terraza o patio expuesto directamente al sol.',
          desc: 'Zona exterior bien ventilada con horas de sol pleno diario.',
        },
      ],
    },
    {
      id: 3,
      block: 'Hábitos y Espacio',
      title: '¿Cuál es tu objetivo o propósito principal al tenerla?',
      field: 'goal',
      options: [
        {
          value: 'A',
          label: 'Decorar sin complicaciones y purificar el aire de mi espacio.',
          desc: 'Estética limpia, elegancia sobria y ambientes libres de toxinas.',
        },
        {
          value: 'B',
          label: 'Cosecharla para cocinar, sazonar o preparar infusiones naturales.',
          desc: 'Utilidad directa en tu mesa, bienestar y salud diariamente.',
        },
        {
          value: 'C',
          label: 'Llenar de flores, color y vida mi hogar o atraer polinizadores (mariposas, abejas).',
          desc: 'Transformar tu entorno en un rincón vibrante y lleno de biodiversidad.',
        },
      ],
    },
    {
      id: 4,
      block: 'Hábitos y Espacio',
      title: '¿Tienes mascotas (perros o gatos) en casa?',
      field: 'pets',
      options: [
        {
          value: 'A',
          label: 'Sí, y les encanta curiosear o morder las hojas.',
          desc: 'Es imprescindible seleccionar plantas 100% no tóxicas y seguras.',
        },
        {
          value: 'B',
          label: 'Sí, pero no le ponen atención a las plantas / No tengo mascotas.',
          desc: 'Sin riesgo mayor, se puede cultivar casi cualquier variedad.',
        },
        {
          value: 'C',
          label: 'No tengo mascotas.',
          desc: 'Cuentas con libertad total de elección botánica.',
        },
      ],
    },
    {
      id: 5,
      block: 'Hábitos y Espacio',
      title: '¿Cómo te defines según tu personalidad y estilo de vida?',
      field: 'lifestyle',
      options: [
        {
          value: 'A',
          label: 'Práctico/a, ocupado/a o relajado/a: buscas algo resistente que sobreviva a tu ritmo.',
          desc: 'Valoras la autonomía y las plantas de alta resistencia.',
        },
        {
          value: 'B',
          label: 'Funcional, saludable o gastronómico/a: te gusta ver resultados útiles a diario.',
          desc: 'Te motiva cultivar cosas frescas para el cuerpo y el paladar.',
        },
        {
          value: 'C',
          label: 'Detallista, paciente y alegre: disfrutas ver crecer algo florido y llamativo.',
          desc: 'Gozas de la belleza visual, la floración y el detalle estético.',
        },
      ],
    },

    // Bloque 2: Personalidad y Conexión Emocional
    {
      id: 6,
      block: 'Personalidad y Conexión Emocional',
      title: '¿Cómo reaccionas ante los imprevistos o situaciones de estrés en tu día a día?',
      field: 'stressReaction',
      options: [
        {
          value: 'A',
          label: 'Resiliente e imperturbable',
          desc: 'Me adapto rápido, no me ahogo en un vaso de agua y salgo adelante con muy pocos recursos.',
        },
        {
          value: 'B',
          label: 'Expresivo/a y transparente',
          desc: 'Si algo no está bien se me nota de inmediato, pero cuando estoy a gusto contagio buena energía a todos.',
        },
        {
          value: 'C',
          label: 'Metódico/a y disciplinado/a',
          desc: 'Me gusta la estructura, mantengo mis rutinas al día y soy constante con mis compromisos.',
        },
        {
          value: 'D',
          label: 'Apasionado/a y dinámico/a',
          desc: 'Busco resultados rápidos, soy intenso/a con lo que me motiva y me aburro si las cosas no avanzan.',
        },
      ],
    },
    {
      id: 7,
      block: 'Personalidad y Conexión Emocional',
      title: 'En tu círculo social o de trabajo, ¿cuál es tu rol natural?',
      field: 'socialRole',
      options: [
        {
          value: 'A',
          label: 'El ancla de calma',
          desc: 'Eres esa persona equilibrada que transmite paz y soluciona problemas sin hacer drama.',
        },
        {
          value: 'B',
          label: 'El alma protectora / cuidador',
          desc: 'Te encanta consentir a los tuyos, cocinarles, sanarlos o darles confort cuando se sienten mal.',
        },
        {
          value: 'C',
          label: 'El creativo y detallista',
          desc: 'Te apasiona la estética, el color, el diseño y llenar de vida cualquier lugar donde estás.',
        },
        {
          value: 'D',
          label: 'El indispensable / multifacético',
          desc: 'Siempre tienes una solución a la mano, eres útil, práctico/a y todos acuden a ti por ideas.',
        },
      ],
    },
    {
      id: 8,
      block: 'Personalidad y Conexión Emocional',
      title: 'Si tu energía diaria fuera un tipo de clima o ambiente, ¿cuál sería?',
      field: 'dailyEnergy',
      options: [
        {
          value: 'A',
          label: 'Una tarde soleada de desierto',
          desc: 'Cálido/a, independiente, disfrutas de tu espacio a solas y recargas baterías en calma.',
        },
        {
          value: 'B',
          label: 'Un bosque fresco tras la lluvia',
          desc: 'Renovador/a, aromático/a, te gusta el ambiente limpio y reconectar con lo natural.',
        },
        {
          value: 'C',
          label: 'Un jardín primaveral al mediodía',
          desc: 'Vibrante, alegre, lleno de color y con ganas de destacar en el entorno.',
        },
        {
          value: 'D',
          label: 'Un hogar acogedor en la noche',
          desc: 'Relajado/a, íntimo/a, amante del confort, las infusiones y las conversaciones profundas.',
        },
      ],
    },
    {
      id: 9,
      block: 'Personalidad y Conexión Emocional',
      title: '¿Cómo vives tus procesos de aprendizaje o metas personales?',
      field: 'learningProcess',
      options: [
        {
          value: 'A',
          label: 'A mi propio ritmo',
          desc: 'No tengo afán; prefiero construir paso a paso aunque tome tiempo.',
        },
        {
          value: 'B',
          label: 'Acepto la fragilidad y el cambio',
          desc: 'Entiendo que hay etapas para florecer y etapas para descansar; disfruto cada fase.',
        },
        {
          value: 'C',
          label: 'Necesito ver resultados pronto',
          desc: 'Me motiva ver que las cosas que cuido o trabajo crecen y dan frutos rápido.',
        },
        {
          value: 'D',
          label: 'Me mantengo firme contra viento y marea',
          desc: 'No me dejo tumbar fácilmente por las dificultades.',
        },
      ],
    },
    {
      id: 10,
      block: 'Personalidad y Conexión Emocional',
      title: '¿Qué sensación o emoción quieres sentir cada vez que miras tu planta en casa?',
      field: 'desiredEmotion',
      options: [
        {
          value: 'A',
          label: 'Serenidad y orden',
          desc: '"Todo está bajo control y no me exige de más."',
        },
        {
          value: 'B',
          label: 'Gratitud y nutrición',
          desc: '"Estoy cultivando algo útil para mi cuerpo o mi mente."',
        },
        {
          value: 'C',
          label: 'Alegría y belleza',
          desc: '"Mi espacio se siente lleno de vida y elegancia."',
        },
        {
          value: 'D',
          label: 'Orgullo de logro',
          desc: '"Con mi dedicación diaria logré que esta planta diera lo mejor de sí."',
        },
      ],
    },
  ];

  const handleSelectOption = (field: keyof QuizAnswer, value: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate scores and matches
  const calculateMatches = (): { best: Plant; alternatives: Plant[]; dominantArchetype: 'A' | 'B' | 'C' | 'D' } => {
    // Determine dominant personality archetype from Bloque 2 (Q6-Q10) + Q5
    const personalityAnswers = [
      answers.lifestyle,
      answers.stressReaction,
      answers.socialRole,
      answers.dailyEnergy,
      answers.learningProcess,
      answers.desiredEmotion,
    ];

    const counts = { A: 0, B: 0, C: 0, D: 0 };
    personalityAnswers.forEach((ans) => {
      if (ans && counts[ans] !== undefined) {
        counts[ans]++;
      }
    });

    let dominantArchetype: 'A' | 'B' | 'C' | 'D' = 'A';
    let maxCount = -1;
    (Object.keys(counts) as Array<'A' | 'B' | 'C' | 'D'>).forEach((key) => {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        dominantArchetype = key;
      }
    });

    const isPetCurious = answers.pets === 'A';

    const scored = PLANTS.map((plant) => {
      let score = 0;

      // PET FRIENDLY SAFETY CRITICAL
      if (isPetCurious) {
        if (plant.isPetFriendly) {
          score += 12;
        } else {
          score -= 15; // Strongly downvote toxic plants when curious pets are present
        }
      }

      // 1. Time Available (Q1)
      if (answers.timeAvailable === 'A') {
        if (plant.category === 'Cactus y suculentas') score += 8;
        if (plant.difficulty === 1) score += 6;
        if (plant.watering.includes('15') || plant.watering.includes('10') || plant.watering.includes('1 vez')) score += 6;
      } else if (answers.timeAvailable === 'B') {
        if (plant.difficulty === 1 || plant.difficulty === 2) score += 5;
      } else if (answers.timeAvailable === 'C') {
        if (plant.category === 'Huerta' || plant.category === 'Flores ornamentales') score += 7;
      }

      // 2. Space (Q2)
      if (answers.spaceType === 'A') {
        // Interior / escritorio
        if (plant.category === 'Plantas decorativas de interior' || plant.category === 'Cactus y suculentas') score += 8;
        if (plant.light.includes('Sombra') || plant.light.includes('indirecta')) score += 6;
      } else if (answers.spaceType === 'B') {
        // Cocina / ventana
        if (plant.category === 'Aromáticas y culinarias' || plant.category === 'Huerta' || plant.secondaryCategory === 'Infusiones y bienestar') score += 8;
      } else if (answers.spaceType === 'C') {
        // Balcón / terraza
        if (plant.light === 'Sol directo' || plant.category === 'Flores ornamentales' || plant.category === 'Plantas para polinizadores') score += 8;
      }

      // 3. Goal (Q3)
      if (answers.goal === 'A') {
        // Decorar / purificar
        if (plant.category === 'Plantas decorativas de interior' || plant.category === 'Cactus y suculentas') score += 8;
      } else if (answers.goal === 'B') {
        // Cosechar / cocinar / infusiones
        if (plant.category === 'Huerta' || plant.category === 'Aromáticas y culinarias' || plant.category === 'Infusiones y bienestar') score += 8;
      } else if (answers.goal === 'C') {
        // Flores / color / polinizadores
        if (plant.category === 'Flores ornamentales' || plant.category === 'Plantas para polinizadores' || plant.isPolinizador) score += 9;
      }

      // 4. Archetype Alignment (Q5-Q10)
      if (dominantArchetype === 'A') {
        // Resiliente / Sobrio / Autónomo (Sansevieria, Cactus, Lengua de suegra, Poto, Sábila, Haworthia, Echeveria, Cinta)
        if (plant.category === 'Cactus y suculentas' || plant.category === 'Plantas decorativas de interior') score += 7;
        if (plant.id === 'lengua-de-suegra' || plant.id === 'echeveria' || plant.id === 'poto' || plant.id === 'aloe-vera' || plant.id === 'cinta') score += 6;
      } else if (dominantArchetype === 'B') {
        // Protector / Bienestar / Aromáticas / Infusiones
        if (plant.category === 'Aromáticas y culinarias' || plant.category === 'Infusiones y bienestar') score += 8;
        if (plant.id === 'romero' || plant.id === 'hierbabuena' || plant.id === 'toronjil' || plant.id === 'albahaca' || plant.id === 'manzanilla' || plant.id === 'lavanda') score += 6;
      } else if (dominantArchetype === 'C') {
        // Creativo / Florido / Estético
        if (plant.category === 'Flores ornamentales' || plant.category === 'Plantas para polinizadores') score += 8;
        if (plant.id === 'margarita' || plant.id === 'petunia' || plant.id === 'calendula' || plant.id === 'cosmos' || plant.id === 'zinnia' || plant.id === 'pensamiento') score += 6;
      } else if (dominantArchetype === 'D') {
        // Dinámico / Cosechador / Huerta
        if (plant.category === 'Huerta') score += 9;
        if (plant.id === 'tomate-cherry' || plant.id === 'lechuga' || plant.id === 'espinaca' || plant.id === 'cebollin' || plant.id === 'pimenton' || plant.id === 'aji') score += 6;
      }

      return { plant, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    const best = scored[0].plant;
    const alternatives = [scored[1].plant, scored[2].plant];

    return { best, alternatives, dominantArchetype };
  };

  const { best: recommendedPlant, alternatives: alternativePlants, dominantArchetype } = calculateMatches();

  const getInspirationalText = (plant: Plant, archetype: 'A' | 'B' | 'C' | 'D'): string => {
    // Generates a tailored inspirational text matching the user's personality and their plant
    const altNames = alternativePlants.map((a) => a.name).join(' o ');

    if (archetype === 'A') {
      return `Tu planta ideal es la ${plant.name} (o ${altNames}). Eres una persona fuerte, práctica e independiente. No necesitas atención constante para brillar ni te dejas derribar por la presión. Esta planta comparte tu naturaleza sobria y resistente: sobrevive a los momentos difíciles sin perder su elegancia y aporta estabilidad y armonía a tu espacio.`;
    } else if (archetype === 'B') {
      return `Tu planta ideal es la ${plant.name} (o ${altNames}). Eres una persona cálida, protectora y profundamente sanadora. Te reconforta cuidar a los tuyos y brindarles bienestar. Esta planta sintoniza perfectamente con tu alma generosa: florece con tus mimos y te devuelve aromas frescos, confort y serenidad natural para nutrir tu día a día.`;
    } else if (archetype === 'C') {
      return `Tu planta ideal es la ${plant.name} (o ${altNames}). Eres una persona creativa, detallista y llena de luz. Tienes el talento natural de alegrar cualquier lugar y contagiar energía positiva a tu alrededor. Esta planta refleja tu esencia alegre y estética: con sus colores y vitalidad llenará tu hogar de constante belleza e inspiración.`;
    } else {
      return `Tu planta ideal es la ${plant.name} (o ${altNames}). Eres una persona enfocada, apasionada y orientada al logro. Te motiva ver que la dedicación diaria rinde frutos tangibles y valiosos. Esta planta se alinea con tu espíritu activo: responderá a tu cuidado regalándote una cosecha viva que será un verdadero orgullo en tu hogar.`;
    }
  };

  const currentQ = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: document.getElementById('quiz-section')?.offsetTop || 0, behavior: 'smooth' });
    } else {
      setStep(questions.length);
      window.scrollTo({ top: document.getElementById('quiz-section')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <section id="quiz-section" className="py-8 sm:py-12 md:py-16 bg-[#F7F7F2]">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {step < questions.length ? (
          /* QUESTION CARD */
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#E5EBE6] shadow-xs">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5EBE6] pb-4 sm:pb-6 mb-5 sm:mb-8 gap-2 sm:gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#767f64]">
                    TEST: PLANTA IDEAL
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#767f64]/10 text-[#5A6D47]">
                    {currentQ.block}
                  </span>
                </div>
                <h2 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#3B4D30] leading-snug">
                  ¿Qué planta es la ideal para ti?
                </h2>
              </div>
              <span className="text-xs font-sans font-bold text-[#5A6D47] self-start sm:self-auto">
                Paso {step + 1} de {questions.length}
              </span>
            </div>

            {/* Progress indicator bar */}
            <div className="w-full bg-[#E5EBE6] rounded-full h-1.5 sm:h-2 mb-5 sm:mb-8 overflow-hidden">
              <div
                className="bg-[#767f64] h-full rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Title */}
            <h3 className="font-serif font-bold text-base sm:text-lg md:text-xl text-[#3B4D30] mb-4 sm:mb-6 leading-snug">
              {currentQ.title}
            </h3>

            {/* Options list */}
            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.field] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(currentQ.field, opt.value)}
                    className={`w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all flex items-start justify-between gap-3 sm:gap-4 active:scale-[0.99] ${
                      isSelected
                        ? 'border-[#767f64] bg-[#E5EBE6] ring-1 ring-[#767f64]'
                        : 'border-[#E5EBE6] bg-white hover:bg-[#F7F7F2] text-[#3B4D30]'
                    }`}
                  >
                    <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                      <span className="font-serif font-bold text-sm sm:text-base text-[#3B4D30] block leading-snug">
                        {opt.label}
                      </span>
                      {opt.desc && (
                        <span className="font-sans text-[11px] sm:text-xs text-[#3B4D30]/70 block leading-normal">
                          {opt.desc}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-[#767f64] bg-[#767f64] text-[#F7F7F2]'
                          : 'border-[#E5EBE6] bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5EBE6] gap-2">
              <button
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
                className={`text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors ${
                  step === 0
                    ? 'text-[#5A6D47]/40 cursor-not-allowed'
                    : 'text-[#3B4D30] hover:bg-[#E5EBE6]'
                }`}
              >
                Anterior
              </button>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#767f64] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs transition-all shadow-xs active:scale-95"
              >
                {step === questions.length - 1 ? 'Ver Resultado' : 'Siguiente'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* RESULT CARD */
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#E5EBE6] shadow-xs text-left space-y-6 sm:space-y-8">
            
            {/* Header Result */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between pb-3 sm:pb-4 border-b border-[#E5EBE6] gap-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#E5EBE6] text-[#3B4D30] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-[#767f64] shrink-0" />
                <span className="truncate">TU PLANTA IDEAL RECOMENDADA</span>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#5A6D47] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#767f64]" />
                Repetir Test
              </button>
            </div>

            {/* Inspirational Personality Connection Box */}
            <div className="bg-[#F7F7F2] p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[#E5EBE6] relative overflow-hidden space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#767f64] shrink-0" />
                <h4 className="font-serif italic font-bold text-base sm:text-xl text-[#3B4D30]">
                  Tu Conexión Botánica
                </h4>
              </div>
              <p className="font-sans text-xs sm:text-sm md:text-base text-[#3B4D30]/90 italic leading-relaxed">
                "{getInspirationalText(recommendedPlant, dominantArchetype)}"
              </p>
            </div>

            {/* Main Recommended Plant Card */}
            <div>
              <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#767f64] block mb-2 sm:mb-3">
                OPCIÓN PRINCIPAL
              </span>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E5EBE6]">
                
                {/* Image */}
                <div
                  onClick={() => onSelectPlantModal(recommendedPlant)}
                  className="md:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5EBE6] bg-[#E5EBE6] cursor-pointer group/img"
                >
                  <img
                    src={recommendedPlant.imageUrl}
                    alt={recommendedPlant.name}
                    style={{ objectPosition: recommendedPlant.imagePosition || 'center' }}
                    className="w-full h-56 sm:h-72 md:h-80 object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#F7F7F2]/95 backdrop-blur-md text-[#3B4D30] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#E5EBE6]">
                    {recommendedPlant.category}
                  </span>
                </div>

                {/* Specs & Actions */}
                <div className="md:col-span-7 space-y-3 sm:space-y-4">
                  <div
                    onClick={() => onSelectPlantModal(recommendedPlant)}
                    className="cursor-pointer group/title"
                  >
                    <div className="flex items-center gap-1 text-[#767f64] mb-1">
                      {[...Array(recommendedPlant.difficulty)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#767f64] text-[#767f64]" />
                      ))}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] ml-1">
                        Dificultad {recommendedPlant.difficulty}/3
                      </span>
                    </div>

                    <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#3B4D30] group-hover/title:text-[#767f64] transition-colors leading-tight">
                      Kit {recommendedPlant.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#5A6D47] mt-0.5">
                      {recommendedPlant.scientificName}
                    </p>
                  </div>

                  <p
                    onClick={() => onSelectPlantModal(recommendedPlant)}
                    className="font-sans text-xs sm:text-sm text-[#3B4D30]/80 leading-relaxed cursor-pointer"
                  >
                    {recommendedPlant.summaryDescription}
                  </p>

                  {/* Attributes */}
                  <div
                    onClick={() => onSelectPlantModal(recommendedPlant)}
                    className="grid grid-cols-2 gap-2 text-xs font-sans text-[#3B4D30] bg-[#F7F7F2] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-[#E5EBE6] cursor-pointer hover:border-[#767f64]/40 transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#5A6D47] block text-[9px] sm:text-[10px] uppercase tracking-wider">Luz:</span>
                      <span className="truncate block text-xs">{recommendedPlant.light}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#5A6D47] block text-[9px] sm:text-[10px] uppercase tracking-wider">Riego:</span>
                      <span className="truncate block text-xs">{recommendedPlant.watering}</span>
                    </div>
                  </div>

                  {/* Size Selector */}
                  {(() => {
                    const currentSize = recommendedPlant.availableSizes.includes(selectedSize)
                      ? selectedSize
                      : recommendedPlant.availableSizes[0];

                    return (
                      <>
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5A6D47]">
                              Tamaño de Kit:
                            </span>
                            <span className="text-[10px] font-sans font-medium text-[#3B4D30] bg-[#E5EBE6] px-2 py-0.5 rounded-md truncate max-w-[50%] text-right">
                              Maceta {currentSize}: {POT_DIMENSIONS[currentSize].label}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {recommendedPlant.availableSizes.map((sz) => (
                              <button
                                key={sz}
                                onClick={() => setSelectedSize(sz)}
                                className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-all active:scale-95 ${
                                  currentSize === sz
                                    ? 'bg-[#767f64] text-[#F7F7F2] border-[#767f64]'
                                    : 'bg-white text-[#3B4D30] border-[#E5EBE6] hover:bg-[#E5EBE6]'
                                }`}
                              >
                                Kit {sz} ({formatCOP(Number(recommendedPlant[`price${sz}` as keyof Plant]))})
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-[#5A6D47] italic">
                            💡 {POT_DIMENSIONS[currentSize].recommendedUses}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 sm:pt-3 space-y-2">
                          <button
                            onClick={() => onAddToCart(recommendedPlant, currentSize)}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#767f64] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs transition-all shadow-xs active:scale-[0.98]"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Encargar Kit {currentSize} • {formatCOP(Number(recommendedPlant[`price${currentSize}` as keyof Plant]))}</span>
                          </button>
                          <p className="text-[10px] text-center text-[#5A6D47]">
                            ✓ Incluye los 9 elementos listos para sembrar y sincronización con App Eywa.
                          </p>
                        </div>
                      </>
                    );
                  })()}

                </div>

              </div>
            </div>

            {/* Alternative Matches Section (Otras opciones para ti) */}
            {alternativePlants.length > 0 && (
              <div className="pt-4 sm:pt-6 border-t border-[#E5EBE6]">
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                  <Sparkles className="w-4 h-4 text-[#767f64]" />
                  <h4 className="font-serif italic font-bold text-lg sm:text-xl text-[#3B4D30]">
                    Otras excelentes opciones para ti
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#3B4D30]/70 mb-4 sm:mb-6">
                  Según tus respuestas, estas plantas también combinan genial con tu espacio y ritmo de vida:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {alternativePlants.map((alt) => (
                    <div
                      key={alt.id}
                      onClick={() => onSelectPlantModal(alt)}
                      className="bg-[#F7F7F2] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#E5EBE6] flex gap-3 sm:gap-4 items-center hover:border-[#767f64]/40 transition-all cursor-pointer group"
                    >
                      <img
                        src={alt.imageUrl}
                        alt={alt.name}
                        style={{ objectPosition: alt.imagePosition || 'center' }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-[#E5EBE6] group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#767f64] block truncate">
                          {alt.category}
                        </span>
                        <h5 className="font-serif font-bold text-sm sm:text-base text-[#3B4D30] group-hover:text-[#767f64] transition-colors truncate">
                          Kit {alt.name}
                        </h5>
                        <p className="font-sans text-xs text-[#3B4D30]/70 line-clamp-1 mb-1.5">
                          {alt.summaryDescription}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(alt, alt.availableSizes[0]);
                          }}
                          className="w-full text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-[#767f64] text-white hover:bg-[#5A6D47] transition-colors flex items-center justify-center gap-1 active:scale-95"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          + Agregar ({formatCOP(Number(alt[`price${alt.availableSizes[0]}` as keyof Plant]))})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
