import React, { useEffect, useRef } from 'react';

export type BlockchainVisualMode = 'cyber' | 'gold' | 'emerald' | 'wireframe';

interface BlockchainTowerCanvas3DProps {
  scrollProgress: number; // 0 to 1
  scrollProgressRef?: { current: number };
  visualMode?: BlockchainVisualMode;
  towerRotation?: number; // additional rotation offset
  autoRotate?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Block3D {
  id: string;
  blockNumber: number;
  center: Point3D;
  size: { w: number; h: number; d: number };
  level: number;
  label: string;
  hash: string;
  isMainTower: boolean;
}

const THEME_PALETTES: Record<BlockchainVisualMode, {
  primary: string;
  secondary: string;
  glow: string;
  wire: string;
  fill: string;
  chain: string;
}> = {
  cyber: {
    primary: '#6366f1',
    secondary: '#06b6d4',
    glow: 'rgba(99, 102, 241, 0.45)',
    wire: 'rgba(6, 182, 212, 0.85)',
    fill: 'rgba(12, 18, 36, 0.72)',
    chain: 'rgba(129, 140, 248, 0.6)',
  },
  gold: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.5)',
    wire: 'rgba(251, 191, 36, 0.85)',
    fill: 'rgba(32, 22, 10, 0.75)',
    chain: 'rgba(245, 158, 11, 0.65)',
  },
  emerald: {
    primary: '#10b981',
    secondary: '#34d399',
    glow: 'rgba(16, 185, 129, 0.45)',
    wire: 'rgba(52, 211, 153, 0.85)',
    fill: 'rgba(8, 32, 22, 0.72)',
    chain: 'rgba(16, 185, 129, 0.6)',
  },
  wireframe: {
    primary: '#a855f7',
    secondary: '#ec4899',
    glow: 'rgba(168, 85, 247, 0.42)',
    wire: 'rgba(236, 72, 153, 0.9)',
    fill: 'rgba(18, 8, 28, 0.6)',
    chain: 'rgba(168, 85, 247, 0.6)',
  },
};

export const BlockchainTowerCanvas3D: React.FC<BlockchainTowerCanvas3DProps> = ({
  scrollProgress,
  scrollProgressRef,
  visualMode = 'cyber',
  towerRotation = 0,
  autoRotate = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const scrollRef = useRef<number>(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobileOrLowEnd = window.matchMedia('(pointer: coarse)').matches
      || window.innerWidth < 768
      || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4);
    const frameInterval = isMobileOrLowEnd ? 1000 / 30 : 1000 / 50;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);
    let lastFrameTime = 0;
    let isInView = true;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      requestRender();
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = typeof ResizeObserver !== 'undefined' && canvas.parentElement
      ? new ResizeObserver(handleResize)
      : null;
    if (canvas.parentElement) resizeObserver?.observe(canvas.parentElement);

    const handleVisibility = () => {
      if (!document.hidden && isInView) requestRender();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    const visibilityObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting;
          if (isInView && !document.hidden) requestRender();
          if (!isInView && animRef.current !== null) {
            cancelAnimationFrame(animRef.current);
            animRef.current = null;
          }
        })
      : null;
    visibilityObserver?.observe(canvas);

    // Build the 3D Blockchain Tower Model
    const NUM_LEVELS = 10;
    const LEVEL_HEIGHT = 135;
    const blocks: Block3D[] = [];

    // 1. Central Core Blocks
    for (let l = 0; l < NUM_LEVELS; l++) {
      const yPos = (l - NUM_LEVELS / 2) * LEVEL_HEIGHT;
      const blockNum = 849200 + l;
      const hashStr = `0x${((blockNum * 9301 + 49297) % 233280).toString(16).toUpperCase().padStart(4, '0')}...${((l * 7331 + 17) % 65535).toString(16).toUpperCase()}`;

      blocks.push({
        id: `tower-core-${l}`,
        blockNumber: blockNum,
        center: { x: 0, y: yPos, z: 0 },
        size: { w: 125, h: 65, d: 125 },
        level: l,
        label: l === 0 ? 'GENESIS BLOCK #849200' : `KINETIC BLOCK #${blockNum}`,
        hash: hashStr,
        isMainTower: true,
      });

      // Satellites orbiting
      blocks.push({
        id: `satellite-a-${l}`,
        blockNumber: blockNum,
        center: { x: -190, y: yPos + 10, z: -90 },
        size: { w: 42, h: 42, d: 42 },
        level: l,
        label: `DISTRICT-${l}A`,
        hash: `0xV${l}A`,
        isMainTower: false,
      });

      blocks.push({
        id: `satellite-b-${l}`,
        blockNumber: blockNum,
        center: { x: 190, y: yPos - 10, z: 90 },
        size: { w: 34, h: 34, d: 34 },
        level: l,
        label: `DISTRICT-${l}B`,
        hash: `0xM${l}`,
        isMainTower: false,
      });
    }

    // Projection math
    const project = (
      p: Point3D,
      rotX: number,
      rotY: number,
      rotZ: number,
      camZ: number,
      focal: number,
      centerX: number,
      centerY: number
    ) => {
      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      // Rotate around Z
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;
      const z3 = z2 + camZ;

      if (z3 <= 10) return null;

      const scale = focal / z3;
      return {
        x: x3 * scale + centerX,
        y: y3 * scale + centerY,
        scale,
        depth: z3,
        raw: { x: x3, y: y3, z: z3 },
      };
    };

    // Get 8 cube vertices
    const getCubeVertices = (center: Point3D, size: { w: number; h: number; d: number }): Point3D[] => {
      const hw = size.w / 2;
      const hh = size.h / 2;
      const hd = size.d / 2;
      return [
        { x: center.x - hw, y: center.y - hh, z: center.z - hd },
        { x: center.x + hw, y: center.y - hh, z: center.z - hd },
        { x: center.x + hw, y: center.y + hh, z: center.z - hd },
        { x: center.x - hw, y: center.y + hh, z: center.z - hd },
        { x: center.x - hw, y: center.y - hh, z: center.z + hd },
        { x: center.x + hw, y: center.y - hh, z: center.z + hd },
        { x: center.x + hw, y: center.y + hh, z: center.z + hd },
        { x: center.x - hw, y: center.y + hh, z: center.z + hd },
      ];
    };

    const CUBE_FACES = [
      [0, 1, 2, 3], // Front
      [5, 4, 7, 6], // Back
      [4, 0, 3, 7], // Left
      [1, 5, 6, 2], // Right
      [4, 5, 1, 0], // Top
      [3, 2, 6, 7], // Bottom
    ];

    // Main 60 FPS Render Loop
    const render = (now: number) => {
      animRef.current = null;
      if (document.hidden || !isInView) return;
      if (now - lastFrameTime < frameInterval) {
        animRef.current = requestAnimationFrame(render);
        return;
      }
      const frameDelta = lastFrameTime === 0
        ? frameInterval / 1000
        : Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;
      timeRef.current += frameDelta;
      const time = timeRef.current;
      const scroll = scrollProgressRef?.current ?? scrollRef.current;
      const palette = THEME_PALETTES[visualMode] || THEME_PALETTES.cyber;

      ctx.clearRect(0, 0, width, height);

      // KINEMATIC CAMERA FROM TOP-LEFT TO BOTTOM-RIGHT WITH ZOOM DYNAMIC:
      // Focus origin is Top-Left (centerX starts shifted left, centerY shifted up)
      // Moving diagonally towards Bottom-Right (centerX shifts right, centerY shifts down)
      const diagShiftX = (scroll - 0.25) * (width * 0.45);
      const diagShiftY = (scroll - 0.25) * (height * 0.4);
      
      const centerX = width * 0.42 + diagShiftX;
      const centerY = height * 0.38 + diagShiftY;

      // Focal Zoom Dynamic: starts close, zooms dynamically as you explore nodes
      const zoomFactor = 1 + Math.sin(scroll * Math.PI) * 0.35 + (scroll * 0.15);
      const focal = Math.min(width, height) * 1.25 * zoomFactor;
      const camZ = 1280 - (scroll * 320); // Zoom in closer as scroll progresses!

      // Diagonal rotation kinematics matching Top-Left to Bottom-Right flow
      const rotY = (autoRotate ? time * 0.32 : 0) + scroll * Math.PI * 2.8 + towerRotation;
      const rotX = 0.42 - (scroll * 0.18); // Tilts dynamically from high top-left down
      const rotZ = -0.22 + (scroll * 0.35); // Diagonal trajectory skew

      // 1. Draw 3D Isometric Ground Grid with Diagonal Pulse
      ctx.save();
      const gridY = (NUM_LEVELS / 2 + 1.2) * LEVEL_HEIGHT;
      const gridSize = 1600;
      const gridStep = 110;

      ctx.strokeStyle = palette.chain;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.22;

      for (let gx = -gridSize; gx <= gridSize; gx += gridStep) {
        const pA = project({ x: gx, y: gridY, z: -gridSize }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        const pB = project({ x: gx, y: gridY, z: gridSize }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        if (pA && pB) {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.stroke();
        }
      }
      for (let gz = -gridSize; gz <= gridSize; gz += gridStep) {
        const pA = project({ x: -gridSize, y: gridY, z: gz }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        const pB = project({ x: gridSize, y: gridY, z: gz }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        if (pA && pB) {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Draw Central Laser Hash Links between Blockchain levels (Vertical chains)
      for (let l = 0; l < NUM_LEVELS - 1; l++) {
        const topCenter = { x: 0, y: (l - NUM_LEVELS / 2) * LEVEL_HEIGHT, z: 0 };
        const bottomCenter = { x: 0, y: (l + 1 - NUM_LEVELS / 2) * LEVEL_HEIGHT, z: 0 };

        const pTop = project(topCenter, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        const pBottom = project(bottomCenter, rotX, rotY, rotZ, camZ, focal, centerX, centerY);

        if (pTop && pBottom) {
          ctx.save();
          ctx.strokeStyle = palette.primary;
          ctx.lineWidth = 2.8 * pTop.scale;
          ctx.globalAlpha = 0.65;
          ctx.beginPath();
          ctx.moveTo(pTop.x, pTop.y);
          ctx.lineTo(pBottom.x, pBottom.y);
          ctx.stroke();

          // Animated data transaction pulse
          const pulseOffset = (time * 1.6 + l * 0.28) % 1;
          const pulseX = pTop.x + (pBottom.x - pTop.x) * pulseOffset;
          const pulseY = pTop.y + (pBottom.y - pTop.y) * pulseOffset;

          ctx.fillStyle = palette.secondary;
          ctx.shadowColor = palette.secondary;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 5 * pTop.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Draw fixed district node connections
      blocks.forEach((b) => {
        if (!b.isMainTower) {
          const corePos = { x: 0, y: b.center.y, z: 0 };
          const pCore = project(corePos, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
          const pSat = project(b.center, rotX, rotY, rotZ, camZ, focal, centerX, centerY);

          if (pCore && pSat) {
            ctx.save();
            ctx.strokeStyle = palette.wire;
            ctx.lineWidth = 1.2 * pSat.scale;
            ctx.globalAlpha = 0.4;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(pCore.x, pCore.y);
            ctx.lineTo(pSat.x, pSat.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      // Project & Depth-Sort Central Monolith Blocks and Faces
      interface RenderableFace {
        points: { x: number; y: number }[];
        avgZ: number;
        blockId: string;
        isCore: boolean;
        isTop: boolean;
        color: string;
        stroke: string;
        scale: number;
        hashText?: string;
      }

      const renderableFaces: RenderableFace[] = [];

      blocks.forEach((block) => {
        const vertices3D = getCubeVertices(block.center, block.size);
        const projVerts = vertices3D.map((v) =>
          project(v, rotX, rotY, rotZ, camZ, focal, centerX, centerY)
        );

        if (projVerts.some((v) => v === null)) return;

        const validVerts = projVerts as NonNullable<(typeof projVerts)[0]>[];

        CUBE_FACES.forEach((faceIndices, fIdx) => {
          const v0 = validVerts[faceIndices[0]];
          const v1 = validVerts[faceIndices[1]];
          const v2 = validVerts[faceIndices[2]];
          const v3 = validVerts[faceIndices[3]];

          const cross =
            (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x);

          if (cross > 0) {
            const avgZ = (v0.depth + v1.depth + v2.depth + v3.depth) / 4;
            const avgScale = (v0.scale + v1.scale + v2.scale + v3.scale) / 4;

            renderableFaces.push({
              points: [
                { x: v0.x, y: v0.y },
                { x: v1.x, y: v1.y },
                { x: v2.x, y: v2.y },
                { x: v3.x, y: v3.y },
              ],
              avgZ,
              blockId: block.id,
              isCore: block.isMainTower,
              isTop: fIdx === 4,
              color: fIdx === 4 ? palette.glow : palette.fill,
              stroke: block.isMainTower ? palette.wire : palette.chain,
              scale: avgScale,
              hashText: fIdx === 0 && block.isMainTower ? block.hash : undefined,
            });
          }
        });
      });

      // Painter's Algorithm Depth Sort
      renderableFaces.sort((a, b) => b.avgZ - a.avgZ);

      // Render faces
      renderableFaces.forEach((face) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(face.points[0].x, face.points[0].y);
        for (let i = 1; i < face.points.length; i++) {
          ctx.lineTo(face.points[i].x, face.points[i].y);
        }
        ctx.closePath();

        ctx.fillStyle = face.color;
        ctx.fill();

        ctx.strokeStyle = face.stroke;
        ctx.lineWidth = Math.max(1, (face.isCore ? 2.2 : 1.2) * face.scale);
        ctx.stroke();

        if (face.hashText && face.scale > 0.6) {
          const midX = (face.points[0].x + face.points[2].x) / 2;
          const midY = (face.points[0].y + face.points[2].y) / 2;
          ctx.fillStyle = palette.secondary;
          ctx.font = `bold ${Math.round(11 * face.scale)}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(face.hashText, midX, midY);
        }

        ctx.restore();
      });

      // Glowing Vertex Points & Holographic Rings
      blocks.forEach((block) => {
        const pCenter = project(block.center, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        if (pCenter && block.isMainTower) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pCenter.x, pCenter.y, 4.5 * pCenter.scale, 0, Math.PI * 2);
          ctx.fillStyle = palette.secondary;
          ctx.shadowColor = palette.secondary;
          ctx.shadowBlur = 16;
          ctx.fill();

          ctx.strokeStyle = palette.primary;
          ctx.lineWidth = 1.2 * pCenter.scale;
          ctx.globalAlpha = 0.45;
          ctx.beginPath();
          ctx.ellipse(
            pCenter.x,
            pCenter.y,
            95 * pCenter.scale,
            26 * pCenter.scale,
            rotZ + block.level * 0.4,
            0,
            Math.PI * 2
          );
          ctx.stroke();
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (animRef.current === null && !document.hidden && isInView) {
        animRef.current = requestAnimationFrame(render);
      }
    };

    requestRender();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [visualMode, towerRotation, autoRotate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 gpu-layer"
      style={{ opacity: 0.95 }}
    />
  );
};
