import { useState, useCallback, useMemo, useEffect } from 'react';
import { historyService } from '@/services/historyService';
import type {
  HistoryPrediction,
  HistoryFilterState,
  HistorySummaryStats,
} from '@/types';

const DEFAULT_FILTERS: HistoryFilterState = {
  search: '',
  crop: 'ALL',
  disease: 'ALL',
  risk: 'ALL',
  confidenceRange: 'ALL',
  dateRange: 'ALL',
  sortBy: 'date_desc',
};

export function useHistory() {
  const [predictions, setPredictions] = useState<HistoryPrediction[]>([]);
  const [filters, setFilters] = useState<HistoryFilterState>(DEFAULT_FILTERS);
  const [selectedPrediction, setSelectedPrediction] = useState<HistoryPrediction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load predictions on mount
  const refreshHistory = useCallback(() => {
    const data = historyService.getPredictions();
    setPredictions(data);
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  // Filter & Sort Logic
  const filteredPredictions = useMemo(() => {
    return predictions
      .filter((item) => {
        // Search filter (crop, disease, scientific name, ID)
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          const matchCrop = item.crop.toLowerCase().includes(q);
          const matchDisease = item.disease.toLowerCase().includes(q);
          const matchSci = item.scientificName?.toLowerCase().includes(q) || false;
          const matchId = item.id.toLowerCase().includes(q);
          if (!matchCrop && !matchDisease && !matchSci && !matchId) return false;
        }

        // Crop filter
        if (filters.crop !== 'ALL' && item.crop.toLowerCase() !== filters.crop.toLowerCase()) {
          return false;
        }

        // Disease filter
        if (filters.disease !== 'ALL' && item.disease.toLowerCase() !== filters.disease.toLowerCase()) {
          return false;
        }

        // Risk filter
        if (filters.risk !== 'ALL' && item.risk.toLowerCase() !== filters.risk.toLowerCase()) {
          return false;
        }

        // Confidence range filter
        if (filters.confidenceRange !== 'ALL') {
          if (filters.confidenceRange === 'HIGH' && item.confidence < 90) return false;
          if (filters.confidenceRange === 'MEDIUM' && (item.confidence < 75 || item.confidence >= 90)) return false;
          if (filters.confidenceRange === 'LOW' && item.confidence >= 75) return false;
        }

        // Date range filter
        if (filters.dateRange !== 'ALL') {
          const recordTime = new Date(item.timestamp).getTime();
          const now = Date.now();
          const oneDay = 24 * 60 * 60 * 1000;
          if (filters.dateRange === 'TODAY' && now - recordTime > oneDay) return false;
          if (filters.dateRange === 'WEEK' && now - recordTime > 7 * oneDay) return false;
          if (filters.dateRange === 'MONTH' && now - recordTime > 30 * oneDay) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date_desc') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        if (filters.sortBy === 'date_asc') {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
        if (filters.sortBy === 'confidence_desc') {
          return b.confidence - a.confidence;
        }
        if (filters.sortBy === 'confidence_asc') {
          return a.confidence - b.confidence;
        }
        if (filters.sortBy === 'crop_asc') {
          return a.crop.localeCompare(b.crop);
        }
        return 0;
      });
  }, [predictions, filters]);

  // Overall Statistics computed from full history dataset
  const stats = useMemo<HistorySummaryStats>(() => {
    const totalPredictions = predictions.length;
    const healthyPlants = predictions.filter((p) => p.risk === 'Healthy').length;
    const diseasedPlants = totalPredictions - healthyPlants;
    const totalConf = predictions.reduce((acc, curr) => acc + curr.confidence, 0);
    const averageConfidence = totalPredictions > 0 ? totalConf / totalPredictions : 0;

    return {
      totalPredictions,
      healthyPlants,
      diseasedPlants,
      averageConfidence,
    };
  }, [predictions]);

  // Unique options for filter select dropdowns
  const availableCrops = useMemo(() => {
    const set = new Set(predictions.map((p) => p.crop));
    return Array.from(set).sort();
  }, [predictions]);

  const availableDiseases = useMemo(() => {
    const set = new Set(predictions.map((p) => p.disease));
    return Array.from(set).sort();
  }, [predictions]);

  // Filter setters
  const setFilter = useCallback(<K extends keyof HistoryFilterState>(key: K, value: HistoryFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Modal actions
  const openDetailModal = useCallback((record: HistoryPrediction) => {
    setSelectedPrediction(record);
    setIsDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedPrediction(null);
  }, []);

  // Record CRUD actions
  const deleteRecord = useCallback(
    (id: string) => {
      const updated = historyService.deletePrediction(id);
      setPredictions(updated);
      showToast('Prediction record deleted successfully.');
      if (selectedPrediction?.id === id) {
        closeDetailModal();
      }
      setDeleteCandidateId(null);
    },
    [selectedPrediction, closeDetailModal, showToast]
  );

  const clearAll = useCallback(() => {
    historyService.clearAllHistory();
    setPredictions([]);
    showToast('All prediction records have been cleared.');
    closeDetailModal();
  }, [closeDetailModal, showToast]);

  const seedSampleData = useCallback(() => {
    const samples = historyService.seedSampleData();
    setPredictions(samples);
    showToast('Demo dataset loaded successfully!');
  }, [showToast]);

  const exportCSV = useCallback(() => {
    if (filteredPredictions.length === 0) {
      showToast('No records available to export.');
      return;
    }
    historyService.exportToCSV(filteredPredictions);
    showToast(`Exported ${filteredPredictions.length} predictions to CSV.`);
  }, [filteredPredictions, showToast]);

  const exportPDF = useCallback(
    (targetRecord?: HistoryPrediction) => {
      const record = targetRecord || selectedPrediction;
      if (record) {
        showToast(`Preparing PDF report for ${record.crop} - ${record.disease}...`);
        setTimeout(() => {
          window.print();
        }, 300);
      } else {
        showToast('Preparing summary PDF report...');
        setTimeout(() => {
          window.print();
        }, 300);
      }
    },
    [selectedPrediction, showToast]
  );

  const shareRecord = useCallback(
    (record: HistoryPrediction) => {
      const shareText = `CropGuard AI Diagnosis:\nCrop: ${record.crop}\nDisease: ${record.disease}\nConfidence: ${record.confidence}%\nRisk: ${record.risk}\nRecommendation: ${record.recommendation}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText);
        showToast('Diagnosis report copied to clipboard!');
      } else {
        showToast('Share payload generated successfully.');
      }
    },
    [showToast]
  );

  const isFilterActive = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.crop !== 'ALL' ||
      filters.disease !== 'ALL' ||
      filters.risk !== 'ALL' ||
      filters.confidenceRange !== 'ALL' ||
      filters.dateRange !== 'ALL' ||
      filters.sortBy !== 'date_desc'
    );
  }, [filters]);

  return {
    predictions,
    filteredPredictions,
    stats,
    filters,
    availableCrops,
    availableDiseases,
    selectedPrediction,
    isDetailModalOpen,
    deleteCandidateId,
    toastMessage,
    isFilterActive,
    setFilter,
    resetFilters,
    openDetailModal,
    closeDetailModal,
    setDeleteCandidateId,
    deleteRecord,
    clearAll,
    seedSampleData,
    exportCSV,
    exportPDF,
    shareRecord,
    refreshHistory,
  };
}
