import { Github, ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { FadeIn } from "../../shared/motion/Reveal";
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
 * Two triggers, one dialog. `variant="tile"` sits inside an expanded tile on the
 * findings wall and shows the hook above a "Read the full story" pill;
 * `variant="row"` turns an entire "More work" row into the trigger, so the
 * quieter projects open exactly the same reading experience as the headline six.
 *
 * The previous version put raw markup on both sides of the dialog, which meant
 * nothing actually morphed except the container — `MorphingDialogTitle`,
 * `Subtitle` and `Image` each carry a `layoutId`, and it is having the *same*
 * component on both sides that makes the content travel. Each may appear only
 * once per side or the ids collide. The row variant pairs only the title, since
 * a list row carries no poster.
 */
export default function ProjectStory({
    project,
    variant = "tile",
}: {
    project: Project;
    /** Where the trigger lives — an expanded wall tile, or a "More work" row. */
    variant?: "tile" | "row";
}) {
    const { story, title, description, category, tech, demo, github } = project;
    if (!story) return null;

    const poster = demo ? `/video/${demo}-poster.webp` : null;

    return (
        <MorphingDialog transition={{ type: "spring", stiffness: 200, damping: 24 }}>
            {variant === "row" ? (
                // The row is a button and the "Code" link is its sibling in the
                // list item — an <a> nested inside a <button> is invalid markup
                // and swallows keyboard activation on both.
                <MorphingDialogTrigger
                    className="w-full py-5 text-left"
                    ariaLabel={`${title} — read the full story`}
                >
                    <span className="flex flex-col gap-1.5">
                        <MorphingDialogTitle className="font-display font-semibold text-ink">
                            {title}
                        </MorphingDialogTitle>
                        <span className="max-w-readable text-sm text-ink-soft">
                            {description}
                        </span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-3 font-mono text-[0.7rem] text-ink-faint">
                            <span>{tech.slice(0, 4).join(" · ")}</span>
                            {story.metric && (
                                <span className="text-shade">{story.metric}</span>
                            )}
                        </span>
                    </span>
                </MorphingDialogTrigger>
            ) : (
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
            )}

            <MorphingDialogContainer>
                <MorphingDialogContent className="card-surface morph-panel relative mx-4 w-full max-w-3xl">
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

                            {/* Not every project produced a number worth 48px of
                                display type, and filling the slot with a weak one
                                would be the exact thing this site argues against.
                                Absent, the hook simply becomes the opening line. */}
                            {story.metric && (
                                <>
                                    <p className="mt-6 font-display text-4xl font-extrabold leading-none text-ink">
                                        {story.metric}
                                    </p>
                                    {story.metricLabel && (
                                        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                                            {story.metricLabel}
                                        </p>
                                    )}
                                </>
                            )}

                            {/* Was RevealText, which fires on scroll-into-view.
                                Inside a portalled dialog that intersection never
                                arrived, so the hook sat at opacity 0 — invisible
                                on every story opened from a "More work" row,
                                while the wall tiles got away with it because
                                their copy had already been seen in the page.
                                The dialog opening is the reveal here, so mount
                                is the correct trigger. */}
                            <FadeIn
                                delay={0.15}
                                className="mt-7 border-l-2 border-sun pl-5 font-prose text-xl italic leading-snug text-ink"
                            >
                                {story.hook}
                            </FadeIn>

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
