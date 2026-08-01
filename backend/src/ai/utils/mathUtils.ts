/**
 * Mathematical utilities for AI Engine forward pass computations,
 * probability activations, and numerical formatting.
 */

/**
 * Numerically stable Softmax activation function.
 * Converts raw logit scores into normalized probability distribution [0..1] summing to 1.
 */
export function softmax(logits: number[]): number[] {
  if (logits.length === 0) return [];

  // Subtract max for numerical stability (prevents float overflow)
  const maxLogit = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxLogit));
  const sumExps = exps.reduce((acc, val) => acc + val, 0);

  if (sumExps === 0) {
    return logits.map(() => 1 / logits.length);
  }

  return exps.map((e) => e / sumExps);
}

/**
 * Get top K highest probability indices sorted in descending order.
 */
export function getTopKIndices(probabilities: number[], k: number): number[] {
  const indexed = probabilities.map((prob, index) => ({ prob, index }));
  indexed.sort((a, b) => b.prob - a.prob);
  return indexed.slice(0, Math.min(k, probabilities.length)).map((item) => item.index);
}

/**
 * Formats a decimal probability [0..1] to a percentage number with 1 decimal place.
 * Example: 0.9682 -> 96.8
 */
export function toPercentage(prob: number, decimals: number = 1): number {
  const percentage = prob * 100;
  const factor = Math.pow(10, decimals);
  return Math.round(percentage * factor) / factor;
}
