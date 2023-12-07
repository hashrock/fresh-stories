import { expandGlob } from "https://deno.land/std@0.208.0/fs/expand_glob.ts";
import { toFileUrl } from "$std/path/to_file_url.ts";

export function toRelativePath(path: string, base: string) {
  return path.replace(base, "").replace(/^\//, "");
}
export interface Story {
  path: string;
  name: string;
}

export interface StoriesProps {
  stories: Story[];
  path: string | null;
}

export function getProjectBase(baseLocation?: string) {
  // baseLocation is usually import.meta.url
  return baseLocation
    ? new URL(".", baseLocation)
    : toFileUrl(`${Deno.cwd()}/`);
}

export async function listStories(basePath: URL) {
  const islandsPath = new URL("islands", basePath);
  const glob = new URL("**/*.story.tsx", islandsPath);

  console.log("glob", glob);
  const stories: Story[] = [];

  const storiesIter = await expandGlob(glob);
  for await (const story of storiesIter) {
    console.log(story.path);
    stories.push({
      path: toRelativePath(story.path, basePath.pathname),
      name: story.name.replace(/\.story\.tsx$/, ""),
    });
  }
  return stories;
}
