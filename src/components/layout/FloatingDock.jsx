import React from 'react';
import { personalData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audioSynth';
import { Mail, Phone, Github, Linkedin, Copy, ArrowUp } from 'lucide-react';

export function FloatingDock({ onShowToast }) {
  const copyEmail = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(personalData.email);
    if (onShowToast) onShowToast(`Copied ${personalData.email} to clipboard!`, 'copy');
  };

  const copyPhone = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(personalData.phone);
    if (onShowToast) onShowToast(`Copied ${personalData.phone} to clipboard!`, 'copy');
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl cyber-glass border border-cyan-500/25 shadow-2xl backdrop-blur-xl">
      
      {/* Email Quick Copy */}
      <button
        onClick={copyEmail}
        className="p-2 rounded-xl hover:bg-cyan-500/15 text-slate-400 hover:text-cyan-400 transition-all flex items-center gap-1.5 text-xs font-mono group"
        title="Copy Email Address"
      >
        <Mail className="w-4 h-4 text-cyan-400" />
        <span className="hidden md:inline text-[11px] text-slate-300">dammaniajay17@gmail.com</span>
      </button>

      <div className="h-4 w-px bg-slate-800" />

      {/* Phone Quick Copy */}
      <button
        onClick={copyPhone}
        className="p-2 rounded-xl hover:bg-purple-500/15 text-slate-400 hover:text-purple-400 transition-all flex items-center gap-1.5 text-xs font-mono group"
        title="Copy Phone Number"
      >
        <Phone className="w-4 h-4 text-purple-400" />
        <span className="hidden md:inline text-[11px] text-slate-300">+91 6304701293</span>
      </button>

      <div className="h-4 w-px bg-slate-800" />

      {/* GitHub Direct Link */}
      <a
        href={personalData.github}
        target="_blank"
        rel="noreferrer"
        onClick={() => soundFx.playClick()}
        className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
        title="GitHub Profile"
      >
        <Github className="w-4 h-4" />
      </a>

      {/* LinkedIn Direct Link */}
      <a
        href={personalData.linkedin}
        target="_blank"
        rel="noreferrer"
        onClick={() => soundFx.playClick()}
        className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-all"
        title="LinkedIn Profile"
      >
        <Linkedin className="w-4 h-4" />
      </a>

    </div>
  );
}

