import React, { useEffect, useState } from 'react';
import { Sparkles, Play, ArrowRight, MessageSquare, Menu, X, Globe, Activity, Film, Terminal } from 'lucide-react';

interface NavigationProps {
  onOpenInquiry: () => void;
  onOpenShowreel: () => void;
  onReplayIntro?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenInquiry,
  onOpenShowreel,
  onReplayIntro,
}) => {
  const [fps, setFps] = useState<number>(60);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calculateFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.round((window.scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3.5 backdrop-blur-xl bg-[#090a10]/80 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-indigo-500/40 p-1 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:border-cyan-400/60 transition-all">
            <svg className="w-full h-full transform group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" stroke="#6366f1" strokeWidth="6" fill="#121420" />
              <polygon points="50,14 82,32 50,50 18,32" fill="#6366f1" />
              <polygon points="18,32 50,50 50,86 18,68" fill="#818cf8" opacity="0.5" />
              <polygon points="50,50 82,32 82,68 50,86" fill="#06b6d4" opacity="0.8" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne font-extrabold text-sm md:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                METAMUNDO MOTION
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block font-mono">
              Kinetic Web & Digital Studio
            </p>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-zinc-400">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-bold"
            >
              <Film className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Intro 7s 4K</span>
            </button>
          )}
          <button
            onClick={() => scrollTo('horizontal-stream-section')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-zinc-200"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold">Torre 3D & Flow Glass</span>
          </button>
          <button
            onClick={() => scrollTo('quantum-terminal-section')}
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5 text-zinc-300"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Terminal Cuántico</span>
          </button>
          <button
            onClick={onOpenShowreel}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-current text-indigo-400" />
            <span>Showreel 4K</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* Availability Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Q3/Q4 Disponible</span>
          </div>

          {/* Showreel Button */}
          <button
            onClick={onOpenShowreel}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs font-syne font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current text-cyan-400" />
            <span className="hidden xs:inline">Showreel</span>
          </button>

          {/* Let's Talk / Inquiry CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="px-4 sm:px-5 py-2 rounded-xl text-xs font-syne font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Iniciar Proyecto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-2xl bg-zinc-950/95 border border-white/10 space-y-3 animate-fade-in text-sm font-syne font-semibold">
          <button
            onClick={() => scrollTo('horizontal-stream-section')}
            className="w-full text-left py-2 text-zinc-300 hover:text-white block border-b border-white/5 flex items-center justify-between"
          >
            <span>Torre 3D & Flow Glass</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">En Vivo</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenShowreel();
            }}
            className="w-full text-left py-2 text-zinc-300 hover:text-white block border-b border-white/5 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current text-indigo-400" />
            <span>Ver Showreel 4K</span>
          </button>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400">● 60 FPS GPU Verified</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
            >
              Iniciar Proyecto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
