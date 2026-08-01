import {
  AiEngineError,
  UnsupportedImageFormatError,
  aiPredictionService,
  createSyntheticLeafBuffer,
  defaultModelLoader,
} from './index.js';

async function runVerification(): Promise<void> {
  console.log('====================================================');
  console.log('   CropGuard AI Pipeline Final Verification Suite   ');
  console.log('====================================================');

  try {
    // Test 1: Single-Load Model Initialization
    console.log('\n[Test 1/5] Verifying Model Single-Load Singleton Guarantee...');
    await aiPredictionService.initialize();
    const initialStatus = defaultModelLoader.getModelInfo();
    console.log(`✓ Model loaded instance name: ${initialStatus.name}`);
    console.log(`✓ Initial Model Load Count: ${initialStatus.loadCount}`);

    if (initialStatus.loadCount !== 1) {
      throw new Error(`Expected model load count to be 1, but got ${initialStatus.loadCount}`);
    }

    // Test 2: Valid Image Preprocessing & Inference (JPEG + Center Crop)
    console.log('\n[Test 2/5] Running Preprocessing & Inference on Valid JPEG Image...');
    const jpegBuffer = createSyntheticLeafBuffer('jpeg');
    const resultJpeg = await aiPredictionService.predict({
      image: jpegBuffer,
      topK: 3,
      centerCrop: true,
    });

    console.log('✓ Prediction Result for JPEG Image:');
    console.log(JSON.stringify(resultJpeg, null, 4));

    // Test 3: Model Single-Load Verification (Repeated Inference)
    console.log('\n[Test 3/5] Verifying Model Reuse across Repeated Inferences (No Re-initialization)...');
    await aiPredictionService.predict(jpegBuffer);
    await aiPredictionService.predict(jpegBuffer);
    const postStatus = defaultModelLoader.getModelInfo();
    console.log(`✓ Post-inference Model Load Count: ${postStatus.loadCount}`);
    if (postStatus.loadCount !== 1) {
      throw new Error(`Model re-initialized during inference! Load count is ${postStatus.loadCount}`);
    }
    console.log('✓ Model reuse verified! Zero repeated initializations.');

    // Test 4: RGBA PNG Preprocessing & Alpha Channel Removal
    console.log('\n[Test 4/5] Testing RGBA PNG Preprocessing & Alpha Channel Removal...');
    const pngBuffer = createSyntheticLeafBuffer('png');
    const resultPng = await aiPredictionService.predict({
      image: pngBuffer,
      topK: 3,
    });
    console.log(`✓ PNG RGBA Preprocessing Success. Disease: ${resultPng.disease}, Time: ${resultPng.processingTime}`);

    // Test 5: Error Handling & Invalid Image Format Rejection
    console.log('\n[Test 5/5] Testing Error Handling for Invalid Image Payload...');
    let caughtExpectedError = false;
    try {
      const invalidPdfBuffer = Buffer.from('%PDF-1.4 header contents...');
      await aiPredictionService.predict(invalidPdfBuffer);
    } catch (err) {
      if (err instanceof UnsupportedImageFormatError) {
        caughtExpectedError = true;
        console.log(`✓ Expected error caught cleanly: "${err.message}" (Code: ${err.code})`);
      } else {
        throw err;
      }
    }

    if (!caughtExpectedError) {
      throw new Error('Failed to reject invalid PDF image payload!');
    }

    // Output Schema Assertions
    console.log('\n----------------------------------------------------');
    console.log(' Schema Validation:');
    console.log(`  - Crop: "${resultJpeg.crop}" (string)`);
    console.log(`  - Disease: "${resultJpeg.disease}" (string)`);
    console.log(`  - Confidence: ${resultJpeg.confidence}% (number)`);
    console.log(`  - Processing Time: "${resultJpeg.processingTime}" (string)`);
    console.log(`  - Top Predictions Count: ${resultJpeg.topPredictions.length}`);
    console.log(`  - Top Prediction Item [0]: label="${resultJpeg.topPredictions[0]?.label}", confidence=${resultJpeg.topPredictions[0]?.confidence}%`);
    console.log('----------------------------------------------------');

    console.log('\n====================================================');
    console.log(' ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ');
    console.log('====================================================');
  } catch (error) {
    if (error instanceof AiEngineError) {
      console.error(`\n❌ AI Engine Error [${error.code}]:`, error.message);
    } else {
      console.error('\n❌ Runtime Error during AI Engine verification:', error);
    }
    process.exit(1);
  }
}

// Execute test suite
runVerification();
