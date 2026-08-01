import type { RiskLevel } from '../interfaces/aiEngine.interface.js';

/**
 * Configurable Disease Risk Mapping.
 * Maps crop disease names to severity risk levels (Low, Medium, High, Critical).
 */
export const DISEASE_RISK_MAP: Record<string, RiskLevel> = {
  // Healthy
  Healthy: 'Low',

  // Tomato Diseases
  'Early Blight': 'Medium',
  'Late Blight': 'High',
  'Bacterial Spot': 'High',
  'Leaf Mold': 'Medium',
  'Septoria Leaf Spot': 'Medium',
  'Spider Mites': 'Medium',
  'Target Spot': 'Medium',
  'Yellow Leaf Curl Virus': 'Critical',
  'Mosaic Virus': 'High',

  // Potato Diseases
  // (Potato Early Blight / Late Blight match Early Blight / Late Blight)

  // Corn Diseases
  'Common Rust': 'Medium',
  'Cercospora Leaf Spot': 'Medium',

  // Apple Diseases
  'Apple Scab': 'Medium',
  'Black Rot': 'High',
};

/**
 * Fallback default risk level for unmapped diseases.
 */
export const DEFAULT_RISK_LEVEL: RiskLevel = 'Medium';

/**
 * Resolve risk level for a given disease name.
 */
export function getDiseaseRiskLevel(diseaseName: string): RiskLevel {
  if (!diseaseName) return DEFAULT_RISK_LEVEL;
  return DISEASE_RISK_MAP[diseaseName] ?? DEFAULT_RISK_LEVEL;
}
