import React, { useState } from 'react';
import { PortfolioData } from '../types';
import {
  X,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  FileText,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { defaultPortfolio } from '../data/defaultPortfolio';

interface LinkedInSyncModalProps {
  currentUrl: string;
  onApplyPortfolio: (data: PortfolioData) => void;
  onClose: () => void;
}

export const LinkedInSyncModal: React.FC<LinkedInSyncModalProps> = ({
  currentUrl,
  onApplyPortfolio,
  onClose,
}) => {
  const [linkedinUrl, setLinkedinUrl] = useState<string>(
    currentUrl || 'https://www.linkedin.com/in/syed-zain-musharraf-99a57720b/'
  );
  const [profileText, setProfileText] = useState<string>(
    'Syed Zain Musharraf - B.Sc. Civil Engineering Technology graduate from Sarhad University of Science & Technology (SUIT), Peshawar (Session 2017–2021, Reg: SUIT-17-01-149-0099, Roll: 17-FA-12711). Capstone: Parametric Stability Analysis and Predictive Computational Modeling of Embankment Slopes in Heavy Infrastructure. Accredited in Google Cloud Generative AI Specialization, Elements of AI (University of Helsinki - 2 ECTS), UC Santa Cruz AI Tools for Workplace, L&T EduTech Site Investigation, Johns Hopkins Leadership, and UNITAR SDG 6 Clean Water & Sanitation.'
  );
  const [targetRole, setTargetRole] = useState<string>('Civil Engineering Technologist & Computational Modeling Specialist');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setStatusMessage('Analyzing LinkedIn profile and credentials...');

    try {
      const response = await fetch('/api/generate-from-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedinUrl,
          profileText,
          targetRole,
        }),
      });

      setStatusMessage('Structuring verified certificates and interactive project demos...');

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Server error generating portfolio');
      }

      setStatusMessage('Finalizing portfolio schema...');
      // Merge with recipient name
      const generated = result.data as PortfolioData;
      if (generated.personal && !generated.personal.name) {
        generated.personal.name = 'Syed Zain Musharraf';
      }
      onApplyPortfolio(generated);
      onClose();
    } catch (err: any) {
      console.warn('AI generation fell back:', err);
      setErrorMessage(
        err.message || 'Generation failed. You can load our calibrated Syed Zain Musharraf master profile below.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadCalibrated = () => {
    onApplyPortfolio(defaultPortfolio);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="LinkedIn Portfolio AI Generator"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-semibold text-neutral-100">
              LinkedIn Instant Portfolio Generator
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close sync modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <form onSubmit={handleGenerate} className="p-6 space-y-5 text-xs text-neutral-300">
          <div>
            <label className="block font-medium text-neutral-200 mb-1.5">
              LinkedIn Profile Link
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 font-mono text-xs focus:outline-none focus:border-amber-500/60 transition-colors"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Active profile URL: <span className="text-amber-300/80 font-mono">syed-zain-musharraf-99a57720b</span>
            </p>
          </div>

          <div>
            <label className="block font-medium text-neutral-200 mb-1.5">
              Target Role & Focus
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer & Cloud AI Architect"
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 text-xs focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-200 mb-1.5 flex items-center justify-between">
              <span>Bio, Experience Notes, or Resume Snippet (Optional)</span>
              <span className="text-neutral-500 text-[10px] font-mono">Helps AI customize</span>
            </label>
            <textarea
              rows={4}
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              placeholder="Paste any extra details from your LinkedIn profile, certifications, or projects here..."
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 text-xs focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>

          {/* Status / Error display */}
          {isLoading && (
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              <span className="text-amber-200 font-mono text-[11px]">
                {statusMessage}
              </span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-red-300 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={handleLoadCalibrated}
                className="text-xs text-amber-400 underline hover:text-amber-300"
              >
                Click to load calibrated Syed Zain Musharraf profile instantly
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleLoadCalibrated}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors flex items-center justify-center gap-1.5 text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Load Syed Zain Musharraf Master Profile</span>
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 text-xs shadow-md disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Generating with AI...' : 'Generate Portfolio with AI'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
