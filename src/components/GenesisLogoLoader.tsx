import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Zap, ShieldCheck, FastForward } from 'lucide-react';

interface GenesisLogoLoaderProps {
  onComplete: () => void;
  isOpen: boolean;
}

export const GenesisLogoLoader: React.FC<GenesisLogoLoaderProps> = ({
  onComplete,
  isOpen,
}) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('SINTETIZANDO NODO MADRE...');
  const [isExpanding, setIsExpanding] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle futuristic audio pulse
  const playQuantumChime = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      
      // Dual harmonic sine bell (432Hz & 864Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, now);
      osc1.frequency.exponentialRampToValueAtTime(576, now + 0.8);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(864, now);
      osc2.frequency.exponentialRampToValueAtTime(1152, now + 0.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch {
      // Audio context silently ignored
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // 3.5-second smooth progressive build
    const TOTAL_DURATION = 3500;
    const intervalTime = 40;
    const increment = (intervalTime / TOTAL_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        
        if (next < 30) {
          setPhaseText('SINTETIZANDO NODO MADRE...');
        } else if (next < 65) {
          setPhaseText('ACTIVANDO LAVA NEGRA & OBSIDIANA...');
        } else if (next < 90) {
          setPhaseText('ENSAMBLANDO ARQUITECTURA 3D A 60 FPS...');
        } else {
          setPhaseText('EXPERIENCIA METAMUNDO LISTA');
        }

        if (next >= 100) {
          clearInterval(timer);
          triggerUnlock();
          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen]);

  const triggerUnlock = () => {
    playQuantumChime();
    setIsExpanding(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      id="genesis-logo-loader"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#040507] text-white select-none overflow-hidden transition-all duration-700 ${
        isExpanding ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Ambient Background Grid & Energy Core Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-cyan-400/15 rounded-full blur-[140px] animate-pulse" />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.4) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* 2. Central Assembly Chamber: Logo + Dual Rotating Quantum Rings */}
      <div className="relative flex flex-col items-center justify-center z-20">
        
        {/* Outer Orbiting Energy Halo */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
          
          {/* Ring 1 - Fast Clockwise Cyan */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-[spin_3s_linear_infinite]"
          />

          {/* Ring 2 - Counter-Clockwise Indigo Dash */}
          <div 
            className="absolute -inset-4 rounded-full border border-dashed border-indigo-400/40 animate-[spin_8s_linear_infinite_reverse]"
          />

          {/* Ring 3 - Micro Dots */}
          <div className="absolute -inset-8 rounded-full border border-cyan-500/15 animate-pulse" />

          {/* The High-Precision Metamundo 3D Isotype */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-zinc-950/90 border-2 border-cyan-400 p-4 flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,0.6)] backdrop-blur-2xl transform transition-transform duration-500 hover:scale-105">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" stroke="#38bdf8" strokeWidth="4" fill="#080c18" className="drop-shadow-[0_0_12px_#38bdf8]" />
              <polygon points="50,14 82,32 50,50 18,32" fill="#06b6d4" opacity="0.95" />
              <polygon points="18,32 50,50 50,86 18,68" fill="#6366f1" opacity="0.8" />
              <polygon points="50,50 82,32 82,68 50,86" fill="#38bdf8" opacity="0.9" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" className="animate-ping opacity-75" />
              <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
            </svg>
            
            {/* Bottom MCP Socket Glow */}
            <div className="absolute -bottom-1.5 w-8 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#38bdf8] animate-pulse" />
          </div>

        </div>

        {/* 3. Numeric Counter & Live Telemetry */}
        <div className="flex flex-col items-center gap-3 max-w-sm text-center px-4">
          
          {/* Large Monospace Percentage */}
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-widest flex items-center gap-1 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">
            <span>{Math.min(100, Math.round(progress))}</span>
            <span className="text-cyan-400 text-xl">%</span>
          </div>

          {/* Phase Telemetry Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-wider shadow-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{phaseText}</span>
          </div>

          {/* Linear Glowing Progress Track */}
          <div className="w-64 sm:w-80 h-1.5 rounded-full bg-zinc-900 overflow-hidden relative shadow-inner mt-2 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-white transition-all duration-75 ease-linear shadow-[0_0_15px_#06b6d4]"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

      </div>

      {/* 4. Bottom Skip Action */}
      <button
        onClick={triggerUnlock}
        className="absolute bottom-8 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-400 hover:text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
      >
        <span>ENTRAR DIRECTO</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
