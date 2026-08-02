import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import CustomCursor from '@/components/CustomCursor';
import SkillsCloud from '@/components/SkillsCloud';
import ProjectCard from '@/components/ProjectCard';
import CountUpStat from '@/components/CountUpStat';
import { motion } from 'framer-motion';

/**
 * Home page - Main portfolio landing page
 * Design: Modern Premium Minimalism with smooth animations
 * Color Scheme: Dark mode (#09090B bg, #18181B cards, #3B82F6 accent)
 */
export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showLoading]);

  const projects = [
    {
      id: 1,
      title: "VisionMate — AI-Powered Assistive Smart Glasses",
      description:
        "Real-time computer vision system for visually impaired users.",
      fullDescription:
        "Developed an AI-powered assistive platform using YOLOv8 and InsightFace to help visually impaired users navigate their surroundings. The system performs object detection, face recognition, obstacle detection, GPS navigation, voice commands, object memory, and priority-based audio feedback through a distributed architecture involving Raspberry Pi, a Python ML server, and a mobile application.",
      image: "img1.png", // replace with your image
      technologies: [
        "Python",
        "YOLOv8",
        "InsightFace",
        "OpenCV",
        "React Native",
        "Raspberry Pi",
      ],
      githubLink: "https://github.com/mtank0205/VisionMate",
      challenges:
        "Building a low-latency computer vision pipeline while integrating multiple hardware and AI components for real-time assistance.",
    },
    {
      id: 2,
      title: "Hackathon Simulator & Evaluation Platform",
      description:
        "AI-powered platform for evaluating project ideas and GitHub repositories.",
      fullDescription:
        "Built an intelligent platform that evaluates hackathon ideas, analyzes GitHub repositories, and generates detailed reports using Llama 3.2 running locally via Ollama. The system includes automated scoring, repository insights, intelligent feedback generation, real-time collaboration, and PDF report generation.",
      image: "/img2.png",
      technologies: [
        "React",
        "Node.js",
        "Python",
        "MongoDB",
        "Llama 3.2",
        "Ollama",
      ],
      githubLink: "https://github.com/mtank0205/Mini-project",
      challenges:
        "Integrating local LLM inference with repository analysis while maintaining fast response times and protecting user data.",
    },
    {
      id: 3,
      title: "Ozark Sentinel — Blockchain Fraud Detection",
      description:
        "AI-powered Anti-Money Laundering platform using blockchain.",
      fullDescription:
        "Developed a decentralized AML platform capable of detecting fraud rings, shell companies, smurfing, and money mule networks using graph analysis. The system leverages Algorand blockchain, IPFS, NetworkX, and a risk-scoring engine to permanently flag suspicious accounts through Soul Bound Tokens.",
      image: "img3.png",
      technologies: [
        "Python",
        "FastAPI",
        "React",
        "Algorand",
        "IPFS",
        "NetworkX",
      ],
      githubLink: "https://github.com/mtank0205/Money-Muling-Detection",
      challenges:
        "Designing scalable graph-based fraud detection algorithms while integrating blockchain for immutable audit trails.",
    },
    {
      id: 4,
      title: "IP Risk Radar",
      description:
        "A cybersecurity intelligence platform that analyzes IP addresses to assess risk and identify potentially malicious network activity.",

      fullDescription:
        "Developed an IP intelligence platform that performs comprehensive analysis of IP addresses by combining geolocation, network information, threat intelligence, and reputation data into a unified dashboard. The system helps security analysts quickly identify suspicious IPs, detect potential threats, and make informed security decisions through automated risk assessment and visual insights.",

      image: "img4.png",

      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "Python",
        "MongoDB",
        "REST API",
        "Cybersecurity"
      ],

      githubLink: "https://github.com/mtank0205/IP-risk-radar",

      challenges:
        "Integrating multiple threat-intelligence sources, aggregating IP metadata efficiently, and presenting complex security information in a clear, actionable dashboard for rapid threat analysis."
    },
  ];

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Who I Am Card */}
            <motion.div
              className="p-8 rounded-xl bg-card border border-border hover:border-accent transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-accent">Who I Am</h3>
              <p className="text-foreground/80 leading-relaxed">
                I'm a final-year Computer Science student passionate about building intelligent, real-world software solutions. I specialize in full-stack development and AI-powered applications, with experience in computer vision, blockchain, and scalable web technologies. I enjoy transforming complex ideas into impactful products through innovation and problem-solving.
              </p>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              className="p-8 rounded-xl bg-card border border-border hover:border-accent transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Currently Building
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    Fully Autonomous De Novo Molecule Designer
                  </h4>

                  <p className="mt-2 text-foreground/75 leading-relaxed">
                    An AI-powered research platform that autonomously generates, evaluates,
                    and optimizes novel molecular structures for drug discovery. By combining
                    generative AI with molecular property prediction and optimization, the
                    system aims to accelerate the identification of potential therapeutic
                    compounds while reducing manual experimentation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-secondary p-3">
                    <h5 className="font-semibold">🧬 Molecule Generation</h5>
                    <p className="text-sm text-foreground/70">
                      Creates novel chemical structures using AI.
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-3">
                    <h5 className="font-semibold">⚗️ Property Prediction</h5>
                    <p className="text-sm text-foreground/70">
                      Evaluates molecular properties and drug-likeness.
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-3">
                    <h5 className="font-semibold">🔄 Optimization</h5>
                    <p className="text-sm text-foreground/70">
                      Iteratively improves candidate molecules.
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-3">
                    <h5 className="font-semibold">🚀 Autonomous Pipeline</h5>
                    <p className="text-sm text-foreground/70">
                      End-to-end workflow from generation to evaluation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Cloud */}
      <SkillsCloud />


      {/* Projects Section */}
      <section id="projects" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      {/* Experience Timeline */}
      <section
        id="experience"
        className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                year: "Aug 2026 – Present",
                title: "Data Engineer Intern",
                company: "Kloud9",
                description:
                  "Working on data engineering solutions, backend development, scalable data pipelines, API integrations, and real-world data processing systems.",
              },
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                className="flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent" />
                </div>

                <div className="pb-8">
                  <p className="text-accent font-medium">{exp.year}</p>

                  <h3 className="text-xl font-bold mt-1">
                    {exp.title}
                  </h3>

                  <p className="text-foreground/60 font-medium">
                    {exp.company}
                  </p>

                  <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Build Something Amazing
          </motion.h2>

          <motion.p
            className="text-xl text-foreground/70 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            I'm always interested in hearing about new projects and opportunities.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:[dhanvanths123@gmail.com]"
              className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-medium transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Email Me
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/dhanvanth-s-gurukar"
              className="px-8 py-3 rounded-lg border border-accent text-accent font-medium transition-all duration-300 hover:bg-accent/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/mtank0205"
              className="px-8 py-3 rounded-lg border border-accent text-accent font-medium transition-all duration-300 hover:bg-accent/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              GitHub
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              Built with Next.js, Tailwind CSS, Framer Motion, and Anime.js
            </p>
            <p className="text-foreground/60 text-sm">
              © 2026 Dhanvanth Gurukar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
