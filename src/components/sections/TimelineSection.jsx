import React, { useState } from 'react';
import { experienceTimeline } from '../../data/portfolioData';
import { soundFx } from '../../utils/audioSynth';
import { 
  Milestone, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Layers, 
  Cpu 
} from 'lucide-react';

export function TimelineSection() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (idx) => {
    soundFx.playHover();
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  const getBadgeColor = (badge) => {
    if (badge.includes('AI')) return 'bg-purple-950/60 border-purple-500/40 text-purple-400';
    if (badge.includes('Backend')) return 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400';
    return 'bg-amber-950/60 border-amber-500/40 text-amber-400';
  };

  return (
    <section id="timeline" className="relative py-24 cyber-grid-bg border-t border-cyan-500/10">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Milestone className="w-3.5 h-3.5" />
            <span>CROSS-DISCIPLINARY EVOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Experience & Engineering Journey
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            From mechanical physics and CAD geometry to distributed cloud backends and autonomous generative AI orchestration.
          </p>
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="relative pl-6 md:pl-10 border-l-2 border-cyan-500/30 space-y-12">
          
          {experienceTimeline.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div key={idx} className="relative group">
                
                {/* Timeline Node Pip */}
                <div 
                  className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-7 h-7 rounded-full cyber-glass border flex items-center justify-center transition-all duration-300 ${
                    isExpanded 
                      ? 'border-cyan-400 shadow-neon-cyan scale-110 bg-slate-900' 
                      : 'border-slate-700 bg-slate-950 text-slate-500 group-hover:border-cyan-500/50'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${isExpanded ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                </div>

                {/* Timeline Card */}
                <div 
                  className={`rounded-2xl cyber-glass p-6 md:p-8 transition-all duration-300 ${
                    isExpanded 
                      ? 'border-cyan-500/40 bg-slate-900/80 shadow-2xl' 
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                  }`}
                >
                  {/* Card Header */}
                  <div 
                    onClick={() => toggleExpand(idx)}
                    className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-xs text-cyan-400 font-semibold">
                          {item.period}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getBadgeColor(item.badge)}`}>
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.role}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                        {item.company} | {item.location}
                      </p>
                    </div>

                    <button 
                      className="self-end sm:self-center p-2 rounded-lg bg-black/40 border border-slate-800 text-slate-400 hover:text-white"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Summary Text */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Expandable Bullet Points & Skills */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-6 animate-in fade-in duration-200">
                      
                      {/* Key Achievements */}
                      <div className="space-y-3">
                        <span className="text-xs font-mono uppercase text-cyan-400 block tracking-wider">
                          Key Deliverables & Architectural Focus:
                        </span>
                        <ul className="space-y-2.5">
                          {item.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Associated Skills */}
                      <div className="pt-2">
                        <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2">
                          Domain Technologies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

