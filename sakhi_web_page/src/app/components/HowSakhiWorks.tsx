import { motion } from 'motion/react';
import { MessageSquare, Brain, Heart, Shield } from 'lucide-react';

export function HowSakhiWorks() {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Share Your Journey",
      description: "Start a conversation with Sakhi about your fertility journey, concerns, and questions in a safe space.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Get personalized guidance based on culturally-aware AI that understands your unique context.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Emotional Support",
      description: "Receive compassionate support that addresses both your emotional and informational needs.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your conversations are completely private and secure, with end-to-end encryption.",
      color: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            How Sakhi Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to emotional wellness and informed decision-making starts here
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Hover Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-gray-50 transition-colors">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  className={`relative inline-flex p-4 bg-gradient-to-br ${step.color} text-white rounded-xl shadow-lg mb-6`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Animated Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium text-lg shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started with Sakhi
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
