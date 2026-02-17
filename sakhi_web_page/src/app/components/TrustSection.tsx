import { motion } from 'motion/react';
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
              className="relative text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 transition-all hover:shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon */}
              <motion.div 
                className="relative inline-flex p-4 bg-purple-50 rounded-2xl mb-4"
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -10, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <pillar.icon className="w-6 h-6 text-purple-600" />
              </motion.div>

              {/* Badge */}
              <motion.div 
                className="relative inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                {pillar.badge}
              </motion.div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 mb-2">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
