import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center gap-8">
        {/* DG Logo Animation */}
        <motion.div
          className="text-7xl font-bold"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            DG
          </span>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1.8,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="text-sm text-muted-foreground tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Initializing
        </motion.p>
      </div>
    </motion.div>
  );
}
