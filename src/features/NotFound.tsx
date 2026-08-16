import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Page from "../shared/components/Page";

export default function NotFound() {
    return (
        <Page title="Not found — Sai Kushal" description="That page doesn't exist.">
            <section className="shell flex min-h-[60vh] flex-col justify-center py-20">
                <p className="eyebrow mb-6">404</p>
                <h1 className="max-w-[18ch] font-display text-section font-bold">
                    Nothing at this address.
                </h1>
                <p className="mt-5 max-w-readable text-lg text-ink-soft">
                    The link is either old or slightly wrong. The work is all still here.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-surface transition-opacity duration-150 hover:opacity-85"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back home
                    </Link>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 rounded-pill border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-ink transition-colors duration-150 hover:border-sun/60 hover:text-sun"
                    >
                        See the work
                    </Link>
                </div>
            </section>
        </Page>
    );
}
