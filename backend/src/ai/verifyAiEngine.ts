import {
  AiEngineError,
  CorruptedModelResponseError,
  InvalidProbabilityError,
  aiPredictionService,
  createSyntheticLeafBuffer,
  defaultAiPostProcessor,
  defaultModelLoader,
  getDiseaseRiskLevel,
} from './index.js';

async function runVerification(): Promise<void> {
  console.log('====================================================');
  console.log('   CropGuard AI Post-Processing Verification Suite  ');
  console.log('====================================================');

  try {
    // Test 1: Model Single-Load Singleton Guarantee
    console.log('\n[Test 1/6] Verifying Model Single-Load Singleton Guarantee...');
    await aiPredictionService.initialize();
    const initialStatus = defaultModelLoader.getModelInfo();
    console.log(`✓ Model loaded instance name: ${initialStatus.name}`);
    console.log(`✓ Model Load Count: ${initialStatus.loadCount}`);

    if (initialStatus.loadCount !== 1) {
      throw new Error(`Expected model load count to be 1, but got ${initialStatus.loadCount}`);
    }

    // Test 2: Full Post-Processing Pipeline Execution
    console.log('\n[Test 2/6] Running Prediction Pipeline & Post-Processing...');
    const jpegBuffer = createSyntheticLeafBuffer('jpeg');
    const result = await aiPredictionService.predict({
      image: jpegBuffer,
      topK: 3,
      centerCrop: true,
    });

    console.log('✓ Standard Output JSON Response:');
    console.log(JSON.stringify(result, null, 4));

    // Test 3: Verify Confidence Category Ranges
    console.log('\n[Test 3/6] Testing Confidence Category Threshold Mapping...');
    const catVeryHigh = defaultAiPostProcessor.evaluateConfidenceCategory(96.8);
    const catHigh = defaultAiPostProcessor.evaluateConfidenceCategory(88.5);
    const catMod = defaultAiPostProcessor.evaluateConfidenceCategory(75.0);
    const catLow = defaultAiPostProcessor.evaluateConfidenceCategory(45.2);

    console.log(`  - 96.8%  → "${catVeryHigh}" (Expected: Very High)`);
    console.log(`  - 88.5%  → "${catHigh}" (Expected: High)`);
    console.log(`  - 75.0%  → "${catMod}" (Expected: Moderate)`);
    console.log(`  - 45.2%  → "${catLow}" (Expected: Low)`);

    if (catVeryHigh !== 'Very High' || catHigh !== 'High' || catMod !== 'Moderate' || catLow !== 'Low') {
      throw new Error('Confidence category threshold evaluation mismatch!');
    }
    console.log('✓ Confidence Category logic verified!');

    // Test 4: Verify Configurable Risk Level Mappings
    console.log('\n[Test 4/6] Testing Configurable Risk Mapping...');
    const riskHealthy = getDiseaseRiskLevel('Healthy');
    const riskEarlyBlight = getDiseaseRiskLevel('Early Blight');
    const riskLateBlight = getDiseaseRiskLevel('Late Blight');
    const riskYellowCurl = getDiseaseRiskLevel('Yellow Leaf Curl Virus');

    console.log(`  - "Healthy"                → Risk: "${riskHealthy}" (Expected: Low)`);
    console.log(`  - "Early Blight"           → Risk: "${riskEarlyBlight}" (Expected: Medium)`);
    console.log(`  - "Late Blight"            → Risk: "${riskLateBlight}" (Expected: High)`);
    console.log(`  - "Yellow Leaf Curl Virus" → Risk: "${riskYellowCurl}" (Expected: Critical)`);

    if (riskHealthy !== 'Low' || riskEarlyBlight !== 'Medium' || riskLateBlight !== 'High' || riskYellowCurl !== 'Critical') {
      throw new Error('Risk level mapping mismatch!');
    }
    console.log('✓ Configurable Disease Risk Mapping verified!');

    // Test 5: Verify Top Predictions Sorting & Structure
    console.log('\n[Test 5/6] Verifying Top 3 Predictions Sorting & Schema...');
    if (!Array.isArray(result.topPredictions) || result.topPredictions.length !== 3) {
      throw new Error(`Expected topPredictions array length to be 3, got ${result.topPredictions.length}`);
    }

    const [pred1, pred2, pred3] = result.topPredictions;
    if (!pred1 || !pred2 || !pred3) {
      throw new Error('Top predictions array contains null/undefined items');
    }

    console.log(`  1. ${pred1.label}: ${pred1.confidence}%`);
    console.log(`  2. ${pred2.label}: ${pred2.confidence}%`);
    console.log(`  3. ${pred3.label}: ${pred3.confidence}%`);

    if (pred1.confidence < pred2.confidence || pred2.confidence < pred3.confidence) {
      throw new Error('Top predictions are NOT sorted descendingly by confidence!');
    }
    console.log('✓ Top 3 predictions correctly sorted in descending order!');

    // Test 6: Verify Post-Processing Error Handling
    console.log('\n[Test 6/6] Testing Post-Processing Error Handling on Corrupted Output...');
    let caughtCorruptedErr = false;
    try {
      defaultAiPostProcessor.process({
        classProbabilities: [NaN, -0.5, 1.5],
        topIndices: [0, 1, 2],
        processingTimeMs: 12,
      });
    } catch (err) {
      if (err instanceof InvalidProbabilityError || err instanceof CorruptedModelResponseError) {
        caughtCorruptedErr = true;
        console.log(`✓ Expected post-processing error caught: "${err.message}" (Code: ${err.code})`);
      } else {
        throw err;
      }
    }

    if (!caughtCorruptedErr) {
      throw new Error('Failed to catch corrupted prediction probability error!');
    }

    // Schema Output Verification
    console.log('\n----------------------------------------------------');
    console.log(' Final Response Schema Validation:');
    console.log(`  - Crop: "${result.crop}"`);
    console.log(`  - Disease: "${result.disease}"`);
    console.log(`  - Confidence: ${result.confidence}%`);
    console.log(`  - Confidence Category: "${result.confidenceCategory}"`);
    console.log(`  - Risk Level: "${result.risk}"`);
    console.log(`  - Processing Time: "${result.processingTime}"`);
    console.log(`  - Top Predictions Count: ${result.topPredictions.length}`);
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

// Execute verification suite
runVerification();
