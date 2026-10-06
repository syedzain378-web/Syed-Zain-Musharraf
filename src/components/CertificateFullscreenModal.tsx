import React, { useState, useEffect, useCallback } from 'react';
import { Certificate } from '../types';
import { CertificateRenderer } from './CertificateRenderer';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Calendar,
  Key,
  Award,
  ExternalLink,
  Sparkles,
  Camera,
} from 'lucide-react';

interface CertificateFullscreenModalProps {
  certificates: Certificate[];
  currentIndex: number;
  recipientName: string;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  onAttachPhoto?: (certId: string, photoDataUrl: string) => void;
}

export const CertificateFullscreenModal: React.FC<CertificateFullscreenModalProps> = ({
  certificates,
  currentIndex,
  recipientName,
  onClose,
  onSelectIndex,
  onAttachPhoto,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState<boolean>(true);

  const currentCert = certificates[currentIndex] || certificates[0];

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % certificates.length);
    setZoomLevel(1);
  }, [currentIndex, certificates.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + certificates.length) % certificates.length);
    setZoomLevel(1);
  }, [currentIndex, certificates.length, onSelectIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Copy credential ID
  const handleCopyId = () => {
    navigator.clipboard.writeText(currentCert.credentialId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Direct print
  const handlePrint = () => {
    window.print();
  };

  if (!currentCert) return null;

  const skillsList = Array.isArray(currentCert.skillsCovered)
    ? currentCert.skillsCovered
    : [currentCert.skillsCovered];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentCert.title} Fullscreen Certificate View`}
      className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col overflow-hidden text-neutral-100 select-none animate-in fade-in duration-200"
    >
      {/* Top Action Bar */}
      <header className="h-16 px-4 sm:px-6 border-b border-neutral-800/80 bg-neutral-900/90 flex items-center justify-between shrink-0 z-30">
        {/* Left: Counter and Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-amber-300 shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {currentIndex + 1} / {certificates.length}
            </span>
          </div>

          <div className="truncate">
            <h3 className="text-sm font-semibold text-neutral-100 truncate">
              {currentCert.title}
            </h3>
            <p className="text-xs text-neutral-400 truncate flex items-center gap-1.5">
              <span>{currentCert.issuer}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                <ShieldCheck className="w-3 h-3" /> Verified Credential
              </span>
            </p>
          </div>
        </div>

        {/* Center: Zoom Controls */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-800/90 border border-neutral-700/60 rounded-lg p-1">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.15))}
            aria-label="Zoom out certificate"
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 rounded transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono px-2 text-neutral-300 w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.15))}
            aria-label="Zoom in certificate"
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 rounded transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            aria-label="Reset certificate zoom"
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 rounded transition-colors text-xs font-mono ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions & Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyId}
            aria-label="Copy Credential ID"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 transition-colors"
          >
            {copiedId ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy ID</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            aria-label="Print Certificate"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-neutral-400" />
            <span>Print</span>
          </button>

          <button
            onClick={() => setShowDetailsDrawer(!showDetailsDrawer)}
            aria-label="Toggle certificate details"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showDetailsDrawer
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            {showDetailsDrawer ? 'Hide Details' : 'View Details'}
          </button>

          <button
            onClick={onClose}
            aria-label="Close fullscreen modal"
            className="p-2 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area: Certificate Viewport + Optional Details Drawer */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Certificate"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-all shadow-xl hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          title="Previous (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Certificate"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-all shadow-xl hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          title="Next (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Certificate Center Viewport */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center">
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full max-w-4xl max-h-[85vh] flex items-center justify-center"
          >
            <CertificateRenderer
              certificate={currentCert}
              recipientName={recipientName}
              isThumbnail={false}
            />
          </div>
        </div>

        {/* Collapsible Details Drawer */}
        {showDetailsDrawer && (
          <aside className="w-80 md:w-96 border-l border-neutral-800 bg-neutral-900/95 overflow-y-auto p-6 flex flex-col justify-between shrink-0 z-20 animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
                  Credential Verification
                </span>
                <h4 className="text-base font-bold text-neutral-100 mt-1 leading-snug">
                  {currentCert.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">{currentCert.issuer}</p>
              </div>

              {/* Status & Validity */}
              <div className="p-3.5 bg-neutral-800/80 rounded-lg border border-neutral-700/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified & Active
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Recipient</span>
                  <span className="text-amber-200 font-semibold font-sans">
                    {currentCert.recipientName || recipientName}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Issue Date</span>
                  <span className="text-neutral-200 font-mono">{currentCert.issueDate}</span>
                </div>

                {currentCert.expiryDate && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Expiration</span>
                    <span className="text-neutral-200 font-mono">{currentCert.expiryDate}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">Credential ID</span>
                  <button
                    onClick={handleCopyId}
                    className="font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 text-[11px]"
                  >
                    <span>{currentCert.credentialId}</span>
                    <Copy className="w-3 h-3 text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* Examination & Curriculum Description */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Syllabus & Competency
                </h5>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {currentCert.description}
                </p>
              </div>

              {/* Skills Validated */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  Verified Skills
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-neutral-300 bg-neutral-800/90 border border-neutral-700/70 px-2 py-1 rounded font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {currentCert.scoreOrGrade && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-xs text-amber-200 font-mono">
                    <span className="font-semibold">Evaluation: </span>
                    {currentCert.scoreOrGrade}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Direct Actions */}
            <div className="pt-6 border-t border-neutral-800 space-y-2 mt-6">
              {onAttachPhoto && (
                <label className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-700/80 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs">
                  <Camera className="w-3.5 h-3.5 text-teal-400" />
                  <span>{currentCert.customImageUrl ? 'Replace Attached Photo' : 'Attach Real Certificate Photo'}</span>
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
                            onAttachPhoto(currentCert.id, reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}

              {currentCert.verificationUrl && (
                <a
                  href={currentCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-blue-200 bg-blue-950/80 hover:bg-blue-900 border border-blue-700/80 flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>Verify at {currentCert.issuer.includes('Coursera') || currentCert.verificationUrl.includes('coursera') ? 'Coursera.org' : 'Official Portal'}</span>
                </a>
              )}

              <button
                onClick={handlePrint}
                className="w-full py-2 px-3 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-neutral-400" />
                <span>Print or Save Credential PDF</span>
              </button>

              <p className="text-[10px] text-center text-neutral-500 font-mono">
                Keyboard: ← Previous · → Next · ESC Close
              </p>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Thumbnails Strip for Quick Switching */}
      <footer className="h-20 bg-neutral-900 border-t border-neutral-800 px-4 flex items-center gap-3 overflow-x-auto shrink-0 z-30">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 shrink-0 hidden sm:inline">
          Switch Certificate:
        </span>
        {certificates.map((cert, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={cert.id}
              onClick={() => {
                onSelectIndex(index);
                setZoomLevel(1);
              }}
              aria-label={`View ${cert.title}`}
              className={`h-14 w-24 sm:w-28 rounded-md p-1 border text-left shrink-0 transition-all flex flex-col justify-between overflow-hidden relative ${
                isActive
                  ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/30'
                  : 'border-neutral-700/70 bg-neutral-800/80 hover:border-neutral-500 hover:bg-neutral-800 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[8px] font-mono text-neutral-400">
                <span className="truncate max-w-[60px]">{cert.issuer}</span>
                {isActive && <span className="text-amber-400 font-bold">●</span>}
              </div>
              <p className="text-[9px] font-semibold text-neutral-200 truncate leading-tight">
                {cert.title}
              </p>
              <span className="text-[8px] font-mono text-neutral-400">
                {cert.issueDate}
              </span>
            </button>
          );
        })}
      </footer>
    </div>
  );
};
