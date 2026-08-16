import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Page from "../../shared/components/Page";
import Section from "../../shared/components/Section";
import FindingsWall from "../projects/FindingsWall";
import Contact from "../contact/Contact";
import Hero from "./Hero";
import About from "./About";
import CodingStats from "./CodingStats";
import Credentials from "./Credentials";
import Wallpaper from "../../shared/components/Wallpaper";
import { projects } from "../../data/projects";

/**
 * Sends a landing section to its own page.
 *
 * This was a bare line of mono text and read as a caption — people didn't
 * register it as something to click. It's a bordered pill on its own rule now,
 * with the arrow travelling on hover, so it reads as the exit from the section.
 */
function MoreLink({ to, label }: { to: string; label: string }) {
    return (
        <div className="shell -mt-8 pb-6">
            <div className="border-t border-line pt-6">
                <Link
                    to={to}
                    className="group inline-flex items-center gap-3 rounded-pill border border-line bg-card px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink shadow-raking transition-[border-color,color,box-shadow] duration-150 hover:border-sun/60 hover:text-sun hover:shadow-lifted focus-visible:border-sun focus-visible:outline-none"
                >
                    {label}
                    <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </Link>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <Page
            title="Sai Kushal — Data Scientist & ML Engineer"
            description="Data scientist and ML engineer. Real datasets turned into decisions — A/B tests, credit risk, customer segmentation, readmission prediction."
        >
            <Hero />

            <Section
                id="findings"
                eyebrow="Selected findings"
                title="What the data actually said."
                lede="Each one opens into the problem, the investigation and the result — plus a clip of the thing running."
            >
                <FindingsWall featuredOnly />

                <Link
                    to="/projects"
                    className="group mt-10 inline-flex items-center gap-3 rounded-pill border border-line bg-card px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink shadow-raking transition-[border-color,color,box-shadow] duration-150 hover:border-sun/60 hover:text-sun hover:shadow-lifted focus-visible:border-sun focus-visible:outline-none"
                >
                    All {projects.length} projects
                    <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                    />
                </Link>
            </Section>

            {/* Each section also stands on its own route. The landing page is
                the summary; these links go to the canonical version. */}
            <About />
            <MoreLink to="/about" label="More about the background" />

            <CodingStats />
            <MoreLink to="/coding" label="All the problem-solving profiles" />

            {/* The second and last wallpaper band. Two is the whole budget —
                more and they stop being atmosphere and start being pattern. */}
            <div className="relative">
                <Wallpaper name="grove" position="cover" />
                <Credentials />
            </div>
            <MoreLink to="/credentials" label="Full education and certifications" />

            <Contact />
        </Page>
    );
}
