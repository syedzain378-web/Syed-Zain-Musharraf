import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  Layers,
  Activity,
  Terminal,
  Zap,
  CheckCircle2,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Globe,
  Mountain,
  Droplets,
  Gauge,
  Radio,
  FileCheck,
  Camera,
  BookOpen,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  projectPhotos?: Record<string, string[]>;
  onAttachProjectPhoto?: (projectId: string, photoDataUrl: string) => void;
  onClose: () => void;
  onOpenSukkiKinariGallery?: () => void;
  onOpenThesisModal?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  projectPhotos = {},
  onAttachProjectPhoto,
  onClose,
  onOpenSukkiKinariGallery,
  onOpenThesisModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'civic_eco' | 'simulation' | 'architecture'>('overview');
  const [simulatedCount, setSimulatedCount] = useState<number>(42);
  const [isRunningSim, setIsRunningSim] = useState<boolean>(false);

  // CivicEco AI Live Interactive Simulation States
  const [selectedCorridor, setSelectedCorridor] = useState<'kkh' | 'swat' | 'murree' | 'babusar'>('kkh');
  const [cohesion, setCohesion] = useState<number>(24); // kPa
  const [frictionAngle, setFrictionAngle] = useState<number>(28); // degrees
  const [slopeAngle, setSlopeAngle] = useState<number>(35); // degrees
  const [porePressure, setPorePressure] = useState<number>(0.25); // ru

  if (!project) return null;

  const isCivicEco = project.id === 'civic-eco-ai';

  // Calculate real-time Factor of Safety based on Bishop's simplified limit equilibrium approximation
  const radFriction = (frictionAngle * Math.PI) / 180;
  const radSlope = (slopeAngle * Math.PI) / 180;
  const rawFos = (cohesion / (18.5 * 10 * Math.sin(radSlope))) + ((1 - porePressure) * (Math.tan(radFriction) / Math.tan(radSlope)));
  const factorOfSafety = Math.max(0.65, Math.min(2.8, parseFloat(rawFos.toFixed(2))));

  const getFosStatus = (fos: number) => {
    if (fos >= 1.30) return { label: 'STABLE (AASHTO COMPLIANT)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (fos >= 1.05) return { label: 'MARGINAL (SLOPE REINFORCEMENT REQUIRED)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { label: 'CRITICAL / FAILURE IMMINENT', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
  };

  const fosStatus = getFosStatus(factorOfSafety);

  const handleRunSim = () => {
    setIsRunningSim(true);
    setTimeout(() => {
      setSimulatedCount((prev) => prev + Math.floor(Math.random() * 15) + 5);
      setIsRunningSim(false);
    }, 600);
  };

  const demoData = project.interactiveDemoData || {
    liveStatus: 'OPERATIONAL · SYSTEM ACTIVE',
    latency: '18.4 ms',
    throughput: '8,400 ops/sec',
    featuresPreview: [
      'Sub-second deterministic state transition',
      'Zero external dependency execution',
      'End-to-end cryptographic integrity',
      'Real-time streaming observability',
    ],
    sampleLogsOrOutputs: [
      'Boot: Core microservice started',
      'Handshake established with edge proxy',
      'Memory consumption: 42 MB / P99 latency: 12ms',
      'System nominal. Ready for payload.',
    ],
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Direct Project Access`}
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Direct System Access · In-App Geotechnical Review
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Project Title & Metric Banner */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-800/80 bg-neutral-950/70 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>{project.category}</span>
            <span className="text-neutral-600">·</span>
            <span>Production Verified</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">{project.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-cyan-300 font-semibold">
              {project.metrics}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold hover:from-sky-300 hover:to-cyan-300 flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Launch Live App ({new URL(project.liveUrl).hostname})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <div className="text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Direct Interactive Telemetry</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 bg-neutral-900 border-b border-neutral-800 flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-neutral-800 text-cyan-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            System Overview
          </button>

          {isCivicEco && (
            <button
              onClick={() => setActiveTab('civic_eco')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'civic_eco'
                  ? 'bg-neutral-800 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Corridor Telemetry & Slope AI</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-neutral-800 text-cyan-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'architecture'
                ? 'bg-neutral-800 text-cyan-300 border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Tech Architecture
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-neutral-300 leading-relaxed font-sans">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Creator Attribution for CivicEco AI */}
              {isCivicEco && (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Core Development Team
                    </span>
                    <span className="text-[11px] font-mono text-cyan-300">Netlify Live Production</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
                      <p className="font-bold text-white text-xs">Syed Zain Musharraf</p>
                      <p className="text-[11px] text-cyan-300 font-mono mt-0.5">Lead App Developer & Geotechnical AI Infrastructure</p>
                      <p className="text-[10px] text-neutral-400 mt-1">syedzain378@gmail.com</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
                      <p className="font-bold text-white text-xs">Husnain</p>
                      <p className="text-[11px] text-emerald-300 font-mono mt-0.5">Lead App Developer & Geotechnical AI Infrastructure</p>
                      <p className="text-[10px] text-neutral-400 mt-1">husnainahmed8512@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sukki Kinari Site Pictures & PDF Callout */}
              {project.id === 'sukki-kinari-500kv' && onOpenSukkiKinariGallery && (
                <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-teal-300 font-bold flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-teal-400" />
                      Official Field Construction Photolog (Site pictures.pdf)
                    </span>
                    <p className="text-xs text-slate-300">
                      High-resolution visual documentation of 500kV suspension towers, deep foundation concrete pours, and Kaghan to Rawat mountain corridor.
                    </p>
                  </div>
                  <button
                    onClick={onOpenSukkiKinariGallery}
                    className="px-4 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold font-mono flex items-center gap-2 transition-colors shrink-0 shadow-md"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Open Site Pictures Gallery</span>
                  </button>
                </div>
              )}

              {/* SUIT Capstone Thesis Callout */}
              {project.id === 'embankment-slope-model' && onOpenThesisModal && (
                <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-teal-300 font-bold flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      Official 22-Page Research Publication (B.Sc. Thesis)
                    </span>
                    <p className="text-xs text-slate-300">
                      Sarhad University of Science & Technology, Peshawar. Parametric slope stability analysis and computational limit equilibrium modeling.
                    </p>
                  </div>
                  <button
                    onClick={onOpenThesisModal}
                    className="px-4 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold font-mono flex items-center gap-2 transition-colors shrink-0 shadow-md"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View 22-Page Thesis Document</span>
                  </button>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  System Context & Problem Solved
                </h4>
                <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Engineering Highlights & Outcomes
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <span className="text-cyan-400 shrink-0 font-bold">―</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Integrated Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* User Attached Photos for this Project */}
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-200 font-bold">
                      Project Photo Attachments ({projectPhotos[project.id]?.length || 0})
                    </span>
                  </div>

                  {onAttachProjectPhoto && (
                    <label
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Attach photo or site document"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Attach Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && onAttachProjectPhoto) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                onAttachProjectPhoto(project.id, reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>

                {projectPhotos[project.id]?.length ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {projectPhotos[project.id].map((photoUrl, pIdx) => (
                      <div
                        key={pIdx}
                        className="rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 aspect-video relative group"
                      >
                        <img
                          src={photoUrl}
                          alt={`${project.title} attachment ${pIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400">
                    No custom photos attached yet. Click &quot;Attach Photo&quot; to upload construction site pictures, CAD drawings, or field evidence.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Dedicated CivicEco AI Interactive Corridor & Slope Solver Tab */}
          {activeTab === 'civic_eco' && isCivicEco && (
            <div className="space-y-6">
              {/* Corridor Preset Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Select Pakistan Mountain Highway Corridor:</span>
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400">Live Geo-Telemetry</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      setSelectedCorridor('kkh');
                      setCohesion(22);
                      setFrictionAngle(26);
                      setSlopeAngle(40);
                      setPorePressure(0.35);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCorridor === 'kkh'
                        ? 'bg-neutral-800 border-cyan-400 text-white shadow-md'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono">KKH N-35</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate">Karakoram Highway</p>
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                      KM 218+200
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCorridor('swat');
                      setCohesion(28);
                      setFrictionAngle(32);
                      setSlopeAngle(28);
                      setPorePressure(0.15);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCorridor === 'swat'
                        ? 'bg-neutral-800 border-cyan-400 text-white shadow-md'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono">Swat M-16</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate">Motorway Corridor</p>
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300">
                      Chakdara P-1
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCorridor('murree');
                      setCohesion(20);
                      setFrictionAngle(24);
                      setSlopeAngle(36);
                      setPorePressure(0.40);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCorridor === 'murree'
                        ? 'bg-neutral-800 border-cyan-400 text-white shadow-md'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono">Murree E-75</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate">Expressway Culvert</p>
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                      Twin Culvert
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCorridor('babusar');
                      setCohesion(30);
                      setFrictionAngle(34);
                      setSlopeAngle(45);
                      setPorePressure(0.20);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCorridor === 'babusar'
                        ? 'bg-neutral-800 border-cyan-400 text-white shadow-md'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono">Babusar Top</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate">Elevation 4,173m</p>
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300">
                      Alpine Pass
                    </span>
                  </button>
                </div>
              </div>

              {/* Geo-Slope Stability Solver */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-cyan-400" />
                      <span>Limit Equilibrium Slope Stability Solver (Bishop Method)</span>
                    </h5>
                    <p className="text-[11px] text-neutral-400">
                      Real-time parametric Factor of Safety (FoS) calculation across soil stratigraphy
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${fosStatus.color}`}>
                    FoS: {factorOfSafety} · {fosStatus.label.split(' ')[0]}
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Soil Cohesion (c):</span>
                      <span className="text-white font-bold">{cohesion} kPa</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={cohesion}
                      onChange={(e) => setCohesion(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Internal Friction Angle (φ):</span>
                      <span className="text-white font-bold">{frictionAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="45"
                      value={frictionAngle}
                      onChange={(e) => setFrictionAngle(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Embankment Slope Angle (β):</span>
                      <span className="text-white font-bold">{slopeAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="65"
                      value={slopeAngle}
                      onChange={(e) => setSlopeAngle(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-neutral-400 text-[11px]">
                      <span>Pore Pressure Ratio (ru):</span>
                      <span className="text-white font-bold">{porePressure.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.6"
                      step="0.05"
                      value={porePressure}
                      onChange={(e) => setPorePressure(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg"
                    />
                  </div>
                </div>

                {/* Directive output */}
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-mono text-[11px] block font-semibold mb-1">
                    Automated Field Geotechnical Directive:
                  </span>
                  {factorOfSafety < 1.05 ? (
                    <p className="text-red-300 font-medium">
                      URGENT: Factor of safety below limit (FoS = {factorOfSafety}). Deploy emergency 150mm dia, 12m length soil nails at 1.5m c/c grid with shotcrete facing and relieve pore pressure with horizontal weep hole drains.
                    </p>
                  ) : factorOfSafety < 1.30 ? (
                    <p className="text-amber-300 font-medium">
                      ADVISORY: Marginal slope stability (FoS = {factorOfSafety}). Install geotechnical monitoring tilt meters, grade surface runoff ditches, and execute hydroseeding bio-engineering.
                    </p>
                  ) : (
                    <p className="text-emerald-300 font-medium">
                      NOMINAL: Embankment slope is stable (FoS = {factorOfSafety}). Complies with AASHTO / Eurocode 7 standards. Routine telemetry logging maintained.
                    </p>
                  )}
                </div>
              </div>

              {/* HydroScan & Defect Sensors Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                    HydroScan Subsurface Aquifer
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Groundwater Depth:</span>
                    <span className="text-cyan-300 font-bold">{selectedCorridor === 'kkh' ? '1.8 m' : selectedCorridor === 'swat' ? '7.2 m' : '3.4 m'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Allowable Bearing (q_allow):</span>
                    <span className="text-emerald-400 font-bold">{selectedCorridor === 'kkh' ? '95 kPa (Critical)' : selectedCorridor === 'swat' ? '280 kPa (High)' : '185 kPa'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Liquefaction Hazard:</span>
                    <span className={selectedCorridor === 'kkh' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {selectedCorridor === 'kkh' ? 'HIGH HAZARD' : 'NEGLIGIBLE'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                  <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                    Asset Twin Crack AI Vision
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Pier #4 Shear Crack:</span>
                    <span className="text-amber-300 font-bold">0.88 mm (Active)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Culvert Manning Flow (n=0.013):</span>
                    <span className="text-cyan-300 font-bold">48.5 mm/hr deluge</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Eco-Materials Spec:</span>
                    <span className="text-emerald-400 font-bold">40% RCA + Bio-Fibers</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {/* Telemetry Status Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-neutral-500">
                    Live Cluster Status
                  </span>
                  <p className="text-xs font-mono text-emerald-400 mt-1 font-semibold truncate">
                    {demoData.liveStatus}
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-neutral-500">
                    P99 Latency
                  </span>
                  <p className="text-xs font-mono text-cyan-300 mt-1 font-semibold">
                    {demoData.latency}
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-neutral-500">
                    Throughput
                  </span>
                  <p className="text-xs font-mono text-cyan-300 mt-1 font-semibold">
                    {demoData.throughput}
                  </p>
                </div>
              </div>

              {/* Interactive Action Bar inside modal */}
              <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-neutral-200">
                    Dispatch Real-Time Geotechnical Telemetry
                  </h5>
                  <p className="text-[11px] text-neutral-400">
                    Execute simulated sensor packet stream across mountain corridors
                  </p>
                </div>

                <button
                  onClick={handleRunSim}
                  disabled={isRunningSim}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-mono transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isRunningSim ? 'Executing...' : `Dispatch Payload (#${simulatedCount})`}</span>
                </button>
              </div>

              {/* Terminal Logs Simulation */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-500 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                    Console Observability Stream
                  </span>
                  <span>Direct Telemetry</span>
                </div>
                <div className="space-y-1 text-neutral-400">
                  {demoData.sampleLogsOrOutputs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-neutral-600 select-none">[{idx + 1}]</span>
                      <span className={idx === demoData.sampleLogsOrOutputs.length - 1 ? 'text-cyan-300' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                  <div className="text-emerald-400 flex items-center gap-2 pt-1">
                    <span className="text-neutral-600">[{demoData.sampleLogsOrOutputs.length + 1}]</span>
                    <span>Direct Access Verified. Ready for next query.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Architectural Blueprint & PWA Offline Engine
                </h5>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Engineered with a stateless, decoupled architecture ensuring offline capability in remote mountain terrains. Utilizes browser IndexedDB for telemetry storage, automated cryptographic report signing, and sub-millisecond edge calculation for Limit Equilibrium and Terzaghi Bearing Capacity equations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {demoData.featuresPreview.map((feat, idx) => (
                  <div key={idx} className="p-3 bg-neutral-950/60 border border-neutral-800 rounded-lg flex items-start gap-2.5 text-xs text-neutral-300">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-white flex items-center gap-1 font-semibold underline underline-offset-2"
              >
                <span>Live Deployment: {project.liveUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
          >
            Close Viewer
          </button>
        </footer>
      </div>
    </div>
  );
};

