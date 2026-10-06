export type IssuerType =
  | 'aws'
  | 'google'
  | 'meta'
  | 'microsoft'
  | 'stanford'
  | 'deeplearning'
  | 'harvard'
  | 'ibm'
  | 'coursera'
  | 'custom';

export type CertificateTheme =
  | 'gold_prestige'
  | 'navy_azure'
  | 'emerald_honor'
  | 'ruby_executive'
  | 'slate_minimal';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl?: string;
  status: 'Verified' | 'Active' | 'Lifetime';
  scoreOrGrade?: string;
  gradeOrEcts?: string;
  skillsCovered: string[] | string;
  description: string;
  issuerType: IssuerType;
  styleTheme: CertificateTheme;
  layoutVariant?: 'coursera_cert' | 'helsinki_cert' | 'unitar_cert' | 'suit_thesis' | 'google_badge' | 'standard';
  instructorSignatures?: { name: string; title: string }[];
  specializationCourses?: string[];
  customImageUrl?: string;
  recipientName?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: string;
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  previewType?: 'interactive_demo' | 'dashboard' | 'code' | 'architecture';
  interactiveDemoData?: {
    liveStatus: string;
    latency: string;
    throughput: string;
    featuresPreview: string[];
    sampleLogsOrOutputs: string[];
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Recommendation {
  authorName: string;
  authorTitle: string;
  company: string;
  relationship?: string;
  text: string;
  avatarColor?: string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  bio: string;
  avatarUrl?: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  yearsExperience: string;
  completedProjectsCount: string;
  satisfactionRate: string;
  availabilityStatus: string;
}

export interface Volunteering {
  id: string;
  role: string;
  organization: string;
  period: string;
  cause: string;
  description: string;
  impactBullets: string[];
  credentialOrBadge?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  registrationNo?: string;
  rollNo?: string;
  finalYearProject: {
    title: string;
    description: string;
    supervisors: string;
  };
}

export interface PortfolioData {
  personal: PersonalInfo;
  certificates: Certificate[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  volunteering: Volunteering[];
  skillsCategories: SkillCategory[];
  recommendations: Recommendation[];
}
