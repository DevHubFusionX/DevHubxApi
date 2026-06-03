"use client";

import React, { memo, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  type Variants,
  type Transition,
  AnimatePresence,
} from "framer-motion";

// ─────────────────────────────────────────────────
// Shared Defaults
// ─────────────────────────────────────────────────

const DEFAULT_VIEWPORT = { once: true, margin: "-60px" as const };

const EASE_OUT: Transition["ease"] = [0.25, 0.1, 0.25, 1];
const EASE_SPRING: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

// ─────────────────────────────────────────────────
// Variant Factories
// ─────────────────────────────────────────────────

function makeFadeUp(y = 24): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };
}

function makeFadeIn(): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
}

function makeBlurFadeUp(y = 32, blur = 12): Variants {
  return {
    hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
}

function makeSlideIn(direction: "left" | "right", offset = 60): Variants {
  const x = direction === "left" ? -offset : offset;
  return {
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0 },
  };
}

function makeScaleIn(scale = 0.92): Variants {
  return {
    hidden: { opacity: 0, scale },
    visible: { opacity: 1, scale: 1 },
  };
}

function makeStaggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

function makeStaggerItem(y = 24): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };
}

// ─────────────────────────────────────────────────
// Shared Props Interface
// ─────────────────────────────────────────────────

interface MotionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  /** Override the default viewport trigger */
  viewport?: { once?: boolean; margin?: string; amount?: number };
}

// ─────────────────────────────────────────────────
// FadeUp — Scroll-triggered fade + translateY
// ─────────────────────────────────────────────────

export const FadeUp = memo(function FadeUp({
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  viewport,
}: MotionProps) {
  return (
    <motion.div
      variants={makeFadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? DEFAULT_VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// FadeIn — Scroll-triggered opacity only
// ─────────────────────────────────────────────────

export const FadeIn = memo(function FadeIn({
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  viewport,
}: MotionProps) {
  return (
    <motion.div
      variants={makeFadeIn()}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? DEFAULT_VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// BlurFadeUp — Blur + fade + translateY (large text)
// ─────────────────────────────────────────────────

export const BlurFadeUp = memo(function BlurFadeUp({
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  viewport,
}: MotionProps) {
  return (
    <motion.div
      variants={makeBlurFadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? DEFAULT_VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// SlideIn — Directional horizontal slide on scroll
// ─────────────────────────────────────────────────

interface SlideInProps extends MotionProps {
  direction?: "left" | "right";
  offset?: number;
}

export const SlideIn = memo(function SlideIn({
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  direction = "left",
  offset = 60,
  viewport,
}: SlideInProps) {
  return (
    <motion.div
      variants={makeSlideIn(direction, offset)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? DEFAULT_VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// ScaleIn — Scale entrance on scroll
// ─────────────────────────────────────────────────

interface ScaleInProps extends MotionProps {
  scale?: number;
}

export const ScaleIn = memo(function ScaleIn({
  children,
  className,
  style,
  delay = 0,
  duration = 0.5,
  scale = 0.92,
  viewport,
}: ScaleInProps) {
  return (
    <motion.div
      variants={makeScaleIn(scale)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? DEFAULT_VIEWPORT}
      transition={{ duration, delay, ...EASE_SPRING }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// StaggerContainer — Orchestrates staggered children
// ─────────────────────────────────────────────────

interface StaggerContainerProps extends MotionProps {
  stagger?: number;
  delayChildren?: number;
}

export const StaggerContainer = memo(function StaggerContainer({
  children,
  className,
  style,
  stagger = 0.1,
  delayChildren = 0,
  viewport,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={makeStaggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? DEFAULT_VIEWPORT}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// StaggerItem — Child inside a StaggerContainer
// ─────────────────────────────────────────────────

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: number;
  y?: number;
}

export const StaggerItem = memo(function StaggerItem({
  children,
  className,
  style,
  duration = 0.5,
  y = 24,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={makeStaggerItem(y)}
      transition={{ duration, ease: EASE_OUT }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────
// PresenceBlock — For tab-switched content (fade in/out)
// ─────────────────────────────────────────────────

interface PresenceBlockProps {
  children: ReactNode;
  /** A unique key that changes when content swaps */
  motionKey: string | number;
  className?: string;
  duration?: number;
}

export const PresenceBlock = memo(function PresenceBlock({
  children,
  motionKey,
  className,
  duration = 0.25,
}: PresenceBlockProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={motionKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration, ease: EASE_OUT }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

// ─────────────────────────────────────────────────
// Re-export AnimatePresence for convenience
// ─────────────────────────────────────────────────

export { AnimatePresence };
export { motion };
