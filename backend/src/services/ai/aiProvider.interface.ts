import type { AiPredictionData } from '../../types/index.js';

export interface PredictionInput {
  uploadId?: string;
  imagePath?: string;
  imageBuffer?: Buffer;
  mimeType?: string;
  cropHint?: string;
}

export interface IAiPredictionProvider {
  readonly providerName: string;
  predict(input: PredictionInput): Promise<AiPredictionData>;
}
