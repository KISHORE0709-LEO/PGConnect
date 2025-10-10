import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  define: {
    __APP_NAME__: '"PGConnect"'
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    // No proxy - direct Google Cloud connection
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
