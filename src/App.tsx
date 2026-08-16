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

/**
 * Every route below the landing page is split out.
 *
 * Home stays eager: it is the entry point for almost every visit, and lazying
 * it would only trade the bundle for a spinner on the one page that must paint
 * fast. Everything else — including the project and blog copy, which is the
 * heaviest data in the app — now arrives when its route does.
 *
 * Admin is behind auth and never touched by most visitors, so it also drags
 * the Supabase client out of the shared path.
 */
const ProjectsPage = lazy(() => import("./features/projects/ProjectsPage"));
const AboutPage = lazy(() => import("./features/about/AboutPage"));
const SkillsPage = lazy(() => import("./features/skills/SkillsPage"));
const CredentialsPage = lazy(() => import("./features/credentials/CredentialsPage"));
const CodingPage = lazy(() => import("./features/coding/CodingPage"));
const ContactPage = lazy(() => import("./features/contact/ContactPage"));
const BlogPage = lazy(() => import("./features/blog/BlogPage"));
const BlogPost = lazy(() => import("./features/blog/BlogPost"));
const PrivacyPage = lazy(() => import("./features/legal/PrivacyPage"));
const TermsPage = lazy(() => import("./features/legal/TermsPage"));
const NotFound = lazy(() => import("./features/NotFound"));
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
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    );
}
