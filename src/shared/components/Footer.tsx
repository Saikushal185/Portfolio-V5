import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Sun } from "lucide-react";
import { profile } from "../../data/profile";
import { SpinningText } from "../motion/spinning-text";
import { useMotionOK } from "../motion/useMotionOK";

const SOCIALS = [
    { href: profile.socials.github, label: "GitHub", Icon: Github },
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

// Now that every section has its own route, the footer carries the map. Ten
// routes is past the point where a single row of links stays readable.
const SITEMAP = [
    {
        heading: "Work",
        links: [
            { to: "/projects", label: "Projects" },
            { to: "/skills", label: "Skills" },
            { to: "/coding", label: "Problem solving" },
        ],
    },
    {
        heading: "Background",
        links: [
            { to: "/about", label: "About" },
            { to: "/credentials", label: "Credentials" },
            { to: "/blog", label: "Writing" },
        ],
    },
    {
        heading: "Elsewhere",
        links: [
            { to: "/contact", label: "Contact" },
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
        ],
    },
];

/**
 * The spinning seal is the only looping motion below the fold, and the hero's
 * role ticker is the only one above it — so the two never share a viewport.
 */
function Seal() {
    const motionOK = useMotionOK();

    if (!motionOK) {
        return (
            <span className="grid h-[104px] w-[104px] place-items-center rounded-pill border border-line text-sun">
                <Sun className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open to data science roles</span>
            </span>
        );
    }

    return (
        <span className="relative grid h-[104px] w-[104px] place-items-center text-ink-faint">
            <SpinningText
                radius={4.4}
                fontSize={0.62}
                duration={22}
                className="font-mono uppercase"
            >
                {"open to data roles · summer 2026 · "}
            </SpinningText>
            <Sun className="h-6 w-6 text-sun" aria-hidden="true" />
        </span>
    );
}

export default function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="shell grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_auto]">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
                    <div>
                        <p className="font-display text-lg font-bold">{profile.name}</p>
                        <p className="mt-1 text-sm text-ink-soft">
                            {profile.role} · {profile.location}
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            {SOCIALS.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel="noreferrer noopener"
                                    aria-label={label}
                                    className="grid h-10 w-10 place-items-center rounded-pill border border-line text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun"
                                >
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <Seal />
                </div>

                <nav
                    aria-label="Footer"
                    className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3"
                >
                    {SITEMAP.map((col) => (
                        <div key={col.heading}>
                            <p className="eyebrow mb-4 text-ink-faint">{col.heading}</p>
                            <ul className="space-y-2.5">
                                {col.links.map((l) => (
                                    <li key={l.to}>
                                        <Link
                                            to={l.to}
                                            className="text-sm text-ink-soft transition-colors duration-150 hover:text-sun"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="shell border-t border-line py-6">
                <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
                    © {new Date().getFullYear()} {profile.name}
                </p>
            </div>
        </footer>
    );
}
