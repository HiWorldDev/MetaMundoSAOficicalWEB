import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  ShieldCheck, 
  Bot, 
  Zap, 
  Send,
  Radio,
  Clock,
  UserCheck
} from 'lucide-react';

interface WhatsAppLaserAssistantProps {
  formData?: {
    name: string;
    email: string;
    projectType: string;
    budget: string;
    message: string;
  };
}

export const WhatsAppLaserAssistant: React.FC<WhatsAppLaserAssistantProps> = ({
  formData,
}) => {
  const [laserProgress, setLaserProgress] = useState(0);
  const [laserPoint, setLaserPoint] = useState({ x: 100, y: 100 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const svgPathRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const assistantMessages = [
    {
      title: '¡HOLA! SOY AURA // ASISTENTE AI DE METAMUNDO S.A.',
      text: '¿Deseas una cotización inmediata de tu proyecto Web AI / 3D? Nuestro Ingeniero Principal está disponible en tiempo real.',
      action: '⚡ Conectar por WhatsApp',
    },
    {
      title: 'COMUNICACIÓN DIRECTA CON INGENIERÍA',
      text: 'Evita esperas por correo. Envía tu requerimiento directamente a nuestro canal de WhatsApp corporativo.',
      action: '💬 Chatear con MetaMundo',
    },
    {
      title: 'ESTUDIO 3D & REAL ESTATE A MEDIDA',
      text: 'Podemos cotizar renders interactivos, gemelos digitales y aplicaciones WebGL de alto impacto hoy mismo.',
      action: '🚀 Abrir WhatsApp Ahora',
    },
  ];

  // Rotate assistant speech message
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeechIdx((prev) => (prev + 1) % assistantMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [assistantMessages.length]);

  // Animate Laser Beam along the WhatsApp Path
  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.006;
      const progress = (t % 1);
      setLaserProgress(progress);

      if (svgPathRef.current) {
        const pathLen = svgPathRef.current.getTotalLength();
        const point = svgPathRef.current.getPointAtLength(progress * pathLen);
        setLaserPoint({ x: point.x, y: point.y });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Format dynamic WhatsApp URL
  const generateWhatsAppUrl = () => {
    const phone = '573002345678'; // MetaMundo S.A. Corporate Line
    let text = '¡Hola MetaMundo S.A.! Quiero cotizar un proyecto Web AI / 3D.';
    if (formData?.name) {
      text = `¡Hola MetaMundo S.A.! Mi nombre es ${formData.name}. Me interesa cotizar un proyecto tipo ${formData.projectType.toUpperCase()} con presupuesto ${formData.budget}. ${formData.message ? `Detalles: "${formData.message}"` : ''}`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const handleWhatsAppClick = () => {
    window.open(generateWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border border-emerald-500/30 bg-gradient-to-b from-[#061812]/90 via-[#030d0a]/95 to-[#020504]/98 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.15)] overflow-hidden">
      
      {/* Background Cybernetic Blueprint Laser Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Radial Emerald Laser Glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-500/20 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none" />

      {/* Top HUD: Status Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-6 font-mono text-xs">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="font-bold tracking-wider uppercase text-[11px]">
            METAMUNDO S.A. // ASISTENTE AI & PROYECTOR LÁSER
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
            RESPUESTA EN 2 MIN
          </span>
        </div>
      </div>

      {/* Main Grid: Hologram Laser Projector + Interactive AI Assistant Avatar */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: THE LASER WHATSAPP RECONSTRUCTION STAGE     */}
        {/* ========================================================= */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Laser Projector Rig Container */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
            
            {/* Top Laser Emitter Node */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
              <div className="w-8 h-3 rounded-full bg-zinc-900 border border-emerald-400 flex items-center justify-center shadow-[0_0_12px_#10b981]">
                <div className="w-2 h-1 rounded-full bg-emerald-300 animate-pulse" />
              </div>
              <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest mt-0.5">
                LASER EMITTER
              </span>
            </div>

            {/* Concentric Scanner Rings */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/20 border-dashed animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-4 rounded-full border border-emerald-400/30 pointer-events-none animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
            
            {/* SVG Laser Path Canvas */}
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full relative z-20 overflow-visible"
            >
              <defs>
                <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>

                <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ghost Trace Background */}
              <path
                d="M 100,20 C 55.8,20 20,55.8 20,100 C 20,114.6 23.9,128.3 30.7,140 L 22,178 L 61.8,167.6 C 73.1,173.8 86.1,177.3 100,177.3 C 144.2,177.3 180,141.5 180,97.3 C 180,53.1 144.2,20 100,20 Z"
                fill="rgba(16, 185, 129, 0.04)"
                stroke="rgba(16, 185, 129, 0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Internal Phone Handset Ghost */}
              <path
                d="M 143.8,119 C 141.6,117.9 130.7,112.5 128.6,111.8 C 126.5,111 125,110.7 123.5,113 C 122,115.3 117.7,120.3 116.3,121.8 C 114.9,123.3 113.5,123.5 111.3,122.4 C 109.1,121.3 101.9,118.9 93.3,111.2 C 86.7,105.3 82.2,97.9 80.9,95.7 C 79.6,93.5 80.7,92.3 81.8,91.2 C 82.8,90.2 84,88.5 85.1,87.1 C 86.2,85.7 86.6,84.8 87.3,83.3 C 88.1,81.8 87.7,80.5 87.1,79.4 C 86.5,78.3 82,67.1 80.1,62.5 C 78.3,58.1 76.4,58.7 75,58.6 C 73.6,58.5 72.1,58.5 70.6,58.5 C 69.1,58.5 66.6,59.1 64.5,61.3 C 62.4,63.5 56.5,69.3 56.5,80.8 C 56.5,92.3 64.8,103.4 66,104.9 C 67.1,106.4 82.2,129.7 105.3,139.7 C 110.8,142.1 115.1,143.5 118.5,144.6 C 124,146.4 129,146.1 133,145.5 C 137.5,144.9 146.3,140.1 148.2,134.8 C 150,129.6 150,125.1 149.4,124.2 C 148.9,123.3 147.4,122.7 145.2,121.6 Z"
                fill="none"
                stroke="rgba(16, 185, 129, 0.25)"
                strokeWidth="1.5"
              />

              {/* Animated Glowing Laser Contour Path */}
              <path
                ref={svgPathRef}
                d="M 100,20 C 55.8,20 20,55.8 20,100 C 20,114.6 23.9,128.3 30.7,140 L 22,178 L 61.8,167.6 C 73.1,173.8 86.1,177.3 100,177.3 C 144.2,177.3 180,141.5 180,97.3 C 180,53.1 144.2,20 100,20 Z"
                fill="none"
                stroke="url(#laserGrad)"
                strokeWidth="3.5"
                filter="url(#laserGlow)"
                strokeDasharray="540"
                strokeDashoffset={540 * (1 - laserProgress)}
                strokeLinecap="round"
              />

              {/* Radiant Laser Beam Shooting from Emitter to Current Drawing Tip */}
              <line
                x1="100"
                y1="0"
                x2={laserPoint.x}
                y2={laserPoint.y}
                stroke="#34d399"
                strokeWidth="2"
                strokeOpacity="0.85"
                filter="url(#laserGlow)"
              />
              <line
                x1="100"
                y1="0"
                x2={laserPoint.x}
                y2={laserPoint.y}
                stroke="#ffffff"
                strokeWidth="0.8"
              />

              {/* High Intensity Glowing Laser Tip Spark */}
              <circle
                cx={laserPoint.x}
                cy={laserPoint.y}
                r="6"
                fill="#ffffff"
                filter="url(#laserGlow)"
              />
              <circle
                cx={laserPoint.x}
                cy={laserPoint.y}
                r="3"
                fill="#10b981"
              />
            </svg>

            {/* Center Dynamic WhatsApp Core Badge */}
            <div className="absolute inset-16 rounded-full bg-emerald-950/60 border border-emerald-400/40 backdrop-blur-xl flex flex-col items-center justify-center text-center p-2 z-10 shadow-inner">
              <span className="text-[9px] font-mono text-emerald-300 font-bold tracking-wider">
                WHATSAPP AI
              </span>
              <span className="text-[14px] font-syne font-black text-white">
                DIRECT LINK
              </span>
              <span className="text-[8px] font-mono text-emerald-400/80 mt-0.5">
                EN VIVO
              </span>
            </div>

          </div>

          <p className="text-[10px] font-mono text-emerald-400/80 mt-2 flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Haz de luz sintetizando enlace directo</span>
          </p>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: AURA AI ASSISTANT & ACTION BUTTON          */}
        {/* ========================================================= */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Assistant Voice & Identity Bubble */}
          <div className="rounded-2xl p-4 sm:p-5 bg-black/60 border border-emerald-400/30 backdrop-blur-xl space-y-3 relative shadow-lg">
            
            {/* Corner Decorative Notch */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[9px] font-mono text-emerald-300">
              <Bot className="w-3 h-3 text-emerald-400" />
              <span>AURA 4.0 AI</span>
            </div>

            {/* Avatar & Audio Visualizer Header */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-600 p-[1.5px] shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center overflow-hidden relative">
                  <Bot className="w-6 h-6 text-emerald-300 animate-bounce" style={{ animationDuration: '2.5s' }} />
                  <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
                </div>
                {/* Online Dot */}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black shadow-[0_0_6px_#10b981]" />
              </div>

              <div>
                <h4 className="font-syne font-black text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                  {assistantMessages[activeSpeechIdx].title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <UserCheck className="w-3 h-3" /> Ingeniero Web AI Activo
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> &lt;2 min
                  </span>
                </div>
              </div>
            </div>

            {/* Assistant Dynamic Speech Message */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-zinc-200 text-xs sm:text-sm leading-relaxed font-sans">
              &ldquo;{assistantMessages[activeSpeechIdx].text}&rdquo;
            </div>

            {/* Audio Waveform Bars Simulation */}
            <div className="flex items-center justify-between pt-1 border-t border-emerald-500/10">
              <div className="flex items-center gap-1">
                {[4, 8, 14, 9, 16, 7, 12, 18, 10, 5, 12, 15, 6].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-emerald-400 animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s',
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono text-emerald-300">
                CANAL PRIORITARIO DIRECTO
              </span>
            </div>

          </div>

          {/* MASTER WHATSAPP ACTION BUTTON WITH RADAR PULSE */}
          <div className="relative pt-1">
            
            {/* Background Radar Pulse Ring */}
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl animate-pulse pointer-events-none" />

            <button
              onClick={handleWhatsAppClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 text-black font-syne font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center justify-between group active:scale-95 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/20 border border-black/15 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-zinc-950 fill-current animate-pulse" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-black text-zinc-950">
                    {assistantMessages[activeSpeechIdx].action}
                  </span>
                  <span className="block text-[10px] font-mono text-emerald-950 font-bold">
                    +57 300 234 5678 • Chat Inmediato con Asesor
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/15 px-3.5 py-1.5 rounded-xl border border-black/10 text-xs font-mono font-bold text-zinc-950 group-hover:translate-x-1 transition-transform">
                <span>CONECTAR</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </button>

          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cifrado de Extremo a Extremo</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sin Bots Telefónicos • Habla con Humanos</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
