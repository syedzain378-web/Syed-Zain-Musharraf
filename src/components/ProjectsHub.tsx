import React, { useState } from 'react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { CivicEcoLogo } from './CivicEcoLogo';
import {
  Layers,
  Activity,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Globe,
  Cpu,
  Camera,
  BookOpen,
  Trash2,
  X,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';

interface ProjectsHubProps {
  projects: Project[];
  projectPhotos?: Record<string, string[]>;
  onAttachProjectPhoto?: (projectId: string, photoDataUrl: string) => void;
  onRemoveProjectPhoto?: (projectId: string, index: number) => void;
  onSelectProject: (project: Project) => void;
  onOpenSukkiKinariGallery?: () => void;
  onOpenThesisModal?: () => void;
}

export const ProjectsHub: React.FC<ProjectsHubProps> = ({
  projects,
  projectPhotos = {},
  onAttachProjectPhoto,
  onRemoveProjectPhoto,
  onSelectProject,
  onOpenSukkiKinariGallery,
  onOpenThesisModal,
}) => {
  const { theme } = useTheme();
  const [previewPhoto, setPreviewPhoto] = useState<{ url: string; title: string } | null>(null);

  const handleFileUpload = (
    projectId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && onAttachProjectPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onAttachProjectPhoto(projectId, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-stone-200/80 bg-[#faf7f2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
            <Layers className="w-4 h-4 text-amber-800" />
            <span>Interactive Engineering Case Studies</span>
            <span className="text-stone-400">·</span>
            <span className="text-teal-800">Direct In-App Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Featured Civil & Infrastructure Systems
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mt-2 font-sans">
            Explore verified field implementations and computational software. Click any project to launch the interactive live simulator, review telemetry, or attach custom site photographs.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const isCivicEco = project.id === 'civic-eco-ai';
            const attachedPhotos = projectPhotos[project.id] || [];

            return (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group cursor-pointer rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-white border-2 hover:shadow-xl ${
                  isCivicEco
                    ? 'md:col-span-2 border-amber-800/40 hover:border-amber-700 shadow-md bg-gradient-to-br from-[#fefbf6] via-white to-[#f5f9f8]'
                    : 'border-stone-200/90 hover:border-amber-700/50 shadow-sm'
                }`}
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600/0 via-amber-600/50 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-500 mb-3">
                    <span className="text-amber-800 uppercase tracking-wider font-bold">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-[11px] font-mono flex items-center gap-1 font-semibold">
                          <Globe className="w-3 h-3 text-teal-700" />
                          Live Netlify App
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Direct Access
                      </span>
                    </div>
                  </div>

                  {/* Title and Subtitle with optional Logo */}
                  <div className="flex items-start gap-4">
                    {isCivicEco && (
                      <div className="shrink-0 p-1.5 rounded-2xl bg-teal-900 border border-teal-700 shadow-md">
                        <CivicEcoLogo size={48} />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Special Crown Banner for CivicEco AI */}
                  {isCivicEco && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300/80 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-amber-800 shrink-0" />
                        <span className="font-semibold">
                          Co-Developed by Syed Zain Musharraf & Husnain · Lead App Developers
                        </span>
                      </div>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 underline underline-offset-2"
                      >
                        <span>Open Netlify Deployment</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Metrics Banner */}
                  <div className="mt-4 p-3 rounded-lg bg-[#fbf9f5] border border-stone-200 font-mono text-xs text-amber-950 flex items-center justify-between">
                    <span className="font-semibold">{project.metrics}</span>
                    <Activity className="w-4 h-4 text-emerald-700" />
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-stone-700 line-clamp-3 mt-4 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-4 space-y-1.5">
                    {project.highlights.slice(0, isCivicEco ? 3 : 2).map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-xs text-stone-600 flex items-start gap-2"
                      >
                        <span className="text-amber-800 font-bold">―</span>
                        <span className="truncate">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Attached Project Photos Gallery Strip (User Uploaded) */}
                  {attachedPhotos.length > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-stone-700 font-semibold flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
                          <span>Attached Photos ({attachedPhotos.length})</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {attachedPhotos.map((photoUrl, pIdx) => (
                          <div
                            key={pIdx}
                            className="relative group/thumb w-14 h-14 rounded-lg overflow-hidden border border-stone-300 shadow-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewPhoto({ url: photoUrl, title: `${project.title} - Photo ${pIdx + 1}` });
                            }}
                          >
                            <img
                              src={photoUrl}
                              alt={`Project Photo ${pIdx + 1}`}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                            />
                            {onRemoveProjectPhoto && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveProjectPhoto(project.id, pIdx);
                                }}
                                className="absolute top-0.5 right-0.5 p-1 rounded-full bg-stone-900/80 text-white hover:bg-rose-600 transition-colors opacity-0 group-hover/thumb:opacity-100"
                                title="Remove photo"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Tech Stack and Action Buttons */}
                <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="text-[11px] font-mono text-stone-500 px-1 py-0.5">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
                    {/* Add Photo Button on Project */}
                    {onAttachProjectPhoto && (
                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        title="Add photo or document to this project"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-800" />
                        <span>Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(project.id, e)}
                        />
                      </label>
                    )}

                    {/* Sukki Kinari Site Pictures Button */}
                    {project.id === 'sukki-kinari-500kv' && onOpenSukkiKinariGallery && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenSukkiKinariGallery();
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-900 flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5 text-teal-800" />
                        <span>Site Pictures (PDF)</span>
                      </button>
                    )}

                    {/* SUIT Thesis Research Publication Button */}
                    {project.id === 'embankment-slope-model' && onOpenThesisModal && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenThesisModal();
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                        <span>22-Page Thesis (PDF)</span>
                      </button>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold text-teal-900 hover:text-teal-950 flex items-center gap-1 transition-colors bg-teal-50 px-2.5 py-1.5 rounded-lg border border-teal-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </a>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 flex items-center gap-1 transition-colors whitespace-nowrap"
                    >
                      <span>Demo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Direct Lightbox / Photo Preview Modal */}
      {previewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <h3 className="text-sm font-bold text-stone-900 font-mono">
                {previewPhoto.title}
              </h3>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={previewPhoto.url}
              alt={previewPhoto.title}
              className="max-h-[75vh] w-auto max-w-full mx-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};
