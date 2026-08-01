import type { StandardPredictionOutput } from '../interfaces/aiEngine.interface.js';
import type {
  DiseaseKnowledgeData,
  INextStepsGenerator,
  IRecommendationMerger,
  ISummaryGenerator,
  EnrichedPredictionOutput,
} from '../interfaces/advisory.interface.js';
import { defaultNextStepsGenerator } from './nextStepsGenerator.js';
import { defaultSummaryGenerator } from './summaryGenerator.js';

export class RecommendationMerger implements IRecommendationMerger {
  private readonly summaryGenerator: ISummaryGenerator;
  private readonly nextStepsGenerator: INextStepsGenerator;

  constructor(
    summaryGenerator: ISummaryGenerator = defaultSummaryGenerator,
    nextStepsGenerator: INextStepsGenerator = defaultNextStepsGenerator
  ) {
    this.summaryGenerator = summaryGenerator;
    this.nextStepsGenerator = nextStepsGenerator;
  }

  /**
   * Merge prediction result with structured knowledge data, generating summary & next steps.
   */
  public merge(
    prediction: StandardPredictionOutput,
    knowledge?: DiseaseKnowledgeData
  ): EnrichedPredictionOutput {
    // 1. Fallback knowledge defaults if knowledge data is omitted or null
    const fallbackKnowledge = this.getFallbackKnowledge(prediction.crop, prediction.disease);
    const activeKnowledge: DiseaseKnowledgeData = {
      symptoms: knowledge?.symptoms && knowledge.symptoms.length > 0 ? knowledge.symptoms : fallbackKnowledge.symptoms,
      treatment: knowledge?.treatment || fallbackKnowledge.treatment,
      organicAlternative: knowledge?.organicAlternative || fallbackKnowledge.organicAlternative,
      prevention: knowledge?.prevention && knowledge.prevention.length > 0 ? knowledge.prevention : fallbackKnowledge.prevention,
      recoveryTime: knowledge?.recoveryTime || fallbackKnowledge.recoveryTime,
    };

    // 2. Generate summary
    const summary = this.summaryGenerator.generateSummary(prediction);

    // 3. Generate practical next steps
    const nextSteps = this.nextStepsGenerator.generateNextSteps(prediction, activeKnowledge);

    // 4. Construct final enriched response
    return {
      crop: prediction.crop,
      disease: prediction.disease,
      confidence: prediction.confidence,
      confidenceCategory: prediction.confidenceCategory,
      risk: prediction.risk,
      summary,
      symptoms: activeKnowledge.symptoms,
      recommendedTreatment: activeKnowledge.treatment,
      organicAlternative: activeKnowledge.organicAlternative,
      prevention: activeKnowledge.prevention,
      recoveryTime: activeKnowledge.recoveryTime,
      nextSteps,
      processingTime: prediction.processingTime,
      topPredictions: prediction.topPredictions,
    };
  }

  /**
   * Generates clean fallback knowledge defaults for unknown or unmapped crops/diseases.
   */
  private getFallbackKnowledge(crop: string, disease: string): DiseaseKnowledgeData {
    const isHealthy = disease.toLowerCase().includes('healthy');

    if (isHealthy) {
      return {
        symptoms: ['Leaf exhibits uniform green color and healthy tissue structure'],
        treatment: 'No disease treatment required. Maintain current maintenance routine.',
        organicAlternative: 'Apply compost tea or organic seaweed extract to boost plant vigor.',
        prevention: [
          'Rotate crops periodically to preserve soil nutrients',
          'Maintain proper spacing and airflow between plants',
          'Practice sanitation by removing fallen leaves',
        ],
        recoveryTime: 'Immediate (Healthy state)',
      };
    }

    return {
      symptoms: [
        `Visible discoloration or leaf spots characteristic of ${disease}`,
        'Mild leaf wilting or localized tissue chlorosis',
      ],
      treatment: `Apply suitable protective spray or agricultural fungicide tailored for ${disease} on ${crop}.`,
      organicAlternative: 'Spray with neem oil solution, copper octanoate, or bio-fungicides containing Bacillus subtilis.',
      prevention: [
        'Practice 2-3 year crop rotation with non-host plant families',
        'Avoid overhead irrigation to keep plant foliage dry',
        'Prune lower leaves to enhance airflow near soil surface',
      ],
      recoveryTime: '7-14 days with prompt treatment',
    };
  }
}

export const defaultRecommendationMerger = new RecommendationMerger();
