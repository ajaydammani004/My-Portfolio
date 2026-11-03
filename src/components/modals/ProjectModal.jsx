import React from 'react';
import { soundFx } from '../../utils/audioSynth';
import { X, ExternalLink, Github, Terminal, Cpu, ArrowRight, CheckCircle } from 'lucide-react';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl rounded-2xl cyber-glass border border-cyan-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              REPO: {project.repoName}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h3>
          <p className="text-sm text-slate-300">
            {project.description}
          </p>
        </div>

        {/* System Architecture Flow Diagram */}
        <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>DATAFLOW & SYSTEM ARCHITECTURE DIAGRAM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            
            {/* Input Node */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-cyan-500/20 text-xs">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                [01. INGESTION]
              </span>
              <p className="text-slate-300">
                {project.architecture?.input || "User query & sensory inputs"}
              </p>
            </div>

            {/* Pipeline Process */}
            <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-xs">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block mb-1">
                [02. PROCESSING CORE]
              </span>
              <p className="text-slate-300">
                {project.architecture?.process || "Deterministic async pipeline"}
              </p>
            </div>

            {/* Structured Output */}
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                [03. DELIVERABLE]
              </span>
              <p className="text-slate-300">
                {project.architecture?.output || "Verified system execution"}
              </p>
            </div>

          </div>
        </div>

        {/* Technology Stack Pills */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-mono text-slate-400 block uppercase">
            Technology Stack & Tools:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((t, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Impact & Performance Metrics */}
        {project.metrics && (
          <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300 mb-6 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>{project.metrics}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GITHUB REPOSITORY</span>
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 hover:shadow-neon-cyan transition-all"
            >
              <span>RUN LIVE DEMO</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>

    </div>
  );
}

