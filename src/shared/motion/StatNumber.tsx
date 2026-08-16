import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useMotionOK } from "./useMotionOK";

/**
 * Counts a stat up when it first scrolls into view.
 *
 * Every stat on this site is a formatted string rather than a number —
 * "1800+ • Knight", "500+", "3+ Years", "2 Stars". So this animates the leading
 * integer only and prints the remainder verbatim; anything not starting with a
 * digit is rendered untouched.
 *
 * Two things this does not do, both learned the hard way:
 *
 *   - **No thousands separator.** The obvious build on `AnimatedNumber` renders
 *     `Math.round(v).toLocaleString()`, which turned a LeetCode rating into
 *     "1,800+ • Knight". These are ratings and counts, not currency.
 *   - **Never leaves a zero in the document.** The animated digits start at 0
 *     and only run once in view, so anything off-screen sat at "0+ • Knight" —
 *     visible to a crawler, a screen reader, and any social-card screenshot.
 *     The true string is always present in an `sr-only` span; the animated copy
 *     is `aria-hidden`.
 */
export default function StatNumber({
    value,
    className,
}: {
    value: string;
    className?: string;
}) {
    const motionOK = useMotionOK();
    const ref = useRef<HTMLSpanElement>(null);
    const [run, setRun] = useState(false);

    const match = /^(\d+)(.*)$/s.exec(value);
    const target = match ? Number(match[1]) : 0;

    const spring = useSpring(0, { bounce: 0, duration: 1400 });
    const digits = useTransform(spring, (v) => String(Math.round(v)));

    useEffect(() => {
        if (run) spring.set(target);
    }, [run, spring, target]);

    useEffect(() => {
        const el = ref.current;
        if (!el || run || !match || !motionOK) return;
        if (typeof IntersectionObserver === "undefined") {
            setRun(true);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setRun(true);
                    io.disconnect();
                }
            },
            { rootMargin: "-8%" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [match, motionOK, run]);

    if (!match || !motionOK) return <span className={className}>{value}</span>;

    const [, , rest] = match;

    return (
        <span ref={ref} className={className}>
            <span className="sr-only">{value}</span>
            <span aria-hidden="true">
                <motion.span>{digits}</motion.span>
                {rest}
            </span>
        </span>
    );
}
