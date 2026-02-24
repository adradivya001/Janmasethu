import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ValuePropositionProps {
    onCtaClick?: () => void;
}

export function ValueProposition({ onCtaClick }: ValuePropositionProps) {
    return (
        <section className="relative py-20 md:py-32 bg-white overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-[#EC4899]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <div className="max-w-5xl mx-auto px-6 relative">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Benefit-Driven Headline */}
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-serif"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Your fertility journey
                        <motion.span
                            className="block bg-gradient-to-r from-primary via-[#EC4899] to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                            animate={{
                                backgroundPosition: ['0% center', '200% center', '0% center'],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            shouldn't feel lonely
                        </motion.span>
                    </motion.h2>

                    {/* Outcome-Centric Description */}
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
                        Whether you are exploring options, undergoing treatment, or simply need someone to listen, Sakhi is here to offer non-judgmental support and personalized care tailored to your unique path.
                    </p>

                    {/* Single Dominant Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            onClick={onCtaClick}
                            className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-[#EC4899] text-white rounded-full font-semibold text-lg shadow-lg overflow-hidden flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#EC4899] to-primary"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative flex items-center gap-2">
                                Start Talking to Sakhi
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                    </div>

                    {/* Trust Signal - Minimal */}
                    <motion.p
                        className="mt-8 text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Join 10,000+ women who found their compassionate companion
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
