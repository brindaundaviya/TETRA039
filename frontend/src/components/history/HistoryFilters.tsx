import { Input, Select, Button } from '@/components/ui';
import type { HistoryFilterState } from '@/types';

interface HistoryFiltersProps {
  filters: HistoryFilterState;
  availableCrops: string[];
  availableDiseases: string[];
  isFilterActive: boolean;
  onFilterChange: <K extends keyof HistoryFilterState>(key: K, value: HistoryFilterState[K]) => void;
  onResetFilters: () => void;
  resultCount: number;
}

export function HistoryFilters({
  filters,
  availableCrops,
  availableDiseases,
  isFilterActive,
  onFilterChange,
  onResetFilters,
  resultCount,
}: HistoryFiltersProps) {
  const cropOptions = [
    { value: 'ALL', label: 'All Crops' },
    ...availableCrops.map((c) => ({ value: c, label: c })),
  ];

  const diseaseOptions = [
    { value: 'ALL', label: 'All Diseases' },
    ...availableDiseases.map((d) => ({ value: d, label: d })),
  ];

  const riskOptions = [
    { value: 'ALL', label: 'All Risk Levels' },
    { value: 'High', label: 'High Risk' },
    { value: 'Medium', label: 'Medium Risk' },
    { value: 'Low', label: 'Low Risk' },
    { value: 'Healthy', label: 'Healthy' },
  ];

  const confidenceOptions = [
    { value: 'ALL', label: 'All Confidence Scores' },
    { value: 'HIGH', label: 'High Confidence (≥ 90%)' },
    { value: 'MEDIUM', label: 'Moderate (75% - 89%)' },
    { value: 'LOW', label: 'Lower (< 75%)' },
  ];

  const dateOptions = [
    { value: 'ALL', label: 'All Time' },
    { value: 'TODAY', label: 'Last 24 Hours' },
    { value: 'WEEK', label: 'Last 7 Days' },
    { value: 'MONTH', label: 'Last 30 Days' },
  ];

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'confidence_desc', label: 'Highest Confidence' },
    { value: 'confidence_asc', label: 'Lowest Confidence' },
    { value: 'crop_asc', label: 'Crop Name (A-Z)' },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-xl mb-6 space-y-4">
      {/* Top Row: Search Input & Quick Info */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Input
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search prediction by crop, disease, scientific name..."
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
          <span className="font-medium text-slate-300">
            Showing <strong className="text-white font-semibold">{resultCount}</strong> record{resultCount === 1 ? '' : 's'}
          </span>
          {isFilterActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-xs text-primary-400 hover:text-primary-300 p-0 hover:bg-transparent"
            >
              Reset Filters ↺
            </Button>
          )}
        </div>
      </div>

      {/* Grid of Filter Select Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2 border-t border-white/5">
        {/* Crop Filter */}
        <Select
          value={filters.crop}
          onChange={(e) => onFilterChange('crop', e.target.value)}
          options={cropOptions}
        />

        {/* Disease Filter */}
        <Select
          value={filters.disease}
          onChange={(e) => onFilterChange('disease', e.target.value)}
          options={diseaseOptions}
        />

        {/* Risk Level Filter */}
        <Select
          value={filters.risk}
          onChange={(e) => onFilterChange('risk', e.target.value)}
          options={riskOptions}
        />

        {/* Confidence Filter */}
        <Select
          value={filters.confidenceRange}
          onChange={(e) => onFilterChange('confidenceRange', e.target.value as any)}
          options={confidenceOptions}
        />

        {/* Date Range Filter */}
        <Select
          value={filters.dateRange}
          onChange={(e) => onFilterChange('dateRange', e.target.value as any)}
          options={dateOptions}
        />

        {/* Sorting Selector */}
        <Select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value as any)}
          options={sortOptions}
        />
      </div>
    </div>
  );
}
