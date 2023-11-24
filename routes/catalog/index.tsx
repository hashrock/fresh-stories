// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { defineRoute } from "$fresh/server.ts";
// import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";

// function toRelativePath(path: string) {
//   return path.replace(Deno.cwd(), "").replace(/^\//, "");
// }

export default defineRoute(async (req, ctx) => {
  const path = ctx.url.searchParams.get("path");

  const stories = [
    "Button.stories",
  ];

  return (
    <main>
      <div class="flex">
        <div class="w-[20rem] p-4">
          <h1>Components</h1>
          <ul>
            {stories.map((story) => (
              <li>
                <a class="underline" href={`?path=catalog/${story}`}>{story}</a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex-1 p-4">
          <iframe class="border p-4" src={`./${path}`} />
        </div>
      </div>
    </main>
  );
});
