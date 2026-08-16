/**
 * Hand-drawn line doodles for the background — a summer afternoon by day, the
 * same sky after dark. Stroke-only and deliberately faint: this is wallpaper
 * behind the content, not illustration competing with it.
 *
 * Every doodle draws in a 64×64 box and inherits `currentColor`, so placement
 * decides the colour token.
 */

type D = { className?: string };

const line = { strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* ---------------------------------- day ---------------------------------- */

export const Sun = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <circle cx="32" cy="32" r="11" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="32" y1="15" x2="32" y2="8" transform={`rotate(${a} 32 32)`} />
        ))}
    </svg>
);

export const Leaf = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M32 7C16 21 16 43 32 57C48 43 48 21 32 7Z" />
        <path d="M32 12V53" />
        <path d="M32 22L23 28M32 31L23 37M32 40L23 46" />
        <path d="M32 22L41 28M32 31L41 37M32 40L41 46" />
    </svg>
);

export const Waves = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M5 22q7-8 14 0t14 0t14 0t12 0" />
        <path d="M5 34q7-8 14 0t14 0t14 0t12 0" />
        <path d="M5 46q7-8 14 0t14 0t14 0t12 0" />
    </svg>
);

export const Citrus = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M8 44A24 24 0 0 1 56 44Z" />
        <path d="M13 44A19 19 0 0 1 51 44" />
        <path d="M32 44V26M32 44L19.3 31.3M32 44L14 44M32 44l12.7-12.7M32 44h18" />
    </svg>
);

export const Cloud = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M14 44C6 44 6 32 14 32C14 20 30 18 34 28C42 22 52 30 48 38C54 40 52 44 46 44Z" />
    </svg>
);

export const Daisy = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="32" cy="19" rx="5.5" ry="10" transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="4.5" />
    </svg>
);

export const Melon = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M8 22A24 24 0 0 0 56 22Z" />
        <path d="M13 22A19 19 0 0 0 51 22" />
        <ellipse cx="26" cy="31" rx="1.6" ry="2.6" />
        <ellipse cx="38" cy="31" rx="1.6" ry="2.6" />
        <ellipse cx="32" cy="38" rx="1.6" ry="2.6" />
    </svg>
);

/* --------------------------------- night --------------------------------- */

export const Moon = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M38 9A23 23 0 1 0 55 45A18 18 0 0 1 38 9Z" />
    </svg>
);

export const Sparkle = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M32 8C34 25 39 30 56 32C39 34 34 39 32 56C30 39 25 34 8 32C25 30 30 25 32 8Z" />
    </svg>
);

/** Dots joined by lines — a constellation, and a quiet nod to a scatter plot. */
export const Constellation = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M10 44L24 24L40 32L54 12" />
        <circle cx="10" cy="44" r="2.8" />
        <circle cx="24" cy="24" r="2.8" />
        <circle cx="40" cy="32" r="2.8" />
        <circle cx="54" cy="12" r="2.8" />
    </svg>
);

/** The one warm thing after dark, so it takes the lamp token rather than moonlight. */
export const Fireflies = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
        {[
            [16, 22, 3.2],
            [40, 14, 2.4],
            [30, 38, 3.6],
            [50, 44, 2.6],
            [12, 50, 2.2],
        ].map(([cx, cy, r], i) => (
            <g key={i}>
                <circle cx={cx} cy={cy} r={r * 2.6} fill="currentColor" opacity="0.18" />
                <circle cx={cx} cy={cy} r={r} fill="currentColor" />
            </g>
        ))}
    </svg>
);

export const NightCloud = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M14 46C6 46 6 34 14 34C14 22 30 20 34 30C42 24 52 32 48 40C54 42 52 46 46 46Z" />
        <path d="M50 16v6M47 19h6" />
        <path d="M14 14v5M11.5 16.5h5" />
    </svg>
);

export const ShootingStar = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M44 18C45.4 27 48 29.6 57 31C48 32.4 45.4 35 44 44C42.6 35 40 32.4 31 31C40 29.6 42.6 27 44 18Z" />
        <path d="M26 38L8 52M30 46L18 55M20 32L6 40" />
    </svg>
);

/* ------------------------- day — summer additions ------------------------- */

export const Popsicle = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M20 12a12 12 0 0 1 24 0v27a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6Z" />
        <path d="M29 45v8a3 3 0 0 0 6 0v-8" />
        <path d="M32 10v35" />
    </svg>
);

export const SunHat = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M21 36V27a11 11 0 0 1 22 0v9" />
        <path d="M6 38q26 12 52 0" />
        <path d="M6 38q26 9 52 0" />
    </svg>
);

export const DeckChair = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M12 52 34 22" />
        <path d="M52 52 30 34" />
        <path d="M22 39h22" />
        <path d="M17 52h10M45 52h6" />
    </svg>
);

export const Dragonfly = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M32 14v36" />
        <circle cx="32" cy="13" r="3" />
        <path d="M31 26q-18-9-24 2 10 7 24 1Z" />
        <path d="M33 26q18-9 24 2-10 7-24 1Z" />
        <path d="M31 36q-13-6-18 2 8 5 18 1Z" />
        <path d="M33 36q13-6 18 2-8 5-18 1Z" />
    </svg>
);

export const Watermelon = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M6 46A26 26 0 0 1 58 46Z" />
        <path d="M12 46A20 20 0 0 1 52 46" />
        <path d="M24 40v4M32 36v8M40 40v4" />
    </svg>
);

/* ------------------------ night — summer additions ------------------------ */

export const Lantern = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M32 8v6" />
        <path d="M20 20h24l-3 26a4 4 0 0 1-4 3H27a4 4 0 0 1-4-3Z" />
        <path d="M20 20q12-8 24 0" />
        <path d="M27 28v14M32 27v16M37 28v14" />
    </svg>
);

export const Crescent = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M40 10a24 24 0 1 0 12 40A26 26 0 0 1 40 10Z" />
        <path d="M46 20l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    </svg>
);

export const Moth = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M32 20v26" />
        <path d="M30 16l-5-6M34 16l5-6" />
        <path d="M31 24q-20-12-24 4 12 12 24 2Z" />
        <path d="M33 24q20-12 24 4-12 12-24 2Z" />
    </svg>
);

export const StillWater = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M8 26q8-6 16 0t16 0t16 0" />
        <path d="M8 38q8-6 16 0t16 0t16 0" />
        <path d="M8 50q8-6 16 0t16 0t16 0" />
        <circle cx="44" cy="16" r="5" />
    </svg>
);

export const NightGarden = ({ className }: D) => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...line}>
        <path d="M32 56V30" />
        <path d="M32 34q-14-2-16-14 14 0 16 14Z" />
        <path d="M32 30q14-4 15-16-14 2-15 16Z" />
        <circle cx="20" cy="16" r="1.6" />
        <circle cx="48" cy="40" r="1.6" />
    </svg>
);
