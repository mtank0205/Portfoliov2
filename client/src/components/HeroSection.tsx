import { useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const totalFrames = 50;

  // Track scroll progress over the 200vh height of the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fade out and translate content upwards as we scroll down
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  // Text reveal animation using CSS transitions
  useEffect(() => {
    if (nameRef.current) {
      const text = nameRef.current.textContent || '';
      nameRef.current.innerHTML = text
        .split('')
        .map((char) => `<span class="char" style="opacity: 0;">${char}</span>`)
        .join('');

      const chars = nameRef.current.querySelectorAll('.char');
      chars.forEach((char, idx) => {
        setTimeout(() => {
          (char as HTMLElement).style.transition = 'opacity 0.6s ease-out';
          (char as HTMLElement).style.opacity = '1';
        }, 600 + idx * 50);
      });
    }
  }, []);

  // Helper to draw frame on canvas with object-cover aspect ratio behavior
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Cover aspect ratio
      const r = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const nw = imgWidth * r;
      const nh = imgHeight * r;
      const cx = (canvasWidth - nw) / 2;
      const cy = (canvasHeight - nh) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, cx, cy, nw, nh);
    }
  };

  // Preload frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/scroll-animation/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        // Draw first frame once loaded
        if (i === 1) {
          drawFrame(0);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Handle Resize & Canvas scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;

      // Draw current frame immediately on resize
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(progress * totalFrames)
      );
      drawFrame(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update canvas when scroll position changes
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(latest * totalFrames)
    );
    drawFrame(frameIndex);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <div id="home" ref={containerRef} className="h-[180vh] relative">
      <section
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Underlay background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-background to-purple-950/10" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('/manus-storage/accent-pattern_742e7f46.png')`,
              backgroundSize: '400px 400px',
            }}
          />
        </div>

        {/* Scroll-driven canvas animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-[1] opacity-70 mix-blend-screen"
        />

        {/* Overlay gradient to keep text highly legible and fade canvas edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 z-[2]" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-lg text-accent font-medium">Hello, I'm</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            ref={nameRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
          >
            DHANVANTH S GURUKAR
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              Full Stack Developer • AI Builder • Problem Solver
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 rounded-lg bg-accent text-accent-foreground font-medium transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 rounded-lg border border-accent text-accent font-medium transition-all duration-300 hover:bg-accent/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6 text-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
