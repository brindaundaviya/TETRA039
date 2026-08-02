import { Modal, ModalFooter, Button } from '@/components/ui';
import type { HistoryPrediction } from '@/types';
import { formatDate, formatPercentage } from '@/utils/helpers';

interface PredictionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: HistoryPrediction | null;
  onDelete: (id: string) => void;
  onExportPDF: (record: HistoryPrediction) => void;
}

export function PredictionDetailModal({
  isOpen,
  onClose,
  prediction,
  onDelete,
  onExportPDF,
}: PredictionDetailModalProps) {
  if (!prediction) return null;

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'High':
        return (
          <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs">
            High Risk Factor
          </span>
        );
      case 'Medium':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs">
            Medium Risk Factor
          </span>
        );
      case 'Low':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold text-xs">
            Low Risk Factor
          </span>
        );
      case 'Healthy':
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
            Pathogen Free (Healthy)
          </span>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Field scan report"
      description={`Saved scan record ${prediction.id}`}
      size="lg"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Top Header Grid: Leaf Image & Classification Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start p-4 rounded-2xl bg-white/5 border border-white/10">
          {/* Leaf Thumbnail Preview */}
          <div className="md:col-span-5 relative group rounded-xl overflow-hidden border border-white/15 bg-black/40 aspect-video md:aspect-square">
            <img
              src={prediction.imageUrl}
              alt={prediction.crop}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-slate-300">
              <span>Field photo</span>
              <span>Clear view</span>
            </div>
          </div>

          {/* Classification Stats */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Target Crop: <strong className="text-white">{prediction.crop}</strong>
              </span>
              {getRiskBadge(prediction.risk)}
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">{prediction.disease}</h3>
              {prediction.scientificName && (
                <p className="text-sm italic text-slate-400 mt-0.5">
                  Scientific Name: {prediction.scientificName}
                </p>
              )}
            </div>

            {/* Confidence Score Bar */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-slate-400">Confidence score</span>
                <span className="font-mono text-primary-400 font-bold text-sm">
                  {formatPercentage(prediction.confidence)}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-emerald-400 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, prediction.confidence))}%` }}
                />
              </div>
            </div>

            {/* Technical Parameters */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-1">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-[10px] text-slate-500">CHECKED ON</span>
                <span className="text-slate-200 text-[11px]">
                  {formatDate(prediction.timestamp)}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-[10px] text-slate-500">SCAN VERSION</span>
                <span className="text-emerald-400 font-semibold text-[11px]">
                  {prediction.modelVersion || 'CropGuard-Vision-v2.4'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Summary & Recommendations */}
        <div className="p-4 rounded-2xl bg-primary-950/20 border border-primary-500/20 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            What to do next
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {prediction.recommendation}
          </p>
        </div>

        {/* Detailed Solutions (Immediate, Organic, Chemical) */}
        {(prediction.immediateAction || prediction.organicSolution || prediction.chemicalSolution) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {prediction.immediateAction && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-amber-400">Immediate Action</span>
                <p className="text-xs text-slate-300">{prediction.immediateAction}</p>
              </div>
            )}
            {prediction.organicSolution && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-emerald-400">Organic Remedy</span>
                <p className="text-xs text-slate-300">{prediction.organicSolution}</p>
              </div>
            )}
            {prediction.chemicalSolution && (
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] font-semibold uppercase text-cyan-400">Chemical Spray</span>
                <p className="text-xs text-slate-300">{prediction.chemicalSolution}</p>
              </div>
            )}
          </div>
        )}

        {/* Preventive Measures Checklist */}
        {prediction.prevention && prediction.prevention.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Extra care for the field
            </h4>
            <ul className="space-y-2">
              {prediction.prevention.map((measure, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(prediction.id)}
          className="text-xs bg-red-600/80 hover:bg-red-600"
        >
          Delete Record
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportPDF(prediction)}
          className="text-xs"
        >
          Export PDF Report
        </Button>
        <Button variant="primary" size="sm" onClick={onClose} className="text-xs">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
