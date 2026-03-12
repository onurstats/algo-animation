"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "@/hooks/useAnimation";

export function StepDescription() {
  const { currentStep } = useAnimation();

  return (
    <div className="flex min-h-[3rem] items-center rounded-lg bg-surface px-4 py-2">
      <AnimatePresence mode="wait">
        {currentStep ? (
          <motion.p
            key={currentStep.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-sm text-text-secondary"
          >
            {currentStep.description}
          </motion.p>
        ) : (
          <p className="text-sm text-text-muted">
            Press Play or use arrow keys to step through the animation.
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}
