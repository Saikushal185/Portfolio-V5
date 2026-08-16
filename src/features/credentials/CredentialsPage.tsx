import Page from "../../shared/components/Page";
import Credentials from "../home/Credentials";
import { profile } from "../../data/profile";

export default function CredentialsPage() {
    return (
        <Page
            title={`Credentials — ${profile.name}`}
            description="Education and professional certifications — B.Tech in Computer Science at VIT Amaravati, plus cloud and data platform certifications."
            canonical="/credentials"
        >
            <Credentials />
        </Page>
    );
}
