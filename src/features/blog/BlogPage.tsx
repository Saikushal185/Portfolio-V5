import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS, type BlogCategory } from "../../data/blogData";
import Page from "../../shared/components/Page";
import Section from "../../shared/components/Section";

const CATEGORIES: (BlogCategory | "All")[] = ["All", "Data Analyst", "Data Scientist"];

export default function BlogPage() {
    const [category, setCategory] = useState<BlogCategory | "All">("All");

    const posts = useMemo(() => {
        const list =
            category === "All"
                ? BLOG_POSTS
                : BLOG_POSTS.filter((p) => p.category === category);
        return [...list].sort((a, b) => b.popularity - a.popularity);
    }, [category]);

    return (
        <Page
            title="Writing — Sai Kushal"
            description="Notes on metric definitions, data quality, model monitoring and the parts of analytics work that only show up in production."
        >
            <Section
                eyebrow="Writing"
                title="Notes from the messy middle."
                lede="Mostly about the parts nobody puts in the tutorial — metric contracts, data trust, and the failures that stay silent."
            >
                <div className="mb-10 flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
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
                        </button>
                    ))}
                </div>

                <ul className="divide-y divide-line border-y border-line">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link
                                to={`/blog/${post.slug}`}
                                className="group block py-7 transition-colors duration-150"
                            >
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                    <span className="text-shade">{post.topic}</span>
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>

                                <h2 className="mt-3 max-w-readable font-display text-xl font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-sun">
                                    {post.title}
                                </h2>

                                <p className="mt-2 max-w-readable text-ink-soft">
                                    {post.excerpt}
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint transition-colors duration-150 group-hover:text-sun">
                                    Read
                                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Section>
        </Page>
    );
}
