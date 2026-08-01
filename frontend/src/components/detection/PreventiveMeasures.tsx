import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

interface PreventiveItem {
  id: string;
  label: string;
  category: string;
}

const DEFAULT_PREVENTIVE_ITEMS: PreventiveItem[] = [
  { id: 'p1', label: 'Avoid overhead watering to minimize leaf wetness duration', category: 'Irrigation Management' },
  { id: 'p2', label: 'Improve canopy ventilation with proper row and plant spacing', category: 'Air Flow & Climate' },
  { id: 'p3', label: 'Prune and safely burn infected lower leaf foliage immediately', category: 'Field Hygiene' },
  { id: 'p4', label: 'Monitor adjacent healthy plants every 48 hours for early spots', category: 'Field Surveillance' },
  { id: 'p5', label: 'Rotate crops with non-solanaceous species next growing season', category: 'Crop Rotation' },
];

export function PreventiveMeasures() {
  const [checkedIds, setCheckedIds] = useState<string[]>(['p1', 'p3']);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Card className="p-0 border border-white/10 overflow-hidden mb-6">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Preventive Agronomy Checklist
          </CardTitle>

          <span className="text-xs font-mono text-slate-400">
            {checkedIds.length} of {DEFAULT_PREVENTIVE_ITEMS.length} Completed
          </span>
        </div>
        <CardDescription>Proactive steps to protect surrounding yields</CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-3">
        {DEFAULT_PREVENTIVE_ITEMS.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-2xl glass border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                isChecked
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : 'border-white/20 bg-slate-900 text-transparent'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <span className={`text-xs sm:text-sm font-medium transition-colors ${
                    isChecked ? 'text-white line-through opacity-80' : 'text-slate-200'
                  }`}>
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                    {item.category}
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 font-bold hidden sm:inline-block">
                {isChecked ? 'COMPLETED' : 'PENDING'}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
