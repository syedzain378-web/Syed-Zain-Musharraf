import React, { useState } from 'react';
import { CivicEcoLogo } from './CivicEcoLogo';
import {
  ExternalLink,
  Globe,
  Radio,
  CloudRain,
  Wind,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  Building2,
  ArrowRight,
  Sparkles,
  Activity,
} from 'lucide-react';

interface CivicEcoLiveShowcaseProps {
  onOpenSimulatorModal?: () => void;
}

export const CivicEcoLiveShowcase: React.FC<CivicEcoLiveShowcaseProps> = ({
  onOpenSimulatorModal,
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('kkh');

  const corridorsData: Record<
    string,
    {
      name: string;
      stretch: string;
      temp: string;
      rain: string;
      rainLabel: string;
      wind: string;
      floodIndex: string;
      hazardIndex: string;
      hazardLabel: string;
      status: string;
      statusColor: string;
    }
  > = {
    kkh: {
      name: 'Karakoram Highway (KKH N-35)',
      stretch: 'KM 180 - KM 240 (Besham - Dassu - Kohistan) • Elev. 2150m',
      temp: '17.6°C',
      rain: '0.1 mm/h',
      rainLabel: 'Light Mist',
      wind: '5 km/h (Gusts up to 7 km/h)',
      floodIndex: '18%',
      hazardIndex: '28%',
      hazardLabel: 'Cut-slopes Stable',
      status: 'LOW RISK',
      statusColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
    },
    swat: {
      name: 'Swat Motorway (M-16)',
      stretch: 'Chakdara Tunnel – Mingora Interchange • Elev. 980m',
      temp: '19.2°C',
      rain: '0.0 mm/h',
      rainLabel: 'Clear Atmospheric Conditions',
      wind: '8 km/h',
      floodIndex: '10%',
      hazardIndex: '14%',
      hazardLabel: 'Retaining Structures Verified',
      status: 'OPTIMAL',
      statusColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
    },
    murree: {
      name: 'Murree Expressway (E-75)',
      stretch: 'Barakahu – Lower Topa – Kohala Sector • Elev. 1850m',
      temp: '14.1°C',
      rain: '1.4 mm/h',
      rainLabel: 'Moderate Precipitation',
      wind: '14 km/h',
      floodIndex: '34%',
      hazardIndex: '42%',
      hazardLabel: 'Drainage Culvert Monitoring Active',
      status: 'MODERATE RISK',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-300',
    },
  };

  const current = corridorsData[selectedCorridor] || corridorsData.kkh;

  return (
    <section id="featured-civiceco" className="py-12 sm:py-16 border-b border-stone-200/80 relative overflow-hidden bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Flagship Banner Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-xs font-mono font-semibold text-amber-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>Flagship Featured Project · Live Production Deployment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight flex items-center gap-3">
              <span>CivicEco AI</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-300">
                v2.0 LIVE
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-1.5 font-sans">
              Pakistan Mountain Highway & Geotechnical Infrastructure Intelligence Platform co-developed by <strong className="text-stone-900">Syed Zain Musharraf</strong> & <strong className="text-stone-900">Husnain</strong>.
            </p>
          </div>

          {/* Direct Launch Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://lustrous-bavarois-80f255.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-amber-100 transition-all flex items-center gap-2 shadow-lg shadow-stone-900/15 group"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Launch Live App on Netlify</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {onOpenSimulatorModal && (
              <button
                onClick={onOpenSimulatorModal}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-stone-800 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-300 flex items-center gap-2 transition-colors"
              >
                <Activity className="w-4 h-4 text-amber-800" />
                <span>In-App Telemetry Review</span>
              </button>
            )}
          </div>
        </div>

        {/* Replica of the Live CivicEco AI App Screen */}
        <div className="rounded-2xl border-2 border-stone-200/90 bg-white shadow-xl shadow-stone-900/5 overflow-hidden">
          {/* Mock Browser/App Header Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#fbf9f5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              {/* CivicEco Official 3D Gem Logo */}
              <CivicEcoLogo size={36} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm">CivicEco AI</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-teal-50 text-teal-800 border border-teal-300">
                    v2.0
                  </span>
                </div>
                <div className="text-[11px] font-mono text-stone-600 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Dasu, Khyber Pakhtunkhwa (Live GPS Weather)</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-amber-900 font-bold">{current.temp}</span>
                  <span className="text-stone-400">·</span>
                  <span>{current.rain}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-600 text-xs font-mono">
              <span className="hidden sm:inline text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-300/80 font-medium">
                https://lustrous-bavarois-80f255.netlify.app
              </span>
            </div>
          </div>

          {/* App Body Content matching Screenshot */}
          <div className="p-5 sm:p-7 space-y-5">
            {/* Active Corridor Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#faf7f2] border border-stone-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-amber-800 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                    ACTIVE CORRIDOR
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${current.statusColor}`}>
                    {current.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    onClick={() => setSelectedCorridor('kkh')}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
                      selectedCorridor === 'kkh'
                        ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                        : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
                    }`}
                  >
                    KKH N-35
                  </button>
                  <button
                    onClick={() => setSelectedCorridor('swat')}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
                      selectedCorridor === 'swat'
                        ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                        : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
                    }`}
                  >
                    Swat M-16
                  </button>
                  <button
                    onClick={() => setSelectedCorridor('murree')}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
                      selectedCorridor === 'murree'
                        ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                        : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
                    }`}
                  >
                    Murree E-75
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                  {current.name}
                </h3>
                <p className="text-xs text-stone-600 font-mono mt-0.5">
                  {current.stretch}
                </p>
              </div>

              {/* 4 Telemetry Metric Boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-stone-600 flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-teal-700" />
                    Precipitation
                  </span>
                  <p className="text-base font-bold text-stone-900 mt-1 font-mono">{current.rain}</p>
                  <p className="text-[10px] text-teal-800">{current.rainLabel}</p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-stone-600 flex items-center gap-1">
                    <Wind className="w-3 h-3 text-teal-700" />
                    Wind Speed
                  </span>
                  <p className="text-base font-bold text-stone-900 mt-1 font-mono">{current.wind.split(' ')[0]} km/h</p>
                  <p className="text-[10px] text-stone-500">{current.wind}</p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-stone-600 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-amber-700" />
                    Flash Flood Index
                  </span>
                  <p className="text-base font-bold text-amber-800 mt-1 font-mono">{current.floodIndex}</p>
                  <p className="text-[10px] text-stone-500">Monitored Hydro Runoff</p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-stone-600 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    Landslide Hazard
                  </span>
                  <p className="text-base font-bold text-emerald-800 mt-1 font-mono">{current.hazardIndex}</p>
                  <p className="text-[10px] text-stone-500">{current.hazardLabel}</p>
                </div>
              </div>

              {/* Weather Telemetry Advisory Box (as in screenshot) */}
              <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <span className="text-amber-950 font-semibold">
                      Normal Weather Telemetry: Dasu, Khyber Pakhtunkhwa (Live GPS Weather)
                    </span>
                    <span className="text-stone-600 ml-2 font-mono text-[11px]">
                      موسم معمول کے مطابق ہے
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-900 text-amber-50 font-mono text-[11px] font-bold flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    <span>Voice Alert</span>
                  </button>
                  <button className="px-2.5 py-1 rounded bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-mono text-[11px]">
                    Safety Center
                  </button>
                </div>
              </div>
            </div>

            {/* Construction Feasibility Card (as in screenshot) */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#faf7f2] border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-50 border border-teal-300">
                    <Building2 className="w-5 h-5 text-teal-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      Construction Project Site & Flood Feasibility Analyzer
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                        AI PHOTO AUDIT
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-teal-100 text-teal-900 font-bold border border-teal-300">
                        PUNJAB & SINDH READY
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-sans">
                  Upload a photo of your construction site. The engine performs image analysis to determine if construction is possible, evaluates if water will accumulate or pond, and diagnoses geotechnical soil hazards.
                </p>

                <p className="text-xs text-amber-900 font-mono flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Developer credits (Syed Zain Musharraf & Husnain) are included in every audit photo report.</span>
                </p>
              </div>

              <a
                href="https://lustrous-bavarois-80f255.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-amber-100 font-mono transition-colors flex items-center gap-2 shrink-0 shadow-md"
              >
                <span>Launch Site Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bottom Footer Credits & Netlify Badge */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-600 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">●</span>
                <span>All 5 Core AI Field Modules Online (IndexedDB Offline Synced)</span>
              </div>

              <a
                href="https://lustrous-bavarois-80f255.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:text-amber-950 flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                <span>https://lustrous-bavarois-80f255.netlify.app</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
