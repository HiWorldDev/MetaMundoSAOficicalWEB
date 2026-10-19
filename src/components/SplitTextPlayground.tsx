import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitText, SplitTextResult } from '../utils/splitText';
import { Play, RotateCcw, Copy, Check, Type, Sparkles, Sliders, Layers, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type AnimationPreset = 'curtain-mask' | '3d-flip' | 'blur-scatter' | 'wave-glow' | 'line-slide';

interface PresetConfig {
  id: AnimationPreset;
  name: string;
  badge: string;
  description: string;
  codeSnippet: string;
}

const PRESETS: PresetConfig[] = [
  {
    id: 'curtain-mask',
    name: '01. Curtain Reveal (Masked Overflow)',
    badge: 'Awwwards Classic',
    description: 'Envoltorio con overflow: hidden y traslación vertical Y: 110% con stagger suave y curva de desaceleración cúbica.',
    codeSnippet: `// 1. Dividir texto con máscara envolvente
const { chars, revert } = splitText(".my-text", {
  types: ["chars"],
  maskChars: true
});

// 2. Animación de revelado
gsap.fromTo(chars, 
  { y: "115%", rotateZ: 3, opacity: 0 },
  {
    y: "0%",
    rotateZ: 0,
    opacity: 1,
    duration: 1.1,
    stagger: 0.025,
    ease: "power4.out"
  }
);`,
  },
  {
    id: '3d-flip',
    name: '02. 3D Perspective Matrix Flip',
    badge: 'Dimensional FX',
    description: 'Rotación tridimensional sobre el eje X con perspectiva forzada y aceleración en hardware GPU.',
    codeSnippet: `// 1. Dividir texto
const { chars } = splitText(".my-text", { types: ["chars"] });

// 2. Flip 3D con perspectiva
gsap.fromTo(chars,
  { 
    opacity: 0, 
    rotateX: -90, 
    y: 40, 
    transformOrigin: "50% 50% -50px" 
  },
  {
    opacity: 1,
    rotateX: 0,
    y: 0,
    duration: 1.2,
    stagger: 0.03,
    ease: "back.out(1.7)"
  }
);`,
  },
  {
    id: 'blur-scatter',
    name: '03. Optical Blur & Diffusion',
    badge: 'Modern Aesthetic',
    description: 'Difusión de filtro gaussiano (blur: 16px) a nitidez cristalina sincronizado con escalado.',
    codeSnippet: `// 1. Dividir por palabras o caracteres
const { chars } = splitText(".my-text", { types: ["chars"] });

// 2. Dispersión óptica
gsap.fromTo(chars,
  {
    opacity: 0,
    filter: "blur(16px)",
    scale: 1.8,
    y: -20
  },
  {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    duration: 0.9,
    stagger: { amount: 0.6, from: "center" },
    ease: "power2.out"
  }
);`,
  },
  {
    id: 'wave-glow',
    name: '04. Kinetic Wave & Accent Glow',
    badge: 'Liquid Motion',
    description: 'Onda sinusoidal propagada desde el centro con iluminación cromática en tiempo real.',
    codeSnippet: `// 1. Dividir texto
const { chars } = splitText(".my-text", { types: ["chars"] });

// 2. Onda cinemática
gsap.fromTo(chars,
  { y: 30, color: "#818cf8", opacity: 0.2 },
  {
    y: 0,
    color: "#ffffff",
    opacity: 1,
    duration: 0.8,
    stagger: {
      each: 0.04,
      from: "start",
      ease: "sine.inOut"
    },
    ease: "elastic.out(1, 0.4)"
  }
);`,
  },
  {
    id: 'line-slide',
    name: '05. Multi-line Smart Ribbon Reveal',
    badge: 'Editorial Layout',
    description: 'Detección automática de saltos de línea (offsetTop) y animación agrupada por filas de texto.',
    codeSnippet: `// 1. Dividir texto agrupado por líneas reales
const { lines } = splitText(".my-text", {
  types: ["lines", "words"],
  maskLines: true
});

// 2. Despliegue editorial por líneas
gsap.fromTo(lines,
  { y: "100%", opacity: 0 },
  {
    y: "0%",
    opacity: 1,
    duration: 1.1,
    stagger: 0.15,
    ease: "power3.out"
  }
);`,
  }
];

export const SplitTextPlayground: React.FC = () => {
  const [activePreset, setActivePreset] = useState<AnimationPreset>('curtain-mask');
  const [customText, setCustomText] = useState<string>(
    'ARQUITECTURA DE MOVIMIENTO AWWWARDS'
  );
  const [staggerVal, setStaggerVal] = useState<number>(0.025);
  const [copied, setCopied] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const textTargetRef = useRef<HTMLHeadingElement | null>(null);
  const splitInstanceRef = useRef<SplitTextResult | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const activeConfig = PRESETS.find((p) => p.id === activePreset) || PRESETS[0];

  const runAnimation = () => {
    const target = textTargetRef.current;
    if (!target) return;

    // Kill any existing running animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Revert previous DOM splitting cleanly
    if (splitInstanceRef.current) {
      splitInstanceRef.current.revert();
    }

    // Set clean inner text
    target.textContent = customText;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });
    timelineRef.current = tl;

    if (activePreset === 'curtain-mask') {
      const split = splitText(target, { types: ['chars'], maskChars: true });
      splitInstanceRef.current = split;

      tl.fromTo(
        split.chars,
        { y: '120%', opacity: 0, rotateZ: 4 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 1.1,
          stagger: staggerVal,
          ease: 'power4.out',
          force3D: true,
        }
      );
    } else if (activePreset === '3d-flip') {
      const split = splitText(target, { types: ['chars'] });
      splitInstanceRef.current = split;

      tl.fromTo(
        split.chars,
        {
          opacity: 0,
          rotateX: -95,
          y: 45,
          transformPerspective: 800,
          transformOrigin: '50% 50% -40px',
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          stagger: staggerVal * 1.2,
          ease: 'back.out(1.8)',
          force3D: true,
        }
      );
    } else if (activePreset === 'blur-scatter') {
      const split = splitText(target, { types: ['chars'] });
      splitInstanceRef.current = split;

      tl.fromTo(
        split.chars,
        {
          opacity: 0,
          filter: 'blur(20px)',
          scale: 1.9,
          y: -25,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: { amount: staggerVal * 25, from: 'center' },
          ease: 'power3.out',
          force3D: true,
        }
      );
    } else if (activePreset === 'wave-glow') {
      const split = splitText(target, { types: ['chars'] });
      splitInstanceRef.current = split;

      tl.fromTo(
        split.chars,
        { y: 35, color: '#818cf8', opacity: 0.1, scale: 0.8 },
        {
          y: 0,
          color: '#ffffff',
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: {
            each: staggerVal * 1.5,
            from: 'start',
            ease: 'sine.inOut',
          },
          ease: 'elastic.out(1, 0.45)',
          force3D: true,
        }
      );
    } else if (activePreset === 'line-slide') {
      const split = splitText(target, { types: ['lines', 'words'], maskLines: true });
      splitInstanceRef.current = split;

      tl.fromTo(
        split.lines,
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
          force3D: true,
        }
      );
    }
  };

  useEffect(() => {
    runAnimation();
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (splitInstanceRef.current) splitInstanceRef.current.revert();
    };
  }, [activePreset, staggerVal]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeConfig.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      ref={containerRef}
      id="split-text-playground"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" />
              Free SplitText Plugin Engine
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-white/10">
              100% Free & Open Source
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Laboratorio de Tipografía Cinética
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Alternativa gratuita y sin dependencias al plugin de pago de GreenSock. Soporta división en caracteres, palabras y líneas con enmascaramiento y <code className="text-cyan-300 font-mono">.revert()</code>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            id="replay-split-animation-btn"
            onClick={runAnimation}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Repetir Animación</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Preset Selector & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Efectos de Animación</span>
            <span>{PRESETS.length} Presets</span>
          </div>

          <div className="space-y-2">
            {PRESETS.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 border-indigo-500/50 shadow-lg shadow-indigo-950/40'
                      : 'bg-zinc-950/60 border-white/5 hover:border-white/15 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-syne font-bold text-sm ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                      {preset.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-zinc-800/80 text-zinc-400 border-white/5'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Real-time Stagger Slider */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 mt-6">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Stagger Delay:
              </span>
              <span className="text-indigo-400 font-bold">{staggerVal}s</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.08"
              step="0.005"
              value={staggerVal}
              onChange={(e) => setStaggerVal(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>Rápido (0.005s)</span>
              <span>Cinemático (0.08s)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Canvas & Code Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live Stage Display */}
          <div className="relative min-h-[280px] sm:min-h-[320px] rounded-3xl bg-gradient-to-b from-[#10121c] to-[#0a0b12] border border-white/15 p-8 sm:p-12 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl">
            
            {/* Ambient Backlight */}
            <div className="pointer-events-none absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            {/* Target Kinetic Headline */}
            <h3
              ref={textTargetRef}
              className="font-syne text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] max-w-xl mx-auto select-none"
            >
              {customText}
            </h3>

            {/* Live Indicator */}
            <div className="absolute bottom-4 right-5 flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>{isAnimating ? 'Animando...' : 'Listo'}</span>
            </div>
          </div>

          {/* Interactive Text Input */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center gap-3">
            <Type className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Escribe tu texto personalizado..."
              className="bg-transparent text-sm text-white focus:outline-none w-full placeholder:text-zinc-600 font-medium"
            />
            <button
              onClick={runAnimation}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-300 transition-all shrink-0 cursor-pointer"
            >
              Aplicar
            </button>
          </div>

          {/* Generated Code Snippet Box */}
          <div className="rounded-2xl bg-[#08090f] border border-white/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-zinc-950/80">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Código GSAP ({activeConfig.id})</span>
              </div>
              <button
                id="copy-preset-code-btn"
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre className="p-5 font-mono text-xs text-indigo-200 overflow-x-auto selection:bg-indigo-500">
              <code>{activeConfig.codeSnippet}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
