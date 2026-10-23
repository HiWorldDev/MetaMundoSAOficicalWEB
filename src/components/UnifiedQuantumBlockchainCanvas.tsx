import React, { useEffect, useRef } from 'react';

import realEstateTowersImg from '../assets/images/real_estate_towers_night_1786788975429.jpg';

interface UnifiedQuantumBlockchainCanvasProps {
  visualMode?: 'cyber' | 'gold' | 'emerald' | 'wireframe';
  towerRotation?: number;
  autoRotate?: boolean;
  scrollProgressRef?: { current: number };
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

type BuildingType = 'corporate_glass' | 'luxury_hotel' | 'financial_center' | 'institution' | 'tech_complex';

interface WindowPattern {
  cols: number;
  rows: number;
  litMatrix: boolean[][];
  colorPalette: string[];
}

interface Building3D {
  id: string;
  name: string;
  type: BuildingType;
  x: number;
  z: number;
  w: number;
  d: number;
  targetHeight: number;
  color: string;
  wireColor: string;
  glowColor: string;
  stories: number;
  hasSpire: boolean;
  spireHeight: number;
  hasHelipad: boolean;
  hasSkybridge: boolean;
  hasRooftopGarden: boolean;
  hasTicker: boolean;
  tickerText?: string;
  bridgeTargetIdx?: number;
  buildThreshold: number;
  pulsePhase: number;
  windowPattern: WindowPattern;
  balconies?: boolean;
}

export const UnifiedQuantumBlockchainCanvas: React.FC<UnifiedQuantumBlockchainCanvasProps> = ({
  towerRotation = 0,
  autoRotate = true,
  scrollProgressRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    const hwCores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const isLowEnd = hwCores <= 4 || (deviceMemory !== undefined && deviceMemory <= 4)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 0.85 : isMobile ? 1 : 1.25);
    const frameInterval = isLowEnd || isMobile ? 1000 / 30 : 1000 / 50;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
    };

    setupCanvasSize();

    let isDocumentVisible = !document.hidden;
    const scheduleRender = () => {
      if (isDocumentVisible && animRef.current === null) {
        animRef.current = requestAnimationFrame(render);
      }
    };
    const handleVisibility = () => {
      isDocumentVisible = !document.hidden;
      if (!isDocumentVisible && animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      } else if (isDocumentVisible) {
        scheduleRender();
      }
    };
    const handleScroll = () => {
      if (!autoRotate) scheduleRender();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      setupCanvasSize();
      scheduleRender();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Preload Ultra-Photorealistic Architectural Sky & Tower Plates
    const bgSkylineImg = new Image();
    bgSkylineImg.src = realEstateTowersImg;
    let skylineLoaded = false;
    bgSkylineImg.onload = () => {
      skylineLoaded = true;
    };

    const NUM_BUILDINGS = isLowEnd ? 16 : isMobile ? 26 : 44;
    const buildings: Building3D[] = [];

    const corporateNames = [
      'GLOBAL FINTECH TOWER', 'METAMUNDO HEADQUARTERS', 'CITADEL CORP GLASS', 'APEX VENTURES PLAZA',
      'VANGUARD AI TOWER', 'HORIZON WEALTH BANK', 'NEXUS QUANTUM CAPITAL', 'CHRONOS ASSET MANAGEMENT',
      'CRYSTAL BAY CORP', 'AURORA SPATIAL LABS', 'SOLARIS ENERGY TOWER', 'BLACKROCK MATRIX HUB',
      'HYPERION BIOTECH', 'SILICON SPATIAL HQ', 'CYBERDYNE LOGISTICS', 'ASTRA TELECOM CENTER'
    ];

    const hotelNames = [
      'GRAND METROPOLIS HOTEL & RESIDENCES', 'THE RITZ OBSIDIAN PALACE', 'SHANGRI-LA SKY TOWER',
      'FOUR SEASONS CYBER BAY', 'MANDARIN LUXURY SUITES', 'WALDORF ASTORIA HIGH-RISE',
      'PARAMOUNT RESIDENTIAL LOFTS', 'PENTHOUSE EMERALD TOWER'
    ];

    const institutionNames = [
      'BOLSA DE VALORES & STOCK EXCHANGE', 'INSTITUTO NACIONAL DE INTELIGENCIA ARTIFICIAL',
      'CENTRAL WORLD BANK & RESERVES', 'BANCO CENTRAL INTERNACIONAL', 'CENTRO DE CONVENCIONES Y NEGOCIOS',
      'MINISTERIO DE CIENCIA & TECNOLOGÍA', 'TRIBUNAL DE COMERCIO GLOBAL', 'ACADEMIA DE INNOVACIÓN DIGITAL'
    ];

    const techComplexNames = [
      'DATA CENTER CLOUD VAULT 01', 'COMPUTACIÓN CUÁNTICA APEX', 'HOLOGRAPHIC FOUNDRY 04',
      'NEURAL CLOUD MEGACENTER', 'SATÉLITE GROUND ARRAY', 'MICROCHIP SILICON TOWER'
    ];

    const windowPalettes = [
      ['#fef08a', '#ffffff', '#fde047', '#38bdf8'], // Warm Corporate Office Lights + Gold
      ['#38bdf8', '#00f0ff', '#ffffff', '#818cf8'], // Cyber Clean Cyan & White Glass
      ['#e0f2fe', '#bae6fd', '#ffffff', '#67e8f9'], // High-reflectivity Modern Curtain Wall
      ['#fed7aa', '#ffedd5', '#fde68a', '#ffffff'], // Warm Residential/Hotel Balconies
    ];

    const tickerQuotes = [
      '▲ METAMUNDO +14.8%  |  ▲ NASDAQ TECH +4.2%  |  ▲ ETH $4,850  |  ● TPS 7,200',
      '▲ AI QUANTUM INDEX +8.9%  |  ▲ LIQUID LAVA +22.4%  |  ▲ GLOBAL RESERVES $4.2T',
      '● BLOCK #849,208 VALIDATED  |  ▲ HIGH HOROLOGY +6.1%  |  ▲ SPATIAL WEB +18.7%'
    ];

    // Multi-Ring Urban Layout: Financial District Core, Enterprise Corridor, Residential Waterfront
    for (let i = 0; i < NUM_BUILDINGS; i++) {
      const ring = Math.floor(i / 16); // 0 to 4 rings
      const buildingsInRing = 16 + ring * 4;
      const ringIdx = i % buildingsInRing;
      const angle = (ringIdx / buildingsInRing) * Math.PI * 2 + (ring * 0.42);
      
      const dist = 240 + ring * 210 + (Math.random() * 80 - 40);
      const bx = Math.cos(angle) * dist;
      const bz = Math.sin(angle) * dist;

      // Determine building typology based on position & ring
      let type: BuildingType = 'corporate_glass';
      let name = corporateNames[i % corporateNames.length];
      let bWidth = 90 + Math.random() * 85;
      let bDepth = 90 + Math.random() * 85;
      let bTargetHeight = 360 + Math.random() * 620;

      if (ring === 0 || (ring === 1 && i % 3 === 0)) {
        // Center Core: Monolithic Financial Skyscrapers
        type = 'financial_center';
        name = corporateNames[i % corporateNames.length];
        bTargetHeight = 620 + Math.random() * 560;
        bWidth = 115 + Math.random() * 65;
        bDepth = 115 + Math.random() * 65;
      } else if (i % 4 === 1) {
        // Luxury Hotels & High-Rise Apartments
        type = 'luxury_hotel';
        name = hotelNames[i % hotelNames.length];
        bTargetHeight = 400 + Math.random() * 400;
        bWidth = 85 + Math.random() * 65;
        bDepth = 85 + Math.random() * 65;
      } else if (i % 5 === 2) {
        // Institutions & Civic Centers (Wide footprint, stepped terraces)
        type = 'institution';
        name = institutionNames[i % institutionNames.length];
        bTargetHeight = 260 + Math.random() * 280;
        bWidth = 135 + Math.random() * 75;
        bDepth = 135 + Math.random() * 75;
      } else if (i % 6 === 3) {
        // High-tech R&D complexes
        type = 'tech_complex';
        name = techComplexNames[i % techComplexNames.length];
        bTargetHeight = 340 + Math.random() * 360;
      }

      const stories = Math.max(14, Math.floor(bTargetHeight / 15));
      const cols = Math.max(5, Math.floor(bWidth / 12));

      // Generate randomized realistic office / residential window illumination matrix
      const litMatrix: boolean[][] = [];
      for (let s = 0; s < stories; s++) {
        const floorRow: boolean[] = [];
        // Upper levels have higher luxury illumination
        const occupancyRate = s > stories * 0.7 ? 0.88 : (type === 'corporate_glass' ? 0.82 : 0.74);
        for (let c = 0; c < cols; c++) {
          floorRow.push(Math.random() < occupancyRate);
        }
        litMatrix.push(floorRow);
      }

      const palette = windowPalettes[i % windowPalettes.length];
      const hasSpire = bTargetHeight > 420 && Math.random() > 0.32;
      const hasHelipad = bTargetHeight > 380 && !hasSpire && Math.random() > 0.38;
      const hasTicker = type === 'financial_center' || (type === 'corporate_glass' && Math.random() > 0.45);

      buildings.push({
        id: `bld-${i}`,
        name,
        type,
        x: bx,
        z: bz,
        w: bWidth,
        d: bDepth,
        targetHeight: bTargetHeight,
        color: type === 'corporate_glass' ? 'rgba(8, 14, 28, 0.95)' : 'rgba(12, 16, 32, 0.95)',
        wireColor: type === 'financial_center' ? '#00f0ff' : type === 'luxury_hotel' ? '#fbbf24' : '#38bdf8',
        glowColor: type === 'financial_center' ? 'rgba(0, 240, 255, 0.85)' : 'rgba(56, 189, 248, 0.75)',
        stories,
        hasSpire,
        spireHeight: 55 + Math.random() * 95,
        hasHelipad,
        hasSkybridge: i > 0 && Math.random() > 0.72,
        hasRooftopGarden: type === 'luxury_hotel' && Math.random() > 0.45,
        hasTicker,
        tickerText: tickerQuotes[i % tickerQuotes.length],
        bridgeTargetIdx: Math.max(0, i - 1),
        buildThreshold: Math.min(0.72, (i / NUM_BUILDINGS) * 0.55),
        pulsePhase: Math.random() * Math.PI * 2,
        windowPattern: {
          cols,
          rows: stories,
          litMatrix,
          colorPalette: palette,
        },
        balconies: type === 'luxury_hotel',
      });
    }

    // 4. Projection Engine
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
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;
      const z3 = z2 + camZ;

      if (z3 <= 20) return null;

      const scale = focal / z3;
      return {
        x: x3 * scale + centerX,
        y: y3 * scale + centerY,
        scale,
        depth: z3,
        raw: { x: x3, y: y3, z: z3 },
      };
    };

    // Render loop with high-precision time & buttery smooth lerp interpolation
    let lastTime = performance.now();
    let lastFrameTime = 0;
    let smoothScroll = scrollRef.current;
    let smoothRotY = 0;

    const render = () => {
      if (!isDocumentVisible) {
        animRef.current = null;
        return;
      }

      const now = performance.now();
      if (now - lastFrameTime < frameInterval) {
        animRef.current = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      lastFrameTime = now;

      timeRef.current += dt;
      const time = timeRef.current;

      if (scrollProgressRef) {
        scrollRef.current = Math.min(1, Math.max(0, scrollProgressRef.current));
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          scrollRef.current = Math.min(1, Math.max(0, window.scrollY / docHeight));
        }
      }

      // Silky Smooth LERP for scroll progression
      smoothScroll += (scrollRef.current - smoothScroll) * 0.09;
      const scroll = smoothScroll;

      ctx.clearRect(0, 0, width, height);

      // A. Deep Astronomical Cosmic Sky & Megalopolis Horizon Glow
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 80,
        width * 0.5, height * 0.6, Math.max(width, height) * 1.1
      );
      bgGrad.addColorStop(0, '#0a1020');
      bgGrad.addColorStop(0.35, '#050814');
      bgGrad.addColorStop(0.7, '#020308');
      bgGrad.addColorStop(1, '#010204');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // PHOTOREALISTIC 8K ARCHITECTURAL HORIZON PLATE (Composite Blending with Parallax)
      if (skylineLoaded) {
        ctx.save();
        ctx.globalAlpha = 0.38 + Math.min(0.25, scroll * 0.2);
        ctx.filter = 'contrast(1.15) brightness(0.85) saturate(1.2)';
        
        // Horizontal parallax pan with camera rotation
        const panX = -((smoothRotY * 120) % width) - (scroll * 180);
        const imgH = height * 0.85;
        const imgW = (imgH * bgSkylineImg.width) / bgSkylineImg.height;
        const imgY = height * 0.12;

        // Draw tiling background image for continuous 360 degree panoramic skyline
        ctx.drawImage(bgSkylineImg, panX, imgY, imgW, imgH);
        ctx.drawImage(bgSkylineImg, panX + imgW, imgY, imgW, imgH);
        ctx.drawImage(bgSkylineImg, panX - imgW, imgY, imgW, imgH);
        ctx.restore();
      }

      // Atmospheric Nebula & Megalopolis Skyline Haze (Cyan & Indigo Volumetric Glow)
      const domeGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.72, 50,
        width * 0.5, height * 0.72, width * 0.85
      );
      domeGrad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
      domeGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.14)');
      domeGrad.addColorStop(0.7, 'rgba(217, 70, 239, 0.05)');
      domeGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = domeGrad;
      ctx.fillRect(0, 0, width, height);

      // Cinematic Dynamic Camera Trajectory
      const diagShiftX = (scroll - 0.2) * (width * 0.42);
      const diagShiftY = (scroll - 0.2) * (height * 0.3);
      const centerX = width * 0.48 + diagShiftX;
      const centerY = height * 0.46 + diagShiftY;

      const zoomFactor = 1 + Math.sin(scroll * Math.PI) * 0.32 + scroll * 0.22;
      const focal = Math.min(width, height) * 1.38 * zoomFactor;
      const camZ = 1550 - scroll * 480;

      // Isometric Metropolis Horizon Angles
      const targetRotY = (autoRotate ? time * 0.16 : 0) + scroll * Math.PI * 2.2 + towerRotation;
      smoothRotY += (targetRotY - smoothRotY) * 0.1;
      const rotY = smoothRotY;
      const rotX = 0.48 - scroll * 0.14;
      const rotZ = -0.12 + scroll * 0.22;

      const groundY = 220; // Street level

      // B. Reflective Wet Asphalt Ground Plane & Waterfront Grid
      ctx.save();
      const gridSize = 3200;
      const gridStep = isLowEnd ? 400 : isMobile ? 260 : 160;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
      ctx.lineWidth = 0.9;

      for (let gx = -gridSize; gx <= gridSize; gx += gridStep) {
        const pA = project({ x: gx, y: groundY, z: -gridSize }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        const pB = project({ x: gx, y: groundY, z: gridSize }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        if (pA && pB) {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.stroke();
        }
      }
      for (let gz = -gridSize; gz <= gridSize; gz += gridStep) {
        const pA = project({ x: -gridSize, y: groundY, z: gz }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        const pB = project({ x: gridSize, y: groundY, z: gz }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        if (pA && pB) {
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // E. 3D Architectural Metropolis: Depth Sorting for Perfect Occlusion
      const sortedBuildings = buildings.map((b) => {
        const constructRatio = Math.max(0, Math.min(1, (scroll - b.buildThreshold) / 0.32));
        const currentH = b.targetHeight * (0.18 + constructRatio * 0.82);
        const centerPos: Point3D = { x: b.x, y: groundY - currentH / 2, z: b.z };

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = centerPos.x * cosY + centerPos.z * sinY;
        const z1 = -centerPos.x * sinY + centerPos.z * cosY;
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const z2 = centerPos.y * sinX + z1 * cosX;
        const depth = z2 + camZ;

        return {
          building: b,
          currentH,
          constructRatio,
          depth,
        };
      }).sort((a, b) => b.depth - a.depth);

      // Render Each Skyscraper with Thousands of Lit Office Windows & Glass Mullions
      sortedBuildings.forEach(({ building: b, currentH, constructRatio }) => {
        const hw = b.w / 2;
        const hd = b.d / 2;
        const topY = groundY - currentH;
        const botY = groundY;

        // 8 Corners of the 3D Prism
        const corners: Point3D[] = [
          { x: b.x - hw, y: botY, z: b.z - hd }, // 0: Bot Back-Left
          { x: b.x + hw, y: botY, z: b.z - hd }, // 1: Bot Back-Right
          { x: b.x + hw, y: botY, z: b.z + hd }, // 2: Bot Front-Right
          { x: b.x - hw, y: botY, z: b.z + hd }, // 3: Bot Front-Left
          { x: b.x - hw, y: topY, z: b.z - hd }, // 4: Top Back-Left
          { x: b.x + hw, y: topY, z: b.z - hd }, // 5: Top Back-Right
          { x: b.x + hw, y: topY, z: b.z + hd }, // 6: Top Front-Right
          { x: b.x - hw, y: topY, z: b.z + hd }, // 7: Top Front-Left
        ];

        const projCorners = corners.map((c) =>
          project(c, rotX, rotY, rotZ, camZ, focal, centerX, centerY)
        );

        if (projCorners.some((p) => p === null)) return;
        const pts = projCorners as NonNullable<(typeof projCorners)[0]>[];

        ctx.save();

        // 1. Facades Rendering: Front & Right Facing Walls with Real Estate Curtain Glass + Diagrid Bracing
        const faces = [
          { idxs: [3, 2, 6, 7], isFront: true },  // Front Face
          { idxs: [2, 1, 5, 6], isRight: true },  // Right Face
          { idxs: [0, 3, 7, 4], isLeft: true },   // Left Face
          { idxs: [1, 0, 4, 5], isBack: true },   // Back Face
        ];

        faces.forEach(({ idxs, isFront, isRight }) => {
          ctx.beginPath();
          ctx.moveTo(pts[idxs[0]].x, pts[idxs[0]].y);
          ctx.lineTo(pts[idxs[1]].x, pts[idxs[1]].y);
          ctx.lineTo(pts[idxs[2]].x, pts[idxs[2]].y);
          ctx.lineTo(pts[idxs[3]].x, pts[idxs[3]].y);
          ctx.closePath();

          // Ultra-Reflective Corporate Dark Glass Curtain Wall with Low-E Reflections
          const wallGrad = ctx.createLinearGradient(
            pts[idxs[0]].x, pts[idxs[0]].y,
            pts[idxs[2]].x, pts[idxs[2]].y
          );
          if (b.type === 'corporate_glass' || b.type === 'financial_center') {
            wallGrad.addColorStop(0, `rgba(4, 9, 20, ${0.92 + constructRatio * 0.06})`);
            wallGrad.addColorStop(0.3, `rgba(10, 18, 38, ${0.95})`);
            wallGrad.addColorStop(0.7, `rgba(16, 28, 54, ${0.96})`);
            wallGrad.addColorStop(1, `rgba(8, 14, 30, ${0.98})`);
          } else if (b.type === 'luxury_hotel') {
            wallGrad.addColorStop(0, `rgba(12, 10, 20, 0.94)`);
            wallGrad.addColorStop(0.5, `rgba(28, 20, 34, 0.96)`);
            wallGrad.addColorStop(1, `rgba(10, 8, 16, 0.98)`);
          } else {
            wallGrad.addColorStop(0, `rgba(6, 12, 22, 0.94)`);
            wallGrad.addColorStop(0.5, `rgba(14, 22, 38, 0.96)`);
            wallGrad.addColorStop(1, `rgba(8, 14, 26, 0.98)`);
          }
          ctx.fillStyle = wallGrad;
          ctx.fill();

          // Outer Structural Pillar Frame (Metallic Architectural Extrusion)
          ctx.strokeStyle = constructRatio > 0.8 ? b.wireColor : 'rgba(0, 240, 255, 0.85)';
          ctx.lineWidth = isFront || isRight ? 1.4 : 0.8;
          ctx.stroke();

          // 2. REAL ESTATE FLOOR SLABS & LIT CURTAIN WALL (Architectural Floorplates)
          if ((isFront || isRight) && constructRatio > 0.25) {
            const numFloors = Math.min(b.stories, Math.floor(b.stories * constructRatio));
            const numCols = Math.min(b.windowPattern.cols, isLowEnd ? 4 : isMobile ? 5 : 7);
            const detailStep = isLowEnd ? 6 : isMobile ? 4 : 2;
            const pat = b.windowPattern;

            const p0 = pts[idxs[0]]; // bottom-left
            const p1 = pts[idxs[1]]; // bottom-right
            const p2 = pts[idxs[2]]; // top-right
            const p3 = pts[idxs[3]]; // top-left

            // Structural Diagrid Mega-Frame X-Bracing (Architectural Real Estate High-Rise)
            if (b.type === 'financial_center' || b.stories > 25) {
              ctx.save();
              ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
              ctx.lineWidth = 1.2;
              const diagridSteps = Math.max(2, Math.floor(numFloors / 6));
              for (let d = 0; d < diagridSteps; d++) {
                const va = (d * 6) / b.stories;
                const vb = Math.min(1, ((d + 1) * 6) / b.stories);
                
                const leftA_x = p0.x + (p3.x - p0.x) * va;
                const leftA_y = p0.y + (p3.y - p0.y) * va;
                const rightA_x = p1.x + (p2.x - p1.x) * va;
                const rightA_y = p1.y + (p2.y - p1.y) * va;

                const leftB_x = p0.x + (p3.x - p0.x) * vb;
                const leftB_y = p0.y + (p3.y - p0.y) * vb;
                const rightB_x = p1.x + (p2.x - p1.x) * vb;
                const rightB_y = p1.y + (p2.y - p1.y) * vb;

                // X-Brace line 1
                ctx.beginPath();
                ctx.moveTo(leftA_x, leftA_y);
                ctx.lineTo(rightB_x, rightB_y);
                ctx.stroke();

                // X-Brace line 2
                ctx.beginPath();
                ctx.moveTo(rightA_x, rightA_y);
                ctx.lineTo(leftB_x, leftB_y);
                ctx.stroke();
              }
              ctx.restore();
            }

            // Architectural Floor Slab Lines (Losas de Entrepiso Real Estate)
            ctx.save();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
            ctx.lineWidth = 1.0;
            for (let fl = 0; fl < numFloors; fl += detailStep) {
              const v = fl / b.stories;
              const sLeftX = p0.x + (p3.x - p0.x) * v;
              const sLeftY = p0.y + (p3.y - p0.y) * v;
              const sRightX = p1.x + (p2.x - p1.x) * v;
              const sRightY = p1.y + (p2.y - p1.y) * v;

              ctx.beginPath();
              ctx.moveTo(sLeftX, sLeftY);
              ctx.lineTo(sRightX, sRightY);
              ctx.stroke();
            }
            ctx.restore();

            // Vertical Curtain Wall Mullions
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 0.8;
            for (let col = 1; col < numCols; col++) {
              const u = col / numCols;
              const bColX = p0.x + (p1.x - p0.x) * u;
              const bColY = p0.y + (p1.y - p0.y) * u;
              const tColX = p3.x + (p2.x - p3.x) * u;
              const tColY = p3.y + (p2.y - p3.y) * u;

              ctx.beginPath();
              ctx.moveTo(bColX, bColY);
              ctx.lineTo(tColX, tColY);
              ctx.stroke();
            }
            ctx.restore();

            // Hyperdetailed Lit Real Estate Offices & Residential Suites
            for (let fl = 0; fl < numFloors; fl += detailStep) {
              const v1 = fl / b.stories;
              const v2 = (fl + 1.2) / b.stories;

              const leftBotX = p0.x + (p3.x - p0.x) * v1;
              const leftBotY = p0.y + (p3.y - p0.y) * v1;
              const rightBotX = p1.x + (p2.x - p1.x) * v1;
              const rightBotY = p1.y + (p2.y - p1.y) * v1;

              const leftTopX = p0.x + (p3.x - p0.x) * v2;
              const leftTopY = p0.y + (p3.y - p0.y) * v2;
              const rightTopX = p1.x + (p2.x - p1.x) * v2;
              const rightTopY = p1.y + (p2.y - p1.y) * v2;

              for (let col = 0; col < numCols; col++) {
                const isLit = pat.litMatrix[fl] ? pat.litMatrix[fl][col] : true;
                if (!isLit) continue;

                const u1 = (col + 0.18) / numCols;
                const u2 = (col + 0.82) / numCols;

                const wBotL_x = leftBotX + (rightBotX - leftBotX) * u1;
                const wBotL_y = leftBotY + (rightBotY - leftBotY) * u1;
                const wBotR_x = leftBotX + (rightBotX - leftBotX) * u2;
                const wBotR_y = leftBotY + (rightBotY - leftBotY) * u2;
                const wTopR_x = leftTopX + (rightTopX - leftTopX) * u2;
                const wTopR_y = leftTopY + (rightTopY - leftTopY) * u2;
                const wTopL_x = leftTopX + (rightTopX - leftTopX) * u1;
                const wTopL_y = leftTopY + (rightTopY - leftTopY) * u1;

                ctx.beginPath();
                ctx.moveTo(wBotL_x, wBotL_y);
                ctx.lineTo(wBotR_x, wBotR_y);
                ctx.lineTo(wTopR_x, wTopR_y);
                ctx.lineTo(wTopL_x, wTopL_y);
                ctx.closePath();

                const colIdx = (fl + col) % pat.colorPalette.length;
                ctx.fillStyle = pat.colorPalette[colIdx];
                ctx.shadowColor = pat.colorPalette[colIdx];
                ctx.shadowBlur = isLowEnd ? 0 : 4;
                ctx.fill();
              }
            }
          }
        });

        // 2.5 Real Estate Architectural Building Callout Label (Top Skyscraper Identifier)
        if (b.type === 'financial_center' || b.hasSpire) {
          const topCenter = {
            x: (pts[4].x + pts[5].x + pts[6].x + pts[7].x) / 4,
            y: (pts[4].y + pts[5].y + pts[6].y + pts[7].y) / 4 - 14,
          };
          if (pts[4].scale > 0.003) {
            ctx.save();
            ctx.font = 'bold 8px monospace';
            ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
            ctx.textAlign = 'center';
            ctx.fillText(`TORRE // +${Math.round(b.targetHeight)}m`, topCenter.x, topCenter.y);
            ctx.restore();
          }
        }

        // 3. Rooftop Architecture: Penthouse / Helipad / Solar Deck / Spire (Top Face 4,5,6,7)
        ctx.beginPath();
        ctx.moveTo(pts[4].x, pts[4].y);
        ctx.lineTo(pts[5].x, pts[5].y);
        ctx.lineTo(pts[6].x, pts[6].y);
        ctx.lineTo(pts[7].x, pts[7].y);
        ctx.closePath();

        const roofGrad = ctx.createLinearGradient(pts[4].x, pts[4].y, pts[6].x, pts[6].y);
        roofGrad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
        roofGrad.addColorStop(1, 'rgba(99, 102, 241, 0.6)');
        ctx.fillStyle = roofGrad;
        ctx.fill();
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 4. Rooftop Mechanical Elevator Box & Helipad 'H'
        if (b.hasHelipad && constructRatio > 0.7) {
          const centerRoof = {
            x: (pts[4].x + pts[5].x + pts[6].x + pts[7].x) / 4,
            y: (pts[4].y + pts[5].y + pts[6].y + pts[7].y) / 4,
          };
          const padRadius = Math.max(6, 18 * pts[4].scale);

          // Helipad Ring
          ctx.beginPath();
          ctx.arc(centerRoof.x, centerRoof.y, padRadius, 0, Math.PI * 2);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Flashing Green Navigation Lights
          ctx.beginPath();
          ctx.arc(centerRoof.x, centerRoof.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = Math.sin(time * 5 + b.pulsePhase) > 0 ? '#10b981' : '#ffffff';
          ctx.fill();
        }

        // 5. Rooftop Communication Laser Spire with Aviation Warning Beacon
        if (b.hasSpire && constructRatio > 0.6) {
          const spireTip: Point3D = { x: b.x, y: topY - b.spireHeight, z: b.z };
          const pTip = project(spireTip, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
          const pCenterRoof = project({ x: b.x, y: topY, z: b.z }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);

          if (pTip && pCenterRoof) {
            ctx.beginPath();
            ctx.moveTo(pCenterRoof.x, pCenterRoof.y);
            ctx.lineTo(pTip.x, pTip.y);
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 2.0;
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 14;
            ctx.stroke();

            // Pulsing Red / White Aviation Light
            ctx.beginPath();
            ctx.arc(pTip.x, pTip.y, Math.max(2, 3.5 * pTip.scale), 0, Math.PI * 2);
            ctx.fillStyle = Math.sin(time * 6 + b.pulsePhase) > 0 ? '#ef4444' : '#ffffff';
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 10;
            ctx.fill();
          }
        }

        // 6. Holographic Construction Elevation Scan Grid
        if (constructRatio < 0.96 && constructRatio > 0.04) {
          const scanY = topY + Math.sin(time * 4) * 16;
          const pScan1 = project({ x: b.x - hw, y: scanY, z: b.z - hd }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
          const pScan2 = project({ x: b.x + hw, y: scanY, z: b.z + hd }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
          if (pScan1 && pScan2) {
            ctx.beginPath();
            ctx.moveTo(pScan1.x, pScan1.y);
            ctx.lineTo(pScan2.x, pScan2.y);
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 12;
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      // F. Inter-Skyscraper Laser Skybridges
      ctx.save();
      buildings.forEach((b, idx) => {
        if (b.hasSkybridge && b.bridgeTargetIdx !== undefined) {
          const target = buildings[b.bridgeTargetIdx];
          const bridgeY = groundY - Math.min(b.targetHeight, target.targetHeight) * 0.72;

          const pA = project({ x: b.x, y: bridgeY, z: b.z }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
          const pB = project({ x: target.x, y: bridgeY, z: target.z }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);

          if (pA && pB) {
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
            ctx.lineWidth = 3.0 * pA.scale;
            ctx.stroke();

            // High-Speed Data Transit Capsule
            const bridgeProgress = (time * 0.9 + idx * 0.15) % 1;
            const px = pA.x + (pB.x - pA.x) * bridgeProgress;
            const py = pA.y + (pB.y - pA.y) * bridgeProgress;
            ctx.beginPath();
            ctx.arc(px, py, 4.0 * pA.scale, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 12;
            ctx.fill();
          }
        }
      });
      ctx.restore();

      // G. Monumental Sky Laser Searchlights
      ctx.save();
      const numBeams = 8;
      for (let b = 0; b < numBeams; b++) {
        const bAngle = (b / numBeams) * Math.PI * 2 + time * 0.04;
        const bDist = 720;
        const pBase = project({ x: Math.cos(bAngle) * bDist, y: groundY, z: Math.sin(bAngle) * bDist }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);
        const pSky = project({ x: Math.cos(bAngle) * bDist + Math.sin(time + b) * 80, y: -1100, z: Math.sin(bAngle) * bDist }, rotX, rotY, rotZ, camZ, focal, centerX, centerY);

        if (pBase && pSky) {
          ctx.beginPath();
          ctx.moveTo(pBase.x, pBase.y);
          ctx.lineTo(pSky.x, pSky.y);
          ctx.strokeStyle = b % 2 === 0 ? 'rgba(0, 240, 255, 0.28)' : 'rgba(99, 102, 241, 0.25)';
          ctx.lineWidth = 4.0 * pBase.scale;
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 20;
          ctx.stroke();
        }
      }

      // 9. Penthouse Executive Suite Architectural Framework & Glass Horizon Glare
      if (scroll > 0.6) {
        const officeBlend = Math.min(1, (scroll - 0.6) / 0.35);
        ctx.save();
        ctx.globalAlpha = officeBlend * 0.45;
        
        // Penthouse glass floor sheen
        const floorGrad = ctx.createLinearGradient(0, height * 0.75, 0, height);
        floorGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        floorGrad.addColorStop(1, 'rgba(8, 20, 45, 0.65)');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, height * 0.75, width, height * 0.25);

        // Architectural Glass Mullion Lines
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
        ctx.lineWidth = 1.5;
        [0.18, 0.5, 0.82].forEach((ratio) => {
          ctx.beginPath();
          ctx.moveTo(width * ratio, 0);
          ctx.lineTo(width * ratio, height);
          ctx.stroke();
        });
        ctx.restore();
      }

      ctx.restore();

      animRef.current = autoRotate ? requestAnimationFrame(render) : null;
    };

    scheduleRender();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
    };
  }, [towerRotation, autoRotate, scrollProgressRef]);

  return (
    <div
      id="unified-quantum-blockchain-canvas"
      className="fixed inset-0 z-0 h-full w-full overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block gpu-layer"
      />
    </div>
  );
};
