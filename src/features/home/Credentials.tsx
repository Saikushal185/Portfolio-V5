import { ArrowUpRight } from "lucide-react";
import { certifications } from "../../data/certifications";
import { education } from "../../data/education";
import { Icon } from "../../shared/iconMap";
import Section from "../../shared/components/Section";

export default function Credentials() {
    return (
        <Section id="credentials" eyebrow="Education & certifications" title="The paperwork.">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div>
                    <p className="eyebrow mb-6">Education</p>
                    <div className="space-y-5">
                        {education.map((e) => (
                            <article key={e.title + e.org} className="card-surface p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-display text-lg font-semibold">
                                            {e.title}
                                        </h3>
                                        <p className="mt-1 text-ink-soft">{e.major}</p>
                                    </div>
                                    <Icon name={e.icon} className="h-5 w-5 shrink-0 text-sun" />
                                </div>

                                <p className="mt-4 text-sm text-ink-soft">{e.org}</p>
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                    <span>{e.date}</span>
                                    <span>{e.place}</span>
                                    <span className="text-shade">{e.grade}</span>
                                </div>

                                {e.courses.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {e.courses.map((c) => (
                                            <span
                                                key={c}
                                                className="rounded-pill border border-line px-3 py-1 font-mono text-[0.7rem] text-ink-soft"
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="eyebrow mb-6">Certifications</p>
                    <ul className="divide-y divide-line border-y border-line">
                        {certifications.map((c) => (
                            <li key={c.title}>
                                <a
                                    href={c.link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="group flex items-center gap-4 py-4 transition-colors duration-150 hover:bg-card/60"
                                >
                                    {c.badge ? (
                                        <img
                                            src={c.badge}
                                            alt=""
                                            width={44}
                                            height={44}
                                            loading="lazy"
                                            className="h-11 w-11 shrink-0 object-contain"
                                        />
                                    ) : (
                                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line text-ink-faint">
                                            <Icon name="Award" className="h-4 w-4" />
                                        </span>
                                    )}

                                    <span className="min-w-0 flex-1">
                                        <span className="block font-display text-sm font-semibold leading-snug text-ink">
                                            {c.title}
                                        </span>
                                        <span className="mt-0.5 block font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                            {c.issuer}
                                        </span>
                                    </span>

                                    <ArrowUpRight
                                        className="h-4 w-4 shrink-0 text-ink-faint transition-colors duration-150 group-hover:text-sun"
                                        aria-hidden="true"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
