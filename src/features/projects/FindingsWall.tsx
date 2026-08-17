import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects";
import TileGrid, { type TileItem } from "../../shared/components/TileGrid";
import ProjectStory from "./ProjectStory";

interface Props {
    /** Home shows only the featured findings; /projects shows everything. */
    featuredOnly?: boolean;
    showFilters?: boolean;
}

export default function FindingsWall({
    featuredOnly = false,
    showFilters = false,
}: Props) {
    const [category, setCategory] = useState("All");

    // Every project carries a story now, so having one no longer earns a tile —
    // otherwise the wall swallows the whole catalogue and stops being a curated
    // view. Promotion follows `featured`, with `wall` as the explicit override
    // in either direction, and a headline metric is still required: a tile whose
    // value line is blank reads as a bug.
    const onWall = useMemo(
        () =>
            projects.filter(
                (p) =>
                    p.story?.metric &&
                    (p.wall ?? p.featured === true) &&
                    (!featuredOnly || p.featured),
            ),
        [featuredOnly],
    );

    // Everything shown on the page, wall and list together — the chips filter
    // both, so they have to be built from both or a category that only exists
    // below the wall could never be selected.
    const onPage = useMemo(
        () => (featuredOnly ? onWall : projects),
        [featuredOnly, onWall],
    );

    const categories = useMemo(
        () => ["All", ...new Set(onPage.map((p) => p.category))],
        [onPage],
    );

    const shown = useMemo(
        () =>
            category === "All"
                ? onWall
                : onWall.filter((p) => p.category === category),
        [onWall, category],
    );

    // The tile leads with the title and carries the metric as the small muted
    // line. Leading with the metric gave display type to strings like
    // "XGBoost + SHAP" and "1112 vs 1094" that don't reward it — only two of the
    // nine read as a headline number at all.
    const tiles: TileItem[] = useMemo(
        () =>
            shown.map((p, i) => ({
                id: p.title,
                title: p.title,
                value: p.story!.metric,
                iconName: p.icon,
                tone: i % 3 === 1 ? "sun" : i % 3 === 2 ? "shade" : "paper",
            })),
        [shown],
    );

    const byTitle = useMemo(() => new Map(shown.map((p) => [p.title, p])), [shown]);

    // Everything the wall didn't promote. Still a full story each — the rows
    // open the same dialog the tiles do — just without the display-type number,
    // because thirty strong cards read weaker than six. Complement of `onWall`
    // by identity, so a project can never appear in both lists or neither.
    const rest = useMemo(() => {
        if (featuredOnly) return [];
        const promoted = new Set(onWall.map((p) => p.title));
        return projects.filter(
            (p) =>
                !promoted.has(p.title) &&
                (category === "All" || p.category === category),
        );
    }, [featuredOnly, onWall, category]);

    // Flat, this was 22 undifferentiated rows in the order they happen to sit in
    // the data file, which buried the newest work — a full-stack platform and
    // five retrieval systems — beneath a dozen older analyses. Grouping makes it
    // scannable, and the order below leads with the most recent bodies of work.
    const restGroups = useMemo(() => {
        const order = [
            "AI & LLM",
            "Web Development",
            "Machine Learning",
            "Data Analytics",
            "Computer Vision",
        ];
        const by = new Map<string, typeof rest>();
        // Reversed: entries are appended to the data file as they're built, so
        // walking it backwards puts the most recent first inside each group.
        for (const p of [...rest].reverse()) {
            const list = by.get(p.category) ?? [];
            list.push(p);
            by.set(p.category, list);
        }
        return [...by.entries()].sort(
            ([a], [b]) =>
                (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99) ||
                a.localeCompare(b),
        );
    }, [rest]);

    return (
        <>
            {showFilters && (
                <div className="mb-10 flex flex-wrap gap-2">
                    {categories.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setCategory(c)}
                            aria-pressed={category === c}
                            className={`rounded-pill border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-widest transition-colors duration-150 ${
                                category === c
                                    ? "border-sun bg-sun/12 text-ink"
                                    : "border-line text-ink-soft hover:border-sun/50 hover:text-ink"
                            }`}
                        >
                            {c}
                            <span className="ml-2 text-ink-faint">
                                {c === "All"
                                    ? onPage.length
                                    : onPage.filter((p) => p.category === c).length}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* A filter can select a category with nothing promoted to the wall.
                Say so, rather than leaving an unexplained gap above More work. */}
            {shown.length === 0 && (
                <p className="max-w-readable text-ink-soft">
                    Nothing on the wall under {category} — that work is below, and it
                    reads the same way.
                </p>
            )}

            {/* Keyed on the filter so switching category rebuilds the grid rather
                than morphing a tile into an unrelated one. */}
            <TileGrid
                key={category}
                items={tiles}
                label="findings"
                columns={featuredOnly ? 2 : 3}
                expandedSlot={(item) => {
                    const p = byTitle.get(item.id);
                    return p ? <ProjectStory project={p} /> : null;
                }}
            />

            {rest.length > 0 && (
                <div className="mt-20">
                    <p className="eyebrow mb-2">More work</p>
                    <p className="mb-8 max-w-readable text-ink-soft">
                        Off the wall because the wall only holds a handful, not because
                        there's less to read — every row opens the same story. Grouped by
                        what it is, newest bodies of work first.
                    </p>

                    {restGroups.map(([group, items]) => (
                        <div key={group} className="mb-12 last:mb-0">
                            <p className="eyebrow mb-4 text-shade">
                                {group}
                                <span className="ml-2 text-ink-faint">{items.length}</span>
                            </p>
                            <ul className="divide-y divide-line border-y border-line">
                                {/* The row opens the story; the code link is a
                                    sibling, not a child. A whole-row anchor used
                                    to send every click to GitHub, which meant the
                                    twenty-five quieter projects had no way to be
                                    read at all. */}
                                {items.map((p) => (
                                    <li
                                        key={p.title}
                                        className="flex items-start gap-4 transition-colors duration-150 hover:bg-card/60"
                                    >
                                        <ProjectStory project={p} variant="row" />
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            aria-label={`${p.title} on GitHub`}
                                            className="mt-5 flex shrink-0 items-center gap-1 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint transition-colors duration-150 hover:text-sun"
                                        >
                                            Code
                                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
