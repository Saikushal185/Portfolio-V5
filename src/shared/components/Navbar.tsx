import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import SunArc from "../../theme/SunArc";
import { useTheme } from "../../theme/useTheme";
import { TextRoll } from "../motion/text-roll";
import { useMotionOK } from "../motion/useMotionOK";

// Every section is now its own route. Four of them earn a place in the bar;
// the rest live behind "More" so the nav still fits a 375px phone.
const PRIMARY = [
    { to: "/projects", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Writing" },
    { to: "/contact", label: "Contact" },
];

const SECONDARY = [
    { to: "/skills", label: "Skills" },
    { to: "/credentials", label: "Credentials" },
    { to: "/coding", label: "Problem solving" },
];

const linkClass = (isActive: boolean) =>
    `rounded-pill px-2 py-2 font-mono text-[0.65rem] uppercase tracking-wider transition-colors duration-150 hover:text-ink sm:px-3 sm:text-xs sm:tracking-widest ${
        isActive ? "text-sun" : "text-ink-soft"
    }`;

/**
 * A nav label that re-rolls each time the pointer enters.
 *
 * TextRoll plays on mount, so replaying means changing its key. It stays
 * mounted the whole time rather than swapping in on hover — the per-letter
 * layout is a hair wider than the same string set normally, and mounting it
 * only on hover made the nav twitch.
 */
function RollLabel({ children }: { children: string }) {
    const motionOK = useMotionOK();
    const [plays, setPlays] = useState(0);

    if (!motionOK) return <>{children}</>;

    return (
        <span onMouseEnter={() => setPlays((n) => n + 1)}>
            <TextRoll key={plays} duration={0.4}>
                {children}
            </TextRoll>
        </span>
    );
}

export default function Navbar() {
    const { theme, toggle } = useTheme();
    const [lifted, setLifted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setLifted(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Navigating anywhere closes whatever was open.
    useEffect(() => {
        setMenuOpen(false);
        setMoreOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setMenuOpen(false);
            setMoreOpen(false);
        };
        const onClick = (e: MouseEvent) => {
            if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
                setMoreOpen(false);
            }
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, []);

    return (
        <header
            className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
                lifted || menuOpen
                    ? "border-line bg-surface/85 backdrop-blur-md"
                    : "border-transparent bg-transparent"
            }`}
        >
            <nav className="shell flex items-center justify-between gap-4 py-4">
                <Link
                    to="/"
                    className="shrink-0 font-display text-sm font-bold tracking-tight text-ink sm:text-base"
                >
                    Sai Kushal
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Desktop */}
                    <div className="hidden items-center gap-1 md:flex lg:gap-2">
                        {PRIMARY.map(({ to, label }) => (
                            <NavLink key={to} to={to} className={({ isActive }) => linkClass(isActive)}>
                                <RollLabel>{label}</RollLabel>
                            </NavLink>
                        ))}

                        <div className="relative" ref={moreRef}>
                            <button
                                type="button"
                                onClick={() => setMoreOpen((v) => !v)}
                                aria-expanded={moreOpen}
                                aria-haspopup="true"
                                className={`${linkClass(
                                    SECONDARY.some((s) => s.to === pathname),
                                )} inline-flex items-center gap-1`}
                            >
                                More
                                <ChevronDown
                                    className={`h-3 w-3 transition-transform duration-200 ${
                                        moreOpen ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                />
                            </button>

                            {moreOpen && (
                                <div className="card-surface absolute right-0 top-full mt-2 min-w-[13rem] p-2 shadow-lifted">
                                    {SECONDARY.map(({ to, label }) => (
                                        <NavLink
                                            key={to}
                                            to={to}
                                            className={({ isActive }) =>
                                                `block rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors duration-150 hover:bg-sun/10 hover:text-ink ${
                                                    isActive ? "text-sun" : "text-ink-soft"
                                                }`
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile trigger */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        className="grid h-9 w-9 place-items-center rounded-pill border border-line text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun md:hidden"
                    >
                        {menuOpen ? (
                            <X className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <Menu className="h-4 w-4" aria-hidden="true" />
                        )}
                    </button>

                    <div className="ml-1 sm:ml-2">
                        <SunArc theme={theme} onToggle={toggle} />
                    </div>
                </div>
            </nav>

            {/* Mobile panel. Scrolls, because nine routes don't fit a short phone
                in landscape. */}
            {menuOpen && (
                <div
                    id="mobile-nav"
                    className="max-h-[70vh] overflow-y-auto border-t border-line bg-surface/95 backdrop-blur-md md:hidden"
                >
                    <ul className="shell divide-y divide-line py-2">
                        {[...PRIMARY, ...SECONDARY].map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `block py-4 font-mono text-xs uppercase tracking-widest transition-colors duration-150 ${
                                            isActive ? "text-sun" : "text-ink-soft"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
