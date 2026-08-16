import { Github, ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { FadeIn, RevealText } from "../../shared/motion/Reveal";
import ScrollArea from "../../shared/components/ScrollArea";
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogContainer,
    MorphingDialogTitle,
    MorphingDialogSubtitle,
    MorphingDialogImage,
    MorphingDialogClose,
} from "../../shared/motion/morphing-dialog";

const BEATS = [
    { key: "problem", label: "The problem" },
    { key: "investigation", label: "The investigation" },
    { key: "result", label: "The result" },
] as const;

/**
 * The hook, and the way into the full story.
 *
 * This sits inside an expanded tile, so it opens the dialog rather than being
 * the card itself. The previous version put raw markup on both sides of the
 * dialog, which meant nothing actually morphed except the container —
 * `MorphingDialogTitle`, `Subtitle` and `Image` each carry a `layoutId`, and it
 * is having the *same* component on both sides that makes the content travel.
 * Each may appear only once per side or the ids collide.
 */
export default function ProjectStory({ project }: { project: Project }) {
    const { story, title, category, tech, demo, github } = project;
    if (!story) return null;

    const poster = demo ? `/video/${demo}-poster.webp` : null;

    return (
        <MorphingDialog transition={{ type: "spring", stiffness: 200, damping: 24 }}>
            <div className="mt-5">
                <p className="max-w-readable font-prose text-lg italic leading-snug text-ink">
                    {story.hook}
                </p>

                <MorphingDialogTrigger className="mt-6 rounded-pill border border-line bg-card px-5 py-2.5 shadow-raking transition-[border-color,box-shadow] duration-150 hover:border-sun/60 hover:shadow-lifted">
                    <span className="flex items-center gap-2.5">
                        {/* Both of these also appear in the dialog — that pairing
                            is what makes them travel between the two. */}
                        {poster && (
                            <MorphingDialogImage
                                src={poster}
                                alt=""
                                className="h-6 w-9 rounded object-cover"
                            />
                        )}
                        <MorphingDialogTitle className="font-mono text-xs uppercase tracking-widest text-ink">
                            Read the full story
                        </MorphingDialogTitle>
                        <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint" aria-hidden="true" />
                    </span>
                </MorphingDialogTrigger>
            </div>

            <MorphingDialogContainer>
                <MorphingDialogContent className="card-surface relative mx-4 w-full max-w-3xl">
                    <MorphingDialogClose className="absolute right-5 top-5 z-10 rounded-pill border border-line bg-surface p-2 text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun" />
                    <ScrollArea maxHeight="86vh" type="scroll">
                        <div className="px-6 py-10 sm:px-10 sm:py-12">
                            {/* A thumbnail, not a hero. Full width, it repeated
                                the video sitting a few hundred pixels below it —
                                the same frame twice. At this size it reads as the
                                mark that travelled out of the tile, and the video
                                stays the actual visual. */}
                            {poster && (
                                <MorphingDialogImage
                                    src={poster}
                                    alt=""
                                    className="mb-6 h-16 w-24 rounded border border-line object-cover"
                                />
                            )}

                            <MorphingDialogSubtitle className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-shade">
                                {category}
                            </MorphingDialogSubtitle>

                            <MorphingDialogTitle className="mt-3 font-display text-section font-bold text-ink">
                                {title}
                            </MorphingDialogTitle>

                            <p className="mt-6 font-display text-4xl font-extrabold leading-none text-ink">
                                {story.metric}
                            </p>
                            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                                {story.metricLabel}
                            </p>

                            <RevealText
                                as="p"
                                per="word"
                                preset="fade"
                                delay={0.15}
                                speedReveal={2.4}
                                className="mt-7 border-l-2 border-sun pl-5 font-prose text-xl italic leading-snug text-ink"
                            >
                                {story.hook}
                            </RevealText>

                            {demo && (
                                <figure className="mt-9">
                                    <video
                                        className="w-full rounded-card border border-line"
                                        src={`/video/${demo}.webm`}
                                        poster={`/video/${demo}-poster.webp`}
                                        controls
                                        muted
                                        loop
                                        playsInline
                                        preload="none"
                                    />
                                    <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                        The dashboard, running
                                    </figcaption>
                                </figure>
                            )}

                            <div className="mt-10 space-y-8">
                                {BEATS.map(({ key, label }, i) => (
                                    <div key={key}>
                                        <p className="eyebrow mb-3">{label}</p>
                                        <FadeIn
                                            delay={0.2 + i * 0.12}
                                            className="max-w-readable text-ink-soft"
                                        >
                                            {story[key]}
                                        </FadeIn>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-8">
                                {tech.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-pill border border-line px-3 py-1 font-mono text-[0.7rem] text-ink-soft"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {github && (
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="mt-8 inline-flex items-center gap-2 rounded-pill border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors duration-150 hover:border-sun/60 hover:text-sun"
                                >
                                    <Github className="h-4 w-4" aria-hidden="true" />
                                    The code
                                </a>
                            )}
                        </div>
                    </ScrollArea>

                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    );
}
