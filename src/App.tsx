import React, { useState } from 'react';
import { PortfolioData, Certificate, Project } from './types';
import { defaultPortfolio } from './data/defaultPortfolio';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CivicEcoLiveShowcase } from './components/CivicEcoLiveShowcase';
import { CertificatesHub } from './components/CertificatesHub';
import { CertificateFullscreenModal } from './components/CertificateFullscreenModal';
import { ProjectsHub } from './components/ProjectsHub';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationSection } from './components/EducationSection';
import { VolunteeringSection } from './components/VolunteeringSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { SukkiKinariGalleryModal } from './components/SukkiKinariGalleryModal';
import { ThesisViewerModal } from './components/ThesisViewerModal';
import { SuitDegreeViewer } from './components/SuitDegreeViewer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { X, Printer, Award } from 'lucide-react';

function PortfolioApp() {
  const { theme } = useTheme();

  // Load portfolio and merge ALL user-uploaded photos from localStorage immediately
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    let base = defaultPortfolio;

    try {
      // 1. Check if user saved custom profile data
      const savedCustomStr = localStorage.getItem('szm_custom_portfolio');
      if (savedCustomStr) {
        const parsed = JSON.parse(savedCustomStr);
        if (parsed?.personal?.name) {
          base = {
            ...defaultPortfolio,
            ...parsed,
            experiences: parsed.experiences?.length ? parsed.experiences : defaultPortfolio.experiences,
            projects: parsed.projects?.length ? parsed.projects : defaultPortfolio.projects,
          };
        }
      }

      // 2. Merge user's uploaded real certificate pictures
      const savedPhotosStr = localStorage.getItem('szm_cert_photos');
      if (savedPhotosStr) {
        const savedPhotos: Record<string, string> = JSON.parse(savedPhotosStr);
        const updatedCerts = base.certificates.map((cert) => {
          if (savedPhotos[cert.id]) {
            return { ...cert, customImageUrl: savedPhotos[cert.id] };
          }
          return cert;
        });
        base = { ...base, certificates: updatedCerts };
      }

      // 3. Merge user's custom avatar if uploaded
      const savedAvatar = localStorage.getItem('szm_avatar');
      if (savedAvatar) {
        base = {
          ...base,
          personal: {
            ...base.personal,
            avatarUrl: savedAvatar,
          },
        };
      }
    } catch (e) {
      console.warn('Could not read saved data from localStorage', e);
    }

    return base;
  });

  // User degree photo state (persisted to localStorage)
  const [degreePhoto, setDegreePhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('szm_degree_photo') || null;
    } catch {
      return null;
    }
  });

  const handleAttachDegreePhoto = (photoDataUrl: string) => {
    setDegreePhoto(photoDataUrl);
    try {
      localStorage.setItem('szm_degree_photo', photoDataUrl);
    } catch (e) {
      console.warn('Could not save degree photo to localStorage', e);
    }
  };

  const handleRemoveDegreePhoto = () => {
    setDegreePhoto(null);
    try {
      localStorage.removeItem('szm_degree_photo');
    } catch (e) {
      console.warn('Could not remove degree photo from localStorage', e);
    }
  };

  // User project attached photos state (persisted to localStorage)
  const [projectPhotos, setProjectPhotos] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('szm_project_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleAttachProjectPhoto = (projectId: string, photoDataUrl: string) => {
    setProjectPhotos((prev) => {
      const currentList = prev[projectId] || [];
      const updatedList = [...currentList, photoDataUrl];
      const updated = { ...prev, [projectId]: updatedList };
      try {
        localStorage.setItem('szm_project_photos', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save project photos to localStorage', e);
      }
      return updated;
    });
  };

  const handleRemoveProjectPhoto = (projectId: string, index: number) => {
    setProjectPhotos((prev) => {
      const currentList = prev[projectId] || [];
      const updatedList = currentList.filter((_, idx) => idx !== index);
      const updated = { ...prev, [projectId]: updatedList };
      try {
        localStorage.setItem('szm_project_photos', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not update project photos in localStorage', e);
      }
      return updated;
    });
  };

  // Modal display states
  const [fullscreenCertIndex, setFullscreenCertIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSukkiKinariOpen, setIsSukkiKinariOpen] = useState<boolean>(false);
  const [isThesisOpen, setIsThesisOpen] = useState<boolean>(false);
  const [isDegreeOpen, setIsDegreeOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Certificate photo attachment handler
  const handleAttachCertificatePhoto = (certId: string, photoDataUrl: string) => {
    setPortfolio((prev) => {
      const updatedCerts = prev.certificates.map((c) =>
        c.id === certId ? { ...c, customImageUrl: photoDataUrl } : c
      );
      try {
        const savedPhotosStr = localStorage.getItem('szm_cert_photos') || '{}';
        const savedPhotos = JSON.parse(savedPhotosStr);
        savedPhotos[certId] = photoDataUrl;
        localStorage.setItem('szm_cert_photos', JSON.stringify(savedPhotos));
      } catch (err) {
        console.warn('Could not save to localStorage', err);
      }
      return { ...prev, certificates: updatedCerts };
    });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${theme.bgGradient} text-stone-900 flex flex-col selection:bg-amber-500/20 selection:text-amber-900 transition-colors duration-500`}
    >
      {/* Top Bar Header (No colour switchers, upload, or edit data buttons) */}
      <Header
        name={portfolio.personal.name}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {/* 1. Hero Section (With Syed Zain Musharraf name, portrait and CivicEco AI Flagship spotlight) */}
        <Hero
          personal={portfolio.personal}
          onOpenCivicEco={() => {
            const civicEcoProject =
              portfolio.projects.find((p) => p.id === 'civic-eco-ai') || portfolio.projects[0];
            setSelectedProject(civicEcoProject);
          }}
        />

        {/* 2. Top Flagship Featured Project: CivicEco AI Live Netlify Showcase */}
        <CivicEcoLiveShowcase
          onOpenSimulatorModal={() => {
            const civicEcoProject =
              portfolio.projects.find((p) => p.id === 'civic-eco-ai') || portfolio.projects[0];
            setSelectedProject(civicEcoProject);
          }}
        />

        {/* 3. Featured Engineering Projects Hub (With Add Photo Option) */}
        <ProjectsHub
          projects={portfolio.projects}
          projectPhotos={projectPhotos}
          onAttachProjectPhoto={handleAttachProjectPhoto}
          onRemoveProjectPhoto={handleRemoveProjectPhoto}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenSukkiKinariGallery={() => setIsSukkiKinariOpen(true)}
          onOpenThesisModal={() => setIsThesisOpen(true)}
        />

        {/* 4. Core Work Experience Timeline (PESCO, Descon QAFCO Qatar, NHC Sukki Kinari) */}
        <ExperienceTimeline
          experiences={portfolio.experiences}
          onOpenSukkiKinariGallery={() => setIsSukkiKinariOpen(true)}
        />

        {/* 5. Education & Final Year Capstone Research (SUIT Peshawar Degree with Attach Photo Option & Thesis) */}
        <EducationSection
          education={portfolio.education}
          degreePhoto={degreePhoto}
          onAttachDegreePhoto={handleAttachDegreePhoto}
          onRemoveDegreePhoto={handleRemoveDegreePhoto}
          onOpenThesisModal={() => setIsThesisOpen(true)}
          onOpenDegreeModal={() => setIsDegreeOpen(true)}
        />

        {/* 6. Dedicated Verified Certifications Hub */}
        <CertificatesHub
          certificates={portfolio.certificates}
          recipientName={portfolio.personal.name}
          onOpenFullscreen={(index) => setFullscreenCertIndex(index)}
          onAttachCertificatePhoto={handleAttachCertificatePhoto}
        />

        {/* 7. Dedicated Volunteering & Civic Engagement Section (UNHCR & Billion Tree Tsunami) */}
        <VolunteeringSection volunteering={portfolio.volunteering} />

        {/* 8. Technical Competencies Matrix */}
        <SkillsMatrix categories={portfolio.skillsCategories} />

        {/* 9. Testimonials & Academic Endorsements */}
        <TestimonialsSection recommendations={portfolio.recommendations} />
      </main>

      {/* Footer */}
      <Footer
        name={portfolio.personal.name}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* SUKKI KINARI 500kV FIELD SITE PICTURES & GALLERY MODAL */}
      {isSukkiKinariOpen && (
        <SukkiKinariGalleryModal
          isOpen={isSukkiKinariOpen}
          onClose={() => setIsSukkiKinariOpen(false)}
        />
      )}

      {/* B.SC. 22-PAGE CAPSTONE THESIS VIEWER MODAL */}
      {isThesisOpen && (
        <ThesisViewerModal
          isOpen={isThesisOpen}
          onClose={() => setIsThesisOpen(false)}
        />
      )}

      {/* OFFICIAL SUIT DEGREE CERTIFICATE MODAL */}
      {isDegreeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Official SUIT Degree Certificate"
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#fbf9f5] border-2 border-stone-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <header className="px-6 py-4 border-b border-stone-200 bg-[#f5efe6] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-800" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                    Sarhad University of Science & Technology (SUIT) · Official Degree Certificate
                  </h3>
                  <p className="text-[11px] font-mono text-amber-900">
                    Registration No: SUIT-17-01-149-0099 · Degree No: 040573
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setIsDegreeOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div className="p-4 sm:p-6 overflow-y-auto">
              <SuitDegreeViewer
                degreePhoto={degreePhoto}
                onAttachPhoto={handleAttachDegreePhoto}
                onRemovePhoto={handleRemoveDegreePhoto}
              />
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN CERTIFICATE INSPECTION LIGHTBOX MODAL */}
      {fullscreenCertIndex !== null && (
        <CertificateFullscreenModal
          certificates={portfolio.certificates}
          currentIndex={fullscreenCertIndex}
          recipientName={portfolio.personal.name}
          onClose={() => setFullscreenCertIndex(null)}
          onSelectIndex={(index) => setFullscreenCertIndex(index)}
          onAttachPhoto={handleAttachCertificatePhoto}
        />
      )}

      {/* DIRECT PROJECT INTERACTIVE SIMULATOR MODAL */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projectPhotos={projectPhotos}
          onAttachProjectPhoto={handleAttachProjectPhoto}
          onClose={() => setSelectedProject(null)}
          onOpenSukkiKinariGallery={() => {
            setSelectedProject(null);
            setIsSukkiKinariOpen(true);
          }}
          onOpenThesisModal={() => {
            setSelectedProject(null);
            setIsThesisOpen(true);
          }}
        />
      )}

      {/* DIRECT EXECUTIVE RESUME / CV MODAL */}
      {isResumeOpen && (
        <ResumeModal
          portfolio={portfolio}
          onClose={() => setIsResumeOpen(false)}
          onOpenCertFullscreen={(index) => {
            setIsResumeOpen(false);
            setFullscreenCertIndex(index);
          }}
        />
      )}

      {/* DIRECT IN-APP CONTACT MODAL */}
      {isContactOpen && (
        <ContactModal
          email={portfolio.personal.email}
          name={portfolio.personal.name}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
