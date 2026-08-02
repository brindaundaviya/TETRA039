import { useMemo, useState } from 'react';
import { Accordion, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { ConfidenceGauge } from './ConfidenceGauge';
import { PreventiveMeasures } from './PreventiveMeasures';
import { PredictionTimeline } from './PredictionTimeline';
import { SimilarDiseases } from './SimilarDiseases';
import { t } from '@/utils/translations';

export interface PredictionData {
  diseaseName: string;
  scientificName: string;
  cropType: string;
  riskLevel: 'High Risk' | 'Medium Risk' | 'Low Risk' | 'Healthy';
  confidence: number;
  predictionTime: string;
  modelVersion: string;
}

interface PredictionResultCardProps {
  prediction: PredictionData;
  treatment?: {
    recommendedTreatment?: string;
    chemicalSolution?: string;
    recoveryTime?: string;
    immediateAction?: string;
    organicSolution?: string;
  } | null;
}

export function PredictionResultCard({ prediction, treatment }: PredictionResultCardProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const severity = useMemo(() => {
    if (prediction.riskLevel === 'High Risk') return { label: t('scan.severe'), tone: 'border-red-500/30 bg-red-500/10 text-red-200' };
    if (prediction.riskLevel === 'Medium Risk') return { label: t('scan.moderate'), tone: 'border-amber-500/30 bg-amber-500/10 text-amber-200' };
    return { label: t('scan.healthy'), tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' };
  }, [prediction.riskLevel]);

  const actionCards = [
    {
      icon: '🚨',
      title: 'Treat today',
      body: treatment?.recommendedTreatment || 'Follow the recommended spray plan today.',
    },
    {
      icon: '🌿',
      title: 'Remove affected leaves',
      body: 'Cut away damaged leaves and keep them away from healthy plants.',
    },
    {
      icon: '💧',
      title: 'Keep leaves dry',
      body: 'Water the soil instead of the leaves to reduce spread.',
    },
    {
      icon: '👀',
      title: 'Check nearby plants',
      body: 'Inspect neighboring plants again in 2–3 days.',
    },
  ];

  const speakResult = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${prediction.cropType} ${prediction.diseaseName}. Severity is ${severity.label}. Treatment is ${treatment?.recommendedTreatment || 'follow the plan'}.`
    );
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleExport = (label: string) => {
    setFeedback(`${label} saved to your local farm report.`);
    window.setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <Card className="mb-0 overflow-hidden border border-white/10 p-0">
      <CardHeader className="border-b border-white/5 p-4 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
            <div className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm font-semibold text-primary-200">
              🌿 Problem found
            </div>
            <CardTitle className="mt-3 text-2xl font-extrabold text-white">{prediction.diseaseName}</CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-300">{prediction.cropType}</CardDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${severity.tone}`}>
                {severity.label}
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-slate-200">
                Confidence {prediction.confidence}%
              </span>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
            <div className="text-sm font-semibold text-slate-400">Recovery outlook</div>
            <div className="mt-2 text-2xl font-extrabold text-white">{treatment?.recoveryTime || '7–14 days'}</div>
            <p className="mt-2 text-sm text-slate-400">The plan below focuses on the fastest safe action for the field.</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-sky-500/20 bg-sky-500/10 p-4">
            <div className="text-sm font-semibold text-sky-300">🧪 Chemical treatment</div>
            <p className="mt-2 text-sm text-slate-200">{treatment?.chemicalSolution || 'Use the suggested fungicide carefully and follow the label.'}</p>
          </div>

          <div className="rounded-[1.25rem] border border-emerald-500/20 bg-emerald-500/10 p-4">
            <div className="text-sm font-semibold text-emerald-300">🌱 Organic treatment</div>
            <p className="mt-2 text-sm text-slate-200">{treatment?.organicSolution || 'Neem oil plus a bio-fungicide for a lower-risk approach.'}</p>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-400">What to do now</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {actionCards.map((card) => (
              <div key={card.title} className="rounded-[1.15rem] border border-white/10 bg-white/5 p-3">
                <div className="text-2xl">{card.icon}</div>
                <div className="mt-2 text-sm font-semibold text-white">{card.title}</div>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-3">
          <div className="flex flex-wrap gap-2">
            {[
              ['Download Report', '📄'],
              ['Share', '🔗'],
              ['Save', '💾'],
            ].map(([label, icon]) => (
              <button
                key={label}
                type="button"
                onClick={() => handleExport(label)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                {icon} {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={speakResult}
            className="rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-2 text-sm font-semibold text-primary-200 transition-all hover:bg-primary-500/20"
          >
            🔊 Read advice
          </button>
          {feedback && <span className="text-sm text-emerald-300">{feedback}</span>}
        </div>

        <Accordion
          className="mt-1"
          items={[
            {
              id: 'details',
              question: 'AI Details',
              answer: (
                <div className="space-y-4">
                  <ConfidenceGauge confidence={prediction.confidence} />
                  <PreventiveMeasures />
                  <SimilarDiseases />
                  <PredictionTimeline />
                </div>
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
