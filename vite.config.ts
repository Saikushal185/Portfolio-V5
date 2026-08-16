import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        compression({ algorithm: "gzip", ext: ".gz" }),
    ],
    resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
    },
    build: {
        rollupOptions: {
            output: {
                // Vendor code is split off so it downloads in parallel with the
                // app chunk and survives a deploy in the browser cache — these
                // change on a dependency bump, the app changes every push.
                manualChunks: {
                    react: ["react", "react-dom", "react-router-dom"],
                    supabase: ["@supabase/supabase-js"],
                    motion: ["motion"],
                    icons: ["lucide-react"],
                },
            },
        },
    },
});
