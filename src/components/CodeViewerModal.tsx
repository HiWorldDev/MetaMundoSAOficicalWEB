import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Sparkles, Layers, Terminal } from 'lucide-react';
import { CODE_TABS } from '../data/standaloneCode';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTabId, setActiveTabId] = useState<string>('full-html');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentTab = CODE_TABS.find((t) => t.id === activeTabId) || CODE_TABS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentTab.code], {
      type: currentTab.language === 'html' ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentTab.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#0d0e15] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-white text-base">
                Exportar Código & Arquitectura
              </h3>
              <p className="text-xs text-zinc-400">
                Código modular optimizado para 60 FPS con GSAP 3 y ScrollTrigger
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-code-modal-btn"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Código'}</span>
            </button>

            <button
              id="download-code-modal-btn"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Descargar .{currentTab.filename.split('.').pop()}</span>
            </button>

            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-white/5 bg-zinc-950/30 overflow-x-auto">
          {CODE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTabId === tab.id
                  ? 'bg-zinc-800 text-white border border-white/10 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <span className="font-mono text-zinc-500">[{tab.filename}]</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Description Banner */}
        <div className="px-6 py-2.5 bg-indigo-950/20 border-b border-indigo-500/10 flex items-center gap-2 text-xs text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
          <span>{currentTab.description}</span>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-auto p-6 bg-[#08090d] font-mono text-xs text-zinc-300 leading-relaxed">
          <pre className="overflow-x-auto selection:bg-indigo-500 selection:text-white">
            <code>{currentTab.code}</code>
          </pre>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>Formato: {currentTab.language.toUpperCase()} • CDN: GSAP 3.12.5 • ScrollTrigger • Lenis</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Listo para producción
          </span>
        </div>

      </div>
    </div>
  );
};
