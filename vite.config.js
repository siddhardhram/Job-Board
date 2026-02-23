/* eslint-disable no-undef */
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Demo mode = no real Clerk key set (or still has the placeholder text)
  const isDemoMode =
    !env.VITE_CLERK_PUBLISHABLE_KEY ||
    env.VITE_CLERK_PUBLISHABLE_KEY.includes("your_");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // In demo mode, alias both clerk packages to our harmless mocks
        ...(isDemoMode
          ? {
            "@clerk/clerk-react": path.resolve(
              __dirname,
              "./src/lib/clerk-mock.jsx"
            ),
            "@clerk/themes": path.resolve(
              __dirname,
              "./src/lib/clerk-mock.jsx"
            ),
          }
          : {}),
      },
    },
  };
});
