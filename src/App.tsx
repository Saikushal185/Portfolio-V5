import { Suspense, lazy, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Loader2 } from "lucide-react";

import Home from "./features/home/Home";
import ProjectsPage from "./features/projects/ProjectsPage";
import AboutPage from "./features/about/AboutPage";
import SkillsPage from "./features/skills/SkillsPage";
import CredentialsPage from "./features/credentials/CredentialsPage";
import CodingPage from "./features/coding/CodingPage";
import ContactPage from "./features/contact/ContactPage";
import BlogPage from "./features/blog/BlogPage";
import BlogPost from "./features/blog/BlogPost";
import LegalPage from "./features/legal/LegalPage";
import NotFound from "./features/NotFound";
import { privacyDoc, termsDoc } from "./data/legal";

// Admin is behind auth and never touched by most visitors — no reason to ship
// it in the main bundle.
const AdminPage = lazy(() =>
    import("./features/admin").then((m) => ({ default: m.AdminPage })),
);

/** Land at the top on navigation, but let in-page anchors do their own thing. */
function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) return;
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname, hash]);

    return null;
}

const Fallback = () => (
    <div className="grid min-h-screen place-items-center bg-surface">
        <Loader2 className="h-6 w-6 animate-spin text-sun" aria-hidden="true" />
        <span className="sr-only">Loading</span>
    </div>
);

export default function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<Fallback />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/credentials" element={<CredentialsPage />} />
                        <Route path="/coding" element={<CodingPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/privacy" element={<LegalPage doc={privacyDoc} />} />
                        <Route path="/terms" element={<LegalPage doc={termsDoc} />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    );
}
