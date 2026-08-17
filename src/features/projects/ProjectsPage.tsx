import Page from "../../shared/components/Page";
import Section from "../../shared/components/Section";
import FindingsWall from "./FindingsWall";

export default function ProjectsPage() {
    return (
        <Page
            title="Work — Sai Kushal"
            description="Thirty-one projects across data analytics, machine learning, AI and web. Each one opens into the problem, the investigation and the result."
        >
            <Section
                eyebrow="Work"
                title="Every finding, and everything else."
                lede="The wall holds the projects that produced a number worth stating in large type. Everything below it opens the same story — the problem, the investigation, the result."
            >
                <FindingsWall showFilters />
            </Section>
        </Page>
    );
}
