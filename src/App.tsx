/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { HeroSection } from './components/HeroSection';
import { DiagonalBlockchainTowerSection } from './components/DiagonalBlockchainTowerSection';
import { UnifiedQuantumBlockchainCanvas } from './components/UnifiedQuantumBlockchainCanvas';
import { FooterSection } from './components/FooterSection';
import { CustomCursor } from './components/CustomCursor';
import { ShowreelModal } from './components/ShowreelModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initLowEndFallback, initDynamicGlassBlur } from './utils/cardClipPathAnimation';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isShowreelOpen, setIsShowreelOpen] = useState<boolean>(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgressRef = useRef(0);

  // Initialize performance fallbacks, dynamic glassmorphism blur and smooth scrolling
  useEffect(() => {
    initLowEndFallback();
    const cleanupBlur = initDynamicGlassBlur();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', (e: { progress: number }) => {
      scrollProgressRef.current = e.progress;
      ScrollTrigger.update();
    });

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      cleanupBlur();
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleScrollToTower = () => {
    const streamEl = document.getElementById('horizontal-stream-section');
    if (streamEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(streamEl, { offset: 0, duration: 1.5 });
      } else {
        streamEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative isolate min-h-screen bg-[#040507] text-white selection:bg-indigo-600 selection:text-white">
        <UnifiedQuantumBlockchainCanvas scrollProgressRef={scrollProgressRef} autoRotate={false} />

        {/* Magnetic Custom Studio Cursor */}
        <CustomCursor />

        {/* Main Agency Experience Flow */}
        <main className="relative z-10 w-full">
          
          {/* 1. Kinetic Hero Section */}
          <ErrorBoundary>
            <HeroSection
              isLoaded={true}
              onScrollToPinned={handleScrollToTower}
              onOpenShowreel={() => setIsShowreelOpen(true)}
              onOpenInquiry={() => setIsInquiryOpen(true)}
            />
          </ErrorBoundary>

          {/* Selected projects */}
          <ErrorBoundary>
            <DiagonalBlockchainTowerSection
              onOpenInquiry={() => setIsInquiryOpen(true)}
              scrollProgressRef={scrollProgressRef}
            />
          </ErrorBoundary>

        </main>

        {/* High-End Agency Footer with Direct Conversion Call */}
        <ErrorBoundary>
          <FooterSection
            onOpenInquiry={() => setIsInquiryOpen(true)}
            onOpenShowreel={() => setIsShowreelOpen(true)}
          />
        </ErrorBoundary>

        {/* Interactive Showreel 2026 Cinematic Modal */}
        <ShowreelModal
          isOpen={isShowreelOpen}
          onClose={() => setIsShowreelOpen(false)}
          onOpenInquiry={() => {
            setIsShowreelOpen(false);
            setIsInquiryOpen(true);
          }}
        />

        {/* Interactive Client Project Inquiry Planner */}
        <ProjectInquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
        />

      </div>
    </ErrorBoundary>
  );
}
