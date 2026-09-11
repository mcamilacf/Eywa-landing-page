import React, { useState } from 'react';
import {
  Smartphone,
  Bell,
  Droplets,
  Check,
  Sparkles,
  Camera,
  Download,
  ShieldAlert,
  Settings,
  PackageCheck,
  ArrowDownCircle,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

/**
 * ============================================================================
 * 🔗 ENLACE DE DESCARGA DE LA APP EYWA (ARCHIVO .APK)
 * ============================================================================
 * Puedes actualizar o cambiar este link en cualquier momento aquí abajo:
 */
export const EYWA_APP_APK_URL =
  'https://github.com/mcamilacf/eywa/releases/download/v1.0.0/Eywa-debug.apk';

export const AppSection: React.FC = () => {
  const [activeReminders, setActiveReminders] = useState([
    { id: 1, name: 'Albahaca', task: 'Riego ligero hoy (150ml)', done: false },
    { id: 2, name: 'Tomate Cherry', task: 'Revisar luz de mediodía', done: true },
    { id: 3, name: 'Lavanda', task: 'Fertilización mensual', done: false },
  ]);

  const toggleReminder = (id: number) => {
    setActiveReminders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#E5EBE6] border-t border-[#5A6D47]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* App Overview Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#5A6D47] block">
              APP COMPANION EYWA
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-[#3B4D30]">
              Asistente digital de cultivo
            </h2>
            <p className="font-sans text-sm md:text-base text-[#3B4D30]/80 leading-relaxed">
              Sincroniza tus kits de cultivo con nuestra aplicación para Android. Recibe recordatorios de riego inteligentes, guías personalizadas y fichas botánicas interactivas.
            </p>

            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#3B4D30]">
              <li className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F7F2] border border-[#5A6D47]/20 shadow-xs">
                <Bell className="w-5 h-5 text-[#5A6D47] shrink-0" />
                <span><strong className="font-serif text-[#3B4D30]">Recordatorios inteligentes</strong> ajustados al clima y nivel de riego de tu especie.</span>
              </li>
              <li className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F7F2] border border-[#5A6D47]/20 shadow-xs">
                <Camera className="w-5 h-5 text-[#5A6D47] shrink-0" />
                <span><strong className="font-serif text-[#3B4D30]">Diagnóstico visual</strong> para prevenir hongos, plagas o carencia de luz.</span>
              </li>
              <li className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F7F2] border border-[#5A6D47]/20 shadow-xs">
                <Sparkles className="w-5 h-5 text-[#5A6D47] shrink-0" />
                <span><strong className="font-serif text-[#3B4D30]">Historial de crecimiento</strong> y guías paso a paso de podas y trasplante.</span>
              </li>
            </ul>
          </div>

          {/* Interactive Phone Screen Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-[#F7F7F2] border-4 border-[#3B4D30] rounded-[40px] shadow-lg overflow-hidden p-6 space-y-5 relative">
              
              <div className="w-24 h-3 bg-[#3B4D30] rounded-full mx-auto" />

              <div className="flex items-center justify-between pb-3 border-b border-[#E5EBE6]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#3B4D30] text-[#F7F7F2] flex items-center justify-center font-bold text-xs shadow-xs">
                    EY
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#3B4D30]">Mi Jardín Eywa</h4>
                    <span className="text-[10px] text-[#5A6D47]">3 cultivos activos</span>
                  </div>
                </div>
                <span className="text-[9px] bg-[#E5EBE6] text-[#3B4D30] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#5A6D47]/20">
                  Sincronizado
                </span>
              </div>

              {/* Interactive Reminders */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#5A6D47] block uppercase tracking-[0.2em]">
                  RECORDATORIOS DE HOY:
                </span>

                {activeReminders.map((rem) => (
                  <div
                    key={rem.id}
                    onClick={() => toggleReminder(rem.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      rem.done
                        ? 'bg-[#E5EBE6]/60 border-[#5A6D47]/20 text-[#5A6D47] line-through'
                        : 'bg-white border-[#3B4D30]/30 text-[#3B4D30] font-medium shadow-xs'
                    }`}
                  >
                    <div>
                      <span className="block font-serif font-bold">{rem.name}</span>
                      <span className="text-[10px] text-[#5A6D47]">{rem.task}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        rem.done ? 'bg-[#3B4D30] border-[#3B4D30] text-[#F7F7F2]' : 'border-[#E5EBE6] bg-white'
                      }`}
                    >
                      {rem.done && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#E5EBE6] rounded-2xl border border-[#5A6D47]/20 text-[11px] text-[#3B4D30] font-sans">
                💡 <strong className="font-serif">Consejo Eywa:</strong> El sol directo matutino potencia los aceites esenciales de tus plantas aromáticas.
              </div>

            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DEDICATED APP INSTALLATION & STEP-BY-STEP INSTRUCTIONS SECTION */}
        {/* ------------------------------------------------------------------ */}
        <div id="instalar-app" className="bg-[#F7F7F2] rounded-3xl p-6 sm:p-10 border border-[#5A6D47]/25 shadow-sm space-y-10">
          
          {/* Section Header with Main Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5EBE6]">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#5A6D47] block">
                INSTALACIÓN DIRECTA EN ANDROID
              </span>
              <h3 className="font-serif italic text-2xl sm:text-4xl text-[#3B4D30]">
                Descarga e instala la App Eywa
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#3B4D30]/80">
                Sigue estos sencillos pasos para instalar el paquete <strong>.APK</strong> en tu dispositivo Android y habilitar los permisos necesarios de forma segura.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
              <a
                href={EYWA_APP_APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#3B4D30] hover:bg-[#5A6D47] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                <Download className="w-5 h-5 text-[#E5EBE6]" />
                <div className="text-left">
                  <div className="leading-tight">Descargar APK Eywa</div>
                  <div className="text-[9px] font-normal text-[#E5EBE6]/80 lowercase">eywa-debug.apk · v1.0.0</div>
                </div>
              </a>
              <span className="text-[10px] text-[#5A6D47] font-medium">
                Compatible con Android 8.0 o superior
              </span>
            </div>
          </div>

          {/* 4 Step-by-Step Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider text-[#5A6D47]">
              <PackageCheck className="w-4 h-4 text-[#3B4D30]" />
              <span>Guía de instalación paso a paso:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Paso 1 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5EBE6] shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E5EBE6] text-[#3B4D30] font-serif font-bold text-sm flex items-center justify-center border border-[#5A6D47]/20">
                    1
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#3B4D30]">
                    Descarga el APK
                  </h4>
                  <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                    Haz clic en el botón <strong>"Descargar APK Eywa"</strong>. Tu navegador iniciará la descarga del archivo <code className="text-[11px] bg-[#E5EBE6] px-1 py-0.5 rounded text-[#3B4D30]">Eywa-debug.apk</code>.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-[#5A6D47] font-semibold flex items-center gap-1 border-t border-[#E5EBE6]">
                  <ArrowDownCircle className="w-3.5 h-3.5 text-[#3B4D30]" />
                  Descarga directa oficial
                </div>
              </div>

              {/* Paso 2 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5EBE6] shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E5EBE6] text-[#3B4D30] font-serif font-bold text-sm flex items-center justify-center border border-[#5A6D47]/20">
                    2
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#3B4D30]">
                    Abre el archivo
                  </h4>
                  <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                    Una vez termine la descarga, toca la <strong>notificación de descarga completa</strong> en la barra superior de tu teléfono, o búscalo en tu carpeta de <em>Descargas / Archivos</em>.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-[#5A6D47] font-semibold flex items-center gap-1 border-t border-[#E5EBE6]">
                  <Smartphone className="w-3.5 h-3.5 text-[#3B4D30]" />
                  Ejecutar el instalador
                </div>
              </div>

              {/* Paso 3 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5EBE6] shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E5EBE6] text-[#3B4D30] font-serif font-bold text-sm flex items-center justify-center border border-[#5A6D47]/20">
                    3
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#3B4D30]">
                    Confirma los permisos
                  </h4>
                  <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                    Si tu celular muestra el aviso <em>"Por seguridad tu teléfono no permite instalar apps desconocidas"</em>, toca en <strong>Ajustes / Configuración</strong> y activa <strong>"Permitir desde esta fuente"</strong> o <strong>"Confío en el remitente"</strong>.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-[#5A6D47] font-semibold flex items-center gap-1 border-t border-[#E5EBE6]">
                  <Settings className="w-3.5 h-3.5 text-[#3B4D30]" />
                  Habilitar instalación
                </div>
              </div>

              {/* Paso 4 */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5EBE6] shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E5EBE6] text-[#3B4D30] font-serif font-bold text-sm flex items-center justify-center border border-[#5A6D47]/20">
                    4
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#3B4D30]">
                    Instala y abre Eywa
                  </h4>
                  <p className="font-sans text-xs text-[#3B4D30]/80 leading-relaxed">
                    Vuelve a la pantalla anterior y pulsa en <strong>"Instalar"</strong>. Tras unos segundos, dale a <strong>"Abrir"</strong> y ¡listo! Podrás gestionar tus cultivos de inmediato.
                  </p>
                </div>
                <div className="pt-2 text-[10px] text-[#5A6D47] font-semibold flex items-center gap-1 border-t border-[#E5EBE6]">
                  <Check className="w-3.5 h-3.5 text-[#3B4D30]" />
                  ¡Todo listo para cultivar!
                </div>
              </div>

            </div>
          </div>

          {/* Security & Clarification Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#E5EBE6] border border-[#5A6D47]/25 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
            </div>
            <div className="text-xs font-sans text-[#3B4D30] space-y-0.5 flex-1">
              <span className="font-bold text-[#3B4D30] block">
                ¿Por qué Android muestra una advertencia de seguridad?
              </span>
              <p className="text-[#3B4D30]/80 leading-relaxed">
                Al instalar un archivo <code className="bg-white/70 px-1 py-0.2 rounded font-mono text-[11px]">.apk</code> descargado directamente y no desde Google Play Store, Android solicita confirmación como medida de precaución estándar. El instalador de Eywa es <strong>100% seguro y libre de publicidad</strong>.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


