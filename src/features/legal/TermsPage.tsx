import LegalPage from "./LegalPage";
import { termsDoc } from "../../data/legal";

/** See PrivacyPage — same reason, other document. */
export default function TermsPage() {
    return <LegalPage doc={termsDoc} />;
}
