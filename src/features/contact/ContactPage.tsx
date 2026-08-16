import Page from "../../shared/components/Page";
import Contact from "./Contact";
import { profile } from "../../data/profile";

export default function ContactPage() {
    return (
        <Page
            title={`Contact — ${profile.name}`}
            description={`Get in touch with ${profile.name} — ${profile.role} based in ${profile.location}.`}
            canonical="/contact"
        >
            <Contact />
        </Page>
    );
}
