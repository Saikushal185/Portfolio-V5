import { useId, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreHorizontal } from "lucide-react";
import { Icon } from "../iconMap";
import { useMotionOK } from "../motion/useMotionOK";

export type TileTone = "paper" | "sun" | "shade";

export interface TileItem {
    id: string;
    title: string;
    /** Small muted line under the title — a metric, a stat, an issuer. */
    value?: string;
    /** Lucide icon name, resolved through shared/iconMap. */
    iconName?: string;
    /** Image path, for tiles whose mark is artwork rather than an icon. */
    image?: string;
    tone?: TileTone;
}

interface Props {
    items: TileItem[];
    /** Announced on the controls; also disambiguates two grids on one page. */
    label: string;
    /** Extra content for the promoted tile — the story hook, a dialog trigger. */
    expandedSlot?: (item: TileItem) => ReactNode;
    /** Base column count before a tile is promoted. */
    columns?: 2 | 3;
    className?: string;
}

const TONE: Record<TileTone, string> = {
    paper: "bg-card border-line",
    sun: "bg-sun/10 border-sun/30",
    shade: "bg-shade/10 border-shade/25",
};

/**
 * A grid of tiles where clicking one promotes it to a full-width panel above
 * and the rest reflow underneath, all on shared layout.
 *
 * Ported from Watermelon UI's `minimal-carousel`, which is not a carousel — it
 * is this. Four things had to change on the way across:
 *
 *   - it imports `framer-motion` while its manifest declares `motion`, so a CLI
 *     install resolves neither; this uses `motion/react` like the rest of the site
 *   - `rounded-4xl`, `max-w-105`, `min-h-42.5` and an `xs:` breakpoint are all
 *     Tailwind v4 spellings that silently do nothing on this project's v3
 *   - its `layoutId` was the bare card id. Three of these share the home page,
 *     so every id is scoped with `useId()` — otherwise a tile in one grid
 *     animates into a tile in another
 *   - the saturated `bg-[#AD46FF]` fills and white text are replaced by tokens,
 *     so the tiles keep following the sun like every other surface
 */
export default function TileGrid({
    items,
    label,
    expandedSlot,
    columns = 2,
    className = "",
}: Props) {
    const scope = useId();
    const motionOK = useMotionOK();
    const [activeId, setActiveId] = useState<string | null>(null);

    const active = items.find((i) => i.id === activeId) ?? null;
    const rest = active ? items.filter((i) => i.id !== active.id) : items;

    const Mark = ({ item, big }: { item: TileItem; big?: boolean }) =>
        item.image ? (
            <img
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
                className={`${big ? "h-11 w-11" : "h-7 w-7"} shrink-0 rounded object-contain`}
            />
        ) : (
            <Icon
                name={item.iconName ?? "Code2"}
                className={`${big ? "h-9 w-9" : "h-6 w-6"} shrink-0 text-sun`}
            />
        );

    // Without layout animation the promotion is just content appearing and
    // disappearing, which is worse than showing everything. Render a plain grid.
    if (!motionOK) {
        return (
            <div
                className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} ${className}`}
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`flex flex-col justify-between rounded-card border p-5 ${TONE[item.tone ?? "paper"]}`}
                    >
                        <Mark item={item} />
                        <div className="mt-6">
                            <h4 className="font-display text-base font-semibold text-ink">
                                {item.title}
                            </h4>
                            {item.value && (
                                <p className="mt-1 font-mono text-xs text-ink-faint">{item.value}</p>
                            )}
                            {expandedSlot?.(item)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={className}>
            <motion.div layout className="flex flex-col gap-3">
                <AnimatePresence mode="popLayout">
                    {active && (
                        <motion.div
                            key={active.id}
                            layoutId={`${scope}-${active.id}`}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className={`relative flex w-full flex-col justify-between rounded-card border p-6 shadow-lifted sm:p-7 ${TONE[active.tone ?? "paper"]}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <Mark item={active} big />
                                <button
                                    type="button"
                                    onClick={() => setActiveId(null)}
                                    className="rounded-pill border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="mt-6">
                                <motion.h4
                                    layout="position"
                                    className="font-display text-xl font-bold text-ink"
                                >
                                    {active.title}
                                </motion.h4>
                                {active.value && (
                                    <p className="mt-1 font-mono text-xs text-ink-faint">
                                        {active.value}
                                    </p>
                                )}
                                {expandedSlot?.(active)}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    layout
                    className={`grid gap-3 ${
                        active
                            ? "grid-cols-2 sm:grid-cols-3"
                            : columns === 3
                              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                              : "grid-cols-1 sm:grid-cols-2"
                    }`}
                >
                    {rest.map((item) => (
                        <motion.button
                            key={item.id}
                            type="button"
                            layoutId={`${scope}-${item.id}`}
                            onClick={() => setActiveId(item.id)}
                            aria-label={`Open ${item.title}`}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className={`relative flex cursor-pointer flex-col justify-between rounded-card border p-4 text-left shadow-raking transition-colors duration-150 hover:border-sun/50 focus-visible:border-sun focus-visible:outline-none sm:p-5 ${
                                active ? "min-h-[6.5rem]" : "min-h-[9rem]"
                            } ${TONE[item.tone ?? "paper"]}`}
                        >
                            <span className="flex items-start justify-between">
                                <Mark item={item} />
                                <MoreHorizontal
                                    className="h-4 w-4 text-ink-faint"
                                    aria-hidden="true"
                                />
                            </span>

                            <span className="mt-4 block overflow-hidden">
                                <motion.span
                                    layout="position"
                                    className={`block font-display font-semibold leading-tight text-ink [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden ${
                                        active ? "text-sm" : "text-base"
                                    }`}
                                >
                                    {item.title}
                                </motion.span>
                                {item.value && (
                                    <span className="mt-0.5 block truncate font-mono text-[0.7rem] text-ink-faint">
                                        {item.value}
                                    </span>
                                )}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>

            <span className="sr-only" aria-live="polite">
                {active ? `${active.title} expanded` : `${items.length} ${label}`}
            </span>
        </div>
    );
}
