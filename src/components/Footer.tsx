import React from 'react';
import { Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  onOpenResume,
  onOpenContact,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 bg-[#fbf9f5] py-12 px-4 sm:px-8 text-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a
            href="/"
            className="text-base font-extrabold text-stone-900 hover:text-amber-800 transition-colors uppercase"
          >
            {name}
          </a>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            Civil & Smart Infrastructure Engineer · PESCO · Descon Qatar · NHC
          </p>
        </div>

        {/* Clean Text Navigation Links & Actions */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600">
          <a href="#featured-civiceco" className="hover:text-amber-900 transition-colors text-amber-800 font-semibold">
            CivicEco AI
          </a>
          <a href="#projects" className="hover:text-stone-900 transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-stone-900 transition-colors">
            Experience
          </a>
          <a href="#education" className="hover:text-stone-900 transition-colors">
            Education
          </a>
          <a href="#certificates" className="hover:text-stone-900 transition-colors">
            Certificates
          </a>
          <a href="#volunteering" className="hover:text-stone-900 transition-colors">
            Volunteering
          </a>
          <button
            onClick={onOpenResume}
            className="hover:text-stone-900 transition-colors"
          >
            Executive Resume
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-stone-900 transition-colors"
          >
            Direct Inquiry
          </button>
          <a
            href="https://www.linkedin.com/in/syed-zain-musharraf-99a57720b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-900 transition-colors flex items-center gap-1 text-amber-800 font-medium"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
          <span>© 2026 {name}</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="p-2 rounded-lg bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition-colors border border-stone-300 shadow-2xs"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
