import React from 'react';
import { CheckCircle2, Copy, AlertCircle, X } from 'lucide-react';

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-cyan-400" />,
    copy: <Copy className="w-4 h-4 text-purple-400" />,
    info: <AlertCircle className="w-4 h-4 text-amber-400" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl cyber-glass border border-cyan-500/40 shadow-neon-cyan animate-bounce-short backdrop-blur-xl">
      <div className="p-1 rounded bg-black/40">
        {icons[type] || icons.success}
      </div>
      <div className="text-sm font-mono text-slate-100">
        {message}
      </div>
      <button 
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
