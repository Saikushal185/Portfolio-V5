import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import ResumeDownload from "../../shared/components/ResumeDownload";
import Wallpaper from "../../shared/components/Wallpaper";
import { TextLoop } from "../../shared/motion/text-loop";
import { RevealGroup, RevealText } from "../../shared/motion/Reveal";
import { useMotionOK } from "../../shared/motion/useMotionOK";

// The three findings themselves stay stated flat — they are the thesis, and a
// ticker cycling them would make the site's central claim harder to read, not
// easier. The one looping thing in this viewport is the role line below, which
// cycles copy that would otherwise only ever show one of its two forms.
// Drawn from projects that are actually on the wall. Two of the previous three
// were demoted below it, so the hero was quoting findings a visitor then
// couldn't find when they clicked through.
const OPENERS = [
    "Customer Segmentation Platform",
    "Healthcare Readmission Analytics",
    "A/B Testing Analytics",
];

const ROLES = [profile.roleShort, profile.specialism];

const findings = OPENERS.map((title) => projects.find((p) => p.title === title)).filter(
    (p): p is (typeof projects)[number] => Boolean(p?.story),
);

export default function Hero() {
    const motionOK = useMotionOK();

    return (
        <section className="relative overflow-hidden">
            <Wallpaper name="porch" position="top" priority />
            <div className="daylight" aria-hidden="true" />

            <div className="shell relative z-10 grid gap-16 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-20">
                <div>
                    {/* A div, not a p: TextLoop wraps itself in a div, which is
                        invalid inside a p and made React re-parent it — the two
                        roles stacked on separate lines instead of cross-fading.
                        `nowrap` keeps them on one line; the cycling half sits
                        last so its changing width shoves nothing. */}
                    <div className="eyebrow mb-6 flex flex-nowrap items-center gap-x-2">
                        <span className="whitespace-nowrap">{profile.locationShort}</span>
                        <span aria-hidden="true">·</span>
                        {motionOK ? (
                            <TextLoop interval={3.4}>
                                {ROLES.map((r) => (
                                    <span key={r}>{r}</span>
                                ))}
                            </TextLoop>
                        ) : (
                            <span>{profile.roleShort}</span>
                        )}
                    </div>

                    <RevealText
                        as="h1"
                        per="char"
                        preset="fade-in-blur"
                        speedReveal={1.4}
                        className="max-w-[12ch] font-display text-hero font-extrabold"
                    >
                        The number is the point.
                    </RevealText>

                    <RevealText
                        as="p"
                        per="word"
                        preset="fade"
                        delay={0.35}
                        speedReveal={2.2}
                        className="mt-8 max-w-readable text-lg leading-relaxed text-ink-soft"
                    >
                        {"I'm Sai Kushal. I turn messy, real-world data into an answer someone can act on — and then build the thing that keeps producing it: the pipeline, the dashboard, the retrieval system that cites its sources."}
                    </RevealText>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-surface transition-opacity duration-150 hover:opacity-85"
                        >
                            See the work
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <a
                            href={`mailto:${profile.email}`}
                            className="inline-flex items-center gap-2 rounded-pill border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors duration-150 hover:border-sun/60 hover:text-sun"
                        >
                            Get in touch
                        </a>
                    </div>

                    <div className="mt-14">
                        <ResumeDownload />
                    </div>
                </div>

                {/* Three real findings, stated flat. This is the thesis of the whole
                    site, so it sits level with the headline rather than under it. */}
                <div className="lg:pt-4">
                    <p className="eyebrow mb-5">Three things the data said</p>
                    <RevealGroup preset="blur-slide" className="divide-y divide-line border-y border-line">
                        {findings.map((p) => (
                            <div key={p.title} className="py-5">
                                <p className="font-display text-2xl font-bold text-sun">
                                    {p.story!.metric}
                                </p>
                                <p className="mt-2 font-prose italic leading-snug text-ink">
                                    {p.story!.hook}
                                </p>
                                <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                    {p.title}
                                </p>
                            </div>
                        ))}
                    </RevealGroup>
                </div>
            </div>
        </section>
    );
}
