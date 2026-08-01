import { MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { useHistory } from '@/hooks';
import {
  SummaryCards,
  ExportHeaderActions,
  HistoryFilters,
  HistoryTable,
  PredictionDetailModal,
  EmptyState,
} from '@/components/history';

export function HistoryPage() {
  const {
    predictions,
    filteredPredictions,
    stats,
    filters,
    availableCrops,
    availableDiseases,
    selectedPrediction,
    isDetailModalOpen,
    toastMessage,
    isFilterActive,
    setFilter,
    resetFilters,
    openDetailModal,
    closeDetailModal,
    deleteRecord,
    clearAll,
    seedSampleData,
    exportCSV,
    exportPDF,
    shareRecord,
  } = useHistory();

  const handleShare = () => {
    if (selectedPrediction) {
      shareRecord(selectedPrediction);
    } else if (filteredPredictions.length > 0) {
      shareRecord(filteredPredictions[0]);
    }
  };

  return (
    <MainLayout title="Prediction History">
      <div className="space-y-6 pb-12">
        {/* Toast Feedback Notification Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-primary-500/40 text-white text-sm shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Section 1: Page Header */}
        <PageHeader
          title="Prediction History & Reports"
          subtitle="Review previous AI classifications, inspect confidence metrics, filter diagnoses, and export agronomic reports."
        />

        {/* Section 2: Summary Metric Cards */}
        <SummaryCards stats={stats} />

        {/* Section 3: Global Action Bar (CSV, PDF, Share, Clear) */}
        <ExportHeaderActions
          onExportCSV={exportCSV}
          onExportPDF={() => exportPDF()}
          onShare={handleShare}
          onClearAll={clearAll}
          onSeedData={seedSampleData}
          hasRecords={predictions.length > 0}
        />

        {/* Section 4: Filters & Main Content */}
        {predictions.length === 0 ? (
          <EmptyState onSeedData={seedSampleData} />
        ) : (
          <div className="space-y-4">
            {/* Filter Control Bar */}
            <HistoryFilters
              filters={filters}
              availableCrops={availableCrops}
              availableDiseases={availableDiseases}
              isFilterActive={isFilterActive}
              onFilterChange={setFilter}
              onResetFilters={resetFilters}
              resultCount={filteredPredictions.length}
            />

            {/* Table or Filtered Empty State */}
            {filteredPredictions.length === 0 ? (
              <EmptyState
                onSeedData={seedSampleData}
                isFilteredEmpty
                onResetFilters={resetFilters}
              />
            ) : (
              <HistoryTable
                predictions={filteredPredictions}
                onViewDetails={openDetailModal}
                onDeleteRecord={deleteRecord}
              />
            )}
          </div>
        )}

        {/* Section 5: Prediction Detail Modal */}
        <PredictionDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          prediction={selectedPrediction}
          onDelete={deleteRecord}
          onExportPDF={exportPDF}
        />
      </div>
    </MainLayout>
  );
}
