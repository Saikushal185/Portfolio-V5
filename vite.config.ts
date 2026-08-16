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
                manualChunks: {
                    react: ["react", "react-dom", "react-router-dom"],
                    supabase: ["@supabase/supabase-js"],
                },
            },
        },
    },
});
