// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { defineRoute } from "$fresh/server.ts";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "")
}

export default defineRoute(async (req, ctx) => {
  const stories = [];
  for await (const entry of expandGlob("./**/*.stories.tsx")) {
    stories.push(toRelativePath(entry.path));

  }
  return (
    <main>
      <h1>Index</h1>

      <ul>
        {stories.map((story) => (
          <li>
            <a href={`/catalog/${story}`}>{story}</a>
          </li>
        ))}
      </ul>
    </main>
  );
});
