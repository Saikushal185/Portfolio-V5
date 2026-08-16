import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import Page from "../../shared/components/Page";
import { AdminLogin } from "./AdminLogin";
import { Dashboard } from "./Dashboard";

export function AdminPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!isSupabaseConfigured) {
            setChecking(false);
            return;
        }

        void supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setChecking(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));

        return () => subscription.unsubscribe();
    }, []);

    return (
        <Page title="Admin — Sai Kushal" description="Private area.">
            <div className="shell py-16">
                {checking ? (
                    <div className="grid min-h-[60vh] place-items-center">
                        <Loader2 className="h-6 w-6 animate-spin text-sun" aria-hidden="true" />
                        <span className="sr-only">Checking your session</span>
                    </div>
                ) : session ? (
                    <Dashboard />
                ) : (
                    <AdminLogin />
                )}
            </div>
        </Page>
    );
}
