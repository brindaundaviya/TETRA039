/**
 * Custom Error Hierarchy for CropGuard AI Engine.
 * Provides explicit, meaningful error types for image validation, model loading,
 * inference execution, and post-processing failures.
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

export class PostProcessingError extends AiEngineError {
  public readonly code = 'POST_PROCESSING_ERROR';

  constructor(reason: string) {
    super(`AI post-processing failed: ${reason}`, 500);
  }
}

export class InvalidProbabilityError extends AiEngineError {
  public readonly code = 'INVALID_PROBABILITY_ERROR';

  constructor(reason: string) {
    super(`Invalid prediction probability vector: ${reason}`, 500);
  }
}

export class CorruptedModelResponseError extends AiEngineError {
  public readonly code = 'CORRUPTED_MODEL_RESPONSE';

  constructor(reason = 'Inference engine emitted empty or unparseable prediction scores.') {
    super(reason, 500);
  }
}
