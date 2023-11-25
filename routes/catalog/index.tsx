import { defineRoute } from "$fresh/server.ts";
import StoryFrame from "../../islands/StoryFrame.tsx";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "");
}

interface Story {
  path: string;
  name: string;
}

export default defineRoute(async (req, ctx) => {
  const path = ctx.url.searchParams.get("path");
  const storiesIter = await expandGlob("islands/stories/**/*.stories.tsx");
  const stories: Story[] = [];
  for await (const story of storiesIter) {
    stories.push({
      path: toRelativePath(story.path),
      name: story.name.replace(/\.stories\.tsx$/, ""),
    });
  }

  if (path) {
    const story = await import(
      `../../${path}`
    );

    return (
      <div class="page">
        <story.default />
      </div>
    );
  }

  return (
    <main>
      <div class="flex">
        <div class="w-[20rem] p-4">
          <h1>Components</h1>
          <ul>
            {stories.map((story) => (
              <li>
                <a class="underline" href={`?path=${story.path}`}>
                  {story.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex-1 p-4">
          <StoryFrame>
            <iframe class="border p-4 w-full" src={`./${path}`} />
          </StoryFrame>
        </div>
      </div>
    </main>
  );
});
