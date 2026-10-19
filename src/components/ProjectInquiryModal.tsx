import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, ArrowRight, DollarSign, Calendar, MessageSquare, Briefcase } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  'Sitio Web Inmersivo (Awwwards Grade)',
  'E-Commerce de Lujo & 3D',
  'Identidad de Marca Dinámica',
  'Dirección Creativa & Keynote 3D',
  'Transformación Digital Completa'
];

const BUDGET_RANGES = [
  '$15,000 – $25,000 USD',
  '$25,000 – $50,000 USD',
  '$50,000 – $100,000+ USD',
  'Exploratorio / A convenir'
];

const TIMELINES = [
  'Inmediato (Próximas 2-4 semanas)',
  'Q3 2026',
  'Q4 2026 / 2027',
  'Flexible'
];

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Sitio Web Inmersivo (Awwwards Grade)'
  ]);
  const [selectedBudget, setSelectedBudget] = useState<string>('$25,000 – $50,000 USD');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Inmediato (Próximas 2-4 semanas)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0c0d16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 text-white">
        
        {/* Header */}
        <div className="p-6 sm:px-8 border-b border-white/10 flex items-center justify-between bg-zinc-950/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-syne font-extrabold text-sm sm:text-base text-white tracking-wide">
              INICIAR PROYECTO CON METAMUNDO MOTION
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-syne text-3xl font-extrabold text-white">
                  ¡Propuesta Recibida con Éxito!
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto mt-2 leading-relaxed">
                  Gracias por contactar a Metamundo Motion. Nuestro director creativo revisará tu proyecto y coordinaremos una llamada privada en menos de 24 horas.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-syne font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Volver al Sitio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Intro Copy */}
              <div>
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Cuéntanos sobre tu visión
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Selecciona el alcance, tu rango de inversión y te presentaremos una propuesta de dirección de arte personalizada.
                </p>
              </div>

              {/* 1. Services Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>1. ¿Qué servicios necesitas?</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        {isSelected && <span className="mr-1.5 text-indigo-400">✓</span>}
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Budget Range */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>2. Rango de Inversión Estimado</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BUDGET_RANGES.map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-500 text-white'
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Timeline */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>3. Fecha Deseada de Lanzamiento</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINES.map((t) => {
                    const isSelected = selectedTimeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeline(t)}
                        className={`p-2.5 rounded-xl text-center text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 text-white'
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Client Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Tu Nombre / Contacto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Julian Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Email Corporativo *</label>
                  <input
                    type="email"
                    required
                    placeholder="julian@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Compañía / Sitio Web Actual</label>
                  <input
                    type="text"
                    placeholder="Ej. Aura Spatial Systems (www.auraspatial.com)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Detalles del Proyecto & Objetivos</label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos brevemente tus metas de negocio, audiencia y qué buscas transmitir..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Procesando Propuesta...</span>
                ) : (
                  <>
                    <span>Enviar Solicitud de Proyecto</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
