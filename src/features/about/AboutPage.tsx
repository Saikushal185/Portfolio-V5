import Page from "../../shared/components/Page";
import About from "../home/About";
import { profile } from "../../data/profile";

export default function AboutPage() {
    return (
        <Page
            title={`About — ${profile.name}`}
            description={profile.intro}
            canonical="/about"
        >
            <About />
        </Page>
    );
}
