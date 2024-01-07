import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@Components": path.resolve(__dirname, "./src/presentation/components"),
      "@UseCases": path.resolve(__dirname, "./src/core/use-cases"),
    },
  },
});
