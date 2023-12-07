// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { Handlers, PageProps } from "$fresh/server.ts";
import { join } from "https://deno.land/std@0.203.0/path/mod.ts";
import { FC } from "preact/compat";
import { StoriesPluginOptions } from "../stories-plugin.ts";
import { getProjectBase, listStories } from "../utils/stories_utils.ts";

export function getHandler(options?: StoriesPluginOptions) {
  const handler: Handlers = {
    async GET(_req, ctx) {
      const path = ctx.url.searchParams.get("path");
      const projectBasePath = getProjectBase(options?.baseLocation);
      const stories = await listStories(projectBasePath);

      if (path === null) {
        return new Response("Not found", { status: 404 });
      }
      // secure the path
      const matchedStory = stories.find((story) => story.path === path);
      if (matchedStory === undefined) {
        return new Response("Not found", { status: 404 });
      }

      const storyPath = "file://" + join(Deno.cwd(), path);
      const story = await import(
        storyPath
      );

      const { default: Story } = story;
      ctx.state.story = Story;
      return await ctx.render();
    },
  };
  return handler;
}

export default function StoriesSingle(props: PageProps) {
  const Story = props.state.story as FC<object>;
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
