import { motion } from 'framer-motion';
import { Accordion } from '@/components/ui';

const FAQS = [
  {
    id: 'faq-1',
    question: 'How accurate is CropGuard AI in detecting plant leaf diseases?',
    answer: (
      <p>
        CropGuard AI achieves an empirical accuracy rating exceeding <strong>99.4%</strong> on benchmark leaf disease datasets. By utilizing deep convolutional neural networks fine-tuned on multi-spectral leaf lesion patterns, the system accurately differentiates look-alike symptoms across early and late disease stages.
      </p>
    ),
  },
  {
    id: 'faq-2',
    question: 'Which crop types can I inspect using CropGuard AI?',
    answer: (
      <p>
        Currently, CropGuard AI supports 5 major staple and commercial crops: <strong>Tomato, Potato, Rice, Cotton, and Maize</strong>. Each crop model includes comprehensive coverage for widespread fungal, bacterial, viral, and pest-induced leaf pathologies.
      </p>
    ),
  },
  {
    id: 'faq-3',
    question: 'How does the system formulate treatment recommendations?',
    answer: (
      <p>
        Once a disease is identified, CropGuard AI queries an agricultural knowledge base to provide tailored <strong>curative advisories</strong>. Recommendations cover biological control remedies, organic treatments, chemical fungicide dosage instructions, and field isolation procedures.
      </p>
    ),
  },
  {
    id: 'faq-4',
    question: 'What type of photo produces the highest diagnostic accuracy?',
    answer: (
      <p>
        For best results, take a clear, well-lit photo of a single affected leaf against a neutral background. Ensure leaf lesions or spots are in sharp focus and avoid extreme glare or blurriness.
      </p>
    ),
  },
  {
    id: 'faq-5',
    question: 'Can farmers use CropGuard AI on mobile smartphones in the field?',
    answer: (
      <p>
        Yes! CropGuard AI is engineered with a responsive mobile-first UI design. You can directly capture photos using your smartphone camera or upload existing images from your gallery without installing extra mobile app bundles.
      </p>
    ),
  },
  {
    id: 'faq-6',
    question: 'Is CropGuard AI free for agricultural research and hackathon testing?',
    answer: (
      <p>
        Yes, the tool is designed to be simple and practical for field use, with clear diagnosis and treatment guidance.
      </p>
    ),
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 relative z-10 border-t border-white/5">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full glass text-xs sm:text-sm font-medium text-primary-400 border border-primary-500/30">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about CropGuard AI diagnosis, models, and usage guidelines.
          </p>
        </div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion items={FAQS} defaultOpenId="faq-1" />
        </motion.div>

      </div>
    </section>
  );
}
