export type TranslationKey =
  | 'scan.title'
  | 'scan.subtitle'
  | 'scan.takePhoto'
  | 'scan.uploadGallery'
  | 'scan.dropTitle'
  | 'scan.dropSubtitle'
  | 'scan.browseFiles'
  | 'scan.supportedFormats'
  | 'scan.analyzing'
  | 'scan.analyzingMessage'
  | 'scan.readResult'
  | 'scan.resultTitle'
  | 'scan.cropName'
  | 'scan.detectedDisease'
  | 'scan.confidenceScore'
  | 'scan.diseaseSeverity'
  | 'scan.recommendedTreatment'
  | 'scan.recommendedPesticide'
  | 'scan.nextAction'
  | 'scan.recoveryEstimate'
  | 'scan.healthy'
  | 'scan.moderate'
  | 'scan.severe'
  | 'scan.seeMore';

export const translations: Record<TranslationKey, string> = {
  'scan.title': 'Crop Check',
  'scan.subtitle': 'Take a photo or choose one from your gallery for a quick field check.',
  'scan.takePhoto': 'Take Photo',
  'scan.uploadGallery': 'Upload from Gallery',
  'scan.dropTitle': 'Drop your crop photo here',
  'scan.dropSubtitle': 'A clear leaf photo helps the AI give a better result.',
  'scan.browseFiles': 'Choose File',
  'scan.supportedFormats': 'Supported formats: JPG, PNG, WEBP',
  'scan.analyzing': 'Analyzing your crop...',
  'scan.analyzingMessage': 'The AI is checking the leaf for signs of disease and treatment needs.',
  'scan.readResult': 'Read Result',
  'scan.resultTitle': 'Your Crop Result',
  'scan.cropName': 'Crop Name',
  'scan.detectedDisease': 'Detected Disease',
  'scan.confidenceScore': 'Confidence Score',
  'scan.diseaseSeverity': 'Disease Severity',
  'scan.recommendedTreatment': 'Recommended Treatment',
  'scan.recommendedPesticide': 'Recommended Pesticide/Fungicide',
  'scan.nextAction': 'Next Action',
  'scan.recoveryEstimate': 'Recovery Estimate',
  'scan.healthy': 'Healthy',
  'scan.moderate': 'Moderate',
  'scan.severe': 'Severe',
  'scan.seeMore': 'See more',
};

export function t(key: TranslationKey): string {
  return translations[key] || key;
}
