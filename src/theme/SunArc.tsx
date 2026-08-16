import { useId } from "react";
import type { Theme } from "./useTheme";

interface Props {
    theme: Theme;
    onToggle: () => void;
}

/** Eight rays, evenly spaced, drawn from the disc outward. */
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * The theme control: a sun that dims into a moon.
 *
 * Everything here is driven by `--sun-position` (0 at noon, 1 past the horizon),
 * the same token that sets shadow length, the hero wash and the starfield — so
 * the control and the page change together rather than the control announcing a
 * change that then happens.
 *
 * Three things move at once as the value climbs:
 *   - the rays retract and fade out
 *   - the disc cools, for free: `--c-orb` is already marigold by day and
 *     moonlight by night, so the fill needs no special handling
 *   - a masked circle slides across the disc and bites it into a crescent
 *
 * The bite is an SVG mask rather than a circle painted in the pill's colour,
 * because the pill is a translucent `bg-card/70` over backdrop-blur and no solid
 * fill would match what's behind it.
 *
 * Motion notes: a once-a-visit interaction, so the 900ms travel is affordable
 * where it wouldn't be on something clicked all day. No idle animation — it is
 * still until you act on it, and `prefers-reduced-motion` collapses the travel
 * to an instant swap via index.css.
 */
export default function SunArc({ theme, onToggle }: Props) {
    const isNight = theme === "night";
    const maskId = `crescent-${useId()}`;

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={isNight ? "Switch to daylight" : "Switch to moonlight"}
            title={isNight ? "Switch to daylight" : "Switch to moonlight"}
            className="group relative grid h-10 w-[4.25rem] place-items-center rounded-pill border border-line bg-card/70 px-2 backdrop-blur transition-colors duration-200 hover:border-sun/60 hover:bg-raised sm:h-11 sm:w-[5.5rem]"
        >
            <svg
                viewBox="0 0 40 40"
                className="h-7 w-7 overflow-visible sm:h-8 sm:w-8"
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <mask id={maskId}>
                        {/* White shows, black hides. The offset circle fades in
                            with the sun position, carving the crescent. */}
                        <circle cx="20" cy="20" r="9" fill="white" />
                        <circle
                            cx="27"
                            cy="14"
                            r="8.5"
                            fill="black"
                            style={{
                                opacity: "var(--sun-position)",
                                transition: "opacity var(--travel) ease",
                            }}
                        />
                    </mask>
                </defs>

                {/* Bloom — wide and warm at noon, gone by dusk. */}
                <circle
                    cx="20"
                    cy="20"
                    r="13"
                    fill="rgb(var(--c-orb))"
                    style={{
                        opacity: "calc(0.3 * (1 - var(--sun-position)))",
                        filter: "blur(4px)",
                        transition: "opacity var(--travel) ease",
                    }}
                />

                {/* Rays. They shrink toward the disc as they fade, so the sun
                    reads as contracting rather than simply dimming. */}
                <g
                    stroke="rgb(var(--c-orb))"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{
                        opacity: "calc(1 - var(--sun-position))",
                        transform: "scale(calc(1 - var(--sun-position) * 0.22))",
                        transformOrigin: "20px 20px",
                        transition: "opacity var(--travel) ease, transform var(--travel) ease",
                    }}
                >
                    {RAYS.map((a) => (
                        <line
                            key={a}
                            x1="20"
                            y1="6.5"
                            x2="20"
                            y2="2.5"
                            transform={`rotate(${a} 20 20)`}
                        />
                    ))}
                </g>

                <circle cx="20" cy="20" r="9" fill="rgb(var(--c-orb))" mask={`url(#${maskId})`} />
            </svg>
        </button>
    );
}
