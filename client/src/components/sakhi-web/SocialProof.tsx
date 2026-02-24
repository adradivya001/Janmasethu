import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Priya M.",
        location: "Mumbai",
        text: "After two failed IVF cycles, I was emotionally drained. Sakhi helped me process my grief and find hope again.",
        rating: 5,
        highlight: "Found hope again"
    },
    {
        name: "Ananya K.",
        location: "Bangalore",
        text: "Having support in Hindi made all the difference. Sakhi understands our cultural context in a way others don't.",
        rating: 5,
        highlight: "Cultural understanding"
    },
    {
        name: "Divya S.",
        location: "Hyderabad",
        text: "3 AM pregnancy anxiety? Sakhi was there. No judgment, just compassion. It's like having a friend who truly gets it.",
        rating: 5,
        highlight: "Always available"
    }
];

export function SocialProof() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        Real stories from real women
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600">
                        Join thousands who found their compassionate companion
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="relative p-8 bg-gradient-to-br from-[#F5F7FF] to-[#FFECEF] rounded-3xl border border-primary/10 overflow-hidden"
                            variants={{
                                hidden: { opacity: 0, y: 30, rotateX: -15 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0,
                                    transition: {
                                        delay: index * 0.15,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    }
                                },
                                hover: {
                                    y: -12,
                                    scale: 1.03,
                                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
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
                                willChange: 'transform'
                            }}
                        >
                            {/* Animated shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 5,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Quote Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                            >
                                <Quote className="w-8 h-8 text-primary/50 mb-4" />
                            </motion.div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + i * 0.1 }}
                                        whileHover={{ scale: 1.3, rotate: 360 }}
                                    >
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    </motion.div>
                                ))}
                            </div>


                            {/* Text */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-6 border-t border-primary/20">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-[#EC4899] rounded-full flex items-center justify-center text-white font-semibold">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Stats */}
                <motion.div
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {[
                        { value: "10,000+", label: "Women supported" },
                        { value: "95%", label: "Satisfaction rate" },
                        { value: "24/7", label: "Always available" },
                        { value: "3", label: "Languages" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                            whileHover={{ scale: 1.1, y: -5 }}
                        >
                            <motion.div
                                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                            >
                                {stat.value}
                            </motion.div>
                            <motion.div
                                className="text-sm md:text-base text-gray-600"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.6 }}
                            >
                                {stat.label}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
