import React, { useState } from 'react';
import { coreCompetencies } from '../../data/portfolioData';
import { soundFx } from '../../utils/audioSynth';
import { 
  BrainCircuit, 
  Layers, 
  Cog, 
  ChevronRight, 
  CheckCircle2, 
  Cpu, 
  Activity, 
  Terminal, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export function CompetenciesSection({ onSelectCompetency }) {
  const [activeTab, setActiveTab] = useState('gen-ai');

  const iconMap = {
    BrainCircuit: <BrainCircuit className="w-6 h-6 text-purple-400" />,
    Layers: <Layers className="w-6 h-6 text-cyan-400" />,
    Cog: <Cog className="w-6 h-6 text-amber-400" />
  };

  const currentCompetency = coreCompetencies.find(c => c.id === activeTab) || coreCompetencies[0];

  return (
    <section id="competencies" className="relative py-24 cyber-grid-bg border-t border-cyan-500/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURAL PILLARS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Engineering & Intelligence Systems
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            A tripartite fusion of rigorous mechanical principles, scalable distributed Python backends, and prompt-engineered generative AI systems.
          </p>
        </div>

        {/* 3 Interactive Cards / Node Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {coreCompetencies.map((comp) => {
            const isSelected = activeTab === comp.id;

            return (
              <div
                key={comp.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(comp.id);
                }}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative cyber-glass ${
                  isSelected 
                    ? `border-2 ${comp.borderColor} shadow-2xl scale-[1.02] bg-slate-900/90` 
                    : 'border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-900/60'
                }`}
              >
                {/* Glowing Active Pip */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>ACTIVE NODE</span>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    {iconMap[comp.icon]}
                  </div>
                  <div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${comp.badgeColor}`}>
                      {comp.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {comp.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {comp.description}
                </p>

                {/* Micro Telemetry Bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>TELEMETRY METRICS</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1">
                    <span>EXPLORE SPECS</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Expanded Deep-Dive Node Inspection Deck */}
        <div className="rounded-2xl cyber-glass border border-cyan-500/30 p-6 sm:p-8 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>INSPECTING SUBSYSTEM // {currentCompetency.id.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {currentCompetency.title}
              </h3>
            </div>

            {/* Live Metrics Cockpit */}
            <div className="flex flex-wrap items-center gap-4">
              {Object.entries(currentCompetency.telemetry).map(([key, val]) => (
                <div key={key} className="px-3 py-1.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-cyan-300 font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {currentCompetency.highlights.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-colors"
              >
                <div className="p-1 rounded bg-cyan-950/60 text-cyan-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-normal">
                  {item}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Architecture Note */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Engineered for zero-downtime, validated schemas & physical integrity</span>
            </div>
            <a 
              href="#projects" 
              onClick={() => soundFx.playClick()}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <span>See applied implementations below</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
