import { motion, AnimatePresence } from 'motion/react';
import { Baby, Compass, Heart, Languages, Sparkles } from 'lucide-react';
import { useState } from 'react';

const supportAreas = [
  {
    icon: Heart,
    title: "Emotional guidance through IVF cycles",
    summary: "Empathetic support for every stage of your treatment.",
    examples: ["Managing treatment anxiety", "Handling failed cycles", "Celebrating small wins"],
    color: "from-pink-400 to-rose-500",
    lightColor: "bg-pink-100",
    textColor: "text-pink-600"
  },
  {
    icon: Baby,
    title: "Pregnancy & parenting support",
    summary: "Expert guidance from conception to early parenting.",
    examples: ["Trimester-specific advice", "Postpartum care", "Early parenting questions"],
    color: "from-purple-400 to-indigo-500",
    lightColor: "bg-purple-100",
    textColor: "text-purple-600"
  },
  {
    icon: Compass,
    title: "Navigating family planning decisions",
    summary: "Clarity on options, finances, and communication.",
    examples: ["Treatment options explained", "Financial planning help", "Partner communication"],
    color: "from-blue-400 to-cyan-500",
    lightColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    icon: Languages,
    title: "Cultural & language-specific care",
    summary: "Support that respects your traditions and language.",
    examples: ["Traditional practices guidance", "Multi-language support", "Community connection"],
    color: "from-emerald-400 to-teal-500",
    lightColor: "bg-emerald-100",
    textColor: "text-emerald-600"
  }
];

export function SpecificWays() {
  const [activeArea, setActiveArea] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Clear Header */}
        <motion.div
          className="text-center md:text-left mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Specific ways Sakhi supports you
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            Real help for real moments in your journey.
          </p>
        </motion.div>

        {/* MOBILE VIEW: Orbital Hub */}
        <div className="md:hidden flex flex-col items-center">
          <div className="relative w-80 h-80 flex items-center justify-center mb-12">
            {/* Pulsing Center */}
            <motion.div
              className="absolute w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center z-20 shadow-xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: ["0 0 20px rgba(168, 85, 247, 0.4)", "0 0 40px rgba(168, 85, 247, 0.6)", "0 0 20px rgba(168, 85, 247, 0.4)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="text-white w-10 h-10" />
            </motion.div>

            {/* Orbiting Icons */}
            {supportAreas.map((area, index) => {
              const angle = (index * (360 / supportAreas.length)) * (Math.PI / 180);
              const radius = 110;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={index}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center z-30 border-2 transition-all ${activeArea === index
                      ? "bg-white border-purple-500 shadow-lg scale-110"
                      : "bg-gray-50 border-transparent shadow-md"
                    }`}
                  style={{ x, y }}
                  onClick={() => setActiveArea(index)}
                  whileTap={{ scale: 0.9 }}
                >
                  <area.icon className={`w-7 h-7 ${activeArea === index ? area.textColor : 'text-gray-400'}`} />

                  {/* Connection Line */}
                  <div className={`absolute w-10 h-0.5 origin-left -z-10 bg-gradient-to-r from-purple-200 to-transparent`}
                    style={{
                      left: '50%',
                      transform: `rotate(${angle * (180 / Math.PI) + 180}deg)`,
                      width: `${radius - 40}px`
                    }}
                  />
                </motion.button>
              );
            })}

            {/* Outer Orbit Ring */}
            <div className="absolute w-[220px] h-[220px] border border-dashed border-purple-100 rounded-full" />
          </div>

          {/* Active Area Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-purple-100 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{supportAreas[activeArea].title}</h3>
              <p className="text-purple-600 font-medium text-sm mb-4">{supportAreas[activeArea].summary}</p>
              <ul className="space-y-3">
                {supportAreas[activeArea].examples.map((example, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${supportAreas[activeArea].color}`} />
                    {example}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP VIEW: Grid Cards */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {supportAreas.map((area, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <div className="relative flex gap-6">
                {/* Icon */}
                <motion.div
                  className={`shrink-0 w-16 h-16 ${area.lightColor} rounded-2xl flex items-center justify-center`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <area.icon className={`w-8 h-8 ${area.textColor}`} />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <ul className="space-y-2">
                    {area.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className={`text-xl leading-none ${area.textColor}`}>•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

