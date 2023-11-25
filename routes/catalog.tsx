import { defineRoute } from "$fresh/server.ts";
import StoryFrame from "../islands/StoryFrame.tsx";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";
import IconComponents from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/components.tsx";
import IconChevronLeft from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/chevron-left.tsx";
import StoryList, { Story } from "../islands/StoryList.tsx";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "");
}

export default defineRoute(async (_req, ctx) => {
  const path = ctx.url.searchParams.get("path");
  const single = ctx.url.searchParams.get("single");

  const storiesIter = await expandGlob("islands/stories/**/*.tsx");
  const stories: Story[] = [];
  for await (const story of storiesIter) {
    stories.push({
      path: toRelativePath(story.path),
      name: story.name.replace(/\.tsx$/, ""),
    });
  }

  if (single !== null) {
    const story = await import(
      `../${path}`
    );
    const { default: Story } = story;

    return (
      <div class="p-8 flex justify-center items-center">
        <Story />
      </div>
    );
  }

  return (
    <main>
      <div class="flex">
        <div class="w-[20rem] py-4 px-8 bg-gray-50 h-screen">
          <div>
            <a
              href="/"
              class="flex text-sm text-gray-500 hover:text-gray-800 items-center"
            >
              <IconChevronLeft class="w-4 h-4 mr-2" />
              Home
            </a>
          </div>

          <h1 class="flex gap-2 items-center mt-6 uppercase text-sm font-bold text-gray-600 text-center">
            <IconComponents class="w-5 h-5" />
            Stories
          </h1>

          <StoryList stories={stories} path={path} />
        </div>
        {path && (
          <div class="flex-1 p-8">
            <StoryFrame path={`?single&path=${path}`} />
          </div>
        )}
      </div>
    </main>
  );
});
