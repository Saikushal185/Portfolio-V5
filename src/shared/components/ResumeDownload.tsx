import { Download } from "lucide-react";
import { resume } from "../../data/resumes";

/**
 * A single résumé download.
 *
 * This was a three-way picker across role-targeted PDFs. One document now
 * covers analytics, ML and engineering, so there is nothing to pick — and a
 * picker offering one option reads as a mistake rather than a choice.
 */
export default function ResumeDownload({ compact = false }: { compact?: boolean }) {
    return (
        <a
            href={resume.file}
            download
            className="group inline-flex items-center gap-3 rounded-card border border-line bg-card px-5 py-3.5 text-left transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-[2px] hover:border-sun/60 hover:shadow-raking"
        >
            <Download
                className="h-4 w-4 shrink-0 text-ink-faint transition-colors duration-150 group-hover:text-sun"
                aria-hidden="true"
            />
            <span>
                <span className="block font-mono text-xs uppercase tracking-widest text-ink">
                    Download résumé
                </span>
                {!compact && (
                    <span className="mt-0.5 block text-sm text-ink-soft">{resume.note}</span>
                )}
            </span>
        </a>
    );
}
