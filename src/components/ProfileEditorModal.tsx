import React, { useState } from 'react';
import { PortfolioData, Experience, Project, Volunteering } from '../types';
import {
  X,
  User,
  Briefcase,
  Layers,
  Heart,
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { defaultPortfolio } from '../data/defaultPortfolio';

interface ProfileEditorModalProps {
  portfolio: PortfolioData;
  onSave: (updatedPortfolio: PortfolioData) => void;
  onResetToDefault: () => void;
  onClose: () => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  portfolio,
  onSave,
  onResetToDefault,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experiences' | 'projects' | 'volunteering'>('personal');
  const [editedData, setEditedData] = useState<PortfolioData>(JSON.parse(JSON.stringify(portfolio)));
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handlePersonalChange = (field: keyof PortfolioData['personal'], value: string) => {
    setEditedData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: 'Civil Engineer',
      company: 'Organization / Company Name',
      period: '2024 – Present',
      location: 'Pakistan',
      description: 'Role overview and engineering responsibilities.',
      achievements: ['Key engineering achievement or milestone'],
    };
    setEditedData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setEditedData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Engineering Project',
      subtitle: 'Construction & Civil Infrastructure',
      category: 'Civil Works',
      description: 'Detailed description of structural works, methodologies, and outcomes.',
      metrics: '100% Quality Audited',
      techStack: ['Civil Engineering', 'Construction Management', 'QA/QC'],
      highlights: ['Key project highlight or structural compliance'],
    };
    setEditedData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const handleRemoveProject = (id: string) => {
    setEditedData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleAddVolunteering = () => {
    const newVol: Volunteering = {
      id: `vol-${Date.now()}`,
      role: 'Community Volunteer',
      organization: 'Organization Name',
      period: '2023 – 2024',
      cause: 'Community Service',
      description: 'Description of volunteering activities and humanitarian contributions.',
      impactBullets: ['Community outcome or educational impact'],
      credentialOrBadge: 'Service Recognition',
    };
    setEditedData((prev) => ({
      ...prev,
      volunteering: [newVol, ...prev.volunteering],
    }));
  };

  const handleRemoveVolunteering = (id: string) => {
    setEditedData((prev) => ({
      ...prev,
      volunteering: prev.volunteering.filter((v) => v.id !== id),
    }));
  };

  const handleSave = () => {
    onSave(editedData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Direct Profile & Resume Editor"
      className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-100">
                Direct Profile & Career Details Editor
              </h2>
              <p className="text-xs text-neutral-400 font-sans">
                Edit your Experiences, Projects, Volunteering, and Personal Bio directly without needing external links.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all changes back to official Syed Zain Musharraf profile?')) {
                  onResetToDefault();
                  setEditedData(JSON.parse(JSON.stringify(defaultPortfolio)));
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 flex items-center gap-1.5 transition-colors"
              title="Reset to Master Profile"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center gap-2 overflow-x-auto text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab('personal')}
            className={`pb-3 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'personal'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Bio & Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`pb-3 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'experiences'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work Experiences ({editedData.experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects & Case Studies ({editedData.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteering')}
            className={`pb-3 px-3 border-b-2 font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'volunteering'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Volunteering ({editedData.volunteering.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Personal Bio & Contact */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editedData.personal.name}
                    onChange={(e) => handlePersonalChange('name', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1">Location</label>
                  <input
                    type="text"
                    value={editedData.personal.location}
                    onChange={(e) => handlePersonalChange('location', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={editedData.personal.headline}
                  onChange={(e) => handlePersonalChange('headline', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">Detailed Bio / Summary</label>
                <textarea
                  rows={4}
                  value={editedData.personal.bio}
                  onChange={(e) => handlePersonalChange('bio', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:border-amber-400 outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editedData.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={editedData.personal.linkedinUrl}
                    onChange={(e) => handlePersonalChange('linkedinUrl', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Experiences */}
          {activeTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs text-neutral-400 font-mono">Work Experience Entries</span>
                <button
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              {editedData.experiences.map((exp, index) => (
                <div key={exp.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-semibold">Entry #{index + 1}</span>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Job Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...editedData.experiences];
                          updated[index].role = e.target.value;
                          setEditedData({ ...editedData, experiences: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...editedData.experiences];
                          updated[index].company = e.target.value;
                          setEditedData({ ...editedData, experiences: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Duration / Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...editedData.experiences];
                          updated[index].period = e.target.value;
                          setEditedData({ ...editedData, experiences: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => {
                          const updated = [...editedData.experiences];
                          updated[index].location = e.target.value;
                          setEditedData({ ...editedData, experiences: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...editedData.experiences];
                        updated[index].description = e.target.value;
                        setEditedData({ ...editedData, experiences: updated });
                      }}
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs text-neutral-400 font-mono">Projects & Case Studies</span>
                <button
                  onClick={handleAddProject}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {editedData.projects.map((proj, index) => (
                <div key={proj.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-semibold">Project #{index + 1}</span>
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...editedData.projects];
                          updated[index].title = e.target.value;
                          setEditedData({ ...editedData, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Category / Domain</label>
                      <input
                        type="text"
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...editedData.projects];
                          updated[index].category = e.target.value;
                          setEditedData({ ...editedData, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...editedData.projects];
                        updated[index].description = e.target.value;
                        setEditedData({ ...editedData, projects: updated });
                      }}
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Volunteering */}
          {activeTab === 'volunteering' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs text-neutral-400 font-mono">Volunteering & Community Impact</span>
                <button
                  onClick={handleAddVolunteering}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Volunteering</span>
                </button>
              </div>

              {editedData.volunteering.map((vol, index) => (
                <div key={vol.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-semibold">Volunteering #{index + 1}</span>
                    <button
                      onClick={() => handleRemoveVolunteering(vol.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Volunteering Role</label>
                      <input
                        type="text"
                        value={vol.role}
                        onChange={(e) => {
                          const updated = [...editedData.volunteering];
                          updated[index].role = e.target.value;
                          setEditedData({ ...editedData, volunteering: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Organization</label>
                      <input
                        type="text"
                        value={vol.organization}
                        onChange={(e) => {
                          const updated = [...editedData.volunteering];
                          updated[index].organization = e.target.value;
                          setEditedData({ ...editedData, volunteering: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Period / Duration</label>
                      <input
                        type="text"
                        value={vol.period}
                        onChange={(e) => {
                          const updated = [...editedData.volunteering];
                          updated[index].period = e.target.value;
                          setEditedData({ ...editedData, volunteering: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Cause / Sector</label>
                      <input
                        type="text"
                        value={vol.cause}
                        onChange={(e) => {
                          const updated = [...editedData.volunteering];
                          updated[index].cause = e.target.value;
                          setEditedData({ ...editedData, volunteering: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={vol.description}
                      onChange={(e) => {
                        const updated = [...editedData.volunteering];
                        updated[index].description = e.target.value;
                        setEditedData({ ...editedData, volunteering: updated });
                      }}
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-neutral-400">
            {savedSuccess ? (
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Changes Saved Successfully!
              </span>
            ) : (
              'All changes are saved instantly to your browser.'
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
