interface Props {
    /** File stem under /public/wallpaper — expects `<name>-day.svg` and `<name>-night.svg`. */
    name: "porch" | "grove";
    /** Where the band sits relative to its section. */
    position?: "top" | "bottom" | "cover";
    className?: string;
    /** `eager` for anything above the fold; everything else stays lazy. */
    priority?: boolean;
}

const POS = {
    top: "top-0 h-[46rem]",
    bottom: "bottom-0 h-[26rem]",
    cover: "inset-y-0",
} as const;

/**
 * A wallpaper band behind a section.
 *
 * Two files, not one. An `<img>` can't read the `--c-*` custom properties the
 * rest of the page interpolates, so a single artwork would sit at day colours
 * while everything around it went to night. Instead both variants are mounted
 * and cross-faded on `--sun-position` — the same mechanism the doodle layers
 * use, so the wallpaper travels with the light rather than snapping.
 *
 * Sits under `.grain`, so the page's paper texture still runs over the top and
 * ties it to everything else.
 */
export default function Wallpaper({
    name,
    position = "top",
    className = "",
    priority = false,
}: Props) {
    const common =
        "pointer-events-none absolute inset-x-0 w-full object-cover select-none";

    return (
        <div
            className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <img
                src={`/wallpaper/${name}-day.svg`}
                alt=""
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className={`${common} ${POS[position]}`}
                style={{
                    opacity: "calc(1 - var(--sun-position))",
                    transition: "opacity var(--travel) ease",
                }}
            />
            <img
                src={`/wallpaper/${name}-night.svg`}
                alt=""
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className={`${common} ${POS[position]}`}
                style={{
                    opacity: "var(--sun-position)",
                    transition: "opacity var(--travel) ease",
                }}
            />
        </div>
    );
}
