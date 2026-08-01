import {
  AiEngineError,
  aiPredictionService,
  createSyntheticLeafBuffer,
  defaultModelLoader,
  defaultRecommendationMerger,
} from './index.js';

async function runPerformanceAndReliabilityVerification(): Promise<void> {
  console.log('====================================================');
  console.log(' CropGuard AI Engine Performance & Benchmark Suite ');
  console.log('====================================================');

  try {
    // Test 1: Single-Load Model Initialization
    console.log('\n[Test 1/6] Verifying Double-Checked Lock Singleton Model Loader...');
    await aiPredictionService.initialize();
    const initialStatus = defaultModelLoader.getModelInfo();
    console.log(`✓ Model loaded instance: ${initialStatus.name} (v${initialStatus.version})`);
    console.log(`✓ Initial Load Count: ${initialStatus.loadCount}`);

    if (initialStatus.loadCount !== 1) {
      throw new Error(`Expected initial model load count to be 1, but got ${initialStatus.loadCount}`);
    }

    // Test 2: High-Throughput Inference Benchmark (100 Requests)
    console.log('\n[Test 2/6] Running High-Throughput Benchmark (100 Consecutive Requests)...');
    const testBuffer = createSyntheticLeafBuffer('jpeg');
    const ITERATIONS = 100;
    const startBench = performance.now();

    for (let i = 0; i < ITERATIONS; i++) {
      await aiPredictionService.predict(testBuffer);
    }

    const totalBenchMs = performance.now() - startBench;
    const avgLatencyMs = totalBenchMs / ITERATIONS;

    console.log(`✓ Total Time for ${ITERATIONS} Inferences: ${totalBenchMs.toFixed(2)} ms`);
    console.log(`✓ Average Latency per Inference: ${avgLatencyMs.toFixed(3)} ms`);
    console.log(`✓ Post-Benchmark Model Load Count: ${defaultModelLoader.getLoadCount()}`);

    if (defaultModelLoader.getLoadCount() !== 1) {
      throw new Error('Model re-initialized during benchmark run! Singleton guarantee violated.');
    }

    // Test 3: Large Image Preprocessing & Buffer Pool Reuse
    console.log('\n[Test 3/6] Testing Large Image Payload Preprocessing (Simulated High Resolution)...');
    const largeBuffer = Buffer.alloc(1024 * 1024 * 2); // 2 MB Image payload
    largeBuffer.fill(120);
    // Add valid JPEG header magic bytes
    largeBuffer[0] = 0xff;
    largeBuffer[1] = 0xd8;
    largeBuffer[2] = 0xff;
    largeBuffer[largeBuffer.length - 2] = 0xff;
    largeBuffer[largeBuffer.length - 1] = 0xd9;

    const largeResult = await aiPredictionService.predict(largeBuffer);
    console.log(`✓ 2 MB Large Image Preprocessing Success. Time: ${largeResult.processingTime}`);

    // Test 4: Low Confidence Edge Case Handling (< 35%)
    console.log('\n[Test 4/6] Verifying Low Confidence Edge Case Handling...');
    const lowConfResult = await aiPredictionService.predictAndEnrich({
      image: testBuffer,
      topK: 3,
    });

    console.log(`✓ Primary Disease: ${lowConfResult.disease}`);
    console.log(`✓ Confidence: ${lowConfResult.confidence}% (${lowConfResult.confidenceCategory})`);
    console.log(`✓ Summary: "${lowConfResult.summary}"`);

    if (lowConfResult.confidence < 0 || lowConfResult.confidence > 100) {
      throw new Error(`Confidence score ${lowConfResult.confidence}% is outside valid [0..100]% range!`);
    }

    // Test 5: Next Steps & Advisory Fallback Unit Verification
    console.log('\n[Test 5/6] Testing Actionable Next Steps & Fallback Advisory Merger...');
    const fallbackResult = defaultRecommendationMerger.merge({
      crop: 'Corn',
      disease: 'Common Rust',
      confidence: 82.5,
      confidenceCategory: 'Moderate',
      risk: 'Medium',
      processingTime: '0.01 sec',
      topPredictions: [{ label: 'Common Rust', confidence: 82.5 }],
    });

    console.log(`✓ Fallback Summary: "${fallbackResult.summary}"`);
    console.log(`✓ Recommended Treatment: "${fallbackResult.recommendedTreatment}"`);
    console.log(`✓ Actionable Next Steps Count: ${fallbackResult.nextSteps.length}`);

    if (fallbackResult.nextSteps.length < 3 || fallbackResult.nextSteps.length > 5) {
      throw new Error(`Expected nextSteps count to be between 3 and 5, got ${fallbackResult.nextSteps.length}`);
    }

    // Test 6: Final Standardized Schema Validation
    console.log('\n[Test 6/6] Verifying Final Output Schema Compliance...');
    const requiredKeys = [
      'crop',
      'disease',
      'confidence',
      'confidenceCategory',
      'risk',
      'summary',
      'symptoms',
      'recommendedTreatment',
      'organicAlternative',
      'prevention',
      'recoveryTime',
      'nextSteps',
      'processingTime',
      'topPredictions',
    ];

    const missingKeys = requiredKeys.filter((key) => !(key in lowConfResult));
    if (missingKeys.length > 0) {
      throw new Error(`Missing required keys in output schema: ${missingKeys.join(', ')}`);
    }

    console.log('\n----------------------------------------------------');
    console.log(' Final Benchmark Summary:');
    console.log(`  - 100-Request Benchmark Total: ${totalBenchMs.toFixed(2)} ms`);
    console.log(`  - Avg Latency: ${avgLatencyMs.toFixed(3)} ms / req`);
    console.log(`  - Singleton Model Initializations: ${defaultModelLoader.getLoadCount()} (Target: 1)`);
    console.log(`  - Output Confidence Clamped Range: [0..100]% (Passed)`);
    console.log('----------------------------------------------------');

    console.log('\n====================================================');
    console.log(' ALL PERFORMANCE & RELIABILITY TESTS PASSED! ');
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

// Execute benchmark suite
runPerformanceAndReliabilityVerification();
