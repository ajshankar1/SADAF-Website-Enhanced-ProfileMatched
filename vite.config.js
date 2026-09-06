import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/SADAF-Website-Enhanced-ProfileMatched/",
  build: {
    outDir: "docs",
  },
});