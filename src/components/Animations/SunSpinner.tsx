import { motion, Transition, Variants } from "framer-motion";

const pathVariants = {
  hidden: {
    opacity: 0,
    rotate: -180,
    pathLength: 0,
    strokeWidth: 1,
    stroke: "white",
  },
  spin: {
    opacity: 1,
    rotate: 0,
    pathLength: 1,
    strokeWidth: 2,
    stroke: "yellow",
  },
} as Variants;

const pathTransition = {
  ease: "anticipate",
  damping: 300,
  duration: 3,
  repeat: Infinity,
  repeatType: "reverse",
} as Transition;

export function SunSpinner() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="100"
      height="100"
    >
      <motion.path
        initial="hidden"
        animate="spin"
        variants={pathVariants}
        transition={pathTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </motion.svg>
  );
}
