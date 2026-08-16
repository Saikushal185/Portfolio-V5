import { useEffect, useState, type ReactNode } from "react";
import {
    Sun,
    Leaf,
    Waves,
    Citrus,
    Cloud,
    Daisy,
    Melon,
    Moon,
    Sparkle,
    Constellation,
    Fireflies,
    NightCloud,
    ShootingStar,
    Popsicle,
    SunHat,
    DeckChair,
    Dragonfly,
    Watermelon,
    Lantern,
    Crescent,
    Moth,
    StillWater,
    NightGarden,
} from "./doodleArt";

interface Spot {
    el: ReactNode;
    /** Percentage position within the viewport. */
    top: string;
    left: string;
    size: number;
    /** a | b | c pick a drift path; delay staggers them out of sync. */
    drift: "a" | "b" | "c";
    delay: string;
    tone?: "sun" | "shade" | "orb";
    /** Dropped below the sm breakpoint, where there's no margin to spare. */
    wide?: boolean;
    /** 0 = pinned to the page, 1 = drifts a full step against the scroll. */
    depth: number;
}

// Positions are shared between the two sets so each day doodle has a night
// counterpart in the same place — the sky keeps its composition and only its
// contents change. Kept to the margins and the centre gutter, clear of the
// headline block and well clear of the sun-arc control in the header.
//
// Nothing sits closer than 5% to an edge, or a 90px doodle centred there gets
// clipped by the viewport.
const SPOTS = [
    { top: "13%", left: "6%", size: 68, drift: "c", delay: "-14s", depth: 0.5 },
    { top: "9%", left: "47%", size: 88, drift: "b", delay: "-6s", wide: true, depth: 0.2 },
    { top: "19%", left: "94%", size: 64, drift: "a", delay: "-11s", wide: true, depth: 0.7 },
    { top: "47%", left: "95%", size: 82, drift: "c", delay: "-4s", wide: true, depth: 0.35 },
    { top: "58%", left: "5%", size: 74, drift: "b", delay: "-9s", depth: 0.6 },
    { top: "90%", left: "9%", size: 86, drift: "a", delay: "-2s", depth: 0.25 },
    { top: "92%", left: "87%", size: 70, drift: "b", delay: "-17s", wide: true, depth: 0.55 },
    { top: "31%", left: "12%", size: 56, drift: "a", delay: "-8s", wide: true, depth: 0.8 },
    { top: "72%", left: "93%", size: 60, drift: "b", delay: "-13s", wide: true, depth: 0.45 },
    { top: "40%", left: "50%", size: 52, drift: "c", delay: "-19s", wide: true, depth: 0.15 },
    { top: "78%", left: "44%", size: 64, drift: "a", delay: "-5s", wide: true, depth: 0.65 },
    { top: "6%", left: "78%", size: 58, drift: "c", delay: "-21s", wide: true, depth: 0.3 },
] as const;

const at = (i: number, el: ReactNode, tone: Spot["tone"]): Spot => ({
    ...SPOTS[i],
    drift: SPOTS[i].drift as Spot["drift"],
    wide: "wide" in SPOTS[i] ? (SPOTS[i] as { wide?: boolean }).wide : undefined,
    el,
    tone,
});

/**
 * Scroll offset in pixels, sampled on a frame.
 *
 * The doodles are `position: fixed`, so without this they sit dead still while
 * the page moves past them. Shifting each one by its own depth puts the sky at
 * a different distance from the text.
 */
function useParallax() {
    const [y, setY] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                setY(window.scrollY);
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    return y;
}

const DAY: Spot[] = [
    at(0, <Citrus />, "sun"),
    at(1, <Cloud />, "sun"),
    at(2, <Daisy />, "shade"),
    at(3, <Waves />, "shade"),
    at(4, <Leaf />, "shade"),
    at(5, <Sun />, "sun"),
    at(6, <Melon />, "sun"),
    at(7, <Popsicle />, "sun"),
    at(8, <SunHat />, "shade"),
    at(9, <Dragonfly />, "shade"),
    at(10, <DeckChair />, "shade"),
    at(11, <Watermelon />, "sun"),
];

const NIGHT: Spot[] = [
    at(0, <Sparkle />, "orb"),
    at(1, <NightCloud />, "orb"),
    at(2, <Fireflies />, "sun"),
    at(3, <Constellation />, "orb"),
    at(4, <Fireflies />, "sun"),
    at(5, <Moon />, "orb"),
    at(6, <ShootingStar />, "orb"),
    at(7, <Lantern />, "sun"),
    at(8, <Moth />, "orb"),
    at(9, <NightGarden />, "orb"),
    at(10, <StillWater />, "orb"),
    at(11, <Crescent />, "orb"),
];

const TONE = {
    sun: "text-sun",
    shade: "text-shade",
    orb: "text-[rgb(var(--c-orb))]",
} as const;

const Layer = ({
    spots,
    className,
    scrollY,
}: {
    spots: Spot[];
    className: string;
    scrollY: number;
}) => (
    <div className={`doodle-layer ${className}`} aria-hidden="true">
        {spots.map((s, i) => (
            <span
                key={i}
                className={`doodle doodle-${s.drift} ${TONE[s.tone ?? "sun"]} ${
                    s.wide ? "hidden sm:block" : ""
                }`}
                style={{
                    top: s.top,
                    left: s.left,
                    width: s.size,
                    height: s.size,
                    animationDelay: s.delay,
                    // Feeds the existing drift keyframes, which already
                    // translate — hence a variable rather than a transform that
                    // would overwrite them.
                    ["--parallax" as string]: `${-scrollY * s.depth * 0.06}px`,
                }}
            >
                {s.el}
            </span>
        ))}
    </div>
);

/**
 * Both sets are always mounted and cross-faded by `--sun-position`, so the
 * doodles change with the light rather than popping in after it.
 */
export default function Doodles() {
    const scrollY = useParallax();

    return (
        <>
            <Layer spots={DAY} className="doodle-day" scrollY={scrollY} />
            <Layer spots={NIGHT} className="doodle-night" scrollY={scrollY} />
        </>
    );
}
