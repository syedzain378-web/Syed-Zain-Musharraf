import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES, ThemeId } from '../context/ThemeContext';
import { Palette, Check, Sparkles } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-400/50 flex items-center gap-1.5 text-slate-200 transition-all shadow-xs"
        title="Change Portfolio Color Theme"
      >
        <span
          className="w-3 h-3 rounded-full border border-white/30 shrink-0"
          style={{ backgroundColor: theme.dotColor }}
        />
        <span className="hidden sm:inline text-[11px] font-sans">Colors</span>
        <Palette className="w-3.5 h-3.5 text-sky-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 border border-slate-700/90 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in zoom-in-95 duration-100">
          <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Theme Color Palette</span>
            </span>
            <span className="text-[10px] text-slate-500">5 Styles</span>
          </div>

          <div className="space-y-1 pt-1.5">
            {Object.values(THEMES).map((t) => {
              const isSelected = theme.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setThemeId(t.id as ThemeId);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-slate-800 border border-slate-600/60 font-semibold text-white shadow-xs'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-xs"
                      style={{ backgroundColor: t.dotColor }}
                    />
                    <div>
                      <p className="font-medium leading-tight">{t.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{t.paletteLabel}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
