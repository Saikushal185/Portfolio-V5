/** @type {import('tailwindcss').Config} */

// Colours are CSS custom properties holding space-separated RGB triples, so the
// sun-arc control can interpolate them and Tailwind can still do `/50` opacity.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                surface: token("surface"),
                card: token("card"),
                raised: token("raised"),
                ink: {
                    DEFAULT: token("ink"),
                    soft: token("ink-soft"),
                    faint: token("ink-faint"),
                },
                // The warm accent. Marigold by day, lamp-glow by night — the one
                // warm thing that survives into the dark theme.
                sun: token("sun"),
                // Deep garden green. Structure, links, quiet emphasis.
                shade: token("shade"),
                // Hot orange. Used sparingly, never for body text.
                ember: token("ember"),
                line: token("line"),
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
                prose: ['"Newsreader"', "ui-serif", "Georgia", "serif"],
                mono: ['"DM Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
            },
            fontSize: {
                // Display sizes clamp so the findings-wall metrics stay huge on
                // desktop without overflowing a 375px phone.
                metric: ["clamp(2.75rem, 7vw, 4.5rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
                hero: ["clamp(2.5rem, 7.5vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
                section: ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
                eyebrow: ["0.7rem", { lineHeight: "1", letterSpacing: "0.18em" }],
            },
            boxShadow: {
                // Light direction is a variable — every shadow lengthens, softens
                // and cools as the sun drops toward the horizon.
                raking: "var(--shadow-x) var(--shadow-y) var(--shadow-blur) rgb(var(--c-shadow) / var(--shadow-alpha))",
                lifted: "calc(var(--shadow-x) * 1.6) calc(var(--shadow-y) * 1.6) calc(var(--shadow-blur) * 1.4) rgb(var(--c-shadow) / calc(var(--shadow-alpha) * 1.15))",
            },
            borderRadius: {
                card: "1.25rem",
                pill: "999px",
            },
            maxWidth: {
                readable: "68ch",
                shell: "76rem",
            },
            transitionTimingFunction: {
                // Slightly overshooting ease for the sun travelling its arc.
                sun: "cubic-bezier(0.34, 1.12, 0.4, 1)",
            },
        },
    },
    plugins: [],
};
