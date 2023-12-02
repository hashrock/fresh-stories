import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import storiesPlugin from "../stories-plugin.tsx";

export default defineConfig({
  plugins: [tailwind(), storiesPlugin(import.meta.url)],
});