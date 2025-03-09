
import { cn } from '@/lib/utils';

export const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const slideInFromLeft = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const slideInFromRight = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const slideInFromBottom = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerChildren || 0.05,
      delayChildren: delayChildren || 0
    }
  }
});

export const getFadeInStaggerClass = (index: number, baseDelay = 100) => {
  return cn(
    'opacity-0 translate-y-4',
    'animate-[fade-in_0.5s_ease-out_forwards]',
    `[animation-delay:${baseDelay + (index * 100)}ms]`
  );
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};
