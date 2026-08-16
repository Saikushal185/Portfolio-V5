import { useCallback, useEffect, useState } from "react";
import { LogOut, Trash2, RefreshCcw, MessageSquare, Clock, Globe } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Message {
    id: number;
    created_at: string;
    message: string;
    user_agent: string;
}

export function Dashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error && data) setMessages(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        void fetchMessages();
    }, [fetchMessages]);

    const remove = async (id: number) => {
        const { error } = await supabase.from("messages").delete().eq("id", id);
        if (!error) setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

    return (
        <div className="space-y-8">
            <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                    <p className="eyebrow mb-3">Admin</p>
                    <h1 className="font-display text-section font-bold">Notes received</h1>
                    <p className="mt-2 text-ink-soft">
                        {messages.length} {messages.length === 1 ? "note" : "notes"} from the
                        contact box.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => void fetchMessages()}
                        aria-label="Refresh"
                        className="grid h-11 w-11 place-items-center rounded-pill border border-line text-ink-soft transition-colors duration-150 hover:border-sun/60 hover:text-sun"
                    >
                        <RefreshCcw
                            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => void supabase.auth.signOut().then(() => window.location.reload())}
                        className="inline-flex items-center gap-2 rounded-pill border border-line px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors duration-150 hover:border-ember hover:text-ember"
                    >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Sign out
                    </button>
                </div>
            </header>

            {messages.length === 0 && !loading ? (
                <div className="rounded-card border border-dashed border-line py-24 text-center">
                    <MessageSquare
                        className="mx-auto mb-4 h-10 w-10 text-ink-faint"
                        aria-hidden="true"
                    />
                    <p className="text-ink-faint">Nothing yet. The box is empty.</p>
                </div>
            ) : (
                <ul className="grid gap-4">
                    {messages.map((msg) => (
                        <li key={msg.id} className="card-surface group p-6">
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
                                    <Clock className="h-3 w-3" aria-hidden="true" />
                                    {formatDate(msg.created_at)}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => void remove(msg.id)}
                                    aria-label="Delete note"
                                    className="rounded-pill p-2 text-ink-faint transition-colors duration-150 hover:bg-ember/10 hover:text-ember focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                >
                                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>

                            <p className="whitespace-pre-wrap leading-relaxed text-ink">
                                {msg.message}
                            </p>

                            <p className="mt-5 flex items-start gap-2 break-all border-t border-line pt-4 font-mono text-[0.7rem] text-ink-faint">
                                <Globe className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                                {msg.user_agent}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
