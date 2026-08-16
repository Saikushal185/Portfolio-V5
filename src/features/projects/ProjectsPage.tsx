import Page from "../../shared/components/Page";
import Section from "../../shared/components/Section";
import FindingsWall from "./FindingsWall";

export default function ProjectsPage() {
    return (
        <Page
            title="Work — Sai Kushal"
            description="Twenty-one projects across data analytics, machine learning, computer vision and web. Each finding opens into the problem, the investigation and the result."
        >
            <Section
                eyebrow="Work"
                title="Every finding, and everything else."
                lede="The wall holds the projects that produced a number worth stating. Below it, the rest of the work — still real, just quieter."
            >
                <FindingsWall showFilters />
            </Section>
        </Page>
    );
}
