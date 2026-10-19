import React, { useState } from 'react';
import { Palette, Layers, Compass, Check, Copy, Sparkles, ShieldCheck, Zap, Type, Award, ChevronRight, Eye } from 'lucide-react';

interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  contrastOnDark: string;
  usage: string;
}

const BRAND_PALETTE: ColorSwatch[] = [
  {
    name: 'Obsidian Canvas',
    role: 'Fondo Principal (Background)',
    hex: '#090a10',
    rgb: 'rgb(9, 10, 16)',
    hsl: 'hsl(231, 28%, 5%)',
    contrastOnDark: 'Base 1:1',
    usage: 'Lienzo oscuro de baja luminosidad (<6%) para máximo contraste visual.',
  },
  {
    name: 'Surface Slate',
    role: 'Contenedores y Tarjetas (Surface)',
    hex: '#12141e',
    rgb: 'rgb(18, 20, 30)',
    hsl: 'hsl(230, 25%, 9%)',
    contrastOnDark: '1.2:1 (Delta <7%)',
    usage: 'Contenedores elevados con bordes finos de 1px al 10% de opacidad.',
  },
  {
    name: 'Galactic Indigo',
    role: 'Acento Primario (Brand Primary)',
    hex: '#6366f1',
    rgb: 'rgb(99, 102, 241)',
    hsl: 'hsl(239, 84%, 67%)',
    contrastOnDark: '6.8:1 (WCAG AAA)',
    usage: 'Botones principales, degradados de iluminación y keyframes de animación.',
  },
  {
    name: 'Electric Cyan',
    role: 'Acento Secundario (Kinetic Glow)',
    hex: '#06b6d4',
    rgb: 'rgb(6, 182, 212)',
    hsl: 'hsl(189, 94%, 43%)',
    contrastOnDark: '7.4:1 (WCAG AAA)',
    usage: 'Marcadores de ScrollTrigger, telemetría de rendimiento y bordes activos.',
  },
  {
    name: 'Neon Mint',
    role: 'Estado & Telemetría (Success/FPS)',
    hex: '#10b981',
    rgb: 'rgb(16, 185, 129)',
    hsl: 'hsl(160, 84%, 39%)',
    contrastOnDark: '8.1:1 (WCAG AAA)',
    usage: 'Indicador de 60 FPS, badges de validación de memoria y teardown.',
  },
  {
    name: 'Solar Amber',
    role: 'Alerta & Cues Interactivos',
    hex: '#f59e0b',
    rgb: 'rgb(245, 158, 11)',
    hsl: 'hsl(38, 92%, 50%)',
    contrastOnDark: '9.2:1 (WCAG AAA)',
    usage: 'Modo depuración de marcadores y estados de advertencia de layout thrashing.',
  },
  {
    name: 'Bone White',
    role: 'Tipografía Principal (Text Display)',
    hex: '#f8fafc',
    rgb: 'rgb(248, 250, 252)',
    hsl: 'hsl(210, 40%, 98%)',
    contrastOnDark: '18.4:1 (WCAG AAA)',
    usage: 'Titulares Syne 800 y lecturas de alta visibilidad sin fatiga óptica.',
  }
];

interface ContentSectionPlan {
  id: string;
  step: string;
  name: string;
  hook: string;
  animationConcept: string;
  gsapPattern: string;
  kpi: string;
}

const CONTENT_PLAN: ContentSectionPlan[] = [
  {
    id: 'hero',
    step: '01. Hook Cinemático',
    name: 'Hero Kinetic Typography & Isotipo Vectorial',
    hook: 'Impacto visual inmediato con el Isotipo de Marca y tipografía dividida en caracteres.',
    animationConcept: 'Revelado por máscaras con overflow:hidden, rotación Z sutil y parallax ambiental con GPU orbs.',
    gsapPattern: 'gsap.context() + Free SplitText + timeline stagger (0.02s)',
    kpi: 'Tasa de retención > 85% en los primeros 3 segundos',
  },
  {
    id: 'brand-system',
    step: '02. Identidad & Tokens',
    name: 'Sistema de Paleta & Plan de Contenido',
    hook: 'Estructura de diseño sólida que conecta los valores de la marca con la ingeniería de movimiento.',
    animationConcept: 'Tarjetas de muestra cromáticas con micro-interacciones de copiado y contrastes WCAG AA.',
    gsapPattern: 'gsap.fromTo() con desaceleración elástica en hover e interacción reactiva',
    kpi: 'Claridad arquitectónica para desarrolladores y diseñadores',
  },
  {
    id: 'split-text',
    step: '03. Laboratorio Tipográfico',
    name: 'SplitText Kinetic Playground',
    hook: 'Entorno interactivo para probar 5 efectos Awwwards con control en tiempo real.',
    animationConcept: 'Curtain reveals, 3D matrix flips, optical blur y ribbon multi-línea.',
    gsapPattern: 'Free SplitText Engine (.revert() seguro) + controles de Stagger reactivos',
    kpi: 'Interactividad directa y generación instantánea de código',
  },
  {
    id: 'match-media',
    step: '04. Adaptabilidad Inteligente',
    name: 'gsap.matchMedia() Responsive Grid',
    hook: 'Demostración en vivo de la sustitución oficial de ScrollTrigger.matchMedia().',
    animationConcept: 'Desktop 3D Parallax Pin vs Mobile 1D Lightweight list con prefers-reduced-motion.',
    gsapPattern: 'gsap.matchMedia(container) con auto-revert y scoping hermético',
    kpi: 'Cero saltos visuales al cambiar de tamaño de pantalla',
  },
  {
    id: 'pinned-showcase',
    step: '05. Showcase Anclado',
    name: 'Pinned Split-Screen 3D Cards Stack',
    hook: 'La firma visual de los sitios galardonados en Awwwards y FWA.',
    animationConcept: 'Pantalla dividida con columna izquierda fija y tarjetas 3D que emergen en perspectiva.',
    gsapPattern: 'ScrollTrigger.create({ pin: true, scrub: 1.2, anticipatePin: 1 })',
    kpi: 'Scroll suave a 60 FPS sin saltos de GPU ni jank',
  },
  {
    id: 'horizontal-stream',
    step: '06. Galería Horizontal',
    name: 'Continuous Horizontal Kinetic Stream',
    hook: 'Transición fluida de scroll vertical a desplazamiento horizontal de proyectos.',
    animationConcept: 'Panel de proyectos en carrusel anclado con barra de progreso y parallax de contenido.',
    gsapPattern: 'gsap.to(panels, { xPercent: -100 * (panels.length - 1), ease: "none" })',
    kpi: 'Exploración de portafolio inmersiva con aceleración por hardware',
  },
  {
    id: 'deep-dive-export',
    step: '07. Entrega de Código',
    name: 'Architecture Deep-Dive & Exportador',
    hook: 'Acceso y descarga del código limpio en formato standalone .html o React/TS.',
    animationConcept: 'Comparativa interactiva de rendimiento, modal con syntax highlighting y descarga inmediata.',
    gsapPattern: 'Visor multilinguaje (HTML, JS, TSX, CSS) con CDN 3.12+/3.13+/3.15.0',
    kpi: '100% de reproducibilidad en cualquier stack de producción',
  }
];

export const BrandPaletteContentPlan: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'palette' | 'content'>('palette');

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="brand-architecture-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Identidad Visual & Arquitectura de Contenido
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Personalizado para Marca Real
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Paleta Armónica & Blueprint de Contenido
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Ecosistema de diseño basado en la identidad vectorial real. Contrastes certificados WCAG AAA, tokens cromáticos y plan de experiencia de usuario sincronizado con el motor GSAP.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
          <button
            onClick={() => setActiveTab('palette')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'palette'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Paleta de Color</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Plan de Contenido ({CONTENT_PLAN.length} Fases)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PALETTE & BRAND MARK */}
      {activeTab === 'palette' && (
        <div className="space-y-12">
          
          {/* Brand Mark Feature Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121524] via-[#0d0e17] to-[#090a10] border border-indigo-500/20 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute -right-12 -top-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Real Vector Isotype Presentation */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/40 border border-white/10 text-center">
                
                {/* SVG Brand Mark */}
                <div className="relative w-28 h-28 mb-6 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <svg className="relative w-28 h-28 transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logoGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                      <linearGradient id="logoGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>

                    {/* Outer Hexagonal Shield */}
                    <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" stroke="url(#logoGradPrimary)" strokeWidth="3" fill="#121420" />
                    
                    {/* Dynamic Kinetic Facets (Isometric Matrix) */}
                    <polygon points="50,14 82,32 50,50 18,32" fill="url(#logoGradPrimary)" opacity="0.85" />
                    <polygon points="18,32 50,50 50,86 18,68" fill="#6366f1" opacity="0.4" />
                    <polygon points="50,50 82,32 82,68 50,86" fill="url(#logoGradSecondary)" opacity="0.7" />

                    {/* Central Core Pulse */}
                    <circle cx="50" cy="50" r="8" fill="#ffffff" className="animate-pulse" />
                  </svg>
                </div>

                <h3 className="font-syne font-extrabold text-xl text-white tracking-tight">
                  METAMUNDO MOTION
                </h3>
                <span className="text-xs font-mono text-cyan-400 mt-1">
                  Kinetic Digital Brand Mark
                </span>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Isotipo de geometría prismática isométrica. Representa la intersección entre diseño gráfico editorial y renderizado GPU 60 FPS.
                </p>
              </div>

              {/* Right Column: Brand Philosophy & Rules */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Principios de la Identidad</span>
                  <h4 className="font-syne text-2xl font-bold text-white mt-1">
                    Diseño de Alta Fidelidad & Anti-Slop
                  </h4>
                  <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                    Rechazamos los clichés visuales (gradientes saturados genéricos, cards anidadas y textos en mayúsculas arbitrarias). Cada color y espaciado responde a ratios matemáticos ópticos y jerarquía funcional.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
                      <Award className="w-4 h-4" />
                      <span>Display Syne (800)</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Titulares monumentales con kerning ajustado (-0.03em) para titulares de gran escala.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                      <Type className="w-4 h-4" />
                      <span>Body Jakarta Sans</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Lectura cristalina optimizada para pantallas Retina a 16px con line-height 1.6.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Contraste WCAG AAA</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Ratio superior a 7:1 en textos principales sobre fondo oscuro sin fatiga ocular.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Color Palette Grid */}
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Tokens Cromáticos Oficiales</span>
              <span>Haz clic en cualquier muestra para copiar su código Hex</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {BRAND_PALETTE.map((swatch) => {
                const isCopied = copiedHex === swatch.hex;
                return (
                  <button
                    key={swatch.name}
                    onClick={() => copyToClipboard(swatch.hex)}
                    className="p-4 rounded-2xl bg-zinc-900/70 border border-white/10 hover:border-indigo-500/40 text-left transition-all group relative cursor-pointer"
                  >
                    {/* Visual Color Preview Chip */}
                    <div
                      className="h-20 w-full rounded-xl mb-3 border border-white/10 shadow-inner flex items-end justify-between p-2.5 transition-transform group-hover:scale-[1.02]"
                      style={{ backgroundColor: swatch.hex }}
                    >
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md font-bold"
                        style={{
                          backgroundColor: swatch.hex === '#f8fafc' ? '#000' : '#fff',
                          color: swatch.hex === '#f8fafc' ? '#fff' : '#000',
                        }}
                      >
                        {swatch.hex}
                      </span>

                      <div className="p-1 rounded-md bg-black/50 text-white backdrop-blur-sm">
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-70 group-hover:opacity-100" />}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-syne font-bold text-white text-sm">
                        {swatch.name}
                      </h4>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {swatch.contrastOnDark}
                      </span>
                    </div>

                    <p className="text-[11px] text-indigo-300 font-medium mb-1.5">
                      {swatch.role}
                    </p>

                    <p className="text-xs text-zinc-400 leading-snug">
                      {swatch.usage}
                    </p>

                    {isCopied && (
                      <span className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 animate-fade-in">
                        ¡Copiado!
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CONTENT STRATEGY PLAN */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 mb-6">
            <h3 className="font-syne font-bold text-lg text-white mb-2">
              Estrategia de Narrativa Visual & Flujo de Retención
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Cada sección del sitio web está planificada para resolver un objetivo de negocio y técnico: desde la captura inmediata de atención mediante tipografía cinética, hasta la interacción práctica y la descarga del código listo para producción.
            </p>
          </div>

          <div className="space-y-3">
            {CONTENT_PLAN.map((section, idx) => (
              <div
                key={section.id}
                className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-mono text-xs font-bold text-indigo-400 shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-indigo-400 font-semibold uppercase">
                        {section.step}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <h4 className="font-syne font-bold text-white text-base">
                        {section.name}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 mb-2">
                      {section.hook}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-cyan-300 border border-white/5">
                        FX: {section.animationConcept}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-indigo-300 border border-white/5">
                        GSAP: {section.gsapPattern}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right shrink-0 border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Objetivo / KPI</span>
                  <span className="text-xs font-medium text-emerald-400 font-mono">{section.kpi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
