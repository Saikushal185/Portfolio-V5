import { profile, credential } from "../../data/profile";
import { skillCategories } from "../../data/skills";
import { Icon } from "../../shared/iconMap";
import Section from "../../shared/components/Section";
import Carousel from "../../shared/components/Carousel";

export default function About() {
    return (
        <Section
            id="about"
            eyebrow="About"
            title="I like the datasets that argue back."
        >
            {/* The degree used to open the prose — "I finished a B.Tech…" — which
                spent the strongest sentence on the page on a credential. Up here
                it is a fact you can scan and stop thinking about, and the first
                paragraph gets to lead with the work instead. */}
            <dl className="mb-10 flex flex-wrap gap-2">
                {credential.map((c) => (
                    <div
                        key={c.label}
                        className="rounded-pill border border-line bg-card px-4 py-2"
                    >
                        <dt className="sr-only">{c.label}</dt>
                        <dd className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-soft">
                            {c.value}
                        </dd>
                    </div>
                ))}
            </dl>

            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                <div className="max-w-readable space-y-5 text-ink-soft">
                    {/* Floated so the prose wraps around it from the second
                        paragraph on; stacked above the text on narrow screens.
                        Renders nothing until a portrait actually exists, so the
                        column is correct both before and after the file lands.

                        The outline is pure black at low opacity, never a tinted
                        neutral — a tinted edge picks up the paper underneath and
                        reads as dirt along the crop. It rides a token rather
                        than a `dark:` variant, because this project has no
                        `darkMode: 'class'` config, so `dark:` follows the OS
                        instead of the sun-arc theme. */}
                    {profile.avatar && (
                        <img
                            src={profile.avatar}
                            alt={`${profile.name}, ${profile.roleShort}`}
                            width={176}
                            height={220}
                            loading="lazy"
                            decoding="async"
                            className="mb-5 w-full rounded-card object-cover shadow-raking outline outline-1 -outline-offset-1 outline-[rgb(var(--c-img-outline)/0.1)] sm:float-left sm:mb-3 sm:mr-6 sm:w-44"
                        />
                    )}
                    <p>
                        I build the part of a data project that has to hold up after
                        someone disagrees with it — the definition, the split, the
                        threshold, the reason this model and not the one that scored
                        higher. In 2025 that meant a stretch as a data analyst at
                        Brightix, turning 20,000+ retail sales records into something a
                        Power BI dashboard could tell the truth with.
                    </p>
                    <p>
                        Most of what I build starts the same way: a public dataset that
                        looks tidy until you open it. Missing values, coded categories,
                        an imbalanced target, a time column that will happily leak the
                        future into your training set if you let it. The interesting part
                        isn't the model — it's the decisions you make so the answer
                        survives someone checking it.
                    </p>
                    <p>
                        That's why the projects here lead with a number and then show the
                        working. A recall-prioritised logistic regression that scores
                        worse than the random forest is still the right call when a human
                        has to defend the decision. Choosing it, and being able to say
                        why, is the job.
                    </p>
                    <p>
                        I also co-authored a paper on kidney and urinary disease
                        prediction presented at ADSSS 2024, and I keep the algorithm
                        muscles warm on LeetCode — Knight, 1800+, 500 problems in.
                    </p>
                </div>

                <div>
                    <p className="eyebrow mb-6">What I reach for</p>
                    {/* Eight categories stacked vertically made this column
                        twice the height of the prose beside it. The carousel
                        holds one at a time and keeps the two columns level;
                        /skills still shows all eight at once for scanning. */}
                    <Carousel
                        label="skill category"
                        items={skillCategories.map((cat) => (
                            <div key={cat.category} className="card-surface flex min-h-[15rem] flex-col p-6">
                                <div className="flex items-center gap-3">
                                    <Icon name={cat.icon} className="h-4 w-4 text-sun" />
                                    <h3 className="font-display text-base font-semibold">
                                        {cat.category}
                                    </h3>
                                </div>
                                <p className="mt-3 text-sm text-ink-soft">{cat.description}</p>
                                <div className="mt-4 flex flex-wrap content-start gap-2">
                                    {cat.skills.map((sk) => (
                                        <span
                                            key={sk.name}
                                            className={`rounded-pill border px-3 py-1 font-mono text-[0.7rem] ${
                                                sk.level === "Advanced"
                                                    ? "border-sun/50 bg-sun/10 text-ink"
                                                    : "border-line text-ink-soft"
                                            }`}
                                        >
                                            {sk.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    />
                </div>
            </div>
        </Section>
    );
}
