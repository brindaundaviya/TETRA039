import fs from 'node:fs/promises';
import path from 'node:path';
import { ApiError } from './ApiError.js';
import { logger } from './logger.js';

export const TEMP_UPLOADS_DIR = path.resolve(process.cwd(), 'src/temp/uploads');

/**
 * Ensures the temporary upload directory exists securely.
 */
export async function ensureTempUploadDir(): Promise<string> {
  try {
    await fs.mkdir(TEMP_UPLOADS_DIR, { recursive: true });
    return TEMP_UPLOADS_DIR;
  } catch (error) {
    logger.error('Failed to create temporary upload directory', { error });
    throw ApiError.internal('Unable to initialize upload storage');
  }
}

/**
 * Writes upload buffer to a safe temporary file path.
 */
export async function saveTempImage(safeFileName: string, buffer: Buffer): Promise<string> {
  const uploadDir = await ensureTempUploadDir();
  
  // Prevent Path Traversal
  const targetPath = path.join(uploadDir, safeFileName);
  const normalizedTarget = path.normalize(targetPath);

  if (!normalizedTarget.startsWith(uploadDir)) {
    throw ApiError.badRequest('Invalid destination path detected');
  }

  try {
    await fs.writeFile(normalizedTarget, buffer);
    logger.info(`Saved temporary image file`, { safeFileName, size: buffer.length });
    return normalizedTarget;
  } catch (error) {
    logger.error('Error writing file to temporary storage', { safeFileName, error });
    throw ApiError.internal('Failed to store uploaded file');
  }
}

/**
 * Removes a temporary file safely.
 */
export async function removeTempImage(filePath: string): Promise<void> {
  try {
    const uploadDir = await ensureTempUploadDir();
    const normalizedPath = path.normalize(filePath);
    if (normalizedPath.startsWith(uploadDir)) {
      await fs.unlink(normalizedPath);
      logger.info(`Cleaned up temp file: ${path.basename(normalizedPath)}`);
    }
  } catch (error) {
    logger.warn(`Failed to clean up temp file: ${filePath}`, { error });
  }
}
