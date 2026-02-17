import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const comparisons = [
    {
        feature: "Emotional Intelligence",
        sakhi: "High - An empathetic companion who truly listens",
        others: "Low - Just a digital log for data entry"
    },
    {
        feature: "Availability",
        sakhi: "Instant 24/7 support, especially in lonely hours",
        others: "Limited to standard business hours"
    },
    {
        feature: "Personalization",
        sakhi: "Deeply tailored to your unique body and heart",
        others: "Generic, one-size-fits-all templates"
    },
    {
        feature: "Medical Accuracy",
        sakhi: "Evidence-based guidance from verified experts",
        others: "Often based on unverified crowdsourced info"
    },
    {
        feature: "Language support",
        sakhi: "Speaks your heart’s language (English, Hindi, Telugu)",
        others: "Mostly restricted to English only"
    }
];

interface WhyChooseSakhiProps {
    onCtaClick?: () => void;
}

export function WhyChooseSakhi({ onCtaClick }: WhyChooseSakhiProps) {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        Why choose Sakhi?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600">
                        Support that works for your life, not the other way around
                    </p>
                </motion.div>

                {/* Comparison Table */}
                <motion.div
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                >
                    {/* Header Row */}
                    <motion.div
                        className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-primary to-[#EC4899] text-white"
                        animate={{
                            backgroundPosition: ['0% center', '100% center', '0% center'],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ backgroundSize: '200% 100%' }}
                    >
                        <motion.div
                            className="text-sm md:text-base font-semibold"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Feature
                        </motion.div>
                        <motion.div
                            className="text-sm md:text-base font-semibold text-center"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Sakhi ✨
                        </motion.div>
                        <motion.div
                            className="text-sm md:text-base font-semibold text-center opacity-80"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 0.8, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Traditional Support
                        </motion.div>
                    </motion.div>

                    {/* Comparison Rows */}
                    {comparisons.map((item, index) => (
                        <motion.div
                            key={index}
                            className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100 last:border-b-0 hover:bg-primary/5 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            {/* Feature */}
                            <div className="text-sm md:text-base text-gray-900 font-medium">
                                {item.feature}
                            </div>

                            {/* Sakhi */}
                            <div className="flex items-center justify-center gap-2">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                                    whileHover={{ scale: 1.3, rotate: 360 }}
                                >
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                </motion.div>
                                <motion.span
                                    className="text-sm md:text-base text-gray-700 text-center"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 + 0.3 }}
                                >
                                    {item.sakhi}
                                </motion.span>
                            </div>

                            {/* Others */}
                            <div className="flex items-center justify-center gap-2">
                                <motion.div
                                    initial={{ scale: 0, rotate: 180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                                >
                                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                                </motion.div>
                                <motion.span
                                    className="text-sm md:text-base text-gray-500 text-center"
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 + 0.3 }}
                                >
                                    {item.others}
                                </motion.span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
