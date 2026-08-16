import Page from "../../shared/components/Page";
import CodingStats from "../home/CodingStats";
import { profile, headlineStats } from "../../data/profile";
import { codingProfiles } from "../../data/codingProfiles";
import { Icon } from "../../shared/iconMap";
import StatNumber from "../../shared/motion/StatNumber";
import { RevealGroup } from "../../shared/motion/Reveal";

/**
 * Metric band, structure from Watermelon UI's `stats-3` — a centred row of
 * inline pills, then a divider-separated platform row underneath.
 *
 * Retinted rather than copied. Theirs leans on `bg-muted`, a hardcoded
 * `via-white/50` hover sweep and a fixed inset shadow, none of which survive on
 * honeyed paper — the sweep in particular read as a grey smear rather than
 * light. Here it's the site's own sun tint and `shadow-raking`, so the pills
 * pick up the same directional light as every other surface.
 */
function MetricBand() {
    return (
        <div className="mb-14">
            <RevealGroup preset="scale" className="flex flex-wrap justify-center gap-3">
                {headlineStats.map((s) => (
                    <div
                        key={s.label}
                        className="group relative flex cursor-default items-center gap-3 overflow-hidden rounded-card border border-line bg-card px-7 py-4 shadow-raking transition-colors duration-300 hover:border-sun/50"
                    >
                        {/* Light passes over the pill on hover — sun-tinted, so it
                            reads as the same light source lighting the page. */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-sun/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[200%]"
                        />
                        <StatNumber
                            value={s.value}
                            className="font-display text-2xl font-bold tabular-nums text-ink md:text-3xl"
                        />
                        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                            {s.label}
                        </span>
                    </div>
                ))}
            </RevealGroup>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-1 text-ink-soft">
                {codingProfiles.map((p, i) => (
                    <div key={p.label} className="flex items-center">
                        <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 hover:bg-sun/10 hover:text-ink"
                        >
                            {p.image ? (
                                <img
                                    src={p.image}
                                    alt=""
                                    width={16}
                                    height={16}
                                    loading="lazy"
                                    className="h-4 w-4 shrink-0 rounded object-contain"
                                />
                            ) : (
                                <Icon name={p.icon} className="h-4 w-4 shrink-0 text-sun" />
                            )}
                            <span className="font-medium">{p.label}</span>
                        </a>
                        {i < codingProfiles.length - 1 && (
                            <span aria-hidden="true" className="mx-1 h-4 w-px bg-line" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CodingPage() {
    return (
        <Page
            title={`Problem solving — ${profile.name}`}
            description="Competitive programming profiles — LeetCode Knight with 1800+ rating and 500+ problems solved, plus CodeChef, Codeforces and InterviewBit."
            canonical="/coding"
        >
            <div className="shell pt-16 sm:pt-20">
                <MetricBand />
            </div>

            <CodingStats />
        </Page>
    );
}
