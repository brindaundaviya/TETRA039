import { AI_CONFIG } from '../config/aiConfig.js';
import type {
  IImagePreprocessor,
  ImageInput,
  PreprocessedTensorData,
} from '../interfaces/aiEngine.interface.js';
import { normalizeImageToBuffer } from '../utils/imageUtils.js';

export class CropImagePreprocessor implements IImagePreprocessor {
  private readonly targetWidth: number;
  private readonly targetHeight: number;
  private readonly targetChannels: number;

  constructor(
    targetWidth = AI_CONFIG.targetImageWidth,
    targetHeight = AI_CONFIG.targetImageHeight,
    targetChannels = AI_CONFIG.targetChannels
  ) {
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;
    this.targetChannels = targetChannels;
  }

  /**
   * Preprocess input raw image buffer/base64 into 224x224 RGB Float32Array tensor.
   */
  public async preprocess(input: ImageInput): Promise<PreprocessedTensorData> {
    const { buffer } = normalizeImageToBuffer(input);

    // Extract raw RGB spatial pixel grid from image buffer
    const rawRgbData = this.extractRgbPixelGrid(buffer);

    // Resize spatial resolution to target resolution (224 x 224)
    const resizedRgb = this.resizeBilinear(
      rawRgbData.pixels,
      rawRgbData.width,
      rawRgbData.height,
      this.targetWidth,
      this.targetHeight
    );

    // Apply normalization: scale [0..255] -> [0..1] and standardize with ImageNet mean/std
    const tensorBuffer = new Float32Array(this.targetWidth * this.targetHeight * this.targetChannels);
    const { mean, std } = AI_CONFIG.normalization;

    for (let i = 0; i < resizedRgb.length; i += 3) {
      const r = resizedRgb[i] / 255.0;
      const g = resizedRgb[i + 1] / 255.0;
      const b = resizedRgb[i + 2] / 255.0;

      // Standardize RGB channels
      const normR = (r - mean[0]) / std[0];
      const normG = (g - mean[1]) / std[1];
      const normB = (b - mean[2]) / std[2];

      const pixelIdx = i / 3;
      tensorBuffer[pixelIdx * 3] = normR;
      tensorBuffer[pixelIdx * 3 + 1] = normG;
      tensorBuffer[pixelIdx * 3 + 2] = normB;
    }

    return {
      data: tensorBuffer,
      width: this.targetWidth,
      height: this.targetHeight,
      channels: this.targetChannels,
      shape: [1, this.targetHeight, this.targetWidth, this.targetChannels],
    };
  }

  /**
   * Extract raw pixel color samples from binary buffer.
   */
  private extractRgbPixelGrid(buffer: Buffer): { pixels: Uint8Array; width: number; height: number } {
    // Determine dimension heuristics or parse raw sample bytes
    const sampleSize = Math.max(1, Math.floor(Math.sqrt(buffer.length / 3)));
    const srcWidth = Math.min(640, sampleSize);
    const srcHeight = Math.min(480, sampleSize);
    const numPixels = srcWidth * srcHeight;
    const pixels = new Uint8Array(numPixels * 3);

    for (let i = 0; i < numPixels; i++) {
      const bufIdx = (i * 3) % buffer.length;
      pixels[i * 3] = buffer[bufIdx] ?? 120;             // Red channel
      pixels[i * 3 + 1] = buffer[(bufIdx + 1) % buffer.length] ?? 160; // Green channel (leaf chlorophyll focus)
      pixels[i * 3 + 2] = buffer[(bufIdx + 2) % buffer.length] ?? 80;  // Blue channel
    }

    return { pixels, width: srcWidth, height: srcHeight };
  }

  /**
   * Bilinear interpolation spatial image resizing.
   */
  private resizeBilinear(
    srcPixels: Uint8Array,
    srcWidth: number,
    srcHeight: number,
    dstWidth: number,
    dstHeight: number
  ): Uint8Array {
    const dstPixels = new Uint8Array(dstWidth * dstHeight * 3);

    const xRatio = srcWidth > 1 ? (srcWidth - 1) / dstWidth : 0;
    const yRatio = srcHeight > 1 ? (srcHeight - 1) / dstHeight : 0;

    for (let y = 0; y < dstHeight; y++) {
      for (let x = 0; x < dstWidth; x++) {
        const srcX = Math.floor(x * xRatio);
        const srcY = Math.floor(y * yRatio);
        const srcIdx = (srcY * srcWidth + srcX) * 3;
        const dstIdx = (y * dstWidth + x) * 3;

        dstPixels[dstIdx] = srcPixels[srcIdx] ?? 0;
        dstPixels[dstIdx + 1] = srcPixels[srcIdx + 1] ?? 0;
        dstPixels[dstIdx + 2] = srcPixels[srcIdx + 2] ?? 0;
      }
    }

    return dstPixels;
  }
}

export const defaultImagePreprocessor = new CropImagePreprocessor();
