import { motion } from 'framer-motion';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number; // 1-3 for sizing
}
const techStack = [
  {
    category: "💻 Frontend",
    technologies: ["React", "React Native"],
  },
  {
    category: "⚙️ Backend",
    technologies: ["Node.js", "Express.js", "FastAPI"],
  },
  {
    category: "🐍 Languages",
    technologies: ["Python", "Java"],
  },
  {
    category: "🤖 AI & Computer Vision",
    technologies: [
      "Llama 3.2",
      "OpenCV",
      "YOLOv8",
      "InsightFace",
      "Scikit-learn",
    ],
  },
  {
    category: "⛓️ Blockchain",
    technologies: ["Algorand", "PyTeal", "IPFS"],
  },
  {
    category: "🗄️ Database & Tools",
    technologies: ["MongoDB", "Git", "GitHub", "Raspberry Pi"],
  },
];

export default function SkillsCloud() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getSizeClass = (level: number) => {
    switch (level) {
      case 3:
        return 'text-lg md:text-xl';
      case 2:
        return 'text-base md:text-lg';
      default:
        return 'text-sm md:text-base';
    }
  };

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>

        {/* Skills Cloud */}
        {/* Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map((section, sectionIdx) => (
            <motion.div
              key={section.category}
              className="rounded-xl border border-accent/20 bg-card/50 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: sectionIdx * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 0 25px rgba(59,130,246,0.2)",
              }}
            >
              <h3 className="text-xl font-semibold text-accent mb-4">
                {section.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {section.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 rounded-full bg-secondary text-foreground/80 text-sm font-medium hover:bg-accent hover:text-black transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
