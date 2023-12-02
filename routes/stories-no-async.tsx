// Document https://fresh.deno.dev/docs/getting-started/create-a-route

import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { useSignal } from "@preact/signals";
import StoryFrame from "../islands/StoryFrame.tsx";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";
import IconComponents from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/components.tsx";
import IconChevronLeft from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/chevron-left.tsx";
import StoryList, { Story } from "../islands/StoryList.tsx";
import PreactMarkdown from "https://esm.sh/react-markdown@7.1.2?alias=react:preact/compat,@types/react:preact/compat";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5.0.2";
import { JSX } from "preact";
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

export default function StoriesNoAsync(props: PageProps) {
  const Story = props.state.story as ReactNode;
  return (
    <main>
      <div class="p-8 flex justify-center items-center">
        <Story />
      </div>
    </main>
  );
}
