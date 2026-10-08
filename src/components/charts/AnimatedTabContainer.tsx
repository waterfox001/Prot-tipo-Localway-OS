import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedTabContainerProps {
  children: React.ReactNode;
  tabKey?: string;
  className?: string;
}

export const AnimatedTabContainer: React.FC<AnimatedTabContainerProps> = ({
  children,
  tabKey = 'view-content',
  className = '',
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // easeOutQuint feel
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
