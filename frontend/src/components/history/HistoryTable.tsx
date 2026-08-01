import { useState } from 'react';
import { Button } from '@/components/ui';
import type { HistoryPrediction, RiskLevel } from '@/types';
import { formatDate, formatPercentage } from '@/utils/helpers';

interface HistoryTableProps {
  predictions: HistoryPrediction[];
  onViewDetails: (prediction: HistoryPrediction) => void;
  onDeleteRecord: (id: string) => void;
}

export function HistoryTable({ predictions, onViewDetails, onDeleteRecord }: HistoryTableProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            High Risk
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Medium Risk
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Low Risk
          </span>
        );
      case 'Healthy':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Healthy
          </span>
        );
    }
  };

  return (
    <div className="relative">
      {/* Desktop & Tablet Glass Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-4 text-center w-16">Image</th>
              <th className="py-4 px-4">Crop</th>
              <th className="py-4 px-4">Disease / Diagnosis</th>
              <th className="py-4 px-4 text-center">Confidence</th>
              <th className="py-4 px-4 text-center">Risk Level</th>
              <th className="py-4 px-4 text-center">Detection Date</th>
              <th className="py-4 px-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm text-slate-200">
            {predictions.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-white/[0.03] transition-colors duration-150 group"
              >
                {/* Thumbnail Image */}
                <td className="py-3 px-4 text-center">
                  <div
                    className="relative w-12 h-12 mx-auto rounded-xl overflow-hidden border border-white/15 bg-slate-800 cursor-pointer shadow-md group-hover:scale-105 transition-transform"
                    onClick={() => onViewDetails(record)}
                    onMouseEnter={() => setHoveredImage(record.imageUrl)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={record.imageUrl}
                      alt={record.crop}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </td>

                {/* Crop Name */}
                <td className="py-3 px-4 font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-400" />
                    {record.crop}
                  </div>
                </td>

                {/* Disease Name & Scientific Subtext */}
                <td className="py-3 px-4">
                  <div className="font-medium text-slate-100">{record.disease}</div>
                  {record.scientificName && (
                    <div className="text-xs italic text-slate-400 mt-0.5">
                      {record.scientificName}
                    </div>
                  )}
                </td>

                {/* Confidence Bar */}
                <td className="py-3 px-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1 min-w-[90px]">
                    <span className="font-mono font-bold text-xs text-white">
                      {formatPercentage(record.confidence)}
                    </span>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-emerald-400 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(0, record.confidence))}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Risk Level Badge */}
                <td className="py-3 px-4 text-center">{getRiskBadge(record.risk)}</td>

                {/* Detection Date */}
                <td className="py-3 px-4 text-center text-xs text-slate-400 font-mono">
                  {formatDate(record.timestamp)}
                </td>

                {/* Action Buttons */}
                <td className="py-3 px-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(record)}
                      className="text-xs px-3 py-1 bg-white/5 hover:bg-primary-500/20 hover:border-primary-500/40 text-slate-200"
                    >
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteRecord(record.id)}
                      className="text-xs px-2.5 py-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                      title="Delete Prediction Record"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid View (Shown on small screens) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {predictions.map((record) => (
          <div
            key={record.id}
            className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-md space-y-3 shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={record.imageUrl}
                  alt={record.crop}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-white text-base">{record.crop}</h4>
                  <p className="text-sm text-slate-200">{record.disease}</p>
                  {record.scientificName && (
                    <p className="text-xs italic text-slate-400">{record.scientificName}</p>
                  )}
                </div>
              </div>
              <div>{getRiskBadge(record.risk)}</div>
            </div>

            <div className="flex items-center justify-between text-xs py-2 border-y border-white/5 font-mono">
              <span className="text-slate-400">Confidence: <strong className="text-white">{formatPercentage(record.confidence)}</strong></span>
              <span className="text-slate-400">{formatDate(record.timestamp)}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(record)}
                className="text-xs flex-1"
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteRecord(record.id)}
                className="text-xs text-red-400 hover:bg-red-500/10"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Floating HD Image Hover Lightbox Preview */}
      {hoveredImage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-2 rounded-2xl bg-slate-950/90 border border-white/20 shadow-2xl backdrop-blur-xl pointer-events-none transition-all duration-200 animate-fade-in hidden lg:block">
          <img
            src={hoveredImage}
            alt="Hover Preview"
            className="w-48 h-36 object-cover rounded-xl border border-white/10"
          />
          <div className="text-[10px] text-center text-slate-400 mt-1 font-mono uppercase tracking-wider">
            Click row for full report details
          </div>
        </div>
      )}
    </div>
  );
}
