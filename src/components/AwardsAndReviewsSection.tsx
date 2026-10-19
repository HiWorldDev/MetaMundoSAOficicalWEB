import React, { useState } from 'react';
import { AWARDS_LIST, CLIENT_REVIEWS, AGENCY_STATS } from '../data/agencyData';
import { Award, Star, Quote, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface AwardsAndReviewsSectionProps {
  onOpenInquiry: () => void;
}

export const AwardsAndReviewsSection: React.FC<AwardsAndReviewsSectionProps> = ({
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'awards' | 'reviews'>('awards');

  return (
    <section id="awards-section" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/10 relative">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Reputación & Impacto Comprobado
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Awwwards • FWA • Red Dot
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            La Excelencia No Es Casualidad
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Cada proyecto que entregamos está concebido para ganar premios internacionales y multiplicar de manera tangible la facturación de nuestros clientes.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
          <button
            onClick={() => setActiveTab('awards')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'awards'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Premios ({AWARDS_LIST.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Testimonios de Clientes</span>
          </button>
        </div>
      </div>

      {/* High-Impact Stat Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {AGENCY_STATS.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 relative overflow-hidden group hover:border-indigo-500/30 transition-all"
          >
            <div className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-indigo-300 mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
              {stat.label}
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* TAB CONTENT: AWARDS TABLE */}
      {activeTab === 'awards' && (
        <div className="space-y-3">
          {AWARDS_LIST.map((aw, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-zinc-500 font-bold">
                  {aw.year}
                </span>
                <div>
                  <h4 className="font-syne font-extrabold text-white text-base sm:text-lg group-hover:text-cyan-300 transition-colors">
                    {aw.title} — {aw.project}
                  </h4>
                  <span className="text-xs text-zinc-400 font-mono">
                    {aw.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-zinc-900 text-indigo-300 border border-white/10">
                  {aw.institution}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-gradient-to-br from-[#121422] to-[#090a10] border border-indigo-500/20 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-syne text-sm sm:text-base text-zinc-200 font-medium italic leading-relaxed mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="font-syne font-bold text-white text-sm">
                  {rev.author}
                </div>
                <div className="text-xs font-mono text-indigo-400">
                  {rev.role}, {rev.company}
                </div>
                <div className="mt-3 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 inline-block">
                  Impacto: {rev.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
