import Page from "../../shared/components/Page";
import Section from "../../shared/components/Section";
import { skillCategories, type SkillCategory } from "../../data/skills";
import { Icon } from "../../shared/iconMap";
import { RevealGroup } from "../../shared/motion/Reveal";
import StatNumber from "../../shared/motion/StatNumber";
import { profile } from "../../data/profile";

const all = skillCategories.flatMap((c) => c.skills);
const advanced = all.filter((s) => s.level === "Advanced");

/**
 * Bento layout, structure borrowed from Watermelon UI's `bento-3` — a wide
 * lead tile, a narrow companion, then a row of equal tiles.
 *
 * Only the skeleton came across. Their version is 749 lines of hardcoded
 * near-black hex against Tailwind v4 syntax; rebuilding the proportions in this
 * site's tokens was both shorter and the only way the tiles would keep
 * responding to the sun arc.
 */
function Tile({ cat }: { cat: SkillCategory }) {
    return (
        <article
            className="card-surface flex h-full flex-col gap-5 p-7 transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-[3px] hover:border-sun/50 hover:shadow-lifted sm:p-8"
        >
            <div className="flex items-center gap-3">
                <Icon name={cat.icon} className="h-5 w-5 shrink-0 text-sun" />
                <h3 className="font-display text-lg font-semibold">{cat.category}</h3>
            </div>

            <p className="max-w-readable text-sm text-ink-soft">{cat.description}</p>

            <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {cat.skills.map((s) => (
                    <span
                        key={s.name}
                        className={`rounded-pill border px-3 py-1 font-mono text-[0.7rem] ${
                            s.level === "Advanced"
                                ? "border-sun/50 bg-sun/10 text-ink"
                                : "border-line text-ink-soft"
                        }`}
                    >
                        {s.name}
                    </span>
                ))}
            </div>
        </article>
    );
}

export default function SkillsPage() {
    const [lead, ...rest] = skillCategories;

    return (
        <Page
            title={`Skills — ${profile.name}`}
            description="The tools behind the work — Python, SQL, scikit-learn, PyTorch, Power BI, and the cloud platforms they run on."
            canonical="/skills"
        >
            <Section
                id="skills"
                eyebrow="What I reach for"
                title="The tools, and how well I know them."
                lede="Grouped by what they're for rather than by how impressive the list looks. Highlighted tags are the ones I'd be comfortable being tested on."
            >
                {/* Counts come from the data, so they cannot drift out of sync
                    with the tags underneath them. */}
                <div className="mb-10 grid gap-5 sm:grid-cols-3">
                    {[
                        { value: `${all.length}`, label: "tools in rotation" },
                        { value: `${advanced.length}`, label: "at an advanced level" },
                        { value: `${skillCategories.length}`, label: "areas of work" },
                    ].map((s) => (
                        <div key={s.label} className="card-surface p-6">
                            <StatNumber
                                value={s.value}
                                className="font-display text-4xl font-extrabold tabular-nums text-sun"
                            />
                            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* The lead tile sits outside the grid rather than spanning two
                    columns inside it. AnimatedGroup wraps each child in its own
                    element, so a `col-span` on the tile would land one level too
                    deep and never reach the grid. */}
                <div className="mb-5">
                    <Tile cat={lead} />
                </div>

                <RevealGroup preset="blur-slide" className="grid gap-5 sm:grid-cols-2">
                    {rest.map((c) => (
                        <Tile key={c.category} cat={c} />
                    ))}
                </RevealGroup>
            </Section>
        </Page>
    );
}
