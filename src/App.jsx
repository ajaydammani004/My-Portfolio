import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { CompetenciesSection } from './components/sections/CompetenciesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { ContactSection } from './components/sections/ContactSection';
import { FloatingDock } from './components/layout/FloatingDock';
import { Toast } from './components/ui/Toast';

export default function App() {
  const [toast, setToast] = useState({ message: '', type: 'success', key: 0 });

  const showToast = (message, type = 'success') => {
    setToast({
      message,
      type,
      key: Date.now()
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, message: '' }));
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* Top HUD Navigation Bar */}
      <Navbar onContactClick={() => {}} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero 3D Interactive Cyber-Physical Scene */}
        <HeroSection onShowToast={showToast} />

        {/* 2. Core Architectural Competency Pillars */}
        <CompetenciesSection />

        {/* 3. 3D Spatial Projects Showcase & GitHub Sync */}
        <ProjectsSection />

        {/* 4. Experience & Education Engineering Timeline */}
        <TimelineSection />

        {/* 5. Contact Dock & Dispatch Interface */}
        <ContactSection onShowToast={showToast} />
      </main>

      {/* Persistent Floating Quick Dock */}
      <FloatingDock onShowToast={showToast} />

      {/* Futuristic HUD Notification Toast */}
      {toast.message && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

    </div>
  );
}
