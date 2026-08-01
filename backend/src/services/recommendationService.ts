import { DISEASE_KNOWLEDGE_BASE, SUPPORTED_CROPS } from '../data/cropKnowledgeBase.js';
import type { RecommendationRequestPayload, RecommendationResponseData } from '../types/index.js';
import { ApiError } from '../utils/ApiError.js';

export class RecommendationService {
  /**
   * Generates structured agricultural advice based on crop and disease names.
   */
  public async getRecommendation(
    payload: RecommendationRequestPayload
  ): Promise<RecommendationResponseData> {
    const { crop, disease } = payload;

    if (!crop || !crop.trim() || !disease || !disease.trim()) {
      throw ApiError.badRequest('Both "crop" and "disease" parameters are required');
    }

    const normCropInput = crop.trim().toLowerCase();
    const normDiseaseInput = disease.trim().toLowerCase();

    // 1. Verify Crop Support
    const matchedCrop = SUPPORTED_CROPS.find(
      (c) =>
        c.name.toLowerCase() === normCropInput ||
        c.name.toLowerCase().includes(normCropInput) ||
        normCropInput.includes(c.name.toLowerCase())
    );

    if (!matchedCrop) {
      const availableCrops = SUPPORTED_CROPS.map((c) => c.name).join(', ');
      throw ApiError.notFound(
        `Crop '${crop}' is not supported in the knowledge base. Supported crops: ${availableCrops}`
      );
    }

    // 2. Query Disease Metadata for the matched Crop
    const cropDiseases = DISEASE_KNOWLEDGE_BASE.filter(
      (d) => d.cropName.toLowerCase() === matchedCrop.name.toLowerCase()
    );

    const matchedDisease = cropDiseases.find(
      (d) =>
        d.diseaseName.toLowerCase() === normDiseaseInput ||
        d.diseaseName.toLowerCase().includes(normDiseaseInput) ||
        normDiseaseInput.includes(d.diseaseName.toLowerCase())
    );

    if (!matchedDisease) {
      const availableDiseases = cropDiseases.map((d) => d.diseaseName).join(', ');
      throw ApiError.notFound(
        `Disease '${disease}' was not found for crop '${matchedCrop.name}'. Available diseases: ${availableDiseases || 'None'}`
      );
    }

    // Return structured recommendation data payload
    return {
      crop: matchedCrop.name,
      disease: matchedDisease.diseaseName,
      severity: matchedDisease.severity,
      cause: matchedDisease.cause,
      symptoms: matchedDisease.symptoms,
      immediateAction: matchedDisease.immediateAction,
      treatment: matchedDisease.treatment,
      organicAlternative: matchedDisease.organicAlternative,
      prevention: matchedDisease.prevention,
      recoveryTime: matchedDisease.recoveryTime,
    };
  }
}

export const recommendationService = new RecommendationService();
