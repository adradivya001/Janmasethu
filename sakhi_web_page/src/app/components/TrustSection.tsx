import { motion } from 'motion/react';
import { Shield, Lock, Heart } from 'lucide-react';

const LanguageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
  </svg>
);

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
    icon: LanguageIcon,
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
