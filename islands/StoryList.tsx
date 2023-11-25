import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/search.tsx";
import { useState } from "preact/hooks";
import { cx } from "twind/core";

export interface Story {
  path: string;
  name: string;
}

interface StoriesProps {
  stories: Story[];
  path: string | null;
}
export default function Stories({ stories, path }: StoriesProps) {
  const [search, setSearch] = useState("");

  return (
    <>
      <div class="rounded relative mt-4">
        <div class="absolute right-0 pr-4 flex items-center pointer-events-none h-full">
          <IconSearch class="w-4 h-4" />
        </div>
        <input
          class="border border-gray-300 rounded w-full pl-4 py-2 rounded-full text-sm"
          type="text"
          placeholder="Filter"
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
        />
      </div>

      <ul class="mt-4">
        {stories.filter((i) => {
          return i.name.toLowerCase().includes(search.toLowerCase());
        }).map((story) => {
          const active = story.path === path;
          return (
            <li>
              <a
                class={cx(
                  "block",
                  "py-2 border-l pl-4 text-sm hover:border-purple-500",
                  active && "border-purple-400",
                  active ? "text-purple-500 font-semibold" : "text-gray-500",
                )}
                href={`?path=${story.path}`}
              >
                {story.name}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
