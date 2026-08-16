import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface Props {
    children: ReactNode;
    className?: string;
    /**
     * Cap for the scrolling area, e.g. "86vh".
     *
     * This lands on the Viewport, not the Root. Radix's Viewport is `height:
     * 100%`, so with the cap on the Root — which has no explicit height — it
     * resolves against `auto` and the Viewport just grows to the full content.
     * The result looks right until you notice `scrollHeight === clientHeight`
     * and nothing scrolls; the dialog simply clips.
     */
    maxHeight?: string;
    /** `scroll` shows the bar only while scrolling; `always` keeps it visible. */
    type?: RadixScrollArea.ScrollAreaProps["type"];
}

/**
 * Scroll container with a scrollbar that follows the page's light.
 *
 * The native scrollbar is drawn by the OS and stays its own colour, which reads
 * as a grey stripe down the side of a honeyed panel and doesn't change when the
 * sun goes down. This one is built from the same `--c-*` tokens as everything
 * else, so it travels with the theme.
 */
export default function ScrollArea({
    children,
    className,
    maxHeight,
    type = "scroll",
}: Props) {
    return (
        <RadixScrollArea.Root type={type} className={cn("overflow-hidden", className)}>
            <RadixScrollArea.Viewport className="w-full" style={{ maxHeight }}>
                {children}
            </RadixScrollArea.Viewport>

            <RadixScrollArea.Scrollbar
                orientation="vertical"
                className="flex w-2.5 touch-none select-none p-0.5 transition-opacity duration-150 data-[state=hidden]:opacity-0"
            >
                <RadixScrollArea.Thumb className="relative flex-1 rounded-pill bg-ink-faint/40 transition-colors duration-150 hover:bg-sun/70" />
            </RadixScrollArea.Scrollbar>

            <RadixScrollArea.Corner />
        </RadixScrollArea.Root>
    );
}
