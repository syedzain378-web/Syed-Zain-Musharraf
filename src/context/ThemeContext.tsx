import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'beige' | 'ivory' | 'glacier' | 'blueprint' | 'amber' | 'emerald' | 'royal';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  paletteLabel: string;
  dotColor: string;
  bgGradient: string;
  textAccent: string;
  textSubAccent: string;
  primaryButton: string;
  secondaryButton: string;
  badgeStyle: string;
  borderHover: string;
  glowColor: string;
  heroBgGradient: string;
  isLight?: boolean;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  beige: {
    id: 'beige',
    name: 'Architectural Warm Beige & Ivory',
    paletteLabel: 'Warm Sand, Ivory Linen & Rich Espresso',
    dotColor: '#b45309',
    bgGradient: 'from-[#faf7f2] via-[#f4eee2] to-[#ede4d3]',
    textAccent: 'text-amber-800',
    textSubAccent: 'text-stone-700',
    primaryButton: 'bg-stone-900 hover:bg-stone-800 text-amber-100 font-bold shadow-lg shadow-stone-900/15',
    secondaryButton: 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300 hover:border-amber-700',
    badgeStyle: 'bg-amber-100/90 text-amber-900 border-amber-300/80',
    borderHover: 'hover:border-amber-700/60',
    glowColor: 'rgba(180, 83, 9, 0.08)',
    heroBgGradient: 'bg-gradient-to-r from-stone-950 via-stone-850 to-amber-900',
    isLight: true,
  },
  ivory: {
    id: 'ivory',
    name: 'Gallery Pure White & Linen',
    paletteLabel: 'Pure Architectural White & Warm Linen',
    dotColor: '#78716c',
    bgGradient: 'from-white via-[#faf9f6] to-[#f4f1ec]',
    textAccent: 'text-stone-900',
    textSubAccent: 'text-stone-600',
    primaryButton: 'bg-stone-950 hover:bg-stone-800 text-white font-bold shadow-lg shadow-stone-900/10',
    secondaryButton: 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300',
    badgeStyle: 'bg-stone-100 text-stone-800 border-stone-300',
    borderHover: 'hover:border-stone-400',
    glowColor: 'rgba(120, 113, 108, 0.08)',
    heroBgGradient: 'bg-gradient-to-r from-stone-950 via-stone-900 to-stone-700',
    isLight: true,
  },
  glacier: {
    id: 'glacier',
    name: 'Titanium Ice & Polar Teal',
    paletteLabel: 'Crisp Arctic Cyan & Titanium Steel',
    dotColor: '#2dd4bf',
    bgGradient: 'from-slate-950 via-[#041d24] to-slate-950',
    textAccent: 'text-teal-300',
    textSubAccent: 'text-cyan-200',
    primaryButton: 'bg-gradient-to-r from-teal-300 to-cyan-300 hover:from-teal-200 hover:to-cyan-200 text-slate-950 font-bold shadow-lg shadow-teal-500/25',
    secondaryButton: 'bg-slate-900/90 hover:bg-slate-800 text-teal-200 border-teal-500/30 hover:border-teal-400',
    badgeStyle: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    borderHover: 'hover:border-teal-400/60',
    glowColor: 'rgba(45, 212, 191, 0.18)',
    heroBgGradient: 'bg-gradient-to-r from-white via-teal-100 to-cyan-300',
  },
  blueprint: {
    id: 'blueprint',
    name: 'Electric Sapphire & Azure',
    paletteLabel: 'Luminous Cyan & Deep Sapphire',
    dotColor: '#38bdf8',
    bgGradient: 'from-slate-950 via-[#071329] to-slate-950',
    textAccent: 'text-cyan-400',
    textSubAccent: 'text-sky-200',
    primaryButton: 'bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-bold shadow-lg shadow-sky-500/25',
    secondaryButton: 'bg-slate-900/90 hover:bg-slate-800 text-sky-200 border-sky-500/30 hover:border-cyan-400',
    badgeStyle: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    borderHover: 'hover:border-cyan-400/60',
    glowColor: 'rgba(56, 189, 248, 0.18)',
    heroBgGradient: 'bg-gradient-to-r from-white via-sky-100 to-cyan-300',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Matrix & Gold',
    paletteLabel: 'Forest Jade & Warm Champagne Gold',
    dotColor: '#10b981',
    bgGradient: 'from-zinc-950 via-[#051c14] to-zinc-950',
    textAccent: 'text-emerald-400',
    textSubAccent: 'text-emerald-200',
    primaryButton: 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 font-bold shadow-lg shadow-emerald-500/25',
    secondaryButton: 'bg-zinc-900/90 hover:bg-zinc-800 text-emerald-200 border-emerald-500/30 hover:border-emerald-400',
    badgeStyle: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    borderHover: 'hover:border-emerald-400/60',
    glowColor: 'rgba(16, 185, 129, 0.18)',
    heroBgGradient: 'bg-gradient-to-r from-white via-emerald-100 to-teal-300',
  },
  amber: {
    id: 'amber',
    name: 'Obsidian & Radiant Gold',
    paletteLabel: 'Warm Amber & Industrial Obsidian',
    dotColor: '#f59e0b',
    bgGradient: 'from-neutral-950 via-[#1f1707] to-neutral-950',
    textAccent: 'text-amber-400',
    textSubAccent: 'text-amber-200',
    primaryButton: 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-neutral-950 font-bold shadow-lg shadow-amber-500/25',
    secondaryButton: 'bg-neutral-900/90 hover:bg-neutral-800 text-amber-200 border-amber-500/30 hover:border-amber-400',
    badgeStyle: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    borderHover: 'hover:border-amber-400/60',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    heroBgGradient: 'bg-gradient-to-r from-white via-amber-100 to-amber-300',
  },
  royal: {
    id: 'royal',
    name: 'Cyber Violet & Neon Blue',
    paletteLabel: 'Royal Amethyst & Electric Indigo',
    dotColor: '#a855f7',
    bgGradient: 'from-slate-950 via-[#160d2e] to-slate-950',
    textAccent: 'text-purple-400',
    textSubAccent: 'text-purple-200',
    primaryButton: 'bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300 text-slate-950 font-bold shadow-lg shadow-purple-500/25',
    secondaryButton: 'bg-slate-900/90 hover:bg-slate-800 text-purple-200 border-purple-500/30 hover:border-purple-400',
    badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    borderHover: 'hover:border-purple-400/60',
    glowColor: 'rgba(168, 85, 247, 0.18)',
    heroBgGradient: 'bg-gradient-to-r from-white via-purple-100 to-indigo-300',
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.beige,
  setThemeId: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('szm_theme') as ThemeId;
      // If user had navy blue (blueprint/royal) or old default, switch to beige as requested
      if (saved && saved !== 'blueprint' && saved !== 'royal' && THEMES[saved]) return saved;
    } catch (e) {
      // fallback
    }
    return 'beige'; // Default Architectural Warm Beige & Ivory
  });

  const setThemeId = (id: ThemeId) => {
    if (THEMES[id]) {
      setThemeIdState(id);
      try {
        localStorage.setItem('szm_theme', id);
      } catch (e) {
        // ignore
      }
    }
  };

  const theme = THEMES[themeId] || THEMES.beige;

  return (
    <ThemeContext.Provider value={{ theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
