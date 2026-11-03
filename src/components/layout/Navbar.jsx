import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/audioSynth';
import { personalData } from '../../data/portfolioData';
import { Volume2, VolumeX, Menu, X, Terminal, Github, ExternalLink, Code2 } from 'lucide-react';

export function Navbar({ onContactClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { label: "// 01. Competencies", href: "#competencies" },
    { label: "// 02. Projects", href: "#projects" },
    { label: "// 03. Experience", href: "#timeline" },
    { label: "// 04. Contact", href: "#contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#06090e]/85 backdrop-blur-md border-b border-cyan-500/15 shadow-lg shadow-black/40' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Terminal Tag */}
          <a 
            href="#" 
            onClick={() => soundFx.playHover()}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg cyber-glass border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-neon-cyan transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold tracking-wider text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                AJAY.DAMMANI
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                MECH • FULL-STACK • GEN-AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundFx.playHover()}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors relative py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Tools: Sound Toggle + GitHub + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                soundEnabled 
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-neon-cyan' 
                  : 'bg-black/40 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={soundEnabled ? "Mute Cybernetic Audio" : "Enable Cybernetic Audio FX"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[10px] uppercase">{soundEnabled ? 'FX ON' : 'FX OFF'}</span>
            </button>

            {/* GitHub Profile Direct */}
            <a
              href={personalData.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2 rounded-lg bg-black/40 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Connect CTA */}
            <a
              href="#contact"
              onClick={() => {
                soundFx.playClick();
                if (onContactClick) onContactClick();
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-semibold hover:shadow-neon-cyan transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              CONNECT // OPS
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-black/40 border border-slate-800 text-slate-300"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-lg bg-black/40 border border-cyan-500/30 text-cyan-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17]/95 border-b border-cyan-500/20 px-4 py-6 mt-3 backdrop-blur-xl animate-in slide-in-from-top">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-mono text-slate-300 hover:text-cyan-400 py-1 border-b border-slate-800"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 text-center rounded-lg cyber-glass border border-cyan-500/30 text-xs font-mono text-cyan-400"
              >
                GitHub Profile
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-lg bg-cyan-400 text-slate-950 text-xs font-mono font-bold"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

