import React from 'react';
import { PersonalInfo } from '../types';
import { ZainPortrait } from './ZainPortrait';
import { CivicEcoLogo } from './CivicEcoLogo';
import { useTheme } from '../context/ThemeContext';
import {
  Award,
  ShieldCheck,
  ArrowRight,
  Layers,
  GraduationCap,
  Globe,
  ExternalLink,
  Activity,
} from 'lucide-react';

interface HeroProps {
  personal: PersonalInfo;
  onOpenCivicEco?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  personal,
  onOpenCivicEco,
}) => {
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-stone-200/80 bg-[#fbf9f5]/70">
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.glowColor }}
      />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Typographic Narrative & Portrait */}
          <div className="lg:col-span-7 space-y-6">
            {/* Massive Display Recipient Name with Portrait */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-300 text-xs font-mono font-semibold text-stone-800 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Civil Engineer & Smart Infrastructure Specialist</span>
                <span className="text-stone-300">·</span>
                <span className="text-amber-900 font-semibold">PESCO · Descon Qatar · NHC</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                {/* Official Executive Portrait Photo */}
                <div className="shrink-0 flex justify-start relative group">
                  {personal.avatarUrl ? (
                    <img
                      src={personal.avatarUrl}
                      alt={personal.name}
                      className="w-[135px] h-[182px] object-cover rounded-3xl shadow-xl border-2 border-stone-300"
                    />
                  ) : (
                    <ZainPortrait size={135} />
                  )}
                </div>

                <div className="space-y-2">
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase drop-shadow-xs select-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className={`${theme.heroBgGradient} bg-clip-text text-transparent`}>
                      {personal.name}
                    </span>
                  </h1>

                  {/* Sub-headline */}
                  <p className="text-sm sm:text-lg font-semibold font-sans text-stone-700 tracking-tight leading-snug">
                    {personal.headline}
                  </p>
                </div>
              </div>
            </div>

            {/* Zero-Pill Unboxed Text Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-600 pt-1">
              <span className="text-stone-900 font-semibold">PESCO (Sep 2022 – Present)</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>QAFCO Qatar (Descon)</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>National Heritage Constructors (Sukki Kinari)</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-emerald-800 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Verified Civil Credentials
              </span>
            </div>

            {/* Bio text */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans max-w-2xl">
              {personal.bio}
            </p>

            {/* Quantitative Proof Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 pb-2 border-y border-stone-200 font-mono text-xs">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {personal.yearsExperience}
                </span>
                <p className="text-stone-500 text-[11px] mt-0.5">Engineering Trajectory</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {personal.completedProjectsCount}
                </span>
                <p className="text-stone-500 text-[11px] mt-0.5">Infrastructure Works</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tabular-nums text-amber-900 font-extrabold">
                  {personal.satisfactionRate}
                </span>
                <p className="text-stone-500 text-[11px] mt-0.5">QA & Standards Audited</p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#certificates"
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${theme.primaryButton}`}
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Explore Credentials Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#education"
                className="px-5 py-3 rounded-xl text-xs font-semibold text-stone-800 hover:text-stone-950 bg-white hover:bg-stone-50 border border-stone-300 transition-all flex items-center gap-2 shadow-2xs"
              >
                <GraduationCap className="w-4 h-4 text-amber-800" />
                <span>Education & Thesis</span>
              </a>

              <a
                href="#projects"
                className="px-4 py-3 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 bg-transparent hover:bg-stone-200/50 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-stone-500" />
                <span>Case Studies</span>
              </a>
            </div>
          </div>

          {/* Right Column: CivicEco AI Flagship Featured Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border-2 border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm group hover:border-amber-800/40 transition-all">
              {/* Top Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-900 font-bold">
                    Featured Flagship Project
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> v2.0 Live Netlify
                </span>
              </div>

              {/* CivicEco AI Presentation Block */}
              <div className="py-4 space-y-3.5">
                <div className="flex items-start gap-3.5">
                  <div className="shrink-0 p-2 rounded-2xl bg-teal-900 border border-teal-700 shadow-md group-hover:scale-105 transition-transform">
                    <CivicEcoLogo size={52} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                        CivicEco AI
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-300 font-bold">
                        PWA
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-sans mt-0.5 leading-snug">
                      Pakistan Mountain Highway & Geotechnical Infrastructure Platform
                    </p>
                    <p className="text-[11px] font-mono text-amber-900 mt-1 font-semibold">
                      Co-Developed by Syed Zain Musharraf & Husnain
                    </p>
                  </div>
                </div>

                {/* Live Corridor Telemetry Snippet */}
                <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-stone-200 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-stone-600 text-[11px]">
                    <span className="text-teal-800 font-semibold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-teal-700" />
                      Karakoram Highway (KKH N-35)
                    </span>
                    <span className="text-stone-400">Elev. 2,150m</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-stone-500 block">Dasu KP Weather</span>
                      <span className="text-stone-900 font-bold">17.6°C · Mist</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-stone-500 block">Bishop FoS Limit</span>
                      <span className="text-amber-800 font-bold">1.18 [MARGINAL]</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5 text-[10px] text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-800 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>5 Offline AI Field Engines Synced</span>
                    </span>
                    <span className="text-teal-800 font-semibold">Crack AI 0.88mm</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href="https://lustrous-bavarois-80f255.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-amber-100 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-stone-900/15 group/btn"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>Launch Netlify App</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                  {onOpenCivicEco && (
                    <button
                      onClick={onOpenCivicEco}
                      className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-2xs"
                    >
                      <Activity className="w-3.5 h-3.5 text-amber-800" />
                      <span>In-App Telemetry</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
