import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Heart } from 'lucide-react';

const trustPillars = [
    {
        icon: Lock,
        title: "On-Device Privacy",
        description: "Your conversations stay on your phone. No cloud storage, no data sharing.",
        badge: "100% Private"
    },
    {
        icon: Shield,
        title: "Medical-Grade Security",
        description: "Bank-level encryption protects every interaction.",
        badge: "Encrypted"
    },
    {
        icon: Globe,
        title: "Multi-Language",
        description: "Express yourself in English, Hindi, or Telugu.",
        badge: "3 Languages"
    },
    {
        icon: Heart,
        title: "Expert-Reviewed",
        description: "Content validated by fertility specialists and counselors.",
        badge: "Verified"
    }
];

export function TrustSection() {
    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
                        Built with trust at its core
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your privacy and safety are non-negotiable
                    </p>
                </motion.div>

                {/* Trust Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustPillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            className="group relative text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 transition-all hover:shadow-2xl overflow-hidden"
                            variants={{
                                hidden: { opacity: 0, y: 30, scale: 0.95 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    }
                                },
                                hover: {
                                    y: -12,
                                    scale: 1.05,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, margin: "-50px" }}
                            style={{
                                backfaceVisibility: 'hidden',
                                WebkitFontSmoothing: 'antialiased',
                                willChange: 'transform'
                            }}
                        >
                            {/* Animated gradient background on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#EC4899]/5 opacity-0 group-hover:opacity-100 pointer-events-none"
                                transition={{ duration: 0.3 }}
                            />

                            {/* Icon */}
                            <motion.div
                                className="relative z-10 inline-flex p-4 bg-primary/10 rounded-2xl mb-4"
                                whileHover={{
                                    scale: 1.15,
                                    rotate: [0, -10, 10, -10, 0]
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <pillar.icon className="w-6 h-6 text-primary" />
                            </motion.div>

                            {/* Badge */}
                            <motion.div
                                className="relative z-10 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {pillar.badge}
                            </motion.div>

                            {/* Title */}
                            <h3 className="relative z-10 font-bold text-gray-900 mb-2 font-serif">
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className="relative z-10 text-sm text-gray-600 leading-relaxed">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
