import React from 'react';
import { Certificate } from '../types';
import { ShieldCheck, CheckCircle2, Award, ExternalLink } from 'lucide-react';

interface CertificateRendererProps {
  certificate: Certificate;
  recipientName: string;
  isThumbnail?: boolean;
}

export const CertificateRenderer: React.FC<CertificateRendererProps> = ({
  certificate,
  recipientName,
  isThumbnail = false,
}) => {
  const effectiveRecipient = certificate.recipientName || recipientName;

  // Render user's uploaded real certificate image if available
  if (certificate.customImageUrl) {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-700 shadow-md flex items-center justify-center group-hover:border-amber-400 transition-all">
          <img
            src={certificate.customImageUrl}
            alt={certificate.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-neutral-950/85 backdrop-blur-xs px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 flex items-center gap-1 border border-neutral-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Attached Photo</span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-neutral-950 rounded-xl overflow-hidden border-2 border-neutral-700 shadow-2xl flex items-center justify-center p-2">
        <img
          src={certificate.customImageUrl}
          alt={certificate.title}
          className="w-full h-full object-contain max-h-[82vh] rounded"
        />
        <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700 text-xs font-mono text-neutral-200 flex items-center gap-1.5 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Real Certificate Photo</span>
        </div>
      </div>
    );
  }

  // 0A. Billion Tree Tsunami Project Volunteering Certificate Layout
  if (certificate.id === 'bttp-certificate') {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-white text-neutral-900 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-emerald-600/40 shadow-md">
          <div className="relative z-10 flex items-center justify-between border-b border-emerald-100 pb-1 text-[9px] font-mono text-emerald-800">
            <span className="font-bold">Govt of Pakistan</span>
            <span className="text-emerald-600">Billion Tree Tsunami</span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <span className="text-[8px] uppercase tracking-widest text-emerald-700 font-bold block">
              CERTIFICATE FOR VOLUNTEERING SERVICE
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {effectiveRecipient}
            </h4>
            <div className="w-12 h-0.5 bg-emerald-500/50 mx-auto my-1" />
            <p className="text-[9px] text-neutral-600 line-clamp-2">
              Billion Tree Tsunami Afforestation Project
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-500 font-mono border-t border-neutral-200 pt-1">
            <span>No: {certificate.credentialId}</span>
            <span>2018–2020</span>
          </div>
        </div>
      );
    }

    // Fullscreen BTTP Certificate
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white text-neutral-900 rounded-xl p-8 sm:p-12 md:p-14 flex flex-col justify-between overflow-hidden border-4 border-emerald-600/50 shadow-2xl">
        <div className="absolute inset-3 border-2 border-emerald-600/30 rounded pointer-events-none" />
        <div className="absolute inset-4 border border-emerald-600/15 rounded pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 border border-emerald-600 flex items-center justify-center p-1 shadow-sm text-emerald-700">
            <Award className="w-7 h-7 text-emerald-700" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-emerald-900 tracking-wider uppercase font-sans">
            MINISTRY OF CLIMATE CHANGE · GOVERNMENT OF PAKISTAN
          </h2>
          <h3 className="text-lg sm:text-2xl font-black text-neutral-900 uppercase tracking-widest pt-2" style={{ fontFamily: "'Cinzel', serif" }}>
            CERTIFICATE FOR VOLUNTEERING SERVICE
          </h3>
          <p className="text-xs font-mono text-neutral-500">
            Certificate Number: <span className="font-bold text-emerald-800">{certificate.credentialId}</span>
          </p>
        </div>

        {/* Recipient */}
        <div className="relative z-10 text-center my-4 space-y-1">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">This certificate is proudly awarded to</p>
          <h4 className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-950 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            {effectiveRecipient}
          </h4>
          <div className="w-36 h-0.5 bg-emerald-600/50 mx-auto my-2" />
          <p className="text-xs sm:text-sm text-neutral-700 max-w-xl mx-auto font-sans leading-relaxed">
            in recognition of valuable community volunteering services and active participation in the <span className="font-semibold text-emerald-900">Billion Tree Tsunami Afforestation Project</span>, contributing to environmental restoration and climate resilience in Pakistan.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 grid grid-cols-2 items-end pt-4 border-t border-neutral-200">
          <div className="text-left space-y-0.5">
            <div className="text-xl text-neutral-800 font-serif italic" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Project Director
            </div>
            <div className="w-36 h-px bg-neutral-400" />
            <p className="text-xs font-bold text-neutral-900">Project Directorate</p>
            <p className="text-[10px] text-neutral-600">Billion Tree Tsunami Project, Govt of Pakistan</p>
          </div>
          <div className="text-right text-xs font-mono text-neutral-500">
            <p>Session: 2018 – 2020</p>
            <p className="text-emerald-700 font-bold">Verified National Service</p>
          </div>
        </div>
      </div>
    );
  }

  // 0B. UNHCR Volunteer Teacher Credential Layout
  if (certificate.id === 'unhcr-teaching-certificate') {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-white text-neutral-900 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-blue-600/40 shadow-md">
          <div className="relative z-10 flex items-center justify-between border-b border-blue-100 pb-1 text-[9px] font-mono text-blue-800">
            <span className="font-bold">UNHCR</span>
            <span className="text-blue-600">UN Refugee Agency</span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <span className="text-[8px] uppercase tracking-widest text-blue-800 font-bold block">
              VOLUNTEER TEACHER SERVICE
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {effectiveRecipient}
            </h4>
            <div className="w-12 h-0.5 bg-blue-500/50 mx-auto my-1" />
            <p className="text-[9px] text-neutral-600 line-clamp-2">
              Afghan Primary School PSC 0336 · Barairy Camp
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-500 font-mono border-t border-neutral-200 pt-1">
            <span>Sep 2014 – Jul 2017</span>
            <span>Mansehra</span>
          </div>
        </div>
      );
    }

    // Fullscreen UNHCR Credential
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white text-neutral-900 rounded-xl p-8 sm:p-12 md:p-14 flex flex-col justify-between overflow-hidden border-4 border-blue-600/50 shadow-2xl">
        <div className="absolute inset-3 border-2 border-blue-600/30 rounded pointer-events-none" />
        <div className="absolute inset-4 border border-blue-600/15 rounded pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 text-center space-y-1">
          <div className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              UN
            </div>
            <div className="text-left leading-tight">
              <span className="text-xl sm:text-2xl font-black text-blue-900">UNHCR</span>
              <p className="text-[10px] text-neutral-600">The UN Refugee Agency · Education Support</p>
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-neutral-900 uppercase tracking-widest pt-3" style={{ fontFamily: "'Cinzel', serif" }}>
            VOLUNTEER TEACHER SERVICE RECORD
          </h3>
          <p className="text-xs font-mono text-neutral-500">
            Afghan Primary School PSC 0336 · Barairy Refugee Camp, Mansehra
          </p>
        </div>

        {/* Recipient */}
        <div className="relative z-10 text-center my-4 space-y-1">
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Presented to Community Volunteer</p>
          <h4 className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-950 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            {effectiveRecipient}
          </h4>
          <div className="w-36 h-0.5 bg-blue-600/50 mx-auto my-2" />
          <p className="text-xs sm:text-sm text-neutral-700 max-w-xl mx-auto font-sans leading-relaxed">
            for dedicated educational service facilitating classroom learning, numeracy, and foundational curriculum delivery for students in 3rd, 4th, and 5th grades from <span className="font-semibold text-neutral-900">September 2014 to July 2017</span> (2 Years 11 Months).
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 grid grid-cols-2 items-end pt-4 border-t border-neutral-200">
          <div className="text-left space-y-0.5">
            <div className="text-xl text-neutral-800 font-serif italic" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Education Coordinator
            </div>
            <div className="w-36 h-px bg-neutral-400" />
            <p className="text-xs font-bold text-neutral-900">School Administration</p>
            <p className="text-[10px] text-neutral-600">Afghan Primary School PSC 0336, Barairy Camp</p>
          </div>
          <div className="text-right text-xs font-mono text-neutral-500">
            <p>Duration: Sep 2014 – Jul 2017</p>
            <p className="text-blue-700 font-bold">UNHCR Supported Field Station</p>
          </div>
        </div>
      </div>
    );
  }

  // 1. UNITAR (United Nations) Certificate Layout
  if (certificate.layoutVariant === 'unitar_cert') {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-white text-neutral-900 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-amber-500/30 shadow-md">
          {/* Subtle Laurel wreath SVG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-amber-600 fill-current">
              <path d="M100 20 C60 50, 40 100, 50 150 C60 180, 80 190, 100 190 C120 190, 140 180, 150 150 C160 100, 140 50, 100 20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="relative z-10 flex items-center justify-between border-b border-amber-200/60 pb-1">
            <span className="text-[10px] font-bold tracking-wider text-cyan-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-600" />
              UNITAR · United Nations
            </span>
            <span className="text-[9px] font-mono text-emerald-600 font-semibold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
            </span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest">
              CERTIFICATE OF COMPLETION
            </p>
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {effectiveRecipient}
            </h4>
            <div className="w-12 h-0.5 bg-amber-500/40 mx-auto my-1" />
            <p className="text-[10px] font-semibold text-neutral-800 line-clamp-2">
              {certificate.title}
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[9px] text-neutral-500 font-mono border-t border-neutral-200 pt-1">
            <span>{certificate.credentialId}</span>
            <span>{certificate.issueDate}</span>
          </div>
        </div>
      );
    }

    // Fullscreen UNITAR
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white text-neutral-900 rounded-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between overflow-hidden border-4 border-[#eab308]/40 shadow-2xl">
        {/* Ornate Gold Double Border */}
        <div className="absolute inset-3 sm:inset-4 border-2 border-[#eab308]/30 rounded-lg pointer-events-none" />

        {/* Laurel Wreath Graphic Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none p-8">
          <svg viewBox="0 0 400 400" className="w-full h-full text-amber-600 stroke-current" fill="none" strokeWidth="1.5">
            <ellipse cx="200" cy="200" rx="160" ry="170" />
            <path d="M70 200 C70 120, 130 60, 200 60 C270 60, 330 120, 330 200" />
            <path d="M80 200 C80 270, 130 330, 200 330 C270 330, 320 270, 320 200" />
          </svg>
        </div>

        {/* Top UNITAR Logo Header */}
        <div className="relative z-10 text-center space-y-1">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-600 flex items-center justify-center text-cyan-600 font-bold text-xs">
              UN
            </div>
            <div className="text-left leading-tight">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-cyan-700">unitar</span>
              <p className="text-[9px] sm:text-[10px] text-neutral-600 font-sans tracking-wide">
                United Nations Institute for Training and Research
              </p>
            </div>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#b45309] tracking-widest uppercase pt-4 sm:pt-6" style={{ fontFamily: "'Cinzel', serif" }}>
            CERTIFICATE OF COMPLETION
          </h2>
        </div>

        {/* Recipient */}
        <div className="relative z-10 text-center my-4 sm:my-6">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            {effectiveRecipient}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-sans">
            has successfully completed the
          </p>
          <h4 className="text-lg sm:text-2xl font-bold text-neutral-800 mt-2 max-w-2xl mx-auto">
            {certificate.title}
          </h4>
          <p className="text-xs font-mono text-neutral-500 mt-2">
            Certification date: {certificate.issueDate}
          </p>
        </div>

        {/* Bottom Signature: Michelle Gyles-McDonnough */}
        <div className="relative z-10 text-center pt-4 border-t border-neutral-200/80">
          <div className="max-w-xs mx-auto text-center space-y-0.5">
            <div className="text-2xl text-blue-900 italic font-serif" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Michelle Gyles-McDonnough
            </div>
            <div className="w-48 h-0.5 bg-neutral-400 mx-auto" />
            <p className="text-xs font-semibold text-neutral-800">
              Michelle Gyles-McDonnough
            </p>
            <p className="text-[10px] sm:text-xs text-neutral-600">
              UN Assistant Secretary-General, Executive Director, UNITAR
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Elements of AI (University of Helsinki & MinnaLearn) Layout
  if (certificate.layoutVariant === 'helsinki_cert') {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-white text-neutral-900 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-indigo-600/30 shadow-md">
          <div className="relative z-10 flex items-center justify-between border-b border-indigo-100 pb-1 text-[10px]">
            <span className="font-bold text-indigo-900">MinnaLearn</span>
            <span className="font-semibold text-neutral-800 text-[9px] truncate max-w-[120px]">Univ. of Helsinki</span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <span className="text-[9px] font-mono text-indigo-600 font-semibold uppercase tracking-wider">
              Elements of AI · 2 ECTS
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {effectiveRecipient}
            </h4>
            <div className="w-10 h-0.5 bg-indigo-500/40 mx-auto my-1" />
            <p className="text-[10px] text-neutral-700">Certificate of Completion</p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[9px] text-neutral-500 font-mono border-t border-neutral-200 pt-1">
            <span>Code: {certificate.credentialId}</span>
            <span>{certificate.issueDate}</span>
          </div>
        </div>
      );
    }

    // Fullscreen Elements of AI
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white text-neutral-900 rounded-xl p-8 sm:p-12 md:p-16 flex flex-col justify-between overflow-hidden border-4 border-indigo-700/60 shadow-2xl">
        {/* Subtle geometric node network in background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#4338ca_1px,_transparent_1px)] bg-[size:24px_24px]" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            M<span className="text-indigo-600">i</span>nnaLearn
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-900" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            </div>
            <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight mt-0.5">
              Elements of AI
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 block">
              University of Helsinki
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">Academic Accreditation</span>
          </div>
        </div>

        {/* Certificate Center */}
        <div className="relative z-10 text-center my-4 sm:my-6">
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wider text-indigo-950 font-sans">
            CERTIFICATE OF COMPLETION
          </h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">
            Presented to
          </p>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight mt-2 uppercase font-sans">
            {effectiveRecipient}
          </h3>
          <div className="w-32 h-0.5 bg-indigo-600/50 mx-auto my-3" />
          <p className="text-xs sm:text-sm text-neutral-700 max-w-xl mx-auto font-sans leading-relaxed">
            This is to certify that you have successfully completed the <span className="font-bold text-indigo-900">2 ECTS credits</span> online course in artificial intelligence fundamentals and machine learning algorithms.
          </p>
        </div>

        {/* Center Mascot & Signatures */}
        <div className="relative z-10 grid grid-cols-3 items-end pt-4 border-t border-neutral-200">
          {/* Left Signature */}
          <div className="text-left space-y-1">
            <div className="text-xl text-blue-900 font-serif" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Teemu Roos
            </div>
            <div className="w-28 sm:w-36 h-0.5 bg-neutral-400" />
            <p className="text-xs font-bold text-neutral-900">Teemu Roos</p>
            <p className="text-[10px] text-neutral-600">Professor, University of Helsinki</p>
            <p className="text-[9px] text-neutral-500 font-mono mt-1">Date: {certificate.issueDate}</p>
          </div>

          {/* Center Cute Blue Mascot */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-inner">
              <svg viewBox="0 0 64 64" className="w-10 h-10 fill-current text-indigo-600">
                <circle cx="32" cy="30" r="18" fill="#a5b4fc" />
                <circle cx="26" cy="28" r="2.5" fill="#1e1b4b" />
                <circle cx="38" cy="28" r="2.5" fill="#1e1b4b" />
                <rect x="22" y="44" width="20" height="12" rx="4" fill="#6366f1" />
              </svg>
            </div>
          </div>

          {/* Right Signature */}
          <div className="text-right space-y-1">
            <div className="text-xl text-blue-900 font-serif" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Ville Valtonen
            </div>
            <div className="w-28 sm:w-36 h-0.5 bg-neutral-400 ml-auto" />
            <p className="text-xs font-bold text-neutral-900">Ville Valtonen</p>
            <p className="text-[10px] text-neutral-600">CEO, MinnaLearn</p>
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[9px] text-indigo-600 font-mono hover:underline block truncate mt-1"
            >
              Verify: {certificate.credentialId}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 3. SUIT Peshawar Thesis Capstone Cover Layout
  if (certificate.layoutVariant === 'suit_thesis') {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-[#071328] text-neutral-100 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-amber-500/40 shadow-md">
          <div className="relative z-10 flex items-center justify-between border-b border-amber-500/30 pb-1 text-[9px] font-mono text-amber-300">
            <span>SUIT PESHAWAR</span>
            <span className="text-emerald-400">Civil Engg Tech</span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <h4 className="text-[11px] font-extrabold text-amber-200 line-clamp-2 leading-tight uppercase">
              {certificate.title}
            </h4>
            <p className="text-[9px] font-semibold text-neutral-300 mt-1">
              {effectiveRecipient}
            </p>
            <p className="text-[8px] font-mono text-neutral-400">
              Reg: SUIT-17-01-149-0099
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[8px] text-amber-400/90 font-mono border-t border-neutral-800 pt-1">
            <span>Roll: 17-FA-12711</span>
            <span>Session: 2017–2021</span>
          </div>
        </div>
      );
    }

    // Fullscreen SUIT Thesis Document
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#071328] text-neutral-100 rounded-xl p-8 sm:p-12 md:p-14 flex flex-col justify-between overflow-hidden border-4 border-amber-500/50 shadow-2xl">
        {/* Gold Frame Lines */}
        <div className="absolute inset-3 border border-amber-400/30 rounded pointer-events-none" />
        <div className="absolute inset-4 border border-amber-400/15 rounded pointer-events-none" />

        {/* University Crest & Header */}
        <div className="relative z-10 text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-900/80 border border-amber-400/60 flex items-center justify-center p-1 shadow-md">
            <Award className="w-7 h-7 text-amber-300" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-amber-200 tracking-wider uppercase font-sans">
            SARHAD UNIVERSITY OF SCIENCE & TECHNOLOGY, PESHAWAR
          </h2>
          <p className="text-[11px] sm:text-xs text-neutral-300 font-mono tracking-widest uppercase">
            DEPARTMENT OF CIVIL ENGINEERING TECHNOLOGY
          </p>
        </div>

        {/* Thesis Title Box */}
        <div className="relative z-10 text-center my-3 sm:my-4 px-4 py-3 bg-blue-950/60 border border-amber-500/40 rounded-xl">
          <h3 className="text-base sm:text-xl md:text-2xl font-black text-amber-100 uppercase tracking-tight leading-snug">
            PARAMETRIC STABILITY ANALYSIS AND PREDICTIVE COMPUTATIONAL MODELING OF EMBANKMENT SLOPES IN HEAVY INFRASTRUCTURE
          </h3>
          <p className="text-[11px] sm:text-xs text-amber-200/80 italic mt-1 font-serif">
            A Technical Investigation Integrating Limit Equilibrium Theory, Empirical Soil Shear Parameters, and Advanced Computational Algorithms for Real-Time Safety Factor Evaluation
          </p>
        </div>

        {/* Candidate Presentation */}
        <div className="relative z-10 text-center space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
            RESEARCH CONDUCTED & PRESENTED BY:
          </p>
          <h4 className="text-lg sm:text-2xl font-bold text-neutral-100" style={{ fontFamily: "'Playfair Display', serif" }}>
            {effectiveRecipient}
          </h4>
          <p className="text-xs text-neutral-300">
            Bachelor of Science in Civil Engineering Technology, Peshawar
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-amber-300 pt-1">
            <span>Reg No: SUIT-17-01-149-0099</span>
            <span>·</span>
            <span>Roll No: 17-FA-12711</span>
            <span>·</span>
            <span>Session: 2017–2021</span>
          </div>
        </div>

        {/* Supervisory Committee Footer */}
        <div className="relative z-10 pt-3 border-t border-amber-500/30 text-center text-xs text-neutral-300">
          <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">
            Supervisory & Evaluation Committee:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] text-neutral-300 font-sans">
            <span>HOD: <strong>Engr. Wasal Khan</strong></span>
            <span>Supervisor: <strong>Engr. Shehryar Khan</strong></span>
            <span>Co-Supervisor: <strong>Engr. Muhammad Irfan</strong></span>
            <span>Faculty: <strong>Engr. Zia Ud Din</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Google Cloud AI Boost Bites Badge Layout
  if (certificate.layoutVariant === 'google_badge') {
    if (isThumbnail) {
      return (
        <div className="relative w-full aspect-[4/3] bg-white text-neutral-900 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-blue-500/30 shadow-md">
          <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 pb-1 text-[10px]">
            <span className="font-bold text-neutral-800 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Google Cloud
            </span>
            <span className="text-blue-600 font-mono text-[9px]">Badge</span>
          </div>
          <div className="relative z-10 text-center my-auto px-1">
            <h4 className="text-xs font-bold text-neutral-900 line-clamp-2">
              {certificate.title}
            </h4>
            <div className="w-6 h-6 mx-auto my-1 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-wider">
              COMPLETION BADGE
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between text-[9px] text-neutral-500 font-mono border-t border-neutral-200 pt-1">
            <span>{effectiveRecipient}</span>
            <span>{certificate.issueDate}</span>
          </div>
        </div>
      );
    }

    // Fullscreen Google Cloud Badge
    return (
      <div className="relative w-full max-w-2xl mx-auto aspect-[1.1/1] bg-white text-neutral-900 rounded-2xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden border-4 border-blue-500/40 shadow-2xl text-center">
        <div className="space-y-2">
          {/* Google Cloud Cloud Logo */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold text-neutral-800">Google Cloud</span>
          </div>
        </div>

        <div className="my-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight leading-snug">
            {certificate.title}
          </h2>

          {/* Blue verification circle badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500 text-white mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-600 uppercase">
            COMPLETION BADGE
          </p>

          <div className="pt-2">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Awarded To</p>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">
              {effectiveRecipient}
            </h3>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-500">
          <span>Official Google Cloud Credential</span>
          <span>{certificate.issueDate}</span>
        </div>
      </div>
    );
  }

  // 5. Authentic Coursera Certificate Layout (UC Santa Cruz, Johns Hopkins, L&T EduTech, Google Cloud Specialization)
  const isSpecialization = Boolean(certificate.specializationCourses && certificate.specializationCourses.length > 0);

  if (isThumbnail) {
    return (
      <div className="relative w-full aspect-[4/3] bg-white text-neutral-900 rounded-lg p-3 flex flex-col justify-between overflow-hidden border-2 border-neutral-300 shadow-md group-hover:border-amber-500/60 transition-all">
        {/* Subtle Guilloche Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.15)_1px,_transparent_1px)] bg-[size:10px_10px]" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 pb-1">
          <span className="text-[10px] font-bold text-neutral-800 truncate max-w-[150px]">
            {certificate.issuer}
          </span>
          <span className="text-[9px] font-mono text-emerald-600 flex items-center gap-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Coursera Verified
          </span>
        </div>

        {/* Center */}
        <div className="relative z-10 my-auto text-left px-1">
          <p className="text-[9px] font-mono text-neutral-500">{certificate.issueDate}</p>
          <h4
            className="text-xs sm:text-sm font-bold text-neutral-900 truncate mt-0.5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {effectiveRecipient}
          </h4>
          <p className="text-[8px] text-neutral-500 italic">has successfully completed</p>
          <h5 className="text-[11px] font-bold text-neutral-900 line-clamp-2 mt-0.5 leading-tight">
            {certificate.title}
          </h5>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center justify-between text-[8px] text-neutral-500 font-mono border-t border-neutral-200 pt-1">
          <span className="truncate max-w-[120px]">ID: {certificate.credentialId}</span>
          <span className="text-blue-600 font-bold">Coursera</span>
        </div>
      </div>
    );
  }

  // High-Resolution Full-Screen Coursera Diploma Layout
  return (
    <div
      className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white text-neutral-900 rounded-xl p-6 sm:p-10 md:p-12 flex flex-col justify-between overflow-hidden border-2 border-neutral-300 shadow-2xl"
      style={{
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8)',
      }}
    >
      {/* Outer Fine Double Border with Vintage Corner Brackets */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-neutral-300/80 rounded pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-neutral-200/60 rounded pointer-events-none" />

      {/* Background Guilloche Security Waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="courseraGuilloche" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="24" fill="none" stroke="#64748b" strokeWidth="0.5" />
            <circle cx="25" cy="25" r="16" fill="none" stroke="#64748b" strokeWidth="0.5" />
            <path d="M0 25 Q 25 0, 50 25 T 100 25" fill="none" stroke="#94a3b8" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#courseraGuilloche)" />
      </svg>

      {/* Main Certificate Content Grid */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Row: Institution Brand + Right Vertical Gray Ribbon */}
        <div className="flex items-start justify-between">
          {/* Institution Brand */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 font-sans uppercase">
              {certificate.issuer}
            </h2>
            <p className="text-xs text-neutral-500 font-mono">
              Authorized Educational Partner · Delivered via Coursera
            </p>
          </div>

          {/* Right Coursera Ribbon Flag */}
          <div className="relative w-28 sm:w-36 bg-neutral-200/90 border border-neutral-300 text-center py-4 px-2 shadow-sm rounded-b-sm flex flex-col items-center">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-700 font-bold">
              {isSpecialization ? 'SPECIALIZATION' : 'COURSE'}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-600 block">
              CERTIFICATE
            </span>

            {/* Circular Coursera Stamp */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-neutral-500 flex flex-col items-center justify-center my-2 bg-white/80 p-1">
              <span className="text-[6px] sm:text-[7px] uppercase font-bold tracking-widest text-neutral-600">
                EDUCATION FOR EVERYONE
              </span>
              <span className="text-xs sm:text-sm font-black text-blue-700 tracking-tight">
                coursera
              </span>
              <span className="text-[6px] sm:text-[7px] uppercase font-bold tracking-widest text-neutral-600">
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Recipient & Award Title */}
        <div className="my-3 sm:my-5 space-y-1 sm:space-y-2">
          <p className="text-xs font-mono text-neutral-500">{certificate.issueDate}</p>
          <h3
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-950 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {effectiveRecipient}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans italic">
            has successfully completed {isSpecialization ? 'the online Specialization' : ''}
          </p>

          <h4 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            {certificate.title}
          </h4>

          {/* Specialization 4-Course List if present */}
          {certificate.specializationCourses && (
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-left mt-2">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold mb-1">
                Completed Specialization Curriculum:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-neutral-700 font-sans">
                {certificate.specializationCourses.map((cName, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{cName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs sm:text-sm text-neutral-700 max-w-2xl leading-relaxed pt-1">
            {certificate.description}
          </p>
        </div>

        {/* Bottom Section: Instructors Signatures & Official Coursera Verification Link */}
        <div className="grid grid-cols-2 items-end pt-4 border-t border-neutral-200 gap-4">
          {/* Left: Signatures */}
          <div className="space-y-2">
            {certificate.instructorSignatures && certificate.instructorSignatures.length > 0 ? (
              certificate.instructorSignatures.map((sig, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <div
                    className="text-lg sm:text-xl text-neutral-900 font-serif italic"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    {sig.name}
                  </div>
                  <div className="w-40 sm:w-48 h-px bg-neutral-400" />
                  <p className="text-xs font-bold text-neutral-900">{sig.name}</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-600 leading-tight">
                    {sig.title}
                  </p>
                </div>
              ))
            ) : (
              <div className="space-y-0.5">
                <div className="text-lg sm:text-xl text-neutral-900 font-serif italic" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  Authorized Signatory
                </div>
                <div className="w-40 h-px bg-neutral-400" />
                <p className="text-xs font-bold text-neutral-900">{certificate.issuer}</p>
              </div>
            )}
          </div>

          {/* Right: Verification URL & ID */}
          <div className="text-right space-y-1">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 block">
              Verify this certificate at:
            </span>
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm font-mono text-blue-700 hover:text-blue-900 underline font-semibold flex items-center justify-end gap-1 break-all"
            >
              <span>{certificate.verificationUrl || `https://coursera.org/verify/${certificate.credentialId}`}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <p className="text-[10px] text-neutral-500 font-sans mt-1">
              Coursera has confirmed the identity of this individual and their participation in the course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
