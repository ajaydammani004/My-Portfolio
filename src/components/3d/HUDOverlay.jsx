import React from 'react';
import { soundFx } from '../../utils/audioSynth';
import { Cpu, RotateCcw, Activity, Eye, Zap, Layers } from 'lucide-react';

export function HUDOverlay({
  deconstruct,
  setDeconstruct,
  mode,
  setMode,
  fps = 60
}) {
  const handleModeChange = (newMode) => {
    soundFx.playModeSwitch();
    setMode(newMode);
  };

  const handleDeconstructChange = (val) => {
    soundFx.playHover();
    setDeconstruct(val);
  };

  const handlePulse = () => {
    soundFx.playClick();
    const target = deconstruct > 0.5 ? 0.0 : 1.0;
    
    // Smooth stepped animation
    let current = deconstruct;
    const step = (target - current) / 20;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      current += step;
      setDeconstruct(parseFloat(current.toFixed(2)));
      if (count >= 20) {
        clearInterval(interval);
        setDeconstruct(target);
      }
    }, 16);
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10">
      
      {/* Top HUD Bar: Live Telemetry */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Status Badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full cyber-glass text-xs font-mono text-cyan-400 border border-cyan-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-wider uppercase font-semibold">DIGITAL TWIN // ONLINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">HERO 3D MESH</span>
        </div>

        {/* Right Performance Diagnostics */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-black/60 backdrop-blur border border-slate-800 text-[11px] font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>NODES: <strong className="text-purple-300">38</strong></span>
            <span className="text-slate-600">•</span>
            <span>AXONS: <strong className="text-cyan-300">64</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-black/60 backdrop-blur border border-slate-800 text-[11px] font-mono">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">RENDER:</span>
            <span className={fps >= 50 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
              {fps || 60} FPS
            </span>
          </div>
        </div>
      </div>

      {/* Bottom HUD Controls: Deconstruction Slider & Modes */}
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 mt-auto">
        
        {/* Left Instruction Hint */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-black/40 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800">
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Left Click + Drag to Rotate • Scroll to Zoom</span>
        </div>

        {/* Center/Right Control Cockpit */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-xl cyber-glass border border-cyan-500/20 max-w-full">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleModeChange('cad')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all flex items-center gap-1.5 ${
                mode === 'cad'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="CAD Blueprint Mode"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CAD</span>
            </button>

            <button
              onClick={() => handleModeChange('hybrid')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all flex items-center gap-1.5 ${
                mode === 'hybrid'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Digital Twin Hybrid Mode"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>HYBRID</span>
            </button>

            <button
              onClick={() => handleModeChange('neural')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-all flex items-center gap-1.5 ${
                mode === 'neural'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Neural Network Cloud Mode"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>NEURAL</span>
            </button>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-800" />

          {/* Interactive Decomposition Slider */}
          <div className="flex items-center gap-2 min-w-[210px]">
            <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
              DECONSTRUCT:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={deconstruct}
              onChange={(e) => handleDeconstructChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              title="Drag to dynamically explode CAD assembly into neural nodes"
            />
            <span className="text-[11px] font-mono text-cyan-400 w-8 text-right font-bold">
              {Math.round(deconstruct * 100)}%
            </span>
          </div>

          {/* Instant Pulse Action Button */}
          <button
            onClick={handlePulse}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all flex items-center justify-center gap-1.5"
            title="Trigger automated decomposition cycle"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PULSE</span>
          </button>

        </div>

      </div>

    </div>
  );
}
