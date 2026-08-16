import { useCallback, useEffect, useState } from "react";

export type Theme = "day" | "night";

const STORAGE_KEY = "v5-theme";

/** Matches the travel duration in index.css (--travel). */
const TRAVEL_MS = 900;

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function readInitialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "day" || stored === "night") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(() =>
        typeof window === "undefined" ? "day" : readInitialTheme(),
    );

    const apply = useCallback((next: Theme) => {
        const root = document.documentElement;

        // The long cross-fade is switched on only for the duration of the move,
        // so ordinary hovers stay snappy the rest of the time.
        if (!prefersReducedMotion()) {
            root.classList.add("is-travelling");
            window.setTimeout(() => root.classList.remove("is-travelling"), TRAVEL_MS);
        }

        root.dataset.theme = next === "night" ? "dark" : "light";
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", next === "night" ? "#131A24" : "#FBEBD2");

        localStorage.setItem(STORAGE_KEY, next);
        setThemeState(next);
    }, []);

    const toggle = useCallback(
        () => apply(theme === "day" ? "night" : "day"),
        [apply, theme],
    );

    // Follow the OS only while the visitor hasn't expressed a preference.
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = (e: MediaQueryListEvent) => {
            if (localStorage.getItem(STORAGE_KEY)) return;
            apply(e.matches ? "night" : "day");
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [apply]);

    // Keep the attribute honest if the pre-paint script and React ever disagree.
    useEffect(() => {
        document.documentElement.dataset.theme = theme === "night" ? "dark" : "light";
    }, [theme]);

    return { theme, toggle, setTheme: apply };
}
