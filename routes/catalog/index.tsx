// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { defineRoute } from "$fresh/server.ts";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "");
}

export default defineRoute(async (req, ctx) => {
  const path = ctx.url.searchParams.get("path");

  const stories = [
    "Button.stories",
  ];

  return (
    <main>
      <h1>Index</h1>

      <div class="grid grid-cols-2">
        <ul>
          {stories.map((story) => (
            <li>
              <a href={`?path=catalog/${story}`}>{story}</a>
            </li>
          ))}
        </ul>
        <div>
          <iframe src={`./${path}`} />
        </div>
      </div>
    </main>
  );
});
