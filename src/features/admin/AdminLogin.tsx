import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";

export function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSupabaseConfigured) {
            setError("Supabase isn't configured in this environment.");
            return;
        }

        setBusy(true);
        setError("");

        const { error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (authError) setError("That email and password didn't match.");
        setBusy(false);
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
            <p className="eyebrow mb-4">Admin</p>
            <h1 className="font-display text-section font-bold">Sign in</h1>
            <p className="mt-3 text-ink-soft">
                This is the private side of the site — the notes left in the contact box.
            </p>

            <form onSubmit={submit} className="card-surface mt-10 space-y-5 p-7">
                <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-card border border-line bg-surface px-4 py-3 text-ink focus:border-sun focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="eyebrow mb-2 block">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-card border border-line bg-surface px-4 py-3 text-ink focus:border-sun focus:outline-none"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-ember">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-surface transition-opacity duration-150 hover:opacity-85 disabled:opacity-50"
                >
                    {busy ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                        <LogIn className="h-4 w-4" aria-hidden="true" />
                    )}
                    Sign in
                </button>
            </form>
        </div>
    );
}
