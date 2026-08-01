import { MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const teamMembers = [
  { name: 'Brinda Undaviya & Team', role: 'Full-Stack & Vision Architect', focus: 'AI Computer Vision & Detection Engine' },
  { name: 'BlackPink Coders', role: 'Frontend & UI Specialist', focus: 'SaaS Dashboard & Responsive Components' },
  { name: 'Team TETRA039', role: 'Backend & System Engineer', focus: 'Express REST APIs & Agronomic Intelligence' },
];

const techStack = [
  { name: 'React 18', category: 'Frontend Library', color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { name: 'TypeScript', category: 'Type Safety', color: 'from-blue-600/20 to-indigo-600/20 text-blue-400 border-blue-500/30' },
  { name: 'Tailwind CSS', category: 'Design System', color: 'from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/30' },
  { name: 'Vite', category: 'Lightning Build', color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30' },
  { name: 'Recharts', category: 'Data Visualization', color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' },
  { name: 'Express / Node', category: 'API Backend', color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30' },
];

export function AboutPage() {
  return (
    <MainLayout title="About CropGuard AI">
      <div className="space-y-6 pb-12">
        <PageHeader
          title="About CropGuard AI"
          subtitle="AI-Powered Early Crop Disease Detection and Precision Agronomic Advisory System"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Overview Card */}
          <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl hover:border-primary-500/30 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white font-extrabold">Project Mission</CardTitle>
                <span className="px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-400 text-xs font-mono font-semibold">
                  Tetrathon 2026
                </span>
              </div>
              <CardDescription className="text-slate-300">
                Team TETRA039 — National AI & Agricultural Innovation Hackathon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                CropGuard empowers smallholder farmers, agronomists, and agricultural researchers to detect crop leaf diseases instantly using state-of-the-art AI computer vision models.
              </p>
              <p>
                By simply uploading a leaf photo from any smartphone or tablet, users obtain precise disease diagnoses, statistical confidence ratings, and localized curative/preventive protocols (organic, chemical, and field sanitation measures).
              </p>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                ⚡ Architecture designed for offline local storage persistence with zero-downtime REST backend integration.
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack Card */}
          <Card className="bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl hover:border-secondary-500/30 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white font-extrabold">Tech Stack & Architecture</CardTitle>
              <CardDescription className="text-slate-300">High performance, modularity & strict type safety</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className={`p-3 rounded-xl bg-gradient-to-r ${tech.color} border backdrop-blur-sm space-y-0.5`}
                  >
                    <p className="text-sm font-bold">{tech.name}</p>
                    <p className="text-[11px] font-mono opacity-80">{tech.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Workstreams Card */}
          <Card className="lg:col-span-2 bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white font-extrabold">Engineering Workstreams</CardTitle>
              <CardDescription className="text-slate-300">Team TETRA039 parallel development modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-primary-500/20 text-primary-400 font-extrabold text-sm flex items-center justify-center mb-3">
                      0{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-white">{member.name}</h4>
                    <p className="text-xs font-semibold text-primary-400 mt-0.5">{member.role}</p>
                    <p className="text-xs text-slate-300 mt-2">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
