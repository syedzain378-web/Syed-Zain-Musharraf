import React from 'react';
import { Experience } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Briefcase, MapPin, Camera } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: Experience[];
  onOpenSukkiKinariGallery?: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  onOpenSukkiKinariGallery,
}) => {
  const { theme } = useTheme();

  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-stone-200/80 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
            <Briefcase className="w-4 h-4 text-amber-800" />
            <span>Core Engineering Trajectory</span>
            <span className="text-stone-300">·</span>
            <span className="text-teal-800 font-semibold">3 Authoritative Industry Appointments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Work Experience & Trajectory
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mt-2 font-sans">
            Core civil engineering trajectory across power distribution grids (PESCO), petrochemical smart sensor arrays (Descon Engineering · QAFCO Qatar), and high-voltage mountain transmission lines (National Heritage Constructors · Sukki Kinari Hydropower Project).
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-stone-200 ml-4 sm:ml-6 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Indicator Dot */}
              <div
                className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-2 group-hover:scale-125 transition-transform"
                style={{ borderColor: theme.dotColor }}
              />

              <div className="bg-[#fbf9f5] hover:bg-white border-2 border-stone-200/90 hover:border-amber-800/40 rounded-2xl p-6 sm:p-8 transition-all shadow-sm hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium mt-0.5">
                      <span className="font-semibold text-amber-900">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="text-stone-300">·</span>
                          <span className="text-stone-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {exp.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-stone-700 bg-white px-2.5 py-1 rounded-full border border-stone-200 shrink-0 shadow-2xs font-semibold">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-4 font-sans">
                  {exp.description}
                </p>

                {/* Quantitative Bullet Points */}
                <div className="mt-4 pt-4 border-t border-stone-200 space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                    Key Outcomes & Contributions
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((item, aIdx) => (
                      <li
                        key={aIdx}
                        className="text-xs text-stone-700 flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="font-bold shrink-0 text-amber-800">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Sukki Kinari Site Pictures Button */}
                {exp.id === 'exp-nhc' && onOpenSukkiKinariGallery && (
                  <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono text-teal-900 flex items-center gap-1.5 font-medium">
                      <Camera className="w-3.5 h-3.5 text-teal-700" />
                      <span>Official Field Site Pictures (PDF Available)</span>
                    </span>
                    <button
                      onClick={onOpenSukkiKinariGallery}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-800" />
                      <span>View Sukki Kinari Site Pictures</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
