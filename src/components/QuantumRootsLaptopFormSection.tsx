import React, { useState, useRef, useEffect, useCallback } from 'react';
import cyberOfficeViewImg from '../assets/images/cyber_office_view_1786787350131.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Laptop, 
  Cpu, 
  Zap, 
  Sparkles, 
  Terminal, 
  Send, 
  CheckCircle2, 
  Wifi, 
  Volume2, 
  VolumeX, 
  Activity, 
  RefreshCw,
  Atom,
  Keyboard,
  Radio,
  Share2,
  Layers,
  Lock,
  Compass,
  Server,
  Building2,
  HardDrive,
  Monitor,
  ShieldAlert,
  Bot,
  Coffee,
  SunMedium,
  Smartphone,
  Code2,
  MousePointerClick
} from 'lucide-react';
import { WhatsAppLaserAssistant } from './WhatsAppLaserAssistant';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface QuantumRootsLaptopFormSectionProps {
  onOpenShowreel?: () => void;
}

// Complete ANSI Physical Keyboard Matrix with real positions
interface KeyModel {
  char: string;
  shiftChar?: string;
  code: string;
  label: string;
  width?: string;
  isSpecial?: boolean;
}

const KEYBOARD_GRID: KeyModel[][] = [
  // ROW 1: Numbers
  [
    { char: 'Escape', code: 'Escape', label: 'ESC', width: 'w-7 sm:w-9', isSpecial: true },
    { char: '1', shiftChar: '!', code: 'Digit1', label: '1' },
    { char: '2', shiftChar: '@', code: 'Digit2', label: '2' },
    { char: '3', shiftChar: '#', code: 'Digit3', label: '3' },
    { char: '4', shiftChar: '$', code: 'Digit4', label: '4' },
    { char: '5', shiftChar: '%', code: 'Digit5', label: '5' },
    { char: '6', shiftChar: '^', code: 'Digit6', label: '6' },
    { char: '7', shiftChar: '&', code: 'Digit7', label: '7' },
    { char: '8', shiftChar: '*', code: 'Digit8', label: '8' },
    { char: '9', shiftChar: '(', code: 'Digit9', label: '9' },
    { char: '0', shiftChar: ')', code: 'Digit0', label: '0' },
    { char: '-', shiftChar: '_', code: 'Minus', label: '-' },
    { char: 'Backspace', code: 'Backspace', label: 'DEL', width: 'w-8 sm:w-11', isSpecial: true },
  ],
  // ROW 2: QWERTY
  [
    { char: 'Tab', code: 'Tab', label: 'TAB', width: 'w-8 sm:w-10', isSpecial: true },
    { char: 'q', code: 'KeyQ', label: 'Q' },
    { char: 'w', code: 'KeyW', label: 'W' },
    { char: 'e', code: 'KeyE', label: 'E' },
    { char: 'r', code: 'KeyR', label: 'R' },
    { char: 't', code: 'KeyT', label: 'T' },
    { char: 'y', code: 'KeyY', label: 'Y' },
    { char: 'u', code: 'KeyU', label: 'U' },
    { char: 'i', code: 'KeyI', label: 'I' },
    { char: 'o', code: 'KeyO', label: 'O' },
    { char: 'p', code: 'KeyP', label: 'P' },
    { char: '[', code: 'BracketLeft', label: '[' },
    { char: ']', code: 'BracketRight', label: ']' },
  ],
  // ROW 3: ASDF
  [
    { char: 'CapsLock', code: 'CapsLock', label: 'CAPS', width: 'w-9 sm:w-11', isSpecial: true },
    { char: 'a', code: 'KeyA', label: 'A' },
    { char: 's', code: 'KeyS', label: 'S' },
    { char: 'd', code: 'KeyD', label: 'D' },
    { char: 'f', code: 'KeyF', label: 'F' },
    { char: 'g', code: 'KeyG', label: 'G' },
    { char: 'h', code: 'KeyH', label: 'H' },
    { char: 'j', code: 'KeyJ', label: 'J' },
    { char: 'k', code: 'KeyK', label: 'K' },
    { char: 'l', code: 'KeyL', label: 'L' },
    { char: ';', code: 'Semicolon', label: ';' },
    { char: 'Enter', code: 'Enter', label: 'RET', width: 'w-9 sm:w-12', isSpecial: true },
  ],
  // ROW 4: ZXCV
  [
    { char: 'Shift', code: 'ShiftLeft', label: 'SHIFT', width: 'w-10 sm:w-12', isSpecial: true },
    { char: 'z', code: 'KeyZ', label: 'Z' },
    { char: 'x', code: 'KeyX', label: 'X' },
    { char: 'c', code: 'KeyC', label: 'C' },
    { char: 'v', code: 'KeyV', label: 'V' },
    { char: 'b', code: 'KeyB', label: 'B' },
    { char: 'n', code: 'KeyN', label: 'N' },
    { char: 'm', code: 'KeyM', label: 'M' },
    { char: ',', code: 'Comma', label: ',' },
    { char: '.', code: 'Period', label: '.' },
    { char: 'Shift', code: 'ShiftRight', label: 'SHIFT', width: 'w-10 sm:w-12', isSpecial: true },
  ],
];

export const QuantumRootsLaptopFormSection: React.FC<QuantumRootsLaptopFormSectionProps> = ({
  onOpenShowreel,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'webgl_3d',
    budget: '$15k - $30k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active Key States & Visual Particles
  const [pressedKeys, setPressedKeys] = useState<{ [key: string]: number }>({});
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; char: string; x: number }[]>([]);
  const [lastChar, setLastChar] = useState<string>('M');
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const [activeTheme, setActiveTheme] = useState<'cyan' | 'magenta' | 'emerald'>('cyan');

  // Mouse Dynamic 3D Tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Fast Mechanical Keyboard Sound
  const playThock = useCallback((freq = 420) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if (ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.35, ctx.currentTime + 0.035);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.035);
      }
    } catch {
      // Audio fallback
    }
  }, [soundEnabled]);

  // Trigger Physical Keypress Visual Effect & Floating Hologram Character
  const triggerKeyAction = useCallback((charOrCode: string) => {
    if (!charOrCode) return;
    const lower = charOrCode.toLowerCase();
    const cleanDisplay = charOrCode.length === 1 ? charOrCode.toUpperCase() : charOrCode;

    setPressedKeys((prev) => ({ ...prev, [lower]: Date.now() }));
    setLastChar(cleanDisplay);
    setKeystrokeCount((c) => c + 1);

    // Floating particle over the laptop keyboard
    const newId = Date.now() + Math.random();
    const posX = 20 + Math.random() * 60; // percentage
    setFloatingParticles((prev) => [...prev.slice(-4), { id: newId, char: cleanDisplay, x: posX }]);

    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 700);

    playThock(350 + Math.random() * 260);

    setTimeout(() => {
      setPressedKeys((prev) => {
        const n = { ...prev };
        delete n[lower];
        return n;
      });
    }, 200);
  }, [playThock]);

  // Hardware Keyboard Listener on PC / Mac
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      triggerKeyAction(e.key);
      if (e.code) triggerKeyAction(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKeyAction]);

  // GSAP ScrollTrigger timeline to handle smooth camera approach and desk spotlighting
  const deskWrapperRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const [activeInputMode, setActiveInputMode] = useState<'both' | 'laptop' | 'hud'>('both');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionEl = containerRef.current;
    const deskEl = deskWrapperRef.current;
    const laptopEl = laptopRef.current;
    const hudEl = hudRef.current;

    if (!sectionEl || !deskEl) return;

    // Create GSAP ScrollTrigger for the Office Studio entry & approaching zoom
    const ctx = gsap.context(() => {
      // 1. Smooth scroll-bound zoom timeline with pin for immersive entrance feeling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=1400',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Camera arrives at office door and zooms all the way into the desk surface
      tl.fromTo(
        deskEl,
        {
          scale: 0.72,
          rotateX: 18,
          y: 80,
          z: -250,
          opacity: 0.4,
          filter: 'blur(4px)',
        },
        {
          scale: 1.02,
          rotateX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
        }
      );

      if (hudEl) {
        tl.fromTo(
          hudEl,
          { opacity: 0.2, x: -60, scale: 0.88, rotateY: 15 },
          { opacity: 1, x: 0, scale: 1, rotateY: 0, ease: 'power2.out' },
          0
        );
      }

      if (laptopEl) {
        tl.fromTo(
          laptopEl,
          { opacity: 0.2, x: 60, scale: 0.88, rotateY: -15 },
          { opacity: 1, x: 0, scale: 1, rotateY: 0, ease: 'power2.out' },
          0
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Handle typing from form fields (Mobile or PC)
  const handleInputChange = (field: keyof typeof formData, val: string) => {
    const lastTyped = val.slice(-1) || 'DEL';
    triggerKeyAction(lastTyped);
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Subtle Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: normX * 5,
      y: -normY * 3,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    triggerKeyAction('Enter');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1400);
  };

  const projectTypes = [
    { id: 'webgl_3d', label: 'WebGL 3D & Inmersivo', icon: Sparkles },
    { id: 'blockchain', label: 'Arquitectura Blockchain', icon: Cpu },
    { id: 'branding_motion', label: 'Motion 3D & Branding', icon: Zap },
    { id: 'enterprise_ai', label: 'Plataforma AI Cuántica', icon: Radio },
  ];

  const budgetOptions = ['< $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

  // Calculate smooth camera approach / zoom values based on scroll
  const approachScale = 0.9 + scrollProgress * 0.12; // zooms from 0.9 to 1.02
  const approachZ = -50 + scrollProgress * 50; // moves forward in 3D
  const approachPitch = 10 - scrollProgress * 8; // tilts down as you arrive at the desk

  return (
    <section
      ref={containerRef}
      id="quantum-terminal-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-[#02050b] text-white overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* REAL PHOTOREALISTIC CORPORATE WEB AI ENGINEER OFFICE BACKDROP */}
      {/* ------------------------------------------------------------- */}
      
      {/* 1. Photorealistic 8K Penthouse Office Layer with GSAP Parallax & Zoom */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Cinematic Wide Penthouse Studio Background */}
        <img
          src={cyberOfficeViewImg}
          alt="Corporate Web AI Engineer Penthouse Office"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.15}) translateY(${-scrollProgress * 20}px)`,
            filter: 'brightness(0.55) contrast(1.15) saturate(1.2)',
          }}
        />

        {/* Ambient Dark Atmospheric Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040507]/90 via-[#02050b]/60 to-[#02050b]/95 mix-blend-multiply" />
        
        {/* Soft volumetric blue and cyan light rays from the windows */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-700"
          style={{
            background: activeTheme === 'cyan' 
              ? 'radial-gradient(ellipse at 50% 30%, rgba(0, 240, 255, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)'
              : activeTheme === 'magenta'
              ? 'radial-gradient(ellipse at 50% 30%, rgba(236, 72, 153, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 80%)'
              : 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Dynamic Scanlines & Perspective Floor Grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(600px) rotateX(60deg) translateY(100px)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Penthouse Ceiling Laser Track */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff]" />
      </div>

      {/* 2. Left AI Blade Server Tower Array (Physical Office Infrastructure) */}
      <div className="absolute left-3 lg:left-8 top-1/3 -translate-y-1/2 hidden xl:flex flex-col gap-3 p-3 rounded-2xl bg-black/70 border border-cyan-500/20 backdrop-blur-xl z-10 w-44 font-mono text-[9px] text-zinc-400 pointer-events-none shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-cyan-300">
          <div className="flex items-center gap-1.5 font-bold">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI BLADE 01-A</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <div className="space-y-1.5 text-[8px]">
          <div className="flex justify-between">
            <span>NEURAL LOAD:</span>
            <span className="text-emerald-400 font-bold">28.4%</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-cyan-400 animate-pulse" />
          </div>

          <div className="flex justify-between">
            <span>GPU INFERENCE:</span>
            <span className="text-cyan-300 font-bold">0.03ms</span>
          </div>
          <div className="flex justify-between">
            <span>UPTIME:</span>
            <span className="text-zinc-300">99.99%</span>
          </div>
        </div>

        {/* Blinking Rack Bus LEDs */}
        <div className="grid grid-cols-6 gap-1 pt-1.5 border-t border-white/10">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-emerald-400'} animate-pulse`} 
              style={{ animationDelay: `${i * 0.2}s` }} 
            />
          ))}
        </div>
      </div>

      {/* 3. Right Web AI Engineering Lab HUD Status */}
      <div className="absolute right-3 lg:right-8 top-1/3 -translate-y-1/2 hidden xl:flex flex-col gap-3 p-3 rounded-2xl bg-black/70 border border-indigo-500/20 backdrop-blur-xl z-10 w-44 font-mono text-[9px] text-zinc-400 pointer-events-none shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-indigo-300">
          <div className="flex items-center gap-1.5 font-bold">
            <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
            <span>ESTUDIO METAMUNDO</span>
          </div>
          <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>

        <div className="space-y-1 text-[8px]">
          <p>OFICINA: <strong className="text-white">WEB AI & 3D LAB</strong></p>
          <p>INGENIERO: <strong className="text-cyan-300">PRINCIPAL LEAD</strong></p>
          <p>CANAL: <strong className="text-emerald-400">WHATSAPP SYNC</strong></p>
        </div>

        <div className="p-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[8px] text-indigo-200 text-center">
          PENTHOUSE CORPORATIVO
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TOP HUD HEADER & LIVE SYNCHRONIZATION BADGE                   */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-500/20 to-purple-500/15 border border-cyan-400/40 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-xl">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span className="font-bold tracking-wider uppercase">OFICINA CORPORATIVA // WEB AI ENGINEER WORKSTATION</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        <h2 className="font-syne text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
          Estudio Web AI & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400">Estación de Propuestas 3D</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
          Ingresa al escritorio corporativo del <strong className="text-cyan-400 font-mono">Ingeniero Web AI de MetaMundo S.A.</strong> Teclea en el holograma interactivo o comunícate al instante con nuestro asistente mediante el <strong className="text-emerald-400 font-mono">proyector láser de WhatsApp</strong>.
        </p>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer active:scale-95 ${
              soundEnabled ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]' : 'bg-white/5 border-white/10 text-zinc-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <span>Sonido Teclas {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Pulsaciones: <strong className="text-cyan-400">{keystrokeCount}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono text-zinc-400 mr-1">NEÓN:</span>
            <button
              onClick={() => setActiveTheme('cyan')}
              className={`w-3.5 h-3.5 rounded-full transition-transform ${activeTheme === 'cyan' ? 'scale-125 ring-2 ring-white shadow-[0_0_8px_#00f0ff]' : 'opacity-40'} bg-[#00f0ff]`}
            />
            <button
              onClick={() => setActiveTheme('magenta')}
              className={`w-3.5 h-3.5 rounded-full transition-transform ${activeTheme === 'magenta' ? 'scale-125 ring-2 ring-white shadow-[0_0_8px_#ec4899]' : 'opacity-40'} bg-[#ec4899]`}
            />
            <button
              onClick={() => setActiveTheme('emerald')}
              className={`w-3.5 h-3.5 rounded-full transition-transform ${activeTheme === 'emerald' ? 'scale-125 ring-2 ring-white shadow-[0_0_8px_#10b981]' : 'opacity-40'} bg-[#10b981]`}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3D EXECUTIVE DESK & APPROACHING WORKSTATION CONTAINER         */}
      {/* ------------------------------------------------------------- */}
      <div 
        ref={deskWrapperRef}
        className="relative z-20 w-full max-w-7xl transition-all duration-700 ease-out"
        style={{
          perspective: '1500px',
          transform: `scale(${approachScale}) rotateX(${approachPitch + tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${approachZ}px)`,
        }}
      >
        
        {/* =========================================================== */}
        {/* PHYSICAL EXECUTIVE DESK MAT & CARBON WORKSTATION SURFACE    */}
        {/* =========================================================== */}
        <div 
          className="relative w-full rounded-[36px] p-4 sm:p-7 lg:p-9 border-2 transition-all duration-500 overflow-visible shadow-2xl"
          style={{
            background: 'linear-gradient(175deg, rgba(14, 22, 38, 0.95) 0%, rgba(8, 12, 22, 0.98) 45%, rgba(3, 5, 10, 0.99) 100%)',
            borderColor: activeTheme === 'cyan' ? 'rgba(0, 240, 255, 0.35)' : activeTheme === 'magenta' ? 'rgba(236, 72, 153, 0.35)' : 'rgba(16, 185, 129, 0.35)',
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.95), 0 0 50px rgba(0,240,255,0.15), inset 0 2px 4px rgba(255,255,255,0.2)',
          }}
        >
          {/* Ambient RGB Desk Edge Perimeter Underglow */}
          <div 
            className="absolute -inset-1 rounded-[40px] opacity-35 blur-lg pointer-events-none -z-10 transition-colors duration-500"
            style={{
              background: activeTheme === 'cyan' ? '#00f0ff' : activeTheme === 'magenta' ? '#ec4899' : '#10b981',
            }}
          />

          {/* DESK ACCESSORIES (Executive Office Realism) */}
          
          {/* A. Left Accessory: MetaMundo Insulated Coffee Tumbler */}
          <div className="absolute -top-5 left-6 hidden md:flex items-center gap-2 p-2 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-xl shadow-xl z-30 font-mono text-[9px] text-zinc-300">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-amber-500/40 flex items-center justify-center relative shadow-inner">
              <Coffee className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white/40 animate-ping" />
            </div>
            <div>
              <p className="font-bold text-white uppercase text-[8px]">METAMUNDO COFFEE</p>
              <p className="text-amber-400/80 text-[7px]">CALIENTE • 68°C</p>
            </div>
          </div>

          {/* B. Right Accessory: Smartphone Charging Dock with Live Sync */}
          <div className="absolute -top-5 right-6 hidden md:flex items-center gap-2 p-2 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-xl shadow-xl z-30 font-mono text-[9px] text-zinc-300">
            <div className="w-6 h-8 rounded-lg bg-zinc-950 border border-cyan-400/40 p-1 flex flex-col justify-between shadow-inner">
              <div className="w-2 h-0.5 rounded-full bg-white/30 mx-auto" />
              <div className="text-[6px] text-cyan-300 text-center font-bold">SYNC</div>
              <div className="w-1 h-1 rounded-full bg-emerald-400 mx-auto animate-ping" />
            </div>
            <div>
              <p className="font-bold text-white uppercase text-[8px]">SMARTPHONE DOCK</p>
              <p className="text-emerald-400 text-[7px]">NOTIFICACIONES ON</p>
            </div>
          </div>

          {/* C. Minimalist Architect Desk Lamp Head */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/25 shadow-lg z-30 font-mono text-[8px] text-zinc-300">
            <SunMedium className="w-3 h-3 text-cyan-300 animate-spin" style={{ animationDuration: '15s' }} />
            <span>GSAP STUDIO WORKSTATION // 4000K LED</span>
          </div>

          {/* SIDE-BY-SIDE MASTER ARCHITECTURE: CIRCULAR HUD + 3D LAPTOP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-20">
        
        {/* =========================================================== */}
        {/* LEFT COLUMN (6 COLS): CIRCULAR TECH HUD HOLOGRAPHIC FORM    */}
        {/* =========================================================== */}
        <div ref={hudRef} className="lg:col-span-6 w-full flex flex-col items-center justify-center relative">
          
          {/* Circular Hologram Base Rings System */}
          <div className="relative w-full max-w-[560px] rounded-full p-2 flex items-center justify-center">
            
            {/* Outer Rotating Radar Ring */}
            <div 
              className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed pointer-events-none animate-spin"
              style={{ animationDuration: '30s' }}
            />
            
            {/* Middle Laser Ring with Tech Cardinal Notches */}
            <div 
              className="absolute inset-3 rounded-full border-2 border-dashed border-indigo-500/30 pointer-events-none animate-spin"
              style={{ animationDuration: '45s', animationDirection: 'reverse' }}
            />

            {/* Glowing Circular HUD Emitter Beams */}
            <div 
              className="absolute inset-8 rounded-full blur-[50px] opacity-30 pointer-events-none"
              style={{
                background: activeTheme === 'cyan' 
                  ? 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(99,102,241,0.2) 70%, transparent 100%)'
                  : 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 70%, transparent 100%)'
              }}
            />

            {/* Holographic Floating Glass Form Container */}
            <div 
              className="relative z-10 w-full rounded-3xl p-5 sm:p-7 backdrop-blur-2xl border transition-all duration-300 shadow-2xl overflow-hidden"
              style={{
                borderColor: activeTheme === 'cyan' ? 'rgba(0,240,255,0.35)' : activeTheme === 'magenta' ? 'rgba(236,72,153,0.35)' : 'rgba(16,185,129,0.35)',
                background: 'linear-gradient(145deg, rgba(8, 14, 28, 0.92) 0%, rgba(4, 7, 16, 0.96) 100%)',
                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.8), 0 0 35px rgba(0,240,255,0.15)',
              }}
            >
              {/* HUD Header with Circular Radar Status */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                    <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                  </div>
                  <div>
                    <h3 className="font-syne font-black text-sm uppercase text-white tracking-wider">
                      Holograma de Propuesta
                    </h3>
                    <p className="text-[10px] font-mono text-cyan-400">Sincronización en vivo con Laptop 3D</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[10px] font-mono text-emerald-400">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>SYNCED</span>
                </div>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Project Dimension Grid */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-zinc-300 uppercase flex items-center justify-between">
                      <span>1. Dimensión del Proyecto</span>
                      <span className="text-cyan-400 text-[10px]">Pulsaciones: {keystrokeCount}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {projectTypes.map((type) => {
                        const Icon = type.icon;
                        const isSel = formData.projectType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              triggerKeyAction(type.label.charAt(0));
                              setFormData({ ...formData, projectType: type.id });
                            }}
                            className={`p-2.5 rounded-xl border text-left text-xs font-syne font-bold transition-all cursor-pointer flex items-center gap-2 ${
                              isSel
                                ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                                : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Client Info Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-300 uppercase mb-1">
                        Tu Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ej. Satoshi"
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-300 uppercase mb-1">
                        Email Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ceo@estudio.io"
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-zinc-300 uppercase flex items-center justify-between">
                      <span>Presupuesto Estimado</span>
                      <span className="text-cyan-400 font-bold">{formData.budget}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {budgetOptions.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            triggerKeyAction(tier.charAt(0));
                            setFormData({ ...formData, budget: tier });
                          }}
                          className={`py-1.5 px-1 rounded-lg border text-center text-[10px] font-mono transition-all cursor-pointer ${
                            formData.budget === tier
                              ? 'bg-indigo-600/40 border-indigo-400 text-white font-bold shadow-[0_0_8px_rgba(99,102,241,0.4)]'
                              : 'bg-black/30 border-white/10 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Message Field */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-zinc-300 uppercase flex items-center justify-between">
                      <span>Objetivos / Mensaje</span>
                      <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <Terminal className="w-2.5 h-2.5" /> Teclea y mira la laptop al lado
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Describe la visión de tu proyecto..."
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none"
                    />
                  </div>

                  {/* Transmit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-syne font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Cifrando y Transmitiendo...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmitir Propuesta Cuántica</span>
                        <Send className="w-3.5 h-3.5 text-cyan-200" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-syne text-xl font-bold uppercase text-white">¡Propuesta Transmitida!</h4>
                  <p className="text-xs font-mono text-zinc-300">
                    Sincronizada con el bloque cuántico. Te contactaremos en <strong className="text-cyan-400">{formData.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Enviar otra propuesta
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* =========================================================== */}
        {/* RIGHT COLUMN (6 COLS): 3D QUANTUM LAPTOP WORKSTATION        */}
        {/* =========================================================== */}
        <div 
          ref={laptopRef}
          className="lg:col-span-6 w-full flex flex-col items-center justify-center relative transition-transform duration-300 ease-out"
          style={{
            perspective: '1200px',
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          {/* Ambient Lighting Dome behind laptop */}
          <div 
            className="absolute -top-10 w-[90%] h-[260px] rounded-full blur-[80px] opacity-35 pointer-events-none transition-colors duration-500"
            style={{
              background: activeTheme === 'cyan'
                ? 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(99,102,241,0.2) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 60%, transparent 80%)',
            }}
          />

          {/* 1. LAPTOP LID / OLED SCREEN (Framed perfectly, Zero Cut-offs) */}
          <div 
            className="w-full max-w-[540px] rounded-t-2xl border-t-2 border-x-2 border-white/30 shadow-2xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(180deg, #090e1c 0%, #03050c 100%)',
              boxShadow: '0 -15px 40px rgba(0,0,0,0.8), inset 0 2px 3px rgba(255,255,255,0.4)',
            }}
          >
            {/* Top Bezel Webcam & Sensor */}
            <div className="h-5 w-full flex items-center justify-center relative border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                <div className="w-2 h-2 rounded-full bg-zinc-950 border border-white/30 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-cyan-400" />
                </div>
              </div>
              <span className="absolute right-3 text-[8px] font-mono text-zinc-500">4K RETINA OLED</span>
            </div>

            {/* SCREEN INTERIOR: Live Stream Terminal + Direct Web Studio Input Interface */}
            <div className="p-3.5 sm:p-5 min-h-[220px] sm:min-h-[250px] flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.12),transparent_70%)]">
              
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[9px] sm:text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40">
                    GSAP WEB STUDIO OS
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">// DEV WORKSTATION</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" />
                      <span>0.1ms</span>
                    </span>
                    <span className="text-cyan-300 font-bold">KEY: [{lastChar}]</span>
                  </div>
                </div>
              </div>

              {/* Real-time Decoded Transmission & Direct Laptop Code Editor */}
              <div className="my-auto font-mono text-[11px] sm:text-xs text-left space-y-2 py-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-cyan-400 flex items-center gap-1.5 font-bold text-[10px]">
                    <Terminal className="w-3 h-3 animate-pulse text-cyan-400" />
                    <span>&gt; TERMINAL &amp; EDITOR DEL DESARROLLADOR:</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    EDITABLE EN VIVO
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/85 border border-cyan-500/35 text-zinc-200 font-mono space-y-1.5 shadow-inner text-[10px] sm:text-[11px]">
                  {/* Direct interactive inputs on laptop screen as well */}
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[10px]">01:</span>
                    <span className="text-emerald-400 font-bold w-24">DEV_CLIENT:</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre aquí..."
                      className="flex-1 bg-transparent border-b border-white/20 focus:border-cyan-400 focus:outline-none text-white text-[11px] px-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[10px]">02:</span>
                    <span className="text-cyan-300 font-bold w-24">DEV_EMAIL:</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@empresa.com"
                      className="flex-1 bg-transparent border-b border-white/20 focus:border-cyan-400 focus:outline-none text-white text-[11px] px-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[10px]">03:</span>
                    <span className="text-purple-300 font-bold w-24">PROYECTO:</span>
                    <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded text-[10px]">{formData.projectType.toUpperCase()}</span>
                    <span className="text-amber-300 text-[10px] ml-auto">{formData.budget}</span>
                  </div>

                  <div className="flex items-start gap-2 pt-0.5">
                    <span className="text-zinc-500 text-[10px] pt-1">04:</span>
                    <span className="text-amber-300 font-bold w-24 pt-1">SPECS_MSG:</span>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Escribe los requisitos o mensaje..."
                      className="flex-1 bg-transparent border-b border-white/20 focus:border-cyan-400 focus:outline-none text-white text-[11px] px-1"
                    />
                  </div>
                </div>

                {/* Animated Typing Cursor & GSAP live indicator */}
                <div className="flex items-center justify-between text-cyan-400 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span>&gt; PULSACIÓN:</span>
                    <span className="px-1.5 py-0.5 rounded bg-cyan-400 text-black font-black font-mono animate-bounce">
                      {lastChar}
                    </span>
                  </div>
                  <span className="text-zinc-400 text-[9px]">Scroll: {(scrollProgress * 100).toFixed(0)}% (GSAP Activo)</span>
                </div>
              </div>

              {/* Bottom Holographic Emitter Laser Strip */}
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff] animate-pulse" />
            </div>

            {/* Specular Screen Gloss */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent z-20" />
          </div>

          {/* 2. CHROME HINGE CYLINDER CONNECTOR */}
          <div className="w-[95%] max-w-[520px] h-3 rounded-full bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 border-y border-white/30 shadow-[0_0_12px_rgba(0,240,255,0.2)] flex items-center justify-between px-4 z-20 -my-0.5">
            <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
            <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              METAMUNDO PRECISION HINGE
            </span>
            <span className="w-1 h-1 rounded-full bg-indigo-400 shadow-[0_0_4px_#6366f1]" />
          </div>

          {/* 3. LAPTOP BASE: CNC ALUMINUM + MECHANICAL BACKLIT KEYBOARD */}
          <div
            className="w-full max-w-[540px] rounded-b-2xl border-b-2 border-x-2 border-white/30 shadow-2xl p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #121728 0%, #0a0d18 70%, #030408 100%)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.95), inset 0 2px 3px rgba(255, 255, 255, 0.5)',
            }}
          >
            {/* FLOATING TYPED LETTER PARTICLES */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              {floatingParticles.map((p) => (
                <div
                  key={p.id}
                  className="absolute bottom-16 text-cyan-300 font-mono font-black text-base sm:text-lg drop-shadow-[0_0_8px_#00f0ff]"
                  style={{
                    left: `${p.x}%`,
                    animation: 'floatUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}
                >
                  {p.char}
                </div>
              ))}
            </div>

            {/* MECHANICAL BACKLIT KEYBOARD TRAY */}
            <div className="w-full p-2 sm:p-3 rounded-xl bg-black/85 border border-white/20 shadow-inner relative">
              <div className="space-y-1 sm:space-y-1.5">
                {KEYBOARD_GRID.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex gap-1 justify-center">
                    {row.map((k) => {
                      const isPressed = 
                        !!pressedKeys[k.char.toLowerCase()] || 
                        !!pressedKeys[k.code.toLowerCase()] ||
                        (k.shiftChar && !!pressedKeys[k.shiftChar.toLowerCase()]);

                      return (
                        <button
                          key={k.code + k.label}
                          type="button"
                          onClick={() => triggerKeyAction(k.char)}
                          className={`h-6 sm:h-7 rounded-md text-[8px] sm:text-[9px] font-mono font-bold flex items-center justify-center transition-all duration-75 select-none cursor-pointer ${
                            k.width ? k.width : 'flex-1 min-w-[16px] sm:min-w-[20px]'
                          } ${
                            k.isSpecial ? 'bg-zinc-800/95 text-zinc-300' : 'bg-zinc-900/95 text-zinc-100'
                          } ${
                            isPressed
                              ? 'bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-600 text-black font-black scale-90 translate-y-0.5 shadow-[0_0_18px_#00f0ff] border-cyan-200 ring-1 ring-cyan-400'
                              : 'border border-white/10 hover:border-cyan-400/50 hover:text-white'
                          }`}
                        >
                          <span>{k.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}

                {/* BOTTOM ROW: SPACEBAR & MODIFIERS */}
                <div className="flex gap-1 pt-0.5">
                  <button
                    type="button"
                    onClick={() => triggerKeyAction('Control')}
                    className="w-8 sm:w-11 h-6 sm:h-7 rounded-md bg-zinc-800/95 border border-white/10 text-[8px] font-mono text-zinc-300 flex items-center justify-center hover:border-cyan-400/40 cursor-pointer"
                  >
                    CTRL
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerKeyAction('Alt')}
                    className="w-8 sm:w-11 h-6 sm:h-7 rounded-md bg-zinc-800/95 border border-white/10 text-[8px] font-mono text-zinc-300 flex items-center justify-center hover:border-cyan-400/40 cursor-pointer"
                  >
                    ALT
                  </button>

                  {/* Reactive Spacebar */}
                  <button
                    type="button"
                    onClick={() => triggerKeyAction(' ')}
                    className={`flex-1 h-6 sm:h-7 rounded-md border text-[7px] sm:text-[8px] font-mono tracking-widest font-black transition-all duration-75 cursor-pointer flex items-center justify-center ${
                      pressedKeys[' '] || pressedKeys['space']
                        ? 'bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 text-black scale-95 shadow-[0_0_20px_#00f0ff]'
                        : 'bg-gradient-to-r from-zinc-900 via-indigo-950/70 to-zinc-900 border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.15)] hover:border-cyan-400'
                    }`}
                  >
                    &bull;&bull; METAMUNDO QUANTUM SPACE &bull;&bull;
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerKeyAction('Enter')}
                    className="w-10 sm:w-14 h-6 sm:h-7 rounded-md bg-cyan-600/40 border border-cyan-400 text-[8px] font-mono text-cyan-300 font-bold flex items-center justify-center hover:bg-cyan-500 hover:text-black cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.25)]"
                  >
                    ENTER
                  </button>
                </div>
              </div>
            </div>

            {/* MULTITOUCH GLASS TRACKPAD */}
            <div 
              onClick={() => triggerKeyAction('click')}
              className="mt-2.5 mx-auto w-32 sm:w-44 h-8 sm:h-11 rounded-xl bg-black/75 border border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden cursor-pointer hover:border-cyan-400/60 transition-colors"
            >
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                TRACKPAD HÁPTICO
              </span>
            </div>

            {/* Front Lip Opening Notch */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/25 border border-white/30" />
          </div>

        </div>

      </div>

      </div>

      </div>

      {/* Optical Laser Bridge between sections */}
      <div className="w-full max-w-4xl h-10 pointer-events-none flex items-center justify-center my-6">
        <div className="w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff]" />
      </div>

      {/* ============================================================= */}
      {/* REAL-TIME LASER WHATSAPP PROJECTOR & METAMUNDO AI ASSISTANT   */}
      {/* ============================================================= */}
      <div className="relative z-20 w-full max-w-5xl mx-auto mt-4">
        <WhatsAppLaserAssistant formData={formData} />
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.3);
          }
        }
      `}</style>
    </section>
  );
};
