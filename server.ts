import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini on server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint to parse or synthesize LinkedIn profile into structured portfolio
app.post('/api/generate-from-linkedin', async (req, res) => {
  try {
    const { linkedinUrl, profileText, targetRole } = req.body;

    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const prompt = `You are an expert executive engineering portfolio architect.
The user wants to generate or enrich a comprehensive, authentic professional portfolio based on Syed Zain Musharraf's profile or custom profile input.

Input LinkedIn URL: "${linkedinUrl || 'https://www.linkedin.com/in/syed-zain-musharraf-99a57720b/'}"
User Profile Notes / Resume Text / Focus: "${profileText || 'Syed Zain Musharraf, Junior Engineer (Civil) at PESCO, Ex-Descon Engineering (QAFCO Qatar Project 8517), B.Sc. Civil Engineering Technology from SUIT Peshawar (2017-2021). Capstone: Parametric Stability Analysis and Computational Modeling of Embankment Slopes. Certificates: Billion Tree Tsunami Project (BTTP-Z-8e2b9c), UNHCR Volunteer Teacher (PSC 0336 Barairy Camp), Google Cloud Generative AI Specialization (1X1YB6IJ0YIF), Elements of AI (University of Helsinki sq4fxcio5h), UC Santa Cruz AI Tools (E28VBGCS8DVK), L&T EduTech Site Investigation (0X2VZQUA9TK8), Johns Hopkins Leadership (GZKCF0YFHW0A), UNITAR SDG 6.'}"
Target Professional Domain / Role: "${targetRole || 'Civil Engineer & Smart Infrastructure Specialist'}"

TASK:
Generate a high-fidelity, complete portfolio dataset matching Syed Zain Musharraf's authentic engineering and volunteering trajectory.
Include:
1. Personal details (name: "Syed Zain Musharraf", headline, bio, location, contact, social links).
2. 8 to 10 verified credentials matching his genuine certifications (Billion Tree Tsunami Project, UNHCR Teaching Credential, Google Cloud Generative AI, Elements of AI, UC Santa Cruz, L&T EduTech, Johns Hopkins, UNITAR SDG 6, SUIT Peshawar Thesis).
3. 3 to 4 detailed projects (PESCO Civil Works, QAFCO Qatar Project 8517, SUIT Embankment Slope Stability Research, Geotechnical Site Characterization).
4. 2 to 3 work experience entries (PESCO Junior Engineer Civil, Descon Engineering Limited Qatar).
5. 2 dedicated volunteering entries (UNHCR Refugee Camp Community Volunteer Teacher, Billion Tree Tsunami Project under Ministry of Climate Change).
6. 3 skills categories with levels.
7. 3 recommendations from university HODs and engineering leaders.

Respond ONLY with valid JSON matching the requested structure.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personal: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                headline: { type: Type.STRING },
                bio: { type: Type.STRING },
                avatarUrl: { type: Type.STRING },
                location: { type: Type.STRING },
                email: { type: Type.STRING },
                linkedinUrl: { type: Type.STRING },
                githubUrl: { type: Type.STRING },
                yearsExperience: { type: Type.STRING },
                completedProjectsCount: { type: Type.STRING },
                satisfactionRate: { type: Type.STRING },
                availabilityStatus: { type: Type.STRING },
              },
              required: ['name', 'headline', 'bio', 'location', 'email'],
            },
            certificates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  issuer: { type: Type.STRING },
                  issueDate: { type: Type.STRING },
                  expiryDate: { type: Type.STRING },
                  credentialId: { type: Type.STRING },
                  status: { type: Type.STRING },
                  scoreOrGrade: { type: Type.STRING },
                  skillsCovered: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  description: { type: Type.STRING },
                  issuerType: { type: Type.STRING },
                  styleTheme: { type: Type.STRING },
                },
                required: ['id', 'title', 'issuer', 'issueDate', 'credentialId', 'skillsCovered', 'description', 'issuerType', 'styleTheme'],
              },
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  metrics: { type: Type.STRING },
                  techStack: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  previewType: { type: Type.STRING },
                },
                required: ['id', 'title', 'subtitle', 'category', 'description', 'techStack', 'highlights'],
              },
            },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  period: { type: Type.STRING },
                  location: { type: Type.STRING },
                  description: { type: Type.STRING },
                  achievements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['id', 'role', 'company', 'period', 'achievements'],
              },
            },
            skillsCategories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  skills: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        level: { type: Type.NUMBER },
                      },
                      required: ['name', 'level'],
                    },
                  },
                },
                required: ['category', 'skills'],
              },
            },
            volunteering: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  role: { type: Type.STRING },
                  organization: { type: Type.STRING },
                  period: { type: Type.STRING },
                  cause: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impactBullets: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  credentialOrBadge: { type: Type.STRING },
                },
                required: ['id', 'role', 'organization', 'period', 'cause', 'description', 'impactBullets'],
              },
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  authorName: { type: Type.STRING },
                  authorTitle: { type: Type.STRING },
                  company: { type: Type.STRING },
                  relationship: { type: Type.STRING },
                  text: { type: Type.STRING },
                  avatarColor: { type: Type.STRING },
                },
                required: ['authorName', 'authorTitle', 'company', 'text'],
              },
            },
          },
          required: ['personal', 'certificates', 'projects', 'experiences', 'volunteering', 'skillsCategories', 'recommendations'],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error generating portfolio from LinkedIn:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate portfolio. Please try again or use direct preset.',
    });
  }
});

// Dev vs Prod Vite middleware
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
