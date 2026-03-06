import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    global: "window"
  },

  resolve: {
    alias: {
      React: "react",
      ReactDOM: "react-dom",
      axios: "axios",
      Keycloak: "keycloak-js",
      FormioReact: "@formio/react",
      "@formio/js": "formiojs"
    },
    dedupe: ["react", "react-dom"]
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "axios",
      "keycloak-js"
    ],
    exclude: [
      "formsflow-webembed",
      "@formio/react",
      "@formio/core",
      "formiojs"
    ]
  },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: [
        "@formio/model",
        "@formio/utils/sanitize"
      ]
    }
  }
});