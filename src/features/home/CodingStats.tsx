import { ArrowUpRight } from "lucide-react";
import { codingProfiles } from "../../data/codingProfiles";
import { Icon } from "../../shared/iconMap";
import Section from "../../shared/components/Section";
import { RevealGroup } from "../../shared/motion/Reveal";
import StatNumber from "../../shared/motion/StatNumber";

export default function CodingStats() {
    return (
        <Section
            id="coding"
            eyebrow="Problem solving"
            title="Five hundred problems, kept warm."
            lede="Competitive programming is where the data-structure work stays sharp between projects."
        >
            <RevealGroup preset="blur-slide" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {codingProfiles.map((p) => (
                    <a
                        key={p.label}
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="card-surface group flex h-full flex-col gap-4 p-6 transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-[3px] hover:border-sun/50 hover:shadow-lifted"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {p.image ? (
                                    <img
                                        src={p.image}
                                        alt=""
                                        width={24}
                                        height={24}
                                        loading="lazy"
                                        className="h-6 w-6 rounded object-contain"
                                    />
                                ) : (
                                    <Icon name={p.icon} className="h-5 w-5 text-sun" />
                                )}
                                <h3 className="font-display text-base font-semibold">
                                    {p.label}
                                </h3>
                            </div>
                            <ArrowUpRight
                                className="h-4 w-4 text-ink-faint transition-colors duration-150 group-hover:text-sun"
                                aria-hidden="true"
                            />
                        </div>

                        <StatNumber
                            value={p.stats}
                            className="font-display text-2xl font-bold tabular-nums text-sun"
                        />
                        <p className="text-sm text-ink-soft">{p.desc}</p>
                    </a>
                ))}
            </RevealGroup>
        </Section>
    );
}
