import LegalPage from "./LegalPage";
import { privacyDoc } from "../../data/legal";

/**
 * Thin route wrapper. It exists so `data/legal` (13KB of prose nobody reads on
 * the way to the projects page) is pulled in by this lazy chunk rather than by
 * the router, which would put it in the entry bundle.
 */
export default function PrivacyPage() {
    return <LegalPage doc={privacyDoc} />;
}
