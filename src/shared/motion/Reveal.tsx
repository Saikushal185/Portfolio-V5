import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { motion } from "motion/react";
import { TextEffect } from "./text-effect";
import { TextScramble } from "./text-scramble";
import { AnimatedGroup } from "./animated-group";
import { useMotionOK } from "./useMotionOK";

/**
 * The wrappers every section animates through.
 *
 * They exist so the reduced-motion fallback is written once. Calling the raw
 * primitives directly is fine, but then each call site has to remember to
 * render the text when motion is off — and forgetting leaves a blank page.
 */

/** Fire once, when the element first scrolls into view. */
function useInViewOnce<T extends HTMLElement>(margin = "-12%") {
    const ref = useRef<T>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || seen) return;

        // No IntersectionObserver (jsdom, very old Safari) — show it rather
        // than leaving content stuck behind a trigger that never fires.
        if (typeof IntersectionObserver === "undefined") {
            setSeen(true);
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { rootMargin: margin },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [margin, seen]);

    return [ref, seen] as const;
}

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface RevealTextProps {
    children: string;
    as?: Tag;
    per?: "word" | "char" | "line";
    preset?: "fade" | "blur" | "fade-in-blur" | "scale" | "slide";
    delay?: number;
    speedReveal?: number;
    className?: string;
}

/** Headline / body reveal. Animates the first time it enters the viewport. */
export function RevealText({
    children,
    as = "p",
    per = "word",
    preset = "fade-in-blur",
    delay = 0,
    speedReveal = 1,
    className,
}: RevealTextProps) {
    const ok = useMotionOK();
    const [ref, seen] = useInViewOnce<HTMLDivElement>();

    if (!ok) {
        const Tag = as;
        return <Tag className={className}>{children}</Tag>;
    }

    return (
        <div ref={ref}>
            {seen ? (
                <TextEffect
                    as={as}
                    per={per}
                    preset={preset}
                    delay={delay}
                    speedReveal={speedReveal}
                    className={className}
                >
                    {children}
                </TextEffect>
            ) : (
                // Reserve the space so the reveal doesn't shove the page down.
                // Transparent but still in the accessibility tree — a screen
                // reader shouldn't have to scroll the page to reach the text.
                <div className={className} style={{ opacity: 0 }}>
                    {children}
                </div>
            )}
        </div>
    );
}

/** Small uppercase label that decodes itself on entry. */
export function RevealEyebrow({
    children,
    className,
}: {
    children: string;
    className?: string;
}) {
    const ok = useMotionOK();
    const [ref, seen] = useInViewOnce<HTMLDivElement>();

    if (!ok) return <p className={className}>{children}</p>;

    return (
        <div ref={ref}>
            <TextScramble as="p" className={className} trigger={seen} duration={0.7} speed={0.03}>
                {children}
            </TextScramble>
        </div>
    );
}

/** Stagger a list of children in as the container enters view. */
export function RevealGroup({
    children,
    className,
    preset = "blur-slide",
}: {
    children: ReactNode;
    className?: string;
    preset?: "fade" | "slide" | "scale" | "blur" | "blur-slide" | "zoom";
}) {
    const ok = useMotionOK();
    const [ref, seen] = useInViewOnce<HTMLDivElement>();

    if (!ok) return <div className={className}>{children}</div>;

    return (
        <div ref={ref}>
            {seen ? (
                <AnimatedGroup className={className} preset={preset}>
                    {children}
                </AnimatedGroup>
            ) : (
                <div className={className} style={{ opacity: 0 }}>
                    {children}
                </div>
            )}
        </div>
    );
}

/**
 * Fade a whole block in, as one element.
 *
 * `RevealText per="word"` is right for a headline and wrong for body copy: a
 * 70-word paragraph becomes 70 animated spans, and three of them inside a
 * dialog that is itself mid-layout-morph measured at 17fps with 382 spans on
 * screen. One element per paragraph puts that back at frame rate, and long
 * prose reads better arriving whole anyway — word-by-word makes a reader wait
 * on text they could already have finished.
 */
export function FadeIn({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const ok = useMotionOK();
    if (!ok) return <div className={className}>{children}</div>;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay, ease: [0.22, 0.9, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}
