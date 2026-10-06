import React from 'react';

interface CivicEcoLogoProps {
  className?: string;
  size?: number;
}

export const CivicEcoLogo: React.FC<CivicEcoLogoProps> = ({
  className = '',
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-xl ${className}`}
    >
      <defs>
        {/* Outer squircle bezel gradient */}
        <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="30%" stopColor="#94a3b8" />
          <stop offset="60%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Inner container dark metallic fill */}
        <linearGradient id="innerBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0b1329" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>

        {/* Golden Sun & Halo */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>

        {/* Lapis Lazuli Mountain (Left) */}
        <linearGradient id="lapisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="40%" stopColor="#2563eb" />
          <stop offset="80%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>

        {/* Malachite Green Mountain (Right) */}
        <linearGradient id="malachiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="80%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        {/* Cable-stayed bridge steel metal */}
        <linearGradient id="bridgeSteel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Green Base plate */}
        <linearGradient id="basePlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#022c22" />
        </linearGradient>
      </defs>

      {/* Outer Metallic Squircle Frame */}
      <rect
        x="10"
        y="10"
        width="180"
        height="180"
        rx="46"
        fill="url(#innerBg)"
        stroke="url(#bezelGrad)"
        strokeWidth="6"
      />
      <rect
        x="16"
        y="16"
        width="168"
        height="168"
        rx="40"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1"
        strokeOpacity="0.3"
      />

      {/* Sun Halo Arc */}
      <circle
        cx="100"
        cy="68"
        r="28"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeDasharray="60 30"
        strokeLinecap="round"
      />
      {/* Golden Sun Sphere */}
      <circle cx="100" cy="68" r="19" fill="url(#sunGlow)" />
      <circle cx="95" cy="63" r="5" fill="#ffffff" fillOpacity="0.4" />

      {/* Lapis Mountain (Left) */}
      <polygon
        points="55,124 100,74 108,124"
        fill="url(#lapisGrad)"
        stroke="#60a5fa"
        strokeWidth="1.5"
      />
      {/* Texture highlight on lapis */}
      <polygon
        points="55,124 88,90 85,124"
        fill="#1e40af"
        fillOpacity="0.6"
      />

      {/* Malachite Mountain (Right) */}
      <polygon
        points="96,124 108,76 148,124"
        fill="url(#malachiteGrad)"
        stroke="#34d399"
        strokeWidth="1.5"
      />
      {/* Malachite banding lines */}
      <path
        d="M102 96 Q116 94 130 110"
        stroke="#6ee7b7"
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.7"
      />
      <path
        d="M100 110 Q118 106 140 120"
        stroke="#a7f3d0"
        strokeWidth="1.5"
        fill="none"
        strokeOpacity="0.5"
      />

      {/* Cable-stayed Highway Bridge Towers */}
      {/* Tower 1 (Left Pier) */}
      <rect x="74" y="98" width="5" height="34" fill="url(#bridgeSteel)" rx="1" />
      {/* Tower 2 (Center Pier) */}
      <rect x="98" y="98" width="5" height="34" fill="url(#bridgeSteel)" rx="1" />
      {/* Tower 3 (Right Pier) */}
      <rect x="122" y="98" width="5" height="34" fill="url(#bridgeSteel)" rx="1" />

      {/* Suspension Cables */}
      <line x1="76" y1="100" x2="52" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="76" y1="104" x2="60" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="76" y1="100" x2="90" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />

      <line x1="100" y1="100" x2="84" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="100" y1="100" x2="116" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />

      <line x1="124" y1="100" x2="110" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="124" y1="100" x2="148" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />
      <line x1="124" y1="104" x2="140" y2="124" stroke="#e2e8f0" strokeWidth="1.2" />

      {/* Bridge Roadway Deck */}
      <rect
        x="44"
        y="120"
        width="112"
        height="6"
        fill="url(#bridgeSteel)"
        rx="1.5"
        stroke="#475569"
        strokeWidth="0.8"
      />

      {/* Substructure Foundation Pillars */}
      <rect x="73" y="126" width="7" height="16" fill="#94a3b8" />
      <rect x="97" y="126" width="7" height="16" fill="#94a3b8" />
      <rect x="121" y="126" width="7" height="16" fill="#94a3b8" />

      {/* Lower Green Base Plate with LED Runways */}
      <rect
        x="36"
        y="142"
        width="128"
        height="24"
        rx="8"
        fill="url(#basePlate)"
        stroke="#10b981"
        strokeWidth="1.5"
      />
      {/* Glowing Green LED dashes */}
      <line x1="48" y1="148" x2="54" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="148" x2="66" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="148" x2="78" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="84" y1="148" x2="90" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="96" y1="148" x2="102" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="108" y1="148" x2="114" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="120" y1="148" x2="126" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="148" x2="138" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="144" y1="148" x2="150" y2="148" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
