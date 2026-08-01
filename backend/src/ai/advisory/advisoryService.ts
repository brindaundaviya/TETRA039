import type { StandardPredictionOutput } from '../interfaces/aiEngine.interface.js';
import type {
  DiseaseKnowledgeData,
  EnrichedPredictionOutput,
  IAdvisoryEnrichmentService,
  IRecommendationMerger,
} from '../interfaces/advisory.interface.js';
import { defaultRecommendationMerger } from './recommendationMerger.js';

export class AdvisoryEnrichmentService implements IAdvisoryEnrichmentService {
  private readonly merger: IRecommendationMerger;

  constructor(merger: IRecommendationMerger = defaultRecommendationMerger) {
    this.merger = merger;
  }

  /**
   * Enrich raw prediction output with structured recommendation knowledge data,
   * diagnostic summary, and actionable next steps.
   */
  public enrich(
    prediction: StandardPredictionOutput,
    knowledge?: DiseaseKnowledgeData
  ): EnrichedPredictionOutput {
    return this.merger.merge(prediction, knowledge);
  }
}

export const defaultAdvisoryEnrichmentService = new AdvisoryEnrichmentService();
