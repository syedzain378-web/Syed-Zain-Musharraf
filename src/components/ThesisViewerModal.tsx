import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  FileCheck,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
  Sigma,
} from 'lucide-react';

interface ThesisViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThesisViewerModal: React.FC<ThesisViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'cover' | 'approval' | 'abstract' | 'formula' | 'validation' | 'chapters' | 'conclusions'>('cover');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="B.Sc. Thesis Document Viewer"
      className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#071322] border-2 border-teal-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Controls Bar */}
        <header className="px-6 py-4 border-b border-slate-800 bg-[#040e1b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                B.Sc. Capstone Thesis Document · Official 22-Page Research Publication
              </h3>
              <p className="text-[11px] font-mono text-teal-300">
                Sarhad University of Science & Technology (SUIT), Peshawar • Session 2018–2022
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Tab Controls Bar */}
        <div className="px-6 py-2.5 bg-[#05111d] border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('cover')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === 'cover'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Title Page & Authors
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === 'approval'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Approval & Supervisors
          </button>
          <button
            onClick={() => setActiveTab('abstract')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === 'abstract'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Abstract & Core Findings
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === 'formula'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Predictive Mathematical Engine
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === 'validation'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Validation Table (240 Cases)
          </button>
          <button
            onClick={() => setActiveTab('conclusions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === 'conclusions'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Field Guidelines & Benching
          </button>
        </div>

        {/* Thesis Document Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 text-slate-200 font-sans leading-relaxed bg-[#061220]">
          {/* Tab 1: Front Cover / Title Page */}
          {activeTab === 'cover' && (
            <div className="max-w-2xl mx-auto border-2 border-teal-500/30 p-8 sm:p-12 rounded-2xl bg-[#030914] text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-1 border-b border-slate-800 pb-6">
                <h3 className="text-sm font-mono tracking-widest uppercase text-teal-300 font-bold">
                  Sarhad University of Science and Technology
                </h3>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Department of Civil Engineering Technology • Peshawar
                </p>
              </div>

              <div className="py-4 space-y-3">
                <h2
                  className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Parametric Stability Analysis and Predictive Computational Modeling of Embankment Slopes in Heavy Infrastructure
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-serif italic max-w-lg mx-auto leading-relaxed">
                  A Technical Investigation Integrating Limit Equilibrium Theory, Empirical Soil Shear Parameters, and Advanced Computational Algorithms for Real-Time Safety Factor Evaluation
                </p>
              </div>

              {/* Research Conducted & Presented By */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <p className="text-[11px] font-mono uppercase tracking-widest text-teal-400 font-bold">
                  Research Conducted & Presented By:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                    <p className="font-extrabold text-white text-sm">Syed Zain Musharraf</p>
                    <p className="text-xs text-teal-300 font-mono mt-0.5">Reg. B.Sc. Civil Engineering Technology</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">linkedin.com/in/syed-zain-musharraf</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
                    <p className="font-extrabold text-white text-sm">Husnain</p>
                    <p className="text-xs text-teal-300 font-mono mt-0.5">Reg. B.Sc. Civil Engineering Technology</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">linkedin.com/in/husnain-civil-tech</p>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-400 pt-2">
                  Session 2018–2022 • Degree Conferred March 2022
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Approval Certificate & Supervisors */}
          {activeTab === 'approval' && (
            <div className="max-w-2xl mx-auto border border-slate-800 p-8 sm:p-10 rounded-2xl bg-[#030914] space-y-6">
              <div className="text-center space-y-1 border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold font-mono tracking-wider uppercase text-white">
                  Certificate of Approval & Declaration of Authorship
                </h3>
                <p className="text-xs font-mono text-teal-300">
                  Approved by Examination Board for Degree of Bachelor of Science in Civil Engineering Technology
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
                This is to certify that the research thesis entitled <strong className="text-white">"Parametric Stability Analysis and Predictive Computational Modeling of Embankment Slopes in Heavy Infrastructure"</strong> carried out by <strong className="text-teal-200">Syed Zain Musharraf</strong> and <strong className="text-teal-200">Husnain</strong> has been thoroughly evaluated and approved by the examination board.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Supervisory & Evaluation Committee:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Engr. Shehryar Khan</p>
                    <p className="text-[11px] text-teal-300">Project Supervisor / Lecturer</p>
                    <p className="text-[10px] text-slate-500 mt-1">SUIT, Peshawar · Approved</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Engr. Muhammad Irfan</p>
                    <p className="text-[11px] text-teal-300">Co-Supervisor / Assistant Professor</p>
                    <p className="text-[10px] text-slate-500 mt-1">SUIT, Peshawar · Approved</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Engr. Wasal Khan</p>
                    <p className="text-[11px] text-teal-300">Committee Member / Internal Examiner</p>
                    <p className="text-[10px] text-slate-500 mt-1">SUIT, Peshawar · Approved</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-white">Engr. Zia Ud Din</p>
                    <p className="text-[11px] text-teal-300">Head of Department (Civil Technology)</p>
                    <p className="text-[10px] text-slate-500 mt-1">SUIT, Peshawar · Approved</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Declaration of Authorship signed & submitted in full compliance with academic ethics.</span>
              </div>
            </div>
          )}

          {/* Tab 3: Abstract */}
          {activeTab === 'abstract' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-teal-400" />
                  <span>Abstract & Executive Research Summary</span>
                </h3>
                <p className="text-xs font-mono text-teal-300 mt-1">
                  Pages 5–6 of B.Sc. Thesis
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#030914] border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  Assessing the physical stability of natural cuts, structural terraces, and highway embankments represents a fundamental design responsibility within heavy civil construction. Classical Limit Equilibrium Methods (LEM)—most notably <strong>Bishop’s Simplified Method of Slices</strong>—compute the mechanical Factor of Safety (Fs) by balancing gravitational driving forces against mobilized soil shear resistance. However, traditional slice formulations require iterative geometric slicing, trial circle searching, and repetitive convergence loops. When applied to real-time earthwork supervision where face geometry or groundwater elevations change dynamically, these classical iterations become time-prohibitive.
                </p>

                <p>
                  This project establishes an advanced <strong>non-iterative computational framework</strong> capable of predicting the Factor of Safety across diverse cohesive-frictional (c-φ) soil regimes. A calibrated dataset consisting of <strong>240 slope cases</strong> was formulated across varying geometric configurations (heights H = 4m to 25m, face inclinations β = 20° to 55°) and fundamental soil mechanics indicators (effective cohesion c', friction angle φ', soil bulk density γ, and pore water pressure ratio r_u). A high-precision computational regression model was derived from fundamental equilibrium mechanics.
                </p>

                <p>
                  The calibrated mathematical engine demonstrated strong predictive agreement with traditional iterative slice methods, yielding a <strong>Coefficient of Determination (R²) of 0.938</strong> and a <strong>Mean Absolute Error (MAE) of 0.033</strong> (Root Mean Square Error RMSE = 0.042). Parametric sensitivity calculations revealed that slope face angle (β) and internal friction angle (φ') govern over 58% of overall shear mobilization, while pore water saturation (r_u) represents the most volatile failure trigger.
                </p>
              </div>

              {/* Research Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Dataset Size</span>
                  <p className="text-lg font-bold text-white mt-1">240 Cases</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Correlation R²</span>
                  <p className="text-lg font-bold text-teal-300 mt-1">0.938</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Mean Error (MAE)</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">0.033</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Screening Speed</span>
                  <p className="text-lg font-bold text-cyan-300 mt-1">&lt; 2 Minutes</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Predictive Formula */}
          {activeTab === 'formula' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Sigma className="w-5 h-5 text-teal-400" />
                  <span>Formulation of the Predictive Mathematical Engine</span>
                </h3>
                <p className="text-xs font-mono text-teal-300 mt-1">
                  Chapter 3.3 (Page 15) • Fundamental Dimensionless Groupings
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#030914] border-2 border-teal-500/40 space-y-4">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Calibrated Regression Equation for Real-Time Safety Factor (Fs):
                </p>

                {/* Mathematical Formula Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/30 text-center font-mono text-teal-200 text-sm sm:text-lg overflow-x-auto">
                  F_s = 0.220 + 3.650 (c' / γH) + 1.120 (tanφ' / tanβ) - 0.980 · r_u (tanφ' / tanβ) - 0.045 (H / 10)
                </div>

                <div className="text-xs text-slate-300 space-y-2 pt-2 leading-relaxed">
                  <p><strong className="text-white">c' / γH:</strong> Taylor's Dimensionless Cohesion Number representing soil cohesive bonding capacity over overburden.</p>
                  <p><strong className="text-white">tanφ' / tanβ:</strong> Frictional Stability Ratio relating internal friction angle to slope face geometry.</p>
                  <p><strong className="text-white">r_u:</strong> Pore Pressure Ratio representing groundwater hydrostatic destabilization vector.</p>
                  <p><strong className="text-white">H / 10:</strong> Total Slope Height scale correction (heights from 4m to 25m).</p>
                </div>

                <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20 text-xs text-teal-300">
                  This formula allows site technologists to evaluate slope safety in under 2 minutes without drawing slip circles or performing tedious slice tabulations.
                </div>
              </div>

              {/* Parametric Sensitivity Variance Decomposition */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Parametric Sensitivity Decomposition (Chapter 4.4):
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Slope Face Angle (β):</span>
                    <span className="text-teal-300 font-bold">32.5% — Primary geometric driver of shear stress</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Internal Friction Angle (φ'):</span>
                    <span className="text-teal-300 font-bold">26.0% — Primary soil strength resistance parameter</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Pore Pressure Ratio (ru):</span>
                    <span className="text-amber-400 font-bold">19.5% — Most volatile environmental trigger of failure</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Effective Cohesion (c'):</span>
                    <span className="text-cyan-300 font-bold">13.0% — Dominates stability in low-height cuts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Slope Height (H):</span>
                    <span className="text-slate-400 font-bold">6.0% — Direct scalar for overburden mass</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Soil Unit Weight (γ):</span>
                    <span className="text-slate-400 font-bold">3.0% — Least sensitive within compacted ranges</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Validation Table */}
          {activeTab === 'validation' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-400" />
                  <span>Validation: Classical Bishop Slice vs Model Outputs</span>
                </h3>
                <p className="text-xs font-mono text-teal-300 mt-1">
                  Chapter 4.1 (Page 16) • 10 Representative Test Cases
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#030914]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-teal-300 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Case</th>
                      <th className="p-3">H (m)</th>
                      <th className="p-3">β (°)</th>
                      <th className="p-3">γ (kN/m³)</th>
                      <th className="p-3">c' (kPa)</th>
                      <th className="p-3">φ' (°)</th>
                      <th className="p-3">ru</th>
                      <th className="p-3 text-white">Bishop Fs</th>
                      <th className="p-3 text-teal-300">Model Fs</th>
                      <th className="p-3">Abs. Error</th>
                      <th className="p-3 text-emerald-400">% Var.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr><td className="p-2.5 font-bold">1</td><td>6.0</td><td>25</td><td>18.0</td><td>15.0</td><td>30</td><td>0.00</td><td className="font-bold text-white">2.21</td><td className="font-bold text-teal-300">2.18</td><td>0.03</td><td className="text-emerald-400">1.35%</td></tr>
                    <tr><td className="p-2.5 font-bold">2</td><td>8.0</td><td>35</td><td>18.5</td><td>20.0</td><td>28</td><td>0.15</td><td className="font-bold text-white">1.45</td><td className="font-bold text-teal-300">1.42</td><td>0.03</td><td className="text-emerald-400">2.06%</td></tr>
                    <tr><td className="p-2.5 font-bold">3</td><td>10.0</td><td>45</td><td>19.0</td><td>25.0</td><td>32</td><td>0.20</td><td className="font-bold text-white">1.22</td><td className="font-bold text-teal-300">1.26</td><td>0.04</td><td className="text-emerald-400">3.27%</td></tr>
                    <tr><td className="p-2.5 font-bold">4</td><td>12.0</td><td>30</td><td>17.5</td><td>18.0</td><td>26</td><td>0.10</td><td className="font-bold text-white">1.56</td><td className="font-bold text-teal-300">1.53</td><td>0.03</td><td className="text-emerald-400">1.92%</td></tr>
                    <tr><td className="p-2.5 font-bold">5</td><td>15.0</td><td>40</td><td>19.5</td><td>30.0</td><td>25</td><td>0.25</td><td className="font-bold text-white">1.14</td><td className="font-bold text-teal-300">1.11</td><td>0.03</td><td className="text-emerald-400">2.63%</td></tr>
                    <tr><td className="p-2.5 font-bold">6</td><td>8.0</td><td>50</td><td>18.0</td><td>10.0</td><td>35</td><td>0.00</td><td className="font-bold text-white">1.11</td><td className="font-bold text-teal-300">1.15</td><td>0.04</td><td className="text-emerald-400">3.60%</td></tr>
                    <tr><td className="p-2.5 font-bold">7</td><td>14.0</td><td>35</td><td>19.0</td><td>22.0</td><td>30</td><td>0.20</td><td className="font-bold text-white">1.28</td><td className="font-bold text-teal-300">1.25</td><td>0.03</td><td className="text-emerald-400">2.34%</td></tr>
                    <tr><td className="p-2.5 font-bold">8</td><td>18.0</td><td>28</td><td>18.5</td><td>35.0</td><td>27</td><td>0.15</td><td className="font-bold text-white">1.62</td><td className="font-bold text-teal-300">1.58</td><td>0.04</td><td className="text-emerald-400">2.46%</td></tr>
                    <tr><td className="p-2.5 font-bold">9</td><td>20.0</td><td>45</td><td>20.0</td><td>40.0</td><td>33</td><td>0.30</td><td className="font-bold text-white">1.08</td><td className="font-bold text-teal-300">1.05</td><td>0.03</td><td className="text-emerald-400">2.77%</td></tr>
                    <tr><td className="p-2.5 font-bold">10</td><td>5.0</td><td>30</td><td>17.0</td><td>12.0</td><td>32</td><td>0.00</td><td className="font-bold text-white">1.94</td><td className="font-bold text-teal-300">1.91</td><td>0.03</td><td className="text-emerald-400">1.54%</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                Across all 240 slope trials, the model achieved a Coefficient of Determination (R²) of <strong className="text-teal-300">0.938</strong> and an RMSE of <strong className="text-emerald-400">0.042</strong>, confirming its suitability as a rapid screening surrogate for heavy civil earthworks.
              </div>
            </div>
          )}

          {/* Tab 6: Field Conclusions & Benching Profile */}
          {activeTab === 'conclusions' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  <span>Field Conclusions & Practical Benching Directives</span>
                </h3>
                <p className="text-xs font-mono text-teal-300 mt-1">
                  Chapter 6 (Pages 20–21) of B.Sc. Thesis
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#030914] border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-base">Key Field Directives for Civil Technologists:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">1.</span>
                      <span><strong>Mandatory Step-Benching:</strong> For cuts exceeding 6.0 meters in total depth, the excavation must be partitioned into individual benches not exceeding 3.0 to 4.0 meters in vertical height, separated by intermediate horizontal berms at least 1.5 meters wide with longitudinal concrete drains.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">2.</span>
                      <span><strong>Standard Slope Angles:</strong> In medium-plasticity cohesive-frictional soils (CL / SC), permanent cut faces should be maintained at or below 1V:1.5H (33.7°). Short-term temporary cuts must not exceed 1V:1H (45°).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">3.</span>
                      <span><strong>Surface Water Interception:</strong> Catch-water drains must be excavated along the top crest before slope face excavation begins, preventing storm runoff from cascading over exposed faces.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">4.</span>
                      <span><strong>Real-Time Screening:</strong> Site supervisors and civil technologists should use the predictive mathematical formulation to quickly verify stability before placing heavy machinery or staging fill material near the crest of open cuts.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <footer className="px-6 py-3.5 border-t border-slate-800 bg-[#040e1b] flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-slate-400">
            Syed Zain Musharraf & Husnain • SUIT Peshawar (B.Sc. Thesis 2022)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Thesis Viewer
          </button>
        </footer>
      </div>
    </div>
  );
};
