import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CountUpStatProps {
  stat: string;
  label: string;
  delay?: number;
}

export default function CountUpStat({ stat, label, delay = 0 }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Extract number from stat string
          const numMatch = stat.match(/\d+/);
          if (numMatch) {
            const targetNum = parseInt(numMatch[0], 10);
            const suffix = stat.replace(/\d+/, '');

            let current = 0;
            const increment = Math.ceil(targetNum / 50);
            const timer = setInterval(() => {
              current += increment;
              if (current >= targetNum) {
                setDisplayValue(stat);
                clearInterval(timer);
              } else {
                setDisplayValue(current + suffix);
              }
            }, 30);
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [stat, label]);

  return (
    <motion.div
      id={`stat-${label}`}
      className="text-center p-8 rounded-xl bg-card border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      <motion.h3
        className="text-4xl md:text-5xl font-bold text-accent mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        {displayValue}
      </motion.h3>
      <p className="text-foreground/70 font-medium">{label}</p>
    </motion.div>
  );
}
