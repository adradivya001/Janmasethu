import { motion } from 'motion/react';
import { Clock, ShieldCheck } from 'lucide-react';

const LanguageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
);

const features = [
  {
    icon: MessageIcon,
    title: "Emotional Support",
    outcome: "Feel heard and understood",
    description: "Compassionate support that gets the emotional weight of your journey",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    outcome: "Support when you need it",
    description: "3 AM anxiety? We're here. No appointments, no waiting",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    outcome: "Your story stays yours",
    description: "On-device processing means complete confidentiality",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: LanguageIcon,
    title: "Cultural Support",
    outcome: "Speak your language",
    description: "Culturally-aware guidance in English, Hindi, or Telugu",
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
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
                className="relative h-full p-6 md:p-8 bg-white rounded-3xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-2xl overflow-hidden"
                whileHover={{ borderColor: "rgb(192, 132, 252)" }}
              >
                {/* Hover gradient effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                <h3 className="relative text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <motion.p
                  className="text-purple-600 font-medium text-sm mb-3"
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
