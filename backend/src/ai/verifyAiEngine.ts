import {
  AiEngineError,
  aiPredictionService,
  createSyntheticLeafBuffer,
  defaultModelLoader,
  defaultNextStepsGenerator,
  defaultRecommendationMerger,
  defaultSummaryGenerator,
} from './index.js';

async function runVerification(): Promise<void> {
  console.log('====================================================');
  console.log('  CropGuard AI Advisory Enrichment Verification Suite ');
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

    // Test 2: End-to-End Prediction & Advisory Enrichment (predictAndEnrich)
    console.log('\n[Test 2/6] Running Prediction & Advisory Enrichment (predictAndEnrich)...');
    const jpegBuffer = createSyntheticLeafBuffer('jpeg');
    const enrichedResult = await aiPredictionService.predictAndEnrich(
      {
        image: jpegBuffer,
        topK: 3,
        centerCrop: true,
      },
      {
        symptoms: ['Dark brown spots with concentric rings on lower leaves', 'Yellowing around leaf lesions'],
        treatment: 'Apply copper-based fungicide or chlorothalonil at first sign of spots.',
        organicAlternative: 'Spray with neem oil or bio-fungicide containing Bacillus subtilis.',
        prevention: ['Rotate crops every 2-3 years', 'Ensure proper plant spacing for air circulation'],
        recoveryTime: '7-14 days',
      }
    );

    console.log('✓ Standard Enriched Output JSON Response:');
    console.log(JSON.stringify(enrichedResult, null, 4));

    // Test 3: Concise Summary Generator Unit Verification
    console.log('\n[Test 3/6] Testing Concise Summary Generator...');
    const summary = defaultSummaryGenerator.generateSummary(enrichedResult);
    console.log(`✓ Generated Summary: "${summary}"`);

    if (!summary || summary.length > 250) {
      throw new Error('Summary generator produced empty or overly long text!');
    }

    // Test 4: Next Steps Generator Unit Verification (3-5 Practical Steps)
    console.log('\n[Test 4/6] Testing Actionable Next Steps Generator (3-5 Items)...');
    const nextSteps = defaultNextStepsGenerator.generateNextSteps(enrichedResult);
    console.log(`✓ Generated Next Steps (${nextSteps.length} items):`);
    nextSteps.forEach((step, idx) => console.log(`   ${idx + 1}. ${step}`));

    if (!Array.isArray(nextSteps) || nextSteps.length < 3 || nextSteps.length > 5) {
      throw new Error(`Expected nextSteps count to be between 3 and 5, but got ${nextSteps.length}`);
    }

    // Test 5: Fallback Recommendation Merging (Omitted / Unknown Knowledge Data)
    console.log('\n[Test 5/6] Testing Graceful Fallback Handling for Missing Knowledge Data...');
    const fallbackResult = defaultRecommendationMerger.merge({
      crop: 'Tomato',
      disease: 'Unknown Blight Special',
      confidence: 88.0,
      confidenceCategory: 'High',
      risk: 'High',
      processingTime: '0.05 sec',
      topPredictions: [{ label: 'Unknown Blight Special', confidence: 88.0 }],
    });

    console.log(`✓ Fallback Summary: "${fallbackResult.summary}"`);
    console.log(`✓ Fallback Treatment: "${fallbackResult.recommendedTreatment}"`);
    console.log(`✓ Fallback Next Steps Count: ${fallbackResult.nextSteps.length}`);

    if (!fallbackResult.recommendedTreatment || fallbackResult.nextSteps.length < 3) {
      throw new Error('Fallback recommendation merger failed to supply default guidance!');
    }

    // Test 6: Final Schema Compliance Check
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

    const missingKeys = requiredKeys.filter((key) => !(key in enrichedResult));
    if (missingKeys.length > 0) {
      throw new Error(`Enriched result is missing required schema keys: ${missingKeys.join(', ')}`);
    }

    console.log('\n----------------------------------------------------');
    console.log(' Enriched Response Schema Validation:');
    console.log(`  - Crop: "${enrichedResult.crop}"`);
    console.log(`  - Disease: "${enrichedResult.disease}"`);
    console.log(`  - Confidence: ${enrichedResult.confidence}% (${enrichedResult.confidenceCategory})`);
    console.log(`  - Risk: "${enrichedResult.risk}"`);
    console.log(`  - Summary: "${enrichedResult.summary}"`);
    console.log(`  - Recommended Treatment: "${enrichedResult.recommendedTreatment}"`);
    console.log(`  - Next Steps Count: ${enrichedResult.nextSteps.length}`);
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
