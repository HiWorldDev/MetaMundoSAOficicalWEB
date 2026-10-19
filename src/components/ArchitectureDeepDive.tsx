import React from 'react';
import { ShieldCheck, Cpu, Code2, Sparkles, Check, AlertTriangle, Layers, Zap } from 'lucide-react';

interface ArchitectureDeepDiveProps {
  onOpenCodeModal: () => void;
}

export const ArchitectureDeepDive: React.FC<ArchitectureDeepDiveProps> = ({ onOpenCodeModal }) => {
  return (
    <section id="architecture-deepdive" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 inline-block mb-3">
          Estándar de Ingeniería Awwwards
        </span>
        <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Por qué esta arquitectura no falla
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Comparativa técnica entre la forma tradicional de usar ScrollTrigger (propensa a bugs y congelamientos) y el estándar con <code className="text-cyan-300 font-mono">gsap.context()</code>.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* The Risky / Legacy Way */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/10 border border-rose-500/20 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-500/20">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-white text-lg">Método Tradicional (Propicio a Fugas)</h3>
              <p className="text-xs font-mono text-rose-400">Sin gestión de ciclo de vida</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Fugas de memoria masivas:</strong> Al desmontar componentes, los listeners del scroll y timers de GSAP permanecen en el hilo principal.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Triggers fantasmas:</strong> ScrollTrigger busca elementos DOM que ya no existen, causando errores en consola y cálculos erráticos.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 font-bold">✕</span>
              <span><strong>Layout Thrashing:</strong> Animar propiedades como <code>top</code>, <code>left</code> o <code>height</code> fuerza el recalculado del árbol DOM en cada frame (caídas a &lt;30 FPS).</span>
            </div>
          </div>
        </div>

        {/* The Professional Awwwards Standard Way */}
        <div className="p-6 sm:p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-indigo-500/20">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-white text-lg">Estándar Awwwards (gsap.context)</h3>
              <p className="text-xs font-mono text-indigo-400">100% Hermético & 60 FPS</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Destrucción atómica con ctx.revert():</strong> Elimina automáticamente todos los ScrollTriggers, timelines, event listeners y resetea los estilos inline.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Aislamiento de selectores:</strong> Los selectores CSS se evalúan únicamente dentro del contenedor scoped, evitando colisiones con otras partes de la app.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Compositor de GPU Directo:</strong> Uso de matrices 3D (<code>translate3d</code>, <code>scale</code>, <code>rotate</code>) y <code>force3D: true</code> para 60 FPS sostenidos.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Code CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Obtén el código modular listo para producción
          </h3>
          <p className="text-zinc-400 text-sm max-w-xl">
            Disponible en archivo único HTML autónomo (con CDNs) o en módulo React / TypeScript para integrarlo en tu proyecto con un clic.
          </p>
        </div>
        <button
          id="architecture-open-code-btn"
          onClick={onOpenCodeModal}
          className="px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2.5 shadow-xl shadow-white/10 shrink-0 cursor-pointer active:scale-95"
        >
          <Code2 className="w-4 h-4 text-indigo-600" />
          <span>Ver & Copiar Código Completo</span>
        </button>
      </div>

    </section>
  );
};
