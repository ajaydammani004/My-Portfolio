import React, { useState } from 'react';
import { personalData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Copy, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUp, 
  Terminal, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

export function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // One-click copy handlers
  const handleCopy = (text, label) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(text);
    if (onShowToast) {
      onShowToast(`Copied ${label} to clipboard!`, 'copy');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    soundFx.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playSuccess();

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Confetti optional
      }

      if (onShowToast) {
        onShowToast('Transmission sent! Dammani Ajay will respond promptly.', 'success');
      }

      // Generate mailto trigger
      const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nSender: ' + formData.name + ' (' + formData.email + ')')}`;
      window.open(mailtoLink, '_blank');

      // Reset after brief delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 800);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative py-24 cyber-grid-bg border-t border-cyan-500/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Mail className="w-3.5 h-3.5" />
            <span>OPERATIONAL CONTACT DOCK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Initiate Contact & Collaboration
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Available for high-impact Python backend engineering, generative AI prompt architecture, RAG pipelines, and cyber-physical systems development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: ONE-CLICK QUICK CONTACT & BADGES        */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channel Cards */}
            <div className="space-y-4">
              
              {/* Email Card with 1-Click Copy */}
              <div className="rounded-2xl cyber-glass border border-slate-800 p-5 group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block uppercase">
                        Primary Email
                      </span>
                      <a 
                        href={`mailto:${personalData.email}`}
                        className="text-sm sm:text-base font-mono font-bold text-white hover:text-cyan-400 transition-colors"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalData.email, 'Email')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                    title="Copy Email to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[11px] font-mono text-cyan-400/80 flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>One-click copy enabled • Inquiries replied within 24h</span>
                </div>
              </div>

              {/* Phone Card with 1-Click Copy */}
              <div className="rounded-2xl cyber-glass border border-slate-800 p-5 group hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block uppercase">
                        Direct Phone / WhatsApp
                      </span>
                      <a 
                        href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                        className="text-sm sm:text-base font-mono font-bold text-white hover:text-purple-400 transition-colors"
                      >
                        {personalData.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalData.phone, 'Phone number')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-purple-400 hover:border-purple-500/50 transition-all"
                    title="Copy Phone to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[11px] font-mono text-purple-400/80 flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Voice calls & WhatsApp enabled</span>
                </div>
              </div>

            </div>

            {/* Direct External Link Badges */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* GitHub Badge */}
              <a
                href={personalData.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-4 rounded-xl cyber-glass border border-slate-800 hover:border-cyan-400 transition-all flex flex-col justify-between group hover:shadow-neon-cyan"
              >
                <div className="flex items-center justify-between mb-3">
                  <Github className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Open Source</span>
                  <span className="text-sm font-bold text-white font-mono">GitHub Profile</span>
                  <span className="text-[11px] text-cyan-400 font-mono block mt-0.5">@{personalData.githubUsername}</span>
                </div>
              </a>

              {/* LinkedIn Badge */}
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-4 rounded-xl cyber-glass border border-slate-800 hover:border-blue-400 transition-all flex flex-col justify-between group hover:shadow-neon-cyan"
              >
                <div className="flex items-center justify-between mb-3">
                  <Linkedin className="w-6 h-6 text-slate-300 group-hover:text-blue-400 transition-colors" />
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Professional</span>
                  <span className="text-sm font-bold text-white font-mono">LinkedIn Profile</span>
                  <span className="text-[11px] text-blue-400 font-mono block mt-0.5">Dammani Ajay</span>
                </div>
              </a>

            </div>

            {/* Quick Context & Location */}
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{personalData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Standard Timezone: IST (UTC +5:30)</span>
              </div>
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: EMBEDDED DIRECT CONTACT FORM           */}
          {/* ==================================================== */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl cyber-glass border border-cyan-500/30 p-6 sm:p-8 relative">
              
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>DIRECT DISPATCH INTERFACE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Send a Structured Transmission
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Sarah Chen"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      CONTACT EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., sarah@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    PROJECT / ROLE SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Full-Stack Python & RAG Architect Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    TRANSMISSION MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project requirements, technical challenges, or collaboration scope..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white font-sans outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:shadow-neon-cyan transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>ENCODING TRANSMISSION...</span>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                      <span>DISPATCH CONFIRMED!</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT DISPATCH</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* ==================================================== */}
        {/* FOOTER & TELEMETRY DIAGNOSTICS                       */}
        {/* ==================================================== */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="text-slate-400 font-semibold">ALL SYSTEMS OPERATIONAL</span>
            <span className="text-slate-700">|</span>
            <span>THREE.JS & REACT THREE FIBER ENGINE</span>
          </div>

          <div>
            © {new Date().getFullYear()} Dammani Ajay. Built with Three.js, React & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>RETURN TO ORBIT</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </section>
  );
}
