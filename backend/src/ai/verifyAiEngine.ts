import { aiPredictionService } from './index.js';
import { createSyntheticLeafBuffer } from './utils/imageUtils.js';

async function runVerification(): Promise<void> {
  console.log('----------------------------------------------------');
  console.log('   CropGuard AI Engine Foundation Verification');
  console.log('----------------------------------------------------');

  try {
    // 1. Test Model Loading & Initialization
    console.log('[1/4] Loading Pre-trained Model...');
    await aiPredictionService.initialize();
    const status = aiPredictionService.getEngineStatus();
    console.log(`✓ Model Loaded Successfully: ${status.modelInfo.name} (v${status.modelInfo.version})`);

    // 2. Prepare Sample Crop Leaf Image
    console.log('\n[2/4] Testing Image Preprocessing Pipeline...');
    const sampleBuffer = createSyntheticLeafBuffer();
    console.log(`✓ Sample Image Buffer Prepared (${sampleBuffer.length} bytes)`);

    // 3. Execute AI Prediction Pipeline
    console.log('\n[3/4] Running Inference Pipeline...');
    const result = await aiPredictionService.predict({
      image: sampleBuffer,
      topK: 3,
    });
    console.log('✓ Inference Pipeline Completed Successfully.');

    // 4. Verify Standard JSON Response Format
    console.log('\n[4/4] Verifying Standard Output Structure:');
    console.log(JSON.stringify(result, null, 4));

    // Validate Required Fields
    const errors: string[] = [];
    if (typeof result.crop !== 'string' || !result.crop) errors.push('Missing or invalid "crop" string');
    if (typeof result.disease !== 'string' || !result.disease) errors.push('Missing or invalid "disease" string');
    if (typeof result.confidence !== 'number' || isNaN(result.confidence)) errors.push('Missing or invalid "confidence" number');
    if (!Array.isArray(result.topPredictions) || result.topPredictions.length === 0) {
      errors.push('Missing or invalid "topPredictions" array');
    } else {
      result.topPredictions.forEach((item, index) => {
        if (typeof item.name !== 'string' || !item.name) errors.push(`topPredictions[${index}] missing "name"`);
        if (typeof item.confidence !== 'number' || isNaN(item.confidence)) errors.push(`topPredictions[${index}] missing "confidence"`);
      });
    }

    if (errors.length > 0) {
      console.error('\n❌ Verification Failed with Errors:');
      errors.forEach((e) => console.error(`  - ${e}`));
      process.exit(1);
    }

    console.log('\n----------------------------------------------------');
    console.log(' VERIFICATION SUCCESS: All Checks Passed! ');
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('\n❌ Runtime Error during AI Engine verification:', error);
    process.exit(1);
  }
}

// Execute verification harness
runVerification();
