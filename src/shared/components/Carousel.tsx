import { useState, type ReactNode } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    type PanInfo,
    type Variants,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMotionOK } from "../motion/useMotionOK";

interface Props {
    items: ReactNode[];
    /** Announced to screen readers and printed above the counter. */
    label: string;
    className?: string;
}

/**
 * A minimal one-at-a-time carousel.
 *
 * The drag mechanic is ported from Watermelon UI's `carousel-slider`: a
 * `useMotionValue` on x, rotation derived from it with `useTransform`, and a
 * 120px `PanInfo` threshold to commit the turn. Theirs is a photo stack with a
 * fixed square frame, hugeicons and hardcoded Unsplash images; this holds
 * arbitrary content in the site's own tokens and drops the rotation to a
 * fraction of theirs, because a card of text tilted 12° is unreadable.
 *
 * Under reduced motion it degrades to a plain list — a carousel that can't
 * animate is just a way to hide content behind a button.
 */
export default function Carousel({ items, label, className = "" }: Props) {
    const motionOK = useMotionOK();
    const [[index, direction], setState] = useState<[number, number]>([0, 1]);

    const dragX = useMotionValue(0);
    const rotate = useTransform(dragX, [-240, 240], [-3, 3]);

    if (!motionOK || items.length <= 1) {
        return (
            <div className={`grid gap-5 sm:grid-cols-2 ${className}`}>
                {items.map((it, i) => (
                    <div key={i}>{it}</div>
                ))}
            </div>
        );
    }

    const paginate = (dir: number) =>
        setState(([i]) => [(i + dir + items.length) % items.length, dir]);

    const onDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -120) paginate(1);
        else if (info.offset.x > 120) paginate(-1);
    };

    const variants: Variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 220 : -220, opacity: 0, scale: 0.96 }),
        center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -220 : 220, opacity: 0, scale: 0.96, zIndex: 0 }),
    };

    return (
        <div className={className}>
            <div className="relative overflow-hidden">
                <AnimatePresence custom={direction} mode="wait" initial={false}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 280, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.28 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.18}
                        style={{ x: dragX, rotate }}
                        onDragEnd={onDragEnd}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        {items[index]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => paginate(-1)}
                        aria-label={`Previous ${label}`}
                        className="grid h-10 w-10 place-items-center rounded-pill border border-line text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun focus-visible:border-sun focus-visible:outline-none"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => paginate(1)}
                        aria-label={`Next ${label}`}
                        className="grid h-10 w-10 place-items-center rounded-pill border border-line text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun focus-visible:border-sun focus-visible:outline-none"
                    >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>

                {/* Dots double as direct navigation; the counter states position
                    for anyone who can't see which dot is filled. */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setState([i, i > index ? 1 : -1])}
                                aria-label={`${label} ${i + 1}`}
                                aria-current={i === index}
                                className={`h-1.5 rounded-pill transition-all duration-200 ${
                                    i === index ? "w-6 bg-sun" : "w-1.5 bg-line hover:bg-sun/50"
                                }`}
                            />
                        ))}
                    </div>
                    <span
                        aria-live="polite"
                        className="font-mono text-[0.7rem] tabular-nums tracking-widest text-ink-faint"
                    >
                        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                </div>
            </div>
        </div>
    );
}
