import type { LegalDoc, LegalSection } from "../../data/legal";
import Page from "../../shared/components/Page";

const Body = ({ section }: { section: LegalSection }) => (
    <>
        {section.paragraphs?.map((p, i) => (
            <p key={i} className="mt-4 text-ink-soft">
                {p}
            </p>
        ))}

        {section.list && (
            <ul className="mt-4 space-y-2">
                {section.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-ink-soft">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-sun" />
                        {item}
                    </li>
                ))}
            </ul>
        )}

        {section.subsections?.map((sub, i) => (
            <div key={i} className="mt-6">
                {sub.subheading && (
                    <h3 className="font-display text-base font-semibold text-ink">
                        {sub.subheading}
                    </h3>
                )}
                {sub.paragraphs?.map((p, j) => (
                    <p key={j} className="mt-3 text-ink-soft">
                        {p}
                    </p>
                ))}
                {sub.list && (
                    <ul className="mt-3 space-y-2">
                        {sub.list.map((item, j) => (
                            <li key={j} className="flex gap-3 text-ink-soft">
                                <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-sun" />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
    </>
);

export default function LegalPage({ doc }: { doc: LegalDoc }) {
    return (
        <Page title={`${doc.title} — Sai Kushal`} description={doc.title}>
            <article className="shell max-w-readable py-20 sm:py-28">
                <p className="eyebrow mb-4">{doc.updated}</p>
                <h1 className="font-display text-section font-bold">{doc.title}</h1>

                <div className="mt-12 space-y-12">
                    {doc.sections.map((section) => (
                        <section key={section.heading}>
                            <h2 className="font-display text-lg font-semibold text-ink">
                                {section.heading}
                            </h2>
                            <Body section={section} />
                        </section>
                    ))}
                </div>

                <p className="mt-16 border-t border-line pt-8 text-sm text-ink-faint">
                    {doc.footer}
                </p>
            </article>
        </Page>
    );
}
