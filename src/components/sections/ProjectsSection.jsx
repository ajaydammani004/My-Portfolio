import React, { useState, useEffect, useRef } from 'react';
import { projectsData, personalData } from '../../data/portfolioData';
import { ProjectModal } from '../modals/ProjectModal';
import { soundFx } from '../../utils/audioSynth';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  Star, 
  GitFork, 
  Cpu, 
  Code, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

// 3D Spatial Tilt Card Component
function SpatialProjectCard({ project, onOpenArchitecture }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className="relative rounded-2xl cyber-glass border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between group shadow-xl transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle Glare Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${50 + rotation.y * 3}% ${50 - rotation.x * 3}%, rgba(0, 240, 255, 0.12) 0%, transparent 60%)`
        }}
      />

      <div>
        {/* Top Header: Category Badge + GitHub Link */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border bg-cyan-950/40 border-cyan-500/30 text-cyan-400">
            {project.category}
          </span>

          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                title="Open Live Demonstration"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
          {project.title}
        </h3>

        {/* Project Summary */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
          {project.summary}
        </p>

        {/* Architecture Flow Micro-Summary */}
        <div className="mb-4 p-2.5 rounded-lg bg-black/50 border border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="text-cyan-400 font-semibold block mb-0.5">PIPELINE:</span>
          <span className="text-slate-300 line-clamp-2">
            {project.architecture?.process || "Direct API Orchestration & Schema Validation"}
          </span>
        </div>
      </div>

      {/* Card Footer: Tech Stack + Architecture Modal Trigger */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack?.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action Button: Architecture Deep Dive */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenArchitecture(project);
          }}
          className="w-full py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-all flex items-center justify-center gap-2 group-hover:border-cyan-400"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>INSPECT SYSTEM ARCHITECTURE</span>
        </button>

      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [liveGitHubData, setLiveGitHubData] = useState([]);
  const [githubSyncStatus, setGithubSyncStatus] = useState('Syncing...');

  // Fetch live repositories from GitHub API on mount
  useEffect(() => {
    async function fetchGitHubRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${personalData.githubUsername}/repos?sort=updated&per_page=10`);
        if (res.ok) {
          const data = await res.json();
          setLiveGitHubData(data);
          setGithubSyncStatus(`Synchronized with @${personalData.githubUsername}`);
        } else {
          setGithubSyncStatus(`Direct Sync Ready`);
        }
      } catch (err) {
        setGithubSyncStatus(`Direct Sync Ready`);
      }
    }
    fetchGitHubRepos();
  }, []);

  const categories = ['All', 'Generative AI', 'Python Full-Stack', 'Mechanical & IoT'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 cyber-grid-bg border-t border-cyan-500/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PRODUCTION SYSTEMS & REPOSITORIES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Featured 3D Projects Showcase
            </h2>

            <p className="text-slate-400 text-sm sm:text-base">
              Explore spatial project architectures spanning autonomous healthcare triage, generative visual workflows, high-concurrency booking engines, and cyber-physical telemetry digital twins.
            </p>
          </div>

          {/* GitHub Sync Indicator Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono text-slate-300">
            <Github className="w-4 h-4 text-cyan-400" />
            <span>{githubSyncStatus}</span>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playHover();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-neon-cyan'
                  : 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Spatial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <SpatialProjectCard
              key={project.id}
              project={project}
              onOpenArchitecture={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* GitHub Live Feed Banner */}
        <div className="mt-14 rounded-2xl cyber-glass border border-cyan-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400">
              <Github className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Live GitHub Repositories (@{personalData.githubUsername})
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore hospital-bot, glowup-ai, flight-booking-ticket, Ajay.python and more open-source repositories directly.
              </p>
            </div>
          </div>

          <a
            href={personalData.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-2 hover:shadow-neon-cyan whitespace-nowrap"
          >
            <span>VISIT GITHUB PROFILE</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* System Architecture Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

    </section>
  );
}
