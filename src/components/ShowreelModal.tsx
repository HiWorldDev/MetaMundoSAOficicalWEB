import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Award, ArrowRight } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

const REEL_CHAPTERS = [
  { id: 1, title: '01 / AURA KINETICS', category: 'Spatial Computing 3D', time: '0:00' },
  { id: 2, title: '02 / NEO NEBULA', category: 'Luxury E-Commerce & Audio', time: '0:22' },
  { id: 3, title: '03 / CHRONO VAULT', category: 'Haute Horlogerie 3D Raytracing', time: '0:45' },
  { id: 4, title: '04 / SYNTHESIS AI', category: 'Neural Interfaces & Motion', time: '1:10' }
];

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveChapterIndex((idx) => (idx + 1) % REEL_CHAPTERS.length);
          return 0;
        }
        return prev + 1.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentChapter = REEL_CHAPTERS[activeChapterIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        onClick={onClose}
      />

      {/* Reel Card */}
      <div className="relative w-full max-w-5xl bg-[#090a10] border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col text-white">
        
        {/* Top Control Bar */}
        <div className="p-5 sm:px-8 border-b border-white/10 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-syne font-extrabold text-sm sm:text-base text-white tracking-wider">
              METAMUNDO MOTION • SHOWREEL 2026
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Simulated 4K Cinematic Player */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center group">
          
          {/* Background Cinematic Visual Imagery */}
          <div className="absolute inset-0">
            <img
              src={
                activeChapterIndex === 0
                  ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop'
                  : activeChapterIndex === 1
                  ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop'
                  : activeChapterIndex === 2
                  ? 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop'
                  : 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop'
              }
              alt="Showreel Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-105 transition-all duration-1000 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>

          {/* Center Sound Wave Simulation (Kinetic Audio Reactive) */}
          <div className="relative z-10 flex items-center gap-1.5 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
            {[40, 65, 90, 45, 100, 30, 80, 55, 95, 70, 35, 85].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-indigo-500 via-cyan-400 to-white"
                style={{
                  height: isPlaying ? `${h}px` : '12px',
                  transition: 'height 0.2s ease-in-out',
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>

          {/* Live Overlay Chapter Badge */}
          <div className="absolute bottom-6 left-6 z-10 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
              {currentChapter.category}
            </span>
            <h3 className="font-syne text-2xl sm:text-4xl font-extrabold text-white">
              {currentChapter.title}
            </h3>
          </div>

          {/* Quick Play/Pause Control Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 backdrop-blur-md text-white transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>

        {/* Bottom Timeline & Chapters Selector */}
        <div className="p-6 sm:p-8 bg-zinc-950 space-y-6">
          
          {/* Progress Scrub Bar */}
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Chapter Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REEL_CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 border-indigo-500/50 shadow-lg shadow-indigo-950/50'
                      : 'bg-zinc-950 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="text-[10px] font-mono text-zinc-500 mb-0.5">
                    {ch.time}
                  </div>
                  <div className={`font-syne text-xs font-bold ${isActive ? 'text-cyan-300' : 'text-zinc-300'}`}>
                    {ch.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA Footer in Modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-zinc-400">
              ¿Listo para elevar el estándar de tu marca al nivel de este showreel?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-syne font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Trabajemos Juntos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
