import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "../../data/blogData";
import Page from "../../shared/components/Page";
import NotFound from "../NotFound";

export default function BlogPost() {
    const { slug } = useParams();
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) return <NotFound />;

    return (
        <Page title={`${post.title} — Sai Kushal`} description={post.excerpt}>
            <article className="shell py-20 sm:py-28">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-soft transition-colors duration-150 hover:text-sun"
                >
                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                    All writing
                </Link>

                <header className="mt-10 max-w-readable">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                        <span className="text-shade">{post.topic}</span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h1 className="mt-4 font-display text-section font-bold">
                        {post.title}
                    </h1>

                    <p className="mt-5 font-prose text-xl italic leading-snug text-ink">
                        {post.lede}
                    </p>
                </header>

                <div className="mt-12 max-w-readable space-y-6 text-lg leading-relaxed text-ink-soft">
                    {post.body.map((block, i) => {
                        switch (block.kind) {
                            case 'h2':
                                return (
                                    // Negative top margin against the parent's
                                    // space-y so a heading sits closer to the
                                    // section it opens than to the one it closes.
                                    <h2
                                        key={i}
                                        className="!mt-14 font-display text-xl font-semibold text-ink"
                                    >
                                        {block.text}
                                    </h2>
                                );
                            case 'ul':
                                return (
                                    <ul key={i} className="list-disc space-y-2 pl-6 marker:text-sun">
                                        {block.items.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            case 'ol':
                                return (
                                    <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-mono marker:text-sun">
                                        {block.items.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ol>
                                );
                            default:
                                return <p key={i}>{block.text}</p>;
                        }
                    })}
                </div>

                <div className="mt-12 flex max-w-readable flex-wrap gap-2 border-t border-line pt-8">
                    {post.tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-pill border border-line px-3 py-1 font-mono text-[0.7rem] text-ink-soft"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </article>
        </Page>
    );
}
