import React from 'react';

interface ZainPortraitProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

export const ZainPortrait: React.FC<ZainPortraitProps> = ({
  className = '',
  size = 320,
}) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center ${className}`}
      style={{ width: size, height: Math.round(size * 1.35) }}
    >
      <svg
        viewBox="0 0 320 432"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          {/* Studio backdrop glow */}
          <radialGradient id="studioGlow" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#0f2027" />
            <stop offset="50%" stopColor="#081418" />
            <stop offset="100%" stopColor="#02080a" />
          </radialGradient>

          {/* Navy Blue Suit Fabric Gradient */}
          <linearGradient id="suitJacket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#253552" />
            <stop offset="40%" stopColor="#1a273e" />
            <stop offset="100%" stopColor="#0f1828" />
          </linearGradient>

          {/* Suit Lapel Shadow Gradient */}
          <linearGradient id="lapelShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#162237" />
            <stop offset="100%" stopColor="#2c3e60" />
          </linearGradient>

          {/* Burgundy Tie Texture */}
          <linearGradient id="burgundyTie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#83182b" />
            <stop offset="50%" stopColor="#670d1e" />
            <stop offset="100%" stopColor="#4c0815" />
          </linearGradient>

          {/* Sky-Blue Dress Shirt */}
          <linearGradient id="dressShirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          {/* Realistic Skin Gradient */}
          <radialGradient id="faceSkin" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#fae0d0" />
            <stop offset="60%" stopColor="#f3cbb4" />
            <stop offset="90%" stopColor="#e2ae92" />
            <stop offset="100%" stopColor="#ce9676" />
          </radialGradient>

          {/* Hair & Beard Dark Brown */}
          <linearGradient id="darkHair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c1a11" />
            <stop offset="50%" stopColor="#1e120b" />
            <stop offset="100%" stopColor="#140b07" />
          </linearGradient>

          {/* Pocket Square Silk */}
          <linearGradient id="pocketSquare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991b2e" />
            <stop offset="50%" stopColor="#600f1d" />
            <stop offset="100%" stopColor="#3d0711" />
          </linearGradient>
        </defs>

        {/* Ambient Studio Background */}
        <rect width="320" height="432" fill="url(#studioGlow)" />

        {/* Subtle luminous halo behind head */}
        <circle cx="160" cy="150" r="100" fill="#2dd4bf" fillOpacity="0.08" filter="blur(25px)" />

        {/* Navy Suit Body & Shoulders */}
        <path
          d="M30 432 L75 290 L160 324 L245 290 L290 432 Z"
          fill="url(#suitJacket)"
        />
        {/* Left shoulder seam */}
        <path d="M75 290 L40 432" stroke="#121b2a" strokeWidth="2" />
        {/* Right shoulder seam */}
        <path d="M245 290 L280 432" stroke="#121b2a" strokeWidth="2" />

        {/* Breast Pocket on right chest (viewer's right, wearer's left) */}
        <rect x="208" y="340" width="46" height="4" rx="1.5" fill="#141f33" stroke="#253552" strokeWidth="1" />
        {/* Burgundy Paisley Pocket Square Peeking Out */}
        <polygon points="216,340 226,322 234,340" fill="url(#pocketSquare)" />
        <polygon points="228,340 238,325 246,340" fill="url(#pocketSquare)" />
        <polygon points="222,340 232,328 240,340" fill="#7f1d1d" opacity="0.8" />

        {/* Sky-Blue Dress Shirt Collar */}
        <path
          d="M130 262 L160 300 L190 262 L198 266 L160 318 L122 266 Z"
          fill="url(#dressShirt)"
        />
        {/* Left Shirt Collar Wing */}
        <polygon points="124,264 152,304 140,305 120,270" fill="#ffffff" />
        {/* Right Shirt Collar Wing */}
        <polygon points="196,264 168,304 180,305 200,270" fill="#ffffff" />

        {/* Burgundy Textured Necktie */}
        <polygon points="152,298 168,298 174,432 146,432" fill="url(#burgundyTie)" />
        {/* Tie Knot */}
        <polygon points="151,292 169,292 165,308 155,308" fill="#701221" />
        {/* Sleek Silver Tie Bar Clip */}
        <rect x="150" y="348" width="22" height="3" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5" />

        {/* Suit Left & Right Lapels */}
        {/* Left Lapel (wearer's right) */}
        <path
          d="M85 290 L136 348 L148 432 L110 432 L70 320 Z"
          fill="url(#lapelShadow)"
        />
        {/* Right Lapel (wearer's left) */}
        <path
          d="M235 290 L184 348 L172 432 L210 432 L250 320 Z"
          fill="url(#lapelShadow)"
        />

        {/* Neck */}
        <rect x="138" y="222" width="44" height="52" rx="6" fill="#ce9676" />
        <path d="M140 230 C150 255 170 255 180 230" stroke="#b67a58" strokeWidth="2" fill="none" opacity="0.4" />

        {/* Head & Face Structure */}
        <ellipse cx="160" cy="180" rx="55" ry="68" fill="url(#faceSkin)" />

        {/* Ear Left */}
        <ellipse cx="104" cy="182" rx="7.5" ry="14" fill="#deb094" />
        {/* Ear Right */}
        <ellipse cx="216" cy="182" rx="7.5" ry="14" fill="#deb094" />

        {/* Hair - Dark brown textured pompadour with neat taper */}
        <path
          d="M106 166 C104 100 216 100 214 166 C206 122 114 122 106 166 Z"
          fill="url(#darkHair)"
        />
        <path
          d="M110 145 C125 106 195 104 210 145 C190 120 130 120 110 145 Z"
          fill="#3d261a"
        />

        {/* Groomed Full Beard & Mustache */}
        <path
          d="M114 178 C114 246 206 246 206 178 C194 234 126 234 114 178 Z"
          fill="url(#darkHair)"
          fillOpacity="0.94"
        />
        {/* Mustache */}
        <path
          d="M136 200 C150 193 170 193 184 200 C176 210 144 210 136 200 Z"
          fill="url(#darkHair)"
        />

        {/* Eyebrows */}
        <path d="M125 158 Q140 152 150 157" stroke="#1f140e" strokeWidth="4" strokeLinecap="round" />
        <path d="M170 157 Q180 152 195 158" stroke="#1f140e" strokeWidth="4" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="138" cy="170" rx="6.5" ry="4" fill="#ffffff" />
        <circle cx="138.5" cy="170" r="3.2" fill="#291810" />
        <circle cx="137.5" cy="169" r="1.1" fill="#ffffff" />

        <ellipse cx="182" cy="170" rx="6.5" ry="4" fill="#ffffff" />
        <circle cx="181.5" cy="170" r="3.2" fill="#291810" />
        <circle cx="180.5" cy="169" r="1.1" fill="#ffffff" />

        {/* Nose Bridge and Tip */}
        <path d="M160 162 L163 188 L156 189" stroke="#b47856" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Lips */}
        <path d="M148 214 Q160 217 172 214" stroke="#9f4d43" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Premium Border Overlay */}
        <rect
          x="4"
          y="4"
          width="312"
          height="424"
          rx="24"
          stroke="#2dd4bf"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
        />
      </svg>

      {/* Verified Civil Engineer Badge Overlay */}
      <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-teal-500/30 rounded-xl px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-teal-300 font-semibold">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Syed Zain Musharraf</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">PESCO · Descon</span>
      </div>
    </div>
  );
};
