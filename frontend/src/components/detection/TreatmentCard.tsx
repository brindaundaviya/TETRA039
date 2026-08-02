import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

export interface TreatmentDetails {
  immediateAction: string;
  recommendedTreatment: string;
  organicSolution: string;
  chemicalSolution: string;
  recoveryTime: string;
  priorityLevel: 'High Priority' | 'Medium Priority' | 'Standard Care';
}

interface TreatmentCardProps {
  treatment: TreatmentDetails;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const detailRows = [
    { label: 'Product', value: treatment.recommendedTreatment },
    { label: 'Dosage', value: treatment.chemicalSolution },
    { label: 'When to Spray', value: 'Early morning, before 10 AM' },
    { label: 'How Often', value: 'Every 5–7 days while symptoms remain' },
    { label: 'Safety', value: 'Wear gloves and keep away from children' },
  ];

  return (
    <Card className="overflow-hidden border border-white/10 p-0">
      <CardHeader className="border-b border-white/5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="text-xl">🧪</span>
              Recommended Spray
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-300">Simple steps you can follow today.</CardDescription>
          </div>
          <span className="rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-1 text-xs font-semibold text-primary-300">
            {treatment.priorityLevel}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <div className="text-sm font-semibold text-red-300">🚨 Act today</div>
          <p className="mt-1 text-sm text-slate-200">{treatment.immediateAction}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-sky-500/20 bg-sky-500/10 p-4">
            <div className="text-sm font-semibold text-sky-300">🧴 Chemical Option</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {detailRows.map((row) => (
                <li key={row.label} className="leading-relaxed">
                  <span className="font-semibold text-white">{row.label}:</span> {row.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.25rem] border border-emerald-500/20 bg-emerald-500/10 p-4">
            <div className="text-sm font-semibold text-emerald-300">🌱 Organic Alternative</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li><span className="font-semibold text-white">Product:</span> {treatment.organicSolution}</li>
              <li><span className="font-semibold text-white">When:</span> Early morning, repeat after 5–7 days</li>
              <li><span className="font-semibold text-white">Why:</span> Helps protect nearby leaves without harsh chemicals</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
