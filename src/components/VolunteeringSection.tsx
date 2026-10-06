import React from 'react';
import { Volunteering } from '../types';
import { Heart, CheckCircle2, Globe2 } from 'lucide-react';

interface VolunteeringSectionProps {
  volunteering: Volunteering[];
}

export const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({
  volunteering,
}) => {
  return (
    <section id="volunteering" className="py-16 sm:py-24 border-t border-stone-200/80 bg-[#faf7f2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
            <Heart className="w-4 h-4 text-rose-600" />
            <span>Community Leadership & Civic Engagement</span>
            <span className="text-stone-300">·</span>
            <span className="text-emerald-800">Social & Environmental Impact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Volunteering & Community Contributions
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mt-2 font-sans">
            Active humanitarian and academic volunteering across UNHCR Afghan Refugee camps, Billion Tree Tsunami Project, and engineering student community development.
          </p>
        </div>

        {/* Volunteering Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteering.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-stone-200/90 hover:border-amber-800/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-sm hover:shadow-md"
            >
              <div>
                {/* Header: Organization & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">
                      {item.role}
                    </h3>
                    <p className="text-xs font-semibold text-amber-900 mt-0.5">
                      {item.organization}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-stone-500 shrink-0">
                    {item.period}
                  </span>
                </div>

                {/* Cause Label */}
                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-stone-600">
                  <Globe2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Cause: {item.cause}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-3 font-sans">
                  {item.description}
                </p>

                {/* Impact bullets */}
                <div className="mt-4 pt-4 border-t border-stone-200 space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                    Key Community Outcomes:
                  </h4>
                  <ul className="space-y-1.5">
                    {item.impactBullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs text-stone-700 flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="text-amber-800 font-bold shrink-0">―</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verified Badge Footer */}
              {item.credentialOrBadge && (
                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-stone-500">
                    Aligned Qualification:
                  </span>
                  <span className="text-xs font-mono text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    {item.credentialOrBadge}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
