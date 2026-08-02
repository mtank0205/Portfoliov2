import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  challenges?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  fullDescription,
  image,
  technologies,
  liveLink,
  githubLink,
  challenges,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isExpanded]);

  return (
    <>
      <motion.div
        className="group rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: id * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        onClick={() => setIsExpanded(true)}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {liveLink && (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                View Live
              </motion.a>
            )}
            {githubLink && (
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-accent text-accent font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </motion.a>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-foreground/70 text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-full bg-secondary text-foreground/60 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            data-lenis-prevent
          >
            <motion.div
              className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              {/* Modal Header Image */}
              <div className="relative h-64 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>

                {/* Full Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-accent">Overview</h3>
                  <p className="text-foreground/80 leading-relaxed">{fullDescription}</p>
                </div>

                {/* Challenges */}
                {challenges && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-accent">Challenges</h3>
                    <p className="text-foreground/80 leading-relaxed">{challenges}</p>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-accent">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-secondary text-foreground/80 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-6 border-t border-border">
                  {liveLink && (
                    <motion.a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      View Live
                    </motion.a>
                  )}
                  {githubLink && (
                    <motion.a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-lg border border-accent text-accent font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      View on GitHub
                    </motion.a>
                  )}
                </div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 p-2 rounded-lg bg-card/80 backdrop-blur hover:bg-card transition-colors"
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
