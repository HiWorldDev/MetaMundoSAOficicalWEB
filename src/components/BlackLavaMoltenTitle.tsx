import React, { useEffect, useRef, useState, useCallback } from 'react';
import { isLowEndDevice } from '../utils/cardClipPathAnimation';

interface BlackLavaMoltenTitleProps {
  line1?: string;
  line2?: string;
  primaryText?: string;
  secondaryText?: string;
}

interface BeadNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phaseOffset: number;
  strandIndex: number;
  glowColor: string;
}

export const BlackLavaMoltenTitle: React.FC<BlackLavaMoltenTitleProps> = ({
  line1 = 'DISEÑAMOS',
  line2 = 'EL FUTURO',
  primaryText,
  secondaryText,
}) => {
  // If primaryText is passed as single string, split or use default lines
  const displayLine1 = primaryText && !secondaryText ? (primaryText.includes(' ') ? primaryText.split(' ')[0] : primaryText) : (line1 || 'DISEÑAMOS');
  const displayLine2 = primaryText && !secondaryText ? (primaryText.includes(' ') ? primaryText.substring(primaryText.indexOf(' ') + 1) : 'EL FUTURO') : (line2 || 'EL FUTURO');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const beadsRef = useRef<BeadNode[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: -1000,
    y: -1000,
    isHovering: false,
  });

  const initBeads = useCallback((width: number, height: number) => {
    const beads: BeadNode[] = [];
    const isLowPower = isLowEndDevice() || window.matchMedia('(pointer: coarse)').matches;
    
    // Strand 1: Main serpentine chain traversing through the letters (upper & middle wave)
    const NUM_BEADS_1 = isLowPower ? 24 : 58;
    const startX = width * 0.04;
    const endX = width * 0.96;
    const spanWidth = endX - startX;

    for (let i = 0; i < NUM_BEADS_1; i++) {
      const progress = i / (NUM_BEADS_1 - 1);
      const bx = startX + progress * spanWidth;
      
      // Calculate wave height so it weaves naturally between line 1 and line 2
      // Base wave that oscillates across the text height (height is ~260-320px)
      const cy = height * 0.44;
      const waveOffset = Math.sin(progress * Math.PI * 4.2) * (height * 0.24) + Math.cos(progress * Math.PI * 2.1) * (height * 0.08);
      const by = cy + waveOffset;

      // Pulse radius: larger in crests, smaller at tails
      const radiusEnvelope = Math.sin(progress * Math.PI); // 0 at edges, 1 in center
      const r = 12 + radiusEnvelope * 13 + Math.sin(i * 0.8) * 3;

      beads.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        radius: r,
        baseRadius: r,
        phaseOffset: progress * Math.PI * 3,
        strandIndex: 0,
        glowColor: 'rgba(6, 182, 212, 0.65)',
      });
    }

    // Strand 2: Secondary subtle harmonic wave dipping along the lower letters
    const NUM_BEADS_2 = isLowPower ? 14 : 36;
    const startX2 = width * 0.12;
    const endX2 = width * 0.88;
    const spanWidth2 = endX2 - startX2;

    for (let i = 0; i < NUM_BEADS_2; i++) {
      const progress = i / (NUM_BEADS_2 - 1);
      const bx = startX2 + progress * spanWidth2;
      const cy = height * 0.58;
      const waveOffset = Math.sin(progress * Math.PI * 3.4 + Math.PI * 0.8) * (height * 0.18);
      const by = cy + waveOffset;
      const r = 9 + Math.sin(progress * Math.PI) * 8 + Math.cos(i * 0.6) * 2;

      beads.push({
        baseX: bx,
        baseY: by,
        x: bx,
        y: by,
        vx: 0,
        vy: 0,
        radius: r,
        baseRadius: r,
        phaseOffset: progress * Math.PI * 2.5 + 1.5,
        strandIndex: 1,
        glowColor: 'rgba(56, 189, 248, 0.5)',
      });
    }

    beadsRef.current = beads;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 1100);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    initBeads(width, height);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 280;
      initBeads(width, height);
    };

    let isOnScreen = !('IntersectionObserver' in window);
    let isDocumentVisible = !document.hidden;
    const isLowPower = isLowEndDevice() || window.matchMedia('(pointer: coarse)').matches;
    const frameInterval = isLowPower ? 1000 / 30 : 1000 / 50;
    let lastFrameTime = 0;

    // Animation Loop: 3D Obsidian & Chrome Beaded Chain with Zero Background Block
    const render = () => {
      animRef.current = null;
      if (!isOnScreen || !isDocumentVisible) return;

      const now = performance.now();
      if (now - lastFrameTime < frameInterval) {
        animRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now;
      timeRef.current += 0.022;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const beads = beadsRef.current;
      const mouse = mouseRef.current;

      // 1. Update Physics and Positions
      beads.forEach((b) => {
        // Continuous harmonic undulating motion
        const amp = b.strandIndex === 0 ? 18 : 12;
        const currentTargetY = b.baseY + Math.sin(b.phaseOffset + t) * amp + Math.cos(b.phaseOffset * 0.5 + t * 0.8) * (amp * 0.4);
        const currentTargetX = b.baseX + Math.cos(b.phaseOffset + t * 0.6) * 6;

        // Interactive mouse repulsion
        let targetX = currentTargetX;
        let targetY = currentTargetY;

        if (mouse.isHovering) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist && dist > 0.1) {
            const force = (1 - dist / maxDist) * 45;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
          }
        }

        // Spring easing toward target
        b.vx = (b.vx + (targetX - b.x) * 0.09) * 0.78;
        b.vy = (b.vy + (targetY - b.y) * 0.09) * 0.78;
        b.x += b.vx;
        b.y += b.vy;

        // Subtle breathing radius
        b.radius = b.baseRadius + Math.sin(t * 2 + b.phaseOffset) * 1.5;
      });

      // 2. Render Beads (Sorted by Y for depth layering)
      const sortedBeads = [...beads].sort((a, b) => a.y - b.y);

      sortedBeads.forEach((b) => {
        const r = Math.max(3, b.radius);

        ctx.save();

        // A. Soft Ambient Cyan Glow
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = isLowPower ? 0 : r * 1.2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // B. 3D Spherical Radial Gradient (Metallic Obsidian with Cyan Inner Core)
        const lightOffsetX = -r * 0.32;
        const lightOffsetY = -r * 0.32;
        
        const grad = ctx.createRadialGradient(
          b.x + lightOffsetX,
          b.y + lightOffsetY,
          r * 0.08,
          b.x,
          b.y,
          r
        );

        grad.addColorStop(0.0, '#e0f7fa');  // Specular high point
        grad.addColorStop(0.18, '#38bdf8'); // Electric cyan light ring
        grad.addColorStop(0.42, '#0284c7'); // Deep azure transition
        grad.addColorStop(0.70, '#0a1526'); // Dark metallic obsidian body
        grad.addColorStop(0.92, '#02050b'); // Pure shadow edge
        grad.addColorStop(1.0, '#000000');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fill();

        // C. Crisp Chrome Specular Glint (Top-Left Highlight Reflection)
        ctx.shadowBlur = 0; // Disable shadow for clean specular
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.ellipse(
          b.x + lightOffsetX * 0.85,
          b.y + lightOffsetY * 0.85,
          r * 0.28,
          r * 0.16,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // D. Secondary Rim Light on Bottom-Right
        ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
        ctx.beginPath();
        ctx.arc(b.x + r * 0.25, b.y + r * 0.25, r * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      isDocumentVisible = !document.hidden;
      if (!isDocumentVisible && animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      } else if (isDocumentVisible && isOnScreen && animRef.current === null) {
        animRef.current = requestAnimationFrame(render);
      }
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          isOnScreen = entry.isIntersecting;
          if (!isOnScreen && animRef.current !== null) {
            cancelAnimationFrame(animRef.current);
            animRef.current = null;
          } else if (isOnScreen && isDocumentVisible && animRef.current === null) {
            animRef.current = requestAnimationFrame(render);
          }
        }, { threshold: 0 })
      : null;

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);
    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    } else if (isDocumentVisible) {
      animRef.current = requestAnimationFrame(render);
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [initBeads]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto my-2 select-none group flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] md:min-h-[300px]"
    >
      {/* 1. 3D Obsidian & Cyan Beads Fluid Canvas (No dark box/curtain background) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 gpu-layer"
      />

      {/* 2. Monumental Futuristic Titanium Chrome Typography */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 w-full pointer-events-none">
        
        {/* Line 1: DISEÑAMOS */}
        <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-[92px] font-black tracking-tight sm:tracking-normal md:tracking-wider leading-[0.92] uppercase text-white drop-shadow-[0_0_35px_rgba(6,182,212,0.55)]">
          <span className="relative inline-block">
            {/* Ambient Cyan Glow Underlayer */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent blur-md opacity-80 pointer-events-none">
              {displayLine1}
            </span>

            {/* Crisp Titanium/Silver Chrome Gradient Frontlayer */}
            <span className="relative bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
              {displayLine1}
            </span>
          </span>
        </h1>

        {/* Line 2: EL FUTURO */}
        <h2 className="font-syne text-4xl sm:text-6xl md:text-7xl lg:text-[92px] font-black tracking-tight sm:tracking-normal md:tracking-wider leading-[0.92] uppercase text-white drop-shadow-[0_0_35px_rgba(6,182,212,0.55)]">
          <span className="relative inline-block">
            {/* Ambient Cyan Glow Underlayer */}
            <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent blur-md opacity-80 pointer-events-none">
              {displayLine2}
            </span>

            {/* Crisp Titanium/Silver Chrome Gradient Frontlayer */}
            <span className="relative bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
              {displayLine2}
            </span>
          </span>
        </h2>

      </div>
    </div>
  );
};
