import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Maximize2,
  CheckCircle2,
  Camera,
  Trash2,
  FileText,
  Eye,
  RotateCw,
} from 'lucide-react';

interface SuitDegreeViewerProps {
  degreePhoto?: string | null;
  onAttachPhoto?: (photoDataUrl: string) => void;
  onRemovePhoto?: () => void;
  onOpenFullModal?: () => void;
  isCompact?: boolean;
}

export const SuitDegreeViewer: React.FC<SuitDegreeViewerProps> = ({
  degreePhoto,
  onAttachPhoto,
  onRemovePhoto,
  onOpenFullModal,
  isCompact = false,
}) => {
  // If a degree photo is uploaded, default to viewing it, otherwise show institutional certificate
  const [activeView, setActiveView] = useState<'photo' | 'replica'>(
    degreePhoto ? 'photo' : 'replica'
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onAttachPhoto(reader.result);
          setActiveView('photo');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-amber-800/30 bg-[#fbf9f5] text-stone-900 shadow-xl transition-all">
      {/* Top Controls & View Mode Selector */}
      <div className="px-4 sm:px-6 py-3 bg-[#f5efe6] border-b border-amber-900/15 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-800" />
          <span className="font-bold text-stone-900 font-serif">
            Sarhad University (SUIT) Degree Document
          </span>
          <span className="text-[11px] font-mono text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            Reg: SUIT-17-01-149-0099
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle when photo exists */}
          {degreePhoto && (
            <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg text-[11px] font-mono">
              <button
                onClick={() => setActiveView('photo')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold flex items-center gap-1 ${
                  activeView === 'photo'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Eye className="w-3 h-3 text-amber-800" />
                <span>Uploaded Photo</span>
              </button>
              <button
                onClick={() => setActiveView('replica')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold flex items-center gap-1 ${
                  activeView === 'replica'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3 h-3 text-amber-800" />
                <span>Transcript Replica</span>
              </button>
            </div>
          )}

          {/* Attach / Replace Degree Photo Button */}
          {onAttachPhoto && (
            <label
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-800 hover:bg-amber-900 text-amber-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Attach photo of your SUIT Degree certificate"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{degreePhoto ? 'Change Photo' : 'Attach Degree Photo'}</span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}

          {degreePhoto && onRemovePhoto && (
            <button
              onClick={onRemovePhoto}
              className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-stone-200 transition-colors"
              title="Remove uploaded photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeView === 'photo' && degreePhoto ? (
        /* Real Uploaded Photo View */
        <div className="p-4 sm:p-6 bg-stone-100/90 flex flex-col items-center justify-center">
          <div className="relative max-w-2xl w-full rounded-xl overflow-hidden border border-stone-300 shadow-lg bg-white">
            <img
              src={degreePhoto}
              alt="Official SUIT Degree Certificate - Syed Zain Musharraf"
              className="w-full h-auto object-contain max-h-[600px] mx-auto"
            />
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-stone-900/80 text-white text-[10px] font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Uploaded Degree Document</span>
            </div>
          </div>
        </div>
      ) : (
        /* Parchment Architectural Certificate Replica */
        <div className="p-4 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#fbf8f2] via-[#f7f2e7] to-[#f2ebd9]">
          {/* Outer Security Border */}
          <div className="border-4 border-double border-amber-900/40 p-4 sm:p-6 rounded-xl relative bg-white/95 shadow-inner">
            {/* Inner fine pattern border */}
            <div className="border border-amber-800/20 p-4 sm:p-6 rounded-lg space-y-4 text-center">
              {/* Top Registration and Degree Numbers */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-stone-700 border-b border-amber-900/15 pb-2.5">
                <span>
                  Registration No:{' '}
                  <strong className="text-stone-900 font-bold">SUIT-17-01-149-0099</strong>
                </span>
                <span>
                  Degree No:{' '}
                  <strong className="text-stone-900 font-bold">040573</strong>
                </span>
              </div>

              {/* University Name Heading in Arched Calligraphic style */}
              <div className="space-y-1">
                <h2
                  className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-stone-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Sarhad University of Science & Information Technology, Peshawar
                </h2>

                {/* SUIT University Crest */}
                <div className="flex justify-center py-1.5">
                  <div className="w-14 h-14 rounded-full border-2 border-amber-800/40 bg-amber-50 p-1 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-[7px] font-mono text-amber-900 font-bold uppercase">
                      Since 2001
                    </span>
                    <Award className="w-5 h-5 text-amber-800" />
                    <span className="text-[7px] font-mono text-stone-900 font-bold">SUIT</span>
                  </div>
                </div>
              </div>

              {/* Certificate Body Text */}
              <div className="space-y-2 py-1 max-w-xl mx-auto">
                <p className="text-xs sm:text-sm text-stone-600 font-serif italic">
                  This is to certify that
                </p>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-950 tracking-wide uppercase drop-shadow-xs"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Syed Zain Musharraf
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 font-serif">
                  son of <strong className="text-amber-950 font-semibold">Musharraf Hussain Shah</strong>
                </p>
                <p className="text-xs text-stone-600 font-serif pt-1">
                  Having passed the requisite examination, is hereby awarded the degree of
                </p>

                {/* Conferred Degree Name */}
                <div className="py-2.5 px-4 rounded-xl bg-amber-50/90 border border-amber-300/80 my-2 shadow-xs">
                  <h4
                    className="text-sm sm:text-lg md:text-xl font-black text-amber-950 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Bachelor of Science in Engineering Technology (Honours) in Civil - 4 Years
                  </h4>
                </div>

                <p className="text-[11px] sm:text-xs text-stone-600 font-serif italic">
                  with all the rights and privileges appertaining thereto.
                </p>
                <p className="text-[11px] sm:text-xs font-mono text-stone-700 pt-1">
                  Given at Peshawar (Pakistan) on the Third Day of March Two Thousand Twenty Two.
                </p>
              </div>

              {/* Official Signatures Strip & University Rosette Seal */}
              <div className="pt-4 border-t border-amber-900/15 grid grid-cols-3 items-end gap-2 text-center text-[10px] sm:text-xs font-mono text-stone-600">
                <div>
                  <div className="h-6 flex items-center justify-center italic text-stone-800 font-serif text-xs">
                    (Signed)
                  </div>
                  <div className="border-t border-stone-400 pt-1 font-semibold text-stone-800">
                    Registrar
                  </div>
                </div>

                <div>
                  <div className="h-6 flex items-center justify-center italic text-stone-800 font-serif text-xs">
                    (Signed)
                  </div>
                  <div className="border-t border-stone-400 pt-1 font-semibold text-stone-800">
                    Vice Chancellor
                  </div>
                </div>

                <div className="relative">
                  {/* Serrated Golden/Bronze University Rosette Seal */}
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-300 shadow-md flex items-center justify-center mb-1">
                    <ShieldCheck className="w-6 h-6 text-amber-100" />
                  </div>
                  <div className="border-t border-stone-400 pt-1 font-semibold text-stone-800">
                    President
                  </div>
                </div>
              </div>

              {/* Legal Status Footer */}
              <p className="text-[9px] font-mono text-stone-500 pt-2 leading-tight">
                Legal Status: Established by Govt. of Khyber Pakhtunkhwa under Ord. No. XXIV/2001 ·
                Recognized by Higher Education Commission (HEC) of Pakistan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info & Full Document Action Bar */}
      <div className="p-3 bg-[#f5efe6] border-t border-amber-900/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-700">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>HEC Pakistan Verified Degree (Honours Civil)</span>
        </div>

        {onOpenFullModal && (
          <button
            onClick={onOpenFullModal}
            className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Open Large View</span>
          </button>
        )}
      </div>
    </div>
  );
};
