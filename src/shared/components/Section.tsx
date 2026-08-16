import type { ReactNode } from "react";
import { RevealEyebrow, RevealText } from "../motion/Reveal";
import { Citrus, Daisy, DeckChair, Leaf, SunHat, Waves } from "./doodleArt";

/**
 * One faint motif per section, keyed by id.
 *
 * Deliberately quieter than the floating doodles — these are pinned to the
 * section rather than the viewport, so they read as a watermark on the page
 * instead of another thing moving in the sky.
 */
const MOTIFS: Record<string, JSX.Element> = {
    findings: <Waves />,
    about: <Leaf />,
    coding: <Citrus />,
    credentials: <Daisy />,
    skills: <SunHat />,
    contact: <DeckChair />,
};

interface Props {
    id?: string;
    eyebrow?: string;
    title?: string;
    lede?: string;
    children: ReactNode;
    className?: string;
}

/**
 * One section of the page. The eyebrow carries the section's actual subject
 * rather than a number — these aren't a sequence, so numbering them would
 * imply an order that doesn't exist.
 *
 * The header animates here rather than at each call site, so every section on
 * every route gets the same entrance for free.
 */
export default function Section({
    id,
    eyebrow,
    title,
    lede,
    children,
    className = "",
}: Props) {
    return (
        <section
            id={id}
            className={`shell relative scroll-mt-24 py-20 sm:py-28 ${className}`}
        >
            {id && MOTIFS[id] && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-10 hidden h-28 w-28 text-shade opacity-[0.07] lg:block"
                >
                    {MOTIFS[id]}
                </span>
            )}

            {(eyebrow || title) && (
                <header className="mb-12 max-w-readable">
                    {eyebrow && <RevealEyebrow className="eyebrow mb-4">{eyebrow}</RevealEyebrow>}
                    {title && (
                        <RevealText
                            as="h2"
                            per="word"
                            preset="fade-in-blur"
                            className="font-display text-section font-bold"
                        >
                            {title}
                        </RevealText>
                    )}
                    {lede && (
                        <RevealText
                            as="p"
                            per="word"
                            preset="fade"
                            delay={0.15}
                            speedReveal={1.6}
                            className="mt-5 text-lg text-ink-soft"
                        >
                            {lede}
                        </RevealText>
                    )}
                </header>
            )}
            {children}
        </section>
    );
}
