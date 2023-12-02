// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { Handlers, PageProps } from "$fresh/server.ts";
import { ReactNode } from "preact/compat";
import { join } from "https://deno.land/std@0.203.0/path/mod.ts";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "");
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const path = ctx.url.searchParams.get("path");

    if (path === null) {
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
      <div class="p-8 flex justify-center items-center">
        <Story />
      </div>
    </main>
  );
}
