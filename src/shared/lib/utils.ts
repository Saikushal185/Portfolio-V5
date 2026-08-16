import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, letting later Tailwind classes beat earlier ones.
 *
 * This used to be a plain `.join(" ")`. That breaks the motion primitives,
 * which set their own colour and layout classes and expect a caller's
 * `className` to override them — with a naive join both classes survive and
 * the winner is whichever Tailwind emitted last, not the one passed in.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
