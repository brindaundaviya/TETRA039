import path from 'node:path';
import crypto from 'node:crypto';
import { ApiError } from './ApiError.js';

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
]);

export const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

/**
 * Checks magic bytes to verify actual image file structure.
 * Prevents malicious files disguised with valid extensions/headers.
 */
export function validateMagicBytes(buffer: Buffer): 'image/jpeg' | 'image/png' | null {
  if (!buffer || buffer.length < 8) {
    return null;
  }

  // JPEG magic bytes: 0xFF 0xD8 0xFF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }

  // PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }

  return null;
}

/**
 * Validates file extension, size, MIME type, and magic bytes.
 */
export function validateImageFile(
  originalname: string,
  mimetype: string,
  buffer: Buffer
): { detectedMimeType: string; sanitizedExtension: string } {
  if (!buffer || buffer.length === 0) {
    throw ApiError.badRequest('Uploaded image file is empty or corrupted');
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw ApiError.badRequest(
      `File size exceeds maximum allowed limit of 5 MB (received ${formatFileSize(buffer.length)})`
    );
  }

  // Validate File Extension
  const ext = path.extname(originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw ApiError.badRequest(
      `Unsupported file extension '${ext || 'none'}'. Only JPG, JPEG, and PNG images are supported`
    );
  }

  // Validate MIME Type
  const normalizedMime = mimetype.toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(normalizedMime)) {
    throw ApiError.badRequest(
      `Unsupported MIME type '${mimetype}'. Only image/jpeg, image/jpg, and image/png are supported`
    );
  }

  // Validate Magic Bytes Signature
  const detectedMime = validateMagicBytes(buffer);
  if (!detectedMime) {
    throw ApiError.badRequest(
      'Corrupted or invalid image payload. File content does not match a valid JPG or PNG image'
    );
  }

  return {
    detectedMimeType: detectedMime,
    sanitizedExtension: ext,
  };
}

/**
 * Generates a safe, non-guessable filename using crypto UUID to prevent directory traversal.
 */
export function generateSafeFileName(originalName: string): { uploadId: string; safeFileName: string } {
  const uploadId = crypto.randomUUID();
  const rawExt = path.extname(originalName).toLowerCase();
  const ext = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : '.jpg';
  const safeFileName = `${uploadId}${ext}`;
  return { uploadId, safeFileName };
}

/**
 * Formats byte size into human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${value} ${sizes[i]}`;
}
