import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Mountain, ShieldCheck, Camera, MapPin, Maximize2 } from 'lucide-react';

interface SukkiKinariGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhotoIndex?: number;
}

export const SukkiKinariGalleryModal: React.FC<SukkiKinariGalleryModalProps> = ({
  isOpen,
  onClose,
  initialPhotoIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialPhotoIndex);

  if (!isOpen) return null;

  const sitePhotos = [
    {
      id: 'photo-1',
      title: 'High-Altitude 500kV Transmission Towers & Alpine Snow Peaks',
      location: 'Kaghan Valley Corridor • Sukki Kinari Hydropower Line',
      elevation: '2,650m Elevation',
      description:
        'Panoramic view of multiple heavy 500kV steel lattice transmission towers anchored on steep mountain slopes, with perpetual snow-capped Himalayan/Hindukush peaks rising in the background and river valley settlements below.',
      tags: ['500kV High Voltage', 'Alpine Terrain', 'Tower Erection', 'Kaghan to Rawat'],
      accentColor: '#38bdf8',
      svgRender: (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="skyGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="snowPeak" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="mtnSlope1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#475569" />
              <stop offset="80%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="forestGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a29" />
              <stop offset="100%" stopColor="#0d1f14" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#skyGrad1)" />
          {/* Distant Snow Mountains */}
          <polygon points="180,120 280,60 380,115 480,75 560,130 600,140 160,140" fill="url(#snowPeak)" />
          <polygon points="260,70 280,60 320,85 290,95" fill="#f1f5f9" />
          <polygon points="460,82 480,75 510,95 485,102" fill="#f1f5f9" />

          {/* Steep Mountain Slope Body */}
          <polygon points="0,400 0,160 220,130 420,160 600,200 600,400" fill="url(#mtnSlope1)" />
          <polygon points="0,400 40,240 280,170 520,220 600,280 600,400" fill="url(#forestGreen)" opacity="0.85" />

          {/* Valley Floor and River Stones */}
          <polygon points="0,400 0,330 180,310 380,340 600,320 600,400" fill="#64748b" opacity="0.6" />
          <rect x="20" y="320" width="80" height="28" fill="#e2e8f0" stroke="#cbd5e1" />
          <rect x="220" y="340" width="90" height="24" fill="#f8fafc" stroke="#94a3b8" />

          {/* 500kV High-Voltage Lattice Towers on Mountain Slope */}
          {/* Tower 1 (Lower Left) */}
          <g transform="translate(180, 160)">
            <line x1="8" y1="0" x2="2" y2="48" stroke="#ffffff" strokeWidth="2" />
            <line x1="16" y1="0" x2="22" y2="48" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="12" x2="24" y2="12" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="2" y1="24" x2="22" y2="24" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="3" y1="36" x2="21" y2="36" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="2" y1="12" x2="22" y2="24" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="22" y1="12" x2="2" y2="24" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="2" y1="24" x2="22" y2="36" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="22" y1="24" x2="2" y2="36" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="-4" y1="8" x2="28" y2="8" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Tower 2 (Mid Mountain) */}
          <g transform="translate(265, 128)">
            <line x1="7" y1="0" x2="2" y2="40" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="13" y1="0" x2="18" y2="40" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="0" y1="10" x2="20" y2="10" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="2" y1="20" x2="18" y2="20" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="-3" y1="6" x2="23" y2="6" stroke="#ffffff" strokeWidth="1.8" />
          </g>

          {/* Tower 3 (Upper Slope) */}
          <g transform="translate(305, 136)">
            <line x1="6" y1="0" x2="1" y2="36" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="12" y1="0" x2="17" y2="36" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="0" y1="8" x2="18" y2="8" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="-3" y1="5" x2="21" y2="5" stroke="#ffffff" strokeWidth="1.8" />
          </g>

          {/* Tower 4 (High Ridge) */}
          <g transform="translate(440, 130)">
            <line x1="7" y1="0" x2="2" y2="42" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="15" y1="0" x2="20" y2="42" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="0" y1="10" x2="22" y2="10" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="-3" y1="6" x2="25" y2="6" stroke="#ffffff" strokeWidth="1.8" />
          </g>

          {/* Conductor Cable Lines Strung Between Towers */}
          <path d="M190 168 Q230 180 274 136" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M276 136 Q290 142 312 142" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M316 142 Q375 160 448 138" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: 'photo-2',
      title: 'Transmission Line Conductor Stringing Across Ravine',
      location: 'Challenging Mountain Span • Sukki Kinari 500kV Line',
      elevation: '2,400m Elevation',
      description:
        'Close-up engineering view of conductor bundles suspended under extreme tension across a deep erosion gully. Showing concrete foundation pier pads, access benching, and steel lattice cross-arms.',
      tags: ['Conductor Stringing', 'Foundation Pads', 'Ravine Span', 'Site Engineering'],
      accentColor: '#10b981',
      svgRender: (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="mtnDetail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="60%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="terraceDirt" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="#334155" />
          {/* Mountain contours */}
          <polygon points="0,0 600,0 600,400 0,400" fill="url(#mtnDetail)" />
          {/* Construction Access Road & Benching Terraces */}
          <path d="M120 180 Q240 210 360 230 Q440 280 520 320" stroke="url(#terraceDirt)" strokeWidth="18" fill="none" opacity="0.75" />
          <path d="M180 230 Q300 260 420 300" stroke="url(#terraceDirt)" strokeWidth="12" fill="none" opacity="0.65" />

          {/* Tower 1 (Left foreground) */}
          <g transform="translate(100, 40)">
            <line x1="20" y1="0" x2="0" y2="320" stroke="#f1f5f9" strokeWidth="4" />
            <line x1="40" y1="0" x2="60" y2="320" stroke="#f1f5f9" strokeWidth="4" />
            {/* Cross bracing */}
            <line x1="0" y1="80" x2="60" y2="80" stroke="#f1f5f9" strokeWidth="3" />
            <line x1="0" y1="160" x2="60" y2="160" stroke="#f1f5f9" strokeWidth="3" />
            <line x1="0" y1="240" x2="60" y2="240" stroke="#f1f5f9" strokeWidth="3" />
            <line x1="0" y1="80" x2="60" y2="160" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="60" y1="80" x2="0" y2="160" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="160" x2="60" y2="240" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="60" y1="160" x2="0" y2="240" stroke="#cbd5e1" strokeWidth="2" />
          </g>

          {/* Tower 2 (Right midground across span) */}
          <g transform="translate(420, 160)">
            <line x1="15" y1="0" x2="0" y2="200" stroke="#ffffff" strokeWidth="3" />
            <line x1="30" y1="0" x2="45" y2="200" stroke="#ffffff" strokeWidth="3" />
            <line x1="0" y1="60" x2="45" y2="60" stroke="#ffffff" strokeWidth="2" />
            <line x1="0" y1="120" x2="45" y2="120" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Multiple parallel 500kV Conductor Bundles */}
          <line x1="140" y1="100" x2="440" y2="180" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="140" y1="120" x2="440" y2="200" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="140" y1="140" x2="440" y2="220" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="140" y1="160" x2="440" y2="240" stroke="#e2e8f0" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 'photo-3',
      title: 'Mountain Highway Roadway Vista & Transmission Ridges',
      location: 'Kaghan Highway Section • Project Transport Corridor',
      elevation: '2,150m Elevation',
      description:
        'Field view from project transport vehicle looking out toward the steep alpine road cutting, safety barrier parapets, and high-altitude transmission towers lining the mountain ridges under dramatic cloud cover.',
      tags: ['Transport Corridor', 'Roadway Vista', 'Alpine Clouds', 'Logistics'],
      accentColor: '#f59e0b',
      svgRender: (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="cloudySky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="80%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#cloudySky)" />
          {/* Billowing White Clouds */}
          <ellipse cx="360" cy="120" rx="140" ry="80" fill="#ffffff" fillOpacity="0.85" />
          <ellipse cx="260" cy="160" rx="120" ry="60" fill="#f8fafc" fillOpacity="0.75" />
          {/* Massive Mountain Ridges */}
          <polygon points="0,400 0,180 200,160 400,140 600,240 600,400" fill="#14532d" />
          <polygon points="0,400 120,280 320,240 500,280 600,320 600,400" fill="#166534" />
          {/* Foreground Roadway Parapet Wall */}
          <polygon points="0,400 0,360 300,340 600,360 600,400" fill="#475569" />
          <rect x="280" y="325" width="85" height="35" rx="3" fill="#cbd5e1" stroke="#94a3b8" />
          {/* Distant Transmission Tower on Ridge */}
          <g transform="translate(390, 126)">
            <line x1="4" y1="0" x2="0" y2="24" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="8" y1="0" x2="12" y2="24" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="-2" y1="5" x2="14" y2="5" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        </svg>
      ),
    },
    {
      id: 'photo-4',
      title: 'Cascade of 500kV Suspension Towers Descending Mountain Crest',
      location: 'Steep Mountain Descent • National Heritage Constructors',
      elevation: '2,500m Elevation',
      description:
        'Telephoto perspective showing the succession of high-voltage transmission towers engineered along the rugged alpine ridge, showcasing precision steel lattice assembly and high-altitude slope anchoring.',
      tags: ['Tower Cascade', 'Slope Anchoring', 'High-Altitude Lattice', '500kV Line'],
      accentColor: '#a855f7',
      svgRender: (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="mistSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="darkForest" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#mistSky)" />
          {/* Dark Alpine Ridge Outline */}
          <polygon points="0,400 0,160 160,110 320,80 480,120 600,200 600,400" fill="url(#darkForest)" />
          <polygon points="0,400 60,280 240,200 420,240 600,300 600,400" fill="#1e3a29" opacity="0.9" />

          {/* Tower 1 (High left) */}
          <g transform="translate(120, 130)">
            <line x1="6" y1="0" x2="0" y2="44" stroke="#ffffff" strokeWidth="2.2" />
            <line x1="14" y1="0" x2="20" y2="44" stroke="#ffffff" strokeWidth="2.2" />
            <line x1="-3" y1="8" x2="23" y2="8" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Tower 2 (Mid ridge) */}
          <g transform="translate(260, 190)">
            <line x1="8" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="18" y1="0" x2="26" y2="60" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="-4" y1="12" x2="30" y2="12" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Tower 3 (Descent slope) */}
          <g transform="translate(390, 230)">
            <line x1="10" y1="0" x2="0" y2="75" stroke="#ffffff" strokeWidth="2.8" />
            <line x1="22" y1="0" x2="32" y2="75" stroke="#ffffff" strokeWidth="2.8" />
            <line x1="-5" y1="15" x2="37" y2="15" stroke="#ffffff" strokeWidth="2.2" />
          </g>

          {/* Strung Cable Bundles across all 3 towers */}
          <path d="M130 138 Q195 180 270 202" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.85" />
          <path d="M275 202 Q330 230 405 245" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.85" />
        </svg>
      ),
    },
  ];

  const current = sitePhotos[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sukki Kinari Site Photo Gallery"
      className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#071322] border-2 border-teal-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-slate-800 bg-[#040e1b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Sukki Kinari Hydropower Project (500kV Line) · On-Site Photo Inspection
              </h3>
              <p className="text-[11px] font-mono text-teal-300">
                Official Mountain Site Documentation (site picture.pdf)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Main Image Display */}
        <div className="relative aspect-video max-h-[50vh] bg-black flex items-center justify-center overflow-hidden">
          {current.svgRender}

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sitePhotos.length - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-teal-500 text-white hover:text-slate-950 transition-colors border border-slate-700/80 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev < sitePhotos.length - 1 ? prev + 1 : 0))}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-teal-500 text-white hover:text-slate-950 transition-colors border border-slate-700/80 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Photo Counter Pill */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-xs font-mono text-teal-300">
            Photo {currentIndex + 1} of {sitePhotos.length}
          </div>
        </div>

        {/* Photo Information & Captions */}
        <div className="p-5 sm:p-6 bg-[#061220] space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {current.title}
              </h4>
              <p className="text-xs font-mono text-teal-300 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{current.location}</span>
                <span className="text-slate-500">·</span>
                <span>{current.elevation}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {current.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {current.description}
          </p>

          {/* Thumbnails Row */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto">
            {sitePhotos.map((photo, idx) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  currentIndex === idx
                    ? 'border-teal-400 shadow-md scale-105'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                {photo.svgRender}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="px-6 py-3.5 border-t border-slate-800 bg-[#040e1b] flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-slate-400">
            National Heritage Constructors · Sukki Kinari 500kV High-Voltage Line
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Gallery
          </button>
        </footer>
      </div>
    </div>
  );
};
