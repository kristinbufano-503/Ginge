import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vinext()],

  server: {
    host: "0.0.0.0",

    allowedHosts: [
      ".app.github.dev",
      "localhost",
      "127.0.0.1",
    ],
  },
});