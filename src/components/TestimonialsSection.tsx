import React from 'react';
import { Recommendation } from '../types';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  recommendations: Recommendation[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  recommendations,
}) => {
  return (
    <section id="recommendations" className="py-16 sm:py-24 border-t border-stone-200/80 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 mb-2 font-semibold">
            <Quote className="w-4 h-4 text-amber-800" />
            <span>Executive Endorsements</span>
            <span className="text-stone-300">·</span>
            <span>LinkedIn Verified References</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            Peer & Leadership Feedback
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mt-2 font-sans">
            Attributable testimonials from engineering leaders and directors evaluating architectural depth, technical execution, and collaborative impact.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#fbf9f5] border-2 border-stone-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-800/30 mb-4" />
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-200 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${
                    item.avatarColor || 'from-amber-700 to-amber-900'
                  } flex items-center justify-center font-bold text-amber-50 text-xs shrink-0 font-mono shadow-xs`}
                >
                  {item.authorName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>

                <div className="truncate">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {item.authorName}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate font-sans">
                    {item.authorTitle}
                  </p>
                  <p className="text-[10px] text-amber-900 font-mono">
                    {item.relationship}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
