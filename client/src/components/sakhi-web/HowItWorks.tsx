import { motion } from 'framer-motion';
import { MessageCircle, Clock, Shield, Globe } from 'lucide-react';

const features = [
    {
        icon: MessageCircle,
        title: "Emotional Support",
        outcome: "Feel heard and understood",
        description: "Receive guidance tailored specifically to your medical history and emotional needs.",
        color: "text-[#EC4899]",
        bgColor: "bg-[#EC4899]/10"
    },
    {
        icon: Clock,
        title: "24/7 Availability",
        outcome: "Support when you need it",
        description: "A comforting presence available whenever you need it—day or night",
        color: "text-primary",
        bgColor: "bg-primary/10"
    },
    {
        icon: Shield,
        title: "Privacy & Security",
        outcome: "Your story stays yours",
        description: "Your data and conversations are always encrypted and handled with the utmost sensitivity.",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        icon: Globe,
        title: "Clinical Accuracy",
        outcome: "Verified guidance for you",
        description: "Access reliable, evidence-based information regarding IVF, IUI, and reproductive health.",
        color: "text-green-600",
        bgColor: "bg-green-50"
    }
];

export function HowItWorks() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header - Outcome Focused */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        How Sakhi Works
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Simple support that fits your life
                    </p>
                </motion.div>

                {/* Feature Grid - Visual First, Mobile Optimized */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Card - Clean, Minimal */}
                            <motion.div
                                className="relative h-full p-6 md:p-8 bg-white rounded-3xl border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl overflow-hidden"
                                whileHover={{ borderColor: "hsl(var(--primary))" }}
                            >
                                {/* Hover gradient effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#EC4899]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />

                                {/* Icon - Strong Visual Hierarchy */}
                                <motion.div
                                    className={`relative inline-flex p-3 ${feature.bgColor} rounded-2xl mb-4`}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -10, 10, -10, 0]
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                </motion.div>

                                {/* Outcome First, Feature Second */}
                                <h3 className="relative text-xl font-bold text-gray-900 mb-2 font-serif">
                                    {feature.title}
                                </h3>
                                <motion.p
                                    className="relative z-10 text-primary font-medium text-sm mb-3"
                                    initial={{ x: -10, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    → {feature.outcome}
                                </motion.p>
                                <p className="relative text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
