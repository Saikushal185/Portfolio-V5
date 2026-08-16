import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Doodles from "./Doodles";

const SITE = "https://saikushal.live";

interface Props {
    title: string;
    description?: string;
    /**
     * Path this page should be indexed under, e.g. "/about".
     *
     * Every section appears twice — once on the landing page and once on its
     * own route — so without a canonical the two compete for the same terms.
     * The dedicated route is the canonical one; the landing page is the
     * summary that links to it.
     */
    canonical?: string;
    children: ReactNode;
}

/**
 * Page frame. The atmosphere layers (grain, stars, daylight) live here so every
 * route sits in the same light, and so the sun-arc control affects all of it.
 */
export default function Page({ title, description, canonical, children }: Props) {
    return (
        <div className="grain relative flex min-h-screen flex-col">
            <Helmet>
                <title>{title}</title>
                {description && <meta name="description" content={description} />}
                {canonical && <link rel="canonical" href={`${SITE}${canonical}`} />}
            </Helmet>

            <div className="starfield" aria-hidden="true" />
            <Doodles />

            <div className="relative z-10 flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
