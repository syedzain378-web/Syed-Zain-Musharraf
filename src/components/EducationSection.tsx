import React from 'react';
import { Education } from '../types';
import { SuitDegreeViewer } from './SuitDegreeViewer';
import {
  GraduationCap,
  MapPin,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Compass,
} from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
  degreePhoto?: string | null;
  onAttachDegreePhoto?: (photoDataUrl: string) => void;
  onRemoveDegreePhoto?: () => void;
  onOpenThesisModal?: () => void;
  onOpenDegreeModal?: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  degreePhoto,
  onAttachDegreePhoto,
  onRemoveDegreePhoto,
  onOpenThesisModal,
  onOpenDegreeModal,
}) => {
  return (
    <section id="education" className="py-16 sm:py-24 border-t border-stone-200/80 bg-[#faf7f2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
            <GraduationCap className="w-4 h-4 text-amber-800" />
            <span>Academic Qualifications & Research</span>
            <span className="text-stone-400">·</span>
            <span className="text-teal-800">Engineering Technology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Education & Final Year Capstone Research
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-3xl mt-2 font-sans">
            Undergraduate civil engineering technology education with verified degree conferral and published 22-page final year research thesis in computational limit equilibrium slope stability modeling.
          </p>
        </div>

        {/* Education & Research Cards */}
        <div className="space-y-10">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white border-2 border-stone-200/90 rounded-2xl p-6 sm:p-8 md:p-10 transition-all shadow-xl shadow-stone-900/5 space-y-8"
            >
              {/* Degree Title & Institution Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-900">
                    <span className="bg-amber-50 border border-amber-300/80 px-2.5 py-0.5 rounded-full font-semibold">
                      Undergraduate Degree Conferred
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-600 font-mono">Session 2018–2022</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 font-sans tracking-tight">
                    Bachelor of Science in Engineering Technology (Honours) in Civil - 4 Years
                  </h3>

                  <p className="text-base font-semibold text-amber-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Sarhad University of Science & Information Technology (SUIT), Peshawar</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-600 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-500" />
                      <span>Peshawar, Khyber Pakhtunkhwa, Pakistan</span>
                    </span>
                    <span className="text-stone-400">·</span>
                    <span>Registration: <strong className="text-stone-900">SUIT-17-01-149-0099</strong></span>
                    <span className="text-stone-400">·</span>
                    <span>Degree No: <strong className="text-stone-900">040573</strong></span>
                    <span className="text-stone-400">·</span>
                    <span>Awarded: <strong className="text-amber-900">March 3, 2022</strong></span>
                  </div>
                </div>

                {/* Verified Academic Badge */}
                <div className="shrink-0 flex lg:flex-col items-center lg:items-end gap-2 bg-[#fbf9f5] border border-amber-800/20 p-3.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>HEC Pakistan Verified</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">Order No. XXIV/2001</span>
                </div>
              </div>

              {/* Embedded Official Degree Certificate with Attach Photo Option */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-900 font-bold flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-800" />
                    <span>Official University Degree Certificate</span>
                  </h4>
                  <span className="text-[11px] font-mono text-stone-500">
                    Registration No: SUIT-17-01-149-0099
                  </span>
                </div>

                <SuitDegreeViewer
                  degreePhoto={degreePhoto}
                  onAttachPhoto={onAttachDegreePhoto}
                  onRemovePhoto={onRemoveDegreePhoto}
                  onOpenFullModal={onOpenDegreeModal}
                />
              </div>

              {/* Final Year Capstone Project & 22-Page Thesis Showcase Box */}
              {edu.finalYearProject && (
                <div className="pt-2">
                  <div className="bg-[#fbf9f5] border-2 border-stone-200 rounded-xl p-5 sm:p-7 relative overflow-hidden space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-900 uppercase tracking-wider font-bold">
                        <Sparkles className="w-4 h-4 text-amber-800" />
                        <span>B.Sc. Final Year Capstone Research & Defense Publication (22 Pages)</span>
                      </div>

                      {onOpenThesisModal && (
                        <button
                          onClick={onOpenThesisModal}
                          className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-md shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                          <span>Read Complete 22-Page Thesis</span>
                        </button>
                      )}
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-stone-900 font-sans leading-snug">
                      Parametric Stability Analysis and Predictive Computational Modeling of Embankment Slopes in Heavy Infrastructure
                    </h4>

                    <p className="text-xs text-amber-950 font-serif italic">
                      A Technical Investigation Integrating Limit Equilibrium Theory, Empirical Soil Shear Parameters, and Advanced Computational Algorithms for Real-Time Safety Factor Evaluation • Session 2018–2022
                    </p>

                    <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                      Conducted by <strong className="text-stone-950">Syed Zain Musharraf</strong> & <strong className="text-stone-950">Husnain</strong> under the supervision of Engr. Shehryar Khan, Engr. Muhammad Irfan, Engr. Wasal Khan, and Engr. Zia Ud Din. Formulated an advanced non-iterative mathematical regression engine calibrated against 240 slope cases with Bishop's Simplified Method of Slices (R² = 0.938, RMSE = 0.042).
                    </p>

                    {/* Calibrated Formula Highlight */}
                    <div className="p-3.5 rounded-xl bg-white border border-stone-300 text-center font-mono text-xs sm:text-sm text-stone-900 font-semibold overflow-x-auto shadow-inner">
                      F_s = 0.220 + 3.650 (c' / γH) + 1.120 (tanφ' / tanβ) - 0.980 · r_u (tanφ' / tanβ) - 0.045 (H / 10)
                    </div>

                    {/* Technical Pillars Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs">
                      <div className="p-3 bg-white border border-stone-200 rounded-lg">
                        <span className="text-[10px] text-amber-800 uppercase block font-semibold">Calibrated Dataset</span>
                        <span className="text-stone-800 font-medium mt-0.5 block">240 Practical Slope Configurations</span>
                      </div>
                      <div className="p-3 bg-white border border-stone-200 rounded-lg">
                        <span className="text-[10px] text-teal-800 uppercase block font-semibold">Accuracy Metrics</span>
                        <span className="text-stone-800 font-medium mt-0.5 block">R² = 0.938 · MAE = 0.033</span>
                      </div>
                      <div className="p-3 bg-white border border-stone-200 rounded-lg">
                        <span className="text-[10px] text-emerald-800 uppercase block font-semibold">Field Outcome</span>
                        <span className="text-stone-800 font-medium mt-0.5 block">&lt; 2-Minute Safety Verification</span>
                      </div>
                    </div>

                    {/* Supervisory Committee Mentorship Strip */}
                    <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                        <span>
                          Supervisors: Engr. Shehryar Khan (Lecturer) & Engr. Muhammad Irfan (Asst. Prof)
                        </span>
                      </div>
                      <span className="text-amber-900 font-semibold">SUIT Department of Civil Engineering Technology</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
