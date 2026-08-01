import type { StandardPredictionOutput } from './aiEngine.interface.js';

/**
 * Structured disease knowledge record supplied by backend recommendation provider or database.
 */
export interface DiseaseKnowledgeData {
  symptoms: string[];
  treatment: string;
  organicAlternative: string;
  prevention: string[];
  recoveryTime: string;
}

/**
 * Final Enriched AI Output Schema as mandated by CropGuard AI specification.
 */
export interface EnrichedPredictionOutput extends StandardPredictionOutput {
  summary: string;
  symptoms: string[];
  recommendedTreatment: string;
  organicAlternative: string;
  prevention: string[];
  recoveryTime: string;
  nextSteps: string[];
}

/**
 * Interface for concise summary generator.
 */
export interface ISummaryGenerator {
  generateSummary(prediction: StandardPredictionOutput): string;
}

/**
 * Interface for actionable next steps generator.
 */
export interface INextStepsGenerator {
  generateNextSteps(prediction: StandardPredictionOutput, knowledge?: DiseaseKnowledgeData): string[];
}

/**
 * Interface for recommendation merger.
 */
export interface IRecommendationMerger {
  merge(prediction: StandardPredictionOutput, knowledge?: DiseaseKnowledgeData): EnrichedPredictionOutput;
}

/**
 * Interface for AI Advisory Enrichment Service.
 */
export interface IAdvisoryEnrichmentService {
  enrich(prediction: StandardPredictionOutput, knowledge?: DiseaseKnowledgeData): EnrichedPredictionOutput;
}
