import { MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const teamMembers = [
  { role: 'Developer 1', focus: 'AI / Detection Module' },
  { role: 'Developer 2', focus: 'Frontend / UI Module' },
  { role: 'Developer 3', focus: 'Backend / API Module' },
];

export function AboutPage() {
  return (
    <MainLayout title="About">
      <PageHeader
        title="About CropGuard"
        subtitle="AI-Powered Early Crop Disease Detection and Advisory System"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Tetrathon 2026 — Team TETRA039 (BlackPink Coders)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-400">
            <p>
              CropGuard empowers farmers to detect crop diseases early using AI-powered
              image analysis. Upload leaf photos, receive instant predictions with
              confidence scores, and get actionable treatment recommendations.
            </p>
            <p>
              This foundation provides the architecture for three developers to work
              in parallel on detection, dashboard, and API modules.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Built for speed and maintainability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {['React', 'TypeScript', 'Tailwind CSS', 'Express', 'Vite', 'Recharts'].map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Modules</CardTitle>
            <CardDescription>Parallel development workstreams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.role} className="glass rounded-xl p-4">
                  <p className="text-sm font-medium text-white">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-1">{member.focus}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
