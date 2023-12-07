import { assertEquals } from "$std/assert/mod.ts";
import { stub } from "$std/testing/mock.ts";
import { getProjectBase, listStories } from "../utils/stories_utils.ts";
console.log(import.meta.url);

Deno.test("listStories", async () => {
  const projectBasePath = getProjectBase(import.meta.url);
  const stories = await listStories(projectBasePath);
  assertEquals(stories.length, 2);
  const [story] = stories;
  assertEquals(story.name, "Button");
  assertEquals(story.path, "assets/islands/Button.story.tsx");
});

Deno.test("listStories - with sub directory", async () => {
  const projectBasePath = new URL("./assets", import.meta.url);
  const stories = await listStories(projectBasePath);
  assertEquals(stories.length, 2);
  const [story] = stories;
  assertEquals(story.name, "Button");
  assertEquals(story.path, "islands/Button.story.tsx");
});

Deno.test("basepath", () => {
  stub(Deno, "cwd", () => {
    return "/Users/hashrock/my-fresh-pj";
  });
  const projectBasePath = getProjectBase();
  assertEquals(projectBasePath, new URL("file:///Users/hashrock/my-fresh-pj/"));
});
