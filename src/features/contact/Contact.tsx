import { useState } from "react";
import { Mail, MapPin, Send, Loader2, Check } from "lucide-react";
import { profile } from "../../data/profile";
import Section from "../../shared/components/Section";
import ResumeDownload from "../../shared/components/ResumeDownload";
import { TextMorph } from "../../shared/motion/text-morph";
import { useMotionOK } from "../../shared/motion/useMotionOK";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const motionOK = useMotionOK();

    // Matches the existing `messages` table: an anonymous note plus the user
    // agent. No name or email field, because there are no columns for them.
    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            setStatus("error");
            setError("Write something first — the note is empty.");
            return;
        }
        setStatus("sending");
        setError("");

        // The client is ~57KB gzipped and most visitors never send anything, so
        // it stays off the critical path until someone actually submits.
        const { supabase, isSupabaseConfigured } = await import("../../lib/supabase");

        if (!isSupabaseConfigured) {
            setStatus("error");
            setError("The message box isn't connected right now. Email works.");
            return;
        }

        const { error: insertError } = await supabase
            .from("messages")
            .insert([{ message: message.trim(), user_agent: navigator.userAgent }]);

        if (insertError) {
            setStatus("error");
            setError("That didn't send. Try again, or email me directly.");
            return;
        }

        setStatus("sent");
        setMessage("");
    };

    return (
        <Section
            id="contact"
            eyebrow="Contact"
            title="Leave a note, or just email me."
            lede="I read everything. The box below is anonymous — no name, no address, nothing tracked beyond the browser you sent it from."
        >
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <form onSubmit={send} className="card-surface p-6 sm:p-8">
                    <label
                        htmlFor="note"
                        className="eyebrow mb-4 block"
                    >
                        Your note
                    </label>
                    <textarea
                        id="note"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            if (status !== "idle") setStatus("idle");
                        }}
                        rows={6}
                        maxLength={2000}
                        placeholder="A question, a role, a correction on one of the projects…"
                        className="w-full resize-y rounded-card border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-faint focus:border-sun focus:outline-none"
                    />

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-surface transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {status === "sending" ? (
                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            ) : status === "sent" ? (
                                <Check className="h-4 w-4" aria-hidden="true" />
                            ) : (
                                <Send className="h-4 w-4" aria-hidden="true" />
                            )}
                            {/* The label morphs between states rather than
                                cutting, so the button reads as one thing
                                changing rather than three different buttons.
                                TextMorph animates layout from JS, which the CSS
                                reduced-motion rule can't reach — hence the gate. */}
                            {(() => {
                                const label =
                                    status === "sending"
                                        ? "Sending"
                                        : status === "sent"
                                          ? "Sent"
                                          : "Send note";
                                return motionOK ? (
                                    <TextMorph as="span">{label}</TextMorph>
                                ) : (
                                    <span>{label}</span>
                                );
                            })()}
                        </button>

                        <span
                            role="status"
                            aria-live="polite"
                            className={`text-sm ${status === "error" ? "text-ember" : "text-ink-soft"}`}
                        >
                            {status === "sent" && "Delivered. Thanks for reading."}
                            {status === "error" && error}
                        </span>
                    </div>
                </form>

                <div className="space-y-10">
                    <div className="space-y-4">
                        <a
                            href={`mailto:${profile.email}`}
                            className="group flex items-center gap-4 border-b border-line pb-4 transition-colors duration-150"
                        >
                            <Mail className="h-4 w-4 text-ink-faint transition-colors group-hover:text-sun" aria-hidden="true" />
                            <span>
                                <span className="eyebrow block">Email</span>
                                <span className="mt-1 block text-ink transition-colors group-hover:text-sun">
                                    {profile.email}
                                </span>
                            </span>
                        </a>

                        <div className="flex items-center gap-4 border-b border-line pb-4">
                            <MapPin className="h-4 w-4 text-ink-faint" aria-hidden="true" />
                            <span>
                                <span className="eyebrow block">Based in</span>
                                <span className="mt-1 block text-ink">{profile.location}</span>
                            </span>
                        </div>
                    </div>

                    <ResumeDownload compact />
                </div>
            </div>
        </Section>
    );
}
