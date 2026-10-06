import React, { useState, useMemo } from 'react';
import { Certificate } from '../types';
import { CertificateRenderer } from './CertificateRenderer';
import { useTheme } from '../context/ThemeContext';
import {
  Award,
  Maximize2,
  Search,
  ShieldCheck,
  CheckCircle2,
  Camera,
} from 'lucide-react';

interface CertificatesHubProps {
  certificates: Certificate[];
  recipientName: string;
  onOpenFullscreen: (index: number) => void;
  onAttachCertificatePhoto?: (certId: string, photoDataUrl: string) => void;
}

export const CertificatesHub: React.FC<CertificatesHubProps> = ({
  certificates,
  recipientName,
  onOpenFullscreen,
  onAttachCertificatePhoto,
}) => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Categories list
  const categories = [
    { id: 'all', label: 'All 10 Credentials' },
    { id: 'civil', label: 'Civil & Geotechnical' },
    { id: 'ai', label: 'AI, LLMs & Google Cloud' },
    { id: 'leadership', label: 'Leadership & UN SDG 6' },
    { id: 'volunteering', label: 'Volunteering (BTTP & UNHCR)' },
    { id: 'thesis', label: 'SUIT Peshawar Thesis' },
  ];

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      // Category filter
      let matchesCat = true;
      if (activeCategory === 'volunteering') {
        matchesCat =
          cert.id.includes('bttp') ||
          cert.id.includes('unhcr') ||
          cert.title.toLowerCase().includes('volunteer') ||
          cert.issuer.toLowerCase().includes('refugee') ||
          cert.issuer.toLowerCase().includes('climate');
      } else if (activeCategory === 'civil') {
        matchesCat =
          cert.id.includes('site-investigation') ||
          cert.title.toLowerCase().includes('site') ||
          cert.title.toLowerCase().includes('embankment') ||
          cert.id.includes('thesis');
      } else if (activeCategory === 'ai') {
        matchesCat =
          cert.title.toLowerCase().includes('ai') ||
          cert.title.toLowerCase().includes('generative') ||
          cert.issuer.toLowerCase().includes('google') ||
          cert.id.includes('helsinki');
      } else if (activeCategory === 'leadership') {
        matchesCat =
          cert.title.toLowerCase().includes('leadership') ||
          cert.title.toLowerCase().includes('sdg') ||
          cert.issuer.toLowerCase().includes('unitar') ||
          cert.issuer.toLowerCase().includes('hopkins');
      } else if (activeCategory === 'thesis') {
        matchesCat =
          cert.layoutVariant === 'suit_thesis' ||
          cert.id.includes('thesis') ||
          cert.issuer.toLowerCase().includes('sarhad');
      }

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const skillsStr = Array.isArray(cert.skillsCovered)
        ? cert.skillsCovered.join(' ')
        : cert.skillsCovered;
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.credentialId.toLowerCase().includes(q) ||
        skillsStr.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [certificates, activeCategory, searchQuery]);

  return (
    <section id="certificates" className="py-16 sm:py-24 border-t border-stone-200/80 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
              <Award className="w-4 h-4 text-amber-800" />
              <span>Accredited Credentials Window</span>
              <span className="text-stone-300">·</span>
              <span className="text-emerald-800 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Verified Industry Certifications
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mt-2 font-sans">
              Click any certificate thumbnail below to immediately launch the high-resolution, full-screen inspection window with zoom controls, verification seals, and competency breakdown.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-700 bg-stone-100 px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold">{certificates.length} Total Verified Credentials</span>
          </div>
        </div>

        {/* The Credentials Window Card */}
        <div className="bg-[#fbf9f5] border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-lg shadow-stone-900/5">
          {/* Window Control Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-stone-900 text-amber-100 font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificate or skill..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Certificate Cards Grid */}
          {filteredCertificates.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-2">
              <p className="text-sm font-medium">No certificates matched your criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs text-amber-900 font-semibold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {filteredCertificates.map((cert) => {
                const originalIndex = certificates.findIndex((c) => c.id === cert.id);
                const skills = Array.isArray(cert.skillsCovered)
                  ? cert.skillsCovered
                  : [cert.skillsCovered];

                return (
                  <article
                    key={cert.id}
                    className="group bg-white border border-stone-200/90 hover:border-amber-800/40 rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative shadow-xs"
                  >
                    {/* Thumbnail Container */}
                    <div
                      onClick={() => onOpenFullscreen(originalIndex)}
                      className="cursor-pointer relative overflow-hidden rounded-lg group-hover:scale-[1.01] transition-transform"
                      title="Click to view full-screen"
                    >
                      <CertificateRenderer
                        certificate={cert}
                        recipientName={recipientName}
                        isThumbnail={true}
                      />

                      {/* Hover Overlay with Fullscreen prompt */}
                      <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                        <span className="px-3 py-1.5 rounded-lg bg-stone-900 text-amber-100 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          View Full-Screen
                        </span>
                      </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="pt-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title and Issuer */}
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            onClick={() => onOpenFullscreen(originalIndex)}
                            className="text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 cursor-pointer"
                          >
                            {cert.title}
                          </h3>
                        </div>

                        {/* Metadata with Typographic Separators */}
                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1 font-sans">
                          <span className="font-medium text-stone-700">{cert.issuer}</span>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span className="font-mono">{cert.issueDate}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      {/* Verified Skills tags */}
                      <div className="mt-4 pt-3 border-t border-stone-200">
                        <div className="flex flex-wrap gap-1">
                          {skills.slice(0, 3).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-mono text-stone-700 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="text-[10px] font-mono text-stone-500 px-1 py-0.5">
                              +{skills.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Card Footer with Direct Fullscreen Inspection */}
                        <div className="mt-3 pt-3 flex items-center justify-between text-xs gap-2 border-t border-stone-100">
                          {onAttachCertificatePhoto ? (
                            <label
                              className="text-[11px] font-mono text-stone-500 hover:text-amber-900 flex items-center gap-1.5 cursor-pointer transition-colors"
                              title="Attach or replace your certificate photo"
                            >
                              <Camera className="w-3.5 h-3.5 text-amber-800" />
                              <span>{cert.customImageUrl ? 'Change Photo' : 'Attach Photo'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      if (typeof reader.result === 'string') {
                                        onAttachCertificatePhoto(cert.id, reader.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          ) : (
                            <span className="text-[11px] font-mono text-emerald-800 flex items-center gap-1 font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Verified</span>
                            </span>
                          )}

                          <button
                            onClick={() => onOpenFullscreen(originalIndex)}
                            className="text-xs font-semibold text-stone-800 hover:text-amber-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Inspect</span>
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Window Footer Trust Stats */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>All {certificates.length} Credentials Verified Active</span>
              </span>
              <span className="text-stone-300">·</span>
              <span>Direct In-App Fullscreen Viewing</span>
            </div>

            <div className="text-stone-500 text-[11px]">
              Credential Authority: Global Standards & Accredited Examination Boards
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
