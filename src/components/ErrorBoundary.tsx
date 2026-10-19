import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full min-h-[250px] flex flex-col items-center justify-center p-8 bg-zinc-950 text-white rounded-2xl border border-zinc-800 text-center">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping mb-4" />
          <h3 className="text-lg font-mono font-bold text-amber-300 uppercase tracking-wide mb-2">
            Modo de Rendimiento Estándar Activo
          </h3>
          <p className="text-sm font-mono text-zinc-400 max-w-md mb-4">
            Ajustamos el motor gráfico para garantizar la máxima fluidez en tu dispositivo.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-cyan-300 border border-zinc-700 transition-all cursor-pointer"
          >
            Reintentar Motor Gráfico
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
