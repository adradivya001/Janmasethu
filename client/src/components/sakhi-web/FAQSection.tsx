import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        question: "Is Sakhi free to use?",
        answer: "Yes! Sakhi is completely free. We believe emotional support during your fertility journey should be accessible to everyone."
    },
    {
        question: "How is my privacy protected?",
        answer: "All conversations happen on your device. We use on-device AI processing, which means your data never leaves your phone. No cloud storage, no sharing, no tracking."
    },
    {
        question: "Can Sakhi replace my doctor?",
        answer: "No. Sakhi provides emotional support and general guidance, but is not a replacement for medical advice. Always consult your healthcare provider for medical decisions."
    },
    {
        question: "What languages does Sakhi support?",
        answer: "Sakhi currently supports English, Hindi, and Telugu. You can switch languages anytime during your conversation."
    },
    {
        question: "How does Sakhi understand cultural context?",
        answer: "Sakhi is trained on diverse cultural perspectives around fertility, family planning, and parenting practices specific to India. This helps provide relevant, culturally-sensitive guidance."
    },
    {
        question: "Is there someone I can talk to in a crisis?",
        answer: "While Sakhi provides 24/7 support, in urgent situations, please reach out to crisis helplines or emergency services. Sakhi will also provide relevant crisis resources when needed."
    }
];

interface FAQSectionProps {
    onCtaClick?: () => void;
}

export function FAQSection({ onCtaClick }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        Your questions answered
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600">
                        Everything you need to know about Sakhi
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            {/* Question */}
                            <motion.button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                                whileHover={{ x: 4 }}
                            >
                                <span className="font-semibold text-gray-900 text-lg pr-4 font-serif">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    )}
                                </motion.div>
                            </motion.button>

                            {/* Answer */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-5 text-gray-600 leading-relaxed bg-primary/5">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    className="mt-12 text-center p-8 bg-gradient-to-br from-[#F5F7FF] to-[#FFECEF] rounded-3xl border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="font-bold text-xl text-gray-900 mb-2 font-serif">
                        Ready to find your Sakhi?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Join a community that prioritizes your emotional well-being as much as your clinical success.
                    </p>
                    <motion.button
                        onClick={onCtaClick}
                        className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started Today
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
