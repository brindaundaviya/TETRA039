/**
 * Custom Error Hierarchy for CropGuard AI Engine.
 * Provides explicit, meaningful error types for image validation, model loading,
 * and inference runtime failures.
 */

export abstract class AiEngineError extends Error {
  public abstract readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ImageValidationError extends AiEngineError {
  public readonly code = 'IMAGE_VALIDATION_ERROR';

  constructor(message: string) {
    super(message, 400);
  }
}

export class UnsupportedImageFormatError extends AiEngineError {
  public readonly code = 'UNSUPPORTED_IMAGE_FORMAT';

  constructor(format: string) {
    super(`Unsupported image format '${format}'. Only JPG, JPEG, and PNG images are supported.`, 415);
  }
}

export class CorruptedImageError extends AiEngineError {
  public readonly code = 'CORRUPTED_IMAGE';

  constructor(reason = 'Image buffer is unreadable or corrupted.') {
    super(reason, 422);
  }
}

export class ModelLoadError extends AiEngineError {
  public readonly code = 'MODEL_LOAD_ERROR';

  constructor(reason: string) {
    super(`Failed to load AI prediction model: ${reason}`, 500);
  }
}

export class InferenceExecutionError extends AiEngineError {
  public readonly code = 'INFERENCE_EXECUTION_ERROR';

  constructor(reason: string) {
    super(`AI inference execution failed: ${reason}`, 500);
  }
}
