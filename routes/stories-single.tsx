// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { Handlers, PageProps } from "$fresh/server.ts";
import { ReactNode } from "preact/compat";
import { join } from "https://deno.land/std@0.203.0/path/mod.ts";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";
import { Story } from "../islands/StoryList.tsx";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "");
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const path = ctx.url.searchParams.get("path");

    const storiesIter = await expandGlob("islands/**/*.story.tsx");
    const stories: Story[] = [];
    for await (const story of storiesIter) {
      stories.push({
        path: toRelativePath(story.path),
        name: story.name.replace(/\.story\.tsx$/, ""),
      });
    }

    if (path === null) {
      return new Response("Not found", { status: 404 });
    }
    // secure the path
    const matchedStory = stories.find((story) => story.path === path);
    if (matchedStory === undefined) {
      return new Response("Not found", { status: 404 });
    }

    const story = await import(
      join(Deno.cwd(), path)
    );
    const { default: Story } = story;
    ctx.state.story = Story;
    return await ctx.render();
  },
};

export default function StoriesSingle(props: PageProps) {
  const Story = props.state.story as ReactNode;
  return (
    <main>
      <div
        style={{
          padding: "24px",
          flex: "1 1 auto",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Story />
      </div>
    </main>
  );
}
