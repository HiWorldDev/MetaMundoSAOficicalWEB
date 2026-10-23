import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Play } from 'lucide-react';
import { isLowEndDevice } from '../utils/cardClipPathAnimation';

gsap.registerPlugin(ScrollTrigger);

interface DiagonalBlockchainTowerSectionProps {
  onOpenInquiry: () => void;
  scrollProgressRef: { current: number };
}

const PROJECTS = [
  {
    id: '01',
    name: 'RADIO SÓNICA',
    client: 'Radio Sónica',
    category: 'RADIO ONLINE',
    url: 'https://sonicaradio.com.ar/',
    preview: 'sonica-radio',
    accent: '#35e6f2',
    description: 'Programación, radio en vivo y presencia digital.',
  },
  {
    id: '02',
    name: 'EMI BRANDAN',
    client: 'Emi Brandan',
    category: 'MARCA PERSONAL',
    url: 'https://emibrandan.com/',
    preview: 'emi-brandan',
    accent: '#8d83ff',
    description: 'Identidad personal y presentación de proyectos.',
  },
  {
    id: '03',
    name: 'NORTRONIC ACADEMIA',
    client: 'Nortronic Academia',
    category: 'EDUCACIÓN MUSICAL',
    url: 'https://nortronic-academia.com.ar/',
    preview: 'nortronic-academia',
    accent: '#41dbbf',
    description: 'Una plataforma para conocer la academia y su propuesta.',
  },
  {
    id: '04',
    name: 'SERVIDOR SATELITAL',
    client: 'Servidor Satelital',
    category: 'CONECTIVIDAD',
    url: 'https://servidorsatelital.com.ar/',
    preview: 'servidor-satelital',
    accent: '#4aaeff',
    description: 'Servicios y soluciones de conectividad satelital.',
  },
  {
    id: '05',
    name: 'ARGENSALTA PROPIEDADES',
    client: 'Argensalta Propiedades',
    category: 'REAL ESTATE',
    url: 'https://argensaltapropiedades.com.ar/',
    preview: 'argensalta-propiedades',
    accent: '#ffc36b',
    description: 'Propiedades y oportunidades inmobiliarias en Salta.',
  },
  {
    id: '06',
    name: 'COLUMNA VERTEBRAL',
    client: 'Columna Vertebral',
    category: 'SALUD Y BIENESTAR',
    url: 'https://columna-vertebral.com.ar/',
    preview: 'columna-vertebral',
    accent: '#84e1a6',
    description: 'Servicios de salud, atención y bienestar.',
  },
];

export const DiagonalBlockchainTowerSection: React.FC<DiagonalBlockchainTowerSectionProps> = ({
  onOpenInquiry,
  scrollProgressRef,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const shaderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const shaderPointerRef = useRef<{
    move: (x: number, y: number, accent: string) => void;
    leave: () => void;
  } | null>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = shaderCanvasRef.current;
    if (!section || !canvas || isLowEndDevice() || window.matchMedia('(pointer: coarse)').matches) return;

    let cancelled = false;
    let cleanupRenderer: (() => void) | null = null;

    const initializeRenderer = async () => {
      const [THREE, { EffectComposer }, { RenderPass }, { UnrealBloomPass }] = await Promise.all([
        import('three'),
        import('three/addons/postprocessing/EffectComposer.js'),
        import('three/addons/postprocessing/RenderPass.js'),
        import('three/addons/postprocessing/UnrealBloomPass.js'),
      ]);
      if (cancelled) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        });
      } catch {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const uniforms = {
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColor: { value: new THREE.Color('#35e6f2') },
        uTime: { value: 0 },
        uStrength: { value: 0 },
      };
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
      camera.position.z = 1;
      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform vec2 uPointer;
          uniform vec2 uResolution;
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uStrength;

          void main() {
            vec2 delta = vUv - uPointer;
            delta.x *= uResolution.x / uResolution.y;
            float distanceToPointer = length(delta);
            float angle = atan(delta.y, delta.x);
            float ripple = sin(angle * 5.0 + uTime * 0.65) * 0.008;
            float ring = 1.0 - smoothstep(0.003, 0.018, abs(distanceToPointer - 0.14 - ripple));
            float glow = exp(-distanceToPointer * 9.0) * 0.42;
            float filament = exp(-abs(sin(distanceToPointer * 68.0 - uTime * 1.4)) * 10.0) * exp(-distanceToPointer * 5.0) * 0.12;
            float energy = (glow + ring * 0.24 + filament) * uStrength;
            vec3 color = uColor * energy;
            color += vec3(0.16, 0.48, 0.72) * ring * uStrength * 0.12;
            gl_FragColor = vec4(color, energy * 0.72);
          }
        `,
      });
      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.65, 0.7, 0.18));

      const resize = () => {
        const bounds = section.getBoundingClientRect();
        composer.setSize(bounds.width, bounds.height);
        uniforms.uResolution.value.set(bounds.width, bounds.height);
      };
      resize();

      let frameId = 0;
      let targetStrength = 0;
      let previousTime = performance.now();
      const render = (now: number) => {
        const delta = Math.min((now - previousTime) / 1000, 0.05);
        previousTime = now;
        uniforms.uTime.value += delta;
        uniforms.uStrength.value += (targetStrength - uniforms.uStrength.value) * 0.35;
        composer.render();

        if (Math.abs(targetStrength - uniforms.uStrength.value) > 0.01) {
          frameId = requestAnimationFrame(render);
        } else {
          uniforms.uStrength.value = targetStrength;
          frameId = 0;
        }
      };
      const wakeRenderer = () => {
        if (!frameId) {
          previousTime = performance.now();
          frameId = requestAnimationFrame(render);
        }
      };

      shaderPointerRef.current = {
        move: (x, y, accent) => {
          uniforms.uPointer.value.set(x, 1 - y);
          uniforms.uColor.value.set(accent);
          targetStrength = 1;
          wakeRenderer();
        },
        leave: () => {
          targetStrength = 0;
          wakeRenderer();
        },
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(section);
      cleanupRenderer = () => {
        shaderPointerRef.current = null;
        resizeObserver.disconnect();
        if (frameId) cancelAnimationFrame(frameId);
        geometry.dispose();
        material.dispose();
        composer.dispose();
        renderer.dispose();
      };
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void initializeRenderer();
    }, { rootMargin: '200px 0px' });
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanupRenderer?.();
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLElement => card !== null);
    if (!section || cards.length !== PROJECTS.length) return;

    const reduceEffects = isLowEndDevice() || window.matchMedia('(pointer: coarse)').matches;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(3600, window.innerHeight * PROJECTS.length * 1.05)}`,
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }

            scrollProgressRef.current = self.progress;
          },
        },
      });

      cards.forEach((card, index) => {
        const startAt = index * 0.78;

        timeline.fromTo(
          card,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => index === 0
              ? (window.innerWidth < 640 ? 0 : window.innerWidth * 0.13)
              : window.innerWidth * 0.42,
            y: () => index === 0 ? window.innerHeight * 0.1 : window.innerHeight * 0.56,
            scale: index === 0 ? 0.94 : 0.68,
            rotateY: index === 0 ? -12 : -28,
            rotateZ: index === 0 ? 2 : 8,
            opacity: index === 0 ? 0.92 : 0,
            filter: reduceEffects || index === 0 ? 'blur(0px)' : 'blur(8px)',
            zIndex: PROJECTS.length - index,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotateY: -8,
            rotateZ: -2,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            force3D: true,
          },
          startAt,
        );

        timeline.to(
          card,
          {
            x: () => -window.innerWidth * 0.38,
            y: () => -window.innerHeight * 0.58,
            scale: 0.72,
            rotateY: 18,
            rotateZ: -7,
            opacity: 0,
            filter: reduceEffects ? 'blur(0px)' : 'blur(6px)',
            duration: 1.45,
            ease: 'power1.in',
            force3D: true,
          },
          startAt + 0.95,
        );
      });
    }, section);

    return () => context.revert();
  }, [scrollProgressRef]);

  return (
    <section
      id="horizontal-stream-section"
      ref={sectionRef}
      className="relative isolate h-[100svh] min-h-[100svh] w-full overflow-hidden border-y border-cyan-300/10 bg-transparent text-white"
      aria-label="Portfolio de proyectos"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_54%,rgba(3,12,27,0.02)_10%,rgba(2,5,12,0.28)_72%,rgba(2,4,9,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#02050b]/25 via-transparent to-[#02050b]/40" />
      <canvas
        ref={shaderCanvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full mix-blend-screen"
      />

      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-6 sm:px-10 sm:pt-9 lg:px-16">
        <div>
          <p className="mb-2 font-mono text-[9px] tracking-[0.32em] text-cyan-200/60 sm:text-[10px]">
            METAMUNDO / PROYECTOS
          </p>
          <h2 className="font-syne text-xl font-semibold tracking-wide text-white sm:text-3xl">
            Sitios en producción
          </h2>
        </div>
        <button
          type="button"
          onClick={onOpenInquiry}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-[#07101c]/55 px-3 py-2 text-[10px] text-cyan-50/80 backdrop-blur-md transition-colors hover:border-cyan-200/50 hover:text-white sm:px-4 sm:text-xs"
        >
          Hablemos <ArrowUpRight size={14} />
        </button>
      </header>

      <div className="pointer-events-none absolute inset-0 z-[3] [perspective:1400px]">
        {PROJECTS.map((project, index) => {
          const isPreviewActive = activePreview === project.url;

          return (
            <article
              key={project.url}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="group pointer-events-auto absolute left-1/2 top-1/2 w-[min(88vw,520px)] overflow-hidden rounded-[22px] border border-white/15 bg-[#06101d]/85 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:rounded-[26px] sm:p-5"
              onPointerMove={(event) => {
                if (event.pointerType === 'touch') return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width;
                const y = (event.clientY - bounds.top) / bounds.height;
                const normalizedX = (x - 0.5) * 2;
                const normalizedY = (y - 0.5) * 2;
                event.currentTarget.style.setProperty('--card-tilt-x', `${normalizedX * 3.5}deg`);
                event.currentTarget.style.setProperty('--card-tilt-y', `${normalizedY * -3.5}deg`);

                const sectionBounds = sectionRef.current?.getBoundingClientRect();
                if (sectionBounds) {
                  shaderPointerRef.current?.move(
                    (event.clientX - sectionBounds.left) / sectionBounds.width,
                    (event.clientY - sectionBounds.top) / sectionBounds.height,
                    project.accent,
                  );
                }
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty('--card-tilt-x', '0deg');
                event.currentTarget.style.setProperty('--card-tilt-y', '0deg');
                shaderPointerRef.current?.leave();
              }}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: `0 28px 100px rgba(0,0,0,0.56), 0 0 48px ${project.accent}20, inset 0 1px 0 rgba(255,255,255,0.12)`,
              }}
            >
              <div className="project-card-shell">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded border border-white/10 bg-black/25 px-2 py-1 font-mono text-[8px] tracking-[0.2em] text-white/70">
                    PISO #{project.id}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.16em]" style={{ color: project.accent }}>
                    {project.category}
                  </span>
                </div>
                <span className="size-1.5 rounded-full" style={{ backgroundColor: project.accent, boxShadow: `0 0 10px ${project.accent}` }} />
              </div>

              <div className="relative mb-4 h-[clamp(170px,26svh,230px)] overflow-hidden rounded-xl border border-white/12 bg-[#020811] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] sm:rounded-2xl">
                {isPreviewActive ? (
                  <>
                    <div className="absolute inset-x-0 top-0 z-20 flex h-6 items-center gap-1 border-b border-white/10 bg-[#09121e]/95 px-2">
                      <span className="size-1.5 rounded-full bg-white/30" />
                      <span className="size-1.5 rounded-full bg-white/30" />
                      <span className="size-1.5 rounded-full bg-white/30" />
                      <span className="ml-1 min-w-0 flex-1 truncate font-mono text-[8px] text-white/50">
                        {new URL(project.url).hostname}
                      </span>
                    </div>
                    <video
                      key={project.preview}
                      aria-label={`Recorrido de ${project.client}`}
                      src={`/previews/${project.preview}.webm`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="none"
                      className="absolute inset-0 top-6 h-[calc(100%-1.5rem)] w-full bg-white object-cover"
                    />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-1.5 right-1.5 z-30 rounded border border-white/20 bg-black/80 px-2 py-1 font-mono text-[8px] text-white/80"
                    >
                      Abrir sitio <ExternalLink className="ml-1 inline" size={9} />
                    </a>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActivePreview(project.url)}
                    aria-label={`Reproducir vista previa de ${project.client}`}
                    className="absolute inset-0 flex w-full items-center justify-between overflow-hidden px-5 text-left sm:px-7"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-80"
                      style={{
                        background: `radial-gradient(ellipse at 78% 45%, ${project.accent}26, transparent 44%), linear-gradient(120deg, transparent 45%, ${project.accent}18 46%, transparent 47%)`,
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020811]/70 via-transparent to-transparent" />
                    <div className="relative">
                      <span className="mb-2 block font-mono text-[9px] tracking-[0.24em] text-white/45">RECORRIDO DEL SITIO</span>
                      <span className="block max-w-[260px] font-syne text-xl font-semibold leading-tight tracking-wide text-white sm:text-2xl">Una mirada en movimiento.</span>
                      <span className="mt-3 block font-mono text-[8px] tracking-[0.18em] text-white/45">PRESIONÁ PARA REPRODUCIR</span>
                    </div>
                    <span
                      className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white/90 shadow-[0_0_36px_rgba(255,255,255,0.12)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
                      style={{ boxShadow: `0 0 24px ${project.accent}22` }}
                    >
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </span>
                  </button>
                )}
              </div>

              <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                <div className="min-w-0">
                  <h3 className="truncate font-syne text-base font-extrabold leading-tight tracking-wide text-white sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 truncate text-[11px] leading-4 text-slate-300/65 sm:text-xs">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1.5 font-mono text-[8px] text-white/75 transition-colors hover:border-cyan-200/40 hover:text-white"
                >
                  VER SITIO <ExternalLink className="ml-1 inline" size={9} />
                </a>
              </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-5 sm:px-10 sm:pb-8 lg:px-16">
        <div className="mb-2 flex items-center justify-between font-mono text-[8px] tracking-[0.24em] text-cyan-100/45">
          <span>SCROLL / EXPLORAR NODOS</span>
          <span>01 — 06</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
          />
        </div>
      </div>
    </section>
  );
};
