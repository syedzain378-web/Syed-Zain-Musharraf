import React, { useState } from 'react';
import { Certificate, CertificateTheme, IssuerType } from '../types';
import {
  X,
  Upload,
  Award,
  ShieldCheck,
  CheckCircle2,
  FileImage,
  Sparkles,
} from 'lucide-react';

interface AddCertificateModalProps {
  onAddCertificate: (certificate: Certificate) => void;
  onClose: () => void;
  recipientName: string;
}

export const AddCertificateModal: React.FC<AddCertificateModalProps> = ({
  onAddCertificate,
  onClose,
  recipientName,
}) => {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [issueDate, setIssueDate] = useState('Oct 2024');
  const [expiryDate, setExpiryDate] = useState('Does not expire');
  const [description, setDescription] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [scoreOrGrade, setScoreOrGrade] = useState('Passed with Distinction');
  const [styleTheme, setStyleTheme] = useState<CertificateTheme>('gold_prestige');
  const [issuerType, setIssuerType] = useState<IssuerType>('custom');
  const [customImageBase64, setCustomImageBase64] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomImageBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;

    const skillsArray = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newCert: Certificate = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate: issueDate.trim() || 'Oct 2024',
      expiryDate: expiryDate.trim() || undefined,
      credentialId: credentialId.trim() || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Verified',
      scoreOrGrade: scoreOrGrade.trim() || undefined,
      skillsCovered: skillsArray.length > 0 ? skillsArray : ['Engineering', 'Architecture', 'Verification'],
      description: description.trim() || 'Successfully met all accreditation criteria and technical examinations.',
      issuerType,
      styleTheme,
      customImageUrl: customImageBase64 || undefined,
      recipientName,
    };

    onAddCertificate(newCert);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add Certificate"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-neutral-100">
              Add Industry Certificate to Hub
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close add certificate modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-neutral-300 overflow-y-auto">
          {/* File Upload Area */}
          <div className="p-4 rounded-xl border border-dashed border-neutral-700 bg-neutral-950/50 text-center space-y-2">
            <input
              type="file"
              id="certFile"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="certFile"
              className="cursor-pointer inline-flex flex-col items-center gap-1.5 text-neutral-300 hover:text-amber-300"
            >
              <Upload className="w-6 h-6 text-amber-400" />
              <span className="font-semibold text-xs">
                {imageFileName ? `Selected: ${imageFileName}` : 'Upload Actual Certificate Photo / Scan (Optional)'}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                PNG, JPG, WebP supported · Or leave empty to render vector diploma
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Certificate Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AWS Solutions Architect Professional"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Amazon Web Services / Google / Meta"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. AWS-PSA-88219430"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 font-mono focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Issue Date
              </label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="e.g. Aug 2024"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-neutral-200 mb-1">
              Skills Covered (comma separated)
            </label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              placeholder="e.g. React 19, TypeScript, Cloud Architecture, Security"
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-200 mb-1">
              Description / Competencies
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of what the certificate validates..."
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Diploma Theme Style
              </label>
              <select
                value={styleTheme}
                onChange={(e) => setStyleTheme(e.target.value as CertificateTheme)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              >
                <option value="gold_prestige">Gold Prestige (AWS / Gold Seal)</option>
                <option value="navy_azure">Navy Azure (Google Cloud / Azure)</option>
                <option value="emerald_honor">Emerald Honor (DeepLearning.AI)</option>
                <option value="ruby_executive">Ruby Executive (Harvard)</option>
                <option value="slate_minimal">Slate Minimal (Meta)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-200 mb-1">
                Evaluation / Honors
              </label>
              <input
                type="text"
                value={scoreOrGrade}
                onChange={(e) => setScoreOrGrade(e.target.value)}
                placeholder="e.g. Top 5% Score / Grade: 98%"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-amber-500/60"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Add to Credentials Window</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
