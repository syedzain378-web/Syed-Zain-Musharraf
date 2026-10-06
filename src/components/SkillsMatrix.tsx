import React from 'react';
import { SkillCategory } from '../types';
import { Sparkles } from 'lucide-react';

interface SkillsMatrixProps {
  categories: SkillCategory[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ categories }) => {
  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-stone-200/80 bg-[#faf7f2]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Technical Capabilities</span>
            <span className="text-stone-300">·</span>
            <span>Accredited Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Engineering Competencies
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mt-2 font-sans">
            Technical proficiencies validated through rigorous industry examinations, hands-on production deployments, and distributed smart systems architecture.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                <h3 className="text-base font-bold text-stone-900">
                  {cat.category}
                </h3>
                <span className="text-xs font-mono text-stone-500">
                  {cat.skills.length} Core Domains
                </span>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone-800 font-medium">{skill.name}</span>
                      <span className="text-amber-900 font-bold tabular-nums">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Clean Progress Meter */}
                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div
                        className="h-full bg-gradient-to-r from-amber-700 to-amber-600 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
