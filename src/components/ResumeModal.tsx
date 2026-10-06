import React from 'react';
import { PortfolioData } from '../types';
import {
  X,
  Printer,
  Mail,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface ResumeModalProps {
  portfolio: PortfolioData;
  onClose: () => void;
  onOpenCertFullscreen: (index: number) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  portfolio,
  onClose,
  onOpenCertFullscreen,
}) => {
  const { personal, certificates, experiences, skillsCategories } = portfolio;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Executive Curriculum Vitae"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Top Controls */}
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              Interactive Executive Resume · Direct View
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume modal"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Resume Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-neutral-950 text-neutral-200 font-sans print:p-0 print:bg-white print:text-black">
          {/* Header Section */}
          <div className="border-b border-neutral-800 pb-6 print:border-black">
            <h1
              className="text-3xl sm:text-5xl font-black text-neutral-100 print:text-black tracking-tight uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {personal.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-amber-300 print:text-slate-800 mt-1">
              {personal.headline}
            </p>

            {/* Contact details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 print:text-slate-600 mt-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personal.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{personal.location}</span>
              </span>
              <span>·</span>
              <span>{personal.linkedinUrl}</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 print:text-slate-700 mt-4 leading-relaxed font-sans">
              {personal.bio}
            </p>
          </div>

          {/* Section: Industry Certifications */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Industry Certifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  onClick={() => {
                    onClose();
                    onOpenCertFullscreen(index);
                  }}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-amber-400/50 cursor-pointer transition-colors print:border-slate-300 print:bg-white"
                >
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-bold text-neutral-200 print:text-black">
                      {cert.title}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 print:text-slate-600">
                    {cert.issuer} · {cert.issueDate}
                  </p>
                  <p className="text-[10px] font-mono text-amber-300/80 mt-1">
                    ID: {cert.credentialId}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Work Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-slate-900 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-lg print:border-none print:p-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-100 print:text-black">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-medium text-amber-300 print:text-slate-800">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 print:text-slate-600">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 print:text-slate-700 mt-2">
                    {exp.description}
                  </p>
                  <ul className="mt-2.5 space-y-1">
                    {exp.achievements.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-neutral-400 print:text-slate-600 flex items-start gap-2"
                      >
                        <span className="text-amber-400 font-bold">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Technical Skills */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Technical Competencies</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg"
                >
                  <h4 className="text-xs font-semibold text-neutral-200 print:text-black mb-2">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono text-neutral-300 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Education */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-slate-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Higher Education</span>
            </h2>

            <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-neutral-100">
                  Bachelor of Science in Civil Engineering Technology
                </h3>
                <span className="text-xs font-mono text-amber-300">
                  Session 2017 – 2021
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-medium mt-1">
                Sarhad University of Science & Technology (SUIT), Peshawar
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 mt-2">
                <span>Registration: <strong>SUIT-17-01-149-0099</strong></span>
                <span>·</span>
                <span>Roll No: <strong>17-FA-12711</strong></span>
              </div>
              <div className="mt-3 p-3 bg-neutral-950 border border-neutral-800 rounded text-xs text-neutral-300 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">
                  Research Thesis & Final Capstone Project:
                </span>
                <p className="font-semibold text-neutral-100">
                  Parametric Stability Analysis and Predictive Computational Modeling of Embankment Slopes in Heavy Infrastructure
                </p>
                <p className="text-[11px] text-neutral-400 italic">
                  Integrating Limit Equilibrium Theory, Empirical Soil Shear Parameters, and Advanced Computational Algorithms for Real-Time Safety Factor Evaluation. Supervised by Engr. Wasal Khan (HOD) & Engr. Shehryar Khan.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Volunteering & Community Engagement */}
          {portfolio.volunteering && portfolio.volunteering.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Volunteering & Community Impact</span>
              </h2>

              <div className="space-y-3">
                {portfolio.volunteering.map((vol) => (
                  <div
                    key={vol.id}
                    className="p-3.5 bg-neutral-900/50 border border-neutral-800 rounded-lg print:border-none print:p-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-xs font-bold text-neutral-100 print:text-black">
                        {vol.role}
                      </h3>
                      <span className="text-[11px] font-mono text-neutral-400 print:text-slate-600">
                        {vol.period}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-amber-300 print:text-slate-700">
                      {vol.organization} · Cause: {vol.cause}
                    </p>
                    <p className="text-xs text-neutral-300 print:text-slate-600 mt-1">
                      {vol.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-neutral-500">
            Direct Access · No External Redirection
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
          >
            Close Resume
          </button>
        </footer>
      </div>
    </div>
  );
};
