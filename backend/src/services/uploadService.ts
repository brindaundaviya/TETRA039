import type { ImageUploadMetadata, UploadedFile } from '../types/index.js';
import { ApiError } from '../utils/ApiError.js';
import {
  formatFileSize,
  generateSafeFileName,
  validateImageFile,
} from '../utils/fileValidator.js';
import { saveTempImage } from '../utils/tempStorage.js';

export class UploadService {
  /**
   * Processes, validates, and stores uploaded crop image temporarily for AI model inference.
   */
  public async processUpload(file?: UploadedFile): Promise<ImageUploadMetadata> {
    if (!file) {
      throw ApiError.badRequest('No image file provided in request');
    }

    // Comprehensive validation (Size, Extension, MIME, and Magic Bytes)
    const { detectedMimeType } = validateImageFile(
      file.originalname,
      file.mimetype,
      file.buffer
    );

    // Security: Generate safe UUID filename to prevent directory traversal
    const { uploadId, safeFileName } = generateSafeFileName(file.originalname);

    // Save image temporarily to backend temp storage
    await saveTempImage(safeFileName, file.buffer);

    const metadata: ImageUploadMetadata = {
      uploadId,
      fileName: safeFileName,
      fileSize: formatFileSize(file.size),
      mimeType: detectedMimeType,
      uploadedAt: new Date().toISOString(),
      status: 'READY_FOR_PREDICTION',
    };

    return metadata;
  }
}

export const uploadService = new UploadService();
