import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Modal } from '@/components/ui';

interface SimilarDiseaseItem {
  name: string;
  scientificName: string;
  description: string;
  confidence: number;
  differentiatingFactor: string;
}

const DEFAULT_SIMILAR_DISEASES: SimilarDiseaseItem[] = [
  {
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    description: 'Fungal pathogen causing large water-soaked dark brown spots on leaf tips and margins with white mold growth under humid conditions.',
    confidence: 2.1,
    differentiatingFactor: 'Lesions lack the distinctive concentric rings found in Early Blight.',
  },
  {
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas vesicatoria',
    description: 'Bacterial infection characterized by small, greasy, dark brown spots surrounded by distinct yellow halo rings.',
    confidence: 0.3,
    differentiatingFactor: 'Lesions are smaller (1-3mm) and appear greasy under magnification.',
  },
  {
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    description: 'Fungal disease causing tiny circular spots with dark brown margins and greyish centers filled with tiny black fruiting bodies.',
    confidence: 0.2,
    differentiatingFactor: 'Grey centers with dark specks distinguish Septoria from Early Blight.',
  },
];

export function SimilarDiseases() {
  const [selectedDisease, setSelectedDisease] = useState<SimilarDiseaseItem | null>(null);

  return (
    <>
      <Card className="p-0 border border-white/10 overflow-hidden mb-6">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Differential Diagnosis (Similar Conditions)
          </CardTitle>
          <CardDescription>Other candidate diseases evaluated by neural probability heads</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEFAULT_SIMILAR_DISEASES.map((disease) => (
              <div
                key={disease.name}
                className="glass-card p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[11px] font-mono border border-purple-500/30 font-bold">
                      {disease.confidence}% Match
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Evaluated</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                    {disease.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono italic mb-3">
                    {disease.scientificName}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {disease.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDisease(disease)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-200 text-xs font-semibold border border-white/10 transition-colors focus:outline-none"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {selectedDisease && (
        <Modal
          isOpen={!!selectedDisease}
          onClose={() => setSelectedDisease(null)}
          title={`Differential Diagnosis: ${selectedDisease.name}`}
        >
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="p-4 rounded-2xl glass border border-purple-500/30 space-y-1">
              <div className="text-xs font-mono text-purple-300 uppercase">Scientific Taxonomy</div>
              <div className="text-base font-bold text-white italic">{selectedDisease.scientificName}</div>
              <div className="text-xs font-mono text-purple-400">Match Certainty: {selectedDisease.confidence}%</div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-white">Pathogen Symptom Description</div>
              <p className="leading-relaxed text-xs text-slate-300">{selectedDisease.description}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="text-xs font-bold text-amber-300 uppercase">Differentiating Agronomic Factor</div>
              <p className="text-xs text-slate-200">{selectedDisease.differentiatingFactor}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
