import { useReducedMotion } from "motion/react";

/**
 * True when it's fine to animate.
 *
 * `index.css` already flattens CSS animation and transition under
 * `prefers-reduced-motion`, but the motion primitives animate from JavaScript,
 * which that media query cannot reach. Every animated call site checks this and
 * renders the finished state instead.
 *
 * The rule that matters: a reduced-motion fallback must render the *content*,
 * never an empty element waiting for an animation that will not run.
 */
export function useMotionOK(): boolean {
    return !useReducedMotion();
}
