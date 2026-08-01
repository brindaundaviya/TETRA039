import { CorruptedImageError, ImageValidationError, UnsupportedImageFormatError } from '../errors/aiErrors.js';
import type { ImageInput } from '../interfaces/aiEngine.interface.js';

export interface DecodedImageMeta {
  buffer: Buffer;
  format: 'jpg' | 'jpeg' | 'png';
  exifOrientation: number; // 1 = Normal, 3 = 180°, 6 = 90° CW, 8 = 270° CW
  hasAlpha: boolean;
}

/**
 * Validates and normalizes input image to a clean binary Buffer.
 * Strictly enforces supported formats: JPG, JPEG, PNG.
 * Throws explicit typed errors on validation failures.
 */
export function normalizeAndValidateImage(input: ImageInput): DecodedImageMeta {
  if (!input) {
    throw new ImageValidationError('No image input provided. Expected Buffer or Base64 string.');
  }

  let buffer: Buffer;

  if (Buffer.isBuffer(input)) {
    buffer = input;
  } else if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) {
      throw new ImageValidationError('Image input string is empty.');
    }
    // Clean data URI header if present
    const base64Clean = trimmed.replace(/^data:image\/\w+;base64,/, '');
    try {
      buffer = Buffer.from(base64Clean, 'base64');
    } catch {
      throw new CorruptedImageError('Failed to parse Base64 image payload.');
    }
  } else {
    throw new ImageValidationError('Invalid image payload type. Expected Buffer or Base64 string.');
  }

  if (!buffer || buffer.length === 0) {
    throw new CorruptedImageError('Image file is empty (0 bytes).');
  }

  // Detect image format from magic signature bytes
  const format = detectSupportedFormat(buffer);

  // Parse EXIF orientation metadata (JPEG only)
  const exifOrientation = format !== 'png' ? parseExifOrientation(buffer) : 1;

  // Detect if image contains alpha channel (PNG RGBA)
  const hasAlpha = format === 'png' ? checkPngAlphaChannel(buffer) : false;

  return {
    buffer,
    format,
    exifOrientation,
    hasAlpha,
  };
}

/**
 * Detect image format from magic signature bytes.
 * Strictly accepts only JPG, JPEG, and PNG.
 */
export function detectSupportedFormat(buffer: Buffer): 'jpg' | 'jpeg' | 'png' {
  if (buffer.length < 4) {
    throw new CorruptedImageError('Image header is incomplete or truncated.');
  }

  // JPEG / JPG signature: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }

  // PNG signature: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'png';
  }

  // Check for common unsupported formats to return clear error messaging
  if (buffer.length >= 12 && buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
    throw new UnsupportedImageFormatError('WEBP');
  }

  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    throw new UnsupportedImageFormatError('GIF');
  }

  if (buffer.subarray(0, 4).toString('ascii') === '%PDF') {
    throw new UnsupportedImageFormatError('PDF');
  }

  throw new UnsupportedImageFormatError('Unknown/Unrecognized Format');
}

/**
 * Parses JPEG EXIF orientation metadata tag if present.
 */
export function parseExifOrientation(buffer: Buffer): number {
  try {
    let offset = 2;
    const length = buffer.length;

    while (offset < length - 2) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];

      // APP1 marker (EXIF)
      if (marker === 0xe1) {
        const exifHeader = buffer.toString('ascii', offset + 4, offset + 10);
        if (exifHeader === 'Exif\0\0') {
          const tiffOffset = offset + 10;
          const isBigEndian = buffer.toString('ascii', tiffOffset, tiffOffset + 2) === 'MM';
          const read16 = (o: number) => (isBigEndian ? buffer.readUInt16BE(o) : buffer.readUInt16LE(o));
          const read32 = (o: number) => (isBigEndian ? buffer.readUInt32BE(o) : buffer.readUInt32LE(o));

          const firstIfdOffset = read32(tiffOffset + 4);
          const ifdStart = tiffOffset + firstIfdOffset;
          const entries = read16(ifdStart);

          for (let i = 0; i < entries; i++) {
            const entryOffset = ifdStart + 2 + i * 12;
            const tag = read16(entryOffset);
            if (tag === 0x0112) {
              // Orientation tag
              return read16(entryOffset + 8);
            }
          }
        }
        break;
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  } catch {
    // Fallback to normal orientation if parsing fails
  }
  return 1;
}

/**
 * Check if PNG file contains an Alpha transparency channel (Color type 4 or 6).
 */
export function checkPngAlphaChannel(buffer: Buffer): boolean {
  try {
    // IHDR chunk is located at offset 8 (signature length) + 4 (length) + 4 (type 'IHDR')
    if (buffer.length > 25) {
      const colorType = buffer[25];
      return colorType === 4 || colorType === 6; // 4 = Grayscale+Alpha, 6 = Truecolor+Alpha
    }
  } catch {
    // Default to false
  }
  return false;
}

/**
 * Create a synthetic test leaf image buffer (JPEG/PNG structure simulation) for offline testing.
 */
export function createSyntheticLeafBuffer(format: 'jpeg' | 'png' = 'jpeg'): Buffer {
  if (format === 'png') {
    return Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
      0x42, 0x60, 0x82,
    ]);
  }

  // Minimal valid 1x1 JPEG buffer
  return Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08,
    0x07, 0x07, 0x07, 0x09, 0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20, 0x24, 0x2e, 0x27, 0x20,
    0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29, 0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27,
    0x39, 0x3d, 0x38, 0x32, 0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x1f, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04,
    0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f,
    0x00, 0xbf, 0x80, 0x00, 0xff, 0xd9,
  ]);
}
