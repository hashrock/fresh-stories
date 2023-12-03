import { Handlers, PageProps } from "$fresh/server.ts";
import StoryFrame from "../islands/StoryFrame.tsx";
import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";
import IconComponents from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/components.tsx";
import IconChevronLeft from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/chevron-left.tsx";
import StoryList, { Story } from "../islands/StoryList.tsx";
import PreactMarkdown from "https://esm.sh/react-markdown@7.1.2?alias=react:preact/compat,@types/react:preact/compat";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5.0.2";
import { join } from "https://deno.land/std@0.203.0/path/mod.ts";
import { style } from "../utils/style.ts";

function toRelativePath(path: string) {
  return path.replace(Deno.cwd(), "").replace(/^\//, "");
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const path = ctx.url.searchParams.get("path");
    const stories: Story[] = [];
    const storiesIter = await expandGlob("islands/**/*.story.tsx");
    for await (const story of storiesIter) {
      stories.push({
        path: toRelativePath(story.path),
        name: story.name.replace(/\.story\.tsx$/, ""),
      });
    }

    // redirect to the first story
    if (path === null && stories.length > 0) {
      return new Response(`Redirecting to ${path}`, {
        headers: { "Location": "?path=" + stories[0].path },
        status: 307,
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

    let code: string | null = null;

    code = await Deno.readTextFile(path);
    const storyPath = "file://" + join(Deno.cwd(), path);
    const story = await import(
      storyPath
    );

    const { description: importedDescription } = story;

    ctx.state.description = importedDescription;
    ctx.state.stories = stories;
    ctx.state.code = code;
    return await ctx.render();
  },
};

export default function StoriesNoAsync(props: PageProps) {
  const stories = props.state.stories as Story[];
  const path = props.url.searchParams.get("path");
  const description = props.state.description as string;
  const code = props.state.code as string;

  return (
    <main>
      <style type="text/css">
        {style}
      </style>
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
            <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css"
            />
            <StoryFrame path={`stories-single?single&path=${path}`} />

            {description && (
              <div class="mt-8">
                <details open>
                  <summary class="text-gray-500 text-sm uppercase">
                    Usage
                  </summary>

                  <PreactMarkdown
                    className="markdown-body"
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {description}
                  </PreactMarkdown>
                </details>
              </div>
            )}

            {code && (
              <div class="mt-8">
                <details>
                  <summary class="text-gray-500 text-sm uppercase">
                    Code
                  </summary>
                  <pre class="mt-2 text-gray-600 text-sm p-4 border rounded-xl">
                    <code>{code}</code>
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
