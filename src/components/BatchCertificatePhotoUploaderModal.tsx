import React, { useState, useRef } from 'react';
import { Certificate } from '../types';
import {
  X,
  Upload,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Sparkles,
  ShieldCheck,
  FileImage,
  ExternalLink,
  Info,
} from 'lucide-react';

interface BatchCertificatePhotoUploaderModalProps {
  certificates: Certificate[];
  onAttachPhoto: (certId: string, photoDataUrl: string) => void;
  onRemovePhoto: (certId: string) => void;
  onClose: () => void;
}

export const BatchCertificatePhotoUploaderModal: React.FC<BatchCertificatePhotoUploaderModalProps> = ({
  certificates,
  onAttachPhoto,
  onRemovePhoto,
  onClose,
}) => {
  const [selectedCertId, setSelectedCertId] = useState<string>(certificates[0]?.id || '');
  const [dragActiveId, setDragActiveId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (certId: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onAttachPhoto(certId, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (certId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragActiveId(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(certId, e.dataTransfer.files[0]);
    }
  };

  const attachedCount = certificates.filter((c) => Boolean(c.customImageUrl)).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Upload Real Certificate Photos"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-100 flex items-center gap-2">
                <span>Upload Real Certificate Pictures & Scans</span>
                <span className="text-xs font-mono font-normal text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {attachedCount} of {certificates.length} Photos Attached
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-sans">
                Attach real JPG, PNG, or scanned photos of your credentials from LinkedIn or your device.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Informative Guidance Banner */}
        <div className="bg-amber-500/5 border-b border-amber-500/20 px-6 py-3 flex items-start gap-3 text-xs text-amber-200/90 font-sans">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-300">
              Direct In-Browser Storage: Aapke real photos browser me permanently save ho jayein ge.
            </p>
            <p className="text-amber-200/70 text-[11px]">
              LinkedIn bot security ki waja se server direct photos scrape nahi kar sakta, is liye yahan har certificate ke samne apna real photo attach karein. Jab bhi click ho ga, full-screen me aapka real photo open hoga!
            </p>
          </div>
        </div>

        {/* Certificate List with Photo Uploaders */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 divide-y divide-neutral-800/80">
          {certificates.map((cert, index) => {
            const hasPhoto = Boolean(cert.customImageUrl);

            return (
              <div
                key={cert.id}
                className={`pt-4 first:pt-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-3 rounded-xl transition-colors ${
                  hasPhoto ? 'bg-emerald-950/20 border border-emerald-900/40' : 'hover:bg-neutral-850/50'
                }`}
              >
                {/* Certificate info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-300 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-neutral-100 truncate">
                        {cert.title}
                      </h4>
                      {hasPhoto && (
                        <span className="shrink-0 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Real Photo Attached
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 font-sans mt-0.5">
                      <span className="text-neutral-300 font-medium">{cert.issuer}</span>
                      <span className="mx-1 text-neutral-600">·</span>
                      <span className="font-mono text-neutral-400">{cert.issueDate}</span>
                      <span className="mx-1 text-neutral-600">·</span>
                      <span className="font-mono text-neutral-500">ID: {cert.credentialId}</span>
                    </p>
                  </div>
                </div>

                {/* Photo Preview & Action Buttons */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                  {/* Photo Thumbnail if attached */}
                  {hasPhoto && cert.customImageUrl && (
                    <div className="relative w-16 h-12 rounded border border-neutral-700 overflow-hidden shrink-0 group">
                      <img
                        src={cert.customImageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <FileImage className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Upload button */}
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActiveId(cert.id);
                    }}
                    onDragLeave={() => setDragActiveId(null)}
                    onDrop={(e) => handleDrop(cert.id, e)}
                    className={`cursor-pointer px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                      dragActiveId === cert.id
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                        : hasPhoto
                        ? 'border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-750'
                        : 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{hasPhoto ? 'Replace Photo' : 'Upload Real Photo'}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(cert.id, e.target.files[0]);
                        }
                      }}
                    />
                  </label>

                  {/* Remove Photo button */}
                  {hasPhoto && (
                    <button
                      onClick={() => onRemovePhoto(cert.id)}
                      className="p-2 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remove attached photo and revert to digital diploma design"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between shrink-0">
          <div className="text-xs font-mono text-neutral-400">
            Click on any certificate thumbnail in the portfolio to view in high-resolution full-screen!
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
          >
            Done & View Portfolio
          </button>
        </footer>
      </div>
    </div>
  );
};
