import type { NextFunction, Request, Response } from 'express';
import type { UploadedFile } from '../types/index.js';
import { ApiError } from '../utils/ApiError.js';
import { MAX_FILE_SIZE_BYTES } from '../utils/fileValidator.js';

/**
 * Parses raw incoming request body stream into Buffer cleanly.
 */
function readStreamBuffer(req: Request, maxLimit: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let totalSize = 0;
    let isOverLimit = false;

    req.on('data', (chunk: Buffer) => {
      totalSize += chunk.length;
      if (totalSize > maxLimit) {
        isOverLimit = true;
      }
      if (!isOverLimit) {
        chunks.push(chunk);
      }
    });

    req.on('end', () => {
      if (isOverLimit) {
        return reject(
          ApiError.badRequest('File size exceeds maximum allowed limit of 5 MB')
        );
      }
      resolve(Buffer.concat(chunks));
    });

    req.on('error', (err) => {
      reject(ApiError.badRequest(`Failed to read upload stream: ${err.message}`));
    });
  });
}

/**
 * Native multipart/form-data parser for single image upload.
 */
function parseMultipartFormData(bodyBuffer: Buffer, boundary: string): UploadedFile[] {
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const parts: UploadedFile[] = [];

  let start = 0;
  while (start < bodyBuffer.length) {
    const boundaryIndex = bodyBuffer.indexOf(boundaryBuffer, start);
    if (boundaryIndex === -1) break;

    const nextBoundaryIndex = bodyBuffer.indexOf(boundaryBuffer, boundaryIndex + boundaryBuffer.length);
    if (nextBoundaryIndex === -1) break;

    const partBuffer = bodyBuffer.subarray(
      boundaryIndex + boundaryBuffer.length,
      nextBoundaryIndex
    );

    // Find headers and body delimiter (\r\n\r\n)
    const headerEndIndex = partBuffer.indexOf('\r\n\r\n');
    if (headerEndIndex !== -1) {
      const headerStr = partBuffer.subarray(0, headerEndIndex).toString('utf8');
      // Strip trailing \r\n from content body
      let contentBuffer = partBuffer.subarray(headerEndIndex + 4);
      if (contentBuffer.length >= 2 && contentBuffer[contentBuffer.length - 2] === 13 && contentBuffer[contentBuffer.length - 1] === 10) {
        contentBuffer = contentBuffer.subarray(0, contentBuffer.length - 2);
      }

      const filenameMatch = headerStr.match(/filename="([^"]+)"/i);
      const contentTypeMatch = headerStr.match(/content-type:\s*([^\r\n;]+)/i);

      if (filenameMatch && filenameMatch[1]) {
        const originalname = filenameMatch[1].trim();
        const mimetype = contentTypeMatch ? contentTypeMatch[1].trim().toLowerCase() : 'application/octet-stream';
        parts.push({
          originalname,
          mimetype,
          buffer: contentBuffer,
          size: contentBuffer.length,
        });
      }
    }

    start = nextBoundaryIndex;
  }

  return parts;
}

/**
 * Express middleware for single image file upload processing.
 */
export async function uploadSingleImage(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const contentType = req.headers['content-type'] || '';

    // Case 1: Check if body was already parsed by express.json/urlencoded or imageBase64 payload in JSON
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      if (req.body.imageBase64) {
        const rawBase64 = req.body.imageBase64 as string;
        const matches = rawBase64.match(/^data:([a-zA-Z0-9-+\/]+);base64,(.+)$/);
        let mimeType = 'image/jpeg';
        let base64Data = rawBase64;
        if (matches && matches.length === 3) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = (req.body.fileName as string) || `upload_${Date.now()}.jpg`;
        req.file = {
          originalname: filename,
          mimetype: mimeType,
          buffer,
          size: buffer.length,
        };
        return next();
      }
    }

    // Case 2: Multipart Form-Data
    if (contentType.includes('multipart/form-data')) {
      const boundaryMatch = contentType.match(/boundary=([^;]+)/i);
      if (!boundaryMatch) {
        throw ApiError.badRequest('Invalid multipart form-data header: missing boundary');
      }

      const boundary = boundaryMatch[1].replace(/^["']|["']$/g, '');
      const bodyBuffer = await readStreamBuffer(req, MAX_FILE_SIZE_BYTES);

      if (!bodyBuffer || bodyBuffer.length === 0) {
        throw ApiError.badRequest('No image file provided in request body');
      }

      const files = parseMultipartFormData(bodyBuffer, boundary);

      if (files.length === 0) {
        throw ApiError.badRequest('No image file found in form-data payload');
      }

      if (files.length > 1) {
        throw ApiError.badRequest('Only a single image upload is allowed per request');
      }

      req.file = files[0];
      return next();
    }

    // Case 3: Direct Raw Binary Upload (image/jpeg, image/png, image/jpg)
    if (contentType.startsWith('image/')) {
      const bodyBuffer = await readStreamBuffer(req, MAX_FILE_SIZE_BYTES);
      if (!bodyBuffer || bodyBuffer.length === 0) {
        throw ApiError.badRequest('No image content provided in request body');
      }

      const rawFileName = (req.headers['x-file-name'] as string) || (contentType.includes('png') ? 'image.png' : 'image.jpg');
      req.file = {
        originalname: rawFileName,
        mimetype: contentType.split(';')[0].trim().toLowerCase(),
        buffer: bodyBuffer,
        size: bodyBuffer.length,
      };
      return next();
    }

    // If no supported upload format was sent
    throw ApiError.badRequest(
      'Missing image upload. Please upload an image using multipart/form-data or binary image payload'
    );
  } catch (error) {
    next(error);
  }
}
