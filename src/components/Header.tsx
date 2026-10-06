import React from 'react';
import { FileText, Mail, GraduationCap, Award, Layers, Briefcase, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  name: string;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  name,
  onOpenResume,
  onOpenContact,
}) => {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Zone 1: Prominent Name Wordmark */}
      <a
        href="/"
        className="flex flex-col group shrink-0"
      >
        <span
          className="text-lg sm:text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors uppercase"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {name}
        </span>
        <span className="text-[10px] font-mono text-amber-800 font-semibold tracking-wider uppercase -mt-0.5">
          Civil & Smart Infrastructure Engineer
        </span>
      </a>

      {/* Zone 2: Clean text navigation links with subtle hover underlines */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-stone-600">
        <a href="#featured-civiceco" className="hover:text-amber-900 transition-colors font-semibold text-amber-800 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>CivicEco AI</span>
        </a>
        <a href="#projects" className="hover:text-stone-900 transition-colors">
          Projects
        </a>
        <a href="#experience" className="hover:text-stone-900 transition-colors flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5 text-stone-400" />
          <span>Experience</span>
        </a>
        <a href="#education" className="hover:text-stone-900 transition-colors flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
          <span>Education & Thesis</span>
        </a>
        <a href="#certificates" className="hover:text-stone-900 transition-colors flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-stone-400" />
          <span>Certificates</span>
        </a>
        <a href="#volunteering" className="hover:text-stone-900 transition-colors flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Volunteering</span>
        </a>
      </nav>

      {/* Zone 3: Direct User Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenResume}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-800 hover:text-stone-950 bg-white hover:bg-stone-50 border border-stone-300 flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-xs"
        >
          <FileText className="w-3.5 h-3.5 text-amber-700" />
          <span>Resume</span>
        </button>

        <button
          onClick={onOpenContact}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm ${theme.primaryButton}`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
};
