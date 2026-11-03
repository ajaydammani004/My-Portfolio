import React, { useState } from 'react';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { HUDOverlay } from '../3d/HUDOverlay';
import { personalData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audioSynth';
import { 
  ArrowRight, 
  Github, 
  Mail, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  Download,
  Copy,
  CheckCircle2
} from 'lucide-react';

export function HeroSection({ onShowToast }) {
  const [deconstruct, setDeconstruct] = useState(0.2);
  const [mode, setMode] = useState('hybrid');
  const [fps, setFps] = useState(60);

  const copyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(personalData.email);
    if (onShowToast) {
      onShowToast(`Copied ${personalData.email} to clipboard!`, 'copy');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden cyber-grid-bg">
      
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-140px)]">
          
          {/* =================================================== */}
          {/* LEFT COLUMN: HEADLINE, TAGLINE & INTERACTIVE CTAS   */}
          {/* =================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-4 lg:pt-0">
            
            {/* Mission Statement Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full cyber-glass border border-cyan-500/30 text-xs font-mono text-cyan-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CROSS-DISCIPLINARY ARCHITECT // 2026</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                <span className="block text-slate-200">Dammani Ajay</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 font-mono text-2xl sm:text-3xl md:text-4xl mt-2">
                  Full-Stack Python Developer
                </span>
                <span className="flex items-center flex-wrap gap-2 text-xl sm:text-2xl font-mono text-slate-300 font-normal mt-1">
                  <span className="text-purple-400">| Prompt Engineer</span>
                  <span className="text-amber-400">| Mechanical Engineer</span>
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                {personalData.tagline}
              </p>
            </div>

            {/* Tech Badges / Tri-Pillar Matrix */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-lg">
              
              <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-semibold mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Python Stack</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  FastAPI • Django • Redis • PostgreSQL
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-semibold mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>GenAI & RAG</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  LLM Agents • LangChain • Vector DBs
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mechanical</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  SolidWorks • FEA • IoT Digital Twins
                </div>
              </div>

            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              
              {/* Explore Projects */}
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 hover:shadow-neon-cyan transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* View GitHub */}
              <a
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-5 py-3 rounded-xl cyber-glass border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-xs sm:text-sm transition-all flex items-center gap-2 group"
              >
                <Github className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>VIEW GITHUB</span>
              </a>

              {/* Get in Touch */}
              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 hover:border-purple-400 text-purple-300 font-mono text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>GET IN TOUCH</span>
              </a>

            </div>

            {/* Telemetry Quick Status Strip */}
            <div className="pt-2 flex items-center flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <button 
                onClick={copyEmail}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalData.email}</span>
                <Copy className="w-3 h-3 text-slate-500" />
              </button>

              <span className="text-slate-700">•</span>

              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>{personalData.phone}</span>
              </span>
            </div>

          </div>

          {/* =================================================== */}
          {/* RIGHT COLUMN: 3D CYBER-PHYSICAL INTERACTIVE CORE    */}
          {/* =================================================== */}
          <div className="lg:col-span-6 h-[480px] sm:h-[540px] lg:h-[600px] relative rounded-2xl cyber-glass border border-cyan-500/20 overflow-hidden shadow-2xl scanline-overlay">
            
            {/* 3D WebGL Canvas */}
            <Hero3DCanvas 
              deconstruct={deconstruct} 
              mode={mode}
              onFpsChange={setFps}
            />

            {/* Futuristic HUD Control Layer */}
            <HUDOverlay
              deconstruct={deconstruct}
              setDeconstruct={setDeconstruct}
              mode={mode}
              setMode={setMode}
              fps={fps}
            />

            {/* Bottom Corner CAD Blueprint Crosshairs */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-500/40 select-none pointer-events-none">
              + [X: 142.8 | Y: 98.4 | Z: 0.0]
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-purple-500/40 select-none pointer-events-none">
              + [SYS_ID: AJAY_TWIN_01]
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
