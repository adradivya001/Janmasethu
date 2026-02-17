import { motion } from 'motion/react';
import { Baby, Heart, Users, Sparkles } from 'lucide-react';

const supportAreas = [
  {
    icon: Heart,
    title: "Emotional guidance through IVF cycles",
    examples: ["Managing treatment anxiety", "Handling failed cycles", "Celebrating small wins"]
  },
  {
    icon: Baby,
    title: "Pregnancy & parenting support",
    examples: ["Trimester-specific advice", "Postpartum care", "Early parenting questions"]
  },
  {
    icon: Users,
    title: "Navigating family planning decisions",
    examples: ["Treatment options explained", "Financial planning help", "Partner communication"]
  },
  {
    icon: Sparkles,
    title: "Cultural & language-specific care",
    examples: ["Traditional practices guidance", "Multi-language support", "Community connection"]
  }
];

export function SpecificWays() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Clear Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Specific ways Sakhi supports you
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Real help for real moments in your journey
          </p>
        </motion.div>

        {/* Support Areas - Progressive Disclosure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {supportAreas.map((area, index) => (
            <motion.div
              key={index}
              className="group relative p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.3 }}
              />

              {/* Icon */}
              <motion.div 
                className="relative inline-flex p-3 bg-purple-100 rounded-2xl mb-4"
                whileHover={{ 
                  scale: 1.15,
                  rotate: 360
                }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <area.icon className="w-6 h-6 text-purple-600" />
              </motion.div>

              {/* Title */}
              <h3 className="relative text-xl font-bold text-gray-900 mb-4">
                {area.title}
              </h3>

              {/* Examples - Show Don't Tell */}
              <ul className="relative space-y-2">
                {area.examples.map((example, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-2 text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.1 }}
                  >
                    <motion.span 
                      className="text-purple-500 mt-1"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ 
                        duration: 2,
                        delay: index * 0.2 + i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      •
                    </motion.span>
                    <span className="text-sm">{example}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
